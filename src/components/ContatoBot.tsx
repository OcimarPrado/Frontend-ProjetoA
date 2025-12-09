// src/components/ContatoBot.tsx

import React, { useState, useRef, useEffect } from 'react';
import '../styles/ContatoBot.css';
import { FAQ_BASE, getBotResponse } from '../utils/knowledgeBase'; 

interface ContatoBotProps {
  onClose: () => void;
  isOpen: boolean;
}

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

// DEFINIÇÃO DOS ESTÁGIOS DA CONVERSA
type BotStage = 'initial' | 'awaiting_name' | 'awaiting_phone' | 'completed';

const ContatoBot: React.FC<ContatoBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [stage, setStage] = useState<BotStage>('initial');
  
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  // 1. Adiciona a mensagem e faz o scroll
  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  // 2. Lógica para a Captura de Leads e Respostas
  const handleBotLogic = (userInput: string) => {
    
    if (stage === 'initial') {
      addMessage(`Olá! Sou o Bot da Ocyan-Tech. Para um atendimento personalizado, qual é o seu **nome**, por favor?`, 'bot');
      setStage('awaiting_name');
      return;
    } 
    
    if (stage === 'awaiting_name') {
      const capturedName = userInput.trim();
      setName(capturedName);
      addMessage(`Perfeito, **${capturedName}**! Por favor, informe também um **telefone de contato** (com DDD) para que nossa equipe possa te retornar, caso necessário.`, 'bot');
      setStage('awaiting_phone');
      return;
    } 
    
    if (stage === 'awaiting_phone') {
      const capturedPhone = userInput.trim();
      setPhone(capturedPhone);
      
      // Assinatura da mensagem de boas-vindas com o nome
      const welcomeMessage = `Certo! Seu telefone (**${capturedPhone}**) foi salvo. Seja bem-vindo(a), **${name}**. Agora você pode me perguntar sobre planos, testes, e suporte.`;
      addMessage(welcomeMessage, 'bot');
      
      setStage('completed');
      
      // Log para captação de leads (simulação)
      console.log(`[LEAD CAPTURADO] Nome: ${name}, Telefone: ${capturedPhone}`);
      return;
    }
    
    if (stage === 'completed') {
      // Se a captura estiver completa, envia a pergunta para a base de conhecimento
      const botResponse = getBotResponse(userInput);
      // Trata o cliente pelo nome, se o nome estiver disponível
      const personalizedResponse = botResponse.replace('você', name ? name : 'você');
      addMessage(personalizedResponse, 'bot'); 
      return;
    }
  };

  // 3. Envio de Mensagem
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userQuery = input.trim();
    addMessage(userQuery, 'user');
    setInput('');

    setTimeout(() => {
      handleBotLogic(userQuery);
    }, 500);
  };
  
  // 4. Lógica para Dúvidas Comuns (Após a captura de lead)
  const handleFaqClick = (query: string) => {
    if (stage !== 'completed') {
      return alert("Por favor, complete a captura de nome e telefone antes de iniciar o chat completo.");
    }
    
    addMessage(query, 'user');

    setTimeout(() => {
      handleBotLogic(query);
    }, 500);
  };
  
  // 5. Scroll automático
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  // 6. Mensagem inicial (dispara a primeira pergunta de captura)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotLogic('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // CORREÇÃO TS(2367): Lógica simplificada e correta para desabilitação
  const isInputDisabled = stage !== 'awaiting_name' && stage !== 'awaiting_phone' && stage !== 'completed';

  return (
    <div className="bot-modal-overlay">
      <div className="bot-window">
        {/* CABEÇALHO */}
        <div className="bot-header">
          <div className="bot-title-group">
            <span className="bot-icon-check">✓</span>
            <h3 className="bot-title">Ocyan-Tech Bot</h3>
          </div>
          <button className="bot-close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* ÁREA DE MENSAGENS E HISTÓRICO */}
        <div className="bot-chat-history" ref={chatHistoryRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              {/* Renderiza o texto, tratando negrito básico (**) */}
              {msg.text.split('**').map((part, i) => (
                i % 2 === 1 ? <strong key={i}>{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
              ))}
            </div>
          ))}
        </div>
        
        {/* DÚVIDAS COMUNS (Aparecem após a captura de lead) */}
        {stage === 'completed' && (
            <div className="bot-faq-quick-links">
                <h4 className="faq-title">Dúvidas Frequentes:</h4>
                <div className="faq-buttons-container">
                    {FAQ_BASE.slice(0, 4).map((faq, index) => (
                        <button key={index} onClick={() => handleFaqClick(faq.question)}>
                            {faq.question}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* CAMPO DE DIGITAÇÃO */}
        <form className="bot-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder={
                stage === 'awaiting_name' ? 'Digite seu Nome...' : 
                stage === 'awaiting_phone' ? 'Digite seu Telefone...' : 
                'Digite sua mensagem...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isInputDisabled} 
            autoFocus 
          />
          <button type="submit" className="send-button" disabled={isInputDisabled}>
            Enviar 
          </button>
        </form>

        {/* RODAPÉ DO WIDGET */}
        <p className="bot-powered">
          Powered by **Ocyan-Tech** ⚡
        </p>
      </div>
    </div>
  );
};

// 🚨 EXPORTAÇÃO PADRÃO CORRIGIDA QUE RESOLVE O PRIMEIRO ERRO 🚨
export default ContatoBot;