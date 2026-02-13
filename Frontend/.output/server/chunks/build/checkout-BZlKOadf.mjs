import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cartItems = ref([]);
    const orderData = ref({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      localisation: ""
    });
    const isLoading = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const subtotal = computed(
      () => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    const total = computed(() => subtotal.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8" }, _attrs))}><div class="max-w-4xl mx-auto px-4 py-12"><h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12"> \u{1F6D2} Mon Panier </h1>`);
      if (cartItems.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F6D2}</div><p class="text-xl text-gray-600 mb-8">Votre panier est vide</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2190 Retour \xE0 la boutique `);
            } else {
              return [
                createTextVNode(" \u2190 Retour \xE0 la boutique ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-4"><div class="bg-white rounded-2xl shadow-lg p-6"><h2 class="text-2xl font-bold text-blue-600 mb-6">Produits</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(cartItems.value, (item) => {
          _push(`<div class="flex items-center justify-between bg-blue-50 p-4 rounded-xl"><div class="flex items-center gap-4"><span class="text-3xl">${ssrInterpolate(item.emoji)}</span><div><p class="font-bold">${ssrInterpolate(item.name)}</p><p class="text-sm text-gray-600">${ssrInterpolate(item.price.toLocaleString())} FCFA</p></div></div><div class="flex items-center gap-4"><div class="flex items-center gap-2"><button class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"> \u2212 </button><span class="px-4 py-1 bg-white rounded border-2">${ssrInterpolate(item.quantity)}</span><button class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"> + </button></div><button class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"> \u{1F5D1}\uFE0F </button></div></div>`);
        });
        _push(`<!--]--></div></div></div><div class="bg-white rounded-2xl shadow-lg p-6 h-fit"><h2 class="text-2xl font-bold text-blue-600 mb-6">Commande</h2><form class="space-y-4"><div><label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label><input${ssrRenderAttr("value", orderData.value.nom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">Pr\xE9nom *</label><input${ssrRenderAttr("value", orderData.value.prenom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre pr\xE9nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">T\xE9l\xE9phone *</label><input${ssrRenderAttr("value", orderData.value.telephone)} type="tel" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre t\xE9l\xE9phone"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">Email</label><input${ssrRenderAttr("value", orderData.value.email)} type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre email"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">Localisation *</label><input${ssrRenderAttr("value", orderData.value.localisation)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Ex: Douala, Cameroun"></div><div class="border-t-2 pt-4 space-y-2"><div class="flex justify-between font-bold"><span>Sous-total:</span><span>${ssrInterpolate(subtotal.value.toLocaleString())} FCFA</span></div><div class="flex justify-between text-blue-600 font-bold text-lg"><span>TOTAL:</span><span>${ssrInterpolate(total.value.toLocaleString())} FCFA</span></div></div><div class="space-y-2"><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold disabled:opacity-50">${ssrInterpolate(isLoading.value ? "\u23F3 Traitement..." : "\u2705 VALIDER LA COMMANDE")}</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "block text-center bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2190 Retour boutique `);
            } else {
              return [
                createTextVNode(" \u2190 Retour boutique ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (successMessage.value) {
          _push(`<div class="bg-green-100 border-2 border-green-600 text-green-700 p-3 rounded-lg text-sm">${ssrInterpolate(successMessage.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (errorMessage.value) {
          _push(`<div class="bg-red-100 border-2 border-red-600 text-red-700 p-3 rounded-lg text-sm">${ssrInterpolate(errorMessage.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-BZlKOadf.mjs.map
