<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">
        Demander Un Devis
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

        <!-- Description du Projet (texte) -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Description du Projet</h2>
          <p class="text-sm text-gray-600">Décrivez votre projet en quelques lignes (texte).</p>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Description du projet *</label>
            <textarea v-model="formData.description" required class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" rows="5" placeholder="Décrivez votre projet..."></textarea>
            <p class="text-sm text-gray-500 mt-2">Le contenu sera inclus dans le message WhatsApp.</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex gap-4">
          <button
            type="submit"
            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold text-lg flex items-center justify-center gap-2"
          >
            <span class="text-2xl">💬</span>
            <span>ENVOYER PAR WHATSAPP</span>
          </button>
          <NuxtLink
            to="/home"
            class="px-6 py-4 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold"
          >
            ← RETOUR
          </NuxtLink>
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

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiUrl || 'http://localhost:3000'

const formData = ref({
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  typeService: 'nettoyage-automobile',
  description: '',
})

const errorMessage = ref('')

const services = [
  { id: 'nettoyage-automobile', label: 'Nettoyage Automobile', emoji: '🚗' },
  { id: 'moquettes', label: 'Moquettes', emoji: '📜' },
  { id: 'canapes', label: 'Canapés', emoji: '🛋️' },
  { id: 'fin-de-chantier', label: 'Fin de Chantier', emoji: '🏗️' },
  { id: 'entretien-bureaux', label: 'Entretien Bureaux', emoji: '🏢' },
]

const getServiceLabel = (serviceId: string): string => {
  const service = services.find(s => s.id === serviceId)
  return service ? service.label : serviceId
}



// Nous n'utilisons plus l'upload serveur ici :
// On privilégie le partage local via Web Share API (partage direct du fichier vers WhatsApp sur mobile).
// Si non disponible, on ouvre le lien WhatsApp et invite l'utilisateur à attacher le fichier manuellement.

const handleSubmit = async () => {
  errorMessage.value = ''

  // Validation champs obligatoires
  if (!formData.value.nom || !formData.value.prenom || !formData.value.telephone) {
    errorMessage.value = '❌ Veuillez remplir tous les champs obligatoires'
    return
  }

  // Validation description (texte requis)
  if (!formData.value.description || !formData.value.description.trim()) {
    errorMessage.value = '❌ Veuillez fournir une description du projet'
    return
  }

  // Construire les informations de base du message
  const baseLines: string[] = []
  baseLines.push('*DEMANDE DE DEVIS YOLAAB*')
  baseLines.push('')
  baseLines.push(`Nom: ${formData.value.nom}`)
  baseLines.push(`Prénom: ${formData.value.prenom}`)
  baseLines.push(`Téléphone: ${formData.value.telephone}`)
  baseLines.push(`Email: ${formData.value.email || 'Non fourni'}`)
  baseLines.push(`Service: ${getServiceLabel(formData.value.typeService)}`)
  baseLines.push('')
  baseLines.push('Description:')
  baseLines.push(formData.value.description || '')

  // Construire le message final 
  const message = baseLines.join('\n')
  const encodedMessage = encodeURIComponent(message)
  const whatsappNumber = '221767957899'
  const apiLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
  const appLink = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`

  // Détecter mobile/tablette via userAgent simple
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : ''
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

  if (isMobile) {
    // ouvrir l'app WhatsApp si possible
    try {
      window.location.href = appLink
      setTimeout(() => { window.open(apiLink, '_blank') }, 1200)
      return
    } catch (err) {
      console.warn('whatsapp:// failed, fallback to api link', err)
    }
  }

  // Desktop/tablette : ouvrir WhatsApp Web avec le message prérempli
  window.open(apiLink, '_blank')
}
</script>
