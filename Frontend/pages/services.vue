<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Services Modal Page - Modal opens automatically -->

    <!-- Main Services Modal -->
    <div v-if="showServiceModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-slate-200">
          <div>
            <h2 class="text-3xl font-bold text-slate-900">Choisissez un service</h2>
            <p class="text-slate-600 mt-2">Cliquez sur le service dont vous avez besoin.</p>
          </div>
          <button
            @click="closeServiceModal"
            class="rounded-full border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-100"
          >
            Fermer
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto max-h-[60vh] md:max-h-none">
          <button
            v-for="service in services"
            :key="service.id"
            @click="selectService(service)"
            class="text-left rounded-3xl border border-blue-100 bg-white p-6 transition-all hover:shadow-lg hover:border-blue-300"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-slate-900">{{ service.title }}</h3>
            </div>
            <p class="text-slate-600">{{ service.description }}</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Unavailable Service Modal -->
    <div v-if="selectedService && !selectedService.available" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6">
        <div class="flex justify-between items-start gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Bienvenue sur {{ selectedService.title }}</h2>
            <p class="text-slate-600 mt-2">Le service sera bientôt disponible.</p>
          </div>
          <button @click="selectedService = null" class="text-slate-500 hover:text-slate-900">✕</button>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, ShoppingBag, Users, Truck, RefreshCw, Wrench } from 'lucide-vue-next'
import { useRouter } from '#imports'

const router = useRouter()
const showServiceModal = ref(true)
const selectedService = ref<null | { id: string; title: string; description: string; available: boolean; route?: string; icon: any }>(null)

const whatsappLink = 'https://api.whatsapp.com/send?phone=221767957899&text=Bonjour%20Yolaab%20%2C%20je%20souhaite%20obtenir%20plus%20d%27informations%20sur%20le%20service.'

const services = [
  {
    id: 'nettoyage',
    title: 'Nettoyage Professionnel',
    description: 'Services de nettoyage complets pour votre domicile ou entreprise',
    available: true,
    route: '/reservation',
    icon: Sparkles,
  },
  {
    id: 'pressing',
    title: 'Laverie & Pressing',
    description: 'Service de lavage et repassage professionnel',
    available: false,
    icon: ShoppingBag,
  },
  {
    id: 'personnel',
    title: 'Recherche et Acquisition de Personnel Qualifié',
    description: 'Service de recrutement de personnel qualifié',
    available: false,
    icon: Users,
  },
  {
    id: 'demenagement',
    title: 'Service de Déménagement',
    description: 'Aide professionnelle pour vos déménagements',
    available: false,
    icon: Truck,
  },
  {
    id: 'seconde-main',
    title: 'Service de Seconde Main',
    description: 'Vente et achat d\'articles d\'occasion',
    available: false,
    icon: RefreshCw,
  },
  {
    id: 'depannage',
    title: 'Entretien et Dépannage Spécialisé',
    description: 'Services de réparation et maintenance',
    available: false,
    icon: Wrench,
  },
]

const closeServiceModal = () => {
  router.back()
}

const selectService = (service: typeof services[number]) => {
  if (service.available && service.route) {
    router.push(service.route)
  } else {
    selectedService.value = service
    showServiceModal.value = false
  }
}
</script>

<style scoped>
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}
</style>