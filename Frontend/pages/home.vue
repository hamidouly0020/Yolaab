  <template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
    <!-- Hero Section -->
    <div class="relative overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center fade-up bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${heroBackground})` }">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,58,107,0.2),transparent_20%),_linear-gradient(135deg,rgba(248,251,255,0.36)_0%,rgba(238,245,251,0.28)_100%)]"></div>
      <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
        <svg class="absolute left-[-8%] top-[-10%] opacity-30" width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stop-color="#7DD3FC" />
              <stop offset="100%" stop-color="#60A5FA" />
            </linearGradient>
          </defs>
          <circle cx="210" cy="210" r="180" fill="url(#g1)" />
        </svg>
        <svg class="absolute right-[-10%] top-[10%] w-72 h-72 opacity-30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="#17a2b8" />
        </svg>
      </div>
      <div class="max-w-7xl mx-auto px-4 relative z-20 w-full">
        <div class="text-center mx-auto">
          <div class="inline-flex items-center justify-center gap-3 mb-6">
            <HomeIcon :size="40" class="text-blue-900" />
            <span class="text-5xl md:text-6xl font-black tracking-tight text-blue-900">YOLAAB</span>
          </div>
          <p class="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">Tous vos services domestiques en un seul écosystème.</p>
          <p class="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-8">Simplifiez votre quotidien en professionnalisant les services domestiques, afin de libérer votre temps pour l’essentiel.</p>

          <div class="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-sm mb-8">
            <Sparkles class="w-6 h-6 text-teal-600" />
            <span class="font-semibold text-slate-900">Un écosystème intégré de services domestiques, centralisé et structuré.</span>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              @click="router.push('/services')"
              class="inline-flex items-center justify-center gap-3 bg-blue-900 text-white px-10 py-4 rounded-full hover:bg-blue-950 transition-all shadow-lg font-bold text-lg group hover:shadow-xl hover:scale-105 transform"
            >
              <Calendar :size="20" class="group-hover:scale-110 transition-transform" />
              Voir nos services
            </button>
          </div>
        </div>
      </div>
    </div>

    

    <!-- Services Section with Company Images Gallery -->
    <div class="max-w-7xl mx-auto px-4 py-10 relative">
      <div class="text-center mb-10">
        <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-3 services-title">
          Notre Écosystème Intégré de Services
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
      </div>

      <!-- Ecosystem Visualization -->
      <div class="flex justify-center items-center mb-10">
        <div class="relative group cursor-pointer" @click="router.push('/services')">
          <!-- Subtle background glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <!-- Image container with integrated design -->
          <div class="relative bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl p-8 shadow-xl border border-blue-200/30 backdrop-blur-sm overflow-hidden">
            <!-- Decorative elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-8"></div>

            <!-- Image with subtle styling -->
            <img
              src="../assets/image_ecosysteme.jpeg"
              alt="Écosystème intégré de services Yolaab"
              class="relative z-10 w-full max-w-2xl h-auto max-h-[380px] object-contain rounded-2xl transition-all duration-300 group-hover:scale-[1.02]"
            />

            <!-- Overlay text -->
            <div class="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white p-4 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p class="text-sm font-medium">Découvrez notre écosystème complet de services</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Description -->
      <div class="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-6 md:p-10 text-center shadow-xl border border-blue-200/50 overflow-hidden relative">
        <div class="absolute -right-32 -top-32 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div class="relative z-10">
          <h3 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">Le Problème que Nous Résolvons</h3>
          <p class="text-lg text-gray-700 leading-9 mb-8 max-w-4xl mx-auto">
            Le secteur domestique souffre d'un manque de structuration. Les ménages et les entreprises rencontrent
            des prestataires peu encadrés, une qualité irrégulière, une absence de garanties et des standards peu clairs.
            Cette multiplication des interlocuteurs crée un déficit de confiance et une perte de temps considérable.
          </p>
          <h3 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6">Notre Solution</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="solution-card bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition-all transform hover:translate-y-1 cursor-pointer border border-blue-100 group overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex items-center justify-center text-blue-600 mb-4 w-16 h-16 mx-auto bg-blue-100 rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </div>
              <p class="font-bold text-gray-800 text-lg relative z-10">Équipes formées et encadrées</p>
            </div>
            <div class="solution-card bg-white rounded-2xl shadow-md hover:shadow-xl p-8 text-center transition-all transform hover:translate-y-1 cursor-pointer border border-blue-100 group overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex items-center justify-center text-green-600 mb-6 w-20 h-20 mx-auto bg-green-100 rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p class="font-bold text-gray-800 text-lg relative z-10">Processus clairs et garanties</p>
            </div>
            <div class="solution-card bg-white rounded-2xl shadow-md hover:shadow-xl p-8 text-center transition-all transform hover:translate-y-1 cursor-pointer border border-blue-100 group overflow-hidden relative">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex items-center justify-center text-purple-600 mb-6 w-20 h-20 mx-auto bg-purple-100 rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p class="font-bold text-gray-800 text-lg relative z-10">Suivi client rigoureux</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-gradient-to-b from-white to-blue-50 py-12 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute left-0 top-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div class="absolute right-0 bottom-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-6000"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center mb-10">
          <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-3">
            Nos Valeurs
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"><Shield :size="32" class="mx-auto text-blue-600" /></div>
            <h3 class="text-base font-bold text-blue-600 mb-2 relative z-10">Fiabilité</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Vous pouvez compter sur nous</p>
          </div>

          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"><Star :size="40" class="mx-auto text-yellow-500" /></div>
            <h3 class="text-lg font-bold text-blue-600 mb-3 relative z-10">Excellence</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Excellence opérationnelle</p>
          </div>

          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"><Heart :size="40" class="mx-auto text-red-500" /></div>
            <h3 class="text-lg font-bold text-blue-600 mb-3 relative z-10">Responsabilité</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Impact social assumé</p>
          </div>

          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"><Handshake :size="40" class="mx-auto text-green-600" /></div>
            <h3 class="text-lg font-bold text-blue-600 mb-3 relative z-10">Respect</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Respect de tous</p>
          </div>

          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"><CheckCircle :size="40" class="mx-auto text-indigo-600" /></div>
            <h3 class="text-lg font-bold text-blue-600 mb-3 relative z-10">Rigueur</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Processus clairs</p>
          </div>

          <div class="value-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300 transform border border-blue-200/50 group overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"><Zap :size="40" class="mx-auto text-orange-500" /></div>
            <h3 class="text-lg font-bold text-blue-600 mb-3 relative z-10">Engagement</h3>
            <p class="text-gray-700 text-sm leading-6 relative z-10">Committed to excellence</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Approach Section - Timeline -->
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-2">
        Notre Approche en Trois Étapes
      </h2>
      <p class="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
        Découvrez comment nous transformons vos espaces en trois étapes simples et efficaces
      </p>

      <!-- Timeline Container -->
      <div class="relative">
        <!-- Timeline line (hidden on mobile) -->
        <div class="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300"></div>

        <!-- Timeline Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- Step 1 -->
          <div class="relative group">
            <!-- Step Circle -->
            <div class="flex justify-center mb-8">
              <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 z-10">
                <!-- Number -->
                <span class="absolute text-4xl md:text-5xl font-bold opacity-30">1</span>
                <!-- Icon - Clipboard/Form -->
                <svg class="w-12 h-12 md:w-16 md:h-16 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16zm-8-7h6v2h-6v-2zm0 4h6v2h-6v-2zm0-8h6v2h-6v-2z"/>
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-xl md:text-lg font-bold text-blue-600 mb-2">Réception</h3>
              <p class="text-gray-700 text-sm leading-relaxed px-2">
                Sélectionnez le type de service (nettoyage intérieur, extérieur...). Le prix se calcule automatiquement. Imprimez ou envoyez le ticket.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative group">
            <!-- Step Circle -->
            <div class="flex justify-center mb-8">
              <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 z-10">
                <!-- Number -->
                <span class="absolute text-4xl md:text-5xl font-bold opacity-30">2</span>
                <!-- Icon - SMS/Message -->
                <svg class="w-12 h-12 md:w-16 md:h-16 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-3h-8V9h8v2zm0-3H4V6h14v2z"/>
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-xl md:text-lg font-bold text-blue-600 mb-2">Notification Auto</h3>
              <p class="text-gray-700 text-sm leading-relaxed px-2">
                Quand le service est complété et approuvé, cliquez sur "Prêt". Le client reçoit un SMS pour venir chercher ou nous livrer.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative group">
            <!-- Step Circle -->
            <div class="flex justify-center mb-8">
              <div class="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 z-10">
                <!-- Number -->
                <span class="absolute text-4xl md:text-5xl font-bold opacity-30">3</span>
                <!-- Icon - Payment/Credit Card -->
                <svg class="w-12 h-12 md:w-16 md:h-16 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 8H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H4V10h16v10zm-4-5h4v2h-4v-2z"/>
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-xl md:text-lg font-bold text-blue-600 mb-2">Encaissement</h3>
              <p class="text-gray-700 text-sm leading-relaxed px-2">
                Validez le paiement (Cash, Wave ou OM). L'application met à jour votre chiffre d'affaires du jour automatiquement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section (design mockup) -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 md:py-8 fade-up">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <!-- Header -->
        <h2 class="text-3xl md:text-4xl font-bold mb-1">Contactez Yolaab</h2>
        <p class="text-base md:text-lg mb-6 text-blue-100">Contactez-nous pour un devis gratuit ou plus d'informations</p>

        <!-- Two large contact cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- Phone Card -->
          <div class="card-contact rounded-3xl p-5 md:p-6 hover:shadow-2xl transition-all duration-300">
            <div class="flex justify-center mb-3">
              <div class="icon-circle"><Phone :size="40" /></div>
            </div>
            <h3 class="text-xl md:text-2xl font-semibold mb-1">Téléphone</h3>
            <p class="text-lg md:text-xl"><a href="tel:+221784800361" class="hover:underline">78 480 03 61</a></p>
          </div>

          <!-- Location Card -->
          <div class="card-contact rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
            <div class="flex justify-center mb-4">
              <div class="icon-circle"><MapPin :size="48" /></div>
            </div>
            <h3 class="text-2xl md:text-3xl font-semibold mb-2">Localisation</h3>
            <p class="text-lg md:text-xl">Keur Massar, Dakar</p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
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
        <NuxtLink to="/reservation" class="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-3 rounded-full hover:bg-blue-50 transition-all font-bold text-base shadow-lg hover:shadow-xl">
          Réserver une Intervention
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home as HomeIcon, Calendar, Sparkles, ArrowRight, ShoppingBag, Package, Users, Truck, RefreshCw, MapPin, Phone, Shield, Star, Handshake, CheckCircle, Zap, Heart } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import heroBackground from '~/assets/background_home.jpeg'

const router = useRouter()
const showServiceModal = ref(false)
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
    title: 'Placement de Personnel Qualifié',
    description: 'Placement de personnel qualifié',
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
    title: 'Plateforme de Seconde Main',
    description: 'Commerce spécialisé',
    available: false,
    icon: RefreshCw,
  },
  {
    id: 'commerce',
    title: 'Commerce Spécialisé',
    description: 'Produits sélectionnés de qualité',
    available: false,
    icon: Package,
  },
]

const openServicesModal = () => {
  showServiceModal.value = true
}

const closeServiceModal = () => {
  showServiceModal.value = false
  selectedService.value = null
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
/* Decorative and subtle animations to enrich the design without changing layout */
.decor-blob{ transform-origin: center; animation: float 8s ease-in-out infinite; }
.decor-blob:nth-child(2){ animation-duration: 10s; }

.pulse-cta{ animation: pulse 3.5s ease-in-out infinite; }

.fade-up{ animation: fadeUp .9s ease both; }

/* Blob animation for background elements */
.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

/* About, Service, Values Cards animations */
.about-card {
  animation: slideInUp 0.8s ease-out;
}

.mission-card {
  animation: slideInUp 1s ease-out 0.2s both;
}

.service-card {
  animation: slideInUp 0.8s ease-out;
}

.service-card:nth-child(2) {
  animation-delay: 0.1s;
}

.service-card:nth-child(3) {
  animation-delay: 0.2s;
}

.solution-card {
  animation: slideInUp 0.6s ease-out;
}

.solution-card:nth-child(2) {
  animation-delay: 0.1s;
}

.solution-card:nth-child(3) {
  animation-delay: 0.2s;
}

.value-card {
  animation: slideInUp 0.8s ease-out;
}

.value-card:nth-child(1) { animation-delay: 0s; }
.value-card:nth-child(2) { animation-delay: 0.1s; }
.value-card:nth-child(3) { animation-delay: 0.2s; }
.value-card:nth-child(4) { animation-delay: 0.3s; }
.value-card:nth-child(5) { animation-delay: 0.4s; }
.value-card:nth-child(6) { animation-delay: 0.5s; }

.services-title {
  animation: slideInDown 0.8s ease-out;
}

@keyframes float{
  0%{ transform: translateY(0) scale(1); }
  50%{ transform: translateY(-12px) scale(1.02); }
  100%{ transform: translateY(0) scale(1); }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
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

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes headingReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scaleY(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}

@keyframes cardBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes shimmer {
  0%, 100% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Contact section refinements */
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(26, 58, 107, 0.2);
}

.heading-reveal {
  animation: headingReveal 0.8s ease-out 0.3s both;
}

.card-bounce {
  animation: cardBounce 3s ease-in-out infinite;
}

.shimmer-effect {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  background-size: 1000px 100%;
  animation: shimmer 3s infinite;
}

.wheel-ring {
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(59, 130, 246, 0.22);
  border-radius: 9999px;
}

.wheel-center {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 220px;
  height: 220px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel-item {
  position: absolute;
  width: 170px;
  min-height: 110px;
  border-radius: 28px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.08);
}

.wheel-item span {
  display: block;
  margin-top: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.wheel-top {
  top: 0;
  left: 50%;
  transform: translate(-50%, -10%);
}

.wheel-right-top {
  top: 10%;
  right: 0;
  transform: translate(6%, 0);
}

.wheel-right-bottom {
  bottom: 10%;
  right: 0;
  transform: translate(6%, 0);
}

.wheel-bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 10%);
}

.wheel-left-bottom {
  bottom: 10%;
  left: 0;
  transform: translate(-6%, 0);
}

.wheel-left-top {
  top: 10%;
  left: 0;
  transform: translate(-6%, 0);
}

.card-contact{
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.1);
  animation: slideInUp 0.8s ease-out;
  transition: all 0.3s ease;
}

.card-contact:hover {
  background: rgba(255,255,255,0.12);
  transform: translateY(-4px);
}

.icon-circle{
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.card-contact:hover .icon-circle {
  background: rgba(255,255,255,0.2);
  transform: scale(1.1) rotate(5deg);
}

.social-btn{
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid rgba(255,255,255,0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  color: white;
  font-weight: 600;
  transition: all 300ms ease;
  position: relative;
  animation: slideInUp 0.8s ease-out;
}

.social-btn:nth-child(1) { animation-delay: 0.1s; }
.social-btn:nth-child(2) { animation-delay: 0.2s; }
.social-btn:nth-child(3) { animation-delay: 0.3s; }

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
  transform: translateY(-2px);
}

.social-btn:hover:after{
  transform: scaleX(1);
}

/* Hero social-proof / testimonial */
.testimonial{ border-left: 4px solid rgba(255,255,255,0.06); }
.hero-trust img{
  opacity: 0.9;
  filter: grayscale(20%);
  transition: transform .3s, opacity .3s;
}
.hero-trust img:hover{
  transform: translateY(-3px) scale(1.05);
  opacity: 1;
  filter: none;
}
</style>
