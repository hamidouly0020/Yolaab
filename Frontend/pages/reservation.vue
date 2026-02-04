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

        <!-- Date & Time -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Quand ?</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                v-model="formData.date"
                type="date"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Heure *
              </label>
              <input
                v-model="formData.heure"
                type="time"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
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
  typeService: 'nettoyage',
  date: '',
  heure: '',
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const services = [
  { id: 'nettoyage', label: 'Nettoyage', emoji: '🧹' },
  { id: 'jardinage', label: 'Jardinage', emoji: '🌿' },
  { id: 'plomberie', label: 'Plomberie', emoji: '🔧' },
  { id: 'electricite', label: 'Électricité', emoji: '⚡' },
]

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: formData.value.nom,
        prenom: formData.value.prenom,
        telephone: formData.value.telephone,
        email: formData.value.email,
        typeService: formData.value.typeService,
        date: formData.value.date,
        heure: formData.value.heure,
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
      typeService: 'nettoyage',
      date: '',
      heure: '',
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
