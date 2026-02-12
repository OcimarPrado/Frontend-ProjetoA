// src/App.tsx
import { useEffect } from 'react';
import { observeElements } from './utils/scrollAnimations';
import Header from './components/Header';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Servico from './components/Servico';
import Planos from './components/Planos';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const observer = observeElements();
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Sobre />
      <Servico />
      <Planos />
      <Footer />
    </>
  );
}

export default App;