# Frontend Next.js

Aplicação Next.js do portfólio, focada em conversão, conteúdo institucional e navegação pública.

## Estrutura

- `src/app/`: rotas e layout do App Router
- `src/components/portfolio/`: componentes de seção e composição visual
- `src/components/ui/`: primitives reutilizáveis
- `src/hooks/`: hooks de comportamento
- `src/lib/`: acesso a dados, conteúdo e utilitários

## Execução

```bash
npm run dev
npm run build
npm run lint
```

## Planejamento relacionado

- [docs/prd-frontend-portfolio.md](/home/vagner/workspace/portifolio/docs/prd-frontend-portfolio.md)
- [docs/prd-frontend-arquitetura.md](/home/vagner/workspace/portifolio/docs/prd-frontend-arquitetura.md)
- [docs/prd-auth-permissoes.md](/home/vagner/workspace/portifolio/docs/prd-auth-permissoes.md)

## Observações

- O frontend consome a API via `NEXT_PUBLIC_API_URL`.
- A maior parte da experiência pública deve continuar acessível sem autenticação.
