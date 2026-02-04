import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface RecruitmentPageProps {
  onApplicationSubmit?: (data: ApplicationData) => void;
}

export interface ApplicationData {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  poste: string;
  experience: string;
  message: string;
}

export function RecruitmentPage({ onApplicationSubmit }: RecruitmentPageProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    poste: '',
    experience: '',
    message: '',
  });

  const postes = [
    { id: 'laveur', label: 'Laveur', emoji: '🧹' },
    { id: 'chauffeur', label: 'Chauffeur', emoji: '🚗' },
    { id: 'manager', label: 'Manager', emoji: '👔' },
    { id: 'technicien', label: 'Technicien', emoji: '🔧' },
  ];

  const experiences = [
    { id: 'debutant', label: 'Débutant (0-1 an)', emoji: '🌱' },
    { id: 'intermediaire', label: 'Intermédiaire (1-3 ans)', emoji: '📈' },
    { id: 'confirme', label: 'Confirmé (3-5 ans)', emoji: '⭐' },
    { id: 'expert', label: 'Expert (5+ ans)', emoji: '🏆' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.poste || !formData.experience) {
      toast.error('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (onApplicationSubmit) {
      onApplicationSubmit(formData);
    }

    toast.success('✅ Candidature envoyée avec succès! Nous vous contacterons bientôt.');
    
    // Reset form
    setFormData({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      poste: '',
      experience: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            💼 Rejoignez Notre Équipe
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            YOLAAB recrute des talents passionnés
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Team Image */}
        <div className="mb-12">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1627669915725-d0c8a0002fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29yayUyMGNsZWFuaW5nJTIwc3RhZmZ8ZW58MXx8fHwxNzY5OTc1OTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Équipe YOLAAB"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 -mt-8 mx-4 relative z-10">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
              Pourquoi Travailler chez YOLAAB?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">💰</div>
                <p className="font-bold">Bon Salaire</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">📚</div>
                <p className="font-bold">Formation</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🤝</div>
                <p className="font-bold">Équipe Sympa</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🎯</div>
                <p className="font-bold">Évolution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
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

          {/* Position Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-3">
              <Briefcase size={28} />
              Poste Souhaité *
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {postes.map((poste) => {
                const isSelected = formData.poste === poste.id;
                
                return (
                  <button
                    key={poste.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, poste: poste.id })}
                    className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{poste.emoji}</div>
                      <p className="font-bold text-lg">{poste.label}</p>
                    </div>
                    {isSelected && (
                      <div className="mt-2 flex justify-center">
                        <Check size={24} className="text-blue-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Votre Expérience *
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.map((exp) => {
                const isSelected = formData.experience === exp.id;
                
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience: exp.id })}
                    className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{exp.emoji}</div>
                      <p className="font-bold text-lg text-left">{exp.label}</p>
                    </div>
                    {isSelected && (
                      <div className="mt-2 flex justify-end">
                        <Check size={24} className="text-blue-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block mb-2">
              <span className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <span>✍️</span>
                <span>Message (Optionnel)</span>
              </span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              rows={4}
              placeholder="Parlez-nous de vous..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <span className="flex items-center justify-center gap-3">
              <Upload size={28} />
              <span className="text-2xl font-bold">ENVOYER MA CANDIDATURE</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
