import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';

interface LoadingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'loading' | 'success';
  repoUrl?: string;
}

const LoadingSuccessModal: React.FC<LoadingSuccessModalProps> = ({ isOpen, onClose, status, repoUrl }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose(); // Close modal after 2 seconds
      }, 2000);

      return () => {
        clearTimeout(timer);
        setShowSuccess(false);
      };
    }
  }, [status, onClose]);

  const copyToClipboard = () => {
    if (repoUrl) {
      navigator.clipboard.writeText(repoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5s
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center justify-center p-6">
        {status === 'loading' && (
          <>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-800">Pushing code to GitHub...</p>
          </>
        )}

        {showSuccess && (
          <div className="flex flex-col items-center">
            <div className="text-green-500 text-3xl">✔</div>
            <p className="mt-3 text-green-400 text-lg font-medium">Code pushed successfully!</p>
            {repoUrl && (
              <div className="bg-gray-100 border border-gray-700 rounded-lg p-3 mt-3 w-full text-center">
                <p className="text-gray-800 text-sm break-words select-all">{repoUrl}</p>
                <div className="flex justify-center mt-2">
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 text-sm font-medium mr-3"
                  >
                    🔗 Open in GitHub
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center text-gray-500 hover:text-white text-sm"
                  >
                    📋 {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default LoadingSuccessModal;
