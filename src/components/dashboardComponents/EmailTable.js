import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, XIcon, Edit2Icon, RefreshCwIcon } from 'lucide-react';
import DeactivateAccountModal from '../modal/DeactivateAccountModal';
import AccountActivatedModal from '../modal/AccountActivatedModal';
import UpdateEmailDataModal from '../modal/UpdateEmailDataModal';
import { motion } from 'framer-motion';

const EmailCard = ({ email, onCopy, copied, onActivate, onDeactivate, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{email.address}</h3>
          <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => onCopy(email.address)}
  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
>
  {copied === email.address ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
</motion.button>
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><span className="font-medium">Encaminha para:</span> {email.forwarding}</p>
          <p><span className="font-medium">Finalidade:</span> {email.purpose}</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            email.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
            'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {email.status === 'active' ? 'Ativo' : 'Inativo'}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => email.status === 'active' ? onDeactivate(email) : onActivate(email)}
              className={`p-2 rounded-full ${
                email.status === 'active' ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-100' :
                'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100'
              }`}
            >
              {email.status === 'active' ? <XIcon size={18} /> : <RefreshCwIcon size={18} />}
            </button>
            <button
              onClick={() => onUpdate(email)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-100"
            >
              <Edit2Icon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailTable = ({ isLoading, emails = [], loadEmails }) => {
  const [copied, setCopied] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(email);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleOpenDeactivateModal = (email) => {
    setSelectedEmail(email);
    setIsDeactivateModalOpen(true);
  };

  const handleOpenActivateModal = (email) => {
    setSelectedEmail(email);
    setIsActivateModalOpen(true);
  };

  const handleOpenUpdateModal = (email) => {
    setSelectedEmail(email);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsDeactivateModalOpen(false);
    setIsActivateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedEmail(null);
    loadEmails();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!emails || emails.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No emails found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {emails.map((email) => (
        <EmailCard
          key={email.address}
          email={email}
          onCopy={handleCopyEmail}
          copied={copied}
          onActivate={handleOpenActivateModal}
          onDeactivate={handleOpenDeactivateModal}
          onUpdate={handleOpenUpdateModal}
        />
      ))}
      {isDeactivateModalOpen && selectedEmail && (
        <DeactivateAccountModal
          redirectmail={selectedEmail.forwarding}
          email={selectedEmail.address}
          onClose={handleCloseModals}
        />
      )}
      {isActivateModalOpen && selectedEmail && (
        <AccountActivatedModal
          redirectmail={selectedEmail.forwarding}
          email={selectedEmail.address}
          onClose={handleCloseModals}
        />
      )}
      {isUpdateModalOpen && selectedEmail && (
        <UpdateEmailDataModal
          redirectmail={selectedEmail.forwarding}
          email={selectedEmail.address}
          onClose={handleCloseModals}
          purpose={selectedEmail.purpose}
        />
      )}
    </div>
  );
};

export default EmailTable;