// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, type ReactNode } from "react";

// 🔑 DEFINIÇÕES HARDCODED TEMPORÁRIAS
const TEMP_ADMIN_EMAIL = 'admin@ocyan.com.br';
const TEMP_ADMIN_PASSWORD = 'ocyan-tech-admin'; 
const STORAGE_KEY = 'user'; // Use a chave que você já usa

// Tipo do usuário armazenado
interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  // Modificado para retornar um boolean ou Promise<void> para indicar sucesso/falha
  login: (email: string, password: string) => boolean; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  // --- CORREÇÃO AQUI: ADICIONANDO A LÓGICA DE VALIDAÇÃO ---
  const login = (email: string, password: string): boolean => {
    
    if (email === TEMP_ADMIN_EMAIL && password === TEMP_ADMIN_PASSWORD) {
        // Sucesso
        const fakeUser: User = { email };
        setUser(fakeUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
        console.log('✅ Login temporário bem-sucedido!');
        return true; // Indica sucesso
    } else {
        // Falha
        console.error('❌ Credenciais incorretas.');
        // Opcional: Você pode querer limpar o estado, caso haja sujeira
        return false; // Indica falha
    }
  };
  // --------------------------------------------------------

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
};