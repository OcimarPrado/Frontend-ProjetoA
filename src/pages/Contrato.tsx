import React, { useEffect, useState } from "react";

// Tipagem e Mapeamento de Planos
type Plano = "starter" | "professional" | "enterprise";

const planosValores: Record<Plano, number> = {
  starter: 99,
  professional: 249,
  enterprise: 499,
};

// ** URL BASE DA API CORRIGIDA **
// Mudamos de localhost para host.docker.internal para resolver o "Failed to fetch" 
// em ambientes sandboxed (como o Canvas), permitindo a comunicação com o backend local.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://backend-projetoa-production.up.railway.app"; 
// ** ENDPOINT CORRETO **
const API_ENDPOINT = "/api/contract/assinar-e-pagar";


// O componente principal (App) agora lê os parâmetros diretamente da URL (window.location)
const App: React.FC = () => {
  const [plano, setPlano] = useState<Plano>("starter");
  const [valorPlano, setValorPlano] = useState<number>(99);
  const [aceito, setAceito] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Acessa os parâmetros da URL de forma nativa (evitando a dependência do Router)
    const params = new URLSearchParams(window.location.search);
    const planoSelecionado = params.get("plano")?.toLowerCase() as Plano | null; 

    if (planoSelecionado && planosValores[planoSelecionado]) {
      setPlano(planoSelecionado);
      setValorPlano(planosValores[planoSelecionado]);
    }
  }, []); 

  // Função utilitária para formatar o valor monetário
  const formatValue = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(value)
      .replace('R$', '')
      .trim();
  
  /**
   * Função que tenta realizar a requisição fetch e retenta em caso de falha de conexão (Failed to fetch).
   * Implementa o exponential backoff.
   * @param url URL do endpoint.
   * @param options Opções do fetch (method, headers, body, etc.).
   * @param retries Número máximo de tentativas.
   */
  const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url, options);
          if (response.ok || response.status < 500) {
            // Se a conexão foi bem-sucedida, ou o erro é um 4xx (erro do cliente), paramos de tentar.
            return response;
          }
        } catch (error) {
          // Captura erros de rede/conexão (como o TypeError: Failed to fetch)
          if (i === retries - 1) {
            // Se esta é a última tentativa, propaga o erro.
            console.error(`Falha total na conexão com o servidor após ${retries} tentativas.`, error);
            throw error;
          }
          // Exponential backoff: espera 2^i segundos antes da próxima tentativa.
          const delay = Math.pow(2, i) * 1000 + Math.random() * 500;
          console.log(`[Tentativa ${i + 2}] Falha de conexão. Tentando novamente em ${delay.toFixed(0)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      // Se sair do loop sem sucesso, lança um erro final
      throw new Error("Falha total na conexão com o servidor após várias tentativas.");
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!aceito) {
      setError("Você precisa aceitar os termos do contrato para continuar.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const cliente = {
      nome: formData.get("nome")?.toString() || "",
      cpf: formData.get("cpf")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      telefone: formData.get("telefone")?.toString() || "",
      empresa: formData.get("empresa")?.toString() || "",
      cnpj: formData.get("cnpj")?.toString() || "",
      telefoneComercial: formData.get("telefoneComercial")?.toString() || "",
      endereco: formData.get("endereco")?.toString() || "",
      nicho: formData.get("nicho")?.toString() || "",
      plano,
      aceite: true,
    };

    try {
      // ** USANDO fetchWithRetry E URL CORRIGIDA **
      const response = await fetchWithRetry(`${API_BASE_URL}${API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();

      if (response.ok && data.pagamentoUrl) {
        // Redireciona para o link de pagamento retornado pelo backend
        window.location.href = data.pagamentoUrl; 
      } else {
        const errorMessage = data.message || "Erro desconhecido ao processar o aceite do contrato. Tente novamente.";
        console.error("Erro ao processar o aceite do contrato. Tente novamente.", data);
        // Exibir erro específico do backend, se houver
        setError(`Erro do servidor (${response.status}): ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erro na requisição FETCH:", error);
      // ** MENSAGEM DE ERRO ATUALIZADA **
      setError("Erro de conexão com o servidor. Verifique se seu servidor está visível.");
    } finally {
        setLoading(false);
    }
  };

  return (
    // Container principal usando a classe customizada
    <div className="contrato-container">
      <style>
        {/* CSS Personalizado fornecido pelo usuário */}
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

          .contrato-container {
            max-width: 900px;
            margin: 60px auto;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            padding: 40px;
            font-family: "Poppins", sans-serif;
            color: #333;
          }

          .contrato-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .contrato-header h1 {
            color: #004aad;
            margin-bottom: 10px;
            font-size: 2rem;
            font-weight: 700; /* Added for Poppins bold */
          }

          .contrato-header p {
            font-size: 1rem;
            color: #666;
          }

          .plano-detalhes {
            background: #f7faff;
            border: 1px solid #dbe6ff;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
          }

          .plano-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-weight: bold;
            color: #004aad;
            font-size: 1.2rem;
          }
          
          .plano-info span {
            display: block; /* Ensure spans are block elements for better alignment */
          }
          .plano-info .plano-nome {
            font-size: 1.5rem;
            font-weight: 700;
          }
          .plano-info .plano-valor {
            font-size: 1.1rem;
            font-weight: 600;
          }


          .contrato-form {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .dados-pessoais, .dados-empresa {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .input-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }
          
          .full-width {
            grid-column: 1 / -1;
          }

          input, select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.2s ease;
          }

          input:focus, select:focus {
            border-color: #004aad;
            box-shadow: 0 0 4px rgba(0, 74, 173, 0.3);
            outline: none;
          }
          
          input:disabled, select:disabled {
            background-color: #f0f0f0;
            cursor: not-allowed;
          }


          .texto-contrato {
            height: 280px;
            overflow-y: auto;
            border: 1px solid #e0e0e0;
            background: #fafafa;
            padding: 20px;
            border-radius: 12px;
            line-height: 1.5;
            font-size: 0.95rem;
            scroll-behavior: smooth;
            color: #444;
          }

          .texto-contrato h3 {
             font-size: 1.1rem;
             color: #004aad;
             margin-top: 15px;
             margin-bottom: 5px;
          }

          .texto-contrato p, .texto-contrato li {
             margin-bottom: 8px;
          }

          .texto-contrato::-webkit-scrollbar {
            width: 8px;
          }

          .texto-contrato::-webkit-scrollbar-thumb {
            background: #004aad;
            border-radius: 10px;
          }

          .aceite {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .aceite label {
              color: #444;
          }

          .btn-submit {
            margin-top: 15px;
            background: #004aad;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 12px 20px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease, opacity 0.2s ease;
          }

          .btn-submit:hover:not(:disabled) {
            background: #003b91;
          }
          
          .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          /* Estilos para a mensagem de erro */
          .error-message {
            padding: 15px;
            margin-bottom: 20px;
            background-color: #ffeaea;
            border: 1px solid #ff0000;
            color: #cc0000;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
          }
        `}
      </style>

      {/* Header */}
      <header className="contrato-header">
        <h1>Contrato de Prestação de Serviços</h1>
        <p>Ocyan-Tech | Atendimento Automatizado</p>
      </header>

      {/* Detalhes do Plano */}
      <section className="plano-detalhes">
        <h2 className="text-xl font-semibold mb-2">Plano Selecionado</h2>
        <div className="plano-info">
            <span className="plano-nome">{plano.toUpperCase()}</span>
            <span className="plano-valor">R$ {formatValue(valorPlano)}/mês</span>
        </div>
      </section>
      
      {/* Exibição do erro na tela */}
      {error && (
          <div className="error-message" role="alert">
            <p><strong>Atenção!</strong> {error}</p>
          </div>
      )}

      <form className="contrato-form" onSubmit={handleSubmit}>
        
        {/* Dados Pessoais */}
        <section className="dados-pessoais">
          <h3 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">Dados do Responsável</h3>
          <div className="input-group">
            <input type="text" name="nome" placeholder="Nome Completo" required disabled={loading} />
            <input type="text" name="cpf" placeholder="CPF" required disabled={loading} />
            <input type="email" name="email" placeholder="Email" required disabled={loading} />
            <input type="tel" name="telefone" placeholder="Telefone/WhatsApp" required disabled={loading} />
          </div>
        </section>

        {/* Dados da Empresa/Negócio */}
        <section className="dados-empresa">
          <h3 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">Dados da Empresa/Negócio</h3>
          <div className="input-group">
            <input type="text" name="empresa" placeholder="Nome da Empresa" required disabled={loading} />
            <input type="text" name="cnpj" placeholder="CNPJ (opcional)" disabled={loading} />
            
            {/* CAMPO NICHO (usando a tag select para ser estilizada junto com input) */}
            <select name="nicho" required disabled={loading}>
              <option value="">Selecione o Nicho de Atuação</option>
              <option value="varejo_ecommerce">Vendas e E-commerce</option>
              <option value="servicos_profissionais">Serviços Profissionais</option>
              <option value="saude_bemestar">Saúde e Bem-Estar</option>
              <option value="educacao_treinamento">Educação e Treinamento</option>
              <option value="imobiliario_construcao">Imobiliário e Construção</option>
              <option value="automotivo">Setor Automotivo</option>
              <option value="food_service">Alimentos e Bebidas</option>
              <option value="tecnologia_saas">Tecnologia e SaaS</option>
              <option value="outros">Outros/Diversos</option>
            </select>

            <input type="tel" name="telefoneComercial" placeholder="Telefone Comercial" required disabled={loading} />
            <div className="full-width">
              <input type="text" name="endereco" placeholder="Endereço completo" required disabled={loading} />
            </div>
          </div>
        </section>

        {/* Contrato textual */}
        <div className="texto-contrato">
          <h3 className="font-bold text-indigo-700 mb-4 text-center">Termos e Condições</h3>
          
          <h3>1. Objeto do Contrato</h3>
          <p>
            1.1. O presente contrato tem por objeto a prestação, pela Ocyan-Tech, de serviços de atendimento automatizado, incluindo, sem
            prejuízo, chatbot, automações de vendas, consultoria digital, parametrizações, treinamentos e demais funcionalidades, **conforme o PLANO {plano.toUpperCase()}**, 
            no valor mensal de **R$ {formatValue(valorPlano)}**, cujas especificações e limites foram previamente selecionados pelo CLIENTE nesta página.
          </p>
          <p>
            1.2. As funcionalidades entregues, seus limites e formas de utilização serão as descritas na documentação do plano escolhido e/ou no
            escopo técnico acordado entre as partes.
          </p>

          <h3>2. Definições</h3>
          <p>
            Para fins deste instrumento, consideram-se: (i) “SERVIÇOS” — as atividades e ferramentas fornecidas pela Ocyan-Tech conforme o plano;
            (ii) “PLANO” — o pacote de funcionalidades e limites selecionados e contratados pelo CLIENTE; (iii) “USUÁRIO” — pessoa física que usa
            ou interage com o serviço em nome do CLIENTE.
          </p>

          <h3>3. Obrigações da Ocyan-Tech</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              3.1. Fornecer acesso aos SERVIÇOS contratados, mantendo manutenção corretiva e atualizações necessárias para operação normal.
            </li>
            <li>
              3.2. Envidar esforços razoáveis para garantir disponibilidade do serviço conforme os níveis aplicáveis ao PLANO; interrupções
              programadas serão informadas com antecedência.
            </li>
            <li>
              3.3. Prover suporte técnico conforme o nível previsto no PLANO (horários, canais e tempo de resposta estarão descritos no anexo
              de suporte).
            </li>
            <li>
              3.4. Preservar a confidencialidade dos dados do CLIENTE e adotar medidas técnicas e administrativas razoáveis para proteção das
              informações, em conformidade com a LGPD.
            </li>
            <li>
              3.5. Manter backups regulares conforme política interna; a Ocyan-Tech poderá, quando aplicável, fornecer procedimentos de restauração.
            </li>
          </ul>

          <h3>4. Obrigações do CLIENTE</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>4.1. Fornecer dados verdadeiros, completos e atualizados necessários à prestação dos SERVIÇOS.</li>
            <li>4.2. Responder por todos os conteúdos e informações inseridos no sistema, garantindo o devido consentimento quando aplicável.</li>
            <li>4.3. Manter sigilo e segurança de credenciais fornecidas; comunicar imediatamente acessos não autorizados.</li>
            <li>4.4. Utilizar os SERVIÇOS de acordo com a legislação aplicável, não praticando atos ilícitos, fraudulentos ou que violem direitos de terceiros.</li>
            <li>4.5. Colaborar com a Ocyan-Tech no que for razoavelmente solicitado para a configuração, integração e manutenção dos SERVIÇOS.</li>
          </ul>

          <h3>5. Níveis de Serviço e Disponibilidade</h3>
          <p>
            5.1. A Ocyan-Tech empenhar-se-á para disponibilizar os SERVIÇOS 24/7, salvo interrupções por manutenção programada ou causas
            de força maior. Os níveis específicos de disponibilidade, quando aplicáveis, constarão no anexo do PLANO contratado.
          </p>
          <p>
            5.2. Em caso de indisponibilidade que extrapole os níveis acordados e comprovada falha exclusiva da Ocyan-Tech, as partes poderão
            negociar créditos ou medidas compensatórias, observadas as limitações de responsabilidade deste contrato.
          </p>

          <h3>6. Suporte, Atendimento e Atualizações</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>6.1. O suporte prestado seguirá o SLA do PLANO (meios, horários e prioridade).</li>
            <li>6.2. Atualizações e melhorias poderão ser aplicadas automaticamente; alterações que impactem criticamente a operação serão comunicadas com antecedência mínima de 30 dias.</li>
            <li>6.3. Mudanças solicitadas pelo CLIENTE que impliquem desenvolvimento adicional serão objeto de orçamento e só serão executadas mediante acordo.</li>
          </ul>

          <h3>7. Pagamento, Reajuste e Tributos</h3>
          <p>
            7.1. O CLIENTE pagará o valor mensal correspondente ao PLANO contratado através da plataforma de pagamentos **Mercado Pago**, mediante o link/pagamento indicado pela Ocyan-Tech.
            Pagamentos em atraso por mais de 5 (cinco) dias úteis poderão implicar suspensão temporária do serviço até a regularização.
          </p>
          <p>
            7.2. Valores poderão ser reajustados anualmente, mediante notificação prévia, ou em razão de alterações tributárias que incidam sobre os serviços.
          </p>
          <p>
            7.3. Todos os tributos, taxas e encargos incidentes sobre os valores, de acordo com a legislação vigente, serão de responsabilidade da parte indicada na fatura conforme legislação aplicável.
          </p>

          <h3>8. Prazo, Renovação e Rescisão</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>8.1. O presente contrato vigorará por prazo indeterminado a partir da data de aceite pelo CLIENTE.</li>
            <li>8.2. Qualquer das partes pode rescindir mediante aviso prévio de 30 (trinta) dias.</li>
            <li>8.3. Rescisão por descumprimento de obrigação poderá ocorrer imediatamente, sem prejuízo da cobrança de valores devidos e indenizações cabíveis.</li>
            <li>8.4. Em caso de rescisão, a Ocyan-Tech poderá suspender imediatamente o acesso aos SERVIÇOS, observado o pagamento de valores devidos.</li>
          </ul>

          <h3>9. Acesso e Credenciais</h3>
          <p>
            9.1. Após a **confirmação de pagamento** pela plataforma Mercado Pago, a Ocyan-Tech gerará um usuário e uma senha para o CLIENTE e os enviará para o endereço de e-mail fornecido no formulário de aceite.
          </p>
          <p>
            9.2. Estas credenciais de acesso são pessoais e intransferíveis e darão acesso exclusivo ao **Painel do Cliente (Dashboard)**, onde o CLIENTE poderá gerenciar os serviços e dados contratados.
          </p>
          <p>
            9.3. O CLIENTE é o único responsável pela segurança e sigilo destas credenciais, devendo notificar a Ocyan-Tech imediatamente em caso de acesso não autorizado.
          </p>
          
          <h3>10. Limitação de Responsabilidade</h3>
          <p>
            10.1. A Ocyan-Tech não será responsável por danos indiretos, lucros cessantes, perda de dados ou qualquer outro dano especial decorrente
            do uso ou impossibilidade de uso dos SERVIÇOS, salvo dolo ou culpa grave comprovada.
          </p>
          <p>
            10.2. A responsabilidade total da Ocyan-Tech por quaisquer perdas e danos será limitada ao montante equivalente a 1 (um) mês do valor do PLANO
            contratado, acumulando-se eventuais indenizações previstas em lei.
          </p>

          <h3>11. Segurança e Proteção de Dados (LGPD)</h3>
          <p>
            11.1. As partes declaram que tratarão dados pessoais em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e demais normas aplicáveis.
          </p>
          <p>
            11.2. A Ocyan-Tech adotará medidas técnicas e administrativas razoáveis para proteger os dados, e notificará o CLIENTE sobre incidentes de segurança que possam afetar os dados pessoais sob sua responsabilidade, conforme legislação vigente.
          </p>

          <h3>12. Propriedade Intelectual</h3>
          <p>
            12.1. Todo software, códigos, documentação, marca e demais ativos intelectuais empregados na prestação dos SERVIÇOS são e permanecerão de propriedade exclusiva da Ocyan-Tech.
          </p>
          <p>
            12.2. O CLIENTE recebe apenas uma licença limitada, não exclusiva e intransferível de uso durante a vigência deste contrato, nos termos aqui previstos.
          </p>

          <h3>13. Confidencialidade</h3>
          <p>
            13.1. As partes obrigam-se a manter em sigilo informações técnicas, comerciais e estratégicas trocadas em razão deste contrato, não as divulgando a terceiros sem prévia autorização escrita, salvo obrigação legal.
          </p>

          <h3>14. Alterações nos Serviços e Integrações</h3>
          <p>
            14.1. A Ocyan-Tech poderá alterar, descontinuar ou melhorar funcionalidades, notificando o CLIENTE com antecedência mínima de 30 (trinta) dias
            quando tais alterações tiverem potencial impacto operacional.
          </p>
          <p>
            14.2. Integrações com sistemas de terceiros são realizadas conforme disponibilidade técnica e poderão exigir permissões, credenciais ou taxas adicionais.
          </p>

          <h3>15. Força Maior</h3>
          <p>
            15.1. Nenhuma das partes será responsabilizada por falhas no cumprimento das obrigações decorrentes de caso fortuito ou força maior, devidamente comprovado.
          </p>

          <h3>16. Notificações</h3>
          <p>
            16.1. Todas as comunicações entre as partes deverão ser realizadas por escrito, por e-mail ou pelos canais indicados, e serão consideradas entregues na data de envio, salvo indicação em contrário.
          </p>

          <h3>17. Cessão</h3>
          <p>
            17.1. O CLIENTE não poderá ceder ou transferir seus direitos e obrigações decorrentes deste contrato sem o prévio consentimento por escrito da Ocyan-Tech. A Ocyan-Tech poderá ceder este contrato a afiliadas ou em operação societária.
          </p>

          <h3>18. Totalidade do Acordo e Alterações</h3>
          <p>
            18.1. Este instrumento constitui o acordo integral entre as partes, substituindo entendimentos anteriores. Alterações deverão ser feitas por escrito e assinadas por ambas as partes.
          </p>

          <h3>19. Cláusula Separability (Nulidade Parcial)</h3>
          <p>
            19.1. Caso qualquer disposição deste contrato seja considerada inválida ou inaplicável, tal invalidade não afetará as demais disposições, que permanecerão em pleno vigor.
          </p>

          <h3>20. Lei Aplicável e Foro</h3>
          <p>
            20.1. Este contrato será regido pelas leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias dele decorrentes, as partes elegem o foro da comarca de CANOAS/RS, renunciando a qualquer outro, por mais privilegiado que seja.
          </p>

          <p className="mt-6 text-base font-medium text-center p-2 border-t border-gray-300">
            Ao aceitar eletronicamente este contrato, o CLIENTE declara ter lido, compreendido e concordado com todos os termos aqui estabelecidos,
            assumindo integral responsabilidade pelas informações fornecidas e pelo uso dos SERVIÇOS.
          </p>          
        </div>

        <div className="aceite">
          <input
            type="checkbox"
            id="aceito"
            checked={aceito}
            onChange={(e) => setAceito(e.target.checked)}
            required
            disabled={loading}
            // Tailwind classes para o checkbox para manter o estilo de foco
            className="w-4 h-4 text-[#004aad] bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" 
          />
          <label htmlFor="aceito">
            Declaro que li e aceito os termos do contrato.
          </label>
        </div>

        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? "Processando e Gerando Pagamento..." : "Aceitar e Ir para Pagamento"}
        </button>
      </form>
    </div>
  );
};

export default App;