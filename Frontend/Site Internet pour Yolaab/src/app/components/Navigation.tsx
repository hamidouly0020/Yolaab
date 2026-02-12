import { Home, Calendar, Users, ShoppingBag, UserCircle } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'reservation', icon: Calendar, label: 'Réserver' },
    { id: 'recruitment', icon: Users, label: 'Travailler' },
    { id: 'shop', icon: ShoppingBag, label: 'Boutique' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="bg-white text-blue-600 rounded-full p-2 flex items-center justify-center w-12 h-12">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 100 100">
                  <text x="50" y="75" fontSize="80" fontWeight="bold" textAnchor="middle" fill="currentColor">Y</text>
                </svg>
              </div>
              <span className="text-3xl font-bold">YOLAAB</span>
            </div>
            
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex flex-col items-center px-6 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'hover:bg-blue-500'
                    }`}
                  >
                    <Icon size={28} />
                    <span className="mt-1">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => onNavigate('admin')}
                className={`flex flex-col items-center px-6 py-3 rounded-lg transition-all ${
                  currentPage === 'admin'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'hover:bg-blue-500'
                }`}
              >
                <UserCircle size={28} />
                <span className="mt-1">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="bg-blue-600 text-white text-center py-4 shadow-lg">
          <h1 className="text-3xl font-bold">YOLAAB</h1>
          <p className="text-sm mt-1">Keur Massar, Dakar</p>
        </div>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white shadow-lg z-50">
          <div className="flex justify-around items-center h-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center justify-center flex-1 h-full ${
                    currentPage === item.id
                      ? 'bg-blue-500'
                      : ''
                  }`}
                >
                  <Icon size={28} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                currentPage === 'admin'
                  ? 'bg-blue-500'
                  : ''
              }`}
            >
              <UserCircle size={28} />
              <span className="text-xs mt-1">Admin</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
