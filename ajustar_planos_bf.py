from pathlib import Path
import shutil

path = Path("index.html")
html = path.read_text(encoding="utf-8")

def replace_once(old, new, description):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(
            f"{description}: esperado 1 trecho, encontrado {count}. "
            "O HTML original não foi alterado."
        )
    html = html.replace(old, new, 1)

# 1. Estilo dos cards clicáveis e botão de aquisição
replace_once(
    ".plan.hl:hover{border-color:transparent}",
    """.plan.hl:hover{border-color:transparent}
.plan-link{text-decoration:none;color:inherit;cursor:pointer}
.plan-link:focus-visible{outline:3px solid var(--cyan);outline-offset:5px}
.plan-cta{display:inline-flex;align-items:center;justify-content:center;margin-top:12px;padding:13px 18px;border-radius:12px;background:var(--lime);color:var(--dark);font:800 14px var(--head);text-align:center;transition:transform .2s,filter .2s}
.plan-link:hover .plan-cta{transform:translateY(-2px);filter:brightness(1.08)}
.plan.hl .plan-cta{background:#fff;color:var(--dark)}
.bf-banner .bf-terms{margin-top:14px;padding-top:12px;border-top:1px solid rgba(198,244,50,.22)}
.bf-banner .bf-terms p{line-height:1.6;margin:5px 0}
.bf-banner .bf-terms b{color:var(--ink)}""",
    "CSS dos planos e painel promocional"
)

# 2. Um único painel com contador e condições da promoção
old_section = """<div class="bf-banner" id="bf-banner">
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
<div class="plans">
<div class="plan"><h3 data-i="p1t">Landing page</h3><p data-i="p1d">Uma página focada em vender um serviço, com botão direto para o WhatsApp.</p><div class="price"><del id="bf-old-price-1">R$ 497</del><strong id="bf-price-1">R$ 299</strong><span data-i="setup">criação</span></div><span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span></div>
<div class="plan hl"><h3 data-i="p2t">Site institucional</h3><p data-i="p2d">Até 5 seções, em português, inglês ou espanhol, com formulário e Google Maps.</p><div class="price">
<del id="bf-old-price">R$ 997</del>
<strong id="bf-price">R$ 599</strong>
<span data-i="setup">criação</span>
</div>
<span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span></div>
<div class="plan"><h3 data-i="p3t">Site com agendamento</h3><p data-i="p3d">Site completo mais agendamento online, com confirmação pelo WhatsApp.</p><div class="price"><del id="bf-old-price-3">R$ 1.497</del><strong id="bf-price-3">R$ 899</strong><span data-i="setup">criação</span></div><span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span></div>
</div>
<aside class="bf-condition" id="bf-condition">
<strong data-i="bf_condition_title">BLACK FRIDAY: 40% OFF NA CRIAÇÃO DO SEU SITE</strong>
<p data-i="bf_condition_text">Promoção exclusiva para quem contratar também a hospedagem com manutenção da Nayco.</p>
<p><b data-i="bf_condition_host">Hospedagem + manutenção: R$ 99/mês.</b></p>
<p data-i="bf_condition_note">A contratação da hospedagem é obrigatória. A mensalidade é cobrada separadamente, desde o início da hospedagem. O desconto vale somente sobre a criação do site.</p>
</aside>"""

new_section = """<div class="bf-banner" id="bf-banner">
<div>
<strong data-i="bf_title">Black Friday Nayco 2026</strong>
<p data-i="bf_until">Oferta válida até 27/11/2026 às 23h59, horário de Brasília.</p>
<div class="bf-terms">
<strong data-i="bf_condition_title">BLACK FRIDAY: 40% OFF NA CRIAÇÃO DO SEU SITE</strong>
<p data-i="bf_condition_text">Promoção exclusiva para quem contratar também a hospedagem com manutenção da Nayco.</p>
<p><b data-i="bf_condition_host">Hospedagem + manutenção: R$ 99/mês.</b></p>
<p data-i="bf_condition_note">A contratação da hospedagem é obrigatória. A mensalidade é cobrada separadamente, desde o início da hospedagem. O desconto vale somente sobre a criação do site.</p>
</div>
</div>
<div class="bf-clock" aria-label="Contagem regressiva">
<span><b id="bf-days">00</b><small data-i="bf_days">dias</small></span>
<span><b id="bf-hours">00</b><small data-i="bf_hours">horas</small></span>
<span><b id="bf-minutes">00</b><small data-i="bf_minutes">min</small></span>
<span><b id="bf-seconds">00</b><small data-i="bf_seconds">seg</small></span>
</div>
</div>
<div class="plans">
<a class="plan plan-link" data-plan="landing" href="https://wa.me/5551980534875" target="_blank" rel="noopener">
<h3 data-i="p1t">Landing page</h3>
<p data-i="p1d">Uma página focada em vender um serviço, com botão direto para o WhatsApp.</p>
<div class="price"><del id="bf-old-price-1">R$ 497</del><strong id="bf-price-1">R$ 299</strong><span data-i="setup">criação</span></div>
<span class="plan-cta" data-i="plan_buy">Adquirir já</span>
</a>
<a class="plan hl plan-link" data-plan="business" href="https://wa.me/5551980534875" target="_blank" rel="noopener">
<h3 data-i="p2t">Site institucional</h3>
<p data-i="p2d">Até 5 seções, em português, inglês ou espanhol, com formulário e Google Maps.</p>
<div class="price"><del id="bf-old-price">R$ 997</del><strong id="bf-price">R$ 599</strong><span data-i="setup">criação</span></div>
<span class="plan-cta" data-i="plan_buy">Adquirir já</span>
</a>
<a class="plan plan-link" data-plan="booking" href="https://wa.me/5551980534875" target="_blank" rel="noopener">
<h3 data-i="p3t">Site com agendamento</h3>
<p data-i="p3d">Site completo mais agendamento online, com confirmação pelo WhatsApp.</p>
<div class="price"><del id="bf-old-price-3">R$ 1.497</del><strong id="bf-price-3">R$ 899</strong><span data-i="setup">criação</span></div>
<span class="plan-cta" data-i="plan_buy">Adquirir já</span>
</a>
</div>"""

replace_once(old_section, new_section, "Painel promocional e cards de planos")

# 3. Retirar o CSS antigo do aviso separado
replace_once(
    ".bf-condition{margin:22px 0;padding:22px 24px;border:1px solid rgba(198,244,50,.4);border-radius:16px;background:rgba(198,244,50,.07)}\n.bf-condition strong{display:block;color:var(--lime);font:800 17px var(--head);margin-bottom:8px}\n.bf-condition p{color:var(--mute);font-size:14px;line-height:1.7;margin:5px 0}\n.bf-condition b{color:var(--ink)}\n",
    "",
    "CSS antigo do aviso separado"
)

# 4. Traduções do botão de aquisição
replace_once(
    'f_h:"Ready to put your business online?"',
    'plan_buy:"Get it now",f_h:"Ready to put your business online?"',
    "Botão em inglês"
)
replace_once(
    'f_h:"¿Ponemos tu negocio en línea?"',
    'plan_buy:"Adquirir ahora",f_h:"¿Ponemos tu negocio en línea?"',
    "Botão em espanhol"
)

# 5. Remover a referência ao aviso antigo na expiração
replace_once(
    '    $("#bf-condition").hidden = true;\n',
    '',
    "Remoção da referência ao aviso antigo"
)

# 6. Criar mensagens personalizadas por plano e idioma
insert_before = "function setLang(l){"
plan_function = r'''let currentLang = "pt";

function updatePlanLinks(lang){
  const active = Date.now() < BF_END;

  const plans = {
    landing: {
      name: {
        pt: "Landing page",
        en: "Landing page",
        es: "Landing page"
      },
      price: active ? "R$ 299" : "R$ 497"
    },
    business: {
      name: {
        pt: "Site institucional",
        en: "Business website",
        es: "Sitio corporativo"
      },
      price: active ? "R$ 599" : "R$ 997"
    },
    booking: {
      name: {
        pt: "Site com agendamento",
        en: "Website with booking",
        es: "Sitio con reservas"
      },
      price: active ? "R$ 899" : "R$ 1.497"
    }
  };

  const messages = {
    pt: (name, price) => active
      ? `Olá! Tenho interesse em adquirir o plano ${name} por ${price} na promoção Black Friday da Nayco. Sei que a oferta exige a contratação da hospedagem com manutenção por R$ 99/mês, cobrada separadamente desde o início. Gostaria de continuar.`
      : `Olá! Tenho interesse em adquirir o plano ${name}, com criação no valor de ${price}. Gostaria de receber mais informações.`,
    en: (name, price) => active
      ? `Hi! I'm interested in the ${name} plan for ${price} under Nayco's Black Friday offer. I understand that the offer requires hosting with maintenance for R$ 99/month, charged separately from the start. I'd like to proceed.`
      : `Hi! I'm interested in the ${name} plan, with a creation fee of ${price}. I'd like more information.`,
    es: (name, price) => active
      ? `¡Hola! Me interesa el plan ${name} por ${price} en la promoción Black Friday de Nayco. Entiendo que la oferta requiere contratar el hosting con mantenimiento por R$ 99 al mes, cobrado por separado desde el inicio. Me gustaría continuar.`
      : `¡Hola! Me interesa el plan ${name}, con un precio de creación de ${price}. Me gustaría recibir más información.`
  };

  $$(".plan-link").forEach(link => {
    const plan = plans[link.dataset.plan];
    if (!plan) return;
    const message = messages[lang](plan.name[lang], plan.price);
    link.href = `https://wa.me/${WHATS}?text=${encodeURIComponent(message)}`;
  });
}

'''
replace_once(insert_before, plan_function + insert_before, "Função de mensagens personalizadas")

# 7. Atualizar os links quando o idioma mudar
replace_once(
    'function setLang(l){\n  const d=T[l];',
    'function setLang(l){\n  currentLang=l;\n  const d=T[l];',
    "Idioma atual"
)
replace_once(
    '  $$(".wa-link").forEach(a=>a.href=`https://wa.me/${WHATS}?text=${encodeURIComponent(MSG[l])}`);',
    '  $$(".wa-link").forEach(a=>a.href=`https://wa.me/${WHATS}?text=${encodeURIComponent(MSG[l])}`);\n  updatePlanLinks(l);',
    "Atualização dos links ao trocar idioma"
)

# 8. Atualizar mensagens quando a promoção expirar
replace_once(
    '    $("#bf-price-3").textContent = "R$ 1.497";\n    return false;',
    '    $("#bf-price-3").textContent = "R$ 1.497";\n    updatePlanLinks(currentLang);\n    return false;',
    "Preços e links após a promoção"
)

# Backup preservado antes da gravação
backup = Path("index.html.backup-unificacao-bf")
if not backup.exists():
    shutil.copy2(path, backup)

temp = path.with_suffix(".html.tmp")
temp.write_text(html, encoding="utf-8")
temp.replace(path)

print("Alteração aplicada.")
print("Um único painel da Black Friday.")
print("Três cards clicáveis com mensagens personalizadas.")
print("Mensagens em português, inglês e espanhol.")
print("Links atualizados quando a promoção terminar.")
print(f"Backup: {backup}")
