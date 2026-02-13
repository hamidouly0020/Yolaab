import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "shop",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const loading = ref(true);
    const error = ref("");
    const cartCount = computed(() => {
      return 0;
    });
    const getEmoji = (categorie) => {
      const emojis = {
        nettoyage: "\u{1F9F9}",
        equipement: "\u{1F6E0}\uFE0F",
        produit: "\u{1F9FC}",
        autre: "\u{1F4E6}"
      };
      return emojis[categorie] || "\u{1F4E6}";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8" }, _attrs))}><div class="max-w-6xl mx-auto px-4 py-12"><div class="flex items-center justify-between mb-12"><h1 class="text-4xl md:text-5xl font-bold text-blue-600"> \u{1F6D2} Notre Boutique </h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/checkout",
        class: "relative bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mon Panier `);
            if (cartCount.value > 0) {
              _push2(`<span class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"${_scopeId}>${ssrInterpolate(cartCount.value)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createTextVNode(" Mon Panier "),
              cartCount.value > 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              }, toDisplayString(cartCount.value), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12"><p class="text-lg text-gray-600">\u23F3 Chargement des produits...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="text-center py-12"><p class="text-lg text-red-600">\u274C Erreur: ${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && products.value.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"><!--[-->`);
        ssrRenderList(products.value, (product) => {
          _push(`<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"><div class="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">`);
          if (product.image) {
            _push(`<img${ssrRenderAttr("src", `http://localhost:3000${product.image}`)}${ssrRenderAttr("alt", product.nom)} class="w-full h-full object-cover object-center" loading="lazy">`);
          } else {
            _push(`<span class="text-6xl">${ssrInterpolate(getEmoji(product.categorie))}</span>`);
          }
          _push(`<div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">${ssrInterpolate(product.prix.toLocaleString())} FCFA </div></div><div class="p-6"><h3 class="font-bold text-lg text-gray-800 mb-2">${ssrInterpolate(product.nom)}</h3><p class="text-gray-600 text-sm mb-4">Stock: ${ssrInterpolate(product.quantite)}</p><button${ssrIncludeBooleanAttr(product.quantite === 0) ? " disabled" : ""} class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold disabled:opacity-50"> \u2795 Ajouter au Panier </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center mt-8">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shop-CCwd1oJs.mjs.map
