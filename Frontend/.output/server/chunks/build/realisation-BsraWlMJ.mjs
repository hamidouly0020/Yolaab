import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "realisation",
  __ssrInlineRender: true,
  setup(__props) {
    const realisations = ref([]);
    const loading = ref(true);
    const error = ref("");
    const filterType = ref("all");
    const selectedItem = ref(null);
    const filteredRealisations = computed(() => {
      if (filterType.value === "all") {
        return realisations.value;
      }
      return realisations.value.filter((r) => r.type === filterType.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 py-12"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4"> \u{1F3AC} Nos R\xE9alisations </h1><p class="text-xl text-gray-600"> D\xE9courez les projets de nettoyage et les interventions r\xE9ussies de Yolaab </p></div><div class="flex justify-center gap-4 mb-12 flex-wrap"><button class="${ssrRenderClass([
        "px-6 py-3 rounded-full font-bold transition-all",
        filterType.value === "all" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
      ])}"> Tous </button><button class="${ssrRenderClass([
        "px-6 py-3 rounded-full font-bold transition-all",
        filterType.value === "image" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
      ])}"> \u{1F4F7} Images </button><button class="${ssrRenderClass([
        "px-6 py-3 rounded-full font-bold transition-all",
        filterType.value === "video" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
      ])}"> \u{1F3A5} Vid\xE9os </button></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12"><p class="text-lg text-gray-600">\u23F3 Chargement des r\xE9alisations...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="text-center py-12"><p class="text-lg text-red-600">\u274C ${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && filteredRealisations.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F3A8}</div><p class="text-xl text-gray-600">Aucune r\xE9alisation pour le moment</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && filteredRealisations.value.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"><!--[-->`);
        ssrRenderList(filteredRealisations.value.filter((r) => r.type === "image"), (item) => {
          _push(`<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"><div class="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden"><img${ssrRenderAttr("src", item.url)}${ssrRenderAttr("alt", item.titre)} class="w-full h-full object-cover"></div><div class="p-6"><h3 class="text-lg font-bold text-gray-800 mb-2">${ssrInterpolate(item.titre)}</h3>`);
          if (item.description) {
            _push(`<p class="text-gray-600 text-sm line-clamp-2">${ssrInterpolate(item.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="mt-4 text-sm text-gray-500"> \u{1F4C5} ${ssrInterpolate(new Date(item.createdAt).toLocaleDateString("fr-FR"))}</div></div></div>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(filteredRealisations.value.filter((r) => r.type === "video"), (item) => {
          _push(`<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"><div class="relative h-64 bg-black flex items-center justify-center overflow-hidden"><iframe${ssrRenderAttr("src", item.url)} title="Vid\xE9o Yolaab" class="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><div class="p-6"><h3 class="text-lg font-bold text-gray-800 mb-2">${ssrInterpolate(item.titre)}</h3>`);
          if (item.description) {
            _push(`<p class="text-gray-600 text-sm line-clamp-2">${ssrInterpolate(item.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="mt-4 text-sm text-gray-500"> \u{1F4C5} ${ssrInterpolate(new Date(item.createdAt).toLocaleDateString("fr-FR"))}</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedItem.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"><div class="relative max-w-4xl w-full"><button class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 transition"> \u2715 </button><img${ssrRenderAttr("src", selectedItem.value.url)}${ssrRenderAttr("alt", selectedItem.value.titre)} class="w-full h-auto rounded-2xl"><div class="text-white mt-4 text-center"><h3 class="text-2xl font-bold mb-2">${ssrInterpolate(selectedItem.value.titre)}</h3>`);
        if (selectedItem.value.description) {
          _push(`<p class="text-gray-300">${ssrInterpolate(selectedItem.value.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "inline-block bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-400 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 RETOUR \xC0 L&#39;ACCUEIL `);
          } else {
            return [
              createTextVNode(" \u2190 RETOUR \xC0 L'ACCUEIL ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/realisation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=realisation-BsraWlMJ.mjs.map
