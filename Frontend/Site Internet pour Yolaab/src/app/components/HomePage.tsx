import { Car, Home as HomeIcon, Building2, Sofa, Check, MapPin, Phone } from 'lucide-react';
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
              Votre Expert en Nettoyage à Keur Massar
            </p>
            <button
              onClick={() => onNavigate('reservation')}
              className="bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="text-xl font-bold">RÉSERVER MAINTENANT</span>
              </span>
            </button>
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
