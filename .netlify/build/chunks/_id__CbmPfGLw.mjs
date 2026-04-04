import { c as createComponent } from './astro-component_CXOUD-i_.mjs';
import 'piccolore';
import { e as addAttribute, g as renderHead, h as renderComponent, i as renderSlot, r as renderTemplate, j as attributes, k as clsx, l as spread_props, n as defineScriptVars, m as maybeRenderHead } from './ssr-function_BXEzfdrx.mjs';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/icon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Digital Center - Tienda Electrónica</title><!-- Google Fonts para Aesthetics --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-[#0b0f19] text-gray-100 font-['Outfit'] min-h-screen flex flex-col selection:bg-indigo-500/30"> ${renderComponent($$result, "Navbar", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/Navbar.svelte", "client:component-export": "default" })} <main class="flex-grow scroll-smooth"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/Footer.svelte", "client:component-export": "default" })}</body></html>`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/layouts/Layout.astro", void 0);

function Icon($$renderer, $$props) {
	let {
		size = 24,
		color = 'currentColor',
		strokeWidth = 2,
		class: className = '',
		absoluteStrokeWidth = false,
		children,
		$$slots,
		$$events,
		...rest
	} = $$props;

	$$renderer.push(`<svg${attributes(
		{
			xmlns: 'http://www.w3.org/2000/svg',
			width: size,
			height: size,
			viewBox: '0 0 24 24',
			fill: 'none',
			stroke: color,
			'stroke-width': absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			class: clsx(className),
			...rest
		},
		void 0,
		void 0,
		void 0,
		3
	)}>`);

	children?.($$renderer);
	$$renderer.push(`<!----></svg>`);
}

function Star($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;

	Icon($$renderer, spread_props([
		props,
		{
			children: ($$renderer) => {
				$$renderer.push(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>`);
			},
			$$slots: { default: true }
		}
	]));
}

function MessageSquare($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;

	Icon($$renderer, spread_props([
		props,
		{
			children: ($$renderer) => {
				$$renderer.push(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>`);
			},
			$$slots: { default: true }
		}
	]));
}

function Heart($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;

	Icon($$renderer, spread_props([
		props,
		{
			children: ($$renderer) => {
				$$renderer.push(`<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>`);
			},
			$$slots: { default: true }
		}
	]));
}

function ThumbsUp($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;

	Icon($$renderer, spread_props([
		props,
		{
			children: ($$renderer) => {
				$$renderer.push(`<path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>`);
			},
			$$slots: { default: true }
		}
	]));
}

const formatPrice = (price) => {
  if (price === null || price === void 0) return "0,00";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "0,00";
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const API_URL = "http://127.0.0.1:8000";
  let product = null;
  try {
    const res = await fetch(`${API_URL}/products/${id}/`);
    if (res.ok) {
      product = await res.json();
    }
  } catch (e) {
    console.error(e);
  }
  const WHATSAPP_NUMBER = "584140488683";
  const whatsappBaseMessage = product ? `Hola, me interesa comprar el repuesto/equipo: ${product.name}. ¿Sigue disponible?` : "Hola";
  const encodedMsg = encodeURIComponent(whatsappBaseMessage);
  const whastappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  if (!product) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-mvbiubgv": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[85vh]" data-astro-cid-mvbiubgv> <div class="glassmorphism p-6 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12" data-astro-cid-mvbiubgv> <!-- Galería de imágenes (FastAPI permitió hasta 6) --> <div class="space-y-4" data-astro-cid-mvbiubgv> <div class="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative" data-astro-cid-mvbiubgv> ', " ", " </div> <!-- Miniaturas (Max 5 más) --> ", ' </div> <div class="flex items-center justify-between mb-2" data-astro-cid-mvbiubgv> <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium w-fit" data-astro-cid-mvbiubgv>\nCategoría Asociada\n</div> <button id="like-btn" class="p-3 bg-gray-900 border border-gray-800 rounded-2xl text-gray-400 hover:text-pink-500 hover:border-pink-500/30 transition-all active:scale-90 group relative" data-astro-cid-mvbiubgv> ', ' <span class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800" data-astro-cid-mvbiubgv>¡Me gusta!</span> </button> </div> <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" data-astro-cid-mvbiubgv>', '</h1> <div class="flex items-center gap-6 text-gray-400 mb-8 border-b border-gray-800 pb-6" data-astro-cid-mvbiubgv> <span class="flex items-center gap-2" data-astro-cid-mvbiubgv> ', ' Nuevo Ingreso\n</span> <span id="views-counter" class="flex items-center gap-2" data-astro-cid-mvbiubgv> ', " ", ' visualizaciones\n</span> </div> <p class="text-gray-300 text-lg leading-relaxed mb-6" data-astro-cid-mvbiubgv>', '</p> <div class="bg-gray-900/50 p-6 rounded-2xl mb-8 border border-white/5" data-astro-cid-mvbiubgv> <h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-60" data-astro-cid-mvbiubgv>Califica este producto</h4> <div class="flex gap-2" id="rating-stars" data-astro-cid-mvbiubgv> ', ' </div> <p id="rating-msg" class="text-xs text-indigo-400 mt-2 opacity-0 transition-opacity" data-astro-cid-mvbiubgv>¡Gracias por calificar!</p> </div> <div class="mb-10" data-astro-cid-mvbiubgv> ', " </div> <a", ' target="_blank" rel="noopener noreferrer" class="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 text-lg" data-astro-cid-mvbiubgv> <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" data-astro-cid-mvbiubgv><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" data-astro-cid-mvbiubgv></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" data-astro-cid-mvbiubgv></path></svg>\nComprar via WhatsApp\n</a> </div> </div>  <div class="mt-16 glassmorphism p-8 sm:p-10 rounded-3xl border border-gray-800" data-astro-cid-mvbiubgv> <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-astro-cid-mvbiubgv> ', ' Opiniones y Comentarios\n</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-12" data-astro-cid-mvbiubgv> <!-- Add Comment Form --> <div class="md:col-span-1 border-r border-gray-800 pr-0 md:pr-12" data-astro-cid-mvbiubgv> <h4 class="text-lg font-semibold text-white mb-4" data-astro-cid-mvbiubgv>Deja tu comentario</h4> <div class="space-y-4" data-astro-cid-mvbiubgv> <textarea id="comment-text" placeholder="¿Qué te pareció este producto?" class="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none" data-astro-cid-mvbiubgv></textarea> <button id="submit-comment" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2" data-astro-cid-mvbiubgv>\nPublicar comentario\n</button> </div> </div> <!-- Comments List --> <div class="md:col-span-2 space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide" id="comments-list" data-astro-cid-mvbiubgv> <p class="text-gray-500 italic" data-astro-cid-mvbiubgv>Cargando comentarios...</p> </div> </div> </div> <script>(function(){', "\n    // Manejo de la galería de imágenes\n    const mainImage = document.getElementById('main-image');\n    const thumbBtns = document.querySelectorAll('.thumbnail-btn');\n\n    thumbBtns.forEach(btn => {\n        btn.addEventListener('click', () => {\n            const newSrc = btn.getAttribute('data-src');\n            if (mainImage && newSrc) {\n                mainImage.style.opacity = '0';\n                setTimeout(() => {\n                    mainImage.src = newSrc;\n                    mainImage.style.opacity = '1';\n                }, 150);\n            }\n        });\n    });\n\n    // --- Like Logic (Toggle) ---\n    const likeBtn = document.getElementById('like-btn');\n    const likeIcon = document.getElementById('like-icon');\n    let likeId = localStorage.getItem(`likeId_${productId}`);\n    let hasLiked = !!likeId;\n\n    if (hasLiked) {\n        likeIcon.style.fill = '#ec4899';\n        likeIcon.style.color = '#ec4899';\n    }\n\n    likeBtn.addEventListener('click', async () => {\n        if (hasLiked) {\n            // UNLIKE\n            try {\n                const res = await fetch(`${apiUrl}/interactions/like/${likeId}`, { method: 'DELETE' });\n                if (res.ok) {\n                    hasLiked = false;\n                    likeId = null;\n                    localStorage.removeItem(`likeId_${productId}`);\n                    likeIcon.style.fill = 'none';\n                    likeIcon.style.color = 'currentColor';\n                }\n            } catch(e) { console.error(\"Error unliking\", e); }\n        } else {\n            // LIKE\n            try {\n                const res = await fetch(`${apiUrl}/interactions/products/${productId}/like`, { method: 'POST' });\n                if (res.ok) {\n                    const data = await res.json();\n                    hasLiked = true;\n                    likeId = data.id;\n                    localStorage.setItem(`likeId_${productId}`, likeId);\n                    likeIcon.style.fill = '#ec4899';\n                    likeIcon.style.color = '#ec4899';\n                    likeBtn.style.transform = 'scale(1.2)';\n                    setTimeout(() => likeBtn.style.transform = 'scale(1)', 200);\n                }\n            } catch(e) { console.error(\"Error liking product\", e); }\n        }\n    });\n\n    // --- Rating Logic ---\n    const starBtns = document.querySelectorAll('.star-btn');\n    const ratingMsg = document.getElementById('rating-msg');\n    let hasRated = localStorage.getItem(`rate_${productId}`) === 'true';\n\n    if (hasRated) {\n        starBtns.forEach(btn => btn.style.pointerEvents = 'none');\n        ratingMsg.style.opacity = '1';\n        ratingMsg.textContent = 'Ya has calificado este artículo';\n    }\n\n    starBtns.forEach(btn => {\n        btn.addEventListener('click', async () => {\n            if (hasRated) return;\n            const score = parseInt(btn.getAttribute('data-score'));\n\n            try {\n                const res = await fetch(`${apiUrl}/interactions/products/${productId}/rate`, {\n                    method: 'POST',\n                    headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({ score: score })\n                });\n\n                if (res.ok) {\n                    hasRated = true;\n                    localStorage.setItem(`rate_${productId}`, 'true');\n                    \n                    // Colorear estrellas hasta el score\n                    starBtns.forEach(sb => {\n                        if (parseInt(sb.getAttribute('data-score')) <= score) {\n                            sb.style.color = '#fbbf24';\n                        }\n                        sb.style.pointerEvents = 'none';\n                    });\n\n                    ratingMsg.style.opacity = '1';\n                }\n            } catch(e) { console.error(\"Error rating product\", e); }\n        });\n    });\n\n    // --- Comments Logic ---\n    const commentList = document.getElementById('comments-list');\n    const commentInput = document.getElementById('comment-text');\n    const submitBtn = document.getElementById('submit-comment');\n\n    async function loadComments() {\n        try {\n            const res = await fetch(`${apiUrl}/interactions/products/${productId}/comments`);\n            if (res.ok) {\n                const comments = await res.json();\n                if (comments.length === 0) {\n                    commentList.innerHTML = '<p class=\"text-gray-500 italic\">No hay comentarios todavía. ¡Sé el primero!</p>';\n                    return;\n                }\n                \n                commentList.innerHTML = comments.map(c => `\n                    <div class=\"bg-gray-900 border border-gray-800 p-6 rounded-2xl\">\n                        <div class=\"flex items-center justify-between mb-3\">\n                            <span class=\"text-indigo-400 font-bold text-sm\">Cliente Anónimo</span>\n                            <span class=\"text-gray-600 text-xs\">${new Date(c.created_at).toLocaleDateString()}</span>\n                        </div>\n                        <p class=\"text-gray-300 text-sm leading-relaxed\">${c.content}</p>\n                    </div>\n                `).join('');\n            }\n        } catch(e) { console.error(\"Error loading comments\", e); }\n    }\n\n    submitBtn.addEventListener('click', async () => {\n        const content = commentInput.value.trim();\n        if (!content) return;\n\n        submitBtn.disabled = true;\n        submitBtn.textContent = 'Enviando...';\n\n        try {\n            const res = await fetch(`${apiUrl}/interactions/products/${productId}/comments?content=${encodeURIComponent(content)}`, {\n                method: 'POST'\n            });\n\n            if (res.ok) {\n                commentInput.value = '';\n                await loadComments();\n            }\n        } catch(e) { console.error(\"Error posting comment\", e); }\n        finally {\n            submitBtn.disabled = false;\n            submitBtn.textContent = 'Publicar comentario';\n        }\n    });\n\n    loadComments();\n})();</script> "], [" ", '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[85vh]" data-astro-cid-mvbiubgv> <div class="glassmorphism p-6 sm:p-10 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12" data-astro-cid-mvbiubgv> <!-- Galería de imágenes (FastAPI permitió hasta 6) --> <div class="space-y-4" data-astro-cid-mvbiubgv> <div class="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl relative" data-astro-cid-mvbiubgv> ', " ", " </div> <!-- Miniaturas (Max 5 más) --> ", ' </div> <div class="flex items-center justify-between mb-2" data-astro-cid-mvbiubgv> <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium w-fit" data-astro-cid-mvbiubgv>\nCategoría Asociada\n</div> <button id="like-btn" class="p-3 bg-gray-900 border border-gray-800 rounded-2xl text-gray-400 hover:text-pink-500 hover:border-pink-500/30 transition-all active:scale-90 group relative" data-astro-cid-mvbiubgv> ', ' <span class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800" data-astro-cid-mvbiubgv>¡Me gusta!</span> </button> </div> <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" data-astro-cid-mvbiubgv>', '</h1> <div class="flex items-center gap-6 text-gray-400 mb-8 border-b border-gray-800 pb-6" data-astro-cid-mvbiubgv> <span class="flex items-center gap-2" data-astro-cid-mvbiubgv> ', ' Nuevo Ingreso\n</span> <span id="views-counter" class="flex items-center gap-2" data-astro-cid-mvbiubgv> ', " ", ' visualizaciones\n</span> </div> <p class="text-gray-300 text-lg leading-relaxed mb-6" data-astro-cid-mvbiubgv>', '</p> <div class="bg-gray-900/50 p-6 rounded-2xl mb-8 border border-white/5" data-astro-cid-mvbiubgv> <h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider opacity-60" data-astro-cid-mvbiubgv>Califica este producto</h4> <div class="flex gap-2" id="rating-stars" data-astro-cid-mvbiubgv> ', ' </div> <p id="rating-msg" class="text-xs text-indigo-400 mt-2 opacity-0 transition-opacity" data-astro-cid-mvbiubgv>¡Gracias por calificar!</p> </div> <div class="mb-10" data-astro-cid-mvbiubgv> ', " </div> <a", ' target="_blank" rel="noopener noreferrer" class="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 text-lg" data-astro-cid-mvbiubgv> <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6" data-astro-cid-mvbiubgv><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" data-astro-cid-mvbiubgv></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" data-astro-cid-mvbiubgv></path></svg>\nComprar via WhatsApp\n</a> </div> </div>  <div class="mt-16 glassmorphism p-8 sm:p-10 rounded-3xl border border-gray-800" data-astro-cid-mvbiubgv> <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-astro-cid-mvbiubgv> ', ' Opiniones y Comentarios\n</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-12" data-astro-cid-mvbiubgv> <!-- Add Comment Form --> <div class="md:col-span-1 border-r border-gray-800 pr-0 md:pr-12" data-astro-cid-mvbiubgv> <h4 class="text-lg font-semibold text-white mb-4" data-astro-cid-mvbiubgv>Deja tu comentario</h4> <div class="space-y-4" data-astro-cid-mvbiubgv> <textarea id="comment-text" placeholder="¿Qué te pareció este producto?" class="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none" data-astro-cid-mvbiubgv></textarea> <button id="submit-comment" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2" data-astro-cid-mvbiubgv>\nPublicar comentario\n</button> </div> </div> <!-- Comments List --> <div class="md:col-span-2 space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide" id="comments-list" data-astro-cid-mvbiubgv> <p class="text-gray-500 italic" data-astro-cid-mvbiubgv>Cargando comentarios...</p> </div> </div> </div> <script>(function(){', "\n    // Manejo de la galería de imágenes\n    const mainImage = document.getElementById('main-image');\n    const thumbBtns = document.querySelectorAll('.thumbnail-btn');\n\n    thumbBtns.forEach(btn => {\n        btn.addEventListener('click', () => {\n            const newSrc = btn.getAttribute('data-src');\n            if (mainImage && newSrc) {\n                mainImage.style.opacity = '0';\n                setTimeout(() => {\n                    mainImage.src = newSrc;\n                    mainImage.style.opacity = '1';\n                }, 150);\n            }\n        });\n    });\n\n    // --- Like Logic (Toggle) ---\n    const likeBtn = document.getElementById('like-btn');\n    const likeIcon = document.getElementById('like-icon');\n    let likeId = localStorage.getItem(\\`likeId_\\${productId}\\`);\n    let hasLiked = !!likeId;\n\n    if (hasLiked) {\n        likeIcon.style.fill = '#ec4899';\n        likeIcon.style.color = '#ec4899';\n    }\n\n    likeBtn.addEventListener('click', async () => {\n        if (hasLiked) {\n            // UNLIKE\n            try {\n                const res = await fetch(\\`\\${apiUrl}/interactions/like/\\${likeId}\\`, { method: 'DELETE' });\n                if (res.ok) {\n                    hasLiked = false;\n                    likeId = null;\n                    localStorage.removeItem(\\`likeId_\\${productId}\\`);\n                    likeIcon.style.fill = 'none';\n                    likeIcon.style.color = 'currentColor';\n                }\n            } catch(e) { console.error(\"Error unliking\", e); }\n        } else {\n            // LIKE\n            try {\n                const res = await fetch(\\`\\${apiUrl}/interactions/products/\\${productId}/like\\`, { method: 'POST' });\n                if (res.ok) {\n                    const data = await res.json();\n                    hasLiked = true;\n                    likeId = data.id;\n                    localStorage.setItem(\\`likeId_\\${productId}\\`, likeId);\n                    likeIcon.style.fill = '#ec4899';\n                    likeIcon.style.color = '#ec4899';\n                    likeBtn.style.transform = 'scale(1.2)';\n                    setTimeout(() => likeBtn.style.transform = 'scale(1)', 200);\n                }\n            } catch(e) { console.error(\"Error liking product\", e); }\n        }\n    });\n\n    // --- Rating Logic ---\n    const starBtns = document.querySelectorAll('.star-btn');\n    const ratingMsg = document.getElementById('rating-msg');\n    let hasRated = localStorage.getItem(\\`rate_\\${productId}\\`) === 'true';\n\n    if (hasRated) {\n        starBtns.forEach(btn => btn.style.pointerEvents = 'none');\n        ratingMsg.style.opacity = '1';\n        ratingMsg.textContent = 'Ya has calificado este artículo';\n    }\n\n    starBtns.forEach(btn => {\n        btn.addEventListener('click', async () => {\n            if (hasRated) return;\n            const score = parseInt(btn.getAttribute('data-score'));\n\n            try {\n                const res = await fetch(\\`\\${apiUrl}/interactions/products/\\${productId}/rate\\`, {\n                    method: 'POST',\n                    headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({ score: score })\n                });\n\n                if (res.ok) {\n                    hasRated = true;\n                    localStorage.setItem(\\`rate_\\${productId}\\`, 'true');\n                    \n                    // Colorear estrellas hasta el score\n                    starBtns.forEach(sb => {\n                        if (parseInt(sb.getAttribute('data-score')) <= score) {\n                            sb.style.color = '#fbbf24';\n                        }\n                        sb.style.pointerEvents = 'none';\n                    });\n\n                    ratingMsg.style.opacity = '1';\n                }\n            } catch(e) { console.error(\"Error rating product\", e); }\n        });\n    });\n\n    // --- Comments Logic ---\n    const commentList = document.getElementById('comments-list');\n    const commentInput = document.getElementById('comment-text');\n    const submitBtn = document.getElementById('submit-comment');\n\n    async function loadComments() {\n        try {\n            const res = await fetch(\\`\\${apiUrl}/interactions/products/\\${productId}/comments\\`);\n            if (res.ok) {\n                const comments = await res.json();\n                if (comments.length === 0) {\n                    commentList.innerHTML = '<p class=\"text-gray-500 italic\">No hay comentarios todavía. ¡Sé el primero!</p>';\n                    return;\n                }\n                \n                commentList.innerHTML = comments.map(c => \\`\n                    <div class=\"bg-gray-900 border border-gray-800 p-6 rounded-2xl\">\n                        <div class=\"flex items-center justify-between mb-3\">\n                            <span class=\"text-indigo-400 font-bold text-sm\">Cliente Anónimo</span>\n                            <span class=\"text-gray-600 text-xs\">\\${new Date(c.created_at).toLocaleDateString()}</span>\n                        </div>\n                        <p class=\"text-gray-300 text-sm leading-relaxed\">\\${c.content}</p>\n                    </div>\n                \\`).join('');\n            }\n        } catch(e) { console.error(\"Error loading comments\", e); }\n    }\n\n    submitBtn.addEventListener('click', async () => {\n        const content = commentInput.value.trim();\n        if (!content) return;\n\n        submitBtn.disabled = true;\n        submitBtn.textContent = 'Enviando...';\n\n        try {\n            const res = await fetch(\\`\\${apiUrl}/interactions/products/\\${productId}/comments?content=\\${encodeURIComponent(content)}\\`, {\n                method: 'POST'\n            });\n\n            if (res.ok) {\n                commentInput.value = '';\n                await loadComments();\n            }\n        } catch(e) { console.error(\"Error posting comment\", e); }\n        finally {\n            submitBtn.disabled = false;\n            submitBtn.textContent = 'Publicar comentario';\n        }\n    });\n\n    loadComments();\n})();</script> "])), maybeRenderHead(), product.discount_price && product.is_discount_active && renderTemplate`<div class="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg z-10 shadow-lg uppercase tracking-widest animate-bounce" data-astro-cid-mvbiubgv>Oferta Especial</div>`, product.images && product.images.length > 0 ? renderTemplate`<img id="main-image"${addAttribute(product.images[0], "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover transition-all duration-300" data-astro-cid-mvbiubgv>` : renderTemplate`<div class="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gradient-to-tr from-gray-800 to-gray-900" data-astro-cid-mvbiubgv> <span class="text-sm border border-gray-700 px-4 py-2 rounded-full" data-astro-cid-mvbiubgv>Imagen no disponible</span> </div>`, product.images && product.images.length > 1 && renderTemplate`<div class="grid grid-cols-5 gap-3" data-astro-cid-mvbiubgv> ${product.images.map((img, idx) => renderTemplate`<button class="aspect-square rounded-xl overflow-hidden cursor-pointer border hover:border-indigo-500 border-gray-800 transition-colors thumbnail-btn"${addAttribute(img, "data-src")} data-astro-cid-mvbiubgv> <img${addAttribute(img, "src")}${addAttribute(`Galeria ${idx}`, "alt")} class="w-full h-full object-cover" data-astro-cid-mvbiubgv> </button>`)} </div>`, renderComponent($$result2, "Heart", Heart, { "id": "like-icon", "size": 24, "data-astro-cid-mvbiubgv": true }), product.name, renderComponent($$result2, "Star", Star, { "size": 18, "class": "text-amber-400", "data-astro-cid-mvbiubgv": true }), renderComponent($$result2, "ThumbsUp", ThumbsUp, { "size": 18, "class": "text-indigo-400", "data-astro-cid-mvbiubgv": true }), product.views || 0, product.description, [1, 2, 3, 4, 5].map((s) => renderTemplate`<button class="star-btn p-1 text-gray-600 hover:text-amber-400 transition-all hover:scale-110"${addAttribute(s, "data-score")} data-astro-cid-mvbiubgv> ${renderComponent($$result2, "Star", Star, { "size": 28, "data-astro-cid-mvbiubgv": true })} </button>`), product.discount_price && product.is_discount_active ? renderTemplate`<div class="flex flex-col" data-astro-cid-mvbiubgv> <span class="text-xl text-gray-500 line-through mb-1" data-astro-cid-mvbiubgv>$${formatPrice(product.price)}</span> <span class="text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent" data-astro-cid-mvbiubgv>
$${formatPrice(product.discount_price)} </span> </div>` : renderTemplate`<div class="text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent" data-astro-cid-mvbiubgv>
$${formatPrice(product.price)} </div>`, addAttribute(whastappUrl, "href"), renderComponent($$result2, "MessageSquare", MessageSquare, { "class": "text-indigo-400", "data-astro-cid-mvbiubgv": true }), defineScriptVars({ productId: product.id, apiUrl: API_URL })) })}`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/producto/[id].astro", void 0);
const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
