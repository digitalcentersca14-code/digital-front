<script lang="ts">
    import { settingsStore } from '../../stores/settings';
    import { tokenStore } from '../../stores/auth';
    import Save from '../../components/icons/Save.svelte';
    import Loader2 from '../../components/icons/Loader2.svelte';
    
    let draftLogo = $settingsStore.logoUrl;
    let draftLocation = $settingsStore.footerLocation;
    let draftPhone = $settingsStore.whatsappPhone;
    let draftSchedule = $settingsStore.attentionSchedule;
    let draftIsAttentionVisible = String($settingsStore.isAttentionVisible) === 'true';
    let draftIsClosedToday = String($settingsStore.isClosedToday) === 'true';
    let draftEmail = $settingsStore.contactEmail;
    let draftPromoEnabled = String($settingsStore.promoModalEnabled) === 'true';
    let draftPromoDuration = $settingsStore.promoModalDuration || 'session';

    let saved = false;
    let uploading = false;
    let logoPreview = draftLogo;

    function handleLogoUpload(e: Event) {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            logoPreview = event.target?.result as string;
            draftLogo = logoPreview;
        };
        reader.readAsDataURL(file);
    }

    async function saveSettings(e: Event) {
        e.preventDefault();
        try {
            const token = tokenStore.get();
            const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000';
            
            await fetch(`${API_URL}/settings/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    logo_url: draftLogo,
                    footer_location: draftLocation,
                    whatsapp_phone: draftPhone,
                    attention_schedule: draftSchedule,
                    is_attention_visible: draftIsAttentionVisible,
                    is_closed_today: draftIsClosedToday,
                    contact_email: draftEmail,
                    promo_modal_enabled: draftPromoEnabled,
                    promo_modal_duration: draftPromoDuration
                })
            });

            settingsStore.set({
                logoUrl: draftLogo,
                footerLocation: draftLocation,
                whatsappPhone: draftPhone,
                attentionSchedule: draftSchedule,
                isAttentionVisible: draftIsAttentionVisible,
                isClosedToday: draftIsClosedToday,
                contactEmail: draftEmail,
                promoModalEnabled: draftPromoEnabled,
                promoModalDuration: draftPromoDuration
            });
            
            saved = true;
            setTimeout(() => saved = false, 3000);
        } catch(err) {
            console.error("Error al guardar en backend", err);
        }
    }
</script>

<div>
    <h2 class="text-2xl font-bold text-white mb-6">Configuración del Sitio</h2>
    <p class="text-gray-400 mb-8">Estos ajustes modificarán directamente el Navbar, Footer y los botones de compra de toda la plataforma en tiempo real gracias a Nanostores.</p>

    {#if saved}
        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl mb-6">
            ¡Configuración guardada! Los cambios ya se reflejan en toda la web.
        </div>
    {/if}

    <form onsubmit={saveSettings} class="space-y-6 max-w-xl">
        <!-- NOTA: En un caso real con el backend hecho para assets, esto sería un Upload. Dejaremos una string basica. -->
        <div class="space-y-4">
            <h4 class="text-sm font-medium text-gray-300">Logo de la Plataforma</h4>
            <div class="flex items-center gap-6 p-6 bg-gray-900 border border-gray-700 rounded-2xl">
                <div class="w-24 h-24 bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center border border-gray-700 p-2">
                    {#if logoPreview}
                        <img src={logoPreview} alt="Logo Preview" class="max-w-full max-h-full object-contain" />
                    {:else}
                        <div class="text-gray-600 text-xs text-center px-1">Sin Logo</div>
                    {/if}
                </div>
                
                <div class="flex-grow space-y-3">
                    <p class="text-xs text-gray-500 italic">Haz click abajo para seleccionar tu logo (PNG, JPG o SVG).</p>
                    <div class="relative">
                        <input 
                            type="file" 
                            accept="image/*"
                            onchange={handleLogoUpload}
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-750 transition-colors">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5-5 5 5M12 5v12"/></svg>
                            Seleccionar Archivo
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="relative">
                <label class="block text-xs font-medium text-gray-500 mb-1" for="logo-url">O pega una URL externa</label>
                <input 
                    id="logo-url" 
                    type="text" 
                    bind:value={draftLogo}
                    oninput={() => logoPreview = draftLogo}
                    placeholder="https://ejemplo.com/logo.png"
                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-300 mb-2" for="loc">Dirección en el Footer</label>
            <input 
                id="loc" 
                type="text" 
                bind:value={draftLocation}
                placeholder="Calle Principal 123..."
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-300 mb-2" for="phone">Teléfono WhatsApp de Pedidos <span class="text-xs text-gray-500">(formato internacional sin el "+")</span></label>
            <input 
                id="phone" 
                type="text" 
                bind:value={draftPhone}
                placeholder="581234567890"
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-300 mb-2" for="email">Correo Electrónico de Contacto</label>
            <input 
                id="email" 
                type="email" 
                bind:value={draftEmail}
                placeholder="soporte@digitalcenter.com"
                class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>

        <div class="p-6 bg-gray-900 border border-gray-700 rounded-2xl space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">Horario y Disponibilidad</h3>
            
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-2" for="schedule">Horario de Atención</label>
                <input 
                    id="schedule" 
                    type="text" 
                    bind:value={draftSchedule}
                    placeholder="8:00 AM - 6:00 PM"
                    class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <label class="flex items-center gap-3 cursor-pointer mt-4">
                <input 
                    type="checkbox" 
                    bind:checked={draftIsAttentionVisible}
                    class="w-5 h-5 rounded border-gray-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900 bg-gray-800 accent-indigo-500"
                />
                <span class="text-sm font-medium text-gray-300">Mostrar Horario de Atención públicamente</span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer mt-2">
                <input 
                    type="checkbox" 
                    bind:checked={draftIsClosedToday}
                    class="w-5 h-5 rounded border-gray-700 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900 bg-gray-800 accent-red-500"
                />
                <span class="text-sm font-medium text-red-400">Marcar tienda como CERRADA HOY (Muestra Modal)</span>
            </label>
        </div>

        <div class="p-6 bg-gray-900 border border-gray-700 rounded-2xl space-y-4">
            <h3 class="text-lg font-bold text-white mb-2">🔥 Modal de Ofertas</h3>
            <p class="text-xs text-gray-500 mb-4">Muestra automáticamente un modal con productos en descuento a los visitantes no logueados.</p>

            <label class="flex items-center gap-3 cursor-pointer">
                <input 
                    type="checkbox" 
                    bind:checked={draftPromoEnabled}
                    class="w-5 h-5 rounded border-gray-700 text-rose-500 focus:ring-rose-500 focus:ring-offset-gray-900 bg-gray-800 accent-rose-500"
                />
                <span class="text-sm font-medium text-gray-300">Activar Modal de Ofertas para visitantes</span>
            </label>

            {#if draftPromoEnabled}
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-2" for="promo-duration">Frecuencia de visualización</label>
                <select 
                    id="promo-duration"
                    bind:value={draftPromoDuration}
                    class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                    <option value="always">Siempre (cada visita de página)</option>
                    <option value="session">Una vez por sesión</option>
                    <option value="1d">Una vez al día</option>
                    <option value="3d">Una vez cada 3 días</option>
                    <option value="7d">Una vez por semana</option>
                </select>
                <p class="text-xs text-gray-500 mt-2">⚠️ Asegúrate de tener productos con descuento activo para que el modal aparezca.</p>
            </div>
            {/if}
        </div>

        <button 
            type="submit" 
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 transition-colors mt-8"
        >
            <Save size={18} /> Guardar Cambios
        </button>
    </form>
</div>
