import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { Wish } from '../../../types';
import { getProxiedImageUrl, getSuggestedImageUrls, isValidImageUrl } from '../../../utils/imageProxy';
import './WishForm.scss';

interface WishFormProps {
  initialData?: Wish;
  onSubmit: (data: Omit<Wish, 'id' | 'createdAt'>) => Promise<boolean>;
  onClose: () => void;
}

export const WishForm: React.FC<WishFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedUrls = getSuggestedImageUrls();

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.imageUrl) {
      alert('Please fill in all fields');
      return;
    }
    if (!isValidImageUrl(formData.imageUrl)) {
      alert('Please enter a valid image URL');
      return;
    }
    setIsSubmitting(true);
    const success = await onSubmit({
      ...formData,
      imageUrl: getProxiedImageUrl(formData.imageUrl),
    });
    setIsSubmitting(false);
    if (success) onClose();
  };

  return (
    <div className="wish-form">
      <h2 className="wish-form__title">{initialData ? 'Update Wish' : 'Add New Wish'}</h2>
      <div className="wish-form__fields">
        <div className="wish-form__field">
          <label className="wish-form__label">Title <span className="required">*</span></label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="wish-form__input" placeholder="e.g., MacBook Pro" />
        </div>
        <div className="wish-form__field">
          <label className="wish-form__label">Description <span className="required">*</span></label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="wish-form__textarea" rows={3} placeholder="Describe your wish..." />
        </div>
        <div className="wish-form__field">
          <label className="wish-form__label">Price ($) <span className="required">*</span></label>
          <input type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} className="wish-form__input" placeholder="0.00" />
        </div>
        <div className="wish-form__field">
          <label className="wish-form__label">Image URL <span className="required">*</span></label>
          <div className="wish-form__input-wrapper">
            <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} onFocus={() => !formData.imageUrl && setShowSuggestions(true)} className="wish-form__input wish-form__input--with-icon" placeholder="https://example.com/image.jpg" />
            <Image className="wish-form__input-icon" size={20} />
          </div>
          <div className="wish-form__field-footer">
            <p className="wish-form__hint">Use images from Unsplash, Pexels, or Pixabay</p>
            <button type="button" onClick={() => setShowSuggestions(!showSuggestions)} className="wish-form__toggle">{showSuggestions ? 'Hide' : 'Show'} Examples</button>
          </div>
          {showSuggestions && (
            <div className="wish-form__suggestions">
              <p className="wish-form__suggestions-label">Click to use:</p>
              <div className="wish-form__suggestions-list">
                {suggestedUrls.map((url, index) => (
                  <button key={index} type="button" onClick={() => { setFormData({ ...formData, imageUrl: url }); setShowSuggestions(false); }} className="wish-form__suggestion-item">{url}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        {formData.imageUrl && (
          <div className="wish-form__preview">
            <p className="wish-form__preview-label">Image Preview:</p>
            <div className="wish-form__preview-container">
              <img src={getProxiedImageUrl(formData.imageUrl)} alt="Preview" className="wish-form__preview-img" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL'; }} />
            </div>
          </div>
        )}
      </div>
      <div className="wish-form__actions">
        <button onClick={handleSubmit} disabled={isSubmitting} className="wish-form__btn wish-form__btn--primary">{isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add Wish'}</button>
        <button onClick={onClose} disabled={isSubmitting} className="wish-form__btn wish-form__btn--secondary">Cancel</button>
      </div>
    </div>
  );
};
