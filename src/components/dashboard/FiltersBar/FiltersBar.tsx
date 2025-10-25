import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { SortByDate, SortByPrice } from '../../../types';
import './FiltersBar.scss';

interface FiltersBarProps {
  sortByDate: SortByDate;
  sortByPrice: SortByPrice;
  onSortByDateChange: (sort: SortByDate) => void;
  onSortByPriceChange: (sort: SortByPrice) => void;
  onAddClick: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ sortByDate, sortByPrice, onSortByDateChange, onSortByPriceChange, onAddClick }) => {
  return (
    <div className="filters-bar">
      <div className="filters-bar__label">
        <Filter size={20} />
        <span className="filters-bar__label-text">Filters:</span>
      </div>
      <div className="filters-bar__field">
        <label className="filters-bar__field-label">Sort by Date</label>
        <select value={sortByDate} onChange={(e) => onSortByDateChange(e.target.value as SortByDate)} className="filters-bar__select">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div className="filters-bar__field">
        <label className="filters-bar__field-label">Sort by Price</label>
        <select value={sortByPrice} onChange={(e) => onSortByPriceChange(e.target.value as SortByPrice)} className="filters-bar__select">
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>
      <button onClick={onAddClick} className="filters-bar__add-btn"><Plus size={20} />Add New Wish</button>
    </div>
  );
};
