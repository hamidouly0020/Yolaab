<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            🧹 Yolaab
          </h1>
          <p class="text-2xl md:text-3xl font-semibold mb-4 text-blue-100">
            L'art du nettoyage professionnel sur mesure
          </p>
          <p class="text-lg md:text-xl mb-8 opacity-90">
            Votre partenaire de confiance pour des espaces, équipements, et véhicules éclatants
          </p>
          <NuxtLink
            to="/reservation"
            class="inline-block bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg font-bold"
          >
            <span class="flex items-center gap-3">
              <span class="text-2xl">📅</span>
              <span class="text-xl">RÉSERVER MAINTENANT</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="bg-blue-50 rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-600 mb-6">À Propos de Yolaab</h2>
        <p class="text-lg text-gray-700 leading-8 mb-6">
          Yolaab est une entreprise de nettoyage qui place votre satisfaction au cœur de sa mission. 
          Avec une approche innovante et une équipe passionnée, nous offrons des services de nettoyage 
          sur mesure pour chaque espace et équipement, en apportant une attention unique aux détails. 
          Chez Yolaab, chaque intervention est pensée pour transformer les lieux en espaces accueillants, 
          propres et revitalisés.
        </p>
        <p class="text-xl font-semibold text-blue-600 border-l-4 border-blue-600 pl-4">
          Notre mission : Rendre chaque espace accueillant, propre et revitalisé, 
          grâce à un service attentif et personnalisé.
        </p>
      </div>
    </div>

    <!-- Services Section with Company Images Gallery -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
        Nos Services en Action
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Image 1 -->
        <NuxtLink
          to="/reservation"
          class="relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
        >
          <img 
            src="~/assets/service1.jpeg" 
            alt="Service Yoolab 1" 
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <div class="p-6 w-full">
              <h3 class="text-2xl font-bold text-white mb-2">Nettoyage Professionnel</h3>
              <p class="text-gray-100">Découvrez notre expertise en nettoyage sur mesure</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Image 2 -->
        <NuxtLink
          to="/reservation"
          class="relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
        >
          <img 
            src="~/assets/service2.jpeg" 
            alt="Service Yoolab 2" 
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <div class="p-6 w-full">
              <h3 class="text-2xl font-bold text-white mb-2">Excellence et Précision</h3>
              <p class="text-gray-100">Un travail méticuleux pour chaque espace</p>
            </div>
          </div>
        </NuxtLink>

        <!-- Image 3 -->
        <NuxtLink
          to="/reservation"
          class="relative rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block h-80"
        >
          <img 
            src="~/assets/service3.jpeg" 
            alt="Service Yoolab 3" 
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <div class="p-6 w-full">
              <h3 class="text-2xl font-bold text-white mb-2">Votre Satisfaction</h3>
              <p class="text-gray-100">Notre engagement pour la qualité</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Service Description -->
      <div class="bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
        <h3 class="text-2xl font-bold text-blue-600 mb-4">Nos Domaines d'Expertise</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div class="text-4xl mb-2">🚗</div>
            <p class="font-semibold text-gray-700">Nettoyage Automobile</p>
          </div>
          <div>
            <div class="text-4xl mb-2">🛋️</div>
            <p class="font-semibold text-gray-700">Moquettes & Canapés</p>
          </div>
          <div>
            <div class="text-4xl mb-2">🏗️</div>
            <p class="font-semibold text-gray-700">Fin de Chantier</p>
          </div>
          <div>
            <div class="text-4xl mb-2">🏢</div>
            <p class="font-semibold text-gray-700">Entretien Bureaux</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-gradient-to-b from-white to-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
          Nos Valeurs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4">😊</div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Satisfaction Client</h3>
            <p class="text-gray-700">Vous êtes notre priorité. Notre équipe s'engage à offrir un service qui dépasse vos attentes.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4">⭐</div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Professionnalisme</h3>
            <p class="text-gray-700">Nos experts mettent tout en œuvre pour assurer des résultats impeccables avec soin et efficacité.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4">💡</div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Innovation</h3>
            <p class="text-gray-700">Nous utilisons des méthodes modernes et du matériel performant pour garantir des résultats durables.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Adaptabilité</h3>
            <p class="text-gray-700">Chaque espace est unique. Nous adaptons nos services à vos besoins spécifiques.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Approach Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
        Notre Approche en Trois Étapes
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="relative">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</div>
            <h3 class="text-2xl font-bold text-blue-600">Analyse des Besoins</h3>
          </div>
          <p class="text-gray-700 ml-16">
            Nous commençons par une consultation pour comprendre vos attentes et les spécificités de chaque espace, équipement ou véhicule.
          </p>
        </div>

        <div class="relative">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</div>
            <h3 class="text-2xl font-bold text-blue-600">Plan Personnalisé</h3>
          </div>
          <p class="text-gray-700 ml-16">
            Nous élaborons une solution sur mesure, incluant les méthodes et produits adaptés à chaque surface et matériau.
          </p>
        </div>

        <div class="relative">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</div>
            <h3 class="text-2xl font-bold text-blue-600">Suivi Satisfaction</h3>
          </div>
          <p class="text-gray-700 ml-16">
            Nous restons à votre écoute pour ajuster nos services et garantir une satisfaction continue.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-12">
          Contactez Yolaab
        </h2>
        <p class="text-lg mb-8">Contactez-nous pour un devis gratuit ou plus d'informations</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div class="flex flex-col items-center">
            <div class="text-5xl mb-4">📞</div>
            <p class="text-xl font-semibold">Téléphone</p>
            <p class="text-blue-100">78 480 03 61</p>
          </div>

          <div class="flex flex-col items-center">
            <a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white shadow transition-transform transform hover:scale-105 mb-4" aria-label="Contacter sur WhatsApp">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"/></svg>
            </a>
            <p class="text-xl font-semibold">WhatsApp</p>
            <a href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande." target="_blank" rel="noopener noreferrer" class="text-blue-700 font-bold">Contacter via WhatsApp</a>
          </div>

          <div class="flex flex-col items-center">
            <div class="text-5xl mb-4">📍</div>
            <p class="text-xl font-semibold">Localisation</p>
            <p class="text-blue-100">Keur Massar, Dakar</p>
          </div>
        </div>

        <!-- Social Links with SVG logos -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://www.tiktok.com/@yolaab6?_r=1&_t=ZS-93fslJAVm5J"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white"
            aria-label="Yoolab sur TikTok"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
            <span class="font-semibold">TikTok</span>
          </a>

          <a
            href="https://www.facebook.com/share/1AdEMxu7zs/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white"
            aria-label="Yoolab sur Facebook"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11 9.95V14.8h-2.2v-2.8H11V10.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.08 2.1.12v2.4h-1.3c-1 0-1.3.6-1.3 1.2v1.6h2.6l-.4 2.8h-2.2V22A10 10 0 0 0 22 12z" />
            </svg>
            <span class="font-semibold">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/yolaab_nettoyage?igsh=aHI4eWNlbnU4M2Zz&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-white"
            aria-label="Yoolab sur Instagram"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 2C5.3 2 4 3.3 4 5v14c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7zm8 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM18 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
            <span class="font-semibold">Instagram</span>
          </a>
        </div>

        <NuxtLink
          to="/reservation"
          class="inline-block bg-white text-blue-600 px-12 py-4 rounded-full hover:bg-blue-50 transition-all font-bold text-lg"
        >
          Réserver une Intervention
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- WhatsApp floating button -->
  <a
    href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande."
    target="_blank"
    rel="noopener noreferrer"
    class="fixed right-6 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
    aria-label="Contactez Yoolab sur WhatsApp"
    title="Contactez Yoolab sur WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"/>
    </svg>
  </a>
</template>

<script setup lang="ts">
// Page data is now hardcoded with Yoolab branding - no need for services/features arrays
</script>
