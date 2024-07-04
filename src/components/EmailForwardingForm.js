"use client";
import React, { useState } from "react";
import { forwardEmail } from "@/services/emailService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SucessoModal from "@/components/component/sucessoModal";
import { Mail, Shield, Settings, ArrowRight, RefreshCw } from 'lucide-react';

const EmailForwardingForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    finalidade: "",
    customName: "",
  });
  const [generateRandomName, setGenerateRandomName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success",
    message: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toLowerCase() }));
  };

  const handleGenerateRandomName = () => {
    const randomNumber = new Date().getMilliseconds();
    const emailUser = formData.email ? formData.email.split('@')[0] : "eficazmail";
    const randomName = `${emailUser}${randomNumber}`;
    setFormData(prev => ({ ...prev, customName: randomName }));
    setGenerateRandomName(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || (!formData.customName && !generateRandomName)) {
      setModalState({
        isOpen: true,
        type: "error",
        message: "Por favor, insira um endereço de e-mail válido e um nome personalizado ou escolha gerar um nome aleatório",
      });
      return;
    }

    if (formData.email.includes("@eficaz.email")) {
      setModalState({
        isOpen: true,
        type: "error",
        message: "Endereço de e-mail não pode ser @eficaz.email",
      });
      setFormData(prev => ({ ...prev, email: "" }));
      return;
    }

    setLoading(true);

    try {
      const finalCustomName = `${formData.customName}@eficaz.email`;
      const response = await forwardEmail({
        userEmail: formData.email,
        customName: finalCustomName,
        purpose: formData.finalidade,
      });

      setModalState({
        isOpen: true,
        type: "success",
        message: `Email encaminhado com sucesso para ${response.data.address}`,
        email: response.data.address,
      });
      setFormData(prev => ({ ...prev, customName: "" }));
      setGenerateRandomName(false);
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        message: error.response?.data?.message || "Ocorreu um erro",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-transparent">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              Crie seu redirecionamento
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-6">
            Proteja sua privacidade online com redirecionamento inteligente de e-mails.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email principal</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Informe seu email principal"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 bg-gray-700 text-white border-gray-600 w-full"
              />
            </div>
            <div>
              <Label htmlFor="customName" className="text-white">Crie seu email de redirecionamento</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="customName"
                  name="customName"
                  type="text"
                  placeholder="Email personalizado"
                  pattern="^[a-zA-Z0-9._]+$"
                  title="Por favor, insira um prefixo de email válido usando apenas letras, números, pontos e sublinhados"
                  value={formData.customName}
                  onChange={handleInputChange}
                  disabled={generateRandomName}
                  className="bg-gray-700 text-white border-gray-600 flex-grow"
                />
                <span className="text-gray-300">@eficaz.email</span>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleGenerateRandomName}
                  className="text-gray-300 hover:text-white"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span className="sr-only">Aleatório</span>
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="finalidade" className="text-white">
                Finalidade <span className="text-xs align-super">(*opcional)</span>
              </Label>
              <Input
                id="finalidade"
                name="finalidade"
                type="text"
                placeholder="Informe a finalidade deste redirecionamento"
                value={formData.finalidade}
                onChange={handleInputChange}
                className="mt-1 bg-gray-700 text-white border-gray-600 w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full group flex items-center justify-center px-8 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-teal-400 to-brand-light hover:shadow-lg hover:scale-105 mt-6"
            >
              {loading ? (
                <RefreshCw className="animate-spin mr-2 h-5 w-5" />
              ) : (
                <>
                  Criar redirecionamento
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
      <SucessoModal
        open={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        message={modalState.message}
        email={modalState.email}
      />
    </div>
  );
};

export default EmailForwardingForm;