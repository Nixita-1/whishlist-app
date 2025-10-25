import React from 'react';
import { Wish } from '../../../types';
import { WishCard } from '../WishCard/WishCard';
import './WishGrid.scss';

interface WishGridProps {
  wishes: Wish[];
  onViewWish: (wish: Wish) => void;
}

export const WishGrid: React.FC<WishGridProps> = ({ wishes, onViewWish }) => {

  return (
    <div className="wish-grid">
      {wishes.map((wish) => (
        <WishCard key={wish.id} wish={wish} onView={() => onViewWish(wish)} />
      ))}
    </div>
  );
};
