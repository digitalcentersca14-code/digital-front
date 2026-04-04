<script lang="ts">
    import { onMount } from 'svelte';
    import { tokenStore, logout } from '../../stores/auth';
    import AdminSettings from './AdminSettings.svelte';
    import AdminProducts from './AdminProducts.svelte';
    import AdminCategories from './AdminCategories.svelte';
    import AdminStats from './AdminStats.svelte';
    import { Package, FolderTree, Settings, LayoutDashboard, LogOut, BarChart3 } from 'lucide-svelte';

    let activeTab = 'summary';

    onMount(() => {
        if (!$tokenStore) {
            window.location.href = '/login';
        }
    });
</script>

{#if $tokenStore}
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
    <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="w-full md:w-64 shrink-0">
            <div class="glassmorphism p-6 rounded-2xl sticky top-24">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Panel Admin</h3>
                
                <nav class="space-y-2">
                    <button 
                        onclick={() => activeTab = 'summary'}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left {activeTab === 'summary' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-300 hover:bg-gray-800'}"
                    >
                        <LayoutDashboard size={18} /> Resumen
                    </button>
                    
                    <button 
                        onclick={() => activeTab = 'analytics'}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left {activeTab === 'analytics' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-300 hover:bg-gray-800'}"
                    >
                        <BarChart3 size={18} /> Analíticas
                    </button>
                    
                    <button 
                        onclick={() => activeTab = 'products'}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left {activeTab === 'products' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-300 hover:bg-gray-800'}"
                    >
                        <Package size={18} /> Productos
                    </button>
                    
                    <button 
                        onclick={() => activeTab = 'categories'}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left {activeTab === 'categories' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-300 hover:bg-gray-800'}"
                    >
                        <FolderTree size={18} /> Categorías
                    </button>

                    <button 
                        onclick={() => activeTab = 'settings'}
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left {activeTab === 'settings' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-300 hover:bg-gray-800'}"
                    >
                        <Settings size={18} /> Ajustes SItio
                    </button>

                    <div class="pt-4 mt-4 border-t border-gray-800">
                        <button onclick={logout} class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-xl transition-colors text-left">
                            <LogOut size={18} /> Cerrar Sesión
                        </button>
                    </div>
                </nav>
            </div>
        </aside>

        <!-- Contenido Principal -->
        <main class="flex-1 glassmorphism p-8 rounded-2xl min-h-[500px]">
            {#if activeTab === 'summary'}
                <div class="text-center py-20">
                    <div class="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <LayoutDashboard size={32} />
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2">Bienvenido al Dashboard</h2>
                    <p class="text-gray-400">Selecciona una opción en el menú izquierdo para administrar la tienda.</p>
                </div>
            {:else if activeTab === 'analytics'}
                <AdminStats />
            {:else if activeTab === 'products'}
                <AdminProducts />
            {:else if activeTab === 'categories'}
                <AdminCategories />
            {:else if activeTab === 'settings'}
                <AdminSettings />
            {/if}
        </main>
    </div>
</div>
{/if}
