// src/App.tsx
import './i18n/i18n.ts';
import './index.css';

import { Routes, Route } from 'react-router-dom';

import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Services  from './components/Servico';
import Portfolio from './components/Portifolio';
import Pricing   from './components/Planos';
import About     from './components/Sobre';
import CtaBanner from './components/CtaBanner';
import Contact   from './components/Contact';
import Footer    from './components/Footer';
import Contrato  from './pages/Contrato';
import WhatsAppFloat from './components/WhatsAppFloat'; // Importação do novo componente

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <About />
      <CtaBanner />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contrato"
          element={
            <main>
              <Contrato />
            </main>
          }
        />
      </Routes>

      <Footer />

      {/* Componente flutuante inserido aqui para garantir visibilidade global */}
      <WhatsAppFloat />
    </>
  );
}