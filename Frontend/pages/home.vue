<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <!-- Decorative blobs -->
      <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
        <svg class="decor-blob absolute left-[-8%] top-[-10%] opacity-30" width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stop-color="#7DD3FC" />
              <stop offset="100%" stop-color="#60A5FA" />
            </linearGradient>
          </defs>
          <circle cx="210" cy="210" r="180" fill="url(#g1)" />
        </svg>
        <svg class="decor-blob absolute right-[-6%] bottom-[-8%] opacity-20" width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stop-color="#34D399" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="320" height="320" rx="80" fill="url(#g2)" />
        </svg>
      </div>
      <div class="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            <HomeIcon size="36" class="inline-block mr-3 align-middle" /> Yolaab
          </h1>
          <p class="text-2xl md:text-3xl font-semibold mb-4 text-blue-100">
            L'art du nettoyage professionnel sur mesure
          </p>
          <p class="text-lg md:text-xl mb-8 opacity-90">
            Votre partenaire de confiance pour des espaces, équipements, et véhicules éclatants
          </p>
          <NuxtLink
            to="/reservation"
            class="inline-block bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg font-bold pulse-cta"
          >
            <span class="flex items-center gap-3">
              <Calendar size="20" />
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
            <div class="text-4xl mb-2"><Car size="36" /></div>
            <p class="font-semibold text-gray-700">Nettoyage Automobile</p>
          </div>
          <div>
            <div class="text-4xl mb-2"><Sofa size="36" /></div>
            <p class="font-semibold text-gray-700">Moquettes & Canapés</p>
          </div>
          <div>
            <div class="text-4xl mb-2"><Building2 size="36" /></div>
            <p class="font-semibold text-gray-700">Fin de Chantier</p>
          </div>
          <div>
            <div class="text-4xl mb-2"><Building2 size="36" /></div>
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
            <div class="text-5xl mb-4"><Smile size="40" class="mx-auto" /></div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Satisfaction Client</h3>
            <p class="text-gray-700">Vous êtes notre priorité. Notre équipe s'engage à offrir un service qui dépasse vos attentes.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4"><Star size="40" class="mx-auto" /></div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Professionnalisme</h3>
            <p class="text-gray-700">Nos experts mettent tout en œuvre pour assurer des résultats impeccables avec soin et efficacité.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4"><Lightbulb size="40" class="mx-auto" /></div>
            <h3 class="text-xl font-bold text-blue-600 mb-3">Innovation</h3>
            <p class="text-gray-700">Nous utilisons des méthodes modernes et du matériel performant pour garantir des résultats durables.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
            <div class="text-5xl mb-4"><Target size="40" class="mx-auto" /></div>
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

    <!-- Contact Section (design mockup) -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12 fade-up">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <!-- Header -->
        <h2 class="text-4xl md:text-5xl font-bold mb-2">Contactez Yolaab</h2>
        <p class="text-lg md:text-xl mb-8 text-blue-100">Contactez-nous pour un devis gratuit ou plus d'informations</p>

        <!-- Two large contact cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Phone Card -->
          <div class="card-contact rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="icon-circle"><Phone size="48" /></div>
            </div>
            <h3 class="text-2xl md:text-3xl font-semibold mb-2">Téléphone</h3>
            <p class="text-lg md:text-xl"><a href="tel:+221784800361" class="hover:underline">78 480 03 61</a></p>
          </div>

          <!-- Location Card -->
          <div class="card-contact rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="icon-circle"><MapPin size="48" /></div>
            </div>
            <h3 class="text-2xl md:text-3xl font-semibold mb-2">Localisation</h3>
            <p class="text-lg md:text-xl">Keur Massar, Dakar</p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
          <a href="https://www.tiktok.com/@yolaab6?_r=1&_t=ZS-93fslJAVm5J" target="_blank" rel="noopener noreferrer" class="social-btn">
            <svg class="w-6 h-6 inline mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" /></svg>
            TikTok
          </a>
          <a href="https://www.facebook.com/share/1AdEMxu7zs/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="social-btn">
            <svg class="w-6 h-6 inline mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11 9.95V14.8h-2.2v-2.8H11V10.4c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.08 2.1.12v2.4h-1.3c-1 0-1.3.6-1.3 1.2v1.6h2.6l-.4 2.8h-2.2V22A10 10 0 0 0 22 12z" /></svg>
            Facebook
          </a>
          <a href="https://www.instagram.com/yolaab_nettoyage?igsh=aHI4eWNlbnU4M2Zz&utm_source=qr" target="_blank" rel="noopener noreferrer" class="social-btn">
            <svg class="w-6 h-6 inline mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C5.3 2 4 3.3 4 5v14c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3H7zm8 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM18 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></svg>
            Instagram
          </a>
        </div>

        <!-- CTA Button -->
        <NuxtLink to="/reservation" class="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-4 rounded-full hover:bg-blue-50 transition-all font-bold text-lg shadow-lg hover:shadow-xl">
          Réserver une Intervention
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home as HomeIcon, Calendar, Car, Sofa, Building2, Smile, Star, Lightbulb, Target, MapPin, Phone, Film, Image } from 'lucide-vue-next'
// Page data is now hardcoded with Yoolab branding - no need for services/features arrays
</script>

<style scoped>
/* Decorative and subtle animations to enrich the design without changing layout */
.decor-blob{ transform-origin: center; animation: float 8s ease-in-out infinite; }
.decor-blob:nth-child(2){ animation-duration: 10s; }

.pulse-cta{ animation: pulse 3.5s ease-in-out infinite; }

.fade-up{ animation: fadeUp .9s ease both; }

@keyframes float{
  0%{ transform: translateY(0) scale(1); }
 50%{ transform: translateY(-12px) scale(1.02); }
 100%{ transform: translateY(0) scale(1); }
}

@keyframes pulse{
  0%{ box-shadow: 0 6px 18px rgba(2,6,23,0.08); transform: translateY(0); }
  50%{ box-shadow: 0 14px 36px rgba(2,6,23,0.12); transform: translateY(-4px); }
 100%{ box-shadow: 0 6px 18px rgba(2,6,23,0.08); transform: translateY(0); }
}

@keyframes fadeUp{
  from{ opacity: 0; transform: translateY(12px); }
  to{ opacity: 1; transform: translateY(0); }
}

/* Contact section refinements */
.card-contact{ background: rgba(255,255,255,0.06); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.1); }

.icon-circle{ 
  width: 100px; 
  height: 100px; 
  background: rgba(255,255,255,0.12); 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}

.social-btn{
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid rgba(255,255,255,0.5);
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  color: white;
  font-weight: 600;
  transition: all 300ms;
  position: relative;
}

.social-btn:after{
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 300ms;
}

.social-btn:hover{
  border-color: rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.08);
}

.social-btn:hover:after{
  transform: scaleX(1);
}
</style>
