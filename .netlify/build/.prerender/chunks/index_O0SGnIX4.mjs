import { c as createComponent, $ as $$Layout } from './Layout_B4HaNM--.mjs';
import 'piccolore';
import { a as renderTemplate, r as renderComponent, m as maybeRenderHead, b as addAttribute } from './prerender_hQavP005.mjs';
import { ChevronRight, Star, Heart, Zap, ArrowRight, ShieldCheck, Eye } from 'lucide-svelte';
import * as $ from 'svelte/internal/server';
import { onMount } from 'svelte';

const formatPrice = (price) => {
  if (price === null || price === void 0) return "0,00";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "0,00";
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

function ProductCarousel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let products = $.fallback($$props['products'], () => [], true);

		onMount(() => {
		});

		$$renderer.push(`<div class="relative group">`);

		{
			$$renderer.push('<!--[-1-->');
		}

		$$renderer.push(`<!--]--> `);

		{
			$$renderer.push('<!--[0-->');
			$$renderer.push(`<button class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-2xl hidden md:flex" aria-label="Siguiente">`);
			ChevronRight($$renderer, { size: 24 });
			$$renderer.push(`<!----></button>`);
		}

		$$renderer.push(`<!--]--> <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2 svelte-rztmeh" style="scrollbar-width: none; -ms-overflow-style: none;"><!--[-->`);

		const each_array = $.ensure_array_like(products);

		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];

			$$renderer.push(`<div class="min-w-[280px] md:min-w-[320px] snap-start"><a${$.attr('href', `/producto/${item.product_id || item.id}`)} class="group block glassmorphism rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] transition-all duration-500"><div class="h-64 overflow-hidden relative">`);

			if (item.images && item.images.length > 0) {
				$$renderer.push('<!--[0-->');
				$$renderer.push(`<img${$.attr('src', item.images[0])}${$.attr('alt', item.product_name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>`);
			} else {
				$$renderer.push('<!--[-1-->');
				$$renderer.push(`<div class="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-sm">Sin Imagen</div>`);
			}

			$$renderer.push(`<!--]--> <div class="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-400">`);
			Star($$renderer, { size: 14, class: 'fill-amber-400' });
			$$renderer.push(`<!----> ${$.escape(item.average_rating > 0 ? item.average_rating.toFixed(1) : 'Nuevo')}</div></div> <div class="p-6"><h3 class="text-xl font-bold text-white mb-1 truncate group-hover:text-indigo-400 transition-colors"${$.attr('title', item.product_name || item.name)}>${$.escape(item.product_name || item.name)}</h3> <div class="flex items-baseline gap-2 mb-4">`);

			if ((item.discount_price || item.discount) && item.is_discount_active !== false) {
				$$renderer.push('<!--[0-->');
				$$renderer.push(`<span class="text-lg font-bold text-emerald-400">$${$.escape(formatPrice(item.discount_price || item.discount))}</span> <span class="text-sm text-gray-500 line-through">$${$.escape(formatPrice(item.price))}</span>`);
			} else {
				$$renderer.push('<!--[-1-->');
				$$renderer.push(`<span class="text-lg font-bold text-emerald-400">$${$.escape(formatPrice(item.price))}</span>`);
			}

			$$renderer.push(`<!--]--></div> <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5"><div class="flex items-center gap-4 text-xs text-gray-400"><span class="flex items-center gap-1.5">`);
			Heart($$renderer, { size: 14, class: 'text-pink-500' });
			$$renderer.push(`<!----> ${$.escape(item.total_likes ?? 0)}</span> <span class="w-1 h-1 rounded-full bg-gray-700"></span> <span>${$.escape(item.total_views ?? item.views ?? 0)} visualizaciones</span></div> <div class="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">`);
			ChevronRight($$renderer, { size: 18 });
			$$renderer.push(`<!----></div></div></div></a></div>`);
		}

		$$renderer.push(`<!--]--></div></div>`);
		$.bind_props($$props, { products });
	});
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const API_URL = "http://127.0.0.1:8000";
  let trendingProducts = [];
  let mostViewedProducts = [];
  let allProducts = [];
  try {
    const [statsRes, prodRes] = await Promise.all([
      fetch(`${API_URL}/products/statistics/trending`),
      fetch(`${API_URL}/products/`)
    ]);
    if (statsRes.ok) {
      const stats = await statsRes.json();
      trendingProducts = stats;
      mostViewedProducts = [...stats].sort((a, b) => b.total_views - a.total_views).slice(0, 4);
    }
    if (prodRes.ok) {
      allProducts = await prodRes.json();
    }
  } catch (e) {
    console.error("Error fetching homepage data", e);
  }
  return renderTemplate(_a || (_a = __template(["", "  <script>\n    const slides = document.querySelectorAll('.carousel-slide');\n    const dots = document.querySelectorAll('.carousel-dot');\n    let currentSlide = 0;\n    let autoPlayInterval;\n\n    function showSlide(index) {\n        slides.forEach(s => s.classList.remove('active'));\n        dots.forEach(d => d.classList.remove('active'));\n        \n        slides[index].classList.add('active');\n        dots[index].classList.add('active');\n        currentSlide = index;\n    }\n\n    function nextSlide() {\n        showSlide((currentSlide + 1) % slides.length);\n    }\n\n    dots.forEach((dot, idx) => {\n        dot.addEventListener('click', () => {\n            showSlide(idx);\n            resetInterval();\n        });\n    });\n\n    function resetInterval() {\n        clearInterval(autoPlayInterval);\n        autoPlayInterval = setInterval(nextSlide, 5000);\n    }\n\n    // Init\n    showSlide(0);\n    resetInterval();\n</script>"])), renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="relative overflow-hidden w-full h-[90vh] md:h-[85vh] bg-[#0b0f19]" data-astro-cid-j7pv25f6> <div id="hero-carousel" class="relative w-full h-full" data-astro-cid-j7pv25f6> <!-- Slide 1 --> <div class="carousel-slide active absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-1000 z-0 scale-110" data-astro-cid-j7pv25f6> <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-[#0b0f19] to-transparent -z-10" data-astro-cid-j7pv25f6></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[150px] rounded-full -z-10" data-astro-cid-j7pv25f6></div> <div class="max-w-7xl mx-auto px-4 text-center" data-astro-cid-j7pv25f6> <span class="carousel-badge px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-medium text-sm mb-6 inline-flex items-center gap-2 transform -translate-y-10 opacity-0 transition-all duration-700 delay-300" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Zap", Zap, { "size": 14, "data-astro-cid-j7pv25f6": true })} La Mejor Tecnología
</span> <h1 class="carousel-title text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 transform -translate-y-10 opacity-0 transition-all duration-700 delay-500" data-astro-cid-j7pv25f6>
REPARACIÓN Y <span class="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent" data-astro-cid-j7pv25f6>VENTA</span> </h1> <p class="carousel-desc text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transform -translate-y-10 opacity-0 transition-all duration-700 delay-700" data-astro-cid-j7pv25f6>
Especialistas en dispositivos móviles. Repuestos originales y servicio técnico garantizado el mismo día.
</p> <div class="carousel-btns flex flex-col sm:flex-row gap-4 justify-center transform -translate-y-10 opacity-0 transition-all duration-700 delay-900" data-astro-cid-j7pv25f6> <a href="/productos" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2" data-astro-cid-j7pv25f6>
Explorar Catálogo ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 20, "data-astro-cid-j7pv25f6": true })} </a> </div> </div> </div> <!-- Slide 2 --> <div class="carousel-slide absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-1000 z-0 scale-110" data-astro-cid-j7pv25f6> <div class="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-[#0b0f19] to-transparent -z-10" data-astro-cid-j7pv25f6></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[150px] rounded-full -z-10" data-astro-cid-j7pv25f6></div> <div class="max-w-7xl mx-auto px-4 text-center" data-astro-cid-j7pv25f6> <span class="carousel-badge px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-medium text-sm mb-6 inline-flex items-center gap-2 transform -translate-y-10 opacity-0 transition-all duration-700 delay-300" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Star", Star, { "size": 14, "data-astro-cid-j7pv25f6": true })} Ofertas Increíbles
</span> <h1 class="carousel-title text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 transform -translate-y-10 opacity-0 transition-all duration-700 delay-500" data-astro-cid-j7pv25f6>
GRANDES <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent" data-astro-cid-j7pv25f6>OFERTAS</span> </h1> <p class="carousel-desc text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transform -translate-y-10 opacity-0 transition-all duration-700 delay-700" data-astro-cid-j7pv25f6>
Descubre precios de oferta en pantallas, baterías y accesorios seleccionados de las mejores marcas.
</p> <div class="carousel-btns flex flex-col sm:flex-row gap-4 justify-center transform -translate-y-10 opacity-0 transition-all duration-700 delay-900" data-astro-cid-j7pv25f6> <a href="/productos" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2" data-astro-cid-j7pv25f6>
Ver Descuentos ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 20, "data-astro-cid-j7pv25f6": true })} </a> </div> </div> </div> <!-- Slide 3 --> <div class="carousel-slide absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-1000 z-0 scale-110" data-astro-cid-j7pv25f6> <div class="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0b0f19] to-transparent -z-10" data-astro-cid-j7pv25f6></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[150px] rounded-full -z-10" data-astro-cid-j7pv25f6></div> <div class="max-w-7xl mx-auto px-4 text-center" data-astro-cid-j7pv25f6> <span class="carousel-badge px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium text-sm mb-6 inline-flex items-center gap-2 transform -translate-y-10 opacity-0 transition-all duration-700 delay-300" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ShieldCheck", ShieldCheck, { "size": 14, "data-astro-cid-j7pv25f6": true })} Confianza Total
</span> <h1 class="carousel-title text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 transform -translate-y-10 opacity-0 transition-all duration-700 delay-500" data-astro-cid-j7pv25f6>
SERVICIO <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" data-astro-cid-j7pv25f6>EXPERTOS</span> </h1> <p class="carousel-desc text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transform -translate-y-10 opacity-0 transition-all duration-700 delay-700" data-astro-cid-j7pv25f6>
Más de 10 años brindando soluciones técnicas. Si tiene reparación, nosotros lo logramos.
</p> <div class="carousel-btns flex flex-col sm:flex-row gap-4 justify-center transform -translate-y-10 opacity-0 transition-all duration-700 delay-900" data-astro-cid-j7pv25f6> <a href="/contacto" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2" data-astro-cid-j7pv25f6>
Contactar Técnico ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 20, "data-astro-cid-j7pv25f6": true })} </a> </div> </div> </div> </div> <!-- Navigation Dots --> <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20" data-astro-cid-j7pv25f6> <button class="carousel-dot w-3 h-3 rounded-full bg-white/20 hover:bg-white/50 transition-all active" data-astro-cid-j7pv25f6></button> <button class="carousel-dot w-3 h-3 rounded-full bg-white/20 hover:bg-white/50 transition-all" data-astro-cid-j7pv25f6></button> <button class="carousel-dot w-3 h-3 rounded-full bg-white/20 hover:bg-white/50 transition-all" data-astro-cid-j7pv25f6></button> </div> </div>  <div class="py-20 bg-[#070b14]" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="flex items-end justify-between mb-10" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-white mb-2" data-astro-cid-j7pv25f6>Novedades en Tienda</h2> <p class="text-gray-400" data-astro-cid-j7pv25f6>Descubre nuestros ingresos más recientes y repuestos disponibles.</p> </div> <a href="/productos" class="hidden sm:flex text-indigo-400 hover:text-indigo-300 items-center gap-1 font-medium" data-astro-cid-j7pv25f6>
Ver todos ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 18, "data-astro-cid-j7pv25f6": true })} </a> </div> ${allProducts.length === 0 ? renderTemplate`<div class="text-center py-20 glassmorphism rounded-2xl border-dashed" data-astro-cid-j7pv25f6> <p class="text-gray-400" data-astro-cid-j7pv25f6>Cargando productos...</p> </div>` : renderTemplate`${renderComponent($$result2, "ProductCarousel", ProductCarousel, { "client:load": true, "products": allProducts, "client:component-hydration": "load", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/ProductCarousel.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })}`} </div> </div>  <div class="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-j7pv25f6> <div class="flex items-end justify-between mb-12" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 class="text-3xl md:text-4xl font-bold text-white mb-4" data-astro-cid-j7pv25f6>Lo Más Buscado</h2> <p class="text-gray-400" data-astro-cid-j7pv25f6>Los productos y repuestos mejor valorados por nuestros clientes.</p> </div> </div> ${trendingProducts.length === 0 && renderTemplate`<div class="text-center py-20 glassmorphism rounded-2xl border-dashed" data-astro-cid-j7pv25f6> <p class="text-gray-400" data-astro-cid-j7pv25f6>No hay productos en tendencia aún. ¡Sé el primero en calificar!</p> </div>`} <div class="mb-16" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCarousel", ProductCarousel, { "client:load": true, "products": trendingProducts, "client:component-hydration": "load", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/ProductCarousel.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <!-- Mas Vistos Section --> ${mostViewedProducts.length > 0 && renderTemplate`<div class="mt-20" data-astro-cid-j7pv25f6> <div class="flex items-end justify-between mb-12 border-l-4 border-indigo-500 pl-6" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <h2 class="text-3xl font-bold text-white mb-2" data-astro-cid-j7pv25f6>Populares Ahora</h2> <p class="text-gray-400" data-astro-cid-j7pv25f6>Lo que otros clientes están revisando en este momento.</p> </div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-astro-cid-j7pv25f6> ${mostViewedProducts.map((item) => renderTemplate`<a${addAttribute(`/producto/${item.product_id}`, "href")} class="group glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all block" data-astro-cid-j7pv25f6> <div class="h-32 bg-gray-900 flex items-center p-4 gap-4" data-astro-cid-j7pv25f6> <div class="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden shrink-0 border border-gray-700" data-astro-cid-j7pv25f6> ${item.images && item.images.length > 0 ? renderTemplate`<img${addAttribute(item.images[0], "src")}${addAttribute(item.product_name, "alt")} class="w-full h-full object-cover" data-astro-cid-j7pv25f6>` : renderTemplate`<div class="w-full h-full flex items-center justify-center text-[10px] text-gray-600" data-astro-cid-j7pv25f6>N/A</div>`} </div> <div class="min-w-0" data-astro-cid-j7pv25f6> <h4 class="text-white font-bold text-sm truncate mb-1" data-astro-cid-j7pv25f6>${item.product_name}</h4> <div class="flex items-center gap-2 text-[11px] text-gray-400" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Eye", Eye, { "size": 12, "class": "text-emerald-400", "data-astro-cid-j7pv25f6": true })} ${item.total_views} visualizaciones
</div> </div> </div> </a>`)} </div> </div>`} <div class="mt-8 sm:hidden" data-astro-cid-j7pv25f6> <a href="/productos" class="w-full py-4 glassmorphism text-indigo-400 hover:text-indigo-300 rounded-xl flex items-center justify-center gap-2 font-medium" data-astro-cid-j7pv25f6>
Ver todos ${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 18, "data-astro-cid-j7pv25f6": true })} </a> </div> </div> ` }));
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/index.astro", void 0);
const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
