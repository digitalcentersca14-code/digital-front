<script lang="ts">
    import ChevronLeft from '../components/icons/ChevronLeft.svelte';
    import ChevronRight from '../components/icons/ChevronRight.svelte';
    import Star from '../components/icons/Star.svelte';
    import Heart from '../components/icons/Heart.svelte';
    import { onMount } from 'svelte';
    import { formatPrice } from '../utils/format';

    export let products: any[] = [];
    let scrollContainer: HTMLDivElement;
    let showLeftArrow = false;
    let showRightArrow = true;

    function scroll(direction: 'left' | 'right') {
        if (!scrollContainer) return;
        const scrollAmount = scrollContainer.clientWidth * 0.8;
        scrollContainer.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    function handleScroll() {
        if (!scrollContainer) return;
        showLeftArrow = scrollContainer.scrollLeft > 10;
        showRightArrow = scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth - 10);
    }

    onMount(() => {
        handleScroll();
    });
</script>

<div class="relative group">
    <!-- Navigation Arrows (Hidden on Mobile) -->
    {#if showLeftArrow}
        <button 
            on:click={() => scroll('left')}
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-2xl hidden md:flex"
            aria-label="Anterior"
        >
            <ChevronLeft size={24} />
        </button>
    {/if}

    {#if showRightArrow}
        <button 
            on:click={() => scroll('right')}
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-2xl hidden md:flex"
            aria-label="Siguiente"
        >
            <ChevronRight size={24} />
        </button>
    {/if}

    <!-- Scroll Container -->
    <div 
        bind:this={scrollContainer}
        on:scroll={handleScroll}
        class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
        style="scrollbar-width: none; -ms-overflow-style: none;"
    >
        {#each products as item}
            <div class="min-w-[280px] md:min-w-[320px] snap-start">
                <a 
                    href={`/producto/${item.product_id || item.id}`} 
                    class="group block glassmorphism rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] transition-all duration-500"
                >
                    <!-- Image Wrapper -->
                    <div class="h-64 overflow-hidden relative">
                        {#if item.images && item.images.length > 0}
                            <img 
                                src={item.images[0]} 
                                alt={item.product_name} 
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-sm">Sin Imagen</div>
                        {/if}
                        
                        <!-- Floating Badge -->
                        <div class="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-400">
                            <Star size={14} class="fill-amber-400" />
                            {item.average_rating > 0 ? item.average_rating.toFixed(1) : 'Nuevo'}
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-white mb-1 truncate group-hover:text-indigo-400 transition-colors" title={item.product_name || item.name}>
                            {item.product_name || item.name}
                        </h3>

                        <div class="flex items-baseline gap-2 mb-4">
                            {#if (item.discount_price || item.discount) && (item.is_discount_active !== false)}
                                <span class="text-lg font-bold text-emerald-400">${formatPrice(item.discount_price || item.discount)}</span>
                                <span class="text-sm text-gray-500 line-through">${formatPrice(item.price)}</span>
                            {:else}
                                <span class="text-lg font-bold text-emerald-400">${formatPrice(item.price)}</span>
                            {/if}
                        </div>
                        
                        <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <div class="flex items-center gap-4 text-xs text-gray-400">
                                <span class="flex items-center gap-1.5">
                                    <Heart size={14} class="text-pink-500" /> {item.total_likes ?? 0}
                                </span>
                                <span class="w-1 h-1 rounded-full bg-gray-700"></span>
                                <span>{item.total_views ?? item.views ?? 0} visualizaciones</span>
                            </div>
                            
                            <div class="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
</style>
