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
  const [diagnostic, setDiagnostic] = useState<DiagnosticData>(initialDiagnostic);
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [quickOptions, setQuickOptions] = useState<string[]>([]);
  const [showFAQ, setShowFAQ] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, quickOptions]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setMessages([
        {
          from: 'bot',
          text: '👋 Olá! Sou o assistente da OCYAN-TECH.\n\nVou fazer um diagnóstico rápido para te ajudar a encontrar a solução perfeita para o seu negócio.\n\nPara começar, como posso te chamar?'
        }
      ]);
      setDiagnostic({ etapa: 'inicio' });
      setIsReady(false);
      setQuickOptions([]);
      setShowFAQ(true);
    }
  }, [isOpen]);

  const handleSend = (msg?: string) => {
    const text = (msg ?? input).trim();
    if (!text || isTyping) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setQuickOptions([]);
    setIsTyping(true);

    setTimeout(() => {
      const response = botEngine(text, diagnostic);
      
      setMessages(prev => [...prev, { from: 'bot', text: response.reply }]);
      setDiagnostic(response.updatedData);
      setIsReady(response.isReady);
      setQuickOptions(response.options || []);
      setShowFAQ(response.showFAQ ?? false);
      setIsTyping(false);
    }, 800);
  };

  const generateWhatsAppLink = () => {
    const { nome, empresa, nicho, estruturaAtual, estruturaAlmejada, problemas, urgencia, orcamento, servicoIndicado, score } = diagnostic;

    const resumo = 
      `*🎯 LEAD QUALIFICADO - OCYAN-TECH*\n\n` +
      `*Score:* ${score}/100 ${score! >= 80 ? '🔥' : score! >= 60 ? '✨' : '👍'}\n\n` +
      `*INFORMAÇÕES DO LEAD:*\n` +
      `👤 Nome: ${nome}\n` +
      `🏢 Empresa: ${empresa}\n` +
      `📍 Nicho: ${nicho}\n\n` +
      `*SITUAÇÃO ATUAL:*\n` +
      `${estruturaAtual}\n\n` +
      `*OBJETIVO:*\n` +
      `${estruturaAlmejada}\n\n` +
      `*PROBLEMAS IDENTIFICADOS:*\n` +
      `${problemas?.map(p => `• ${p}`).join('\n')}\n\n` +
      `*URGÊNCIA:*\n` +
      `${urgencia}\n\n` +
      `*ORÇAMENTO:*\n` +
      `${orcamento}\n\n` +
      `*💡 SOLUÇÃO RECOMENDADA:*\n` +
      `${servicoIndicado}\n\n` +
      `_Solicito proposta comercial detalhada._`;

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
          <div className="bot-header-content">
            <div className={`bot-status-dot ${isTyping ? 'typing' : ''}`}></div>
            <div className="bot-header-text">
              <span className="bot-header-title">Ocyan-Tech</span>
              <span className="bot-header-status">
                {isTyping ? 'digitando...' : 'online'}
              </span>
            </div>
          </div>
          <button
            className="bot-close-x"
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
              {m.text.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < m.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble bot">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          {/* Opções de resposta rápida */}
          {quickOptions.length > 0 && !isTyping && (
            <div className="quick-options">
              {quickOptions.map((option, i) => (
                <button
                  key={i}
                  className="quick-option-btn"
                  onClick={() => handleSend(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* CTA final */}
          {isReady && (
            <div className="cta-container">
              <a href={generateWhatsAppLink()} target="_blank" rel="noreferrer">
                <button className="pill-btn gold">
                  🚀 Falar com Especialista e Fechar
                </button>
              </a>
            </div>
          )}
        </div>

        {/* FAQs (só aparecem quando relevante) */}
        {showFAQ && !isReady && quickOptions.length === 0 && (
          <div className="faq-section">
            <p className="faq-title">Perguntas frequentes:</p>
            <div className="faq-mini-chips">
              {FAQ_BASE.slice(0, 4).map((f, i) => (
                <button key={i} onClick={() => handleSend(f.question)}>
                  {f.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
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
            placeholder={isReady ? 'Diagnóstico finalizado' : 'Digite sua mensagem...'}
            disabled={isReady || isTyping}
          />
          <button type="submit" disabled={isReady || isTyping || !input.trim()}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContatoBot;