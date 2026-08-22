# ♻️ EcoResende

Mapa interativo de pontos de coleta e reciclagem em Resende-RJ. Busque por
nome, endereço ou material, filtre por categoria, veja o ponto mais próximo
de você e trace a rota até lá.

[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com)

## Funcionalidades

- 🔍 Busca por nome, endereço ou tags (materiais aceitos)
- 🏷️ Filtro multi-select por categoria
- 🗺️ Mapa e lista sincronizados: clicar num card leva o mapa até o ponto,
  clicar num marcador rola a lista até o card
- 📍 Botão "ponto mais próximo" via geolocalização (distância real,
  cálculo Haversine)
- 🧭 Botão "Ir até o local" abrindo rota no Google Maps
- 🖼️ Cards expandem com descrição, condições de descarte, foto e mini-mapa

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org) 18+ e npm.

```bash
git clone https://github.com/pedrohcboa/ecoresende.git
cd ecoresende
npm install
npm run dev
```

O app sobe em `http://localhost:8080`.

### Outros comandos

```bash
npm run build     # build de produção (saída em dist/)
npm run preview   # serve o build de produção localmente
npm run lint       # eslint
npm run test         # roda a suíte de testes (vitest)
npm run test:watch   # testes em modo watch
```

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui (Radix) · Leaflet +
OpenStreetMap · React Router · TanStack Query · Vitest

## Estrutura do projeto

```
src/
  pages/         # páginas (Index = mapa + lista, NotFound = 404)
  components/    # MapView, PointCard, InfoCards, ui/ (shadcn)
  data/          # dados dos pontos de coleta
  lib/           # utilitários (cn, cálculo de distância)
  hooks/         # hooks compartilhados
  assets/        # imagens dos pontos
```

Mais detalhes de arquitetura e convenções em [`CLAUDE.md`](./CLAUDE.md).

## Contribuindo

1. Crie uma branch a partir de `main`: `git checkout -b feat/minha-mudanca`
2. Rode `npm run lint` e `npm run test` antes de abrir o PR
3. Commits pequenos e semânticos (`feat:`, `fix:`, `chore:`, `docs:`,
   `refactor:`)
4. Abra o PR descrevendo o que mudou e por quê

## Deploy

Frontend hospedado na [Vercel](https://vercel.com), integrado a este
repositório no GitHub — todo push em `main` gera um novo deploy.
