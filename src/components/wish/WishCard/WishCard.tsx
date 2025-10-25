import React, { useState } from 'react';
import { Trash2, Edit, Eye } from 'lucide-react';
import { Wish } from '../../../types';
import { useWishContext } from '../../../context/WishContext';
import { ConfirmModal } from '../../common/ConfirmModal/ConfirmModal';
import { Modal } from '../../common/Modal/Modal';
import { WishForm } from '../WishForm/WishForm';
import { getProxiedImageUrl } from '../../../utils/imageProxy';
import './WishCard.scss';

interface WishCardProps {
  wish: Wish;
  onView: () => void;
}

export const WishCard: React.FC<WishCardProps> = ({ wish, onView }) => {
  const { updateWish, deleteWish } = useWishContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    await deleteWish(wish.id);
    setShowDeleteModal(false);
  };

  const handleUpdate = async (data: Omit<Wish, 'id' | 'createdAt'>) => {
    return await updateWish(wish.id, data);
  };

  return (
    <>
      <div className="wish-card">
        <div className="wish-card__image-container">
          {!imageError ? (
            <img src={getProxiedImageUrl(wish.imageUrl)} alt={wish.title} className="wish-card__image" onError={() => setImageError(true)} loading="lazy" />
          ) : (
            <div className="wish-card__image-placeholder">
              <div className="wish-card__image-icon">📷</div>
              <p className="wish-card__image-text">Image unavailable</p>
            </div>
          )}
        </div>
        <div className="wish-card__content">
          <h3 className="wish-card__title">{wish.title}</h3>
          <p className="wish-card__description">{wish.description}</p>
          <p className="wish-card__price">${wish.price.toFixed(2)}</p>
          <div className="wish-card__actions">
            <button onClick={() => setShowEditModal(true)} className="wish-card__btn wish-card__btn--edit"><Edit size={16} /><span>Edit</span></button>
            <button onClick={() => setShowDeleteModal(true)} className="wish-card__btn wish-card__btn--delete"><Trash2 size={16} /><span>Delete</span></button>
            <button onClick={onView} className="wish-card__btn wish-card__btn--view"><Eye size={16} /><span>View</span></button>
          </div>
        </div>
      </div>
      <ConfirmModal isOpen={showDeleteModal} onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} message="Are you sure you want to delete this wish?" title="Delete Wish" />
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}><WishForm initialData={wish} onSubmit={handleUpdate} onClose={() => setShowEditModal(false)} /></Modal>
    </>
  );
};
