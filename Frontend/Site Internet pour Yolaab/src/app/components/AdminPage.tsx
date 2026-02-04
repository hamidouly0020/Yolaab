import { useState } from 'react';
import { Users, Calendar, FileText, DollarSign, Plus, Trash2, Eye, Lock } from 'lucide-react';
import { ReservationData } from './ReservationPage';
import { ApplicationData } from './RecruitmentPage';
import { toast } from 'sonner';

interface Worker {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  telephone: string;
  dateEmbauche: string;
}

interface Invoice {
  id: string;
  client: string;
  service: string;
  montant: number;
  date: string;
  statut: 'payé' | 'en attente';
}

interface Product {
  id: string;
  nom: string;
  description: string;
  prix: number;
  quantite: number;
  categorie: string;
}

interface AdminPageProps {
  reservations: ReservationData[];
  applications: ApplicationData[];
  orders: any[];
}

export function AdminPage({ reservations, applications, orders }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'reservations' | 'applications' | 'workers' | 'invoices' | 'orders' | 'products'>('reservations');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newWorker, setNewWorker] = useState({
    nom: '',
    prenom: '',
    poste: '',
    telephone: '',
    dateEmbauche: '',
  });

  const [newInvoice, setNewInvoice] = useState({
    client: '',
    service: '',
    montant: '',
    date: '',
    statut: 'en attente' as 'payé' | 'en attente',
  });

  const [newProduct, setNewProduct] = useState({
    nom: '',
    description: '',
    prix: '',
    quantite: '',
    categorie: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, use proper authentication
    if (password === 'yolaab2026') {
      setIsAuthenticated(true);
      toast.success('✅ Connexion réussie');
    } else {
      toast.error('❌ Mot de passe incorrect');
    }
  };

  const addWorker = (e: React.FormEvent) => {
    e.preventDefault();
    const worker: Worker = {
      id: Date.now().toString(),
      ...newWorker,
    };
    setWorkers([...workers, worker]);
    setNewWorker({ nom: '', prenom: '', poste: '', telephone: '', dateEmbauche: '' });
    setShowAddWorker(false);
    toast.success('✅ Travailleur ajouté avec succès');
  };

  const deleteWorker = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id));
    toast.success('✅ Travailleur supprimé');
  };

  const addInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice: Invoice = {
      id: Date.now().toString(),
      ...newInvoice,
      montant: parseFloat(newInvoice.montant),
    };
    setInvoices([...invoices, invoice]);
    setNewInvoice({ client: '', service: '', montant: '', date: '', statut: 'en attente' });
    setShowAddInvoice(false);
    toast.success('✅ Facture créée avec succès');
  };

  const toggleInvoiceStatus = (id: string) => {
    setInvoices(invoices.map(inv =>
      inv.id === id
        ? { ...inv, statut: inv.statut === 'payé' ? 'en attente' : 'payé' }
        : inv
    ));
    toast.success('✅ Statut mis à jour');
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...editingProduct, prix: parseFloat(editingProduct.prix.toString()), quantite: parseInt(editingProduct.quantite.toString()) }
          : p
      ));
      toast.success('✅ Produit modifié avec succès');
      setEditingProduct(null);
    } else {
      const product: Product = {
        id: Date.now().toString(),
        nom: newProduct.nom,
        description: newProduct.description,
        prix: parseFloat(newProduct.prix),
        quantite: parseInt(newProduct.quantite),
        categorie: newProduct.categorie,
      };
      setProducts([...products, product]);
      toast.success('✅ Produit ajouté avec succès');
    }
    setNewProduct({ nom: '', description: '', prix: '', quantite: '', categorie: '' });
    setShowAddProduct(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('✅ Produit supprimé');
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddProduct(true);
    setNewProduct({
      nom: product.nom,
      description: product.description,
      prix: product.prix.toString(),
      quantite: product.quantite.toString(),
      categorie: product.categorie,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-blue-100 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Espace Admin
            </h1>
            <p className="text-gray-600">
              Connexion requise
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2 font-bold">
                🔐 Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              SE CONNECTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            👨‍💼 Espace Administrateur
          </h1>
          <p className="text-lg opacity-90">
            Gestion de YOLAAB
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'reservations'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Calendar size={20} />
              <span className="hidden md:inline">Réservations</span>
              <span className="md:hidden">Rés.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {reservations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'applications'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <FileText size={20} />
              <span className="hidden md:inline">Candidatures</span>
              <span className="md:hidden">Cand.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('workers')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'workers'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Users size={20} />
              <span className="hidden md:inline">Travailleurs</span>
              <span className="md:hidden">Trav.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {workers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'invoices'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <DollarSign size={20} />
              <span className="hidden md:inline">Factures</span>
              <span className="md:hidden">Fact.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {invoices.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'orders'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <FileText size={20} />
              <span className="hidden md:inline">Commandes</span>
              <span className="md:hidden">Cmd.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all ${
                activeTab === 'products'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Plus size={20} />
              <span className="hidden md:inline">Produits</span>
              <span className="md:hidden">Prod.</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm font-bold">
                {products.length}
              </span>
            </button>
          </div>
        </div>

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              📅 Réservations ({reservations.length})
            </h2>
            {reservations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-xl text-gray-600">Aucune réservation pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-4">Client</th>
                      <th className="text-left p-4">Téléphone</th>
                      <th className="text-left p-4">Service</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Heure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50">
                        <td className="p-4">
                          <div className="font-bold">{res.prenom} {res.nom}</div>
                          {res.email && <div className="text-sm text-gray-600">{res.email}</div>}
                        </td>
                        <td className="p-4">{res.telephone}</td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                            {res.typeService}
                          </span>
                          {res.nombreFauteuils && (
                            <span className="ml-2 text-sm">({res.nombreFauteuils} fauteuils)</span>
                          )}
                        </td>
                        <td className="p-4">{res.date}</td>
                        <td className="p-4">{res.heure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              📄 Candidatures ({applications.length})
            </h2>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-xl text-gray-600">Aucune candidature pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-4">Candidat</th>
                      <th className="text-left p-4">Téléphone</th>
                      <th className="text-left p-4">Poste</th>
                      <th className="text-left p-4">Expérience</th>
                      <th className="text-left p-4">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, index) => (
                      <tr key={index} className="border-b hover:bg-blue-50">
                        <td className="p-4">
                          <div className="font-bold">{app.prenom} {app.nom}</div>
                          {app.email && <div className="text-sm text-gray-600">{app.email}</div>}
                        </td>
                        <td className="p-4">{app.telephone}</td>
                        <td className="p-4">
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                            {app.poste}
                          </span>
                        </td>
                        <td className="p-4">{app.experience}</td>
                        <td className="p-4 max-w-xs">
                          {app.message || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Workers Tab */}
        {activeTab === 'workers' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                👥 Travailleurs ({workers.length})
              </h2>
              <button
                onClick={() => setShowAddWorker(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                <span>Ajouter</span>
              </button>
            </div>

            {showAddWorker && (
              <form onSubmit={addWorker} className="bg-blue-50 p-6 rounded-xl mb-6">
                <h3 className="font-bold text-xl mb-4">➕ Nouveau Travailleur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nom"
                    value={newWorker.nom}
                    onChange={(e) => setNewWorker({ ...newWorker, nom: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={newWorker.prenom}
                    onChange={(e) => setNewWorker({ ...newWorker, prenom: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Poste"
                    value={newWorker.poste}
                    onChange={(e) => setNewWorker({ ...newWorker, poste: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={newWorker.telephone}
                    onChange={(e) => setNewWorker({ ...newWorker, telephone: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Date d'embauche"
                    value={newWorker.dateEmbauche}
                    onChange={(e) => setNewWorker({ ...newWorker, dateEmbauche: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddWorker(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {workers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-xl text-gray-600">Aucun travailleur enregistré</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-4">Nom</th>
                      <th className="text-left p-4">Poste</th>
                      <th className="text-left p-4">Téléphone</th>
                      <th className="text-left p-4">Date d'embauche</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workers.map((worker) => (
                      <tr key={worker.id} className="border-b hover:bg-blue-50">
                        <td className="p-4 font-bold">{worker.prenom} {worker.nom}</td>
                        <td className="p-4">
                          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                            {worker.poste}
                          </span>
                        </td>
                        <td className="p-4">{worker.telephone}</td>
                        <td className="p-4">{worker.dateEmbauche}</td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteWorker(worker.id)}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                💰 Factures ({invoices.length})
              </h2>
              <button
                onClick={() => setShowAddInvoice(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                <span>Créer</span>
              </button>
            </div>

            {showAddInvoice && (
              <form onSubmit={addInvoice} className="bg-blue-50 p-6 rounded-xl mb-6">
                <h3 className="font-bold text-xl mb-4">➕ Nouvelle Facture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nom du client"
                    value={newInvoice.client}
                    onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Service"
                    value={newInvoice.service}
                    onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Montant (FCFA)"
                    value={newInvoice.montant}
                    onChange={(e) => setNewInvoice({ ...newInvoice, montant: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="date"
                    value={newInvoice.date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <select
                    value={newInvoice.statut}
                    onChange={(e) => setNewInvoice({ ...newInvoice, statut: e.target.value as 'payé' | 'en attente' })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="en attente">En attente</option>
                    <option value="payé">Payé</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
                  >
                    Créer
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddInvoice(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {invoices.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💰</div>
                <p className="text-xl text-gray-600">Aucune facture créée</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left p-4">Client</th>
                      <th className="text-left p-4">Service</th>
                      <th className="text-left p-4">Montant</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b hover:bg-blue-50">
                        <td className="p-4 font-bold">{invoice.client}</td>
                        <td className="p-4">{invoice.service}</td>
                        <td className="p-4 font-bold text-blue-600">
                          {invoice.montant.toLocaleString()} FCFA
                        </td>
                        <td className="p-4">{invoice.date}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full ${
                              invoice.statut === 'payé'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-orange-100 text-orange-600'
                            }`}
                          >
                            {invoice.statut === 'payé' ? '✅ Payé' : '⏳ En attente'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleInvoiceStatus(invoice.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                          >
                            Changer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {invoices.length > 0 && (
              <div className="mt-6 bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center justify-between text-xl font-bold text-blue-600">
                  <span>TOTAL:</span>
                  <span>{invoices.reduce((sum, inv) => sum + inv.montant, 0).toLocaleString()} FCFA</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              🛒 Commandes ({orders.length})
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-xl text-gray-600">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div key={index} className="border-2 border-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">Commande #{index + 1}</h3>
                      <span className="text-xl font-bold text-blue-600">
                        {order.total.toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.emoji}</span>
                            <span>{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold">x{item.quantity}</span>
                            <span className="ml-4">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                🛍️ Produits ({products.length})
              </h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({ nom: '', description: '', prix: '', quantite: '', categorie: '' });
                  setShowAddProduct(true);
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                <span>Ajouter</span>
              </button>
            </div>

            {showAddProduct && (
              <form onSubmit={addProduct} className="bg-blue-50 p-6 rounded-xl mb-6">
                <h3 className="font-bold text-xl mb-4">
                  {editingProduct ? '✏️ Modifier Produit' : '➕ Nouveau Produit'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={newProduct.nom}
                    onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Catégorie"
                    value={newProduct.categorie}
                    onChange={(e) => setNewProduct({ ...newProduct, categorie: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none md:col-span-2"
                    rows={3}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Prix (FCFA)"
                    value={newProduct.prix}
                    onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    step="0.01"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantité"
                    value={newProduct.quantite}
                    onChange={(e) => setNewProduct({ ...newProduct, quantite: e.target.value })}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all"
                  >
                    {editingProduct ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProduct(false);
                      setEditingProduct(null);
                      setNewProduct({ nom: '', description: '', prix: '', quantite: '', categorie: '' });
                    }}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-xl text-gray-600">Aucun produit enregistré</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="border-2 border-blue-100 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-blue-600 mb-2">{product.nom}</h3>
                      <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {product.categorie}
                      </span>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg text-blue-600">
                          {product.prix.toLocaleString()} FCFA
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <span>Stock: </span>
                        <span className={`font-bold ${product.quantite > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.quantite} unités
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditProduct(product)}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Eye size={18} />
                        <span className="hidden md:inline">Modifier</span>
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Nombre de produits</p>
                    <p className="text-2xl font-bold text-blue-600">{products.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Valeur totale</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {products.reduce((sum, p) => sum + (p.prix * p.quantite), 0).toLocaleString()} FCFA
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Stock total</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {products.reduce((sum, p) => sum + p.quantite, 0)} unités
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
