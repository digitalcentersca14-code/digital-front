<script lang="ts">
    import { settingsStore } from '../stores/settings';
    import Phone from './icons/Phone.svelte';
    import MapPin from './icons/MapPin.svelte';
    import Mail from './icons/Mail.svelte';
</script>

<div class="glassmorphism p-8 rounded-2xl flex items-start gap-4">
    <div class="p-4 bg-green-500/20 rounded-xl text-green-400">
        <Phone size={28} />
    </div>
    <div>
        <h3 class="text-xl font-bold text-white mb-2">Llamadas y WhatsApp</h3>
        <p class="text-gray-400">
            +{$settingsStore.whatsappPhone}
            {#if String($settingsStore.isAttentionVisible) === 'true'}
                <br/>Atención {$settingsStore.attentionSchedule}
            {/if}
        </p>
    </div>
</div>

<div class="glassmorphism p-8 rounded-2xl flex items-start gap-4 mt-6">
    <div class="p-4 bg-indigo-500/20 rounded-xl text-indigo-400">
        <MapPin size={28} />
    </div>
    <div>
        <h3 class="text-xl font-bold text-white mb-2">Dirección</h3>
        <p class="text-gray-400">{$settingsStore.footerLocation}</p>
    </div>
</div>

<div class="glassmorphism p-8 rounded-2xl flex items-start gap-4 mt-6">
    <div class="p-4 bg-purple-500/20 rounded-xl text-purple-400">
        <Mail size={28} />
    </div>
    <div>
        <h3 class="text-xl font-bold text-white mb-2">Correo Electrónico</h3>
        <p class="text-gray-400">{$settingsStore.contactEmail}</p>
    </div>
</div>
