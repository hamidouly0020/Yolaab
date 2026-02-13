import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const isAuthenticated = ref(false);
    const password = ref("");
    const activeTab = ref("reservations");
    const workers = ref([]);
    const invoices = ref([]);
    const products = ref([]);
    const showAddWorker = ref(false);
    const showAddInvoice = ref(false);
    const showAddProduct = ref(false);
    ref(false);
    const newWorkerForm = ref({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      poste: "",
      experience: "",
      message: ""
    });
    const postes = [
      { id: "laveur", emoji: "\u{1F9F9}", label: "Laveur" },
      { id: "chauffeur", emoji: "\u{1F697}", label: "Chauffeur" },
      { id: "manager", emoji: "\u{1F454}", label: "Manager" },
      { id: "technicien", emoji: "\u{1F527}", label: "Technicien" }
    ];
    const experiences = [
      { id: "debutant", emoji: "\u{1F331}", label: "D\xE9butant (0-1 an)" },
      { id: "intermediaire", emoji: "\u{1F4C8}", label: "Interm\xE9diaire (1-3 ans)" },
      { id: "confirme", emoji: "\u2B50", label: "Confirm\xE9 (3-5 ans)" },
      { id: "expert", emoji: "\u{1F3C6}", label: "Expert (5+ ans)" }
    ];
    const newInvoice = ref({
      client: "",
      service: "",
      montant: "",
      date: "",
      statut: "en attente"
    });
    const newProduct = ref({
      nom: "",
      prix: "",
      quantite: "",
      categorie: "nettoyage"
    });
    ref(null);
    const reservations = ref([]);
    const applications = ref([]);
    const orders = ref([]);
    const showOrderModal = ref(false);
    const selectedOrder = ref(null);
    const realisations = ref([]);
    const showAddRealisation = ref(false);
    ref(null);
    const newRealisation = ref({
      titre: "",
      description: "",
      type: "image",
      url: "",
      videoSource: "url"
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (!isAuthenticated.value) {
        _push(`<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4"><div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md w-full"><div class="text-center mb-8"><div class="bg-blue-100 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"><span class="text-4xl">\u{1F510}</span></div><h1 class="text-3xl font-bold text-blue-600 mb-2">Espace Admin</h1><p class="text-gray-600">Connexion requise</p></div><form><div class="mb-6"><label class="block mb-2 font-bold">\u{1F510} Mot de passe</label><input${ssrRenderAttr("value", password.value)} type="password" class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg" placeholder="Entrez le mot de passe" required></div><button type="submit" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"> SE CONNECTER </button></form></div></div>`);
      } else {
        _push(`<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8"><div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12"><div class="max-w-7xl mx-auto px-4 flex items-center justify-between"><div><h1 class="text-3xl md:text-4xl font-bold mb-2">\u{1F468}\u200D\u{1F4BC} Espace Administrateur</h1><p class="text-lg opacity-90">Gestion de YOLAAB</p></div><button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all font-bold"> \u{1F6AA} D\xC9CONNEXION </button></div></div><div class="max-w-7xl mx-auto px-4 py-8"><div class="bg-white rounded-2xl shadow-lg overflow-x-auto mb-8"><div class="flex"><button class="${ssrRenderClass([
          "flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all",
          activeTab.value === "reservations" ? "bg-blue-500 text-white" : "hover:bg-blue-50"
        ])}"><span>\u{1F4C5}</span><span class="hidden md:inline">R\xE9servations</span><span class="md:hidden">R\xE9s.</span><span class="${ssrRenderClass([
          "px-2 py-1 rounded-full text-sm font-bold",
          activeTab.value === "reservations" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        ])}">${ssrInterpolate(reservations.value.length)}</span></button><button class="${ssrRenderClass([
          "flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all",
          activeTab.value === "products" ? "bg-blue-500 text-white" : "hover:bg-blue-50"
        ])}"><span>\u{1F6CD}\uFE0F</span><span class="hidden md:inline">Produits</span><span class="md:hidden">Prod.</span><span class="${ssrRenderClass([
          "px-2 py-1 rounded-full text-sm font-bold",
          activeTab.value === "products" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        ])}">${ssrInterpolate(products.value.length)}</span></button><button class="${ssrRenderClass([
          "flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all",
          activeTab.value === "orders" ? "bg-blue-500 text-white" : "hover:bg-blue-50"
        ])}"><span>\u{1F6D2}</span><span class="hidden md:inline">Commandes</span><span class="md:hidden">Cmd.</span><span class="${ssrRenderClass([
          "px-2 py-1 rounded-full text-sm font-bold",
          activeTab.value === "orders" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        ])}">${ssrInterpolate(orders.value.length)}</span></button><button class="${ssrRenderClass([
          "flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all",
          activeTab.value === "realisations" ? "bg-blue-500 text-white" : "hover:bg-blue-50"
        ])}"><span>\u{1F3AC}</span><span class="hidden md:inline">R\xE9alisations</span><span class="md:hidden">R\xE9al.</span><span class="${ssrRenderClass([
          "px-2 py-1 rounded-full text-sm font-bold",
          activeTab.value === "realisations" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
        ])}">${ssrInterpolate(realisations.value.length)}</span></button></div></div>`);
        if (activeTab.value === "reservations") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><h2 class="text-2xl font-bold text-blue-600 mb-6">\u{1F4C5} R\xE9servations (${ssrInterpolate(reservations.value.length)})</h2>`);
          if (reservations.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F4C5}</div><p class="text-xl text-gray-600">Aucune r\xE9servation pour le moment</p></div>`);
          } else {
            _push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b-2"><th class="text-left p-4">Client</th><th class="text-left p-4">T\xE9l\xE9phone</th><th class="text-left p-4">Service</th><th class="text-left p-4">Dur\xE9e</th></tr></thead><tbody><!--[-->`);
            ssrRenderList(reservations.value, (res, index) => {
              _push(`<tr class="border-b hover:bg-blue-50"><td class="p-4"><div class="font-bold">${ssrInterpolate(res.prenom)} ${ssrInterpolate(res.nom)}</div>`);
              if (res.email) {
                _push(`<div class="text-sm text-gray-600">${ssrInterpolate(res.email)}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</td><td class="p-4">${ssrInterpolate(res.telephone)}</td><td class="p-4"><span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">${ssrInterpolate(res.typeService)}</span></td><td class="p-4">${ssrInterpolate(res.date)} - ${ssrInterpolate(res.heure)}</td></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "workers") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-blue-600">\u{1F465} Travailleurs &amp; Candidatures (${ssrInterpolate(workers.value.length + applications.value.length)})</h2><button class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"><span>\u2795</span> Ajouter </button></div>`);
          if (showAddWorker.value) {
            _push(`<form class="bg-blue-50 p-6 rounded-xl mb-6"><h3 class="font-bold text-xl mb-4">\u2795 Nouveau Travailleur</h3><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label><input${ssrRenderAttr("value", newWorkerForm.value.nom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">Pr\xE9nom *</label><input${ssrRenderAttr("value", newWorkerForm.value.prenom)} type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Pr\xE9nom"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">T\xE9l\xE9phone *</label><input${ssrRenderAttr("value", newWorkerForm.value.telephone)} type="tel" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="T\xE9l\xE9phone"></div><div><label class="block text-sm font-semibold text-gray-700 mb-2">Email</label><input${ssrRenderAttr("value", newWorkerForm.value.email)} type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Email"></div></div></div><div class="space-y-4 mt-4"><h4 class="text-lg font-bold text-blue-600">S\xE9lectionner Un Poste</h4><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
            ssrRenderList(postes, (poste) => {
              _push(`<button type="button" class="${ssrRenderClass(["p-4 rounded-2xl border-2 transition-all text-center cursor-pointer", newWorkerForm.value.poste === poste.id ? "border-blue-600 bg-blue-50 shadow-lg" : "border-gray-300 hover:border-blue-400"])}"><div class="text-3xl mb-2">${ssrInterpolate(poste.emoji)}</div><p class="font-semibold text-gray-700">${ssrInterpolate(poste.label)}</p></button>`);
            });
            _push(`<!--]--></div></div><div class="space-y-4 mt-4"><h4 class="text-lg font-bold text-blue-600">Votre Exp\xE9rience</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
            ssrRenderList(experiences, (exp) => {
              _push(`<button type="button" class="${ssrRenderClass(["p-4 rounded-2xl border-2 transition-all text-center cursor-pointer", newWorkerForm.value.experience === exp.id ? "border-blue-600 bg-blue-50 shadow-lg" : "border-gray-300 hover:border-blue-400"])}"><div class="text-3xl mb-2">${ssrInterpolate(exp.emoji)}</div><p class="font-semibold text-gray-700">${ssrInterpolate(exp.label)}</p></button>`);
            });
            _push(`<!--]--></div></div><div class="space-y-4 mt-4"><label class="block text-sm font-semibold text-gray-700 mb-2">Message</label><textarea placeholder="Parlez-nous du candidat..." rows="4" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none">${ssrInterpolate(newWorkerForm.value.message)}</textarea></div><div class="flex gap-4 mt-4"><button type="submit" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">Enregistrer</button><button type="button" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all">Annuler</button></div></form>`);
          } else {
            _push(`<!---->`);
          }
          if (workers.value.length === 0 && applications.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F465}</div><p class="text-xl text-gray-600">Aucun travailleur ou candidature</p></div>`);
          } else {
            _push(`<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b-2"><th class="text-left p-4">Nom</th><th class="text-left p-4">T\xE9l\xE9phone</th><th class="text-left p-4">Poste</th><th class="text-left p-4">Statut</th><th class="text-left p-4">D\xE9tails</th><th class="text-left p-4">Actions</th></tr></thead><tbody><!--[-->`);
            ssrRenderList(workers.value, (worker) => {
              _push(`<tr class="border-b hover:bg-green-50"><td class="p-4 font-bold">${ssrInterpolate(worker.prenom)} ${ssrInterpolate(worker.nom)}</td><td class="p-4">${ssrInterpolate(worker.telephone)}</td><td class="p-4"><span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">${ssrInterpolate(worker.poste)}</span></td><td class="p-4"><span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">\u2705 Travailleur</span></td><td class="p-4 text-gray-600">Embauch\xE9 le ${ssrInterpolate(worker.dateEmbauche)}</td><td class="p-4"><button class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all text-xs">\u{1F5D1}\uFE0F</button></td></tr>`);
            });
            _push(`<!--]--><!--[-->`);
            ssrRenderList(applications.value, (app, index) => {
              _push(`<tr class="border-b hover:bg-yellow-50"><td class="p-4 font-bold"><div>${ssrInterpolate(app.prenom)} ${ssrInterpolate(app.nom)}</div><div class="text-xs text-gray-500">${ssrInterpolate(app.email)}</div></td><td class="p-4">${ssrInterpolate(app.telephone)}</td><td class="p-4"><span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">${ssrInterpolate(app.poste)}</span></td><td class="p-4"><span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">\u{1F4DD} Candidat</span></td><td class="p-4 text-gray-600">${ssrInterpolate(app.experience)}</td><td class="p-4 space-x-2"><button class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all text-xs font-bold" title="Accepter">\u2705 Accepter</button><button class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all text-xs font-bold" title="Rejeter">\u274C Rejeter</button></td></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "invoices") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-blue-600">\u{1F4B0} Factures (${ssrInterpolate(invoices.value.length)})</h2><button class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"><span>\u2795</span> Cr\xE9er </button></div>`);
          if (showAddInvoice.value) {
            _push(`<form class="bg-blue-50 p-6 rounded-xl mb-6"><h3 class="font-bold text-xl mb-4">\u2795 Nouvelle Facture</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><input${ssrRenderAttr("value", newInvoice.value.client)} type="text" placeholder="Nom du client" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><input${ssrRenderAttr("value", newInvoice.value.service)} type="text" placeholder="Service" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><input${ssrRenderAttr("value", newInvoice.value.montant)} type="number" placeholder="Montant (FCFA)" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><input${ssrRenderAttr("value", newInvoice.value.date)} type="date" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><select class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"><option value="en attente"${ssrIncludeBooleanAttr(Array.isArray(newInvoice.value.statut) ? ssrLooseContain(newInvoice.value.statut, "en attente") : ssrLooseEqual(newInvoice.value.statut, "en attente")) ? " selected" : ""}>En attente</option><option value="pay\xE9"${ssrIncludeBooleanAttr(Array.isArray(newInvoice.value.statut) ? ssrLooseContain(newInvoice.value.statut, "pay\xE9") : ssrLooseEqual(newInvoice.value.statut, "pay\xE9")) ? " selected" : ""}>Pay\xE9</option></select></div><div class="flex gap-4"><button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"> Cr\xE9er </button><button type="button" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"> Annuler </button></div></form>`);
          } else {
            _push(`<!---->`);
          }
          if (invoices.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F4B0}</div><p class="text-xl text-gray-600">Aucune facture cr\xE9\xE9e</p></div>`);
          } else {
            _push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b-2"><th class="text-left p-4">Client</th><th class="text-left p-4">Service</th><th class="text-left p-4">Montant</th><th class="text-left p-4">Date</th><th class="text-left p-4">Statut</th><th class="text-left p-4">Actions</th></tr></thead><tbody><!--[-->`);
            ssrRenderList(invoices.value, (invoice) => {
              _push(`<tr class="border-b hover:bg-blue-50"><td class="p-4 font-bold">${ssrInterpolate(invoice.client)}</td><td class="p-4">${ssrInterpolate(invoice.service)}</td><td class="p-4 font-bold text-blue-600">${ssrInterpolate(invoice.montant.toLocaleString())} FCFA</td><td class="p-4">${ssrInterpolate(invoice.date)}</td><td class="p-4"><span class="${ssrRenderClass([
                "px-3 py-1 rounded-full",
                invoice.statut === "pay\xE9" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
              ])}">${ssrInterpolate(invoice.statut === "pay\xE9" ? "\u2705 Pay\xE9" : "\u23F3 En attente")}</span></td><td class="p-4"><button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"> Changer </button></td></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          }
          if (invoices.value.length > 0) {
            _push(`<div class="mt-6 bg-blue-50 p-6 rounded-xl"><div class="flex items-center justify-between text-xl font-bold text-blue-600"><span>TOTAL:</span><span>${ssrInterpolate(invoices.value.reduce((sum, inv) => sum + inv.montant, 0).toLocaleString())} FCFA</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "products") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-blue-600">\u{1F6CD}\uFE0F Produits (${ssrInterpolate(products.value.length)})</h2><button class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"><span>\u2795</span> Ajouter </button></div>`);
          if (showAddProduct.value) {
            _push(`<form class="bg-blue-50 p-6 rounded-xl mb-6"><h3 class="font-bold text-xl mb-4">\u2795 Nouveau Produit</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><input${ssrRenderAttr("value", newProduct.value.nom)} type="text" placeholder="Nom du produit" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><input${ssrRenderAttr("value", newProduct.value.prix)} type="number" step="0.01" placeholder="Prix (FCFA)" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><input${ssrRenderAttr("value", newProduct.value.quantite)} type="number" placeholder="Quantit\xE9" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><select class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"><option value="nettoyage"${ssrIncludeBooleanAttr(Array.isArray(newProduct.value.categorie) ? ssrLooseContain(newProduct.value.categorie, "nettoyage") : ssrLooseEqual(newProduct.value.categorie, "nettoyage")) ? " selected" : ""}>Nettoyage</option><option value="equipement"${ssrIncludeBooleanAttr(Array.isArray(newProduct.value.categorie) ? ssrLooseContain(newProduct.value.categorie, "equipement") : ssrLooseEqual(newProduct.value.categorie, "equipement")) ? " selected" : ""}>\xC9quipement</option><option value="produit"${ssrIncludeBooleanAttr(Array.isArray(newProduct.value.categorie) ? ssrLooseContain(newProduct.value.categorie, "produit") : ssrLooseEqual(newProduct.value.categorie, "produit")) ? " selected" : ""}>Produit</option><option value="autre"${ssrIncludeBooleanAttr(Array.isArray(newProduct.value.categorie) ? ssrLooseContain(newProduct.value.categorie, "autre") : ssrLooseEqual(newProduct.value.categorie, "autre")) ? " selected" : ""}>Autre</option></select><input type="file" accept="image/*" placeholder="S\xE9lectionner une image" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none md:col-span-2" required></div><div class="flex gap-4"><button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"> Enregistrer </button><button type="button" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"> Annuler </button></div></form>`);
          } else {
            _push(`<!---->`);
          }
          if (products.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F6CD}\uFE0F</div><p class="text-xl text-gray-600">Aucun produit enregistr\xE9</p></div>`);
          } else {
            _push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b-2"><th class="text-left p-4">Nom</th><th class="text-left p-4">Prix</th><th class="text-left p-4">Stock</th><th class="text-left p-4">Cat\xE9gorie</th><th class="text-left p-4">Actions</th></tr></thead><tbody><!--[-->`);
            ssrRenderList(products.value, (product) => {
              _push(`<tr class="border-b hover:bg-blue-50"><td class="p-4 font-bold">${ssrInterpolate(product.nom)}</td><td class="p-4">${ssrInterpolate(product.prix.toLocaleString())} FCFA</td><td class="p-4">${ssrInterpolate(product.quantite)}</td><td class="p-4"><span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">${ssrInterpolate(product.categorie)}</span></td><td class="p-4 space-x-2"><button class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all"> \u270F\uFE0F </button><button class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"> \u{1F5D1}\uFE0F </button></td></tr>`);
            });
            _push(`<!--]--></tbody></table></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "orders") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><h2 class="text-2xl font-bold text-blue-600 mb-6">\u{1F6D2} Commandes (${ssrInterpolate(orders.value.length)})</h2>`);
          if (orders.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F6D2}</div><p class="text-xl text-gray-600">Aucune commande pour le moment</p></div>`);
          } else {
            _push(`<div class="space-y-4"><!--[-->`);
            ssrRenderList(orders.value, (order, index) => {
              _push(`<div class="border-2 border-blue-100 rounded-xl p-6"><div class="flex items-center justify-between mb-4"><h3 class="font-bold text-lg">Commande #${ssrInterpolate(index + 1)}</h3><div class="flex items-center gap-4"><span class="text-xl font-bold text-blue-600">${ssrInterpolate(order.total.toLocaleString())} FCFA</span><button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Voir d\xE9tails</button></div></div><div class="space-y-2"><!--[-->`);
              ssrRenderList(order.items, (item, idx) => {
                _push(`<div class="flex items-center justify-between bg-blue-50 p-3 rounded-lg"><div class="flex items-center gap-3"><span class="text-2xl">${ssrInterpolate(item.emoji)}</span><span>${ssrInterpolate(item.name)}</span></div><div class="text-right"><span class="font-bold">x${ssrInterpolate(item.quantity)}</span><span class="ml-4">${ssrInterpolate((item.price * item.quantity).toLocaleString())} FCFA</span></div></div>`);
              });
              _push(`<!--]--></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "realisations") {
          _push(`<div class="bg-white rounded-2xl shadow-lg p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-blue-600">\u{1F3AC} R\xE9alisations (${ssrInterpolate(realisations.value.length)})</h2><button class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"><span>\u2795</span> Ajouter </button></div>`);
          if (showAddRealisation.value) {
            _push(`<form class="bg-blue-50 p-6 rounded-xl mb-6"><h3 class="font-bold text-xl mb-4">\u2795 Nouvelle R\xE9alisation</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><input${ssrRenderAttr("value", newRealisation.value.titre)} type="text" placeholder="Titre de la r\xE9alisation" class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><select class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"><option value="image"${ssrIncludeBooleanAttr(Array.isArray(newRealisation.value.type) ? ssrLooseContain(newRealisation.value.type, "image") : ssrLooseEqual(newRealisation.value.type, "image")) ? " selected" : ""}>\u{1F4F7} Image</option><option value="video"${ssrIncludeBooleanAttr(Array.isArray(newRealisation.value.type) ? ssrLooseContain(newRealisation.value.type, "video") : ssrLooseEqual(newRealisation.value.type, "video")) ? " selected" : ""}>\u{1F3A5} Vid\xE9o</option></select></div><div class="mb-4"><label class="block text-sm font-semibold text-gray-700 mb-2">Description (optionnel)</label><textarea placeholder="Description du projet..." rows="3" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none">${ssrInterpolate(newRealisation.value.description)}</textarea></div>`);
            if (newRealisation.value.type === "image") {
              _push(`<div class="mb-4"><label class="block text-sm font-semibold text-gray-700 mb-2">Image *</label><input type="file" accept="image/*" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required></div>`);
            } else {
              _push(`<!---->`);
            }
            if (newRealisation.value.type === "video") {
              _push(`<div class="mb-4"><label class="block text-sm font-semibold text-gray-700 mb-2">Source Vid\xE9o *</label><div class="flex gap-4 mb-2"><label class="flex items-center gap-2"><input type="radio" value="url"${ssrIncludeBooleanAttr(ssrLooseEqual(newRealisation.value.videoSource, "url")) ? " checked" : ""}> URL </label><label class="flex items-center gap-2"><input type="radio" value="file"${ssrIncludeBooleanAttr(ssrLooseEqual(newRealisation.value.videoSource, "file")) ? " checked" : ""}> Fichier (ordinateur/t\xE9l\xE9phone) </label></div>`);
              if (newRealisation.value.videoSource === "url") {
                _push(`<div><label class="block text-sm font-semibold text-gray-700 mb-2">URL Vid\xE9o (YouTube ou Vimeo) *</label><input${ssrRenderAttr("value", newRealisation.value.url)} type="text" placeholder="https://www.youtube.com/embed/..." class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required></div>`);
              } else {
                _push(`<div><label class="block text-sm font-semibold text-gray-700 mb-2">Fichier Vid\xE9o *</label><input type="file" accept="video/*" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none" required><p class="text-sm text-gray-500 mt-2">Formats courants: .mp4, .mov \u2014 taille maximale conseill\xE9e: 100MB</p></div>`);
              }
              _push(`</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex gap-4"><button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"> Ajouter </button><button type="button" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"> Annuler </button></div></form>`);
          } else {
            _push(`<!---->`);
          }
          if (realisations.value.length === 0) {
            _push(`<div class="text-center py-12"><div class="text-6xl mb-4">\u{1F3AC}</div><p class="text-xl text-gray-600">Aucune r\xE9alisation enregistr\xE9e</p></div>`);
          } else {
            _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
            ssrRenderList(realisations.value, (realisation) => {
              _push(`<div class="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"><div class="h-40 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">`);
              if (realisation.type === "image") {
                _push(`<img${ssrRenderAttr("src", realisation.url)}${ssrRenderAttr("alt", realisation.titre)} class="w-full h-full object-cover object-center" loading="lazy">`);
              } else {
                _push(`<div class="w-full h-full flex items-center justify-center text-4xl"> \u{1F3A5} </div>`);
              }
              _push(`</div><div class="p-4"><h4 class="font-bold text-lg text-gray-800 mb-1">${ssrInterpolate(realisation.titre)}</h4>`);
              if (realisation.description) {
                _push(`<p class="text-sm text-gray-600 line-clamp-2 mb-3">${ssrInterpolate(realisation.description)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="flex items-center justify-between"><span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">${ssrInterpolate(realisation.type === "image" ? "\u{1F4F7} Image" : "\u{1F3A5} Vid\xE9o")}</span><button class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"> \u{1F5D1}\uFE0F </button></div></div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (showOrderModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 p-6"><div class="flex items-start justify-between mb-4"><h3 class="text-2xl font-bold">D\xE9tails de la commande</h3><button class="text-gray-600 hover:text-gray-800">\u2716</button></div>`);
        if (selectedOrder.value) {
          _push(`<div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h4 class="font-semibold">Client</h4><p class="text-lg">${ssrInterpolate(selectedOrder.value.prenom)} ${ssrInterpolate(selectedOrder.value.nom)}</p><p class="text-sm text-gray-600">${ssrInterpolate(selectedOrder.value.email || "-")}</p><p class="text-sm">\u{1F4DE} ${ssrInterpolate(selectedOrder.value.telephone || "-")}</p></div><div><h4 class="font-semibold">Localisation</h4><p>${ssrInterpolate(selectedOrder.value.localisation || "-")}</p><h4 class="font-semibold mt-4">Total</h4><p class="text-xl font-bold text-blue-600">${ssrInterpolate(selectedOrder.value.total.toLocaleString())} FCFA</p><p class="text-sm text-gray-500">Le ${ssrInterpolate(new Date(selectedOrder.value.createdAt).toLocaleString())}</p></div></div><div><h4 class="font-semibold">Articles</h4><div class="space-y-2 mt-2"><!--[-->`);
          ssrRenderList(selectedOrder.value.items, (it, idx) => {
            _push(`<div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"><div class="flex items-center gap-3"><span class="text-2xl">${ssrInterpolate(it.emoji)}</span><div><div class="font-medium">${ssrInterpolate(it.name)}</div><div class="text-sm text-gray-600">Prix: ${ssrInterpolate(it.price.toLocaleString())} FCFA</div></div></div><div class="text-right">x${ssrInterpolate(it.quantity)}</div></div>`);
          });
          _push(`<!--]--></div></div><div class="flex justify-end mt-4"><button class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">Fermer</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-BTWZGhNG.mjs.map
