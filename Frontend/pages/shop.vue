<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-blue-600">
          🛒 Notre Boutique
        </h1>
        <NuxtLink
          to="/checkout"
          class="relative bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center gap-2"
        >
          Mon Panier
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center py-12">
        <p class="text-lg text-gray-600">⏳ Chargement des produits...</p>
      </div>

      <div v-if="error" class="text-center py-12">
        <p class="text-lg text-red-600">❌ Erreur: {{ error }}</p>
      </div>

      <div v-if="!loading && products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
        >
          <div class="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
            <template v-if="product.image">
              <img
                :src="resolveProductImageUrl(product.image, apiBaseUrl)"
                :alt="product.nom"
                class="w-full h-full object-cover object-center"
                loading="lazy"
                @error="handleImageError"
              />
            </template>
            <span v-else class="text-6xl">{{ getEmoji(product.categorie) }}</span>
            <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {{ product.prix.toLocaleString() }} FCFA
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-bold text-lg text-gray-800 mb-2">{{ product.nom }}</h3>
            <p class="text-gray-600 text-sm mb-4">Stock: {{ product.quantite }}</p>
            <button
              @click="addToCart(product)"
              :disabled="product.quantite === 0"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold disabled:opacity-50"
            >
              ➕ Ajouter au Panier
            </button>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center mt-8">
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

interface Product {
  id: string
  nom: string
  prix: number
  quantite: number
  categorie: string
  image?: string
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  emoji: string
}

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')
const apiBaseUrl = ref('')

const cartCount = computed(() => {
  if (typeof window === 'undefined' || !window.localStorage) return 0
  try {
    const cart = window.localStorage.getItem('cart')
    if (!cart) return 0
    return JSON.parse(cart).reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
  } catch (e) {
    return 0
  }
})

onMounted(async () => {
  const config = useRuntimeConfig()
  apiBaseUrl.value = config.public.apiUrl || 'http://localhost:3000'
  
  try {
    const response = await fetch(`${apiBaseUrl.value}/products`)
    if (!response.ok) throw new Error('Erreur de chargement')
    
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
})

const getEmoji = (categorie: string): string => {
  const emojis: Record<string, string> = {
    nettoyage: '🧹',
    equipement: '🛠️',
    produit: '🧼',
    autre: '📦',
  }
  return emojis[categorie] || '📦'
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Remplacer par une image de secours SVG (placeholder) et garder le conteneur
  const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23E6EEF9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="24">Image indisponible</text></svg>'
  img.src = placeholder
  img.classList.add('bg-gray-100')
}

const resolveProductImageUrl = (image: string | undefined, apiBaseUrl: string) => {
  if (!image) return ''
  const trimmed = image.trim()
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) return trimmed
  const path = trimmed.startsWith('/') ? trimmed : `/uploads/${trimmed}`
  return `${apiBaseUrl.replace(/\/$/, '')}${path}`
}

const addToCart = (product: Product) => {
  const cart: CartItem[] = JSON.parse((typeof window !== 'undefined' && window.localStorage.getItem('cart')) || '[]')
  const existing = cart.find(item => item.id === product.id)

  if (existing) {
    if (existing.quantity < product.quantite) {
      existing.quantity++
    } else {
      alert('⚠️ Quantité insuffisante en stock')
      return
    }
  } else {
    cart.push({
      id: product.id,
      name: product.nom,
      price: product.prix,
      quantity: 1,
      emoji: getEmoji(product.categorie),
    })
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }
  alert('✅ Produit ajouté au panier')
}
</script>

