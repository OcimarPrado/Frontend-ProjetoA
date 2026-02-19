// src/App.tsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { observeElements } from "./utils/scrollAnimations";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Servico from "./components/Servico";
import Planos from "./components/Planos";
import Footer from "./components/Footer";
import ComoFunciona from "./components/ComoFunciona";

import Contrato from "./pages/Contrato";

import "./App.css";

function Home() {
  useEffect(() => {
    const observer = observeElements();
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Sobre />
      <ComoFunciona />
      <Servico />
      <Planos />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contrato" element={<Contrato />} />
    </Routes>
  );
}

export default App;
