import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ComoFunciona from "../components/ComoFunciona";
import Planos from "../components/Planos";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <ComoFunciona />
      <Planos />
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Home;

