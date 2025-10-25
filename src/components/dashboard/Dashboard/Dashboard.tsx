import React, { useState } from 'react';
import { Wish } from '../../../types';
import { useWishContext } from '../../../context/WishContext';
import { FiltersBar } from '../FiltersBar/FiltersBar';
import { WishGrid } from '../../wish/WishGrid/WishGrid';
import { Modal } from '../../common/Modal/Modal';
import { WishForm } from '../../wish/WishForm/WishForm';
import { ChevronDown } from 'lucide-react';
import './Dashboard.scss';

interface DashboardProps {
  onViewWish: (wish: Wish) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onViewWish }) => {
  const { filteredWishes, addWish, sortByDate, sortByPrice, setSortByDate, setSortByPrice } = useWishContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedWishes = filteredWishes.slice(0, page * itemsPerPage);
  const hasMore = paginatedWishes.length < filteredWishes.length;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">✨ My Wish List</h1>
          <p className="dashboard__subtitle">Track and manage all your dreams in one place</p>
        </div>
        <FiltersBar sortByDate={sortByDate} sortByPrice={sortByPrice} onSortByDateChange={setSortByDate} onSortByPriceChange={setSortByPrice} onAddClick={() => setShowAddModal(true)} />
        <WishGrid wishes={paginatedWishes} onViewWish={onViewWish} />
        {hasMore && (
          <div className="dashboard__load-more">
            <button onClick={() => setPage(page + 1)} className="dashboard__load-more-btn">Load More<ChevronDown size={20} /></button>
          </div>
        )}
        {filteredWishes.length === 0 && (
          <div className="dashboard__empty">
            <div className="dashboard__empty-icon">🎯</div>
            <p className="dashboard__empty-text">No wishes yet. Start adding your dreams! 🌟</p>
            <button onClick={() => setShowAddModal(true)} className="dashboard__empty-btn">Add Your First Wish</button>
          </div>
        )}
      </div>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}><WishForm onSubmit={addWish} onClose={() => setShowAddModal(false)} /></Modal>
    </div>
  );
};
