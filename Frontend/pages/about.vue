<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-24 md:pb-8">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-24 md:py-32 fade-up">
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -right-32 -top-32 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute -left-32 -bottom-32 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>
      <div class="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div class="inline-block mb-6">
          <span class="text-sm md:text-base font-bold tracking-widest text-blue-100 uppercase letter-spacing-wide slide-in-left">Découvrez Notre Histoire</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight hero-title">
          À PROPOS DE YOLAAB
        </h1>
        <div class="h-1 w-24 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mx-auto mb-8"></div>
        <p class="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed hero-subtitle">
          Simplifiez votre quotidien, libérez votre temps pour l'essentiel.
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="max-w-6xl mx-auto px-4 py-20 relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="mission-content">
          <h2 class="text-5xl font-black text-blue-900 mb-6 heading-reveal">Notre Mission</h2>
          <p class="text-gray-700 text-lg mb-4 leading-8 opacity-animation">
            YOLAAB c'est une nouvelle manière d'organiser son quotidien tout en créant des opportunités. 
            Nous professionnalisons les services domestiques pour libérer votre temps et créer des emplois.
          </p>
          <p class="text-gray-700 text-lg leading-8 opacity-animation delay-100">
            Notre écosystème intégré apporte une solution centralisée et structurée aux besoins domestiques des particuliers et entreprises.
          </p>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-10 mission-card hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 icon-bounce">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-blue-900 mb-6 text-center">Nos Objectifs</h3>
          <ul class="space-y-4 text-gray-700">
            <li class="flex items-start gap-4 opacity-animation" style="animation-delay: 0s">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mt-1">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="font-semibold text-gray-800">Offrir des services domestiques de qualité</span>
            </li>
            <li class="flex items-start gap-4 opacity-animation" style="animation-delay: 0.1s">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mt-1">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="font-semibold text-gray-800">Créer un emploi décent et valorisé</span>
            </li>
            <li class="flex items-start gap-4 opacity-animation" style="animation-delay: 0.2s">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mt-1">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="font-semibold text-gray-800">Former et accompagner notre jeunesse</span>
            </li>
            <li class="flex items-start gap-4 opacity-animation" style="animation-delay: 0.3s">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center mt-1">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="font-semibold text-gray-800">Centraliser les services en un seul écosystème</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="max-w-7xl mx-auto px-4 py-16 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -right-40 -top-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div class="absolute -left-40 -bottom-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <div class="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-6 md:p-10 relative z-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-200/50 about-card">
        <div class="mb-5 text-5xl text-blue-600 opacity-10 absolute top-6 right-6 animate-pulse">✓</div>
        <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-5 heading-reveal">Qui est Yolaab ?</h2>
        <p class="text-lg text-gray-700 leading-10 mb-5 hover:text-gray-900 transition-colors">
          Yolaab est une entreprise qui structure et professionnalise le secteur des services domestiques,
          un secteur essentiel mais encore largement dominé par l'informel. Nous construisons un écosystème
          intégré capable d'offrir aux ménages et aux entreprises une solution fiable, centralisée et
          professionnelle pour leurs besoins quotidiens.
        </p>
        <p class="text-lg text-gray-700 leading-10 mb-6 hover:text-gray-900 transition-colors">
          Yolaab n'est pas un simple prestataire. C'est une organisation structurée qui transforme un
          marché fragmenté en une expérience cohérente et rassurante. Nous remplaçons l'improvisation
          par l'organisation.
        </p>
        <div class="relative p-5 md:p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border-l-4 border-blue-600 mission-card">
          <p class="text-xl md:text-2xl font-bold text-blue-700">
            Notre mission
          </p>
          <p class="text-lg text-gray-800 mt-3 leading-8">
            Simplifier votre quotidien en professionnalisant les services domestiques,
            afin de libérer votre temps pour l'essentiel.
          </p>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-gradient-to-b from-white to-blue-50 py-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute left-0 top-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div class="absolute right-0 bottom-0 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-6000"></div>
      </div>
      <div class="max-w-6xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-black text-blue-900 mb-4 heading-reveal">Nos Valeurs</h2>
          <div class="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Value 1 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Intégrité</h3>
            <p class="text-gray-700 leading-7">Nous agissons avec honnêteté et transparence dans toutes nos relations avec nos clients et nos partenaires.</p>
          </div>

          <!-- Value 2 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Innovation</h3>
            <p class="text-gray-700 leading-7">Nous cherchons constamment des solutions nouvelles pour améliorer l'expérience de nos utilisateurs.</p>
          </div>

          <!-- Value 3 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🤝</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Collaboration</h3>
            <p class="text-gray-700 leading-7">Nous croyons en la force de la collaboration pour créer un écosystème durable et prospère.</p>
          </div>

          <!-- Value 4 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Excellence</h3>
            <p class="text-gray-700 leading-7">Nous nous engageons à fournir des services de la plus haute qualité à chaque instant.</p>
          </div>

          <!-- Value 5 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💡</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Responsabilité</h3>
            <p class="text-gray-700 leading-7">Nous sommes responsables de l'impact de nos actions sur la société et l'environnement.</p>
          </div>

          <!-- Value 6 -->
          <div class="value-card group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🌱</div>
            <h3 class="text-2xl font-bold text-blue-900 mb-3">Durabilité</h3>
            <p class="text-gray-700 leading-7">Nous construisons une entreprise durable qui crée de la valeur à long terme pour tous.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Choose Yolaab -->
    <div class="max-w-6xl mx-auto px-4 py-20 relative">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-black text-blue-900 mb-4 heading-reveal">Pourquoi Choisir Yolaab ?</h2>
        <div class="h-1 w-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mx-auto"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="benefit-card group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">1</div>
            <h3 class="text-xl font-bold text-blue-900">Un Interlocuteur Unique</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Un seul point de contact pour tous vos besoins domestiques, simplifiant votre gestion quotidienne.</p>
        </div>

        <div class="benefit-card group bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-teal-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">2</div>
            <h3 class="text-xl font-bold text-teal-900">Organisation Structurée</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Une structure professionnelle garantissant cohérence et qualité dans tous nos services.</p>
        </div>

        <div class="benefit-card group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">3</div>
            <h3 class="text-xl font-bold text-green-900">Standard de Qualité</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Des standards élevés de qualité appliqués de manière cohérente à tous nos services.</p>
        </div>

        <div class="benefit-card group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">4</div>
            <h3 class="text-xl font-bold text-orange-900">Services Connectés</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Tous nos services travaillent en synergie pour vous offrir une expérience intégrée.</p>
        </div>

        <div class="benefit-card group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">5</div>
            <h3 class="text-xl font-bold text-purple-900">Profils Qualifiés</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Une base de données de profils qualifiés, formés et accompagnés professionnellement.</p>
        </div>

        <div class="benefit-card group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-pink-200 overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="flex items-center gap-4 mb-4 relative z-10">
            <div class="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">6</div>
            <h3 class="text-xl font-bold text-pink-900">Soutien à la Jeunesse</h3>
          </div>
          <p class="text-gray-700 leading-7 relative z-10">Nous formons et accompagnons notre jeunesse pour créer des opportunités d'emploi durables.</p>
        </div>
      </div>
    </div>

    <!-- Ecosystem Section -->
    <div class="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white py-20 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -right-32 -top-32 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute -left-32 bottom-0 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div class="max-w-6xl mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-black mb-4 hero-title">Un Écosystème pour Notre Jeunesse</h2>
          <div class="h-1 w-24 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="ecosystem-card bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 icon-bounce">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center">Formation</h3>
            <p class="text-blue-100 leading-7 text-center">Nous formons notre jeunesse aux compétences essentielles pour réussir dans leur carrière.</p>
          </div>

          <div class="ecosystem-card bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 icon-bounce" style="animation-delay: 0.1s">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center">Accompagnement</h3>
            <p class="text-blue-100 leading-7 text-center">Nous accompagnons chaque collaborateur dans son développement personnel et professionnel.</p>
          </div>

          <div class="ecosystem-card bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-6 icon-bounce" style="animation-delay: 0.2s">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center">Opportunités</h3>
            <p class="text-blue-100 leading-7 text-center">Nous créons des opportunités d'emploi et développons leur potentiel entrepreneurial.</p>
          </div>
        </div>

        <div class="mt-16 text-center">
          <p class="text-2xl font-bold text-blue-100 italic">
            "C'est l'humain au centre de notre écosystème."
          </p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="max-w-6xl mx-auto px-4 py-20 text-center relative">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 md:p-16 border border-blue-200 overflow-hidden relative group">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute -right-32 -top-32 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div class="relative z-10">
          <h2 class="text-5xl font-black text-blue-900 mb-6 heading-reveal">Prêt à Rejoindre Yolaab ?</h2>
          <p class="text-gray-700 text-xl mb-8 max-w-2xl mx-auto leading-8">
            Découvrez comment nos services peuvent simplifier votre quotidien et libérer votre temps pour l'essentiel.
          </p>
          <NuxtLink
            to="/reservation"
            class="inline-flex items-center gap-3 bg-blue-900 text-white px-12 py-4 rounded-full hover:bg-blue-950 transition-all transform hover:scale-105 font-bold text-lg shadow-lg hover:shadow-xl group"
          >
            Découvrir nos Services
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'À Propos - Yolaab',
})
</script>

<style scoped>
/* ===== ANIMATIONS ===== */
.fade-up {
  animation: fadeUp 0.9s ease both;
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.hero-title {
  animation: fadeUp 0.8s ease-out 0.2s both;
}

.hero-subtitle {
  animation: fadeUp 0.8s ease-out 0.4s both;
}

.heading-reveal {
  animation: headingReveal 0.8s ease-out 0.3s both;
}

.mission-content {
  animation: slideInLeft 0.8s ease-out 0.2s both;
}

.mission-card {
  animation: slideInRight 0.8s ease-out 0.3s both;
}

.about-card {
  animation: slideInUp 0.8s ease-out;
}

.value-card {
  animation: slideInUp 0.6s ease-out;
}

.value-card:nth-child(1) { animation-delay: 0s; }
.value-card:nth-child(2) { animation-delay: 0.1s; }
.value-card:nth-child(3) { animation-delay: 0.2s; }
.value-card:nth-child(4) { animation-delay: 0.3s; }
.value-card:nth-child(5) { animation-delay: 0.4s; }
.value-card:nth-child(6) { animation-delay: 0.5s; }

.benefit-card {
  animation: slideInUp 0.6s ease-out;
}

.benefit-card:nth-child(1) { animation-delay: 0s; }
.benefit-card:nth-child(2) { animation-delay: 0.1s; }
.benefit-card:nth-child(3) { animation-delay: 0.2s; }
.benefit-card:nth-child(4) { animation-delay: 0.3s; }
.benefit-card:nth-child(5) { animation-delay: 0.4s; }
.benefit-card:nth-child(6) { animation-delay: 0.5s; }

.ecosystem-card {
  animation: slideInUp 0.6s ease-out;
}

.ecosystem-card:nth-child(1) { animation-delay: 0s; }
.ecosystem-card:nth-child(2) { animation-delay: 0.15s; }
.ecosystem-card:nth-child(3) { animation-delay: 0.3s; }

.opacity-animation {
  animation: fadeInOpacity 0.8s ease-out forwards;
  opacity: 0;
}

.opacity-animation.delay-100 {
  animation-delay: 0.1s;
}

.icon-bounce {
  animation: bounce 2s ease-in-out infinite;
}

/* ===== KEYFRAME ANIMATIONS ===== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
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

@keyframes fadeInOpacity {
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

/* ===== HOVER EFFECTS ===== */
.value-card {
  transition: all 0.3s ease;
}

.benefit-card {
  transition: all 0.3s ease;
}

.ecosystem-card {
  transition: all 0.3s ease;
}
</style>
