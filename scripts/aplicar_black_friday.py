from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")
original = html

def replace_once(old, new, description):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(
            f"Não foi possível alterar '{description}': "
            f"esperado 1 trecho, encontrado {count}. "
            "O arquivo original não será sobrescrito."
        )
    html = html.replace(old, new, 1)

# SEO e apresentação
replace_once(
    'content="Sites e landing pages no ar em dias, com hospedagem e manutenção mensal inclusas. Atendimento direto pelo WhatsApp."',
    'content="Criação de sites e landing pages. Hospedagem com manutenção opcional por R$ 99/mês. Atendimento direto pelo WhatsApp."',
    "descrição SEO"
)

replace_once(
    'content="Nayco | Seu site no ar em dias, com hospedagem e manutenção"',
    'content="Nayco | Criação de sites, hospedagem e manutenção"',
    "título Open Graph"
)

replace_once(
    'content="Criamos o site, cuidamos da hospedagem e fazemos a manutenção todo mês."',
    'content="Criação de sites com hospedagem e manutenção mensal opcionais por R$ 99."',
    "descrição Open Graph"
)

replace_once(
    '"description":"Criação de sites, landing pages, hospedagem e manutenção mensal."',
    '"description":"Criação de sites e landing pages. Hospedagem com manutenção mensal opcional."',
    "descrição estruturada"
)

# CSS da campanha
replace_once(
    '.host .price{margin:0;text-align:right}',
    """.host .price{margin:0;text-align:right}
.bf-banner{margin:32px 0 0;padding:22px 26px;border:1px solid rgba(198,244,50,.35);border-radius:20px;background:linear-gradient(110deg,rgba(198,244,50,.12),rgba(124,58,237,.2));display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}
.bf-banner strong{font:800 20px var(--head);color:var(--lime)}
.bf-banner p{font-size:14px;color:var(--mute);margin-top:5px}
.bf-clock{display:flex;gap:12px;text-align:center;font-family:var(--mono)}
.bf-clock span{min-width:48px}
.bf-clock b{display:block;font-size:24px;color:var(--ink)}
.bf-clock small{font-size:10px;color:var(--mute)}
.price del{display:block;font:500 16px var(--mono);color:var(--mute);text-decoration:line-through;margin-bottom:2px}
.bf-tag{display:inline-block;align-self:flex-start;padding:6px 12px;border-radius:999px;background:var(--lime);color:var(--dark);font:800 11px var(--mono);letter-spacing:.05em}
.bf-banner[hidden],.bf-tag[hidden],#bf-old-price[hidden]{display:none!important}""",
    "estilos da campanha"
)

replace_once(
    '.hero .grid,.about,.host{grid-template-columns:1fr}',
    '.hero .grid,.about,.host,.bf-banner{grid-template-columns:1fr}',
    "responsividade da campanha"
)

# Banner e contador
replace_once(
    '<div class="plans">',
    """<div class="bf-banner" id="bf-banner">
<div>
<strong data-i="bf_title">Black Friday Nayco 2026</strong>
<p data-i="bf_until">Oferta válida até 27/11/2026 às 23h59, horário de Brasília.</p>
</div>
<div class="bf-clock" aria-label="Contagem regressiva">
<span><b id="bf-days">00</b><small data-i="bf_days">dias</small></span>
<span><b id="bf-hours">00</b><small data-i="bf_hours">horas</small></span>
<span><b id="bf-minutes">00</b><small data-i="bf_minutes">min</small></span>
<span><b id="bf-seconds">00</b><small data-i="bf_seconds">seg</small></span>
</div>
</div>
<div class="plans">""",
    "banner Black Friday"
)

# Preço promocional
replace_once(
    '<div class="price"><strong>R$ 997</strong><span data-i="setup">criação</span></div>',
    """<div class="price">
<del id="bf-old-price">R$ 1.490</del>
<strong id="bf-price">R$ 699</strong>
<span data-i="setup">criação</span>
</div>
<span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span>""",
    "preço promocional"
)

# Cobrança da hospedagem
replace_once(
    'Domínio, SSL, backup e até 1 hora de ajustes por mês, incluídos.</p></div>',
    'Domínio, SSL, backup e até 1 hora de ajustes por mês, incluídos na mensalidade.</p><p data-i="hs_note">Cobrança mensal de R$ 99 desde o início da hospedagem.</p></div>',
    "explicação da mensalidade"
)

# Textos em português
replace_once(
    'Criamos o site, cuidamos da hospedagem e fazemos a manutenção todo mês. Você só atende os clientes que chegarem.',
    'Criamos seu site. A hospedagem com manutenção é opcional e custa R$ 99 por mês. Você só atende os clientes que chegarem.',
    "texto principal em português"
)

replace_once(
    'Trocas de texto, fotos e ajustes todo mês. Se algo quebrar, a gente conserta.',
    'Atualizações de textos, fotos e ajustes mensais, disponíveis na contratação da hospedagem com manutenção.',
    "descrição da manutenção"
)

replace_once(
    'Manutenção mensal inclusa: alguém responde quando você precisa',
    'Suporte e manutenção mensal disponíveis no plano de hospedagem por R$ 99/mês',
    "benefício sobre manutenção"
)

# Traduções em inglês
replace_once(
    'h1:"Your website live in days, not weeks.",h_sub:"We build the site, run the hosting and handle monthly maintenance. You just serve the customers who show up.",',
    'h1:"Your website live in days, not weeks.",h_sub:"We build your website. Hosting with maintenance is optional and costs R$ 99 per month.",',
    "texto principal em inglês"
)

replace_once(
    's3t:"Monthly maintenance",s3d:"Text, photo and layout updates every month. If something breaks, we fix it.",',
    's3t:"Monthly maintenance",s3d:"Monthly text, photo and layout updates are available with the hosting and maintenance plan.",',
    "descrição da manutenção em inglês"
)

replace_once(
    'hs_d:"Domain, SSL, backups and up to 1 hour of changes per month, included.",per_month:"per month",',
    'hs_d:"Domain, SSL, backups and up to 1 hour of monthly changes, included in the subscription.",hs_note:"The R$ 99 monthly fee starts when hosting begins.",per_month:"per month",',
    "hospedagem em inglês"
)

replace_once(
    'a2:"Monthly maintenance included: someone answers when you need help",',
    'a2:"Support and monthly maintenance available with the R$ 99/month hosting plan",',
    "benefício em inglês"
)

# Traduções em espanhol
replace_once(
    'h1:"Tu sitio web en línea en días, no en semanas.",h_sub:"Creamos el sitio, nos ocupamos del hosting y hacemos el mantenimiento cada mes. Tú solo atiendes a los clientes que lleguen.",',
    'h1:"Tu sitio web en línea en días, no en semanas.",h_sub:"Creamos tu sitio web. El hosting con mantenimiento es opcional y cuesta R$ 99 al mes.",',
    "texto principal em espanhol"
)

replace_once(
    's3t:"Mantenimiento mensual",s3d:"Cambios de texto, fotos y ajustes cada mes. Si algo falla, lo arreglamos.",',
    's3t:"Mantenimiento mensual",s3d:"Las actualizaciones mensuales de textos, fotos y diseño están disponibles con el plan de hosting y mantenimiento.",',
    "descrição da manutenção em espanhol"
)

replace_once(
    'hs_d:"Dominio, SSL, copias de seguridad y hasta 1 hora de cambios al mes, incluidos.",per_month:"al mes",',
    'hs_d:"Dominio, SSL, copias de seguridad y hasta 1 hora de cambios mensuales, incluidos en la suscripción.",hs_note:"El pago mensual de R$ 99 comienza cuando empieza el hosting.",per_month:"al mes",',
    "hospedagem em espanhol"
)

replace_once(
    'a2:"Mantenimiento mensual incluido: alguien responde cuando lo necesitas",',
    'a2:"Soporte y mantenimiento mensual disponibles con el plan de hosting de R$ 99 al mes",',
    "benefício em espanhol"
)

# Chaves das traduções do contador e da campanha
replace_once(
    'f_h:"Ready to put your business online?",',
    'bf_title:"Nayco Black Friday 2026",bf_until:"Offer valid until November 27, 2026, at 11:59 PM Brasília time.",bf_days:"days",bf_hours:"hours",bf_minutes:"min",bf_seconds:"sec",bf_offer:"BLACK FRIDAY OFFER",'
    'f_h:"Ready to put your business online?",',
    "traduções da campanha em inglês"
)

replace_once(
    'f_h:"¿Ponemos tu negocio en línea?",',
    'bf_title:"Black Friday Nayco 2026",bf_until:"Oferta válida hasta el 27/11/2026 a las 23:59, hora de Brasilia.",bf_days:"días",bf_hours:"horas",bf_minutes:"min",bf_seconds:"seg",bf_offer:"OFERTA BLACK FRIDAY",'
    'f_h:"¿Ponemos tu negocio en línea?",',
    "traduções da campanha em espanhol"
)

# Contador com prazo fixo universal
replace_once(
    'let saved=null;try{saved=localStorage.getItem("nayco-lang")}catch(e){}',
    """// Prazo fixo: 27/11/2026 às 23h59min59s em Brasília (UTC-3).
const BF_END = Date.UTC(2026,10,28,2,59,59);

function updateBlackFridayTimer(){
  const remaining = BF_END - Date.now();

  if(remaining <= 0){
    $("#bf-banner").hidden = true;
    $("#bf-old-price").hidden = true;
    $(".bf-tag").hidden = true;
    $("#bf-price").textContent = "R$ 1.490";
    return false;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  $("#bf-days").textContent = String(days).padStart(2,"0");
  $("#bf-hours").textContent = String(hours).padStart(2,"0");
  $("#bf-minutes").textContent = String(minutes).padStart(2,"0");
  $("#bf-seconds").textContent = String(seconds).padStart(2,"0");

  return true;
}

if(updateBlackFridayTimer()){
  const bfTimer = setInterval(()=>{
    if(!updateBlackFridayTimer()) clearInterval(bfTimer);
  },1000);
}

let saved=null;try{saved=localStorage.getItem("nayco-lang")}catch(e){}""",
    "contador regressivo"
)

if html == original:
    raise RuntimeError("Nenhuma alteração foi aplicada.")

# Só grava depois de todas as verificações passarem.
temp = path.with_suffix(".html.tmp")
temp.write_text(html, encoding="utf-8")
temp.replace(path)

print("Atualização aplicada com sucesso.")
print("Arquivo index.html atualizado.")
print("Backup original preservado.")
