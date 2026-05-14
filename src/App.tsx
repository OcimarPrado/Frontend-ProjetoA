// src/App.tsx
import './i18n/i18n.ts';
import './index.css';

import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Services  from './components/Servico';
import Portfolio from './components/Portifolio';
import Pricing   from './components/Planos';
import About     from './components/Sobre';
import CtaBanner from './components/CtaBanner';
import Contact   from './components/Contact';
import Footer    from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

