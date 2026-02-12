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

        <!-- Description du Projet -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-blue-600">Description du Projet</h2>
          <textarea
            v-model="formData.description"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none h-32 resize-none"
            placeholder="Décrivez votre projet, surface, détails importants, etc."
          ></textarea>
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

const handleSubmit = () => {
  errorMessage.value = ''

  // Validation
  if (!formData.value.nom || !formData.value.prenom || !formData.value.telephone) {
    errorMessage.value = '❌ Veuillez remplir tous les champs obligatoires'
    return
  }

  // Construire le message WhatsApp
  const message = `
*DEMANDE DE DEVIS*

👤 *Client:* ${formData.value.prenom} ${formData.value.nom}
📞 *Téléphone:* ${formData.value.telephone}
📧 *Email:* ${formData.value.email || 'Non fourni'}
🔧 *Service:* ${getServiceLabel(formData.value.typeService)}
📝 *Détails:* ${formData.value.description || 'Aucun détail fourni'}
  `.trim()

  // Encoder le message pour l'URL
  const encodedMessage = encodeURIComponent(message)
  
  // Numéro WhatsApp de Yolaab (sans les + pour le lien)
  const whatsappNumber = '221767957899'
  
  // Générer le lien WhatsApp
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
  
  // Rediriger vers WhatsApp
  window.open(whatsappLink, '_blank')
}
</script>
