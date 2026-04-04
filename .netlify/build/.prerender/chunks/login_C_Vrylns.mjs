import { c as createComponent, $ as $$Layout } from './Layout_B4HaNM--.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './prerender_hQavP005.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden"> <!-- Decoracion de fondo --> <div class="absolute inset-0 bg-[#0b0f19] -z-20"></div> <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full -z-10"></div> <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full -z-10"></div> ${renderComponent($$result2, "LoginForm", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/LoginForm.svelte", "client:component-export": "default" })} </div> ` })}`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/login.astro", void 0);

const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
