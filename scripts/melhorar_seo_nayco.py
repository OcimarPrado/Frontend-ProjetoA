from pathlib import Path
import shutil

path = Path("index.html")
html = path.read_text(encoding="utf-8")

def replace_once(old, new, label):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(
            f"{label}: esperado 1 trecho, encontrado {count}. "
            "Nenhuma alteração foi gravada."
        )
    html = html.replace(old, new, 1)

# SEO do cabeçalho
replace_once(
    "<title>Nayco | Criação de sites e hospedagem em Canoas, RS</title>",
    "<title>Nayco | Criação de sites profissionais em Canoas, RS</title>",
    "Título SEO"
)

replace_once(
    '<meta name="description" content="Criação de sites e landing pages. Hospedagem com manutenção opcional por R$ 99/mês. Atendimento direto pelo WhatsApp.">',
    '<meta name="description" content="Criação de sites profissionais em Canoas e região. Desenvolvemos seu site e oferecemos hospedagem com manutenção opcional por R$ 99/mês.">',
    "Meta description"
)

replace_once(
    '<meta property="og:description" content="Criação de sites com hospedagem e manutenção mensal opcionais por R$ 99.">',
    '<meta property="og:description" content="Sites profissionais para empresas e profissionais. Criação e publicação com hospedagem e manutenção opcionais por R$ 99/mês.">',
    "Descrição Open Graph"
)

replace_once(
    '"description":"Criação de sites e landing pages. Hospedagem com manutenção mensal opcional."',
    '"description":"Criação de sites profissionais para empresas e profissionais em Canoas e região. Hospedagem com manutenção opcional por R$ 99 por mês."',
    "Descrição dos dados estruturados"
)

# Texto principal em português
replace_once(
    '<h1 data-i="h1">Seu site no ar em dias, não em semanas.</h1>',
    '<h1 data-i="h1">Criação de sites profissionais para o seu negócio.</h1>',
    "H1 em português"
)

replace_once(
    '<p class="lead" data-i="h_sub">Criamos seu site. A hospedagem com manutenção é opcional e custa R$ 99 por mês. Você só atende os clientes que chegarem.</p>',
    '<p class="lead" data-i="h_sub">A Nayco cria e publica seu site para fortalecer sua presença na internet e apresentar seus serviços de forma profissional. Se desejar, contrate também nossa hospedagem com manutenção por R$ 99/mês, de forma opcional. Você cuida do seu negócio. Nós cuidamos da tecnologia.</p>',
    "Subtítulo em português"
)

# Tradução inglesa
replace_once(
    'h1:"Your website live in days, not weeks.",h_sub:"We build your website. Hosting with maintenance is optional and costs R$ 99 per month.",',
    'h1:"Professional website creation for your business.",h_sub:"Nayco creates and launches your website to strengthen your online presence and showcase your services professionally. If you wish, you can also subscribe to our hosting with maintenance for R$ 99/month. You focus on your business. We take care of the technology.",',
    "Texto em inglês"
)

# Tradução espanhola
replace_once(
    'h1:"Tu sitio web en línea en días, no en semanas.",h_sub:"Creamos tu sitio web. El hosting con mantenimiento es opcional y cuesta R$ 99 al mes.",',
    'h1:"Creación de sitios web profesionales para tu negocio.",h_sub:"Nayco crea y publica tu sitio web para fortalecer tu presencia en internet y presentar tus servicios de forma profesional. Si lo deseas, también puedes contratar nuestro hosting con mantenimiento por R$ 99 al mes. Tú te ocupas de tu negocio. Nosotros nos ocupamos de la tecnología.",',
    "Texto em espanhol"
)

backup = Path("index.html.backup-seo-hero")
if not backup.exists():
    shutil.copy2(path, backup)

temp = path.with_suffix(".html.tmp")
temp.write_text(html, encoding="utf-8")
temp.replace(path)

print("SEO e texto principal atualizados.")
print("Português, inglês e espanhol atualizados.")
print("Meta description, Open Graph e dados estruturados atualizados.")
print(f"Backup preservado em: {backup}")
