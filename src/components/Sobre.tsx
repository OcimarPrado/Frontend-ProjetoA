import React from "react";
import { motion } from "framer-motion";
import "../styles/Sobre.css";

const steps = [

  {
    title: "Comunicação Direta",
    desc: "Conversamos de forma simples e objetiva. Você acompanha o projeto e entende exatamente o que está sendo feito."
  },
  {
    title: "Processo Simples",
    desc: "Trabalho organizado, sem burocracia. Cada etapa existe para entregar um site funcional e eficiente."
  },
  {
    title: "Prazos Realistas",
    desc: "Definimos prazos possíveis e cumprimos o que foi combinado, sem promessas irreais."
  },
  {
    title: "Entrega Responsável",
    desc: "Após a entrega, realizamos ajustes pontuais conforme combinado em contrato."
  }];



const Sobre: React.FC = () => {
  return (
    <section className="sobre-section" id="sobre">
      <div className="container">
        
        <header className="sobre-header-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="overline"
          >
            CONHEÇA A OCYAN-TECH
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Como Nossa <span>Empresa Trabalha</span>
          </motion.h2>

          <motion.p 
            className="company-bio"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A Ocyan Tech ajuda empresas a transformar idéias e necessidades em soluções 
            digitais que funcionam de verdade. Criamos sites e sistemas pensados para facilitar processos, 
            melhorar a presença online e gerar resultados práticos no dia a dia do negócio.
          </motion.p>
          
          <div className="accent-bar"></div>
        </header>

        <div className="steps-horizontal-wrapper">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`step-horizontal-card ${index % 2 === 0 ? "from-left" : "from-right"}`}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -120 : 120 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0 
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                type: "spring", 
                stiffness: 60, 
                damping: 18,
                delay: 0.1 
              }}
            >
              <div className="step-content-dark">
                <div className="step-number-float">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sobre;