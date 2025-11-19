import React, { type JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Contrato from "./pages/Contrato";
import AguardandoPagamento from "./pages/AguardandoPagamento";
import Login from "./pages/Login";

import { useAuth } from "./hooks/useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contrato"
          element={
            <ProtectedRoute>
              <Contrato />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmacao"
          element={
            <ProtectedRoute>
              <AguardandoPagamento />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
