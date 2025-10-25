import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { Wish } from '../../../types';
import { useWishContext } from '../../../context/WishContext';
import { ConfirmModal } from '../../common/ConfirmModal/ConfirmModal';
import { Modal } from '../../common/Modal/Modal';
import { WishForm } from '../../wish/WishForm/WishForm';
import { getProxiedImageUrl } from '../../../utils/imageProxy';
import './WishDetailPage.scss';

interface WishDetailPageProps {
  wish: Wish;
  onBack: () => void;
}

export const WishDetailPage: React.FC<WishDetailPageProps> = ({ wish, onBack }) => {
  const { updateWish, deleteWish } = useWishContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDelete = async () => {
    const success = await deleteWish(wish.id);
    if (success) onBack();
  };

  const handleUpdate = async (data: Omit<Wish, 'id' | 'createdAt'>) => {
    return await updateWish(wish.id, data);
  };

  return (
    <div className="detail-page">
      <div className="container container--small">
        <button onClick={onBack} className="detail-page__back-link"><ArrowLeft size={20} />Back to Dashboard</button>
        <div className="detail-page__card">
          <div className="detail-page__image-container">
            {!imageError ? (
              <img src={getProxiedImageUrl(wish.imageUrl)} alt={wish.title} className="detail-page__image" onError={() => setImageError(true)} />
            ) : (
              <div className="detail-page__image-placeholder">
                <div className="detail-page__image-icon">📷</div>
                <p className="detail-page__image-text">Image unavailable</p>
              </div>
            )}
          </div>
          <div className="detail-page__content">
            <div className="detail-page__header">
              <h1 className="detail-page__title">{wish.title}</h1>
              <div className="detail-page__meta">
                <div className="detail-page__meta-item"><Calendar size={16} /><span>Added on {new Date(wish.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                <div className="detail-page__meta-item"><DollarSign size={16} /><span>${wish.price.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="detail-page__description">
              <h2 className="detail-page__description-title">Description</h2>
              <p className="detail-page__description-text">{wish.description}</p>
            </div>
            <div className="detail-page__price-box">
              <p className="detail-page__price-label">Total Price</p>
              <p className="detail-page__price-value">${wish.price.toFixed(2)}</p>
            </div>
            <div className="detail-page__actions">
              <button onClick={() => setShowEditModal(true)} className="detail-page__btn detail-page__btn--edit"><Edit size={20} />Update Wish</button>
              <button onClick={() => setShowDeleteModal(true)} className="detail-page__btn detail-page__btn--delete"><Trash2 size={20} />Delete Wish</button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal isOpen={showDeleteModal} onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} message="Are you sure you want to delete this wish? This action cannot be undone." title="Delete Wish" />
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}><WishForm initialData={wish} onSubmit={handleUpdate} onClose={() => setShowEditModal(false)} /></Modal>
    </div>
  );
};
