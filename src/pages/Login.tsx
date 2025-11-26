// Componente Login.tsx (Ajuste)

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Novo estado para erro

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = login(email, password); // Captura o resultado do login

    if (success) {
        navigate("/"); // Redireciona apenas se for bem-sucedido
    } else {
        setError("Email ou senha incorretos."); // Exibe a mensagem de erro
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        {/* ... Seus inputs ... */}
        
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe o erro */}
      </form>
    </div>
  );
};