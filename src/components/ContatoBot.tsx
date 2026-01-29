import React, { useEffect, useRef, useState } from 'react';
import { botEngine } from '../logic/botEngine';
import { FAQ_BASE } from '../utils/knowledgeBase';
import type { DiagnosticData } from '../types/diagnostic';
import '../styles/ContatoBot.css';

const WHATSAPP_NUMBER = '5551986730107';

const initialDiagnostic: DiagnosticData = {
  etapa: 'inicio'
};

const ContatoBot: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<
    { from: 'bot' | 'user'; text: string }[]
  >([]);
  const [input, setInput] = useState('');
  const [diagnostic, setDiagnostic] =
    useState<DiagnosticData>(initialDiagnostic);
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setMessages([
        {
          from: 'bot',
          text: 'Sou o assistente automatizado da OCYAN-TECH. Como posso te chamar?'
        }

        
      ]);
      setDiagnostic({ etapa: 'inicio' });
      setIsReady(false);
    }
  }, [isOpen]);

  const handleSend = (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, updatedData, isReady } = botEngine(text, diagnostic);
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
      setDiagnostic(updatedData);
      setIsReady(isReady);
      setIsTyping(false);
    }, 600);
  };

  const waLink = () => {
    const resumo =
      `*RESUMO DE DIAGNÓSTICO – OCYAN*\n\n` +
      `🚀 Projeto: ${diagnostic.nome}\n` +
      `🌐 Situação: ${diagnostic.temSite ? 'Já possui site' : 'Não possui site'}\n` +
      `🎯 Objetivo: ${diagnostic.objetivo}\n` +
      `🔧 Manutenção: ${diagnostic.querManutencao ? 'Sim' : 'Não'}\n` +
      `🤖 Automação: ${diagnostic.querAutomacao ? 'Sim' : 'Não'}\n` +
      `📦 Serviço indicado: ${diagnostic.servicoIndicado}\n\n` +
      `_Solicito proposta para fechamento de contrato._`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(resumo)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className={`bot-modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={() => {
        setIsClosing(true);
        setTimeout(onClose, 300);
      }}
    >
      <div className="bot-window" onClick={e => e.stopPropagation()}>
        <div className="bot-header">
          <span>Ocyan-Tech • Atendimento</span>
          <button
            onClick={() => {
              setIsClosing(true);
              setTimeout(onClose, 300);
            }}
          >
            ×
          </button>
        </div>

        <div className="bot-chat-history" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`message-bubble ${m.from}`}>
              {m.text}
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble bot typing">
              <span></span><span></span><span></span>
            </div>
          )}

          {isReady && (
            <div className="cta-container">
              <a href={waLink()} target="_blank" rel="noreferrer">
                <button className="pill-btn gold">
                  Finalizar e Fechar Contrato →
                </button>
              </a>
            </div>
          )}
        </div>

        {!isReady && (
          <div className="faq-mini-chips">
            {FAQ_BASE.map((f, i) => (
              <button key={i} onClick={() => handleSend(f.question)}>
                {f.question}
              </button>
            ))}
          </div>
        )}

        <form
          className="bot-input-area"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite aqui..."
            disabled={isReady}
          />
          <button type="submit">➤</button>
        </form>
      </div>
    </div>
  );
};

export default ContatoBot;
