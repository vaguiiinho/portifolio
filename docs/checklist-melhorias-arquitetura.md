# Checklist de Melhorias Arquiteturais

Este documento organiza melhorias para evoluir o projeto sem perder a simplicidade atual. A ordem sugerida prioriza segurança, consistência e valor prático antes de abstrações mais elaboradas.

## Objetivos

- Manter módulos independentes por domínio.
- Reforçar as fronteiras entre `domain`, `application`, `infrastructure` e `presentation`.
- Usar o Prisma tipado para operações CRUD comuns.
- Concentrar regras de negócio em entidades, Value Objects e use cases.
- Melhorar segurança, testes e previsibilidade operacional.

## Prioridade alta — Segurança e infraestrutura

- [x] Criar um `DatabaseModule` global que exporte uma única instância de `PrismaService`.
- [x] Remover os providers duplicados de `PrismaService` dos módulos de domínio.
- [x] Criar configuração tipada e validada durante o bootstrap da aplicação.
- [x] Exigir `DATABASE_URL` e `AUTH_JWT_SECRET` em produção; não usar segredo JWT padrão fora de desenvolvimento.
- [x] Centralizar configuração de CORS, cookie, JWT e porta em um serviço de ambiente.
- [x] Ocultar mensagens internas de Prisma/Node em respostas `500` e registrar o detalhe apenas nos logs do servidor.
- [x] Tratar `P2002` do Prisma como `409 Conflict` para campos únicos, como e-mail de usuário.
- [x] Tratar `P2025` do Prisma como `404 Not Found` quando aplicável.
- [x] Definir estratégia CSRF/origin-check para operações autenticadas que usam cookie.
- [x] Revisar `secure`, `sameSite` e domínio do cookie para produção.
- [x] Manter seed idempotente para o primeiro administrador e documentar o procedimento de execução.

## Prioridade alta — Prisma e persistência

### Migração de CRUD comum para Prisma tipado

- [x] Migrar `UserPrismaRepository` de `$queryRaw` para `prisma.user.findUnique`, `create` e demais métodos do client.
- [x] Migrar `ProjectPrismaRepository` para `prisma.project.findMany`, `findUnique`, `create`, `update` e `delete`.
- [x] Migrar `ContactPrismaRepository` para `prisma.contact.create` e consultas tipadas.
- [x] Migrar `ConfigPrismaRepository` para `prisma.config`.
- [x] Usar `upsert` ou uma chave fixa para garantir que `Config` tenha somente um registro global.
- [x] Migrar `StatsPrismaRepository` para `prisma.stats` nas operações simples.
- [x] Manter `$queryRaw` somente em relatórios, agregações complexas ou atualizações atômicas que o Prisma não consiga expressar bem.
- [x] Documentar cada uso restante de SQL bruto com o motivo técnico: não há uso remanescente em repositórios CRUD.
- [x] Criar mappers explícitos entre modelo Prisma e entidade de domínio.
- [x] Manter `prisma generate` no build e na CI para garantir que o client reflita o schema atual.

### Concorrência e consistência

- [x] Garantir criação segura de `Config` e `Stats` sob requisições simultâneas.
- [ ] Usar transações para operações que alterem mais de uma tabela ou exigirem atomicidade.
- [ ] Avaliar um `UnitOfWork` apenas quando existirem casos de uso multi-repositório reais.
- [x] Padronizar a estratégia de geração de IDs: Prisma `cuid`, UUID ou um `IdGenerator` injetável.

## Prioridade média — DDD e regras de domínio

### Entidades com comportamento e validação

- [x] Mover invariantes de negócio para entidades, não apenas para DTOs.
- [x] Garantir que `User` não possa existir com e-mail inválido, role inválida ou hash de senha vazio.
- [x] Garantir que `Project` não possa existir sem título, descrição ou tecnologias válidas.
- [x] Garantir que `Contact` valide nome, e-mail e mensagem como regras de domínio.
- [x] Garantir que `Config` normalize e valide os conteúdos localizados antes de persistir.
- [x] Garantir que `Stats` não aceite contadores negativos nem incrementos inválidos.
- [x] Preferir métodos de intenção nas entidades, como `project.updateDetails()` e `stats.trackEvent()`, em vez de alterar estado de forma genérica.
- [ ] Manter construtores protegidos por factories ou métodos `create`/`restore` quando a complexidade das entidades aumentar.

### Value Objects

- [x] Criar `Email` como Value Object: normalização, validação e comparação devem ficar em um único lugar.
- [x] Criar `PlainPassword` como Value Object para validar política mínima antes do hash.
- [x] Criar `PasswordHash` como Value Object para impedir persistência de hash vazio ou malformado.
- [ ] Criar `ProjectUrl`/`ExternalUrl` se a validação de GitHub, demo e vídeo se repetir.
- [ ] Criar `TechStack` como Value Object se houver regras de tamanho, duplicidade ou normalização de tecnologias.
- [ ] Criar `LocalizedContent` como Value Object se a estrutura multilíngue continuar crescendo.
- [ ] Evitar criar Value Objects para campos simples sem regra própria; o objetivo é encapsular comportamento, não aumentar quantidade de arquivos.

### Contratos e dependências

- [ ] Centralizar tokens de injeção em constantes `Symbol`, substituindo strings como `'IUserRepository'`.
- [ ] Impedir imports de `infrastructure` dentro de `domain` com regra de lint ou teste arquitetural.
- [ ] Manter interfaces de repositório no domínio e implementações Prisma na infraestrutura.
- [ ] Manter DTOs somente na apresentação; use cases devem receber inputs próprios da aplicação.
- [ ] Definir tipos de saída próprios para cada use case, como `CreateUserResult` e `ListProjectsResult`.
- [ ] Evitar que a camada de aplicação retorne entidades de domínio diretamente para controllers.
- [ ] Criar mappers na apresentação para converter `UseCaseResult` em `ResponseDto` HTTP.
- [ ] Garantir que respostas HTTP exponham somente campos permitidos e nunca detalhes internos da entidade, como `passwordHash`.
- [ ] Criar DTOs de resposta/mappers para não devolver entidades diretamente pelos controllers.

## Prioridade média — API e frontend

- [ ] Separar `frontend/src/lib/api.ts` por domínio: `auth`, `projects`, `config`, `stats` e `contact`.
- [ ] Centralizar cliente HTTP e tratamento de `401`, `403`, `409` e `500`.
- [ ] Adicionar feedback visual padronizado para loading, sucesso e erro nas mutações administrativas.
- [ ] Proteger a rota `/admin` antecipadamente com middleware baseado na presença da sessão.
- [ ] Manter o backend como fonte final de autorização, mesmo com proteção no frontend.
- [ ] Avaliar React Query ou SWR quando o painel tiver mais mutações, cache e invalidação de dados.
- [ ] Melhorar acessibilidade do dropdown de usuário: fechar ao clicar fora, tecla `Escape` e foco por teclado.
- [ ] Gerar contratos compartilhados via OpenAPI quando a API e o frontend crescerem, reduzindo duplicação de tipos.

## Prioridade média — Testes e qualidade

- [ ] Corrigir o setup de Testcontainers para testes de integração em ambiente com Docker disponível.
- [ ] Evitar falhas secundárias no `afterAll` quando um container de teste não iniciar.
- [ ] Cobrir `POST /auth/users`: sem token, visitante, administrador, payload inválido e e-mail duplicado.
- [ ] Cobrir seed: criação inicial, idempotência e falha sem variáveis obrigatórias.
- [ ] Criar testes de repositórios após migração para métodos tipados do Prisma.
- [ ] Criar testes de entidades e Value Objects para cada invariante relevante.
- [ ] Criar testes de contrato HTTP para payloads e códigos de status principais.
- [x] Corrigir o lint do `frontend/healthcheck.js` para que o pipeline possa falhar apenas por problemas reais.

## Prioridade futura — Operação e observabilidade

- [ ] Adicionar logs estruturados com contexto de request e erro.
- [ ] Adicionar identificador de correlação por requisição.
- [ ] Revisar health checks para incluir conectividade do banco quando necessário.
- [ ] Adicionar rate limit para login e formulário de contato.
- [ ] Definir paginação para projetos, contatos e futuras listas administrativas.
- [ ] Adicionar documentação de API com OpenAPI/Swagger.

## Ordem sugerida de execução

1. Configuração validada, segredo JWT, `PrismaService` único e filtro de erros seguro.
2. Migração dos CRUDs simples de `$queryRaw` para Prisma tipado.
3. Tratamento de erros Prisma, `upsert` de registros globais e estratégia de concorrência.
4. Value Object `Email` e validações essenciais nas entidades `User`, `Project` e `Contact`.
5. Testes de integração/e2e e testes das regras de domínio.
6. Organização do cliente HTTP do frontend, proteção de rota e melhorias de UX.
7. OpenAPI, observabilidade e refinamentos adicionais de DDD conforme a complexidade real do produto.
