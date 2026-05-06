<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">
        🛒 Mon Panier
      </h1>

      <div v-if="cartItems.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <p class="text-xl text-gray-600 mb-8">Votre panier est vide</p>
        <NuxtLink
          to="/shop"
          class="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all font-bold"
        >
          ← Retour à la boutique
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Panier -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-blue-600 mb-6">Produits</h2>
            <div class="space-y-4">
              <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between bg-blue-50 p-4 rounded-xl">
                <div class="flex items-center gap-4">
                  <span class="text-3xl">{{ item.emoji }}</span>
                  <div>
                    <p class="font-bold">{{ item.name }}</p>
                    <p class="text-sm text-gray-600">{{ item.price.toLocaleString() }} FCFA</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="decreaseQuantity(item.id)"
                      class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      −
                    </button>
                    <span class="px-4 py-1 bg-white rounded border-2">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item.id)"
                      class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="removeFromCart(item.id)"
                    class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Formulaire de commande -->
        <div class="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 class="text-2xl font-bold text-blue-600 mb-6">Commande</h2>

          <form @submit.prevent="handleCheckout" class="space-y-4">
            <!-- Informations Personnelles -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
              <input
                v-model="orderData.nom"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
              <input
                v-model="orderData.prenom"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
              <input
                v-model="orderData.telephone"
                type="tel"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Votre téléphone"
              />
            </div>

            <!-- Email supprimé — localisation utilisée à la place -->

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Localisation *</label>
              <input
                v-model="orderData.localisation"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Ex: Douala, Cameroun"
              />
            </div>

            <!-- Résumé -->
            <div class="border-t-2 pt-4 space-y-2">
              <div class="flex justify-between font-bold">
                <span>Sous-total:</span>
                <span>{{ subtotal.toLocaleString() }} FCFA</span>
              </div>
              <div class="flex justify-between text-blue-600 font-bold text-lg">
                <span>TOTAL:</span>
                <span>{{ total.toLocaleString() }} FCFA</span>
              </div>
            </div>

            <!-- Boutons -->
            <div class="space-y-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold disabled:opacity-50"
              >
                {{ isLoading ? '⏳ Traitement...' : '✅ VALIDER LA COMMANDE' }}
              </button>
              <NuxtLink
                to="/shop"
                class="block text-center bg-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-400 transition-all font-bold"
              >
                ← Retour boutique
              </NuxtLink>
            </div>

            <div v-if="successMessage" class="bg-green-100 border-2 border-green-600 text-green-700 p-3 rounded-lg text-sm">
              {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="bg-red-100 border-2 border-red-600 text-red-700 p-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  emoji: string
}

interface OrderData {
  nom: string
  prenom: string
  telephone: string
  localisation: string
}

const cartItems = ref<CartItem[]>([])
const orderData = ref<OrderData>({
  nom: '',
  prenom: '',
  telephone: '',
  localisation: '',
})

const apiUrl = useRuntimeConfig().public.apiUrl || 'http://localhost:3000'

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const total = computed(() => subtotal.value)

onMounted(() => {
  const cart = localStorage.getItem('cart')
  if (cart) {
    cartItems.value = JSON.parse(cart)
  }
})

const increaseQuantity = (id: string) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    item.quantity++
    saveCart()
  }
}

const decreaseQuantity = (id: string) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
    saveCart()
  }
}

const removeFromCart = (id: string) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
  saveCart()
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

const handleCheckout = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl || 'http://localhost:3000'

  try {
    const items = cartItems.value.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      emoji: item.emoji,
    }))

    const response = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: orderData.value.nom,
        prenom: orderData.value.prenom,
        telephone: orderData.value.telephone,
        localisation: orderData.value.localisation,
        items: items,
        total: total.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la commande')
    }

    successMessage.value = '✅ Commande confirmée ! Nous vous contacterons bientôt.'

    const customerName = orderData.value.nom
    const customerSurname = orderData.value.prenom
    const customerPhone = orderData.value.telephone
    const customerLocation = orderData.value.localisation || 'Non fournie'

    localStorage.removeItem('cart')
    cartItems.value = []
    orderData.value = {
      nom: '',
      prenom: '',
      telephone: '',
      localisation: '',
    }

    const whatsappNumber = '221767957899'
    const messageLines = [
      'NOUVELLE COMMANDE YOLAAB',
      `Nom: ${customerName}`,
      `Prénom: ${customerSurname}`,
      `Téléphone: ${customerPhone}`,
      `Localisation: ${customerLocation}`,
      `Total: ${total.value.toLocaleString()} FCFA`,
      '',
      'Articles :',
      ...items.map(item => `- ${item.name} x${item.quantity} (${item.price.toLocaleString()} FCFA)`),
    ]
    const encodedMessage = encodeURIComponent(messageLines.join('\n'))
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')

    setTimeout(() => {
      navigateTo('/home')
    }, 2000)
  } catch (error) {
    errorMessage.value = '❌ Erreur lors de la commande. Veuillez réessayer.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>
