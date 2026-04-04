<script lang="ts">
    import { Search, PackageOpen } from 'lucide-svelte';
    import { formatPrice } from '../utils/format';

    export let products = [];
    let searchQuery = '';

    // Busqueda simple en el cliente
    $: filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
            <h1 class="text-4xl font-bold text-white mb-2">Nuestro Catálogo</h1>
            <p class="text-gray-400">Todos los repuestos, celulares y accesorios en un solo lugar.</p>
        </div>
        
        <div class="w-full md:w-96 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} class="text-gray-500" />
            </div>
            <input 
                type="text" 
                bind:value={searchQuery}
                placeholder="Buscar modelo o repuesto..." 
                class="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            >
        </div>
    </div>

    {#if filteredProducts.length === 0}
        <div class="text-center py-24 glassmorphism rounded-2xl border-dashed">
            <div class="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <PackageOpen size={32} />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
            <p class="text-gray-400">Intenta utilizar otro término de búsqueda.</p>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each filteredProducts as item}
                <a href={`/producto/${item.id}`} class="group glassmorphism rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-all flex flex-col">
                    <div class="h-56 bg-gray-800 overflow-hidden relative">
                        {#if item.discount_price && item.is_discount_active}
                            <div class="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-lg animate-pulse uppercase tracking-wider">Oferta Especial</div>
                        {/if}
                        {#if item.images && item.images.length > 0}
                            <img src={item.images[0]} alt={item.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {:else}
                            <div class="w-full h-full object-cover flex items-center justify-center opacity-50 bg-gradient-to-tr from-gray-700 to-gray-900 text-gray-500">Sin Imagen</div>
                        {/if}
                    </div>
                    <div class="p-5 flex flex-col flex-grow text-left">
                        <div class="flex justify-between items-start mb-2 gap-2">
                            <h3 class="text-lg font-bold text-white leading-tight" title={item.name}>{item.name.length > 40 ? item.name.substring(0, 40) + '...' : item.name}</h3>
                        </div>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-2 mt-auto">{item.description}</p>
                        <div class="mt-auto flex items-end gap-2">
                            {#if item.discount_price && item.is_discount_active}
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-500 line-through">${formatPrice(item.price)}</span>
                                    <span class="text-2xl font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">${formatPrice(item.discount_price)}</span>
                                </div>
                            {:else}
                                <span class="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">${formatPrice(item.price)}</span>
                            {/if}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</div>
