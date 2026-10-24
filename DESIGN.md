# DESIGN.md — Ingridi Designer

## A ideia
Nesta página, **o formato da unha e a cartela de cores dos trabalhos da Ingridi** viram **a moldura das fotos e o "Monte a sua"**: a foto principal tem o topo amendoado de uma unha, e a cliente pinta a própria mão com as cores tiradas das fotos reais antes de mandar a mensagem.

## A coisa viva
"Monte a sua": técnica, formato, cor e acabamento. A mão em SVG muda de formato e o gel "sobe" da cutícula até a ponta a cada cor nova. A escolha vira a mensagem do WhatsApp. Sem JS, a prévia e o botão continuam lá com a escolha padrão.

## Cores (dos destaques do Instagram e do jaleco dela)
| Nome | Hex | Papel |
|---|---|---|
| creme | `#F4EBE1` | fundo |
| creme-2 | `#EADCCD` | superfície (degrau de tom) |
| verde | `#173A36` | tinta, seções escuras |
| verde-2 | `#224B46` | superfície sobre o verde |
| rosa | `#D99B98` | acento: botões de agendar, sobrancelhas, convite final |
| rosa-2 | `#C98783` | hover, foco, numerais |

Contraste conferido com axe (WCAG 2.2 AA): verde sobre creme, verde sobre rosa (5,2:1), rosa sobre verde, creme sobre verde.

## Tipografia
- **Bodoni Moda** (variável, OFL): títulos, nomes de serviços e trabalhos. Alto contraste, conversa com o "Ingridi" dourado do jaleco.
- **Hanken Grotesk** (variável, OFL): texto e interface.
- O logo "Ingridi" é um SVG de contorno (Pinyon Script, OFL), não uma terceira fonte carregada.

## Grid e ritmo
12 colunas, margem externa `clamp(16px, 4vw, 40px)`, gap entre seções `clamp(96px, 14vw, 200px)`. Texto sempre de um lado e foto, lista ou figura do outro.

## Versão 2 (pedido do Silas: mais impacto, no nível do site da Tali)
- Hero escuro com o "Ingridi" gigante que se escreve (contorno → cor), foto em arco por cima, frascos de gel em SVG flutuando, glitter dourado e selo girando "agende pelo whatsapp".
- Faixa rosa inclinada com os serviços, destaques em anéis como os do Instagram dela, galeria horizontal presa no desktop, frase dela acendendo no scroll, letras dos títulos subindo, glitter no cursor e etiqueta "quero essa" sobre as fotos.
- Sem tela de loading: no celular a página abre na hora (FCP/LCP ~1,5s em 3G lento + CPU 4x, 127 KB).
- "Reduzir movimento": fica o que não desloca a tela (fades, letras, frase acendendo, glitter); saem parallax, galeria presa, faixa correndo e frascos boiando.

## Princípios
- Um botão rosa = WhatsApp. Toda ação de agendar tem a mesma cor e o mesmo raio (pílula).
- Cada foto aparece uma vez só no site.
- Sem eyebrows, sem cards iguais, sem gradientes; superfícies separadas por tom.
- Movimento: entradas em cascata e o "pintar" do gel; com "reduzir movimento" vira só fade.
