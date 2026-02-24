<template>
  <nav class="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
    <!-- Desktop Navigation -->
    <div class="hidden md:block max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <NuxtLink
          to="/home"
          @click="handleLogoClick"
          class="flex items-center space-x-2 hover:opacity-90 transition cursor-pointer"
          title="Click 3 times para acceso de admin"
        >
          <div class="bg-white text-blue-600 rounded-full p-2">
            <span class="text-2xl font-bold">Y</span>
          </div>
          <span class="text-3xl font-bold">YOLAAB</span>
        </NuxtLink>

        <div class="flex space-x-2 items-center gap-4">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="`/${item.id}`"
            :class="[
              'flex flex-col items-center px-6 py-3 rounded-lg transition-all',
              isActive(item.id)
                ? 'bg-white text-blue-600 shadow-lg'
                : 'hover:bg-blue-500'
            ]"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span class="mt-1 text-sm">{{ item.label }}</span>
          </NuxtLink>
          <!-- Admin button appears after 3 clicks -->
          <NuxtLink
            v-if="showAdminButton"
            to="/admin"
            class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2"
            title="Admin Panel"
          >
            <Lock class="w-4 h-4" />
            Admin
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="md:hidden">
      <div class="text-center py-4 flex items-center justify-between px-4">
        <NuxtLink
          to="/home"
          @click="handleLogoClick"
          class="text-2xl font-bold hover:opacity-80 transition cursor-pointer flex-1 text-center"
          title="Click 3 times para acceso de admin"
        >
          YOLAAB
        </NuxtLink>
        <!-- Admin button for mobile -->
        <NuxtLink
          v-if="showAdminButton"
          to="/admin"
          class="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-bold text-xs transition-all flex items-center justify-center"
        >
          <Lock class="w-4 h-4" />
        </NuxtLink>
      </div>
      <p class="text-center text-sm pb-4">Keur Massar, Dakar</p>
      <nav class="fixed bottom-0 left-0 right-0 bg-blue-600 shadow-lg z-40 border-t border-blue-500">
        <div class="flex justify-around items-center h-20">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="`/${item.id}`"
            class="flex flex-col items-center justify-center flex-1 h-full hover:bg-blue-500 transition"
          >
            <component :is="item.icon" class="w-6 h-6 text-white" />
            <span class="text-xs mt-1">{{ item.label }}</span>
          </NuxtLink>
          <!-- Admin mobile link hidden intentionally for discreet access -->
        </div>
      </nav>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Home, Calendar, Clipboard, Film, ShoppingCart, Lock } from 'lucide-vue-next'

const navItems = [
  { id: 'home', icon: Home, label: 'Accueil' },
  { id: 'reservation', icon: Calendar, label: 'Réserver' },
  { id: 'devis', icon: Clipboard, label: 'Devis' },
  { id: 'realisation', icon: Film, label: 'Réalisations' },
  { id: 'shop', icon: ShoppingCart, label: 'Boutique' },
]

const route = useRoute()
const router = useRouter()

// Admin access: click logo 3 times within 2 seconds to show Admin button
const clickCount = ref(0)
const showAdminButton = ref(false)
let clickTimer: ReturnType<typeof setTimeout> | null = null

const handleLogoClick = () => {
  clickCount.value++

  if (clickCount.value === 1) {
    // start/reset timer
    clickTimer = setTimeout(() => {
      clickCount.value = 0
      showAdminButton.value = false
      clickTimer = null
    }, 2000)
  }

  if (clickCount.value >= 3) {
    if (clickTimer) {
      clearTimeout(clickTimer)
      clickTimer = null
    }
    showAdminButton.value = true
    clickCount.value = 0
  }
}

const isActive = (path: string) => {
  return route.path === `/${path}` || (path === 'home' && route.path === '/')
}
</script>
