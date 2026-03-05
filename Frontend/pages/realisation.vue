<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4 flex items-center justify-center">
          <Video class="w-10 h-10 mr-3 text-blue-600" />
          Nos Réalisations
        </h1>
        <p class="text-xl text-gray-600">
          Décourez les projets de nettoyage et les interventions réussies de Yolaab
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          @click="filterType = 'all'"
          :class="[
            'px-6 py-3 rounded-full font-bold transition-all',
            filterType === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          ]"
        >
          Tous
        </button>
        <button
          @click="filterType = 'image'"
          :class="[
            'px-6 py-3 rounded-full font-bold transition-all',
            filterType === 'image'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          ]"
        >
          <Image class="inline-block w-5 h-5 mr-2" /> Images
        </button>
        <button
          @click="filterType = 'video'"
          :class="[
            'px-6 py-3 rounded-full font-bold transition-all',
            filterType === 'video'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          ]"
        >
          <Video class="inline-block w-5 h-5 mr-2" /> Vidéos
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-lg text-gray-600"><span class="inline-block w-5 h-5 mr-2 animate-spin border-2 border-blue-300 rounded-full border-t-transparent align-middle"></span> Chargement des réalisations...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center py-12">
        <p class="text-lg text-red-600">❌ {{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredRealisations.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4"><Image class="w-16 h-16 mx-auto text-blue-400" /></div>
        <p class="text-xl text-gray-600">Aucune réalisation pour le moment</p>
      </div>

      <!-- Gallery Grid -->
      <div v-if="!loading && filteredRealisations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <!-- Image Cards -->
        <div
          v-for="item in filteredRealisations.filter(r => r.type === 'image')"
          :key="item.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          @click="openLightbox(item)"
        >
          <div class="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden flex items-center justify-center">
            <img
              :src="resolveUrl(item.url)"
              :alt="item.titre"
              loading="lazy"
              class="w-full h-full object-cover transition-opacity duration-300"
              @load="$event.target.style.opacity = '1'"
              style="opacity: 0.7"
            />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.titre }}</h3>
            <p v-if="item.description" class="text-gray-600 text-sm line-clamp-2">
              {{ item.description }}
            </p>
            <div class="mt-4 text-sm text-gray-500">
              <Calendar class="inline-block w-4 h-4 mr-1 text-gray-500" /> {{ new Date(item.createdAt).toLocaleDateString('fr-FR') }}
            </div>
          </div>
        </div>

        <!-- Video Cards -->
        <div
          v-for="item in filteredRealisations.filter(r => r.type === 'video')"
          :key="item.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div class="relative h-64 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              <Play class="text-5xl animate-pulse text-white" />
            </div>
            <iframe
              :src="resolveUrl(item.url)"
              title="Vidéo Yolaab"
              loading="lazy"
              class="w-full h-full relative z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ item.titre }}</h3>
            <p v-if="item.description" class="text-gray-600 text-sm line-clamp-2">
              {{ item.description }}
            </p>
            <div class="mt-4 text-sm text-gray-500">
              📅 {{ new Date(item.createdAt).toLocaleDateString('fr-FR') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox for Images -->
      <div
        v-if="selectedItem"
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn"
        @click="closeLightbox"
      >
        <div class="relative max-w-4xl w-full" @click.stop>
          <button
            @click="closeLightbox"
            class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 transition z-20"
          >
            <XCircle />
          </button>
          <img
            :src="resolveUrl(selectedItem.url)"
            :alt="selectedItem.titre"
            loading="eager"
            class="w-full h-auto rounded-2xl shadow-2xl transition-opacity duration-300"
            @load="$event.target.style.opacity = '1'"
            style="opacity: 0.8"
          />
          <div class="text-white mt-4 text-center">
            <h3 class="text-2xl font-bold mb-2">{{ selectedItem.titre }}</h3>
            <p v-if="selectedItem.description" class="text-gray-300">
              {{ selectedItem.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Charger Plus Button -->
      <div v-if="hasMore && !loading" class="flex justify-center mt-12 mb-8">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {{ loadingMore ? 'Chargement...' : 'Charger Plus' }}
        </button>
      </div>

      <!-- Back Button -->
      <div class="text-center">
        <NuxtLink
          to="/home"
          class="inline-block bg-gray-300 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-400 transition-all"
        >
          ← RETOUR À L'ACCUEIL
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Image, Video, Play, Calendar, XCircle } from 'lucide-vue-next'

interface Realisation {
  id: string
  type: 'image' | 'video'
  titre: string
  description?: string
  url: string
  createdAt: string
}

const realisations = ref<Realisation[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref('')
const filterType = ref<'all' | 'image' | 'video'>('all')
const selectedItem = ref<Realisation | null>(null)
const apiBaseUrl = ref('')
const currentPage = ref(1)
const hasMore = ref(true)
const itemsPerPage = 12

const filteredRealisations = computed(() => {
  if (filterType.value === 'all') {
    return realisations.value
  }
  return realisations.value.filter(r => r.type === filterType.value)
})

const resolveUrl = (raw: string | undefined | null) => {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return trimmed
  // if the backend stored a full uploads path or just a filename, handle both
  const path = trimmed.startsWith('/') ? trimmed : `/uploads/${trimmed}`
  return `${apiBaseUrl.value.replace(/\/$/, '')}${path}`
}

const loadRealisations = async (page: number = 1) => {
  try {
    const isFirstPage = page === 1
    if (isFirstPage) loading.value = true
    else loadingMore.value = true

    const response = await fetch(
      `${apiBaseUrl.value}/realisations?page=${page}&limit=${itemsPerPage}`
    )
    if (!response.ok) throw new Error('Erreur de chargement')

    const data = await response.json()

    if (isFirstPage) {
      realisations.value = data
    } else {
      realisations.value.push(...data)
    }

    hasMore.value = data.length === itemsPerPage
    currentPage.value = page
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    if (page === 1) loading.value = false
    else loadingMore.value = false
  }
}

const loadMore = () => {
  if (!loadingMore.value && hasMore.value) {
    loadRealisations(currentPage.value + 1)
  }
}

onMounted(async () => {
  const config = useRuntimeConfig()
  apiBaseUrl.value = config.public.apiUrl || 'http://localhost:3000'
  
  await loadRealisations(1)
})

const openLightbox = (item: Realisation) => {
  if (item.type === 'image') {
    selectedItem.value = item
  }
}

const closeLightbox = () => {
  selectedItem.value = null
}
</script>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

img {
  animation: fadeIn 0.6s ease-in-out forwards;
}

iframe {
  transition: opacity 0.4s ease-in-out;
}
</style>