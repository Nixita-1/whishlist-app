import React, { useState } from 'react';
import { WishProvider } from './context/WishContext';
import { Dashboard } from './components/dashboard/Dashboard/Dashboard';
import { WishDetailPage } from './components/detail/WishDetailPage/WishDetailPage';
import { Wish } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'detail'>('dashboard');
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const handleViewWish = (wish: Wish) => {
    setSelectedWish(wish);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedWish(null);
  };

  return (
    <WishProvider>
      {currentView === 'dashboard' ? (
        <Dashboard onViewWish={handleViewWish} />
      ) : selectedWish ? (
        <WishDetailPage wish={selectedWish} onBack={handleBackToDashboard} />
      ) : null}
    </WishProvider>
  );
};

export default App;
