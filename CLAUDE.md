# EcoResende

Mapa interativo de pontos de coleta e reciclagem em Resende-RJ. Busca, filtra por
categoria, mostra o ponto mais próximo do usuário e traça rota até ele.

Migrado de um protótipo gerado no Lovable para desenvolvimento local. Todo o
desenvolvimento a partir de agora acontece neste repositório — sem Lovable.
Deploy: Vercel (frontend) + GitHub. Supabase está disponível para quando o
backend for adicionado (ver TODO).

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Leaflet + OpenStreetMap (mapa e marcadores)
- react-router-dom, @tanstack/react-query
- Vitest + Testing Library (testes unitários)
- Supabase (disponível, ainda não integrado)

## Comandos

```bash
npm run dev         # servidor de dev (porta 8080)
npm run build        # build de produção
npm run build:dev    # build em modo development (útil para debugar o bundle)
npm run preview      # serve o build de produção localmente
npm run lint          # eslint
npm run test           # vitest run (single run)
npm run test:watch     # vitest em modo watch
```

Não há testes e2e configurados no momento (o Playwright anterior dependia de
infraestrutura interna do Lovable e foi removido — ver TODO).

## Estrutura de pastas

```
src/
  pages/
    Index.tsx          # página principal: header, busca, lista + mapa
    NotFound.tsx        # 404
  components/
    MapView.tsx          # wrapper do Leaflet, marcadores custom, fly-to
    PointCard.tsx          # card colapsável de um ponto de coleta
    InfoCards.tsx            # dicas educativas de reciclagem (estático)
    ui/                        # shadcn/ui (gerado — evitar editar à mão, usar `npx shadcn add`)
  data/
    collectionPoints.ts          # dados estáticos dos pontos de coleta
  lib/
    utils.ts        # cn() (clsx + tailwind-merge)
    geo.ts            # haversineDistance()
  hooks/
    use-mobile.tsx, use-toast.ts
  assets/                # imagens dos pontos (fachadas)
```

## Convenções

- Path alias `@/` aponta para `src/` (configurado em `vite.config.ts` e `tsconfig`).
- Cores vêm de CSS variables HSL em `src/index.css`, expostas como cores do
  Tailwind em `tailwind.config.ts` (`primary`, `secondary`, `marker`, etc.).
  Não hardcodar `hsl(...)` direto em componentes — adicionar variável nova
  se precisar de uma cor que ainda não existe.
- Componentes de `src/components/ui/*` são do shadcn/ui: preferir adicionar
  novos via `npx shadcn add <componente>` a escrever do zero.
- Estado do mapa e da lista fica em `Index.tsx` e é passado via props
  (sem contexto/global state por enquanto — o app é pequeno o suficiente).
- Sincronização mapa↔lista: clicar num card faz o mapa voar até o ponto
  (`flyToPoint`); clicar num marcador faz a lista rolar até o card
  (`cardRefs`).

## TODO — próximos sprints

- [ ] **PWA**: manifest, ícones, service worker (funcionar offline com os
      pontos já carregados).
- [ ] **Ordenação por distância**: usar `haversineDistance` (já existe em
      `src/lib/geo.ts`) pra ordenar a lista lateral pela localização do
      usuário, não só achar o mais próximo.
- [ ] **Filtro "o que descartar"**: busca reversa — usuário digita o material
      e o app mostra só os pontos que aceitam aquilo.
- [ ] **URL por ponto**: rota tipo `/ponto/:id` pra compartilhar um ponto
      específico (hoje tudo é client-state, não há deep linking).
- [ ] **Integração Supabase**: mover `collectionPoints.ts` (hoje estático)
      pra uma tabela no Supabase; abre caminho pra admin de pontos e reviews
      reais (o mock de reviews foi removido na sprint de fundação — reavaliar
      se voltar a fazer sentido com dados reais).
