<template>
  <div v-if="!isAuthenticated" class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md w-full">
      <div class="text-center mb-8">
        <div class="bg-blue-100 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <span class="text-4xl">🔐</span>
        </div>
        <h1 class="text-3xl font-bold text-blue-600 mb-2">Espace Admin</h1>
        <p class="text-gray-600">Connexion requise</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label class="block mb-2 font-bold">🔐 Mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
            placeholder="Entrez le mot de passe"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
        >
          SE CONNECTER
        </button>
      </form>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">👨‍💼 Espace Administrateur</h1>
          <p class="text-lg opacity-90">Gestion de YOLAAB</p>
        </div>
        <button
          @click="logout"
          class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all font-bold"
        >
          🚪 DÉCONNEXION
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Tabs -->
      <div class="bg-white rounded-2xl shadow-lg overflow-x-auto mb-8">
        <div class="flex">
          <button
            @click="activeTab = 'reservations'"
            :class="[
              'flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all',
              activeTab === 'reservations' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
            ]"
          >
            <span>📅</span>
            <span class="hidden md:inline">Réservations</span>
            <span class="md:hidden">Rés.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'reservations'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              ]"
            >
              {{ reservations.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'products'"
            :class="[
              'flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all',
              activeTab === 'products' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
            ]"
          >
            <span>🛍️</span>
            <span class="hidden md:inline">Produits</span>
            <span class="md:hidden">Prod.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              ]"
            >
              {{ products.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'orders'"
            :class="[
              'flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all',
              activeTab === 'orders' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
            ]"
          >
            <span>🛒</span>
            <span class="hidden md:inline">Commandes</span>
            <span class="md:hidden">Cmd.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              ]"
            >
              {{ orders.length }}
            </span>
          </button>

          <button
            @click="activeTab = 'realisations'"
            :class="[
              'flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all',
              activeTab === 'realisations' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
            ]"
          >
            <span>🎬</span>
            <span class="hidden md:inline">Réalisations</span>
            <span class="md:hidden">Réal.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'realisations'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              ]"
            >
              {{ realisations.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Reservations Tab -->
      <div v-if="activeTab === 'reservations'" class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-6">📅 Réservations ({{ reservations.length }})</h2>
        <div v-if="reservations.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📅</div>
          <p class="text-xl text-gray-600">Aucune réservation pour le moment</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2">
                <th class="text-left p-4">Client</th>
                <th class="text-left p-4">Téléphone</th>
                <th class="text-left p-4">Service</th>
                <th class="text-left p-4">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(res, index) in reservations" :key="index" class="border-b hover:bg-blue-50">
                <td class="p-4">
                  <div class="font-bold">{{ res.prenom }} {{ res.nom }}</div>
                  <div v-if="res.email" class="text-sm text-gray-600">{{ res.email }}</div>
                </td>
                <td class="p-4">{{ res.telephone }}</td>
                <td class="p-4">
                  <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {{ res.typeService }}
                  </span>
                </td>
                <td class="p-4">{{ res.date }} - {{ res.heure }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Unified Workers + Candidatures Tab -->
      <div v-if="activeTab === 'workers'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600">👥 Travailleurs & Candidatures ({{ workers.length + applications.length }})</h2>
          <button
            @click="showAddWorker = true"
            class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <span>➕</span> Ajouter
          </button>
        </div>

        <!-- Add worker form: use the same structure as public recruitment form -->
        <form v-if="showAddWorker" @submit.prevent="addWorker" class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="font-bold text-xl mb-4">➕ Nouveau Travailleur</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                <input v-model="newWorkerForm.nom" type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Nom" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                <input v-model="newWorkerForm.prenom" type="text" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Prénom" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                <input v-model="newWorkerForm.telephone" type="tel" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Téléphone" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input v-model="newWorkerForm.email" type="email" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" placeholder="Email" />
              </div>
            </div>
          </div>

          <div class="space-y-4 mt-4">
            <h4 class="text-lg font-bold text-blue-600">Sélectionner Un Poste</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button v-for="poste in postes" :key="poste.id" type="button" @click="newWorkerForm.poste = poste.id" :class="['p-4 rounded-2xl border-2 transition-all text-center cursor-pointer', newWorkerForm.poste === poste.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:border-blue-400']">
                <div class="text-3xl mb-2">{{ poste.emoji }}</div>
                <p class="font-semibold text-gray-700">{{ poste.label }}</p>
              </button>
            </div>
          </div>

          <div class="space-y-4 mt-4">
            <h4 class="text-lg font-bold text-blue-600">Votre Expérience</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button v-for="exp in experiences" :key="exp.id" type="button" @click="newWorkerForm.experience = exp.id" :class="['p-4 rounded-2xl border-2 transition-all text-center cursor-pointer', newWorkerForm.experience === exp.id ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-300 hover:border-blue-400']">
                <div class="text-3xl mb-2">{{ exp.emoji }}</div>
                <p class="font-semibold text-gray-700">{{ exp.label }}</p>
              </button>
            </div>
          </div>

          <div class="space-y-4 mt-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea v-model="newWorkerForm.message" placeholder="Parlez-nous du candidat..." rows="4" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"></textarea>
          </div>

          <div class="flex gap-4 mt-4">
            <button type="submit" class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">Enregistrer</button>
            <button type="button" @click="showAddWorker = false" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all">Annuler</button>
          </div>
        </form>

        <!-- Unified list (Travailleurs + Candidatures) -->
        <div v-if="workers.length === 0 && applications.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">👥</div>
          <p class="text-xl text-gray-600">Aucun travailleur ou candidature</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2">
                <th class="text-left p-4">Nom</th>
                <th class="text-left p-4">Téléphone</th>
                <th class="text-left p-4">Poste</th>
                <th class="text-left p-4">Statut</th>
                <th class="text-left p-4">Détails</th>
                <th class="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Travailleurs (embauched) -->
              <tr v-for="worker in workers" :key="'w-' + worker.id" class="border-b hover:bg-green-50">
                <td class="p-4 font-bold">{{ worker.prenom }} {{ worker.nom }}</td>
                <td class="p-4">{{ worker.telephone }}</td>
                <td class="p-4"><span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">{{ worker.poste }}</span></td>
                <td class="p-4"><span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">✅ Travailleur</span></td>
                <td class="p-4 text-gray-600">Embauché le {{ worker.dateEmbauche }}</td>
                <td class="p-4">
                  <button @click="deleteWorker(worker.id)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all text-xs">🗑️</button>
                </td>
              </tr>
              <!-- Candidatures -->
              <tr v-for="(app, index) in applications" :key="'a-' + index" class="border-b hover:bg-yellow-50">
                <td class="p-4 font-bold">
                  <div>{{ app.prenom }} {{ app.nom }}</div>
                  <div class="text-xs text-gray-500">{{ app.email }}</div>
                </td>
                <td class="p-4">{{ app.telephone }}</td>
                <td class="p-4"><span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">{{ app.poste }}</span></td>
                <td class="p-4"><span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">📝 Candidat</span></td>
                <td class="p-4 text-gray-600">{{ app.experience }}</td>
                <td class="p-4 space-x-2">
                  <button @click="acceptCandidate(index)" class="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-all text-xs font-bold" title="Accepter">✅ Accepter</button>
                  <button @click="rejectCandidate(index)" class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all text-xs font-bold" title="Rejeter">❌ Rejeter</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Invoices Tab -->
      <div v-if="activeTab === 'invoices'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600">💰 Factures ({{ invoices.length }})</h2>
          <button
            @click="showAddInvoice = true"
            class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <span>➕</span> Créer
          </button>
        </div>

        <form v-if="showAddInvoice" @submit.prevent="addInvoice" class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="font-bold text-xl mb-4">➕ Nouvelle Facture</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              v-model="newInvoice.client"
              type="text"
              placeholder="Nom du client"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newInvoice.service"
              type="text"
              placeholder="Service"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newInvoice.montant"
              type="number"
              placeholder="Montant (FCFA)"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newInvoice.date"
              type="date"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <select
              v-model="newInvoice.statut"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="en attente">En attente</option>
              <option value="payé">Payé</option>
            </select>
          </div>
          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
            >
              Créer
            </button>
            <button
              type="button"
              @click="showAddInvoice = false"
              class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
            >
              Annuler
            </button>
          </div>
        </form>

        <div v-if="invoices.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">💰</div>
          <p class="text-xl text-gray-600">Aucune facture créée</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2">
                <th class="text-left p-4">Client</th>
                <th class="text-left p-4">Service</th>
                <th class="text-left p-4">Montant</th>
                <th class="text-left p-4">Date</th>
                <th class="text-left p-4">Statut</th>
                <th class="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invoice in invoices" :key="invoice.id" class="border-b hover:bg-blue-50">
                <td class="p-4 font-bold">{{ invoice.client }}</td>
                <td class="p-4">{{ invoice.service }}</td>
                <td class="p-4 font-bold text-blue-600">{{ invoice.montant.toLocaleString() }} FCFA</td>
                <td class="p-4">{{ invoice.date }}</td>
                <td class="p-4">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full',
                      invoice.statut === 'payé'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'
                    ]"
                  >
                    {{ invoice.statut === 'payé' ? '✅ Payé' : '⏳ En attente' }}
                  </span>
                </td>
                <td class="p-4">
                  <button
                    @click="toggleInvoiceStatus(invoice.id)"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Changer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="invoices.length > 0" class="mt-6 bg-blue-50 p-6 rounded-xl">
          <div class="flex items-center justify-between text-xl font-bold text-blue-600">
            <span>TOTAL:</span>
            <span>{{ invoices.reduce((sum, inv) => sum + inv.montant, 0).toLocaleString() }} FCFA</span>
          </div>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600">🛍️ Produits ({{ products.length }})</h2>
          <button
            @click="showAddProduct = true"
            class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <span>➕</span> Ajouter
          </button>
        </div>

        <form v-if="showAddProduct" @submit.prevent="addProduct" class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="font-bold text-xl mb-4">➕ Nouveau Produit</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              v-model="newProduct.nom"
              type="text"
              placeholder="Nom du produit"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newProduct.prix"
              type="number"
              step="0.01"
              placeholder="Prix (FCFA)"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newProduct.quantite"
              type="number"
              placeholder="Quantité"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <select
              v-model="newProduct.categorie"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="nettoyage">Nettoyage</option>
              <option value="equipement">Équipement</option>
              <option value="produit">Produit</option>
              <option value="autre">Autre</option>
            </select>
            <input
              @change="handleImageUpload"
              type="file"
              accept="image/*"
              placeholder="Sélectionner une image"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none md:col-span-2"
              required
            />
          </div>
          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
            >
              Enregistrer
            </button>
            <button
              type="button"
              @click="showAddProduct = false"
              class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
            >
              Annuler
            </button>
          </div>
        </form>

        <div v-if="products.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🛍️</div>
          <p class="text-xl text-gray-600">Aucun produit enregistré</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2">
                <th class="text-left p-4">Nom</th>
                <th class="text-left p-4">Prix</th>
                <th class="text-left p-4">Stock</th>
                <th class="text-left p-4">Catégorie</th>
                <th class="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="border-b hover:bg-blue-50">
                <td class="p-4 font-bold">{{ product.nom }}</td>
                <td class="p-4">{{ product.prix.toLocaleString() }} FCFA</td>
                <td class="p-4">{{ product.quantite }}</td>
                <td class="p-4">
                  <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {{ product.categorie }}
                  </span>
                </td>
                <td class="p-4 space-x-2">
                  <button
                    @click="editProduct(product)"
                    class="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all"
                  >
                    ✏️
                  </button>
                  <button
                    @click="deleteProduct(product.id)"
                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-6">🛒 Commandes ({{ orders.length }})</h2>
        <div v-if="orders.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🛒</div>
          <p class="text-xl text-gray-600">Aucune commande pour le moment</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="(order, index) in orders" :key="index" class="border-2 border-blue-100 rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-lg">Commande #{{ index + 1 }}</h3>
                <div class="flex items-center gap-4">
                  <span class="text-xl font-bold text-blue-600">{{ order.total.toLocaleString() }} FCFA</span>
                  <button @click="viewOrder(order)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Voir détails</button>
                </div>
            </div>
            <div class="space-y-2">
              <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{{ item.emoji }}</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="text-right">
                  <span class="font-bold">x{{ item.quantity }}</span>
                  <span class="ml-4">{{ (item.price * item.quantity).toLocaleString() }} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Realisations Tab -->
      <div v-if="activeTab === 'realisations'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600">🎬 Réalisations ({{ realisations.length }})</h2>
          <button
            @click="showAddRealisation = true"
            class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <span>➕</span> Ajouter
          </button>
        </div>

        <!-- Add Realisation Form -->
        <form v-if="showAddRealisation" @submit.prevent="addRealisation" class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="font-bold text-xl mb-4">➕ Nouvelle Réalisation</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              v-model="newRealisation.titre"
              type="text"
              placeholder="Titre de la réalisation"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <select
              v-model="newRealisation.type"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="image">📷 Image</option>
              <option value="video">🎥 Vidéo</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Description (optionnel)</label>
            <textarea
              v-model="newRealisation.description"
              placeholder="Description du projet..."
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <!-- Image Upload or Video URL -->
          <div v-if="newRealisation.type === 'image'" class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
            <input
              @change="handleRealisationImageUpload"
              type="file"
              accept="image/*"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div v-if="newRealisation.type === 'video'" class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Source Vidéo *</label>
            <div class="flex gap-4 mb-2">
              <label class="flex items-center gap-2">
                <input type="radio" value="url" v-model="newRealisation.videoSource" /> URL
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" value="file" v-model="newRealisation.videoSource" /> Fichier (ordinateur/téléphone)
              </label>
            </div>

            <div v-if="newRealisation.videoSource === 'url'">
              <label class="block text-sm font-semibold text-gray-700 mb-2">URL Vidéo (YouTube ou Vimeo) *</label>
              <input
                v-model="newRealisation.url"
                type="text"
                placeholder="https://www.youtube.com/embed/..."
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div v-else>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Fichier Vidéo *</label>
              <input
                @change="handleRealisationVideoUpload"
                type="file"
                accept="video/*"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
              <p class="text-sm text-gray-500 mt-2">Formats courants: .mp4, .mov — taille maximale conseillée: 100MB</p>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
            >
              Ajouter
            </button>
            <button
              type="button"
              @click="showAddRealisation = false"
              class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
            >
              Annuler
            </button>
          </div>
        </form>

        <!-- Realisations List -->
        <div v-if="realisations.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🎬</div>
          <p class="text-xl text-gray-600">Aucune réalisation enregistrée</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="realisation in realisations" :key="realisation.id" class="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            <!-- Thumbnail -->
            <div class="h-40 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
              <img
                v-if="realisation.type === 'image'"
                :src="resolveRealisationUrl(realisation.url)"
                :alt="realisation.titre"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl">
                🎥
              </div>
            </div>

            <!-- Info -->
            <div class="p-4">
              <h4 class="font-bold text-lg text-gray-800 mb-1">{{ realisation.titre }}</h4>
              <p v-if="realisation.description" class="text-sm text-gray-600 line-clamp-2 mb-3">
                {{ realisation.description }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {{ realisation.type === 'image' ? '📷 Image' : '🎥 Vidéo' }}
                </span>
                <button
                  @click="deleteRealisation(realisation.id)"
                  class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Order Details Modal (inline in same template) -->
  <div v-if="showOrderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl w-11/12 md:w-2/3 lg:w-1/2 p-6">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-2xl font-bold">Détails de la commande</h3>
        <button @click="closeOrderModal" class="text-gray-600 hover:text-gray-800">✖</button>
      </div>

      <div v-if="selectedOrder" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold">Client</h4>
            <p class="text-lg">{{ selectedOrder.prenom }} {{ selectedOrder.nom }}</p>
            <p class="text-sm text-gray-600">{{ selectedOrder.email || '-' }}</p>
            <p class="text-sm">📞 {{ selectedOrder.telephone || '-' }}</p>
          </div>
          <div>
            <h4 class="font-semibold">Localisation</h4>
            <p>{{ selectedOrder.localisation || '-' }}</p>
            <h4 class="font-semibold mt-4">Total</h4>
            <p class="text-xl font-bold text-blue-600">{{ selectedOrder.total.toLocaleString() }} FCFA</p>
            <p class="text-sm text-gray-500">Le {{ new Date(selectedOrder.createdAt).toLocaleString() }}</p>
          </div>
        </div>

        <div>
          <h4 class="font-semibold">Articles</h4>
          <div class="space-y-2 mt-2">
            <div v-for="(it, idx) in selectedOrder.items" :key="idx" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ it.emoji }}</span>
                <div>
                  <div class="font-medium">{{ it.name }}</div>
                  <div class="text-sm text-gray-600">Prix: {{ it.price.toLocaleString() }} FCFA</div>
                </div>
              </div>
              <div class="text-right">x{{ it.quantity }}</div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button @click="closeOrderModal" class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Worker {
  id: string
  nom: string
  prenom: string
  poste: string
  telephone: string
  dateEmbauche: string
}

interface Invoice {
  id: string
  client: string
  service: string
  montant: number
  date: string
  statut: 'payé' | 'en attente'
}

interface ReservationData {
  nom: string
  prenom: string
  telephone: string
  email?: string
  typeService: string
  date: string
  heure: string
}

interface ApplicationData {
  nom: string
  prenom: string
  telephone: string
  email: string
  poste: string
  experience: string
  message?: string
}

interface Product {
  id: string
  nom: string
  prix: number
  quantite: number
  categorie: string
  image: string
}

const isAuthenticated = ref(false)
const password = ref('')
const activeTab = ref<'reservations' | 'applications' | 'workers' | 'invoices' | 'orders' | 'products' | 'realisations'>('reservations')
const workers = ref<Worker[]>([])
const invoices = ref<Invoice[]>([])
const products = ref<Product[]>([])
const showAddWorker = ref(false)
const showAddInvoice = ref(false)
const showAddProduct = ref(false)
const isLoadingData = ref(false)

const apiBaseUrl = ref('')

const newWorkerForm = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  poste: '',
  experience: '',
  message: '',
})

const postes = [
  { id: 'laveur', emoji: '🧹', label: 'Laveur' },
  { id: 'chauffeur', emoji: '🚗', label: 'Chauffeur' },
  { id: 'manager', emoji: '👔', label: 'Manager' },
  { id: 'technicien', emoji: '🔧', label: 'Technicien' },
]

const experiences = [
  { id: 'debutant', emoji: '🌱', label: 'Débutant (0-1 an)' },
  { id: 'intermediaire', emoji: '📈', label: 'Intermédiaire (1-3 ans)' },
  { id: 'confirme', emoji: '⭐', label: 'Confirmé (3-5 ans)' },
  { id: 'expert', emoji: '🏆', label: 'Expert (5+ ans)' },
]

const newInvoice = ref({
  client: '',
  service: '',
  montant: '' as string | number,
  date: '',
  statut: 'en attente' as 'payé' | 'en attente',
})

const newProduct = ref({
  nom: '',
  prix: '' as string | number,
  quantite: '' as string | number,
  categorie: 'nettoyage',
})

const imageFile = ref<File | null>(null)

// API URL configuration
const apiUrl = useRuntimeConfig().public.apiUrl || 'http://localhost:3000'

// Mock data - À remplacer par des appels API
const reservations = ref<ReservationData[]>([])
const applications = ref<ApplicationData[]>([])
const orders = ref<any[]>([])

const resolveRealisationUrl = (raw: string | undefined | null): string => {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return trimmed
  const path = trimmed.startsWith('/') ? trimmed : `/uploads/${trimmed}`
  const base = apiBaseUrl.value || useRuntimeConfig().public.apiUrl || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}${path}`
}

const handleLogin = () => {
  if (password.value === 'yolaab2026') {
    isAuthenticated.value = true
    alert('✅ Connexion réussie')
    loadData()
  } else {
    alert('❌ Mot de passe incorrect')
  }
}

const loadData = async () => {
  isLoadingData.value = true
  const config = useRuntimeConfig()
  apiBaseUrl.value = config.public.apiUrl || 'http://localhost:3000'
  
  try {
    // Charger réservations
    const resRes = await fetch(`${apiBaseUrl.value}/reservations`)
    if (resRes.ok) {
      reservations.value = await resRes.json()
    }

    // Charger candidatures
    const appRes = await fetch(`${apiBaseUrl.value}/applications`)
    if (appRes.ok) {
      applications.value = await appRes.json()
    }

    // Charger workers
    const workerRes = await fetch(`${apiBaseUrl.value}/workers`)
    if (workerRes.ok) {
      workers.value = await workerRes.json()
    }

    // Charger produits
    const prodRes = await fetch(`${apiBaseUrl.value}/products`)
    if (prodRes.ok) {
      products.value = await prodRes.json()
    }

    // Charger commandes
    const ordRes = await fetch(`${apiBaseUrl.value}/orders`)
    if (ordRes.ok) {
      orders.value = await ordRes.json()
    }
  } catch (err) {
    console.error('Erreur de chargement:', err)
  } finally {
    isLoadingData.value = false
  }
}

const logout = () => {
  isAuthenticated.value = false
  password.value = ''
}

const addWorker = async () => {
  // Create worker locally (and optionally you can POST to backend)
  const worker: Worker = {
    id: Date.now().toString(),
    nom: newWorkerForm.value.nom,
    prenom: newWorkerForm.value.prenom,
    poste: newWorkerForm.value.poste || 'autre',
    telephone: newWorkerForm.value.telephone,
    dateEmbauche: new Date().toISOString().slice(0, 10),
  }

  // Try to persist to backend if available
  try {
    const resp = await fetch(`${apiUrl}/workers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: worker.nom,
        prenom: worker.prenom,
        poste: worker.poste,
        telephone: worker.telephone,
        dateEmbauche: worker.dateEmbauche,
      }),
    })

    if (resp.ok) {
      const created = await resp.json()
      workers.value.push(created)
    } else {
      // fallback to local push
      workers.value.push(worker)
    }
  } catch (err) {
    workers.value.push(worker)
  }

  // Reset form
  newWorkerForm.value = { nom: '', prenom: '', telephone: '', email: '', poste: '', experience: '', message: '' }
  showAddWorker.value = false
  alert('✅ Travailleur ajouté avec succès')
}

const deleteWorker = (id: string) => {
  workers.value = workers.value.filter(w => w.id !== id)
  alert('✅ Travailleur supprimé')
}

const acceptCandidate = (index: number) => {
  const app = applications.value[index]
  if (!app) return

  // Create worker from candidate
  const worker: Worker = {
    id: Date.now().toString(),
    nom: app.nom,
    prenom: app.prenom,
    poste: app.poste || 'autre',
    telephone: app.telephone,
    dateEmbauche: new Date().toISOString().slice(0, 10),
  }

  workers.value.push(worker)
  applications.value.splice(index, 1)
  alert('✅ Candidat accepté et ajouté comme travailleur')
}

const rejectCandidate = (index: number) => {
  applications.value.splice(index, 1)
  alert('✅ Candidat rejeté')
}

const addInvoice = () => {
  const invoice: Invoice = {
    id: Date.now().toString(),
    client: newInvoice.value.client,
    service: newInvoice.value.service,
    montant: typeof newInvoice.value.montant === 'string' 
      ? parseFloat(newInvoice.value.montant) 
      : newInvoice.value.montant,
    date: newInvoice.value.date,
    statut: newInvoice.value.statut,
  }
  invoices.value.push(invoice)
  newInvoice.value = { client: '', service: '', montant: '', date: '', statut: 'en attente' }
  showAddInvoice.value = false
  alert('✅ Facture créée avec succès')
}

const toggleInvoiceStatus = (id: string) => {
  const invoice = invoices.value.find(inv => inv.id === id)
  if (invoice) {
    invoice.statut = invoice.statut === 'payé' ? 'en attente' : 'payé'
    alert('✅ Statut mis à jour')
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    imageFile.value = file
  }
}

const addProduct = async () => {
  if (!imageFile.value) {
    alert('❌ Veuillez sélectionner une image')
    return
  }

  try {
    const formData = new FormData()
    formData.append('nom', newProduct.value.nom)
    formData.append('prix', newProduct.value.prix.toString())
    formData.append('quantite', newProduct.value.quantite.toString())
    formData.append('categorie', newProduct.value.categorie)
    formData.append('image', imageFile.value)

    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      products.value.push(data)
      newProduct.value = { nom: '', prix: '', quantite: '', categorie: 'nettoyage' }
      imageFile.value = null
      showAddProduct.value = false
      alert('✅ Produit ajouté avec succès')
    } else {
      alert('❌ Erreur lors de l\'ajout du produit')
    }
  } catch (error) {
    alert('❌ Erreur lors de l\'ajout du produit')
    console.error(error)
  }
}

const editProduct = (product: Product) => {
  newProduct.value = { ...product }
  // À implémentation: Modal ou formulaire d'édition
  alert('✏️ Édition à implémenter')
}

const deleteProduct = async (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    try {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        products.value = products.value.filter(p => p.id !== id)
        alert('✅ Produit supprimé')
      }
    } catch (error) {
      alert('❌ Erreur lors de la suppression')
      console.error(error)
    }
  }
}

const showOrderModal = ref(false)
const selectedOrder = ref<any | null>(null)

const viewOrder = (order: any) => {
  selectedOrder.value = order
  showOrderModal.value = true
}

const closeOrderModal = () => {
  selectedOrder.value = null
  showOrderModal.value = false
}

// Realisations Management
const realisations = ref<any[]>([])
const showAddRealisation = ref(false)
const realisationImageFile = ref<File | null>(null)

const newRealisation = ref({
  titre: '',
  description: '',
  type: 'image' as 'image' | 'video',
  url: '',
  videoSource: 'url' as 'url' | 'file',
})

const handleRealisationImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    realisationImageFile.value = input.files[0]
  }
}

const realisationVideoFile = ref<File | null>(null)

const handleRealisationVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    realisationVideoFile.value = input.files[0]
  }
}

const addRealisation = async () => {
  try {
    if (newRealisation.value.type === 'image' && !realisationImageFile.value) {
      alert('❌ Veuillez sélectionner une image')
      return
    }

    if (newRealisation.value.type === 'video') {
      if (newRealisation.value.videoSource === 'url' && !newRealisation.value.url) {
        alert('❌ Veuillez entrer une URL vidéo')
        return
      }
      if (newRealisation.value.videoSource === 'file' && !realisationVideoFile.value) {
        alert('❌ Veuillez sélectionner un fichier vidéo')
        return
      }
    }

    const formData = new FormData()
    formData.append('titre', newRealisation.value.titre)
    formData.append('description', newRealisation.value.description)
    formData.append('type', newRealisation.value.type)

    if (newRealisation.value.type === 'image' && realisationImageFile.value) {
      formData.append('file', realisationImageFile.value)
    } else if (newRealisation.value.type === 'video') {
      if (newRealisation.value.videoSource === 'file' && realisationVideoFile.value) {
        formData.append('file', realisationVideoFile.value)
      } else {
        formData.append('url', newRealisation.value.url)
      }
    }

    const response = await fetch(`${apiUrl}/realisations`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Erreur lors de l\'ajout')

    const newItem = await response.json()
    realisations.value.push(newItem)

    newRealisation.value = {
      titre: '',
      description: '',
      type: 'image',
      url: '',
      videoSource: 'url',
    }
    realisationImageFile.value = null
    realisationVideoFile.value = null
    showAddRealisation.value = false
    alert('✅ Réalisation ajoutée')
  } catch (error) {
    alert('❌ Erreur lors de l\'ajout de la réalisation')
    console.error(error)
  }
}

const deleteRealisation = async (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
    try {
      const response = await fetch(`${apiUrl}/realisations/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        realisations.value = realisations.value.filter(r => r.id !== id)
        alert('✅ Réalisation supprimée')
      }
    } catch (error) {
      alert('❌ Erreur lors de la suppression')
      console.error(error)
    }
  }
}

const loadRealisations = async () => {
  try {
    const response = await fetch(`${apiUrl}/realisations`)
    if (response.ok) {
      realisations.value = await response.json()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des réalisations', error)
  }
}

onMounted(() => {
  loadRealisations()
})
</script>