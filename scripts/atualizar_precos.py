from pathlib import Path

path = Path("index.html")
html = path.read_text(encoding="utf-8")

def replace_once(old, new, description):
    global html
    count = html.count(old)
    if count != 1:
        raise RuntimeError(
            f"{description}: esperado 1 trecho, encontrado {count}. "
            "Nenhuma alteração foi salva."
        )
    html = html.replace(old, new, 1)

replace_once(
    '<div class="price"><strong>R$ 497</strong><span data-i="setup">criação</span></div></div>',
    '<div class="price"><del id="bf-old-price-1">R$ 497</del><strong id="bf-price-1">R$ 299</strong><span data-i="setup">criação</span></div><span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span></div>',
    "Landing page"
)

replace_once(
    '<del id="bf-old-price">R$ 1.490</del>\n<strong id="bf-price">R$ 699</strong>',
    '<del id="bf-old-price">R$ 997</del>\n<strong id="bf-price">R$ 599</strong>',
    "Site institucional"
)

replace_once(
    '<div class="price"><strong>R$ 1.497</strong><span data-i="setup">criação</span></div></div>',
    '<div class="price"><del id="bf-old-price-3">R$ 1.497</del><strong id="bf-price-3">R$ 899</strong><span data-i="setup">criação</span></div><span class="bf-tag" data-i="bf_offer">OFERTA BLACK FRIDAY</span></div>',
    "Site com agendamento"
)

replace_once(
    '''    $("#bf-old-price").hidden = true;
    $(".bf-tag").hidden = true;
    $("#bf-price").textContent = "R$ 1.490";''',
    '''    document.querySelectorAll('[id^="bf-old-price"]').forEach(el => {
      el.hidden = true;
    });
    document.querySelectorAll(".bf-tag").forEach(el => {
      el.hidden = true;
    });

    $("#bf-price-1").textContent = "R$ 497";
    $("#bf-price").textContent = "R$ 997";
    $("#bf-price-3").textContent = "R$ 1.497";''',
    "Restauração dos preços após a campanha"
)

temp = path.with_suffix(".html.tmp")
temp.write_text(html, encoding="utf-8")
temp.replace(path)

print("Preços atualizados com sucesso.")
print("Landing page: R$ 497 por R$ 299")
print("Site institucional: R$ 997 por R$ 599")
print("Site com agendamento: R$ 1.497 por R$ 899")
print("Hospedagem e manutenção permanecem em R$ 99/mês.")
print("Após o prazo, os preços originais serão restaurados.")
