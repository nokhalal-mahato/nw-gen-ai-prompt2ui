import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-black shadow-lg"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm z-1001"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </Modal>
  );
};

export default BaseModal;
