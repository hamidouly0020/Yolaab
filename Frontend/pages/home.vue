<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue chez YOLAAB
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Votre Expert en Nettoyage à Keur Massar
          </p>
          <NuxtLink
            to="/reservation"
            class="inline-block bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <span class="flex items-center gap-3">
              <span class="text-2xl">📅</span>
              <span class="text-xl font-bold">RÉSERVER MAINTENANT</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
        Nos Services
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NuxtLink
          v-for="(service, index) in services"
          :key="index"
          to="/reservation"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block"
        >
          <div class="relative h-48">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white text-4xl">
              {{ service.emoji }}
            </div>
          </div>
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold text-blue-600 mb-2">
              {{ service.title }}
            </h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
          Pourquoi YOLAAB ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="text-center">
            <div class="text-4xl mb-4">{{ feature.emoji }}</div>
            <p class="text-xl font-semibold text-gray-700">{{ feature.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-600 mb-8">
          Contactez-Nous
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="text-4xl mb-4">📍</div>
            <p class="text-gray-600">Keur Massar, Dakar, Sénégal</p>
          </div>
          <div>
            <div class="text-4xl mb-4">📞</div>
            <p class="text-gray-600">+221 77 123 45 67</p>
          </div>
          <div>
            <div class="text-4xl mb-4">📧</div>
            <p class="text-gray-600">contact@yolaab.sn</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const services = [
  {
    emoji: '🚗',
    title: 'Lavage Voiture',
    description: 'Nettoyage complet de votre véhicule',
    image: 'https://images.unsplash.com/photo-1760827797819-4361cd5cd353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3YXNoJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2OTkzNzA1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    emoji: '🏠',
    title: 'Lavage Maison',
    description: 'Nettoyage de votre domicile',
    image: 'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk5NzU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    emoji: '🏢',
    title: 'Lavage Bureau',
    description: 'Nettoyage de vos bureaux',
    image: 'https://images.unsplash.com/photo-1701651545983-c3b357a8387f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjbGVhbmluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk5NzU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    emoji: '🛋️',
    title: 'Lavage Salon',
    description: 'Nettoyage de vos meubles',
    image: 'https://images.unsplash.com/photo-1684165610413-2401399e0e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBzb2ZhJTIwY2xlYW5pbmd8ZW58MXx8fHwxNzY5OTc1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

const features = [
  { emoji: '⚡', text: 'Service Rapide' },
  { emoji: '👨‍💼', text: 'Professionnels' },
  { emoji: '💰', text: 'Prix Abordables' },
  { emoji: '✅', text: 'Qualité Garantie' },
];
</script>
