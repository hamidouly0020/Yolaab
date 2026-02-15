<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          🎬 Nos Réalisations
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
          📷 Images
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
          🎥 Vidéos
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-lg text-gray-600">⏳ Chargement des réalisations...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center py-12">
        <p class="text-lg text-red-600">❌ {{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && filteredRealisations.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🎨</div>
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
          <div class="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
            <img
              :src="resolveUrl(item.url)"
              :alt="item.titre"
              class="w-full h-full object-cover"
            />
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

        <!-- Video Cards -->
        <div
          v-for="item in filteredRealisations.filter(r => r.type === 'video')"
          :key="item.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
        >
          <div class="relative h-64 bg-black flex items-center justify-center overflow-hidden">
            <iframe
              :src="resolveUrl(item.url)"
              title="Vidéo Yolaab"
              class="w-full h-full"
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
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
        @click="closeLightbox"
      >
        <div class="relative max-w-4xl w-full" @click.stop>
          <button
            @click="closeLightbox"
            class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 transition"
          >
            ✕
          </button>
          <img
            :src="resolveUrl(selectedItem.url)"
            :alt="selectedItem.titre"
            class="w-full h-auto rounded-2xl"
          />
          <div class="text-white mt-4 text-center">
            <h3 class="text-2xl font-bold mb-2">{{ selectedItem.titre }}</h3>
            <p v-if="selectedItem.description" class="text-gray-300">
              {{ selectedItem.description }}
            </p>
          </div>
        </div>
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
const error = ref('')
const filterType = ref<'all' | 'image' | 'video'>('all')
const selectedItem = ref<Realisation | null>(null)
const apiBaseUrl = ref('')

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

onMounted(async () => {
  const config = useRuntimeConfig()
  apiBaseUrl.value = config.public.apiUrl || 'http://localhost:3000'
  
  try {
    const response = await fetch(`${apiBaseUrl.value}/realisations`)
    if (!response.ok) throw new Error('Erreur de chargement')

    const data = await response.json()
    realisations.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
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
