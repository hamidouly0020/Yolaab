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
                @blur="validateField('nom', formData.nom)"
                class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                :class="errors.nom ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                placeholder="Votre nom"
              />
              <p v-if="errors.nom" class="text-red-500 text-sm mt-1">{{ errors.nom }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                v-model="formData.prenom"
                type="text"
                required
                @blur="validateField('prenom', formData.prenom)"
                class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                :class="errors.prenom ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                placeholder="Votre prénom"
              />
              <p v-if="errors.prenom" class="text-red-500 text-sm mt-1">{{ errors.prenom }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <h6>Téléphone *</h6>
                <p class="text-xs text-gray-500">Format sénégalais (ex: 77 123 45 67)</p>
              </label>
              <input
                v-model="formData.telephone"
                type="tel"
                required
                @blur="validateField('telephone', formData.telephone)"
                class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                :class="errors.telephone ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                placeholder="77 123 45 67"
              />
              <p v-if="errors.telephone" class="text-red-500 text-sm mt-1">{{ errors.telephone }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <h6>Localisation *</h6>
                <p class="text-xs text-gray-500">Soyez le plus detaillé possible sur votre localisation</p>
              </label>
              <input
                v-model="formData.localisation"
                type="text"
                @blur="validateField('localisation', formData.localisation)"
                class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                :class="errors.localisation ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                placeholder="Senegal/Dakar/Keur Massar..."
              />
              <p v-if="errors.localisation" class="text-red-500 text-sm mt-1">{{ errors.localisation }}</p>
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
              @blur="validateField('places', formData.serviceDetails.places)"
              class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
              :class="errors.serviceDetails.places ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
              placeholder="Ex: 3"
            />
            <p v-if="errors.serviceDetails.places" class="text-red-500 text-sm mt-1">{{ errors.serviceDetails.places }}</p>
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
                  @blur="validateField('longueur', formData.serviceDetails.longueur)"
                  class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  :class="errors.serviceDetails.longueur ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                  placeholder="Ex: 5"
                />
                <p v-if="errors.serviceDetails.longueur" class="text-red-500 text-sm mt-1">{{ errors.serviceDetails.longueur }}</p>
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
                  @blur="validateField('largeur', formData.serviceDetails.largeur)"
                  class="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  :class="errors.serviceDetails.largeur ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'"
                  placeholder="Ex: 4"
                />
                <p v-if="errors.serviceDetails.largeur" class="text-red-500 text-sm mt-1">{{ errors.serviceDetails.largeur }}</p>
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
const { apiUrl } = useApi()

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

const errors = ref({
  nom: '',
  prenom: '',
  telephone: '',
  localisation: '',
  typeService: '',
  serviceDetails: {
    places: '',
    longueur: '',
    largeur: '',
    typeVehicule: '',
    surface: '',
    nombrePieces: '',
  },
})

const errorMessage = ref('')

// Validation functions
const validateField = (field: string, value: any) => {
  switch (field) {
    case 'nom':
      if (!value.trim()) {
        errors.value.nom = 'Le nom est requis'
        return false
      }
      if (value.length < 2) {
        errors.value.nom = 'Le nom doit contenir au moins 2 caractères'
        return false
      }
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
        errors.value.nom = 'Le nom ne peut contenir que des lettres'
        return false
      }
      errors.value.nom = ''
      return true

    case 'prenom':
      if (!value.trim()) {
        errors.value.prenom = 'Le prénom est requis'
        return false
      }
      if (value.length < 2) {
        errors.value.prenom = 'Le prénom doit contenir au moins 2 caractères'
        return false
      }
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
        errors.value.prenom = 'Le prénom ne peut contenir que des lettres'
        return false
      }
      errors.value.prenom = ''
      return true

    case 'telephone':
      if (!value.trim()) {
        errors.value.telephone = 'Le numéro de téléphone est requis'
        return false
      }
      // Format sénégalais: 77/78/76/70 + 7 chiffres
      if (!/^7[0678]\d{7}$/.test(value.replace(/\s+/g, ''))) {
        errors.value.telephone = 'Format invalide (ex: 77 123 45 67)'
        return false
      }
      errors.value.telephone = ''
      return true

    case 'localisation':
      if (!value.trim()) {
        errors.value.localisation = 'La localisation est requise'
        return false
      }
      if (value.length < 3) {
        errors.value.localisation = 'La localisation doit contenir au moins 3 caractères'
        return false
      }
      errors.value.localisation = ''
      return true

    case 'places':
      if (!value || value < 1 || value > 10) {
        errors.value.serviceDetails.places = 'Nombre de places entre 1 et 10'
        return false
      }
      errors.value.serviceDetails.places = ''
      return true

    case 'longueur':
      if (!value || value < 1 || value > 50) {
        errors.value.serviceDetails.longueur = 'Longueur entre 1 et 50 mètres'
        return false
      }
      errors.value.serviceDetails.longueur = ''
      return true

    case 'largeur':
      if (!value || value < 1 || value > 50) {
        errors.value.serviceDetails.largeur = 'Largeur entre 1 et 50 mètres'
        return false
      }
      errors.value.serviceDetails.largeur = ''
      return true

    case 'surface':
      if (!value || value < 10 || value > 1000) {
        errors.value.serviceDetails.surface = 'Surface entre 10 et 1000 m²'
        return false
      }
      errors.value.serviceDetails.surface = ''
      return true

    case 'nombrePieces':
      if (!value || value < 1 || value > 20) {
        errors.value.serviceDetails.nombrePieces = 'Nombre de pièces entre 1 et 20'
        return false
      }
      errors.value.serviceDetails.nombrePieces = ''
      return true

    default:
      return true
  }
}

const validateForm = () => {
  let isValid = true

  // Validate basic fields
  isValid &= validateField('nom', formData.value.nom)
  isValid &= validateField('prenom', formData.value.prenom)
  isValid &= validateField('telephone', formData.value.telephone)
  isValid &= validateField('localisation', formData.value.localisation)

  // Validate service-specific fields
  if (formData.value.typeService === 'canapes') {
    isValid &= validateField('places', formData.value.serviceDetails.places)
  } else if (formData.value.typeService === 'tapis') {
    isValid &= validateField('longueur', formData.value.serviceDetails.longueur)
    isValid &= validateField('largeur', formData.value.serviceDetails.largeur)
  } else if (formData.value.typeService === 'nettoyage-automobile') {
    // Add validation for vehicle type if needed
  } else if (formData.value.typeService === 'fin-de-chantier') {
    isValid &= validateField('surface', formData.value.serviceDetails.surface)
    isValid &= validateField('nombrePieces', formData.value.serviceDetails.nombrePieces)
  }

  return isValid
}

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

  // Validation complète du formulaire
  if (!validateForm()) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire'
    return
  }

  // Protection XSS basique - échapper les caractères spéciaux
  const sanitizedData = {
    ...formData.value,
    nom: formData.value.nom.replace(/[<>]/g, ''),
    prenom: formData.value.prenom.replace(/[<>]/g, ''),
    localisation: formData.value.localisation.replace(/[<>]/g, ''),
  }

  // Rate limiting basique (éviter spam)
  const lastSubmit = localStorage.getItem('lastReservationSubmit')
  if (lastSubmit && Date.now() - parseInt(lastSubmit) < 30000) { // 30 secondes
    errorMessage.value = 'Veuillez attendre 30 secondes avant de soumettre une nouvelle demande'
    return
  }

  // Envoyer au backend pour persistance + notification email
  try {
    const payload = {
      nom: sanitizedData.nom,
      prenom: sanitizedData.prenom,
      telephone: sanitizedData.telephone,
      localisation: sanitizedData.localisation,
      typeService: sanitizedData.typeService,
      // description: sanitizedData.description,
      serviceDetails: sanitizedData.serviceDetails,
    }

    const res = await fetch(`${apiUrl}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()
    if (!res.ok || json.ok === false) {
      errorMessage.value = json.error || 'Erreur lors de l\'envoi de la demande'
      return
    }

    // succès: enregistrer le timestamp et reset form
    localStorage.setItem('lastReservationSubmit', Date.now().toString())
    
    formData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      localisation: '',
      typeService: 'nettoyage-automobile',
      description: '',
      serviceDetails: { places: 3, longueur: 5, largeur: 4, typeVehicule: '', surface: 100, nombrePieces: 1 },
    }

    alert('Réservation envoyée — nous vous contacterons bientôt.')
    navigateTo('/home')
    try {
      const messageLines: string[] = []
      messageLines.push('DEMANDE DE RÉSERVATION YOLAAB')
      messageLines.push(`Nom: ${payload.nom}`)
      messageLines.push(`Prénom: ${payload.prenom}`)
      messageLines.push(`Téléphone: ${payload.telephone}`)
      messageLines.push(`Localisation: ${payload.localisation || 'Non fournie'}`)
      messageLines.push(`Service: ${getServiceLabel(payload.typeService)}`)
      
      // Ajouter les détails du service selon le type
      if (payload.serviceDetails) {
        switch (payload.typeService) {
          case 'canapes':
            if (payload.serviceDetails.places) {
              messageLines.push(`Nombre de places: ${payload.serviceDetails.places}`)
            }
            break
          case 'tapis':
            if (payload.serviceDetails.longueur && payload.serviceDetails.largeur) {
              const surface = payload.serviceDetails.longueur * payload.serviceDetails.largeur
              messageLines.push(`Dimensions: ${payload.serviceDetails.longueur}m x ${payload.serviceDetails.largeur}m`)
              messageLines.push(`Surface: ${surface}m²`)
            }
            break
          case 'nettoyage-automobile':
            if (payload.serviceDetails.typeVehicule) {
              messageLines.push(`Type de véhicule: ${payload.serviceDetails.typeVehicule}`)
            }
            break
          case 'fin-de-chantier':
            if (payload.serviceDetails.surface) {
              messageLines.push(`Surface à nettoyer: ${payload.serviceDetails.surface}m²`)
            }
            break
          case 'entretien-bureaux':
            if (payload.serviceDetails.nombrePieces) {
              messageLines.push(`Nombre de pièces/bureaux: ${payload.serviceDetails.nombrePieces}`)
            }
            break
        }
      }
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
