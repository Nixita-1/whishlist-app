import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Modal } from '../Modal/Modal';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  title?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  title = 'Confirm Action',
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="confirm-modal">
        <div className="confirm-modal__header">
          <div className="confirm-modal__icon-wrapper">
            <AlertCircle className="confirm-modal__icon" size={24} />
          </div>
          <h3 className="confirm-modal__title">{title}</h3>
        </div>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button onClick={onConfirm} className="confirm-modal__btn confirm-modal__btn--confirm">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="confirm-modal__btn confirm-modal__btn--cancel">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
