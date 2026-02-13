import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "devis",
  __ssrInlineRender: true,
  setup(__props) {
    const formData = ref({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      typeService: "nettoyage-automobile",
      description: ""
    });
    const errorMessage = ref("");
    const services = [
      { id: "nettoyage-automobile", label: "Nettoyage Automobile", emoji: "\u{1F697}" },
      { id: "moquettes", label: "Moquettes", emoji: "\u{1F4DC}" },
      { id: "canapes", label: "Canap\xE9s", emoji: "\u{1F6CB}\uFE0F" },
      { id: "fin-de-chantier", label: "Fin de Chantier", emoji: "\u{1F3D7}\uFE0F" },
      { id: "entretien-bureaux", label: "Entretien Bureaux", emoji: "\u{1F3E2}" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8" }, _attrs))}><div class="max-w-4xl mx-auto px-4 py-12"><h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12"> Demander Un Devis </h1><form class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"><div class="space-y-4"><h2 class="text-2xl font-bold text-blue-600">Vos Informations</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-semibold text-gray-700 mb-2"> Nom * </label><input${ssrRenderAttr("value", formData.value.nom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2"> Pr\xE9nom * </label><input${ssrRenderAttr("value", formData.value.prenom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre pr\xE9nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2"> T\xE9l\xE9phone * </label><input${ssrRenderAttr("value", formData.value.telephone)} type="tel" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre num\xE9ro"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2"> Email </label><input${ssrRenderAttr("value", formData.value.email)} type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Votre email"></div></div></div><div class="space-y-4"><h2 class="text-2xl font-bold text-blue-600">S\xE9lectionner Un Service</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<button type="button" class="${ssrRenderClass([
          "p-4 rounded-2xl border-2 transition-all text-center cursor-pointer",
          formData.value.typeService === service.id ? "border-blue-600 bg-blue-50 shadow-lg" : "border-gray-300 hover:border-blue-400"
        ])}"><div class="text-3xl mb-2">${ssrInterpolate(service.emoji)}</div><p class="font-semibold text-gray-700">${ssrInterpolate(service.label)}</p></button>`);
      });
      _push(`<!--]--></div></div><div class="space-y-4"><h2 class="text-2xl font-bold text-blue-600">Description du Projet</h2><textarea class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none h-32 resize-none" placeholder="D\xE9crivez votre projet, surface, d\xE9tails importants, etc.">${ssrInterpolate(formData.value.description)}</textarea></div><div class="flex gap-4"><button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold text-lg flex items-center justify-center gap-2"><span class="text-2xl">\u{1F4AC}</span><span>ENVOYER PAR WHATSAPP</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "px-6 py-4 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 RETOUR `);
          } else {
            return [
              createTextVNode(" \u2190 RETOUR ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (errorMessage.value) {
        _push(`<div class="bg-red-100 border-2 border-red-600 text-red-700 p-4 rounded-xl">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/devis.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=devis-BmCmrmvN.mjs.map
