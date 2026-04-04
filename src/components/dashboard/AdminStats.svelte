<script lang="ts">
    import { onMount } from 'svelte';
    import { tokenStore } from '../../stores/auth';
    import { BarChart3, TrendingUp, MessageSquare, Heart, Eye, Star } from 'lucide-svelte';

    const API_URL = import.meta.env.PUBLIC_API_URL;
    let stats = [];
    let loading = true;

    async function fetchStats() {
        try {
            const res = await fetch(`${API_URL}/products/statistics/trending/`, {
                headers: { 'Authorization': `Bearer ${$tokenStore}` }
            });
            if (res.ok) {
                stats = await res.json();
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    onMount(fetchStats);

    // Helpers para obtener tops
    $: topLiked = [...stats].sort((a, b) => b.total_likes - a.total_likes).slice(0, 5);
    $: topCommented = [...stats].sort((a, b) => b.total_comments - a.total_comments).slice(0, 5);
    $: topRated = [...stats].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5);
    $: topViewed = [...stats].sort((a, b) => b.total_views - a.total_views).slice(0, 5);
</script>

<div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex items-center gap-3 mb-2">
        <div class="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <BarChart3 size={24} />
        </div>
        <h1 class="text-2xl font-bold text-white">Análisis de Rendimiento</h1>
    </div>

    {#if loading}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each Array(4) as _}
                <div class="h-64 glassmorphism animate-pulse rounded-2xl"></div>
            {/each}
        </div>
    {:else if stats.length === 0}
        <div class="glassmorphism p-12 text-center rounded-2xl border-dashed">
            <p class="text-gray-400">No hay datos suficientes para mostrar estadísticas aún.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="glassmorphism p-6 rounded-2xl">
                <div class="flex items-center gap-3 text-pink-400 mb-2">
                    <Heart size={20} /> <span class="text-sm font-medium">Total Likes</span>
                </div>
                <div class="text-3xl font-bold text-white">{stats.reduce((acc, s) => acc + s.total_likes, 0)}</div>
            </div>
            <div class="glassmorphism p-6 rounded-2xl">
                <div class="flex items-center gap-3 text-blue-400 mb-2">
                    <MessageSquare size={20} /> <span class="text-sm font-medium">Comentarios</span>
                </div>
                <div class="text-3xl font-bold text-white">{stats.reduce((acc, s) => acc + s.total_comments, 0)}</div>
            </div>
            <div class="glassmorphism p-6 rounded-2xl">
                <div class="flex items-center gap-3 text-amber-400 mb-2">
                    <Star size={20} /> <span class="text-sm font-medium">Promedio Gral</span>
                </div>
                <div class="text-3xl font-bold text-white">{(stats.reduce((acc, s) => acc + s.average_rating, 0) / stats.length).toFixed(1)}</div>
            </div>
            <div class="glassmorphism p-6 rounded-2xl">
                <div class="flex items-center gap-3 text-emerald-400 mb-2">
                    <Eye size={20} /> <span class="text-sm font-medium">Vistas Totales</span>
                </div>
                <div class="text-3xl font-bold text-white">{stats.reduce((acc, s) => acc + s.total_views, 0)}</div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Top Vistos -->
            <div class="glassmorphism p-6 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Eye size={18} class="text-emerald-400" /> Productos Más Vistos
                </h3>
                <div class="space-y-4">
                    {#each topViewed as item}
                        <div class="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                            <span class="text-gray-200 truncate pr-4">{item.product_name}</span>
                            <span class="text-emerald-400 font-bold tabular-nums">{item.total_views} <small class="text-[10px] opacity-70">vistas</small></span>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Top Valorados -->
            <div class="glassmorphism p-6 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Star size={18} class="text-amber-400" /> Mejor Valorados
                </h3>
                <div class="space-y-4">
                    {#each topRated as item}
                        <div class="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                            <span class="text-gray-200 truncate pr-4">{item.product_name}</span>
                            <div class="flex items-center gap-1.5 text-amber-400 font-bold">
                                <Star size={14} class="fill-amber-400" /> {item.average_rating.toFixed(1)}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Top Likes -->
            <div class="glassmorphism p-6 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Heart size={18} class="text-pink-400" /> Más Likes
                </h3>
                <div class="space-y-4">
                    {#each topLiked as item}
                        <div class="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                            <span class="text-gray-200 truncate pr-4">{item.product_name}</span>
                            <span class="text-pink-400 font-bold">{item.total_likes} ❤️</span>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Top Comentarios -->
            <div class="glassmorphism p-6 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare size={18} class="text-blue-400" /> Más Comentados
                </h3>
                <div class="space-y-4">
                    {#each topCommented as item}
                        <div class="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl border border-gray-800">
                            <span class="text-gray-200 truncate pr-4">{item.product_name}</span>
                            <span class="text-blue-400 font-bold">{item.total_comments} 💬</span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>
