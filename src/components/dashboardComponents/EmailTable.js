import React, { useState } from 'react';
import { CopyIcon, CheckIcon, XIcon, Edit2Icon, RefreshCwIcon, Loader } from 'lucide-react';
import DeactivateAccountModal from '../modal/DeactivateAccountModal';
import AccountActivatedModal from '../modal/AccountActivatedModal';
import UpdateEmailDataModal from '../modal/UpdateEmailDataModal';
import { motion, AnimatePresence } from 'framer-motion';

const EmailCard = ({ email, onCopy, copied, onActivate, onDeactivate, onUpdate, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  const bgColor = index % 2 === 0 ? 'bg-gray-50 dark:bg-teal-900' : 'bg-gray-50 dark:bg-teal-800';

  return (
    <motion.div 
      className={`rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${bgColor}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-sm font-semibold text-teal-900 dark:text-teal-100 truncate"
            animate={{ x: isHovered ? 5 : 0 }}
          >
            {email.address}
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCopy(email.address)}
            className="text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100"
          >
            {copied === email.address ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          </motion.button>
        </div>
        <motion.div 
          className="space-y-2 text-sm text-teal-700 dark:text-teal-200"
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          <p><span className="font-medium">Encaminha para:</span> {email.forwarding}</p>
          <p><span className="font-medium">Finalidade:</span> {email.purpose}</p>
        </motion.div>
      </div>
      <div className="bg-white bg-opacity-50 dark:bg-teal-700 dark:bg-opacity-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.span 
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              email.status === 'active' ? 'bg-teal-200 text-teal-800 dark:bg-teal-600 dark:text-teal-100' :
              'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
            }`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {email.status === 'active' ? 'Ativo' : 'Inativo'}
          </motion.span>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => email.status === 'active' ? onDeactivate(email) : onActivate(email)}
              className={`p-2 rounded-full ${
                email.status === 'active' ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-100' :
                'bg-teal-100 text-teal-600 dark:bg-teal-800 dark:text-teal-100'
              }`}
            >
              {email.status === 'active' ? <XIcon size={18} /> : <RefreshCwIcon size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdate(email)}
              className="p-2 rounded-full bg-teal-100 text-teal-600 dark:bg-teal-800 dark:text-teal-100"
            >
              <Edit2Icon size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 justify-center items-center ">
              <Loader className="h-10 w-10 animate-spin text-primary" />
            </div>
    );
  }

  if (!emails || emails.length === 0) {
    return (
      <motion.div 
        className="text-center py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 dark:text-gray-400">No emails found.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
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
      </AnimatePresence>
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
    </motion.div>
  );
};

export default EmailTable;