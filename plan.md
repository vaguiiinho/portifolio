## Plan: Criar API NestJS para Portfólio Next.js

Desenvolver uma API REST em NestJS integrada com Prisma e PostgreSQL, seguindo Clean Architecture e Domain-Driven Design (DDD), para servir dados dinâmicos ao projeto Next.js de portfólio. A API substituirá os dados estáticos atuais por endpoints para projetos, formulário de contato, estatísticas e configuração do site, com testes automatizados.

**Steps**
1. Configurar projeto NestJS com Prisma e PostgreSQL, incluindo dependências e estrutura inicial.
2. Definir domínio DDD: entidades, value objects e interfaces para projetos, contato, estatísticas e configuração.
3. Implementar infraestrutura: repositórios Prisma para acesso a dados e configurações externas.
4. Desenvolver casos de uso (application layer): serviços para lógica de negócio (CRUD projetos, envio contato, atualização stats).
5. Criar controladores (presentation layer): endpoints REST com validação e tratamento de erros.
6. Implementar testes automatizados: unitários para serviços e repositórios, integração para endpoints.
7. Integrar frontend: atualizar componentes Next.js para consumir a API via fetch ou cliente HTTP.
8. Migrar dados: transferir dados estáticos do Next.js para o banco de dados via seeds Prisma.

**Relevant files**
- `src/domain/` — Entidades e interfaces (e.g., Project entity, IProjectRepository)
- `src/application/` — Casos de uso e serviços (e.g., CreateProjectUseCase, ContactService)
- `src/infrastructure/` — Repositórios Prisma e configurações (e.g., ProjectPrismaRepository, DatabaseConfig)
- `src/presentation/` — Controladores e DTOs (e.g., ProjectsController, CreateProjectDto)
- `prisma/schema.prisma` — Esquema do banco de dados
- `src/test/` — Testes unitários e de integração

**Verification**
1. Executar testes unitários e de integração para cobrir pelo menos 80% do código.
2. Testar endpoints manualmente com Postman ou similar, verificando CRUD completo.
3. Integrar com frontend: executar Next.js e verificar carregamento de dados via API.
4. Validar migrações Prisma: aplicar schema e seeds, confirmar dados no banco.

**Decisions**
- Estrutura por módulo: Usar src/projects/domain/, src/contact/domain/, etc., para melhor organização em DDD, já que o portfólio tem módulos distintos (projetos, contato, stats).
- Autenticação: Não incluir inicialmente, focar em endpoints públicos; sugerir JWT para admin no futuro.
- Validação: Usar class-validator para DTOs.
- Tratamento de erros: Implementar filtros globais para respostas consistentes.

**Further Considerations**
1. Sugestão: Adicionar GraphQL em vez de REST para queries mais flexíveis em projetos — justificativa: portfólio pode beneficiar de queries customizadas para filtrar projetos por tech stack.
2. Sugestão: Implementar CQRS com eventos para operações como envio de contato (enviar email) — justificativa: separa leitura/escrita, melhora escalabilidade.
3. Sugestão: Usar Docker para desenvolvimento local — justificativa: facilita setup de Postgres e NestJS, embora não seja DevOps.
4. Sugestão: Adicionar logs estruturados com Winston — justificativa: melhor monitoramento em produção, mas opcional para desenvolvimento.