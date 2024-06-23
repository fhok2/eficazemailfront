import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";

const NewUserLogin = ({ email }) => {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState(email || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleRegister } = useAuthContext();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      email: userEmail.trim(),
      name: name.trim(),
      phone: phone.trim(),
      password: password.trim(),
    };

    const response = await handleRegister(userData);
    setLoading(true);
    
    if (response.error) {
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="mt-8 flex flex-col gap-4">
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 mt-3 text-red-700 p-4 rounded-lg"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      <div className="text-left">
        <Label htmlFor="name">Nome</Label>
        <Input
          type="text"
          id="name"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="text-left">
        <Label htmlFor="email">Email</Label>
        <Input
        className="mt-2 text-gray-50"
          type="email"
          id="email"
          placeholder="Digite seu email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-left">
        <Label htmlFor="phone">Telefone</Label>
        <Input
        className="mt-2 text-gray-50"
          type="text"
          id="phone"
          placeholder="Digite seu telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="text-left">
        <Label htmlFor="password">Senha</Label>
        <Input
        className="mt-2 text-gray-50"
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="font-semibold flex h-14 items-center justify-center rounded transition duration-100 ease-in-out focus:outline-none  bg-brand-dark focus:ring-1 focus:ring-white text-white hover:bg-brand-dark-600 disabled:border-gray-100 disabled:bg-primary  px-3 py-2 text-sm group w-full focus:ring-primary-700"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
};

export default NewUserLogin;
