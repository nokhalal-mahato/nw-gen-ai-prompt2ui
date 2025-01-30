import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';

interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  placeholder: string;
  defaultValue?: string;
}

const TextInputModal: React.FC<TextInputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  placeholder,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue);
    }

    setError('');
  }, [isOpen, defaultValue]);

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setError('This field cannot be empty.');
      return;
    }

    onConfirm(inputValue.trim());
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <input
        type="text"
        className="w-full mt-2 p-3 bg-gray-100 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-4 py-2 rounded hover:bg-gray-200" onClick={onClose}>
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white" onClick={handleSubmit}>
          OK
        </button>
      </div>
    </BaseModal>
  );
};

export default TextInputModal;
