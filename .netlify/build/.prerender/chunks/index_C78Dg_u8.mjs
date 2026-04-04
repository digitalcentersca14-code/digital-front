import { c as createComponent, $ as $$Layout } from './Layout_B4HaNM--.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_hQavP005.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const API_URL = "http://127.0.0.1:8000";
  let products = [];
  try {
    const res = await fetch(`${API_URL}/products/`);
    if (res.ok) {
      products = await res.json();
    }
  } catch (e) {
    console.error("Error fetching products", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen relative overflow-hidden"> <div class="absolute top-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[150px] rounded-full -z-10"></div> ${renderComponent($$result2, "ProductCatalog", null, { "client:only": "svelte", "products": products, "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/ProductCatalog.svelte", "client:component-export": "default" })} </div> ` })}`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/productos/index.astro", void 0);
const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/productos/index.astro";
const $$url = "/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
