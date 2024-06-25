"use client";

import { CopyIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen ";
import DeactivateAccountModal from "../modal/DeactivateAccountModal";
import AccountActivatedModal from "../modal/AccountActivatedModal";
import UpdateEmailDataModal from "../modal/UpdateEmailDataModal";

const EmailTable = ({ isLoading, loadEmails }) => {
  const [emails, setEmails] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState("");
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [redirectmail, setRedirectMail] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    const updateEmails = () => {
      const storedEmails = JSON.parse(localStorage.getItem("emailData"));
      if (storedEmails) {
        setEmails(storedEmails.emails);
      }
    };

    updateEmails();
    window.addEventListener('emailDataUpdated', updateEmails);
    
    return () => {
      window.removeEventListener('emailDataUpdated', updateEmails);
    };
  }, []);

  const handleCopyEmail = (email) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopied(true);
          setCopiedEmail(email);
        })
        .catch((err) => {
          console.error("Falha ao copiar email: ", err);
        });
    } else {
      console.error("Clipboard API não está disponível");
    }
  };

  const handleOpenDeactivateModal = (email) => {
    setSelectedEmail(email.address);
    setRedirectMail(email.forwarding);
    setIsDeactivateModalOpen(true);
  };

  const handleOpenActivateModal = (email) => {
    setSelectedEmail(email.address);
    setRedirectMail(email.forwarding);
    setIsActivateModalOpen(true);
  };

  const handleOpenUpdateModal = (email) => {
    setSelectedEmail(email.address);
    setRedirectMail(email.forwarding);
    setPurpose(email.purpose);
    setIsUpdateModalOpen(true);
  };

  const handleCloseDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
    setSelectedEmail(null);
    setRedirectMail("");
    loadEmails();
  };

  const handleCloseActivateModal = () => {
    setIsActivateModalOpen(false);
    setSelectedEmail(null);
    setRedirectMail("");
    loadEmails();
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedEmail(null);
    setRedirectMail("");
    setPurpose("");
    loadEmails();
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingScreen />
        </div>
      ) : (
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full lg:shadow-md xl:shadow-md md:shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal hidden md:table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                    >
                      Encaminha para:
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                    >
                      Finalidade
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-800 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-800 text-center text-xs font-semibold text-gray-200 uppercase tracking-wider"
                    >
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(emails) && emails.length > 0 ? (
                    emails.map((email, index) => (
                      <tr
                        key={index}
                        className={`text-xs ${
                          index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : ""
                        }`}
                      >
                        <td className="px-5 py-5 text-sm flex items-center">
                          <div className="flex justify-center items-center">
                            <div className="group flex justify-center transition-all rounded-full p-1 mr-2">
                              <CopyIcon
                                className={
                                  copied && copiedEmail === email.address
                                    ? "h-4 w-4 cursor-pointer text-brand-light-600"
                                    : "h-4 w-4 cursor-pointer text-gray-600"
                                }
                                onClick={() => handleCopyEmail(email.address)}
                              />
                              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 duration-700 text-sm text-gray-400">
                                Copiar
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-900 whitespace-nowrap md:whitespace-normal mr-2">
                            {email.address}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm">
                          <p className="text-gray-900 whitespace-nowrap md:whitespace-normal">
                            {email.forwarding}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm">
                          <p className="text-gray-900 whitespace-nowrap md:whitespace-normal">
                            {email.purpose}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                              email.status === "active"
                                ? "text-green-900"
                                : "text-red-900"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 ${
                                email.status === "active"
                                  ? "bg-green-200"
                                  : "bg-red-200"
                              } opacity-50 rounded-full`}
                            ></span>
                            <span className="relative">{email.status}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm text-center flex space-x-2 justify-center">
                          {email.status === "inactive" && (
                            <button
                              type="button"
                              onClick={() => handleOpenActivateModal(email)}
                              className="flex flex-col justify-center items-center mx-4 text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="h-6 w-6 text-blue-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                              <span className="text-xs">Reativar</span>
                            </button>
                          )}
                          {email.status === "active" && (
                            <button
                              type="button"
                              onClick={() => handleOpenDeactivateModal(email)}
                              className="flex flex-col justify-center items-center text-gray-500 mx-4 hover:text-gray-700"
                            >
                              <svg
                                className="h-6 w-6 text-red-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="9" y1="9" x2="15" y2="15" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                              </svg>
                              <span className="text-xs">Desativar</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleOpenUpdateModal(email)}
                            className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              className="h-7 w-7 text-green-400"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24h24H0z" />
                              <path d="M9 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
                              <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3l-8.5 8.5v3" />
                              <line x1="16" y1="5" x2="19" y2="8" />
                            </svg>
                            <span className="text-xs">Editar</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-5 py-5 text-sm text-center">
                        Nenhum email encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Cards for mobile */}
              <div className="md:hidden flex flex-col m-auto">
                {Array.isArray(emails) && emails.length > 0 ? (
                  emails.map((email, index) => (
                    <div
                      key={index}
                      className="bg-[#73b1ab10] shadow-md rounded-lg p-4 mb-4 min-h-[200px] flex flex-col justify-between"
                    >
                      <div className="flex flex-col gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#0A9F91"
                            className="size-1"
                            width="16"
                            height="16"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                            />
                          </svg>
                          <p className="text-gray-800 text-left text-xs">
                            Email:
                          </p>
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-2">
                            <CopyIcon
                              className={
                                copied && copiedEmail === email.address
                                  ? "h-4 w-4 cursor-pointer text-brand-light-600"
                                  : "h-4 w-4 cursor-pointer text-gray-600"
                              }
                              onClick={() => handleCopyEmail(email.address)}
                            />
                            <p className="text-gray-900 font-semibold text-sm">
                              {email.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col mt-4">
                          <p className="text-gray-700 text-xs">
                            Encaminha para:
                          </p>
                          <p className="text-gray-900 text-sm font-semibold">
                            {email.forwarding}
                          </p>
                        </div>
                        {email.purpose && (
                          <div className="flex flex-col mt-4">
                            <p className="text-gray-700 text-xs">Finalidade:</p>
                            <p className="text-gray-900 text-sm font-semibold">
                              {email.purpose}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-3 py-1 flex w-20 justify-center font-semibold leading-tight rounded-full ${
                            email.status === "active"
                              ? "text-green-900 bg-green-200"
                              : "text-red-900 bg-red-200"
                          }`}
                        >
                          {email.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                        <div className="flex space-x-2 justify-center">
                          {email.status === "inactive" && (
                            <button
                              type="button"
                              onClick={() => handleOpenActivateModal(email)}
                              className="flex flex-col justify-center mx-4 items-center text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="h-6 w-6 text-blue-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="9 11 12 14 22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                              </svg>
                              <span className="text-[9px]">Reativar</span>
                            </button>
                          )}
                          {email.status === "active" && (
                            <button
                              type="button"
                              onClick={() => handleOpenDeactivateModal(email)}
                              className="flex flex-col justify-center mx-4 items-center text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="h-6 w-6 text-red-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                />
                                <line x1="9" y1="9" x2="15" y2="15" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                              </svg>
                              <span className="text-[9px]">Desativar</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleOpenUpdateModal(email)}
                            className="flex flex-col justify-center items-center text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              className="h-7 w-7 text-green-400"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24h24H0z" />
                              <path d="M9 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
                              <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3l-8.5 8.5v3" />
                              <line x1="16" y1="5" x2="19" y2="8" />
                            </svg>
                            <span className="text-[9px]">Editar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">
                    Nenhum email encontrado.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeactivateModalOpen && (
        <DeactivateAccountModal
          redirectmail={redirectmail}
          email={selectedEmail}
          onClose={handleCloseDeactivateModal}
        />
      )}
      {isActivateModalOpen && (
        <AccountActivatedModal
          redirectmail={redirectmail}
          email={selectedEmail}
          onClose={handleCloseActivateModal}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateEmailDataModal
          redirectmail={redirectmail}
          email={selectedEmail}
          onClose={handleCloseUpdateModal}
          purpose={purpose}
        />
      )}
    </div>
  );
};

export default EmailTable;
