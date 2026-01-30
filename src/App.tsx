import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Contrato from './pages/Contrato';

// Componente de Rota Protegida
/*const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
*/

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login - Pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota Home - Protegida */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Rota Contrato - Protegida */}
        <Route 
          path="/contrato" 
          element={
            <ProtectedRoute>
              <Contrato />
            </ProtectedRoute>
          } 
        />
        
        {/* Rota 404 - Redireciona para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;