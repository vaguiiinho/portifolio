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
docker compose exec api npm run start:dev
docker compose exec api npm run build
docker compose exec api npm run test
docker compose exec api npm run test:e2e
```

Os testes de integração usam Testcontainers e precisam de acesso ao daemon Docker. Execute-os no estágio `build` da imagem:

```bash
docker build --target build -t portifolio-api-test ./backend
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock --entrypoint npm portifolio-api-test run test
```

No Docker Desktop com WSL, adicione `-e TESTCONTAINERS_HOST_OVERRIDE=host.docker.internal` se o PostgreSQL de teste não puder ser acessado.

## Primeiro administrador

Defina `DATABASE_URL`, `ADMIN_EMAIL` e `ADMIN_PASSWORD` no ambiente do backend
(use `.env.example` como referência) e execute:

O container de produção executa o seed automaticamente após aplicar as migrations. Para executá-lo manualmente em desenvolvimento, use:

```bash
docker compose exec api npm run db:seed
```

O comando pode ser executado mais de uma vez: ele cria o administrador somente
quando o e-mail ainda não existir e não altera uma conta já criada.

## Planejamento relacionado

- [docs/prd-backend-api.md](/home/vagner/workspace/portifolio/docs/prd-backend-api.md)
- [docs/prd-auth-permissoes.md](/home/vagner/workspace/portifolio/docs/prd-auth-permissoes.md)

## Observações

- O backend expõe a API pública e, no futuro, também as rotas administrativas.
- Mudanças de modelo Prisma normalmente exigem migration em `prisma/migrations/`.
