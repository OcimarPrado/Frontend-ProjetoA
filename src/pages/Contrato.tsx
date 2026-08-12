import React, { useEffect, useState } from "react";
import pt from "../i18n/pt.json";

// ======================================================
// TIPOS
// ======================================================

interface PlanoInfo {
  name: string;
  planId?: string;
  icon: string;
  desc: string;
  price_from: string | null;
  price_monthly: string | null;
  price_label: string;
  setup_label: string;
  monthly_label: string;
  note: string;
  featured: boolean;
  features: {
    included: boolean;
    text: string;
  }[];
}

type PlanoNome = "Sites" | "Automações & APIs" | "Sistemas";

// ======================================================
// PLANOS
// Fonte única: pt.json
// ======================================================

const planos = pt.pricing.plans as PlanoInfo[];

// ======================================================
// VERSÃO E CÓPIA DO CONTRATO
// Isso é o que fica gravado no backend junto com o aceite,
// pra ter prova do que exatamente o cliente aceitou naquele
// momento — mesmo que o texto exibido na tela mude depois.
// Se o texto lá embaixo (JSX) mudar, atualiza CONTRATO_VERSAO
// e replica a mudança aqui também.
// ======================================================

const CONTRATO_VERSAO = "v1.0-2026-08-12";

const CONTRATO_TEXTO_INTEGRAL = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS - NAYCO-TECH
Criação, hospedagem e manutenção de sites

1. OBJETO DO CONTRATO
1.1. O presente contrato tem por objeto a prestação, pela Nayco-Tech, de serviços de criação, configuração, hospedagem e manutenção de website para o CLIENTE, conforme o plano selecionado nesta página.
1.2. Para o plano SITES, o valor inicial do projeto é de R$ 490,00 referente ao setup, além da mensalidade de R$ 149,00 referente à hospedagem e manutenção.
1.3. O setup do plano SITES será pago da seguinte forma: R$ 200,00 na contratação e R$ 290,00 na entrega do site.
1.4. O escopo do site, suas seções, funcionalidades e limites serão definidos conforme o plano contratado e o briefing preenchido pelo CLIENTE.

2. DEFINIÇÕES
Para fins deste instrumento, consideram-se: (i) "SERVIÇOS" — as atividades de criação, hospedagem e manutenção fornecidas pela Nayco-Tech; (ii) "PLANO" — o pacote selecionado pelo CLIENTE; (iii) "SITE" — o website desenvolvido para o CLIENTE.

3. OBRIGAÇÕES DA NAYCO-TECH
3.1. Desenvolver e entregar o SITE conforme o escopo contratado.
3.2. Configurar a hospedagem e os recursos necessários para disponibilização do SITE.
3.3. Manter o SITE disponível durante a vigência da manutenção mensal, ressalvadas interrupções decorrentes de manutenção, falhas de terceiros ou força maior.
3.4. Realizar suporte técnico conforme o serviço contratado.
3.5. Preservar a confidencialidade dos dados do CLIENTE e adotar medidas técnicas e administrativas razoáveis para proteção das informações.
3.6. Realizar backups conforme os recursos disponíveis na infraestrutura utilizada.

4. OBRIGAÇÕES DO CLIENTE
4.1. Fornecer dados verdadeiros, completos e atualizados.
4.2. Fornecer textos, imagens, logotipos e demais materiais necessários ao projeto.
4.3. Garantir que possui os direitos de uso sobre os materiais fornecidos.
4.4. Manter sigilo sobre credenciais de acesso eventualmente fornecidas.
4.5. Utilizar o SITE de acordo com a legislação brasileira.
4.6. Efetuar os pagamentos nos prazos acordados.

5. PRAZO DE ENTREGA
5.1. O prazo estimado para entrega do SITE será informado conforme o projeto, sendo normalmente de 5 a 20 dias úteis após o recebimento dos materiais e informações necessárias.
5.2. O prazo poderá ser alterado quando houver atraso no fornecimento de informações, materiais, aprovações ou alterações solicitadas pelo CLIENTE.

6. SUPORTE E ATUALIZAÇÕES
6.1. A manutenção mensal inclui suporte técnico e atualizações compatíveis com o escopo do plano contratado.
6.2. Alterações que ultrapassem o escopo contratado poderão ser cobradas separadamente, mediante orçamento e aprovação do CLIENTE.
6.3. Novas funcionalidades, integrações, sistemas ou alterações estruturais poderão configurar novo projeto ou orçamento.

7. PAGAMENTO
7.1. Para o plano SITES, o setup total é de R$ 490,00, sendo R$ 200,00 na contratação e R$ 290,00 na entrega.
7.2. A mensalidade de hospedagem e manutenção é de R$ 149,00 por mês.
7.3. Os pagamentos serão realizados por meio da plataforma de pagamentos indicada pela Nayco-Tech, atualmente o Mercado Pago, ou outra plataforma informada previamente.
7.4. Pagamentos em atraso poderão resultar na suspensão temporária dos serviços até a regularização dos valores devidos.
7.5. Os valores poderão ser reajustados anualmente mediante comunicação prévia ao CLIENTE.

8. VIGÊNCIA, PRAZO MÍNIMO E RESCISÃO
8.1. A contratação da hospedagem e manutenção possui prazo mínimo de 12 (doze) meses contados a partir da disponibilização do SITE ao CLIENTE.
8.2. Após o período mínimo de 12 meses, a manutenção mensal será renovada por prazo indeterminado, podendo ser encerrada por qualquer das partes mediante aviso prévio de 30 (trinta) dias.
8.3. Em caso de encerramento antes do término do prazo mínimo de 12 meses por iniciativa do CLIENTE, poderão ser cobradas as mensalidades restantes do período mínimo contratado, quando aplicável e permitido pela legislação.
8.4. O setup correspondente ao trabalho de desenvolvimento já iniciado não será automaticamente reembolsável.

9. DOMÍNIO E HOSPEDAGEM
9.1. Quando o domínio for registrado em nome do CLIENTE, sua titularidade permanecerá com o CLIENTE.
9.2. A hospedagem será administrada pela Nayco-Tech enquanto a manutenção estiver ativa.
9.3. O domínio .com.br poderá estar incluído no primeiro ano conforme as condições apresentadas no plano contratado.
9.4. Renovação de domínio após o período eventualmente incluído poderá depender de cobrança específica ou das condições vigentes da empresa registradora.

10. LIMITAÇÃO DE RESPONSABILIDADE
10.1. A Nayco-Tech não será responsável por indisponibilidades causadas por provedores de hospedagem, registradores de domínio, plataformas externas, serviços de terceiros, falhas de internet, ataques externos ou força maior.
10.2. A Nayco-Tech não será responsável por danos decorrentes de conteúdos fornecidos pelo CLIENTE ou de utilização inadequada do SITE.

11. PROTEÇÃO DE DADOS — LGPD
11.1. As partes comprometem-se a tratar dados pessoais de acordo com a Lei nº 13.709/2018 (LGPD) e demais normas aplicáveis.
11.2. A Nayco-Tech adotará medidas técnicas e administrativas razoáveis para proteção dos dados tratados no âmbito da prestação dos serviços.

12. PROPRIEDADE INTELECTUAL
12.1. O código-fonte, componentes, templates, estruturas e demais ativos técnicos previamente desenvolvidos pela Nayco-Tech permanecem de propriedade da Nayco-Tech, salvo acordo escrito em sentido contrário.
12.2. Textos, imagens, logotipos, marcas e demais conteúdos fornecidos pelo CLIENTE permanecem de propriedade do CLIENTE ou de seus respectivos titulares.

13. CONFIDENCIALIDADE
13.1. As partes comprometem-se a manter sigilo sobre informações técnicas, comerciais e estratégicas recebidas em razão deste contrato, salvo quando sua divulgação for exigida por lei.

14. ALTERAÇÕES DE ESCOPO
14.1. Solicitações que alterem significativamente o escopo inicialmente contratado poderão gerar custos adicionais.
14.2. Integrações com sistemas de terceiros, APIs, gateways, CRMs, ERPs e outras plataformas poderão depender de permissões, credenciais, limitações técnicas e custos externos.

15. FORÇA MAIOR
15.1. Nenhuma das partes será responsabilizada por descumprimentos decorrentes de eventos de força maior ou caso fortuito devidamente comprovados.

16. NOTIFICAÇÕES
16.1. As comunicações relacionadas a este contrato poderão ser realizadas por e-mail, WhatsApp ou outros canais previamente disponibilizados entre as partes.

17. CESSÃO
17.1. O CLIENTE não poderá transferir seus direitos e obrigações decorrentes deste contrato sem autorização prévia da Nayco-Tech, salvo quando permitido por lei.

18. INTEGRALIDADE DO ACORDO
18.1. Este contrato, juntamente com o plano contratado e as informações fornecidas no briefing, constitui o entendimento entre as partes sobre os serviços contratados.

19. NULIDADE PARCIAL
19.1. Caso alguma disposição deste contrato seja considerada inválida ou inaplicável, as demais disposições permanecerão vigentes.

20. LEI APLICÁVEL E FORO
20.1. Este contrato será regido pelas leis da República Federativa do Brasil.
20.2. Fica eleito o foro da comarca de Canoas/RS, ressalvadas as hipóteses em que a legislação determine foro diverso.

Ao aceitar eletronicamente este contrato, o CLIENTE declara ter lido, compreendido e concordado com os termos aqui estabelecidos, assumindo responsabilidade pelas informações fornecidas.
`.trim();

// ======================================================
// API
// ======================================================

const API_BASE_URL = "https://backend-projetoa.onrender.com";
const API_ENDPOINT = "/api/contract/assinar-e-pagar";
const API_URL_COMPLETA = `${API_BASE_URL}${API_ENDPOINT}`;

// ======================================================
// COMPONENTE
// ======================================================

const Contrato: React.FC = () => {
  const [plano, setPlano] = useState<PlanoNome>("Sites");
  const [aceito, setAceito] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------
  // Busca o plano pelo nome
  // ----------------------------------------------------

  const getPlanoPorNome = (nome: string): PlanoInfo | undefined => {
    return planos.find(
      (item) => item.name.toLowerCase() === nome.toLowerCase()
    );
  };

  // ----------------------------------------------------
  // Plano atualmente selecionado
  // ----------------------------------------------------

  const planoInfo = getPlanoPorNome(plano);

  // ----------------------------------------------------
  // Lê ?plano=Sites da URL
  // ----------------------------------------------------

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planoSelecionado = params.get("plano");

    if (!planoSelecionado) {
      return;
    }

    const planoEncontrado = getPlanoPorNome(planoSelecionado);

    if (planoEncontrado) {
      setPlano(planoEncontrado.name as PlanoNome);
    }
  }, []);

  // ----------------------------------------------------
  // Formatação de valores
  // ----------------------------------------------------

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(value)
      .replace("R$", "")
      .trim();
  };

  // ----------------------------------------------------
  // Valores do plano
  // ----------------------------------------------------

  const valorSetup = planoInfo?.price_from
    ? Number(planoInfo.price_from)
    : null;

  const valorMensal = planoInfo?.price_monthly
    ? Number(planoInfo.price_monthly)
    : null;

  // ----------------------------------------------------
  // Verifica se é um plano que permite pagamento
  // ----------------------------------------------------

  const planoPermitePagamento =
    valorSetup !== null && valorMensal !== null;

  // ----------------------------------------------------
  // Fetch com retry
  // ----------------------------------------------------

  const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 3
  ): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);

        // Não repete erros 4xx.
        // Repete somente falhas 5xx.
        if (response.ok || response.status < 500) {
          return response;
        }

        if (i === retries - 1) {
          return response;
        }
      } catch (error) {
        if (i === retries - 1) {
          console.error(
            `Falha total na conexão após ${retries} tentativas.`,
            error
          );

          throw error;
        }

        const delay =
          Math.pow(2, i) * 1000 + Math.random() * 500;

        console.log(
          `[Tentativa ${i + 2}] Falha de conexão. ` +
            `Tentando novamente em ${delay.toFixed(0)}ms...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }

    throw new Error(
      "Falha total na conexão com o servidor."
    );
  };

  // ----------------------------------------------------
  // Submit
  // ----------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError(null);

    if (!aceito) {
      setError(
        "Você precisa aceitar os termos do contrato para continuar."
      );
      return;
    }

    if (!planoInfo) {
      setError(
        "Não foi possível identificar o plano selecionado."
      );
      return;
    }

    if (!planoPermitePagamento) {
      setError(
        "Este plano é personalizado e não possui pagamento automático. Entre em contato com a Nayco para receber um orçamento."
      );
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const cliente = {
      nome: formData.get("nome")?.toString() || "",
      cpf: formData.get("cpf")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      telefone: formData.get("telefone")?.toString() || "",

      empresa: formData.get("empresa")?.toString() || "",
      cnpj: formData.get("cnpj")?.toString() || "",
      telefoneComercial:
        formData.get("telefoneComercial")?.toString() || "",
      endereco:
        formData.get("endereco")?.toString() || "",
      nicho:
        formData.get("nicho")?.toString() || "",

      tipoSite:
        formData.get("tipoSite")?.toString() || "",
      dominioDesejado:
        formData.get("dominioDesejado")?.toString() || "",
      referencias:
        formData.get("referencias")?.toString() || "",
      observacoes:
        formData.get("observacoes")?.toString() || "",

      // Plano vindo do pt.json
      plano: planoInfo.name,

      // Valores vindos do pt.json
      valorSetup,
      valorMensal,

      // Aceite do contrato: gravamos não só o "true", mas
      // QUANDO e QUAL VERSÃO/TEXTO foi aceito, pra ter prova
      // do que exatamente o cliente concordou.
      aceite: true,
      aceiteEm: new Date().toISOString(),
      contratoVersao: CONTRATO_VERSAO,
      contratoTexto: CONTRATO_TEXTO_INTEGRAL,
    };

    try {
      const response = await fetchWithRetry(
        API_URL_COMPLETA,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cliente),
        }
      );

      let data: {
        message?: string;
        pagamentoUrl?: string;
      } = {};

      try {
        data = (await response.json()) as {
          message?: string;
          pagamentoUrl?: string;
        };
      } catch {
        data = {};
      }

      if (response.ok && data.pagamentoUrl) {
        // Backend já gravou aceite + cópia do contrato e
        // devolveu o link de pagamento do Mercado Pago.
        window.location.href = data.pagamentoUrl;
        return;
      }

      const errorMessage =
        data.message ||
        "Erro ao processar o contrato. Tente novamente.";

      console.error(
        "Erro ao processar contrato:",
        data
      );

      setError(
        `Erro do servidor (${response.status}): ${errorMessage}`
      );
    } catch (error) {
      console.error(
        "Erro na requisição FETCH:",
        error
      );

      setError(
        "Erro de conexão com o servidor. Verifique se o backend está online e configurado corretamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="contrato-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .contrato-page {
          min-height: 100vh;
          padding: 30px 20px 60px;
          background: #f4f7fb;
          font-family: "Poppins", sans-serif;
          color: #333;
        }

        .contrato-container {
          max-width: 1000px;
          margin: 0 auto;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
          padding: 40px;
        }

        /* BOTÃO VOLTAR */

        .btn-voltar {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 25px;
          color: #004aad;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .btn-voltar:hover {
          color: #003b91;
          transform: translateX(-2px);
        }

        /* HEADER */

        .contrato-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .contrato-header h1 {
          color: #004aad;
          margin-bottom: 10px;
          font-size: 2rem;
          font-weight: 700;
        }

        .contrato-header p {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        /* PLANO */

        .plano-detalhes {
          background: #f7faff;
          border: 1px solid #dbe6ff;
          border-radius: 14px;
          padding: 25px;
          text-align: center;
          margin-bottom: 30px;
        }

        .plano-detalhes h2 {
          margin: 0 0 18px;
          color: #333;
          font-size: 1.2rem;
        }

        .plano-info {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          color: #004aad;
        }

        .plano-info span {
          display: block;
        }

        .plano-info .plano-nome {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .plano-info .plano-valor {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .plano-info .plano-valor small {
          display: block;
          margin-top: 3px;
          font-size: 0.72rem;
          font-weight: 500;
          color: #6a7a99;
          text-transform: uppercase;
          letter-spacing: .03em;
        }

        .plano-observacao {
          margin-top: 18px;
          color: #555;
          font-size: 0.88rem;
        }

        /* FORM */

        .contrato-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .dados-pessoais,
        .dados-empresa,
        .dados-site {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .section-title {
          color: #444;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 5px;
          padding-bottom: 8px;
          border-bottom: 1px solid #ddd;
        }

        .input-group {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
          );
          gap: 15px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s ease;
          background: #fff;
        }

        textarea {
          resize: vertical;
          min-height: 90px;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: #004aad;
          box-shadow: 0 0 4px rgba(0, 74, 173, 0.3);
          outline: none;
        }

        input:disabled,
        select:disabled,
        textarea:disabled {
          background-color: #f0f0f0;
          cursor: not-allowed;
        }

        /* CONTRATO */

        .texto-contrato {
          height: 320px;
          overflow-y: auto;
          border: 1px solid #e0e0e0;
          background: #fafafa;
          padding: 20px;
          border-radius: 12px;
          line-height: 1.55;
          font-size: 0.93rem;
          scroll-behavior: smooth;
          color: #444;
        }

        .texto-contrato h3 {
          font-size: 1.05rem;
          color: #004aad;
          margin-top: 18px;
          margin-bottom: 7px;
        }

        .texto-contrato h3:first-child {
          margin-top: 0;
        }

        .texto-contrato p,
        .texto-contrato li {
          margin-bottom: 8px;
        }

        .texto-contrato ul {
          padding-left: 20px;
        }

        .texto-contrato::-webkit-scrollbar {
          width: 8px;
        }

        .texto-contrato::-webkit-scrollbar-thumb {
          background: #004aad;
          border-radius: 10px;
        }

        /* ACEITE */

        .aceite {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .aceite input {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          accent-color: #004aad;
        }

        .aceite label {
          color: #444;
          font-size: 0.95rem;
          cursor: pointer;
        }

        /* BOTÃO */

        .btn-submit {
          margin-top: 5px;
          background: #004aad;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 14px 20px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s ease,
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: #003b91;
          transform: translateY(-1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ERRO */

        .error-message {
          padding: 15px;
          margin-bottom: 20px;
          background-color: #ffeaea;
          border: 1px solid #ffb0b0;
          color: #cc0000;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.95rem;
        }

        /* AVISO PLANO */

        .consulta-message {
          padding: 15px;
          background: #fff8e6;
          border: 1px solid #f2d58a;
          color: #765b00;
          border-radius: 10px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* RESPONSIVO */

        @media (max-width: 700px) {
          .contrato-page {
            padding: 15px 10px 40px;
          }

          .contrato-container {
            padding: 22px 16px;
            border-radius: 14px;
          }

          .contrato-header h1 {
            font-size: 1.55rem;
          }

          .contrato-header p {
            font-size: 0.9rem;
          }

          .plano-info {
            flex-direction: column;
            gap: 15px;
          }

          .input-group {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: auto;
          }

          .texto-contrato {
            height: 300px;
            padding: 16px;
          }
        }
      `}</style>

      <div className="contrato-container">

        {/* ==================================================
            VOLTAR
        ================================================== */}

        <a
          href="https://nayco.com.br"
          className="btn-voltar"
        >
          ← Voltar para o site
        </a>

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="contrato-header">
          <h1>
            Contrato de Prestação de Serviços
          </h1>

          <p>
            Nayco-Tech | Criação, hospedagem e manutenção
            de sites
          </p>
        </header>

        {/* ==================================================
            PLANO
        ================================================== */}

        {planoInfo && (
          <section className="plano-detalhes">

            <h2>
              Plano Selecionado
            </h2>

            <div className="plano-info">

              <span className="plano-nome">
                {planoInfo.icon}{" "}
                {planoInfo.name.toUpperCase()}
              </span>

              {valorSetup !== null && (
                <span className="plano-valor">
                  R$ {formatValue(valorSetup)}

                  <small>
                    Setup único
                  </small>
                </span>
              )}

              {valorMensal !== null && (
                <span className="plano-valor">
                  R$ {formatValue(valorMensal)}/mês

                  <small>
                    Hospedagem + manutenção
                  </small>
                </span>
              )}

            </div>

            <div className="plano-observacao">
              {planoInfo.note}
            </div>

          </section>
        )}

        {/* ==================================================
            AVISO PLANO SOB CONSULTA
        ================================================== */}

        {!planoPermitePagamento && planoInfo && (
          <div className="consulta-message">
            <strong>
              Este projeto é personalizado.
            </strong>{" "}
            Os valores de setup e manutenção serão
            definidos após análise do briefing.
            O formulário abaixo pode ser utilizado
            para enviar os detalhes do projeto.
          </div>
        )}

        {/* ==================================================
            ERRO
        ================================================== */}

        {error && (
          <div
            className="error-message"
            role="alert"
          >
            <strong>Atenção!</strong>{" "}
            {error}
          </div>
        )}

        {/* ==================================================
            FORMULÁRIO
        ================================================== */}

        <form
          className="contrato-form"
          onSubmit={handleSubmit}
        >

          {/* ================================================
              DADOS PESSOAIS
          ================================================ */}

          <section className="dados-pessoais">

            <h3 className="section-title">
              Dados do Responsável
            </h3>

            <div className="input-group">

              <input
                type="text"
                name="nome"
                placeholder="Nome Completo"
                required
                disabled={loading}
              />

              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                required
                disabled={loading}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
              />

              <input
                type="tel"
                name="telefone"
                placeholder="Telefone/WhatsApp"
                required
                disabled={loading}
              />

            </div>

          </section>

          {/* ================================================
              DADOS DA EMPRESA
          ================================================ */}

          <section className="dados-empresa">

            <h3 className="section-title">
              Dados da Empresa/Negócio
            </h3>

            <div className="input-group">

              <input
                type="text"
                name="empresa"
                placeholder="Nome da Empresa"
                required
                disabled={loading}
              />

              <input
                type="text"
                name="cnpj"
                placeholder="CNPJ (opcional)"
                disabled={loading}
              />

              <select
                name="nicho"
                required
                disabled={loading}
                defaultValue=""
              >
                <option value="">
                  Selecione o Nicho de Atuação
                </option>

                <option value="delivery_food">
                  Delivery / Food
                </option>

                <option value="servicos_profissionais">
                  Serviços Profissionais
                </option>

                <option value="clinicas_saloes">
                  Clínicas e Salões
                </option>

                <option value="ecommerce">
                  E-commerce
                </option>

                <option value="freelancers_consultores">
                  Freelancers / Consultores
                </option>

                <option value="outro">
                  Outro
                </option>
              </select>

              <input
                type="tel"
                name="telefoneComercial"
                placeholder="Telefone Comercial"
                required
                disabled={loading}
              />

              <div className="full-width">

                <input
                  type="text"
                  name="endereco"
                  placeholder="Endereço completo"
                  required
                  disabled={loading}
                />

              </div>

            </div>

          </section>

          {/* ================================================
              DETALHES DO SITE
          ================================================ */}

          <section className="dados-site">

            <h3 className="section-title">
              O site que você quer
            </h3>

            <div className="input-group">

              <select
                name="tipoSite"
                required
                disabled={loading}
                defaultValue=""
              >
                <option value="">
                  Tipo de site
                </option>

                <option value="institucional">
                  Institucional
                </option>

                <option value="institucional_agendamento">
                  Institucional + agendamento online
                </option>

                <option value="loja_virtual">
                  Loja virtual
                </option>

                <option value="landing_page">
                  Landing page
                </option>

                <option value="outro">
                  Outro
                </option>
              </select>

              <input
                type="text"
                name="dominioDesejado"
                placeholder="Domínio desejado (ex: seunegocio.com.br)"
                disabled={loading}
              />

              <div className="full-width">

                <input
                  type="text"
                  name="referencias"
                  placeholder="Sites de referência / inspiração (opcional)"
                  disabled={loading}
                />

              </div>

              <div className="full-width">

                <textarea
                  name="observacoes"
                  placeholder="Conte um pouco mais sobre o que você precisa no site"
                  rows={4}
                  disabled={loading}
                />

              </div>

            </div>

          </section>

          {/* ==================================================
              CONTRATO
          ================================================== */}

          <div className="texto-contrato">

            <h3>
              Termos e Condições
            </h3>

            <h3>
              1. Objeto do Contrato
            </h3>

            <p>
              1.1. O presente contrato tem por objeto a
              prestação, pela Nayco-Tech, de serviços de
              criação, configuração, hospedagem e manutenção
              de website para o CLIENTE, conforme o plano
              selecionado nesta página.
            </p>

            <p>
              1.2. Para o plano SITES, o valor inicial do
              projeto é de{" "}
              <strong>
                R$ 490,00
              </strong>{" "}
              referente ao setup, além da mensalidade de{" "}
              <strong>
                R$ 149,00
              </strong>{" "}
              referente à hospedagem e manutenção.
            </p>

            <p>
              1.3. O setup do plano SITES será pago da
              seguinte forma:{" "}
              <strong>
                R$ 200,00 na contratação
              </strong>{" "}
              e{" "}
              <strong>
                R$ 290,00 na entrega do site
              </strong>.
            </p>

            <p>
              1.4. O escopo do site, suas seções,
              funcionalidades e limites serão definidos
              conforme o plano contratado e o briefing
              preenchido pelo CLIENTE.
            </p>

            <h3>
              2. Definições
            </h3>

            <p>
              Para fins deste instrumento, consideram-se:
              (i) "SERVIÇOS" — as atividades de criação,
              hospedagem e manutenção fornecidas pela
              Nayco-Tech; (ii) "PLANO" — o pacote selecionado
              pelo CLIENTE; (iii) "SITE" — o website
              desenvolvido para o CLIENTE.
            </p>

            <h3>
              3. Obrigações da Nayco-Tech
            </h3>

            <ul>
              <li>
                3.1. Desenvolver e entregar o SITE conforme
                o escopo contratado.
              </li>

              <li>
                3.2. Configurar a hospedagem e os recursos
                necessários para disponibilização do SITE.
              </li>

              <li>
                3.3. Manter o SITE disponível durante a
                vigência da manutenção mensal, ressalvadas
                interrupções decorrentes de manutenção,
                falhas de terceiros ou força maior.
              </li>

              <li>
                3.4. Realizar suporte técnico conforme o
                serviço contratado.
              </li>

              <li>
                3.5. Preservar a confidencialidade dos dados
                do CLIENTE e adotar medidas técnicas e
                administrativas razoáveis para proteção das
                informações.
              </li>

              <li>
                3.6. Realizar backups conforme os recursos
                disponíveis na infraestrutura utilizada.
              </li>
            </ul>

            <h3>
              4. Obrigações do CLIENTE
            </h3>

            <ul>
              <li>
                4.1. Fornecer dados verdadeiros, completos
                e atualizados.
              </li>

              <li>
                4.2. Fornecer textos, imagens, logotipos e
                demais materiais necessários ao projeto.
              </li>

              <li>
                4.3. Garantir que possui os direitos de uso
                sobre os materiais fornecidos.
              </li>

              <li>
                4.4. Manter sigilo sobre credenciais de
                acesso eventualmente fornecidas.
              </li>

              <li>
                4.5. Utilizar o SITE de acordo com a
                legislação brasileira.
              </li>

              <li>
                4.6. Efetuar os pagamentos nos prazos
                acordados.
              </li>
            </ul>

            <h3>
              5. Prazo de Entrega
            </h3>

            <p>
              5.1. O prazo estimado para entrega do SITE
              será informado conforme o projeto, sendo
              normalmente de 5 a 20 dias úteis após o
              recebimento dos materiais e informações
              necessárias.
            </p>

            <p>
              5.2. O prazo poderá ser alterado quando houver
              atraso no fornecimento de informações, materiais,
              aprovações ou alterações solicitadas pelo
              CLIENTE.
            </p>

            <h3>
              6. Suporte e Atualizações
            </h3>

            <p>
              6.1. A manutenção mensal inclui suporte técnico
              e atualizações compatíveis com o escopo do
              plano contratado.
            </p>

            <p>
              6.2. Alterações que ultrapassem o escopo
              contratado poderão ser cobradas separadamente,
              mediante orçamento e aprovação do CLIENTE.
            </p>

            <p>
              6.3. Novas funcionalidades, integrações,
              sistemas ou alterações estruturais poderão
              configurar novo projeto ou orçamento.
            </p>

            <h3>
              7. Pagamento
            </h3>

            <p>
              7.1. Para o plano SITES, o setup total é de{" "}
              <strong>
                R$ 490,00
              </strong>
              , sendo{" "}
              <strong>
                R$ 200,00 na contratação
              </strong>{" "}
              e{" "}
              <strong>
                R$ 290,00 na entrega
              </strong>.
            </p>

            <p>
              7.2. A mensalidade de hospedagem e manutenção
              é de{" "}
              <strong>
                R$ 149,00 por mês
              </strong>.
            </p>

            <p>
              7.3. Os pagamentos serão realizados por meio
              da plataforma de pagamentos indicada pela
              Nayco-Tech, atualmente o Mercado Pago, ou
              outra plataforma informada previamente.
            </p>

            <p>
              7.4. Pagamentos em atraso poderão resultar na
              suspensão temporária dos serviços até a
              regularização dos valores devidos.
            </p>

            <p>
              7.5. Os valores poderão ser reajustados
              anualmente mediante comunicação prévia ao
              CLIENTE.
            </p>

            <h3>
              8. Vigência, Prazo Mínimo e Rescisão
            </h3>

            <p>
              8.1. A contratação da hospedagem e manutenção
              possui prazo mínimo de{" "}
              <strong>
                12 (doze) meses
              </strong>{" "}
              contados a partir da disponibilização do SITE
              ao CLIENTE.
            </p>

            <p>
              8.2. Após o período mínimo de 12 meses, a
              manutenção mensal será renovada por prazo
              indeterminado, podendo ser encerrada por
              qualquer das partes mediante aviso prévio de
              30 (trinta) dias.
            </p>

            <p>
              8.3. Em caso de encerramento antes do término
              do prazo mínimo de 12 meses por iniciativa do
              CLIENTE, poderão ser cobradas as mensalidades
              restantes do período mínimo contratado, quando
              aplicável e permitido pela legislação.
            </p>

            <p>
              8.4. O setup correspondente ao trabalho de
              desenvolvimento já iniciado não será
              automaticamente reembolsável.
            </p>

            <h3>
              9. Domínio e Hospedagem
            </h3>

            <p>
              9.1. Quando o domínio for registrado em nome
              do CLIENTE, sua titularidade permanecerá com
              o CLIENTE.
            </p>

            <p>
              9.2. A hospedagem será administrada pela
              Nayco-Tech enquanto a manutenção estiver ativa.
            </p>

            <p>
              9.3. O domínio .com.br poderá estar incluído
              no primeiro ano conforme as condições
              apresentadas no plano contratado.
            </p>

            <p>
              9.4. Renovação de domínio após o período
              eventualmente incluído poderá depender de
              cobrança específica ou das condições vigentes
              da empresa registradora.
            </p>

            <h3>
              10. Limitação de Responsabilidade
            </h3>

            <p>
              10.1. A Nayco-Tech não será responsável por
              indisponibilidades causadas por provedores de
              hospedagem, registradores de domínio,
              plataformas externas, serviços de terceiros,
              falhas de internet, ataques externos ou força
              maior.
            </p>

            <p>
              10.2. A Nayco-Tech não será responsável por
              danos decorrentes de conteúdos fornecidos pelo
              CLIENTE ou de utilização inadequada do SITE.
            </p>

            <h3>
              11. Proteção de Dados — LGPD
            </h3>

            <p>
              11.1. As partes comprometem-se a tratar dados
              pessoais de acordo com a Lei nº 13.709/2018
              (Lei Geral de Proteção de Dados — LGPD) e
              demais normas aplicáveis.
            </p>

            <p>
              11.2. A Nayco-Tech adotará medidas técnicas e
              administrativas razoáveis para proteção dos
              dados tratados no âmbito da prestação dos
              serviços.
            </p>

            <h3>
              12. Propriedade Intelectual
            </h3>

            <p>
              12.1. O código-fonte, componentes, templates,
              estruturas e demais ativos técnicos previamente
              desenvolvidos pela Nayco-Tech permanecem de
              propriedade da Nayco-Tech, salvo acordo escrito
              em sentido contrário.
            </p>

            <p>
              12.2. Textos, imagens, logotipos, marcas e
              demais conteúdos fornecidos pelo CLIENTE
              permanecem de propriedade do CLIENTE ou de seus
              respectivos titulares.
            </p>

            <h3>
              13. Confidencialidade
            </h3>

            <p>
              13.1. As partes comprometem-se a manter sigilo
              sobre informações técnicas, comerciais e
              estratégicas recebidas em razão deste contrato,
              salvo quando sua divulgação for exigida por lei.
            </p>

            <h3>
              14. Alterações de Escopo
            </h3>

            <p>
              14.1. Solicitações que alterem
              significativamente o escopo inicialmente
              contratado poderão gerar custos adicionais.
            </p>

            <p>
              14.2. Integrações com sistemas de terceiros,
              APIs, gateways, CRMs, ERPs e outras plataformas
              poderão depender de permissões, credenciais,
              limitações técnicas e custos externos.
            </p>

            <h3>
              15. Força Maior
            </h3>

            <p>
              15.1. Nenhuma das partes será responsabilizada
              por descumprimentos decorrentes de eventos de
              força maior ou caso fortuito devidamente
              comprovados.
            </p>

            <h3>
              16. Notificações
            </h3>

            <p>
              16.1. As comunicações relacionadas a este
              contrato poderão ser realizadas por e-mail,
              WhatsApp ou outros canais previamente
              disponibilizados entre as partes.
            </p>

            <h3>
              17. Cessão
            </h3>

            <p>
              17.1. O CLIENTE não poderá transferir seus
              direitos e obrigações decorrentes deste
              contrato sem autorização prévia da Nayco-Tech,
              salvo quando permitido por lei.
            </p>

            <h3>
              18. Integralidade do Acordo
            </h3>

            <p>
              18.1. Este contrato, juntamente com o plano
              contratado e as informações fornecidas no
              briefing, constitui o entendimento entre as
              partes sobre os serviços contratados.
            </p>

            <h3>
              19. Nulidade Parcial
            </h3>

            <p>
              19.1. Caso alguma disposição deste contrato
              seja considerada inválida ou inaplicável, as
              demais disposições permanecerão vigentes.
            </p>

            <h3>
              20. Lei Aplicável e Foro
            </h3>

            <p>
              20.1. Este contrato será regido pelas leis da
              República Federativa do Brasil.
            </p>

            <p>
              20.2. Fica eleito o foro da comarca de
              Canoas/RS, ressalvadas as hipóteses em que a
              legislação determine foro diverso.
            </p>

            <p
              style={{
                marginTop: "25px",
                paddingTop: "15px",
                borderTop: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Ao aceitar eletronicamente este contrato, o
              CLIENTE declara ter lido, compreendido e
              concordado com os termos aqui estabelecidos,
              assumindo responsabilidade pelas informações
              fornecidas.
            </p>

          </div>

          {/* ==================================================
              ACEITE
          ================================================== */}

          <div className="aceite">

            <input
              type="checkbox"
              id="aceito"
              checked={aceito}
              onChange={(e) =>
                setAceito(e.target.checked)
              }
              required
              disabled={loading}
            />

            <label htmlFor="aceito">
              Declaro que li e aceito os termos do
              contrato.
            </label>

          </div>

          {/* ==================================================
              BOTÃO
          ================================================== */}

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading
              ? "Processando e gerando pagamento..."
              : planoPermitePagamento
              ? "Aceitar e ir para pagamento"
              : "Enviar briefing para orçamento"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Contrato;
