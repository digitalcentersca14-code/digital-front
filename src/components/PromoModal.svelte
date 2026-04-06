<script lang="ts">
  import { onMount } from "svelte";
  import { tokenStore } from "../stores/auth";
  import X from "./icons/X.svelte";

  const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8000";
  const STORAGE_KEY = "promo_modal_last_closed";

  let visible = false;
  let promoProducts: any[] = [];
  let enabled = false;
  let duration = "session";

  function formatPrice(n: number) {
    return n.toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function shouldShow(dur: string): boolean {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const closed = parseInt(raw, 10);
    const now = Date.now();
    if (dur === "session") return false;
    if (dur === "always") return true;
    if (dur === "1d") return now - closed > 86400000;
    if (dur === "3d") return now - closed > 86400000 * 3;
    if (dur === "7d") return now - closed > 86400000 * 7;
    return true;
  }

  function closeModal() {
    visible = false;
    if (duration === "session") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } else {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
  }

  onMount(async () => {
    if ($tokenStore) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    try {
      const settingsRes = await fetch(`${API_URL}/settings/`);
      if (!settingsRes.ok) return;
      const settings = await settingsRes.json();

      enabled = settings.promo_modal_enabled;
      duration = settings.promo_modal_duration || "session";

      if (!enabled) return;
      if (!shouldShow(duration)) return;

      const prodRes = await fetch(`${API_URL}/products/`);
      if (!prodRes.ok) return;
      const products = await prodRes.json();

      promoProducts = products
        .filter(
          (p: any) =>
            p.is_discount_active &&
            p.discount_price &&
            p.discount_price < p.price,
        )
        .slice(0, 6);

      if (promoProducts.length === 0) return;

      setTimeout(() => {
        visible = true;
      }, 1500);
    } catch (e) {
      console.error("PromoModal error:", e);
    }
  });

  function handleBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).id === "promo-backdrop") closeModal();
  }
</script>

{#if visible}
  <div
    id="promo-backdrop"
    role="dialog"
    aria-modal="true"
    aria-label="Ofertas especiales"
    class="fixed inset-0 z-[200] flex items-center justify-center p-4"
    style="background: rgba(0,0,0,0.75); backdrop-filter: blur(4px);"
    onclick={handleBackdrop}
  >
    <div
      class="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
      style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border: 1px solid rgba(99,102,241,0.3); box-shadow: 0 0 60px rgba(99,102,241,0.2);"
    >
      <!-- Header -->
      <div
        class="relative px-6 pt-6 pb-4 flex-shrink-0"
        style="background: linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(168,85,247,0.15) 100%); border-bottom: 1px solid rgba(99,102,241,0.2);"
      >
        <!-- Close button top-left -->
        <button
          onclick={closeModal}
          class="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div class="text-center">
          <div
            class="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
          >
            🔥 Ofertas Especiales
          </div>
          <h2 class="text-2xl font-bold text-white">
            ¡Productos en Descuento!
          </h2>
          <p class="text-gray-400 text-sm mt-1">
            Precios especiales por tiempo limitado
          </p>
        </div>
      </div>

      <!-- Products grid -->
      <div class="overflow-y-auto p-6 flex-1">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each promoProducts as p}
            {@const savings = Math.round(
              ((p.price - p.discount_price) / p.price) * 100,
            )}
            <a
              href={`/producto/${p.id}`}
              onclick={closeModal}
              class="group flex gap-3 p-3 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 bg-gray-900/50 hover:bg-gray-800/70 transition-all duration-200"
            >
              <!-- Image -->
              <div
                class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800"
              >
                {#if p.images && p.images.length > 0}
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                {:else}
                  <div
                    class="w-full h-full flex items-center justify-center text-gray-600 text-xs"
                  >
                    Sin imagen
                  </div>
                {/if}
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm font-medium truncate">{p.name}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-gray-500 text-xs line-through"
                    >${formatPrice(p.price)}</span
                  >
                  <span class="text-emerald-400 font-bold text-sm"
                    >${formatPrice(p.discount_price)}</span
                  >
                </div>
                <div class="mt-1">
                  <span
                    class="bg-rose-500/20 text-rose-300 text-xs px-2 py-0.5 rounded-full font-medium"
                  >
                    -{savings}% OFF
                  </span>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex-shrink-0 px-6 py-4 border-t border-gray-800 flex items-center justify-between gap-4"
      >
        <p class="text-gray-500 text-xs">
          Haz clic en un producto para ver más detalles
        </p>
        <a
          href="/productos"
          onclick={closeModal}
          class="text-xs px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors whitespace-nowrap"
        >
          Ver todas las ofertas
        </a>
      </div>
    </div>
  </div>
{/if}
