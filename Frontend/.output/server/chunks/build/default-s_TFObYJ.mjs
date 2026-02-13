import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { mergeProps, defineComponent, ref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute, a as useRouter } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const navItems = [
      { id: "home", emoji: "\u{1F3E0}", label: "Accueil" },
      { id: "reservation", emoji: "\u{1F4C5}", label: "R\xE9server" },
      { id: "devis", emoji: "\u{1F4CB}", label: "Devis" },
      { id: "realisation", emoji: "\u{1F3AC}", label: "R\xE9alisations" },
      { id: "shop", emoji: "\u{1F6D2}", label: "Boutique" }
    ];
    const route = useRoute();
    const router = useRouter();
    const clickCount = ref(0);
    let clickTimer = null;
    const handleLogoClick = () => {
      clickCount.value++;
      if (clickCount.value === 1) {
        clickTimer = setTimeout(() => {
          clickCount.value = 0;
          clickTimer = null;
        }, 2e3);
      }
      if (clickCount.value >= 5) {
        if (clickTimer) {
          clearTimeout(clickTimer);
          clickTimer = null;
        }
        clickCount.value = 0;
        router.push("/admin");
      }
    };
    const isActive = (path) => {
      return route.path === `/${path}` || path === "home" && route.path === "/";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-blue-600 text-white shadow-lg sticky top-0 z-50" }, _attrs))}><div class="hidden md:block max-w-7xl mx-auto px-4"><div class="flex items-center justify-between h-20">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        onClick: handleLogoClick,
        class: "flex items-center space-x-2 hover:opacity-90 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-white text-blue-600 rounded-full p-2"${_scopeId}><span class="text-2xl font-bold"${_scopeId}>Y</span></div><span class="text-3xl font-bold"${_scopeId}>YOLAAB</span>`);
          } else {
            return [
              createVNode("div", { class: "bg-white text-blue-600 rounded-full p-2" }, [
                createVNode("span", { class: "text-2xl font-bold" }, "Y")
              ]),
              createVNode("span", { class: "text-3xl font-bold" }, "YOLAAB")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex space-x-2"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.id,
          to: `/${item.id}`,
          class: [
            "flex flex-col items-center px-6 py-3 rounded-lg transition-all",
            isActive(item.id) ? "bg-white text-blue-600 shadow-lg" : "hover:bg-blue-500"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-2xl"${_scopeId}>${ssrInterpolate(item.emoji)}</span><span class="mt-1 text-sm"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-2xl" }, toDisplayString(item.emoji), 1),
                createVNode("span", { class: "mt-1 text-sm" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div><div class="md:hidden"><div class="text-center py-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "text-2xl font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`YOLAAB`);
          } else {
            return [
              createTextVNode("YOLAAB")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-sm mt-1">Keur Massar, Dakar</p></div><nav class="fixed bottom-0 left-0 right-0 bg-blue-600 shadow-lg z-50 border-t border-blue-500"><div class="flex justify-around items-center h-20"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.id,
          to: `/${item.id}`,
          class: "flex flex-col items-center justify-center flex-1 h-full hover:bg-blue-500 transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-2xl"${_scopeId}>${ssrInterpolate(item.emoji)}</span><span class="text-xs mt-1"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-2xl" }, toDisplayString(item.emoji), 1),
                createVNode("span", { class: "text-xs mt-1" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></nav></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navigation = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`<a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="fixed right-6 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform transform hover:scale-105" aria-label="Contactez Yoolab sur WhatsApp" title="Contactez Yoolab sur WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"></path></svg></a></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-s_TFObYJ.mjs.map
