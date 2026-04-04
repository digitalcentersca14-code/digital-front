import { c as createComponent, $ as $$Layout } from './Layout_B4HaNM--.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_hQavP005.mjs';
import { Target, Users, ShieldCheck, Zap } from 'lucide-svelte';

const $$Nosotros = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[85vh] relative overflow-hidden"> <div class="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div> <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10"></div> <div class="text-center mb-16"> <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">Sobre <span class="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Nosotros</span></h1> <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
Nacimos con la visión de llevar la reparación de dispositivos y la venta tecnológica al siguiente nivel en Latinoamérica, ofreciendo servicio técnico especializado y componentes premium con total transparencia.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center"> ${renderComponent($$result2, "Target", Target, { "size": 40, "class": "text-indigo-400 mb-6" })} <h3 class="text-xl font-bold text-white mb-3">Misión</h3> <p class="text-gray-400">Conectar a las personas manteniendo sus herramientas de vida siempre funcionales y actualizadas.</p> </div> <div class="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center"> ${renderComponent($$result2, "Users", Users, { "size": 40, "class": "text-blue-400 mb-6" })} <h3 class="text-xl font-bold text-white mb-3">Cercanía</h3> <p class="text-gray-400">Trato humano, directo y sincero. Te decimos exactamente qué falla y cómo se puede solucionar.</p> </div> <div class="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center"> ${renderComponent($$result2, "ShieldCheck", ShieldCheck, { "size": 40, "class": "text-emerald-400 mb-6" })} <h3 class="text-xl font-bold text-white mb-3">Confiabilidad</h3> <p class="text-gray-400">Repuestos garantizados que igualan o superan la calidad original de tu dispositivo electrónico.</p> </div> <div class="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center"> ${renderComponent($$result2, "Zap", Zap, { "size": 40, "class": "text-amber-400 mb-6" })} <h3 class="text-xl font-bold text-white mb-3">Velocidad</h3> <p class="text-gray-400">Entendemos urgencias. Reparamos pantallas, pin de cargas y UPS en tiempos récord el mismo día.</p> </div> </div> </div> ` })}`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/nosotros.astro", void 0);

const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/nosotros.astro";
const $$url = "/nosotros";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Nosotros,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
