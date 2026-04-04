<script lang="ts">
    import { tokenStore } from '../stores/auth';
    import Lock from './icons/Lock.svelte';
    import User from './icons/User.svelte';
    import Loader2 from './icons/Loader2.svelte';

    let username = '';
    let password = '';
    let errorMsg = '';
    let isLoading = false;

    async function handleLogin(e: Event) {
        e.preventDefault();
        errorMsg = '';
        isLoading = true;

        const API_URL = import.meta.env.PUBLIC_API_URL;
        
        try {
            // El backend usa FormData / OAuth2PasswordRequestForm
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const res = await fetch(`${API_URL}/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });

            const data = await res.json();

            if (res.ok) {
                tokenStore.set(data.access_token);
                window.location.href = '/dashboard';
            } else {
                errorMsg = data.detail || 'Credenciales inválidas';
            }
        } catch (err) {
            errorMsg = 'Error conectando con el servidor. Revisa tu conexión.';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="glassmorphism p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
    <!-- Decors -->
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>
    <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>

    <div class="relative z-10">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h2>
            <p class="text-gray-400">Ingresa tus credenciales para acceder al panel</p>
        </div>

        {#if errorMsg}
            <div class="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm mb-6 text-center">
                {errorMsg}
            </div>
        {/if}

        <form onsubmit={handleLogin} class="space-y-5">
            <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" for="username">Usuario</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} class="text-gray-500" />
                    </div>
                    <input 
                        id="username" 
                        type="text" 
                        bind:value={username}
                        required
                        placeholder="tu_usuario"
                        class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" for="password">Contraseña</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} class="text-gray-500" />
                    </div>
                    <input 
                        id="password" 
                        type="password" 
                        bind:value={password}
                        required
                        placeholder="••••••••"
                        class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] mt-4 flex justify-center items-center gap-2"
            >
                {#if isLoading}
                    <Loader2 size={18} class="animate-spin" /> Conectando...
                {:else}
                    Iniciar Sesión
                {/if}
            </button>
        </form>
    </div>
</div>
