<script lang="ts">
    import { tokenStore, logout } from '../stores/auth';
    import { settingsStore } from '../stores/settings';
    import Menu from '../components/icons/Menu.svelte';
    import X from '../components/icons/X.svelte';
    import ShoppingCart from '../components/icons/ShoppingCart.svelte';
    import User from '../components/icons/User.svelte';
    import LogOut from '../components/icons/LogOut.svelte';

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<nav class="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center gap-2">
                <a href="/" class="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                    {#if $settingsStore.logoUrl}
                        <img src={$settingsStore.logoUrl} alt="Logo" class="w-10 h-10 rounded-full object-cover shadow-sm border border-indigo-500/30" />
                    {/if}
                    DigitalCenter
                </a>
            </div>

            <!-- Menú Central -->
            <div class="hidden md:flex flex-1 justify-center">
                <div class="flex space-x-8">
                    <a href="/" class="text-gray-300 hover:text-white transition-colors duration-200">Inicio</a>
                    <a href="/productos" class="text-gray-300 hover:text-white transition-colors duration-200">Productos</a>
                    <a href="/nosotros" class="text-gray-300 hover:text-white transition-colors duration-200">Nosotros</a>
                    <a href="/contacto" class="text-gray-300 hover:text-white transition-colors duration-200">Contacto</a>
                </div>
            </div>

            <!-- Login / Mobile toggle -->
            <div class="flex items-center gap-4">
                {#if $tokenStore}
                    <a href="/dashboard" class="hidden md:flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
                        <User size={18} /> Dashboard
                    </a>
                    <button onclick={logout} class="hidden md:flex items-center gap-2 text-red-400 hover:text-red-300">
                        <LogOut size={18} /> Salir
                    </button>
                {:else}
                    <a href="/login" class="hidden md:flex bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/30">
                        Ingresar
                    </a>
                {/if}

                <!-- Mobile menu button -->
                <button onclick={toggleMenu} class="md:hidden text-gray-300 hover:text-white focus:outline-none">
                    {#if isOpen}
                        <X size={24} />
                    {:else}
                        <Menu size={24} />
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if isOpen}
        <div class="md:hidden bg-gray-900 border-b border-gray-800 shadow-xl absolute w-full left-0">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">Inicio</a>
                <a href="/productos" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">Productos</a>
                <a href="/nosotros" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">Nosotros</a>
                <a href="/contacto" class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md">Contacto</a>
                
                <div class="border-t border-gray-800 mt-4 pt-4 pb-2">
                    {#if $tokenStore}
                        <a href="/dashboard" class="block px-3 py-2 text-base font-medium text-indigo-400 hover:bg-gray-800 rounded-md flex items-center gap-2">
                            <User size={18} /> Dashboard
                        </a>
                        <button onclick={logout} class="w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-gray-800 rounded-md flex items-center gap-2">
                            <LogOut size={18} /> Salir
                        </button>
                    {:else}
                        <a href="/login" class="block px-3 py-2 text-base font-medium text-indigo-400 hover:bg-gray-800 rounded-md">
                            Iniciar Sesión
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</nav>
