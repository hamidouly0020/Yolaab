import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-quPczFQE.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './server.mjs';
import 'vue-router';

const _imports_0 = "" + buildAssetsURL("service1.DeZmzMzK.jpeg");
const _imports_1 = "" + buildAssetsURL("service2.Ba_G8rMk.jpeg");
const _imports_2 = "" + buildAssetsURL("service3.3_MAJ8U5.jpeg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8"><div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white"><div class="max-w-7xl mx-auto px-4 py-16 md:py-24"><div class="text-center"><h1 class="text-4xl md:text-6xl font-bold mb-4"> \u{1F9F9} Yolaab </h1><p class="text-2xl md:text-3xl font-semibold mb-4 text-blue-100"> L&#39;art du nettoyage professionnel sur mesure </p><p class="text-lg md:text-xl mb-8 opacity-90"> Votre partenaire de confiance pour des espaces, \xE9quipements, et v\xE9hicules \xE9clatants </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reservation",
        class: "inline-block bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="flex items-center gap-3"${_scopeId}><span class="text-2xl"${_scopeId}>\u{1F4C5}</span><span class="text-xl"${_scopeId}>R\xC9SERVER MAINTENANT</span></span>`);
          } else {
            return [
              createVNode("span", { class: "flex items-center gap-3" }, [
                createVNode("span", { class: "text-2xl" }, "\u{1F4C5}"),
                createVNode("span", { class: "text-xl" }, "R\xC9SERVER MAINTENANT")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="max-w-7xl mx-auto px-4 py-16"><div class="bg-blue-50 rounded-2xl p-8 md:p-12"><h2 class="text-3xl md:text-4xl font-bold text-blue-600 mb-6">\xC0 Propos de Yolaab</h2><p class="text-lg text-gray-700 leading-8 mb-6"> Yolaab est une entreprise de nettoyage qui place votre satisfaction au c\u0153ur de sa mission. Avec une approche innovante et une \xE9quipe passionn\xE9e, nous offrons des services de nettoyage sur mesure pour chaque espace et \xE9quipement, en apportant une attention unique aux d\xE9tails. Chez Yolaab, chaque intervention est pens\xE9e pour transformer les lieux en espaces accueillants, propres et revitalis\xE9s. </p><p class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-4"> Notre mission : Rendre chaque espace accueillant, propre et revitalis\xE9, gr\xE2ce \xE0 un service attentif et personnalis\xE9. </p></div></div><div class="max-w-7xl mx-auto px-4 py-16"><h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12"> Nos Services en Action </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reservation",
        class: "relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Service Yoolab 1" class="w-full h-full object-cover object-center" loading="lazy"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"${_scopeId}><div class="p-6 w-full"${_scopeId}><h3 class="text-2xl font-bold text-white mb-2"${_scopeId}>Nettoyage Professionnel</h3><p class="text-gray-100"${_scopeId}>D\xE9couvrez notre expertise en nettoyage sur mesure</p></div></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Service Yoolab 1",
                class: "w-full h-full object-cover object-center",
                loading: "lazy"
              }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end" }, [
                createVNode("div", { class: "p-6 w-full" }, [
                  createVNode("h3", { class: "text-2xl font-bold text-white mb-2" }, "Nettoyage Professionnel"),
                  createVNode("p", { class: "text-gray-100" }, "D\xE9couvrez notre expertise en nettoyage sur mesure")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reservation",
        class: "relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Service Yoolab 2" class="w-full h-full object-cover object-center" loading="lazy"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"${_scopeId}><div class="p-6 w-full"${_scopeId}><h3 class="text-2xl font-bold text-white mb-2"${_scopeId}>Excellence et Pr\xE9cision</h3><p class="text-gray-100"${_scopeId}>Un travail m\xE9ticuleux pour chaque espace</p></div></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "Service Yoolab 2",
                class: "w-full h-full object-cover object-center",
                loading: "lazy"
              }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end" }, [
                createVNode("div", { class: "p-6 w-full" }, [
                  createVNode("h3", { class: "text-2xl font-bold text-white mb-2" }, "Excellence et Pr\xE9cision"),
                  createVNode("p", { class: "text-gray-100" }, "Un travail m\xE9ticuleux pour chaque espace")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reservation",
        class: "relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_2)} alt="Service Yoolab 3" class="w-full h-full object-cover object-center" loading="lazy"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end"${_scopeId}><div class="p-6 w-full"${_scopeId}><h3 class="text-2xl font-bold text-white mb-2"${_scopeId}>Votre Satisfaction</h3><p class="text-gray-100"${_scopeId}>Notre engagement pour la qualit\xE9</p></div></div>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_2,
                alt: "Service Yoolab 3",
                class: "w-full h-full object-cover object-center",
                loading: "lazy"
              }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end" }, [
                createVNode("div", { class: "p-6 w-full" }, [
                  createVNode("h3", { class: "text-2xl font-bold text-white mb-2" }, "Votre Satisfaction"),
                  createVNode("p", { class: "text-gray-100" }, "Notre engagement pour la qualit\xE9")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="bg-blue-50 rounded-2xl p-8 md:p-12 text-center"><h3 class="text-2xl font-bold text-blue-600 mb-4">Nos Domaines d&#39;Expertise</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-6"><div><div class="text-4xl mb-2">\u{1F697}</div><p class="font-semibold text-gray-700">Nettoyage Automobile</p></div><div><div class="text-4xl mb-2">\u{1F6CB}\uFE0F</div><p class="font-semibold text-gray-700">Moquettes &amp; Canap\xE9s</p></div><div><div class="text-4xl mb-2">\u{1F3D7}\uFE0F</div><p class="font-semibold text-gray-700">Fin de Chantier</p></div><div><div class="text-4xl mb-2">\u{1F3E2}</div><p class="font-semibold text-gray-700">Entretien Bureaux</p></div></div></div></div><div class="bg-gradient-to-b from-white to-blue-50 py-16"><div class="max-w-7xl mx-auto px-4"><h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12"> Nos Valeurs </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"><div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all"><div class="text-5xl mb-4">\u{1F60A}</div><h3 class="text-xl font-bold text-blue-600 mb-3">Satisfaction Client</h3><p class="text-gray-700">Vous \xEAtes notre priorit\xE9. Notre \xE9quipe s&#39;engage \xE0 offrir un service qui d\xE9passe vos attentes.</p></div><div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all"><div class="text-5xl mb-4">\u2B50</div><h3 class="text-xl font-bold text-blue-600 mb-3">Professionnalisme</h3><p class="text-gray-700">Nos experts mettent tout en \u0153uvre pour assurer des r\xE9sultats impeccables avec soin et efficacit\xE9.</p></div><div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all"><div class="text-5xl mb-4">\u{1F4A1}</div><h3 class="text-xl font-bold text-blue-600 mb-3">Innovation</h3><p class="text-gray-700">Nous utilisons des m\xE9thodes modernes et du mat\xE9riel performant pour garantir des r\xE9sultats durables.</p></div><div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all"><div class="text-5xl mb-4">\u{1F3AF}</div><h3 class="text-xl font-bold text-blue-600 mb-3">Adaptabilit\xE9</h3><p class="text-gray-700">Chaque espace est unique. Nous adaptons nos services \xE0 vos besoins sp\xE9cifiques.</p></div></div></div></div><div class="max-w-7xl mx-auto px-4 py-16"><h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12"> Notre Approche en Trois \xC9tapes </h2><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="relative"><div class="flex items-center gap-4 mb-4"><div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div><h3 class="text-2xl font-bold text-blue-600">Analyse des Besoins</h3></div><p class="text-gray-700 ml-16"> Nous commen\xE7ons par une consultation pour comprendre vos attentes et les sp\xE9cificit\xE9s de chaque espace, \xE9quipement ou v\xE9hicule. </p></div><div class="relative"><div class="flex items-center gap-4 mb-4"><div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div><h3 class="text-2xl font-bold text-blue-600">Plan Personnalis\xE9</h3></div><p class="text-gray-700 ml-16"> Nous \xE9laborons une solution sur mesure, incluant les m\xE9thodes et produits adapt\xE9s \xE0 chaque surface et mat\xE9riau. </p></div><div class="relative"><div class="flex items-center gap-4 mb-4"><div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</div><h3 class="text-2xl font-bold text-blue-600">Suivi Satisfaction</h3></div><p class="text-gray-700 ml-16"> Nous restons \xE0 votre \xE9coute pour ajuster nos services et garantir une satisfaction continue. </p></div></div></div><div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"><div class="max-w-7xl mx-auto px-4 text-center"><h2 class="text-3xl md:text-4xl font-bold mb-12"> Contactez Yolaab </h2><p class="text-lg mb-8">Contactez-nous pour un devis gratuit ou plus d&#39;informations</p><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6"><div class="flex flex-col items-center"><div class="text-5xl mb-4">\u{1F4DE}</div><p class="text-xl font-semibold">T\xE9l\xE9phone</p><p class="text-blue-100">78 480 03 61</p></div><div class="flex flex-col items-center"><a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white shadow transition-transform transform hover:scale-105 mb-4" aria-label="Contacter sur WhatsApp"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"></path></svg></a><p class="text-xl font-semibold">WhatsApp</p><a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="text-blue-700 font-bold">Contacter via WhatsApp</a></div><div class="flex flex-col items-center"><div class="text-5xl mb-4">\u{1F4CD}</div><p class="text-xl font-semibold">Localisation</p><p class="text-blue-100">Keur Massar, Dakar</p></div></div><div class="flex items-center justify-center gap-4 mb-8"><a href="https://www.tiktok.com/@yolaab6?_r=1&amp;_t=ZS-93fslJAVm5J" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white" aria-label="Yoolab sur TikTok"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"></path></svg><span class="font-semibold">TikTok</span></a><a href="https://www.facebook.com/share/1AdEMxu7zs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white" aria-label="Yoolab sur Facebook"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11 9.95V14.8h-2.2v-2.8H11V10.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.08 2.1.12v2.4h-1.3c-1 0-1.3.6-1.3 1.2v1.6h2.6l-.4 2.8h-2.2V22A10 10 0 0 0 22 12z"></path></svg><span class="font-semibold">Facebook</span></a><a href="https://www.instagram.com/yolaab_nettoyage?igsh=aHI4eWNlbnU4M2Zz&amp;utm_source=qr" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white" aria-label="Yoolab sur Instagram"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C5.3 2 4 3.3 4 5v14c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7zm8 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM18 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg><span class="font-semibold">Instagram</span></a></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/reservation",
        class: "inline-block bg-white text-blue-600 px-12 py-4 rounded-full hover:bg-blue-50 transition-all font-bold text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` R\xE9server une Intervention `);
          } else {
            return [
              createTextVNode(" R\xE9server une Intervention ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="fixed right-6 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform transform hover:scale-105" aria-label="Contactez Yoolab sur WhatsApp" title="Contactez Yoolab sur WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"></path></svg></a><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-01wndAnZ.mjs.map
