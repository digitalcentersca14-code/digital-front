<script lang="ts">
    import { settingsStore } from '../stores/settings';
    import MapPin from '../components/icons/MapPin.svelte';
    import Phone from '../components/icons/Phone.svelte';
    import Mail from '../components/icons/Mail.svelte';

    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-900 border-t border-gray-800 pt-16 pb-8 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <!-- Brand -->
            <div>
                <a href="/" class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 inline-block">
                    DigitalCenter
                </a>
                <p class="text-gray-400 leading-relaxed max-w-sm">
                    Tu tienda de confianza para artículos electrónicos, reparación de celulares, repuestos y accesorios en Latinoamérica.
                </p>
            </div>

            <!-- Links -->
            <div>
                <h3 class="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h3>
                <ul class="space-y-3 shrink-0">
                    <li><a href="/productos" class="text-gray-400 hover:text-indigo-400 transition-colors">Todos los Productos</a></li>
                    <li><a href="/nosotros" class="text-gray-400 hover:text-indigo-400 transition-colors">Sobre Nosotros</a></li>
                    <li><a href="/contacto" class="text-gray-400 hover:text-indigo-400 transition-colors">Contacto y Soporte</a></li>
                    <li><a href="/login" class="text-gray-400 hover:text-indigo-400 transition-colors">Acceso Empleados</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h3 class="text-lg font-semibold text-white mb-4">Ubicación y Contacto</h3>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3 text-gray-400">
                        <MapPin class="shrink-0 mt-1 text-indigo-400" size={18} />
                        <span>{$settingsStore.footerLocation}</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-400">
                        <Phone class="shrink-0 text-indigo-400" size={18} />
                        <span>+{$settingsStore.whatsappPhone}</span>
                    </li>
                    <li class="flex items-center gap-3 text-gray-400">
                        <Mail class="shrink-0 text-indigo-400" size={18} />
                        <span>soporte@digitalcenter.com</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-500 text-sm">
                &copy; {currentYear} Digital Center. Todos los derechos reservados.
            </p>
            <div class="flex items-center gap-4 text-gray-500 text-sm border border-gray-800 rounded-full px-4 py-2">
                <span>By Antigravity Devs</span>
            </div>
        </div>
    </div>
</footer>
