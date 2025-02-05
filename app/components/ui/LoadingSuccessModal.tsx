import React, { useState } from 'react';
import BaseModal from './BaseModal';

interface LoadingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'loading' | 'success' | 'failed' | 'initial';
  repoUrl?: string;
}

const LoadingSuccessModal: React.FC<LoadingSuccessModalProps> = ({ isOpen, onClose, status, repoUrl }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (repoUrl) {
      navigator.clipboard.writeText(repoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5s
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="">
      <button
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 bg-transparent transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="i-ph:x-circle block text-2xl"></span> {/* Ensure icon is visible */}
      </button>

      <div className="flex flex-col items-center justify-center p-6">
        {status === 'loading' && (
          <>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-800">Pushing code to GitHub...</p>
          </>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <span className="i-ph:check-circle text-green-500 text-3xl"></span> {/* Success checkmark */}
            <p className="mt-3 text-green-400 text-lg font-medium">Code pushed successfully!</p>
            {repoUrl && (
              <div className="bg-gray-100 border border-gray-700 rounded-lg p-3 mt-3 w-full text-center">
                <p className="text-gray-800 text-sm break-words select-all">{repoUrl}</p>
                <div className="flex justify-center mt-2">
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-500 text-sm font-medium mr-3 flex items-center"
                  >
                    <span className="i-ph:link text-sm mr-1"></span>
                    Open in GitHub
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center text-gray-500 hover:text-gray-800 text-sm"
                  >
                    <span className="i-ph:copy text-sm mr-1"></span>
                    {copied ? 'Copied' : 'Copy'}
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
