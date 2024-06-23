import React, { useState } from "react";
import { useMail } from "@/hooks/useMail";

const AccountActivatedModal = ({ redirectmail, email, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { activateEmailForward } = useMail();

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const updateLocalStorage = () => {
    const storageData = JSON.parse(localStorage.getItem("emailData"));
    if (storageData) {
      const updatedEmails = storageData.emails.map((emailItem) => {
        if (emailItem.address === email) {
          return { ...emailItem, status: "active" };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emails",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleDeactivate = async () => {
    try {
      await activateEmailForward({ email, forwardTo: redirectmail });
      updateLocalStorage();
      handleModalClose();
    } catch (error) {
      console.error("Error cancelling email forward:", error);
    }
  };
  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 bg-gray-800 bg-opacity-80 overflow-y-auto ${
        !isModalOpen ? "hidden" : ""
      }`}
    >
      <div className="max-w-xl w-full mx-auto bg-gray-500 rounded-xl overflow-hidden">
        <div className="max-w-sm mx-auto pt-12 pb-8 px-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-gray-600 rounded-full">
            <svg
              class="h-8 w-8 text-teal-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <circle cx="12" cy="12" r="10" />{" "}
              <line x1="12" y1="16" x2="12" y2="12" />{" "}
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <h4 className="text-lg text-gray-100 font-semibold mb-5">
            Reativar <br/> Redirecionamento de E-mail
          </h4>
          <p className="text-gray-300 font-medium">
            Você está prestes a reativar o redirecionamento do e-mail{" "}
            <span className="font-semibold text-gray-50">{email}</span> para{" "}
            <span className="font-semibold text-gray-50">{redirectmail}</span>.
            Esta ação não é permanente e pode ser revertida a qualquer momento.
          </p>
        </div>
        <div className="pt-5 pb-6 px-6 text-right bg-gray-600 -mb-2">
          <button
            onClick={handleModalClose}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeactivate}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-teal-700 hover:bg-teal-600 rounded-lg transition duration-200"
          >
            Reativar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountActivatedModal;
