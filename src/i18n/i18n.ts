import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traduções
const resources = {
  en: {
    translation: {
      heroTitle: "Connect with your customers efficiently",
      heroSubtitle: "Complete AI-powered automated support platform for solo entrepreneurs.",
      heroCtaPlans: "See Plans",
      heroCtaHow: "How It Works",
      heroFeatures: ["24/7 Support", "Trained AI", "Fast Setup"]
    }
  },
  pt: {
    translation: {
      heroTitle: "Conecte-se com seus clientes de forma eficiente",
      heroSubtitle: "Plataforma completa de atendimento automatizado por IA para quem trabalha sozinho.",
      heroCtaPlans: "Ver Planos",
      heroCtaHow: "Como Funciona",
      heroFeatures: ["Atendimento 24/7", "IA Treinada", "Configuração Rápida"]
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // idioma padrão
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
