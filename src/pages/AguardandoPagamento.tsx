import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AguardandoPagamento: React.FC = () => {
  const location = useLocation();
  const [status, setStatus] = useState<'success' | 'pending' | 'failure' | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    // Analisa os parâmetros de retorno do Mercado Pago (via back_urls)
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('status')?.toLowerCase() as 'success' | 'pending' | 'failure' | null;
    const refId = params.get('id') || params.get('external_reference'); // Captura o ID da nossa transação

    if (paymentStatus) {
      setStatus(paymentStatus);
    }
    if (refId) {
      setTransactionId(refId);
    }

    // Se a página for acessada sem parâmetros, assume-se que o pagamento foi iniciado mas o status é desconhecido.
    if (!paymentStatus) {
      setStatus('pending'); 
    }
    
  }, [location.search]);

  // Função para renderizar o conteúdo com base no status
  const renderContent = () => {
    switch (status) {
      case 'success':
        return {
          title: '✅ Pagamento Confirmado!',
          message: 'Excelente! Seu pagamento foi processado com sucesso. Estamos agora personalizando seu Painel do Cliente. Você receberá um e-mail com suas credenciais de acesso (link, login e senha) em instantes. Por favor, verifique sua caixa de entrada e spam.',
          iconClass: 'text-green-500',
          bgColorClass: 'bg-green-50 border-green-200'
        };
      case 'pending':
        return {
          title: '⏳ Pagamento em Análise',
          message: 'Sua transação está em processamento pelo Mercado Pago. Assim que a confirmação for recebida pelo nosso sistema, suas credenciais de acesso serão enviadas imediatamente para o e-mail cadastrado. Isso pode levar alguns minutos.',
          iconClass: 'text-yellow-500',
          bgColorClass: 'bg-yellow-50 border-yellow-200'
        };
      case 'failure':
        return {
          title: '❌ Falha na Transação',
          message: 'Ocorreu um erro ao processar seu pagamento. Por favor, verifique os dados de pagamento ou tente novamente. Você pode entrar em contato com nosso suporte se o problema persistir.',
          iconClass: 'text-red-500',
          bgColorClass: 'bg-red-50 border-red-200'
        };
      default:
        return {
          title: '... Carregando Status ...',
          message: 'Aguarde enquanto verificamos o status da sua transação.',
          iconClass: 'text-gray-500',
          bgColorClass: 'bg-gray-100 border-gray-300'
        };
    }
  };

  const { title, message, iconClass, bgColorClass } = renderContent();

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className={`p-8 rounded-2xl shadow-xl ${bgColorClass}`}>
        <div className="text-center">
          {/* Ícone de status */}
          <div className="mb-6">
            <svg className={`mx-auto h-20 w-20 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
              {status === 'success' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {status === 'pending' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {status === 'failure' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {status === null && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.96 8.96 0 0110 20c-4.418 0-8-3.582-8-8s3.582-8 8-8v5" />}
            </svg>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-8">{message}</p>

          {transactionId && (
            <p className="text-sm text-gray-500 mt-6">
              ID da Transação: <span className="font-mono text-gray-700">{transactionId}</span>
            </p>
          )}

          <div className="mt-10 space-x-4">
            <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150">
              Voltar para a Home
            </a>
            <a href="/contato" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
              Falar com Suporte
            </a>
          </div>

        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">
        Nota: A criação e o envio de credenciais são acionados automaticamente por um Webhook na confirmação final do Mercado Pago.
      </p>
    </div>
  );
};

export default AguardandoPagamento;
