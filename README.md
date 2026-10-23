# Ingridi Designer

Landing page da Ingridi Morokoski ([@ingrididesigner](https://www.instagram.com/ingrididesigner/)): alongamento em fibra de vidro, polygel, banho e esmaltação em gel e design de sobrancelhas. Valores e agendamento só pelo WhatsApp.

Site estático em TypeScript + HTML + CSS, sem dependências em produção. Hospedagem na Netlify (`netlify.toml`).

```bash
npm ci
npm run build   # gera dist/
npm run serve   # http://localhost:4173
npm run watch   # recompila ao salvar
```

## Estrutura
- `public/index.html` — página; os marcadores `<!--@...-->` são preenchidos no build.
- `src/data/site.ts` — WhatsApp, trabalhos do portfólio e serviços.
- `src/data/studio.ts` — opções do "Monte a sua" (cores tiradas das fotos).
- `src/nails.ts` — geometria das unhas (usada no build e no navegador).
- `src/render.ts` — HTML gerado no build (portfólio, serviços, "Monte a sua").
- `DESIGN.md` — cores, tipos e princípios.

## Adicionar um trabalho
1. Exporte a foto em 3:4 nos tamanhos 480, 800 e 1200 px (`public/img/<id>-<largura>.webp`), sem EXIF.
2. Adicione o item em `trabalhos` (`src/data/site.ts`) com nome, `alt` e estilos.
3. Confira que a foto não está repetida em outro lugar do site.

## A confirmar com a Ingridi
- Cidade (o site diz Campo Grande/MS, pelo DDD 67) e se quer endereço no site.
- Horários de atendimento (ainda fora do site).
- Autorização da cliente que aparece na foto da reação (`reacao-resultado`) e das clientes das fotos de mãos.
- Qual técnica foi usada em cada foto, para filtrar o portfólio por serviço além do estilo.
- Fotos de sobrancelhas (antes/depois) para a seção de sobrancelhas.
- Depoimentos reais de clientes (prints do WhatsApp/Instagram, com autorização).
- Textos de cuidados e respostas das dúvidas.

## Créditos
Fotos: Ingridi Morokoski. Fontes: Bodoni Moda, Hanken Grotesk e Pinyon Script (SIL Open Font License).
