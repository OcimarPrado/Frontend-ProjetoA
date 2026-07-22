import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sobre from "../components/Sobre";
import Planos from "../components/Planos";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Servico from "../components/Servico";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Sobre />
      <Servico/>
      <Planos />
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Home;

