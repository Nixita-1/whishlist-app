import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import './Snackbar.scss';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`snackbar snackbar--${type}`}>
      {type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
      <span className="snackbar__message">{message}</span>
      <button onClick={onClose} className="snackbar__close">
        <X size={16} />
      </button>
    </div>
  );
};
