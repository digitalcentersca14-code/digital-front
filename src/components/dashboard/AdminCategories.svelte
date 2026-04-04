<script lang="ts">
    import { onMount } from 'svelte';
    import { tokenStore } from '../../stores/auth';
    import { Trash2, Edit2, Plus, Loader2, Save } from 'lucide-svelte';

    const API_URL = import.meta.env.PUBLIC_API_URL;

    let categories = [];
    let loading = true;
    let name = '';
    let description = '';
    let editId = null;

    async function fetchCategories() {
        if (!$tokenStore) return;
        loading = true;
        try {
            const res = await fetch(`${API_URL}/categories/`, {
                headers: { 'Authorization': `Bearer ${$tokenStore}` }
            });
            if (res.ok) categories = await res.json();
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        if (!$tokenStore) {
            alert('Sesión no encontrada. Por favor inicia sesión de nuevo.');
            return;
        }
        
        const payload = { name, description };
        const url = editId ? `${API_URL}/categories/${editId}/` : `${API_URL}/categories/`;
        const method = editId ? 'PUT' : 'POST';

        console.log(`Sending ${method} to ${url} with token:`, $tokenStore.substring(0, 10) + '...');

        const res = await fetch(url, {
            method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore}`
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            name = '';
            description = '';
            editId = null;
            await fetchCategories();
        } else {
            const errorData = await res.json().catch(() => ({}));
            console.error('Error info:', errorData);
            alert(`Error guardando categoría: ${errorData.detail || 'Desconocido'}`);
        }
    }

    async function deleteCat(id) {
        if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;
        const res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${$tokenStore}` }
        });
        if (res.ok) await fetchCategories();
    }

    function editCat(c) {
        name = c.name;
        description = c.description;
        editId = c.id;
    }

    function cancelEdit() {
        name = '';
        description = '';
        editId = null;
    }

    onMount(fetchCategories);
</script>

<div>
    <h2 class="text-2xl font-bold text-white mb-6">Administrar Categorías</h2>

    <div class="glassmorphism p-6 rounded-2xl mb-8">
        <h3 class="text-lg font-semibold text-white mb-4">{editId ? 'Editar' : 'Nueva'} Categoría</h3>
        <form onsubmit={handleSubmit} class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="cname">Nombre</label>
                <input required id="cname" type="text" bind:value={name} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-400 mb-1" for="cdesc">Descripción (opcional)</label>
                <input id="cdesc" type="text" bind:value={description} class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div class="col-span-1 md:col-span-2 flex gap-3">
                <button type="submit" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 transition-colors">
                    {#if editId} <Save size={18} /> Guardar Cambios {:else} <Plus size={18} /> Crear Categoría {/if}
                </button>
                {#if editId}
                    <button type="button" onclick={cancelEdit} class="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-colors">Cancelar</button>
                {/if}
            </div>
        </form>
    </div>

    <!-- Lista -->
    <div class="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
        {#if loading}
            <div class="p-8 flex justify-center text-indigo-400"><Loader2 class="animate-spin" /></div>
        {:else if categories.length === 0}
            <div class="p-8 text-center text-gray-500">No hay categorías registradas</div>
        {:else}
            <table class="w-full text-left text-sm text-gray-400">
                <thead class="text-xs uppercase bg-gray-800 text-gray-300 border-b border-gray-700">
                    <tr>
                        <th class="px-6 py-4">Nombre</th>
                        <th class="px-6 py-4">Descripción</th>
                        <th class="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each categories as c}
                        <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                            <td class="px-6 py-4 font-medium text-white">{c.name}</td>
                            <td class="px-6 py-4">{c.description || '-'}</td>
                            <td class="px-6 py-4 flex justify-end gap-3">
                                <button onclick={() => editCat(c)} class="text-blue-400 hover:text-blue-300"><Edit2 size={18} /></button>
                                <button onclick={() => deleteCat(c.id)} class="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>
