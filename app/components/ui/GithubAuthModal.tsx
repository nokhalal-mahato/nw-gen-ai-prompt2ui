import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BaseModal from './BaseModal';

interface GitHubAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (username: string, token: string) => void;
  status: 'loading' | 'success' | 'failed' | 'initial';
}

const GitHubAuthModal: React.FC<GitHubAuthModalProps> = ({ isOpen, onClose, onConfirm, status }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const githubUsername = Cookies.get('githubUsername');
    const githubToken = Cookies.get('githubToken');

    if (githubUsername) {
      setUsername(githubUsername);
    } else {
      setUsername('');
    }

    if (githubToken) {
      setToken(githubToken);
    } else {
      setToken('');
    }

    setError('');
  }, [isOpen]);

  const handleSubmit = () => {
    if (!username.trim() || !token.trim()) {
      setError('Both fields are required.');
      return;
    }

    onConfirm(username.trim(), token.trim());
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
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white w-16 text-center"
          disabled={status === 'loading'}
          onClick={handleSubmit}
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin m-auto"></div>
          ) : (
            <div>OK</div>
          )}
        </button>
      </div>
    </BaseModal>
  );
};

export default GitHubAuthModal;
