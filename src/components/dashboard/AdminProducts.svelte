<script lang="ts">
    import { onMount } from 'svelte';
    import { tokenStore } from '../../stores/auth';
    import { Trash2, Edit2, Plus, Loader2, Image as ImageIcon } from 'lucide-svelte';
    import { formatPrice } from '../../utils/format';

    const API_URL = import.meta.env.PUBLIC_API_URL;

    let products = [];
    let categories = [];
    let loading = true;
    let saving = false;

    // Form
    let name = '';
    let description = '';
    let price = 0;
    let discount_price: number | null = null;
    let stock = 0;
    let category_id = '';
    let is_discount_active = true;
    let selectedFiles: FileList | null = null;
    let editId = null;

    async function fetchData() {
        loading = true;
        try {
            const [cRes, pRes] = await Promise.all([
                fetch(`${API_URL}/categories/`),
                fetch(`${API_URL}/products/`)
            ]);
            categories = await cRes.json();
            products = await pRes.json();
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        saving = true;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price.toString());
        if (discount_price !== null) formData.append('discount_price', discount_price.toString());
        formData.append('is_discount_active', is_discount_active.toString());
        formData.append('stock', stock.toString());
        if (category_id) formData.append('category_id', category_id);

        if (selectedFiles) {
            // maximo 6
            for(let i = 0; i < Math.min(selectedFiles.length, 6); i++) {
                formData.append('images', selectedFiles[i]);
            }
        }

        const url = editId ? `${API_URL}/products/${editId}/` : `${API_URL}/products/`;
        const method = editId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${$tokenStore}` },
            body: formData
        });

        saving = false;
        if (res.ok) {
            cancelEdit();
            await fetchData();
        } else {
            alert('Error guardando el producto (Cloudinary tardó mucho o los datos son inválidos)');
        }
    }

    async function deleteProd(id) {
        if (!confirm('¿Seguro que deseas eliminar este producto y sus fotos de Cloudinary?')) return;
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${$tokenStore}` }
        });
        if (res.ok) await fetchData();
    }

    function editProd(p) {
        name = p.name;
        description = p.description;
        price = p.price;
        discount_price = p.discount_price;
        stock = p.stock;
        category_id = p.category_id || '';
        is_discount_active = p.is_discount_active;
        editId = p.id;
        selectedFiles = null; // En update no pre-cargamos archivos por UI simplificada en este ejemplo
    }

    function cancelEdit() {
        name = '';
        description = '';
        price = 0;
        discount_price = null;
        stock = 0;
        category_id = '';
        is_discount_active = true;
        editId = null;
        selectedFiles = null;
    }

    onMount(fetchData);
</script>

<div>
    <h2 class="text-2xl font-bold text-white mb-6">Administrar Productos</h2>

    <div class="glassmorphism p-6 rounded-2xl mb-8">
        <h3 class="text-lg font-semibold text-white mb-4">{editId ? 'Editar (Las fotos se reemplazarán si subes nuevas)' : 'Nuevo'} Producto</h3>
        <form onsubmit={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-400 mb-1" for="name">Nombre</label>
                <input required id="name" type="text" bind:value={name} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-400 mb-1" for="desc">Descripción</label>
                <textarea required id="desc" bind:value={description} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500 h-24"></textarea>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="price">Precio ($)</label>
                <input required id="price" type="number" step="0.01" min="0" bind:value={price} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="discount_price">Precio de Oferta ($ de descuento final / Opcional)</label>
                <input id="discount_price" type="number" step="0.01" min="0" bind:value={discount_price} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="flex items-center gap-3">
                <input id="is_active" type="checkbox" bind:checked={is_discount_active} class="w-5 h-5 bg-gray-900 border-gray-700 rounded text-indigo-500 focus:ring-indigo-500" />
                <label class="text-sm font-medium text-gray-400" for="is_active">Activar Descuento</label>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="stock">Stock Inicial</label>
                <input required id="stock" type="number" min="0" bind:value={stock} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="cat">Categoría</label>
                <select id="cat" bind:value={category_id} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">-- Sin categoría --</option>
                    {#each categories as c}
                        <option value={c.id}>{c.name}</option>
                    {/each}
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="pics">Fotos (Máximo 6, JPG/PNG)</label>
                <div class="w-full relative px-4 py-2 bg-gray-900 border border-gray-700 border-dashed rounded-xl flex items-center gap-2 overflow-hidden h-[46px]">
                    <ImageIcon size={18} class="text-gray-500 shrink-0" />
                    <input id="pics" type="file" multiple accept="image/*" bind:files={selectedFiles} class="absolute inset-0 w-full opacity-0 cursor-pointer" />
                    <span class="text-sm text-gray-400 truncate">{selectedFiles && selectedFiles.length > 0 ? `${selectedFiles.length} imágenes seleccionadas` : 'Click para subir archivos'}</span>
                </div>
            </div>

            <div class="col-span-1 md:col-span-2 flex gap-3 mt-4">
                <button type="submit" disabled={saving} class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-xl flex items-center gap-2 transition-colors">
                    {#if saving} <Loader2 size={18} class="animate-spin" /> Procesando Cloudinary... {:else} <Plus size={18} /> Guardar Producto {/if}
                </button>
                {#if editId}
                    <button type="button" onclick={cancelEdit} class="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors">Cancelar</button>
                {/if}
            </div>
        </form>
    </div>

    <!-- Tabla -->
    <div class="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden overflow-x-auto">
        {#if loading}
            <div class="p-8 flex justify-center text-indigo-400"><Loader2 class="animate-spin" /></div>
        {:else if products.length === 0}
            <div class="p-8 text-center text-gray-500">No hay productos registrados</div>
        {:else}
            <table class="w-full text-left text-sm text-gray-400">
                <thead class="text-xs uppercase bg-gray-800 text-gray-300 border-b border-gray-700">
                    <tr>
                        <th class="px-4 py-4 w-12">Img</th>
                        <th class="px-4 py-4">Nombre</th>
                        <th class="px-4 py-4">Precio</th>
                        <th class="px-4 py-4">Stock</th>
                        <th class="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each products as p}
                        <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <td class="px-4 py-4">
                                {#if p.images && p.images.length > 0}
                                    <img src={p.images[0]} class="w-10 h-10 rounded-lg object-cover" alt="miniatura"/>
                                {:else}
                                    <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center"><ImageIcon size={14} class="text-gray-600"/></div>
                                {/if}
                            </td>
                            <td class="px-4 py-4 font-medium text-white max-w-[200px] truncate">{p.name}</td>
                            <td class="px-4 py-4 h-full align-middle">
                                <div class="flex flex-col">
                                    {#if p.discount_price && p.is_discount_active}
                                        <span class="text-xs text-gray-500 line-through">${formatPrice(p.price)}</span>
                                        <span class="text-emerald-400 font-bold">${formatPrice(p.discount_price)}</span>
                                    {:else}
                                        <span class="text-emerald-400 font-bold">${formatPrice(p.price)}</span>
                                    {/if}
                                </div>
                            </td>
                            <td class="px-4 py-4">{p.stock}</td>
                            <td class="px-6 py-4 flex justify-end gap-3 items-center h-16">
                                <button onclick={() => editProd(p)} class="text-blue-400 hover:text-blue-300"><Edit2 size={18} /></button>
                                <button onclick={() => deleteProd(p.id)} class="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>
