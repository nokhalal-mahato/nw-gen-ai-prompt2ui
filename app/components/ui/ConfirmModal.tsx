import React from 'react';
import BaseModal from './BaseModal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-4 py-2 rounded hover:bg-gray-200" onClick={onClose}>
          No
        </button>
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Yes
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
