import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  emoji: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShopPageProps {
  onOrderSubmit?: (cart: CartItem[], total: number) => void;
}

export function ShopPage({ onOrderSubmit }: ShopPageProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Shampooing Auto',
      price: 5000,
      description: 'Shampooing professionnel pour voiture',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'voiture',
      emoji: '🚗',
    },
    {
      id: '2',
      name: 'Cire Protection',
      price: 8000,
      description: 'Cire de protection longue durée',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'voiture',
      emoji: '✨',
    },
    {
      id: '3',
      name: 'Nettoyant Multi-Surface',
      price: 3500,
      description: 'Nettoyant pour toutes surfaces',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'maison',
      emoji: '🏠',
    },
    {
      id: '4',
      name: 'Désinfectant Sol',
      price: 4000,
      description: 'Désinfectant puissant pour sols',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'maison',
      emoji: '🧹',
    },
    {
      id: '5',
      name: 'Nettoyant Tissus',
      price: 6000,
      description: 'Nettoyant spécial tissus et moquettes',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'salon',
      emoji: '🛋️',
    },
    {
      id: '6',
      name: 'Polish Meubles',
      price: 4500,
      description: 'Polish pour meubles en bois',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'maison',
      emoji: '✨',
    },
    {
      id: '7',
      name: 'Pack Éponges',
      price: 2000,
      description: 'Pack de 5 éponges professionnelles',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'accessoires',
      emoji: '🧽',
    },
    {
      id: '8',
      name: 'Kit Microfibres',
      price: 3000,
      description: 'Kit de 10 chiffons microfibres',
      image: 'https://images.unsplash.com/photo-1758887262204-a49092d85f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHByb2R1Y3RzJTIwc2hvcHxlbnwxfHx8fDE3Njk5NzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'accessoires',
      emoji: '🧻',
    },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast.success(`✅ ${product.name} ajouté au panier`);
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('⚠️ Votre panier est vide');
      return;
    }

    if (onOrderSubmit) {
      onOrderSubmit(cart, getTotal());
    }

    toast.success('✅ Commande enregistrée! Nous vous contacterons pour la livraison.');
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                🛒 Boutique YOLAAB
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Produits professionnels
              </p>
            </div>
            
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-white text-blue-600 p-4 rounded-full hover:bg-blue-50 transition-all shadow-lg"
            >
              <ShoppingCart size={32} />
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 text-3xl">
                  {product.emoji}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price.toLocaleString()} FCFA
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2"
                  >
                    <Plus size={20} />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Drawer */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 md:flex md:items-center md:justify-center">
            <div className="bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-2xl md:max-w-2xl w-full overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingCart size={28} />
                  Mon Panier
                </h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-xl text-gray-600">Votre panier est vide</p>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 mb-4 pb-4 border-b"
                      >
                        <div className="text-4xl">{item.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-gray-600">
                            {item.price.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 text-gray-700 w-10 h-10 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="text-xl font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-blue-500 text-white w-10 h-10 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="bg-blue-50 p-6 rounded-xl mb-6">
                      <div className="flex items-center justify-between text-2xl font-bold text-blue-600">
                        <span>TOTAL</span>
                        <span>{getTotal().toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <Check size={28} />
                        <span className="text-2xl font-bold">COMMANDER</span>
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
