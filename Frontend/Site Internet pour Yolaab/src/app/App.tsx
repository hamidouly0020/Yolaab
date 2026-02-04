import { useState } from 'react';
import { Toaster } from 'sonner';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ReservationPage, ReservationData } from './components/ReservationPage';
import { RecruitmentPage, ApplicationData } from './components/RecruitmentPage';
import { ShopPage } from './components/ShopPage';
import { AdminPage } from './components/AdminPage';

type Page = 'home' | 'reservation' | 'recruitment' | 'shop' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const handleReservation = (data: ReservationData) => {
    setReservations([...reservations, data]);
  };

  const handleApplication = (data: ApplicationData) => {
    setApplications([...applications, data]);
  };

  const handleOrder = (items: any[], total: number) => {
    setOrders([...orders, { items, total }]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'reservation':
        return <ReservationPage onReservationSubmit={handleReservation} />;
      case 'recruitment':
        return <RecruitmentPage onApplicationSubmit={handleApplication} />;
      case 'shop':
        return <ShopPage onOrderSubmit={handleOrder} />;
      case 'admin':
        return (
          <AdminPage
            reservations={reservations}
            applications={applications}
            orders={orders}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
