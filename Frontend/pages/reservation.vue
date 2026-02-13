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
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre email"
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
                'p-4 rounded-2xl border-2 transition-all text-center cursor-pointer',
                formData.typeService === service.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              ]"
            >
              <div class="text-3xl mb-2">{{ service.emoji }}</div>
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

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold text-lg disabled:opacity-50"
          >
            {{ isLoading ? '⏳ En cours...' : '✅ RÉSERVER' }}
          </button>
          <NuxtLink
            to="/home"
            class="px-6 py-4 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold"
          >
            ← RETOUR
          </NuxtLink>
        </div>

        <div v-if="successMessage" class="bg-green-100 border-2 border-green-600 text-green-700 p-4 rounded-xl">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="bg-red-100 border-2 border-red-600 text-red-700 p-4 rounded-xl">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  typeService: 'nettoyage-automobile',
  duree: '1 semaine',
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const services = [
  { id: 'nettoyage-automobile', label: 'Nettoyage Automobile', emoji: '🚗' },
  { id: 'moquettes', label: 'Moquettes', emoji: '📜' },
  { id: 'canapes', label: 'Canapés', emoji: '🛋️' },
  { id: 'fin-de-chantier', label: 'Fin de Chantier', emoji: '🏗️' },
  { id: 'entretien-bureaux', label: 'Entretien Bureaux', emoji: '🏢' },
]

const durees = [
  { id: '2_jours', label: '2 jours' },
  { id: '1_semaine', label: '1 semaine' },
  { id: '2_semaines', label: '2 semaines' },
  { id: '1_mois', label: '1 mois' },
]

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
        email: formData.value.email || null,
        typeService: formData.value.typeService,
        duree: formData.value.duree,
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la réservation')
    }

    successMessage.value = '✅ Réservation confirmée ! Merci de votre confiance.'
    formData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      typeService: 'nettoyage-automobile',
      duree: '1_semaine',
    }

    setTimeout(() => {
      navigateTo('/home')
    }, 2000)
  } catch (error) {
    errorMessage.value = '❌ Erreur lors de la réservation. Veuillez réessayer.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
