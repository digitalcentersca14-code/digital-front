<script lang="ts">
    import { settingsStore } from '../stores/settings';
    import X from './icons/X.svelte';
    let isDismissed = false;
</script>

{#if (String($settingsStore.isClosedToday) === 'true') && !isDismissed}
    <div class="fixed bottom-6 right-6 max-w-sm w-full bg-red-600/90 backdrop-blur-md border border-red-500 shadow-2xl z-[100] rounded-2xl p-6 text-white" style="animation: fadeInUp 0.4s ease-out forwards;">
        <button on:click={() => isDismissed = true} class="absolute top-3 right-3 text-white/70 hover:text-white transition-colors">
            <X size={20} />
        </button>
        <div class="flex items-start gap-4 pr-4">
            <div class="shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div>
                <h4 class="text-lg font-bold mb-1">Cerrado por hoy</h4>
                <p class="text-sm text-red-100">Hoy no nos encontramos laborando. Puedes seguir explorando el sitio y dejarnos tus consultas; te responderemos el próximo día hábil.</p>
            </div>
        </div>
    </div>
{/if}

<style>
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
