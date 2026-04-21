<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8 relative overflow-hidden">
    <!-- Service Availability Check -->
    <div v-if="!isServiceAvailable" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6">
        <div class="flex justify-between items-start gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Bienvenue sur Nettoyage Professionnel</h2>
            <p class="text-slate-600 mt-2">Le service sera bientôt disponible.</p>
          </div>
          <button @click="goBack" class="text-slate-500 hover:text-slate-900">✕</button>
        </div>

        <p class="text-slate-700 mb-6">Pour contacter le service client Yolaab, appuyez sur le bouton WhatsApp.</p>
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <a
            :href="whatsappLink"
            target="_blank"
            rel="noreferrer"
            class="inline-flex items-center justify-center rounded-full bg-green-500 px-5 py-3 text-white font-bold hover:bg-green-600"
          >
            WhatsApp
          </a>
          <NuxtLink
            to="/home"
            class="inline-flex items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-slate-900 font-bold hover:bg-slate-200"
          >
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content - Only show if service is available -->
    <div v-else>
    <!-- Animated background blobs -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -right-40 -top-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div class="absolute -left-40 top-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>
    <div class="max-w-4xl mx-auto px-4 py-12 relative z-10">
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-3 page-title">
          Réserver Un Service
        </h1>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      <form @submit.prevent="handleSubmit" class="bg-gradient-to-br from-white via-blue-50/50 to-white rounded-3xl shadow-xl hover:shadow-2xl p-6 md:p-8 space-y-6 form-container border border-blue-200/30 transition-all duration-500">
        <!-- Informations Personnelles -->
        <div class="space-y-3">
          <h2 class="text-xl font-bold text-blue-600">Vos Informations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div class="space-y-3">
          <h2 class="text-xl font-bold text-blue-600">Sélectionner Un Service</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <component :is="service.icon" :class="formData.typeService === service.id ? 'text-blue-600' : 'text-gray-500'" size="24" />
              <p class="font-semibold text-gray-700 text-sm">{{ service.label }}</p>
            </button>
          </div>
        </div>



        <!-- Service-specific details -->
        <div v-if="getServiceDetails()" class="space-y-3 bg-blue-50 rounded-2xl p-5">
          <h2 class="text-xl font-bold text-blue-600">Détails du service</h2>
          
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
        <div class="flex gap-3">
          <button
            type="submit"
            class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold text-base flex items-center justify-center gap-2"
          >
            <MessageCircle size="18" class="inline-block mr-2" />
            <span>ENVOYER PAR WHATSAPP</span>
          </button>
          <NuxtLink
            to="/home"
            class="px-5 py-3 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition-all font-bold text-sm"
          >
            ← RETOUR
          </NuxtLink>
        </div>

        <div v-if="errorMessage" class="bg-red-100 border-2 border-red-600 text-red-700 p-3 rounded-xl flex items-start gap-2">
          <XCircle size="18" class="flex-shrink-0 text-red-700" />
          <div>{{ errorMessage }}</div>
        </div>
      </form>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Car, Layers, Sofa, Building2, MessageCircle, XCircle } from 'lucide-vue-next'
import { useRouter } from '#imports'

const router = useRouter()
const config = useRuntimeConfig()
const apiBaseUrl = config.public.apiUrl || 'http://localhost:3000'

// Service availability check
const isServiceAvailable = ref(true) // Set to true since nettoyage is available

const whatsappLink = 'https://api.whatsapp.com/send?phone=221767957899&text=Bonjour%20Yolaab%20%2C%20je%20souhaite%20obtenir%20plus%20d%27informations%20sur%20le%20service%20Nettoyage%20Professionnel.'

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/home')
  }
}

const formData = ref({
  nom: '',
  prenom: '',
  telephone: '',
  localisation: '',
  typeService: 'nettoyage-automobile',
  // description: '',
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



  // Envoyer au backend pour persistance + notification email
  try {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiUrl || 'http://localhost:3000'

    const payload = {
      nom: formData.value.nom,
      prenom: formData.value.prenom,
      telephone: formData.value.telephone,
      localisation: formData.value.localisation,
      typeService: formData.value.typeService,
      // description: formData.value.description,
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
      messageLines.push('DEMANDE DE RÉSERVATION YOLAAB')
      messageLines.push(`Nom: ${payload.nom}`)
      messageLines.push(`Prénom: ${payload.prenom}`)
      messageLines.push(`Téléphone: ${payload.telephone}`)
      messageLines.push(`Localisation: ${payload.localisation || 'Non fournie'}`)
      messageLines.push(`Service: ${payload.typeService}`)
      messageLines.push('')


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

    alert('Réservation envoyée — nous vous contacterons bientôt.')
    navigateTo('/home')
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur lors de l\'envoi. Veuillez réessayer plus tard.'
  }
}
</script>

<style scoped>
/* Page animations */
.page-title {
  animation: slideInDown 0.8s ease-out;
}

.form-container {
  animation: slideInUp 0.8s ease-out 0.2s both;
}

/* Blob animation for background elements */
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Input and select styling with animation */
input,
textarea,
select {
  animation: slideInUp 0.6s ease-out;
  transition: all 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

/* Button animations */
.bg-blue-600,
button[type="submit"],
button[type="button"] {
  transition: all 0.3s ease;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
}

button[type="submit"]:active {
  transform: translateY(0);
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

/* Section headers */
h2 {
  animation: slideInUp 0.6s ease-out;
  color: linear-gradient(135deg, #2563eb, #1e40af);
}

/* Error message animation */
.error-message {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
</style>
