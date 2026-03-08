<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">
        Réserver Un Service
      </h1>

      <form @submit.prevent="handleSubmit" class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
        <!-- Informations Personnelles -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Vos Informations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nom *
              </label>
              <input
                v-model="formData.nom"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                v-model="formData.prenom"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                v-model="formData.telephone"
                type="tel"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre numéro"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Localisation
              </label>
              <input
                v-model="formData.localisation"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre localisation (ville, adresse)"
              />
            </div>
          </div>
        </div>

        <!-- Service Selection -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Sélectionner Un Service</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              v-for="service in services"
              :key="service.id"
              type="button"
              @click="formData.typeService = service.id"
              :class="[
                'p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2',
                formData.typeService === service.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              ]"
            >
                <component :is="service.icon" :class="formData.typeService === service.id ? 'text-blue-600' : 'text-gray-500'" size="28" />
                <p class="font-semibold text-gray-700">{{ service.label }}</p>
            </button>
          </div>
        </div>

        <!-- Durée de l'intervention -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Durée souhaitée</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              v-for="d in durees"
              :key="d.id"
              type="button"
              @click="formData.duree = d.id"
              :class="[
                'p-4 rounded-2xl border-2 transition-all text-center cursor-pointer',
                formData.duree === d.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              ]"
            >
              <div class="text-lg mb-1">{{ d.label }}</div>
            </button>
          </div>
        </div>

        <!-- Service-specific details -->
        <div v-if="showServiceDetails" class="space-y-4 bg-blue-50 rounded-2xl p-6">
          <h2 class="text-2xl font-bold text-blue-600">Détails du service</h2>

          <!-- Canapes - Nombre de places -->
          <div v-if="formData.typeService === 'canapes'">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de places du canapé *
            </label>
            <input
              v-model.number="formData.serviceDetails.places"
              type="number"
              min="1"
              max="10"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Ex: 3"
            />
            <p class="text-sm text-gray-500 mt-2">Précisez le nombre de places pour un calcul tarifaire exact</p>
          </div>

          <!-- Tapis - Longueur et largeur -->
          <div v-if="formData.typeService === 'tapis'">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Longueur (m) *
                </label>
                <input
                  v-model.number="formData.serviceDetails.longueur"
                  type="number"
                  min="0.5"
                  step="0.5"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Ex: 5"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Largeur (m) *
                </label>
                <input
                  v-model.number="formData.serviceDetails.largeur"
                  type="number"
                  min="0.5"
                  step="0.5"
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Ex: 4"
                />
              </div>
            </div>
            <p class="text-sm text-gray-500">La surface ({{ tapisSurface }}m²) aide à estimer le délai</p>
          </div>

          <!-- Nettoyage automobile - Type de véhicule -->
          <div v-if="formData.typeService === 'nettoyage-automobile'">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Type de véhicule *
            </label>
            <select
              v-model="formData.serviceDetails.typeVehicule"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
            >
              <option value="">Sélectionnez un type</option>
              <option value="citadine">Citadine</option>
              <option value="berline">Berline</option>
              <option value="suv">SUV</option>
              <option value="monospace">Monospace</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <!-- Fin de chantier - Surface -->
          <div v-if="formData.typeService === 'fin-de-chantier'">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Surface à nettoyer (m²) *
            </label>
            <input
              v-model.number="formData.serviceDetails.surface"
              type="number"
              min="10"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Ex: 100"
            />
          </div>

          <!-- Entretien bureaux - Nombre de pièces -->
          <div v-if="formData.typeService === 'entretien-bureaux'">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de pièces/bureaux *
            </label>
            <input
              v-model.number="formData.serviceDetails.nombrePieces"
              type="number"
              min="1"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              placeholder="Ex: 5"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold text-lg disabled:opacity-50"
          >
            <template v-if="isLoading"><Calendar size="18" class="inline-block mr-2"/>En cours...</template>
            <template v-else><Check size="18" class="inline-block mr-2"/>RÉSERVER</template>
          </button>
          <NuxtLink
            to="/home"
            class="px-6 py-4 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold"
          >
            ← RETOUR
          </NuxtLink>
        </div>

        <div v-if="successMessage" class="bg-green-100 border-2 border-green-600 text-green-700 p-4 rounded-xl flex items-start gap-3">
          <Check size="20" class="flex-shrink-0 text-green-700" />
          <div>{{ successMessage }}</div>
        </div>
        <div v-if="errorMessage" class="bg-red-100 border-2 border-red-600 text-red-700 p-4 rounded-xl flex items-start gap-3">
          <XCircle size="20" class="flex-shrink-0 text-red-700" />
          <div>{{ errorMessage }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Car, Layers, Sofa, Building2, Calendar, Check, XCircle } from 'lucide-vue-next'

const formData = ref({
  nom: '',
  prenom: '',
  telephone: '',
  localisation: '',
  typeService: 'nettoyage-automobile',
  duree: '1_semaine',
  serviceDetails: {
    places: 3,
    longueur: 5,
    largeur: 4,
    typeVehicule: '',
    surface: 100,
    nombrePieces: 1,
  },
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const services = [
  { id: 'nettoyage-automobile', label: 'Nettoyage Automobile', icon: Car },
  { id: 'tapis', label: 'Tapis', icon: Layers },
  { id: 'canapes', label: 'Canapés', icon: Sofa },
  { id: 'fin-de-chantier', label: 'Fin de Chantier', icon: Building2 },
  { id: 'entretien-bureaux', label: 'Entretien Bureaux', icon: Building2 },
]

const durees = [
  { id: '2_jours', label: '2 jours' },
  { id: '1_semaine', label: '1 semaine' },
  { id: '2_semaines', label: '2 semaines' },
  { id: '1_mois', label: '1 mois' },
]

// Memoized computed property
const showServiceDetails = computed(() => {
  return ['canapes', 'tapis', 'nettoyage-automobile', 'fin-de-chantier', 'entretien-bureaux'].includes(formData.value.typeService)
})

// Memoized computed property for surface
const tapisSurface = computed(() => {
  const long = formData.value.serviceDetails.longueur || 0
  const larg = formData.value.serviceDetails.largeur || 0
  return (long * larg).toFixed(2)
})

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiUrl || 'http://localhost:3000'

  try {
    const response = await fetch(`${apiBaseUrl}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: formData.value.nom,
        prenom: formData.value.prenom,
        telephone: formData.value.telephone,
        localisation: formData.value.localisation || null,
        typeService: formData.value.typeService,
        duree: formData.value.duree,
        serviceDetails: formData.value.serviceDetails,
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la réservation')
    }

    successMessage.value = 'Réservation confirmée ! Merci de votre confiance.'
    formData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      localisation: '',
      typeService: 'nettoyage-automobile',
      duree: '1_semaine',
      serviceDetails: {
        places: 3,
        longueur: 5,
        largeur: 4,
        typeVehicule: '',
        surface: 100,
        nombrePieces: 1,
      },
    }

    setTimeout(() => {
      navigateTo('/home')
    }, 2000)
  } catch (error) {
    errorMessage.value = 'Erreur lors de la réservation. Veuillez réessayer.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
