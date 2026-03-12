<template>
  <!-- Login Screen -->
  <div v-if="!isAuthenticated" class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Animated background blobs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -right-40 -top-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute -left-40 bottom-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>
    <div class="bg-gradient-to-br from-white via-blue-50/50 to-white rounded-3xl shadow-xl p-8 md:p-12 max-w-md w-full relative z-10 border border-blue-200/30 login-card">
      <div class="text-center mb-10">
        <div class="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 icon-circle-animate">
          <Lock size="36" />
        </div>
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">Espace Admin</h1>
        <p class="text-gray-600">Connexion requise</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="mb-6">
          <label class="block mb-3 font-bold text-gray-700"><Lock size="16" class="inline-block mr-2 text-blue-600"/>Mot de passe</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg input-animate transition-all"
            placeholder="Entrez le mot de passe"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all font-bold text-lg button-animate"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>

  <!-- Admin Dashboard -->
  <div v-else class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Header -->
    <div class="bg-white shadow-md px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 border-b-2 border-blue-100 header-animate">
      <div class="flex items-center gap-3">
        <div class="text-blue-600 p-2 bg-blue-50 rounded-lg">
          <Lock class="w-6 h-6" />
        </div>
        <h1 class="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Espace Admin</h1>
      </div>
      <button
        @click="logout"
        class="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all font-bold text-sm md:text-base flex items-center gap-2"
      >
        <XCircle class="w-4 h-4" /> <span class="uppercase">Déconnexion</span>
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Tabs -->
      <div class="bg-white rounded-3xl shadow-lg overflow-x-auto mb-8 tabs-container">
        <div class="flex">
          <button
            @click="activeTab = 'reservations'"
            :class="[
              'flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all',
              activeTab === 'reservations' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
            ]"
          >
            <Calendar class="w-5 h-5" />
            <span class="hidden sm:inline">Réservations</span>
            <span class="sm:hidden text-sm">Rés.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'reservations' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
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
            <ShoppingCart class="w-5 h-5" />
            <span class="hidden sm:inline">Produits</span>
            <span class="sm:hidden text-sm">Prod.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
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
            <ShoppingCart class="w-5 h-5" />
            <span class="hidden sm:inline">Commandes</span>
            <span class="sm:hidden text-sm">Cmd.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
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
            <Play class="w-5 h-5" />
            <span class="hidden sm:inline">Réalisations</span>
            <span class="sm:hidden text-sm">Réal.</span>
            <span
              :class="[
                'px-2 py-1 rounded-full text-sm font-bold',
                activeTab === 'realisations' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
              ]"
            >
              {{ realisations.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Reservations Tab -->
      <div v-if="activeTab === 'reservations'" class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2"><Calendar class="w-5 h-5" /> Réservations ({{ reservations.length }})</h2>
        <div v-if="reservations.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4"><Calendar class="w-16 h-16 text-blue-400" /></div>
          <p class="text-xl text-gray-600">Aucune réservation pour le moment</p>
        </div>
        <div v-else>
          <!-- Mobile: stacked cards -->
          <div class="md:hidden space-y-4">
            <div v-for="(res, idx) in reservations" :key="'mobile-'+idx" class="border-2 border-blue-50 rounded-xl p-4 bg-white">
              <div class="flex items-start justify-between">
                <div>
                  <div class="font-bold">{{ res.prenom }} {{ res.nom }}</div>
                  <div class="text-sm text-gray-600">{{ res.localisation || '-' }}</div>
                  <div class="text-sm mt-2"><span class="font-semibold">Téléphone:</span> {{ res.telephone }}</div>
                  <div class="text-sm mt-1"><span class="font-semibold">Service:</span> {{ res.typeService }}</div>
                  <div class="text-sm mt-1"><span class="font-semibold">Durée:</span> {{ res.duree }}</div>
                  <div v-if="res.serviceDetails" class="text-sm mt-2 text-gray-700">
                    <div v-if="res.serviceDetails.places">Places: {{ res.serviceDetails.places }}</div>
                    <div v-if="res.serviceDetails.longueur || res.serviceDetails.largeur">Dimensions: {{ res.serviceDetails.longueur || 0 }}m × {{ res.serviceDetails.largeur || 0 }}m</div>
                    <div v-if="res.serviceDetails.surface">Surface: {{ res.serviceDetails.surface }} m²</div>
                    <div v-if="res.serviceDetails.nombrePieces">Pièces: {{ res.serviceDetails.nombrePieces }}</div>
                    <div v-if="res.serviceDetails.typeVehicule">Véhicule: {{ res.serviceDetails.typeVehicule || 'Non spécifié' }}</div>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <button @click="deleteReservation(res.id)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all">Supprimer</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop: table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b-2">
                  <th class="text-left p-4">Client</th>
                  <th class="text-left p-4">Téléphone</th>
                  <th class="text-left p-4">Service</th>
                  <th class="text-left p-4">Durée</th>
                  <th class="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(res, index) in reservations" :key="index" class="border-b hover:bg-blue-50">
                  <td class="p-4">
                    <div class="font-bold">{{ res.prenom }} {{ res.nom }}</div>
                    <div v-if="res.localisation" class="text-sm text-gray-600">{{ res.localisation }}</div>
                  </td>
                  <td class="p-4">{{ res.telephone }}</td>
                  <td class="p-4">
                    <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {{ res.typeService }}
                    </span>
                    <div v-if="res.serviceDetails" class="text-sm text-gray-600 mt-2">
                      <div v-if="res.serviceDetails.places">Places: {{ res.serviceDetails.places }}</div>
                      <div v-if="res.serviceDetails.longueur || res.serviceDetails.largeur">Dims: {{ res.serviceDetails.longueur || 0 }}m × {{ res.serviceDetails.largeur || 0 }}m</div>
                      <div v-if="res.serviceDetails.surface">Surface: {{ res.serviceDetails.surface }} m²</div>
                    </div>
                  </td>
                  <td class="p-4">{{ res.duree }}</td>
                  <td class="p-4">
                    <button @click="deleteReservation(res.id)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"><XCircle class="w-5 h-5" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600 flex items-center gap-2"><ShoppingCart class="w-5 h-5"/> Produits ({{ products.length }})</h2>
          <button
            @click="showAddProduct = true"
            class="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Plus class="w-4 h-4"/> <span>Ajouter</span>
          </button>
        </div>

        <form v-if="showAddProduct" @submit.prevent="addProduct" class="bg-blue-50 p-4 sm:p-6 rounded-xl mb-6">
          <h3 class="font-bold text-lg sm:text-xl mb-4"><Plus class="w-4 h-4 inline-block mr-2"/> Nouveau Produit</h3>
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
              <option
                v-for="cat in productCategories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
              <option value="autre">Autre</option>
            </select>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
              <input
                @change="handleImageUpload"
                type="file"
                accept="image/*"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div class="flex gap-4">
            <button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">Ajouter</button>
            <button type="button" @click="showAddProduct = false" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all">Annuler</button>
          </div>
        </form>

        <div v-if="products.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4"><ShoppingCart class="w-16 h-16 mx-auto text-blue-400"/></div>
          <p class="text-xl text-gray-600">Aucun produit enregistré</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in products" :key="product.id" class="border-2 border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            <div class="h-48 bg-blue-50 overflow-hidden">
              <img :src="resolveRealisationUrl(product.image)" :alt="product.nom" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-lg">{{ product.nom }}</h4>
              <p class="text-blue-600 font-bold">{{ product.prix.toLocaleString() }} FCFA</p>
              <p class="text-sm text-gray-500">Qté: {{ product.quantite }}</p>
              <div class="flex gap-2 mt-3">
                <button @click="editProduct(product)" class="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all text-sm flex items-center justify-center gap-2"><Plus class="w-4 h-4"/> Éditer</button>
                <button @click="deleteProduct(product.id)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"><XCircle class="w-5 h-5"/></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2"><ShoppingCart class="w-5 h-5"/> Commandes ({{ orders.length }})</h2>
        <div v-if="orders.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4"><ShoppingCart class="w-16 h-16 mx-auto text-blue-400"/></div>
          <p class="text-xl text-gray-600">Aucune commande pour le moment</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="(order, index) in orders" :key="order.id || index" class="border-2 border-blue-100 rounded-xl p-4 md:p-6 bg-white">
            <div class="flex items-start md:items-center justify-between gap-3">
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-4">
                  <div class="truncate">
                    <h3 class="font-bold text-lg truncate">
                      Commande #{{ index + 1 }}
                      <span class="text-sm text-gray-500">— {{ order.prenom || '-' }} {{ order.nom || '' }}</span>
                    </h3>
                    <div class="text-xs text-gray-500">{{ order.createdAt ? new Date(order.createdAt).toLocaleString() : '' }}</div>
                  </div>
                  <div class="text-right md:text-left">
                    <div class="text-lg font-bold text-blue-600">{{ order.total.toLocaleString() }} FCFA</div>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button @click="toggleOrderDetails(order.id)" class="p-2 bg-gray-100 rounded-md md:hidden" aria-label="toggle details">
                  <span v-if="isOrderExpanded(order.id)">▲</span>
                  <span v-else>▼</span>
                </button>
                <button @click="viewOrder(order)" class="hidden md:inline-flex bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">Voir</button>
                <button @click="deleteOrder(order.id)" class="hidden md:inline-flex bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all">Supprimer</button>
                <button @click="viewOrder(order)" class="md:hidden p-2 bg-blue-500 text-white rounded-md" aria-label="voir détails"><Plus class="w-4 h-4"/></button>
                <button @click="deleteOrder(order.id)" class="md:hidden p-2 bg-red-500 text-white rounded-md" aria-label="supprimer"><XCircle class="w-4 h-4"/></button>
              </div>
            </div>

            <!-- Details desktop -->
            <div class="mt-3 hidden md:block">
              <div class="grid grid-cols-1 gap-3">
                <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <div class="flex items-center gap-3 min-w-0">
                        <Image class="w-6 h-6 text-gray-600" />
                    <div class="truncate">
                      <div class="font-medium truncate">{{ item.name }}</div>
                      <div class="text-sm text-gray-600 truncate">Prix: {{ item.price.toLocaleString() }} FCFA</div>
                    </div>
                  </div>
                  <div class="text-right">x{{ item.quantity }}</div>
                </div>
              </div>
            </div>

            <!-- Details mobile (expanded) -->
            <div v-if="isOrderExpanded(order.id)" class="mt-3 md:hidden">
              <div class="space-y-2">
                <div v-for="(item, idx) in order.items" :key="'m-'+idx" class="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div class="flex items-center gap-3 min-w-0">
                      <Image class="w-6 h-6 text-gray-600" />
                    <div class="truncate">
                      <div class="font-medium truncate">{{ item.name }}</div>
                      <div class="text-sm text-gray-600 truncate">Prix: {{ item.price.toLocaleString() }} FCFA</div>
                    </div>
                  </div>
                  <div class="text-right">x{{ item.quantity }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Realisations Tab -->
      <div v-if="activeTab === 'realisations'" class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-blue-600 flex items-center gap-2"><Play class="w-5 h-5"/> Réalisations ({{ realisations.length }})</h2>
          <button
            @click="showAddRealisation = true"
            class="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Plus class="w-4 h-4"/> <span>Ajouter</span>
          </button>
        </div>

        <!-- Add Realisation Form -->
        <form v-if="showAddRealisation" @submit.prevent="addRealisation" class="bg-blue-50 p-6 rounded-xl mb-6">
          <h3 class="font-bold text-lg sm:text-xl mb-4"><Plus class="w-4 h-4 inline-block mr-2"/> Nouvelle Réalisation</h3>
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
            <button type="submit" class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">Ajouter</button>
            <button type="button" @click="showAddRealisation = false" class="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all">Annuler</button>
          </div>
        </form>

        <!-- Realisations List -->
        <div v-if="realisations.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4"><Play class="w-16 h-16 mx-auto text-blue-400"/></div>
          <p class="text-xl text-gray-600">Aucune réalisation enregistrée</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="realisation in realisations" :key="realisation.id" class="bg-white border-2 border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            <div class="h-60 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
              <img
                v-if="realisation.type === 'image'"
                :src="resolveRealisationUrl(realisation.url)"
                :alt="realisation.titre"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <video
                v-else-if="realisation.type === 'video' && isLocalVideo(realisation.url)"
                :src="resolveRealisationUrl(realisation.url)"
                class="w-full h-full object-cover object-center"
                controls
              />
              <iframe
                v-else-if="realisation.type === 'video'"
                :src="realisation.url"
                title="Vidéo Yolaab"
                class="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl">
                🎥
              </div>
            </div>
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
                  <XCircle class="w-5 h-5 inline-block" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Order Details Modal -->
        <div v-if="showOrderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-4 md:p-6 max-h-[90vh] overflow-auto">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-2xl font-bold">Détails de la commande</h3>
        <button @click="closeOrderModal" class="text-gray-600 hover:text-gray-800"><XCircle /></button>
      </div>

      <div v-if="selectedOrder" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold">Client</h4>
            <p class="text-lg">{{ selectedOrder.prenom }} {{ selectedOrder.nom }}</p>
            	    <p class="text-sm text-gray-600">{{ selectedOrder.localisation || '-' }}</p>
            <p class="text-sm"><span class="inline-block mr-2"><Lock class="w-4 h-4 text-gray-500"/></span> {{ selectedOrder.telephone || '-' }}</p>
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
import { Lock, Calendar, ShoppingCart, Plus, XCircle, Image, Play } from 'lucide-vue-next'

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
  id?: string
  nom: string
  prenom: string
  telephone: string
  email?: string
  typeService: string
  duree?: string
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
  { id: 'laveur', label: 'Laveur' },
  { id: 'chauffeur', label: 'Chauffeur' },
  { id: 'manager', label: 'Manager' },
  { id: 'technicien', label: 'Technicien' },
]

const experiences = [
  { id: 'debutant', label: 'Débutant (0-1 an)' },
  { id: 'intermediaire', label: 'Intermédiaire (1-3 ans)' },
  { id: 'confirme', label: 'Confirmé (3-5 ans)' },
  { id: 'expert', label: 'Expert (5+ ans)' },
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
  categorie: 'Nettoyage professionnel',
})

const imageFile = ref<File | null>(null)

const apiUrl = useRuntimeConfig().public.apiUrl || 'http://localhost:3000'

  const productCategories = [
    'Nettoyage professionnel',
    'Placement de personnel qualifié',
    'Laverie & Pressing',
    'Service de déménagement',
    'Plateforme de seconde main',
    'Commerce spécialisé',
    'Autre',
  ];
const reservations = ref<ReservationData[]>([])
const applications = ref<ApplicationData[]>([])
const orders = ref<any[]>([])
const expandedOrders = ref<string[]>([])

const toggleOrderDetails = (id: string) => {
  if (!id) return
  const i = expandedOrders.value.indexOf(id)
  if (i === -1) expandedOrders.value.push(id)
  else expandedOrders.value.splice(i, 1)
}

const isOrderExpanded = (id: string) => {
  if (!id) return false
  return expandedOrders.value.includes(id)
}

const resolveRealisationUrl = (raw: string | undefined | null): string => {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return trimmed
  const path = trimmed.startsWith('/') ? trimmed : `/uploads/${trimmed}`
  const base = apiBaseUrl.value || useRuntimeConfig().public.apiUrl || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}${path}`
}

const isLocalVideo = (url: string | undefined): boolean => {
  if (!url) return false
  const trimmed = url.trim()
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return false
  return true
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
    const resRes = await fetch(`${apiBaseUrl.value}/reservations`)
    if (resRes.ok) reservations.value = await resRes.json()

    const appRes = await fetch(`${apiBaseUrl.value}/applications`)
    if (appRes.ok) applications.value = await appRes.json()

    const workerRes = await fetch(`${apiBaseUrl.value}/workers`)
    if (workerRes.ok) workers.value = await workerRes.json()

    const prodRes = await fetch(`${apiBaseUrl.value}/products`)
    if (prodRes.ok) products.value = await prodRes.json()

    const ordRes = await fetch(`${apiBaseUrl.value}/orders`)
    if (ordRes.ok) orders.value = await ordRes.json()
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
  const worker: Worker = {
    id: Date.now().toString(),
    nom: newWorkerForm.value.nom,
    prenom: newWorkerForm.value.prenom,
    poste: newWorkerForm.value.poste || 'autre',
    telephone: newWorkerForm.value.telephone,
    dateEmbauche: new Date().toISOString().slice(0, 10),
  }

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
      workers.value.push(worker)
    }
  } catch {
    workers.value.push(worker)
  }

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
  if (file) imageFile.value = file
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

    const response = await fetch(`${apiUrl}/products`, { method: 'POST', body: formData })

    if (response.ok) {
      const data = await response.json()
      products.value.push(data)
      newProduct.value = { nom: '', prix: '', quantite: '', categorie: productCategories[0] }
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
  alert('Édition à implémenter')
}

const deleteProduct = async (id: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    try {
      const response = await fetch(`${apiUrl}/products/${id}`, { method: 'DELETE' })
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

// Realisations
const realisations = ref<any[]>([])
const showAddRealisation = ref(false)
const realisationImageFile = ref<File | null>(null)
const realisationVideoFile = ref<File | null>(null)

const newRealisation = ref({
  titre: '',
  description: '',
  type: 'image' as 'image' | 'video',
  url: '',
  videoSource: 'url' as 'url' | 'file',
})

const handleRealisationImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) realisationImageFile.value = input.files[0]
}

const handleRealisationVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) realisationVideoFile.value = input.files[0]
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

    const response = await fetch(`${apiUrl}/realisations`, { method: 'POST', body: formData })
    if (!response.ok) throw new Error('Erreur lors de l\'ajout')

    const newItem = await response.json()
    realisations.value.push(newItem)

    newRealisation.value = { titre: '', description: '', type: 'image', url: '', videoSource: 'url' }
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
      const response = await fetch(`${apiUrl}/realisations/${id}`, { method: 'DELETE' })
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

const deleteReservation = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return
  try {
    const response = await fetch(`${apiUrl}/reservations/${id}`, { method: 'DELETE' })
    if (response.ok) {
      reservations.value = reservations.value.filter(r => r.id !== id)
      alert('✅ Réservation supprimée')
    } else {
      alert('❌ Impossible de supprimer la réservation')
    }
  } catch (err) {
    console.error(err)
    alert('❌ Erreur lors de la suppression')
  }
}

const deleteOrder = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) return
  try {
    const response = await fetch(`${apiUrl}/orders/${id}`, { method: 'DELETE' })
    if (response.ok) {
      orders.value = orders.value.filter(o => o.id !== id)
      alert('✅ Commande supprimée')
    } else {
      alert('❌ Impossible de supprimer la commande')
    }
  } catch (err) {
    console.error(err)
    alert('❌ Erreur lors de la suppression')
  }
}

const loadRealisations = async () => {
  try {
    const response = await fetch(`${apiUrl}/realisations`)
    if (response.ok) realisations.value = await response.json()
  } catch (error) {
    console.error('Erreur lors du chargement des réalisations', error)
  }
}

onMounted(() => {
  loadRealisations()
})
</script>

<style scoped>
/* Login Screen Animations */
.login-card {
  animation: slideInUp 0.8s ease-out;
}

.icon-circle-animate {
  animation: bounce 2s ease-in-out infinite;
}

.input-animate {
  animation: slideInUp 0.6s ease-out 0.1s both;
}

.button-animate {
  animation: slideInUp 0.6s ease-out 0.2s both;
}

/* Admin Dashboard Animations */
.header-animate {
  animation: slideInDown 0.6s ease-out;
}

.tabs-container {
  animation: slideInUp 0.6s ease-out 0.1s both;
}

/* Blob animation for background elements */
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Keyframes */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Hover effects */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Button hover */
button:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

button:active {
  transform: translateY(0);
}

/* Table animations */
table {
  animation: slideInUp 0.8s ease-out;
}

tr:hover {
  background-color: rgba(37, 99, 235, 0.05);
  transition: background-color 0.3s ease;
}
</style>