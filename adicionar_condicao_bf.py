from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")

def replace_once(old, new, description):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(
            f"{description}: esperado 1 trecho, encontrado {count}. "
            "Arquivo não foi alterado."
        )
    html = html.replace(old, new, 1)

# Estilo visual da condição
replace_once(
    '.bf-tag{display:inline-block;align-self:flex-start;padding:6px 12px;border-radius:999px;background:var(--lime);color:var(--dark);font:800 11px var(--mono);letter-spacing:.05em}',
    '.bf-tag{display:inline-block;align-self:flex-start;padding:6px 12px;border-radius:999px;background:var(--lime);color:var(--dark);font:800 11px var(--mono);letter-spacing:.05em}\n.bf-condition{margin:22px 0;padding:22px 24px;border:1px solid rgba(198,244,50,.4);border-radius:16px;background:rgba(198,244,50,.07)}\n.bf-condition strong{display:block;color:var(--lime);font:800 17px var(--head);margin-bottom:8px}\n.bf-condition p{color:var(--mute);font-size:14px;line-height:1.7;margin:5px 0}\n.bf-condition b{color:var(--ink)}',
    "CSS da condição promocional"
)

# Aviso abaixo dos três planos e antes da hospedagem
replace_once(
    '</div>\n<div class="host"><div><h3 data-i="hs_t">',
    '''</div>
<aside class="bf-condition" id="bf-condition">
<strong data-i="bf_condition_title">BLACK FRIDAY: 40% OFF NA CRIAÇÃO DO SEU SITE</strong>
<p data-i="bf_condition_text">Promoção exclusiva para quem contratar também a hospedagem com manutenção da Nayco.</p>
<p><b data-i="bf_condition_host">Hospedagem + manutenção: R$ 99/mês.</b></p>
<p data-i="bf_condition_note">A contratação da hospedagem é obrigatória. A mensalidade é cobrada separadamente, desde o início da hospedagem. O desconto vale somente sobre a criação do site.</p>
</aside>
<div class="host"><div><h3 data-i="hs_t">''',
    "Aviso abaixo dos planos"
)

# Tradução em inglês
replace_once(
    'bf_offer:"BLACK FRIDAY OFFER",f_h:',
    'bf_offer:"BLACK FRIDAY OFFER",bf_condition_title:"BLACK FRIDAY: 40% OFF WEBSITE CREATION",bf_condition_text:"Exclusive offer for customers who also subscribe to Nayco hosting and maintenance.",bf_condition_host:"Hosting + maintenance: R$ 99/month.",bf_condition_note:"Hosting subscription is mandatory. The monthly fee is charged separately from the start of hosting. The discount applies only to website creation.",f_h:',
    "Tradução inglesa"
)

# Tradução em espanhol
replace_once(
    'bf_offer:"OFERTA BLACK FRIDAY",f_h:',
    'bf_offer:"OFERTA BLACK FRIDAY",bf_condition_title:"BLACK FRIDAY: 40% DE DESCUENTO EN LA CREACIÓN DE TU SITIO WEB",bf_condition_text:"Oferta exclusiva para quienes también contraten el hosting con mantenimiento de Nayco.",bf_condition_host:"Hosting + mantenimiento: R$ 99 al mes.",bf_condition_note:"La contratación del hosting es obligatoria. La mensualidad se cobra por separado desde el inicio del hosting. El descuento se aplica únicamente a la creación del sitio web.",f_h:',
    "Tradução espanhola"
)

# Ocultar a condição quando a campanha terminar
replace_once(
    '$("#bf-banner").hidden = true;',
    '$("#bf-banner").hidden = true;\n    $("#bf-condition").hidden = true;',
    "Expiração da condição promocional"
)

temp = path.with_suffix(".html.tmp")
temp.write_text(html, encoding="utf-8")
temp.replace(path)

print("Condição da Black Friday adicionada.")
print("Hospedagem obrigatória para participar da promoção.")
print("Mensalidade de R$ 99, cobrada separadamente.")
print("Traduções PT, EN e ES incluídas.")
print("Aviso configurado para desaparecer no fim da campanha.")
