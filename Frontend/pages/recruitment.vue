<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">
        Rejoignez Notre Équipe
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
                Email *
              </label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre email"
              />
            </div>
          </div>
        </div>

        <!-- Poste Selection -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Sélectionner Un Poste</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              v-for="poste in postes"
              :key="poste.id"
              type="button"
              @click="formData.poste = poste.id"
              :class="[
                'p-4 rounded-2xl border-2 transition-all text-center cursor-pointer',
                formData.poste === poste.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              ]"
            >
              <div class="text-3xl mb-2">{{ poste.emoji }}</div>
              <p class="font-semibold text-gray-700">{{ poste.label }}</p>
            </button>
          </div>
        </div>

        <!-- Experience Selection -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Votre Expérience</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="exp in experiences"
              :key="exp.id"
              type="button"
              @click="formData.experience = exp.id"
              :class="[
                'p-4 rounded-2xl border-2 transition-all text-center cursor-pointer',
                formData.experience === exp.id
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              ]"
            >
              <div class="text-3xl mb-2">{{ exp.emoji }}</div>
              <p class="font-semibold text-gray-700">{{ exp.label }}</p>
            </button>
          </div>
        </div>

        <!-- Message -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Message</h2>
          <textarea
            v-model="formData.message"
            placeholder="Parlez-nous de vous..."
            rows="6"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold text-lg disabled:opacity-50"
          >
            {{ isLoading ? '⏳ En cours...' : '✅ ENVOYER' }}
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
  poste: '',
  experience: '',
  message: '',
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

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

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await fetch('http://localhost:3000/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: formData.value.nom,
        prenom: formData.value.prenom,
        telephone: formData.value.telephone,
        email: formData.value.email,
        poste: formData.value.poste,
        experience: formData.value.experience,
        message: formData.value.message,
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi de la candidature')
    }

    successMessage.value = '✅ Candidature envoyée ! Nous vous contacterons bientôt.'
    formData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      poste: '',
      experience: '',
      message: '',
    }

    setTimeout(() => {
      navigateTo('/home')
    }, 2000)
  } catch (error) {
    errorMessage.value = '❌ Erreur lors de l\'envoi. Veuillez réessayer.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
