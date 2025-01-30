import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';

interface GitHubAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, token: string) => void;
}

const GitHubAuthModal: React.FC<GitHubAuthModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setToken('');
    setError('');
  }, [isOpen]);

  const handleSubmit = () => {
    if (!username.trim() || !token.trim()) {
      setError('Both fields are required.');
      return;
    }

    onConfirm(username.trim(), token.trim());
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Enter GitHub Credentials">
      <input
        type="text"
        className="w-full mt-2 p-3 bg-gray-100 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="GitHub Username"
      />
      <input
        type="password"
        className="w-full mt-2 p-3 bg-gray-100 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="GitHub Token"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}
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

export default GitHubAuthModal;
