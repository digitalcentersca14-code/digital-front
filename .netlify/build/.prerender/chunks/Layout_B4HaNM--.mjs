import { A as AstroError, I as InvalidComponentArgs, b as addAttribute, c as renderHead, r as renderComponent, d as renderSlot, a as renderTemplate } from './prerender_hQavP005.mjs';
import 'piccolore';

function validateArgs(args) {
  if (args.length !== 3) return false;
  if (!args[0] || typeof args[0] !== "object") return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/icon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Digital Center - Tienda Electrónica</title><!-- Google Fonts para Aesthetics --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-[#0b0f19] text-gray-100 font-['Outfit'] min-h-screen flex flex-col selection:bg-indigo-500/30"> ${renderComponent($$result, "Navbar", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/Navbar.svelte", "client:component-export": "default" })} <main class="flex-grow scroll-smooth"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "/home/dark/Escritorio/digital-center/digital-center/src/components/Footer.svelte", "client:component-export": "default" })}</body></html>`;
}, "/home/dark/Escritorio/digital-center/digital-center/src/layouts/Layout.astro", void 0);

export { $$Layout as $, createComponent as c };
