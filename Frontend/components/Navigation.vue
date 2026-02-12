<template>
  <nav class="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
    <!-- Desktop Navigation -->
    <div class="hidden md:block max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <NuxtLink
          to="/home"
          @click="handleLogoClick"
          class="flex items-center space-x-2 hover:opacity-90 transition"
        >
          <div class="bg-white text-blue-600 rounded-full p-2">
            <span class="text-2xl font-bold">Y</span>
          </div>
          <span class="text-3xl font-bold">YOLAAB</span>
        </NuxtLink>

        <div class="flex space-x-2">
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
            <span class="text-2xl">{{ item.emoji }}</span>
            <span class="mt-1 text-sm">{{ item.label }}</span>
          </NuxtLink>
          <!-- Admin link hidden intentionally for discreet access -->
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="md:hidden">
      <div class="text-center py-4">
        <NuxtLink to="/home" class="text-2xl font-bold">YOLAAB</NuxtLink>
        <p class="text-sm mt-1">Keur Massar, Dakar</p>
      </div>
      <nav class="fixed bottom-0 left-0 right-0 bg-blue-600 shadow-lg z-50 border-t border-blue-500">
        <div class="flex justify-around items-center h-20">
          <NuxtLink
            v-for="item in navItems"
            :key="item.id"
            :to="`/${item.id}`"
            class="flex flex-col items-center justify-center flex-1 h-full hover:bg-blue-500 transition"
          >
            <span class="text-2xl">{{ item.emoji }}</span>
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

const navItems = [
  { id: 'home', emoji: '🏠', label: 'Accueil' },
  { id: 'reservation', emoji: '📅', label: 'Réserver' },
  { id: 'devis', emoji: '📋', label: 'Devis' },
  { id: 'realisation', emoji: '🎬', label: 'Réalisations' },
  { id: 'shop', emoji: '🛒', label: 'Boutique' },
]

const route = useRoute()
const router = useRouter()

// Hidden admin access: click logo 5 times within 2 seconds to go to /admin
const clickCount = ref(0)
let clickTimer: ReturnType<typeof setTimeout> | null = null

const handleLogoClick = () => {
  clickCount.value++

  if (clickCount.value === 1) {
    // start/reset timer
    clickTimer = setTimeout(() => {
      clickCount.value = 0
      clickTimer = null
    }, 2000)
  }

  if (clickCount.value >= 5) {
    if (clickTimer) {
      clearTimeout(clickTimer)
      clickTimer = null
    }
    clickCount.value = 0
    router.push('/admin')
  }
}

const isActive = (path: string) => {
  return route.path === `/${path}` || (path === 'home' && route.path === '/')
}
</script>
