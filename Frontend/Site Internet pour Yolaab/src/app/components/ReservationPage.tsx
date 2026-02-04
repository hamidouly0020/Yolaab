import { useState } from 'react';
import { Car, Home as HomeIcon, Building2, Sofa, User, Mail, Phone, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ReservationPageProps {
  onReservationSubmit?: (data: ReservationData) => void;
}

export interface ReservationData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  typeService: string;
  nombreFauteuils?: number;
  date: string;
  heure: string;
}

export function ReservationPage({ onReservationSubmit }: ReservationPageProps) {
  const [formData, setFormData] = useState<ReservationData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    typeService: '',
    nombreFauteuils: 1,
    date: '',
    heure: '',
  });

  const services = [
    {
      id: 'voiture',
      icon: Car,
      label: 'Voiture',
      emoji: '🚗',
      color: 'bg-blue-500',
    },
    {
      id: 'maison',
      icon: HomeIcon,
      label: 'Maison',
      emoji: '🏠',
      color: 'bg-green-500',
    },
    {
      id: 'bureau',
      icon: Building2,
      label: 'Bureau',
      emoji: '🏢',
      color: 'bg-purple-500',
    },
    {
      id: 'salon',
      icon: Sofa,
      label: 'Salon',
      emoji: '🛋️',
      color: 'bg-orange-500',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.typeService || !formData.date || !formData.heure) {
      toast.error('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (onReservationSubmit) {
      onReservationSubmit(formData);
    }

    toast.success('✅ Réservation enregistrée avec succès!');
    
    // Reset form
    setFormData({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      typeService: '',
      nombreFauteuils: 1,
      date: '',
      heure: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            📅 Réservation
          </h1>
          <p className="text-xl text-gray-600">
            Réservez votre service en quelques clics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
              <User size={28} />
              Vos Informations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <span>👤</span>
                    <span>Nom *</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <span>👤</span>
                    <span>Prénom *</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder="Votre prénom"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <Phone size={20} />
                    <span>Téléphone *</span>
                  </span>
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder="+221 XX XXX XX XX"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <Mail size={20} />
                    <span>Email</span>
                  </span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
          </div>

          {/* Service Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Choisissez Votre Service *
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = formData.typeService === service.id;
                
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, typeService: service.id })}
                    className={`relative p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                        <Check size={20} />
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-5xl mb-3">{service.emoji}</div>
                      <Icon size={32} className="mx-auto mb-2 text-blue-600" />
                      <p className="font-bold text-lg">{service.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Number of Sofas */}
          {formData.typeService === 'salon' && (
            <div className="mb-8">
              <label className="block mb-4">
                <span className="text-xl font-bold text-blue-600 flex items-center gap-2">
                  <Sofa size={24} />
                  Nombre de Fauteuils
                </span>
              </label>
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, nombreFauteuils: Math.max(1, (formData.nombreFauteuils || 1) - 1) })}
                  className="bg-blue-500 text-white w-16 h-16 rounded-xl hover:bg-blue-600 transition-all text-3xl"
                >
                  −
                </button>
                <div className="text-5xl font-bold text-blue-600 w-24 text-center">
                  {formData.nombreFauteuils}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, nombreFauteuils: (formData.nombreFauteuils || 1) + 1 })}
                  className="bg-blue-500 text-white w-16 h-16 rounded-xl hover:bg-blue-600 transition-all text-3xl"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
              <Calendar size={28} />
              Date et Heure *
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <span>📅</span>
                    <span>Date</span>
                  </span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">
                  <span className="flex items-center gap-2 text-lg">
                    <span>🕐</span>
                    <span>Heure</span>
                  </span>
                </label>
                <input
                  type="time"
                  value={formData.heure}
                  onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center justify-center gap-3">
              <Check size={28} />
              <span className="text-2xl font-bold">CONFIRMER LA RÉSERVATION</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
