# Backend NestJS

API NestJS do portfólio, organizada por módulos e seguindo Clean Architecture + DDD.

## Estrutura

- `src/modules/projects/`: CRUD de projetos
- `src/modules/contact/`: envio de contato
- `src/modules/stats/`: métricas do site
- `src/modules/config/`: configurações do site
- `src/shared/`: infraestrutura compartilhada
- `prisma/`: schema, seeds e migrations

## Execução

Os comandos do backend devem rodar dentro do container:

```bash
docker compose exec backend npm run start:dev
docker compose exec backend npm run build
docker compose exec backend npm run test
docker compose exec backend npm run test:e2e
```

## Planejamento relacionado

- [docs/prd-backend-api.md](/home/vagner/workspace/portifolio/docs/prd-backend-api.md)
- [docs/prd-auth-permissoes.md](/home/vagner/workspace/portifolio/docs/prd-auth-permissoes.md)

## Observações

- O backend expõe a API pública e, no futuro, também as rotas administrativas.
- Mudanças de modelo Prisma normalmente exigem migration em `prisma/migrations/`.
