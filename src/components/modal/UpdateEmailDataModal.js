import React, { useState, useEffect } from "react";
import { useMail } from "@/hooks/useMail";

const UpdateEmailDataModal = ({ redirectmail, email, onClose, purpose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [redirectMail, setRedirectMail] = useState(redirectmail);
  const [emailPurpose, setEmailPurpose] = useState(purpose);
  const { updateEmailForward } = useMail();

  const handleModalClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    setRedirectMail(redirectmail);
    setEmailPurpose(purpose);
  }, [redirectmail, purpose]);

  const updateLocalStorage = () => {
    const storageData = JSON.parse(localStorage.getItem("emailData"));
    if (storageData) {
      const updatedEmails = storageData.emails.map((emailItem) => {
        if (emailItem.address === email) {
          return {
            ...emailItem,
            forwarding: redirectMail,
            purpose: emailPurpose,
            status: "active"
          };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emailData",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleUpdateMail = async () => {
    try {
      await updateEmailForward({
        userEmail: email,
        clientEmail: email,
        forwardingEmail: redirectMail,
        purpose: emailPurpose,
      });
     
      updateLocalStorage();
      handleModalClose();
    } catch (error) {
      console.error("Error updating email forward:", error);
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
              className="h-8 w-8 text-primary"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </div>
          <h4 className="text-lg text-gray-100 font-semibold mb-5">
            Atualizar <br /> dados redirecionamento
          </h4>
          <p className="text-gray-300 font-medium">
            Você está prestes a atualizar os dados de redirecionamento do e-mail{" "}
            <span className="font-semibold text-gray-50">{email}</span> .
            Esta ação não é permanente e pode ser revertida a qualquer momento.
          </p>
          <form className="mt-10">
            <div className="relative w-full h-14 py-4 px-3 mb-10 border border-gray-400 focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                Email
              </span>
              <input
                className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium"
                id="modalInput7-1"
                type="email"
                value={email}
                disabled
              />
            </div>
            <div className="relative w-full h-14 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
              <span className="absolute flex gap-2 bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                Encaminha para:
                <svg
                  className="h-4 w-4 text-primary"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </span>
              <input
                className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium"
                id="modalInput7-5"
                type="text"
                value={redirectMail}
                onChange={(e) => setRedirectMail(e.target.value)}
              />
            </div>
            <div className="relative w-full h-14 py-4 px-3 mb-6 border border-gray-400 focus-within:border-primary rounded-lg">
              <span className="absolute flex gap-2 bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">
                Finalidade
                <svg
                  className="h-4 w-4 text-primary"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </span>
              <input
                className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium"
                id="modalInput7-5"
                type="text"
                value={emailPurpose}
                onChange={(e) => setEmailPurpose(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="pt-5 pb-6 px-6 text-right bg-gray-600 -mb-2">
          <button
            onClick={handleModalClose}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdateMail}
            className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-teal-700 hover:bg-teal-600 rounded-lg transition duration-200"
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmailDataModal;
