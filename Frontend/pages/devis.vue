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

        <!-- Service-specific details -->
        <div v-if="getServiceDetails()" class="space-y-4 bg-blue-50 rounded-2xl p-6">
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
            <p class="text-sm text-gray-500">La surface ({{ formData.serviceDetails.longueur * formData.serviceDetails.largeur }}m²) aide à estimer le délai</p>
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
            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold text-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size="18" class="inline-block mr-2" />
            <span>ENVOYER PAR WHATSAPP</span>
          </button>
          <NuxtLink
            to="/home"
            class="px-6 py-4 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold"
          >
            ← RETOUR
          </NuxtLink>
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
import { ref } from 'vue'
import { Car, Layers, Sofa, Building2, MessageCircle, XCircle } from 'lucide-vue-next'

const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiUrl || 'http://localhost:3002'

const formData = ref({
  nom: '',
  prenom: '',
  telephone: '',
  localisation: '',
  typeService: 'nettoyage-automobile',
  description: '',
  serviceDetails: {
    places: 3,
    longueur: 5,
    largeur: 4,
    typeVehicule: '',
    surface: 100,
    nombrePieces: 1,
  },
})

const errorMessage = ref('')

const services = [
  { id: 'nettoyage-automobile', label: 'Nettoyage Automobile', icon: Car },
  { id: 'tapis', label: 'Tapis', icon: Layers },
  { id: 'canapes', label: 'Canapés', icon: Sofa },
  { id: 'fin-de-chantier', label: 'Fin de Chantier', icon: Building2 },
  { id: 'entretien-bureaux', label: 'Entretien Bureaux', icon: Building2 },
]

const getServiceLabel = (serviceId: string): string => {
  const service = services.find(s => s.id === serviceId)
  return service ? service.label : serviceId
}

const getServiceDetails = () => {
  return ['canapes', 'tapis', 'nettoyage-automobile', 'fin-de-chantier', 'entretien-bureaux'].includes(formData.value.typeService)
}



// Nous n'utilisons plus l'upload serveur ici :
// On privilégie le partage local via Web Share API (partage direct du fichier vers WhatsApp sur mobile).
// Si non disponible, on ouvre le lien WhatsApp et invite l'utilisateur à attacher le fichier manuellement.

  const handleSubmit = async () => {
  errorMessage.value = ''

  // Validation champs obligatoires (front)
  if (!formData.value.nom || !formData.value.prenom || !formData.value.telephone) {
    errorMessage.value = 'Veuillez remplir tous les champs obligatoires'
    return
  }

  if (!formData.value.description || !formData.value.description.trim()) {
    errorMessage.value = 'Veuillez fournir une description du projet'
    return
  }

  // Envoyer au backend pour persistance + notification email
  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiUrl || 'http://localhost:3002'

    const payload = {
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      telephone: formData.value.telephone,
      localisation: formData.value.localisation,
      typeService: formData.value.typeService,
      description: formData.value.description,
      serviceDetails: formData.value.serviceDetails,
    }

    const res = await fetch(`${apiBaseUrl}/devis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    if (!res.ok || json.ok === false) {
      errorMessage.value = json.error || 'Erreur lors de l\'envoi de la demande'
      return
    }

    // succès: reset form and notify user
    formData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      localisation: '',
      typeService: 'nettoyage-automobile',
      description: '',
      serviceDetails: { places: 3, longueur: 5, largeur: 4, typeVehicule: '', surface: 100, nombrePieces: 1 },
    }

    // Open WhatsApp for client to send the same message to admin
    try {
      const messageLines: string[] = []
      messageLines.push('DEMANDE DE DEVIS YOLAAB')
      messageLines.push(`Nom: ${payload.nom}`)
      messageLines.push(`Prénom: ${payload.prenom}`)
      messageLines.push(`Téléphone: ${payload.telephone}`)
      messageLines.push(`Localisation: ${payload.localisation || 'Non fournie'}`)
      messageLines.push(`Service: ${payload.typeService}`)
      messageLines.push('')
      messageLines.push('Description:')
      messageLines.push(payload.description || '')

      const encodedMessage = encodeURIComponent(messageLines.join('\n'))
      const whatsappNumber = '221767957899'
      const apiLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
      const appLink = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`

      const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : ''
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

      if (isMobile) {
        // try native app first
        try {
          window.location.href = appLink
          setTimeout(() => { window.open(apiLink, '_blank') }, 1200)
        } catch (err) {
          window.open(apiLink, '_blank')
        }
      } else {
        // desktop: open WhatsApp Web
        window.open(apiLink, '_blank')
      }
    } catch (err) {
      console.warn('Unable to open WhatsApp link', err)
    }

    alert('Demande de devis envoyée — nous vous contacterons bientôt.')
    navigateTo('/home')
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.'
  }
}
</script>
