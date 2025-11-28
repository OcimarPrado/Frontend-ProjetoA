import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Removendo referências a chamadas de API ou tratamento de erro de rede.

const Login: React.FC = () => {
  // A função 'login' do useAuth DEVE ser síncrona ou assíncrona baseada
  // em simulação para este componente funcionar sem depender do backend.
  const { user, login } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função síncrona/simulada que usa apenas o AuthContext.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticação (mantido para UX)
    setTimeout(() => {
      // 1. Chamada de login estritamente LOCAL
      // A função 'login' no AuthContext deve conter a lógica de validação de credenciais,
      // armazenamento local e atualização do estado 'user'.
      const success = login(email, password);

      if (!success) {
        // Se a validação LOCAL falhar
        setError('Email ou senha incorretos. Entre em contato para obter acesso.');
      }
      setLoading(false);
    }, 500); // 500ms de delay de simulação para melhor experiência do usuário (UX)
  };

  // Se já está autenticado, redireciona para home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      
      {/* Cartão de Login */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Ocyan Tech
          </h1>
          <p className="text-sm text-gray-500">
            Acesso Beta - Somente Convidados
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
              disabled={loading}
            />
          </div>

          {/* Input de Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
              disabled={loading}
            />
          </div>

          {/* Botão de Entrar */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        {/* Mensagem de Erro */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          </div>
        )}
        
        {/* Informações de Acesso */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Este site está em fase beta. Para solicitar acesso, entre em contato através de{' '}
            <a href="mailto:contato@ocyan-tech.com.br" className="text-blue-600 hover:underline">
              contato@ocyan-tech.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;