import { c as createComponent, $ as $$Layout } from './Layout_B4HaNM--.mjs';
import 'piccolore';
import { r as renderComponent, a as renderTemplate } from './prerender_hQavP005.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardApp", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/dashboard/DashboardApp.svelte", "client:component-export": "default" })} ` })}`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/pages/dashboard/index.astro", void 0);

const $$file = "/home/dark/Escritorio/digital-center/digital-center/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
