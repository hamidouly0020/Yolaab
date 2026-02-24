import { Car, Home as HomeIcon, Building2, Sofa, Check, MapPin, Phone, Calendar, Users, Clipboard, Star, Target, XCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const services = [
    {
      icon: Car,
      title: 'Lavage Voiture',
      description: 'Nettoyage complet de votre véhicule',
      image: 'https://images.unsplash.com/photo-1760827797819-4361cd5cd353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3YXNoJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc2OTkzNzA1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: HomeIcon,
      title: 'Lavage Maison',
      description: 'Nettoyage de votre domicile',
      image: 'https://images.unsplash.com/photo-1581578949510-fa7315c4c350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwc2VydmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk5NzU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Building2,
      title: 'Lavage Bureau',
      description: 'Nettoyage de vos bureaux',
      image: 'https://images.unsplash.com/photo-1701651545983-c3b357a8387f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjbGVhbmluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njk5NzU5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Sofa,
      title: 'Lavage Salon',
      description: 'Nettoyage de vos meubles',
      image: 'https://images.unsplash.com/photo-1684165610413-2401399e0e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBzb2ZhJTIwY2xlYW5pbmd8ZW58MXx8fHwxNzY5OTc1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const features = [
    { icon: Check, text: 'Service Rapide' },
    { icon: Check, text: 'Professionnels' },
    { icon: Check, text: 'Prix Abordables' },
    { icon: Check, text: 'Qualité Garantie' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue chez YOLAAB
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              «Simplifier votre quotidien en professionnalisant les services domestiques, afin de libérer votre temps pour l'essentiel.»
            </p>
            <button
              onClick={() => onNavigate('reservation')}
              className="bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center gap-3">
                <Calendar size={24} className="text-blue-600" />
                <span className="text-xl font-bold">RÉSERVER MAINTENANT</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Presentation Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Qui est YOLAAB */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Qui est YOLAAB ?</h2>
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                YOLAAB est une entreprise qui structure et professionnalise le secteur des services domestiques, un secteur essentiel mais encore largement dominé par l'informel.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Nous construisons un écosystème intégré capable d'offrir aux ménages et aux entreprises une solution fiable, centralisée et professionnelle pour leurs besoins quotidiens.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed font-semibold text-blue-700">
                YOLAAB n'est pas un simple prestataire. C'est une organisation structurée qui transforme un marché fragmenté en une expérience cohérente et rassurante.
              </p>
            </div>
          </div>

          {/* Le problème que nous résolvons */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Le problème que nous résolvons</h2>
            <p className="text-lg text-gray-800 text-center mb-8">Le secteur domestique souffre d'un manque de structuration.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                'Prestataires peu encadrés',
                'Qualité irrégulière',
                'Manque de garanties',
                'Absence de standards clairs',
                'Multiplication des interlocuteurs',
                'Déficit de confiance'
              ].map((problem, idx) => (
                <div key={idx} className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="text-red-500 mb-3"><XCircle size={28} /></div>
                  <p className="font-semibold text-gray-800">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notre solution */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Notre solution : un écosystème intégré</h2>
            <p className="text-lg text-gray-800 text-center mb-12">
              YOLAAB développe un écosystème intégré de services domestiques avec un principe simple : <span className="font-bold">un seul interlocuteur, plusieurs solutions, un standard unique de qualité.</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Équipes formées et encadrées', Icon: Users },
                { title: 'Processus clairs', Icon: Clipboard },
                { title: 'Suivi client rigoureux', Icon: Check },
                { title: 'Homogénéité de standards', Icon: Star },
                { title: 'Logique de qualité continue', Icon: Target },
                { title: 'Organisation avant improvisation', Icon: Building2 }
              ].map((solution, idx) => (
                <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <div className="mb-3 text-blue-600"><solution.Icon size={28} /></div>
                  <p className="font-semibold text-gray-800">{solution.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notre impact social */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Notre impact social</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-800 text-center mb-8">YOLAAB contribue activement à la transformation sociale du secteur domestique.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Formalisation des métiers',
                  'Professionnalisation des travailleurs',
                  'Création d\'emplois structurés',
                  'Amélioration des conditions de travail',
                  'Valorisation de compétences souvent invisibles'
                ].map((impact, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="text-yellow-400"><Star size={20} /></div>
                    <p className="text-gray-800 font-medium">{impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nos valeurs */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Nos valeurs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Fiabilité', 'Excellence', 'Responsabilité', 'Respect', 'Rigueur', 'Engagement'].map((value, idx) => (
                <div key={idx} className="bg-blue-100 rounded-xl p-6 text-center">
                  <p className="font-bold text-blue-800">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-8 italic">
              Ces principes guident chacune de nos décisions et structurent notre développement.
            </p>
          </div>

          {/* Vision et Ambitions */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Notre vision et nos ambitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4"><Target size={20} className="inline-block mr-2" />Notre Vision</h3>
                <p className="text-lg leading-relaxed">
                  Devenir la référence régionale des services domestiques professionnels. Nous bâtissons un modèle scalable, organisé et durable, capable de transformer en profondeur un secteur essentiel.
                </p>
              </div>
              <div className="bg-purple-600 text-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4"><Star size={20} className="inline-block mr-2" />Nos Ambitions</h3>
                <ul className="text-lg space-y-3">
                  <li className="flex items-center gap-3"><Check size={16} />Construire une marque forte et rassurante</li>
                  <li className="flex items-center gap-3"><Check size={16} />Structurer durablement le marché</li>
                  <li className="flex items-center gap-3"><Check size={16} />Déployer notre modèle à grande échelle</li>
                  <li className="flex items-center gap-3"><Check size={16} />Générer un impact économique et social</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-12">
          Nos Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                onClick={() => onNavigate('reservation')}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <Icon size={40} />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pourquoi Choisir YOLAAB?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <p className="text-lg font-bold">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Contactez-Nous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <MapPin size={32} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xl">Adresse</p>
                <p className="text-gray-600 text-lg">Keur Massar, Dakar, Sénégal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Phone size={32} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-xl">Téléphone</p>
                <p className="text-gray-600 text-lg">+221 XX XXX XX XX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
