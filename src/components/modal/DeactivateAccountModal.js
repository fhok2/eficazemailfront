import React, { useState } from "react";
import { useMail } from "@/hooks/useMail";

const DeactivateAccountModal = ({ redirectmail, email, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { cancelEmailForward } = useMail();

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const updateLocalStorage = () => {
    const storageData = JSON.parse(localStorage.getItem("emailData"));
    if (storageData) {
      const updatedEmails = storageData.emails.map((emailItem) => {
        if (emailItem.address === email) {
          return { ...emailItem, status: "inactive" };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emailData",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await cancelEmailForward({ email, forwardTo: redirectmail });
      updateLocalStorage();
      handleModalClose();
    } catch (error) {
      console.error("Error cancelling email forward:", error);
    } finally {
      setIsLoading(false);
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
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h4 className="text-lg text-gray-100 font-semibold mb-5">
            Desativar <br /> Redirecionamento de E-mail
          </h4>
          <p className="text-gray-300 font-medium">
            Você está prestes a desativar o redirecionamento do e-mail{" "}
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
            disabled={isLoading}
            className={`inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 ${
              isLoading
                ? "bg-teal-500 cursor-not-allowed"
                : "bg-teal-700 hover:bg-teal-600"
            } rounded-lg transition duration-200`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Desativando...
              </span>
            ) : (
              "Desativar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateAccountModal;
