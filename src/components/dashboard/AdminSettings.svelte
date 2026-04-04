<script lang="ts">
    import { settingsStore } from '../../stores/settings';
    import { Save } from 'lucide-svelte';
    
    // Store variables temporales para editar
    let draftLogo = $settingsStore.logoUrl;
    let draftLocation = $settingsStore.footerLocation;
    let draftPhone = $settingsStore.whatsappPhone;
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

    function saveSettings(e: Event) {
        e.preventDefault();
        settingsStore.set({
            logoUrl: draftLogo,
            footerLocation: draftLocation,
            whatsappPhone: draftPhone
        });
        saved = true;
        setTimeout(() => saved = false, 3000);
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

        <button 
            type="submit" 
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 transition-colors mt-8"
        >
            <Save size={18} /> Guardar Cambios
        </button>
    </form>
</div>
