Steps

Configurar projeto NestJS com Prisma e PostgreSQL, incluindo dependências e estrutura inicial.
Definir domínio DDD: entidades, value objects e interfaces para projetos, contato, estatísticas e configuração.
Implementar infraestrutura: repositórios Prisma para acesso a dados e configurações externas.
Desenvolver casos de uso (application layer): serviços para lógica de negócio (CRUD projetos, envio contato, atualização stats).
Criar controladores (presentation layer): endpoints REST com validação e tratamento de erros.
Implementar testes automatizados: unitários para serviços e repositórios, integração para endpoints.
Integrar frontend: atualizar componentes Next.js para consumir a API via fetch ou cliente HTTP.
Migrar dados: transferir dados estáticos do Next.js para o banco de dados via seeds Prisma.
Relevant files

src/domain/ — Entidades e interfaces (e.g., Project entity, IProjectRepository)
src/application/ — Casos de uso e serviços (e.g., CreateProjectUseCase, ContactService)
src/infrastructure/ — Repositórios Prisma e configurações (e.g., ProjectPrismaRepository, DatabaseConfig)
src/presentation/ — Controladores e DTOs (e.g., ProjectsController, CreateProjectDto)
prisma/schema.prisma — Esquema do banco de dados
src/test/ — Testes unitários e de integração
Verification

Executar testes unitários e de integração para cobrir pelo menos 80% do código.
Testar endpoints manualmente com Postman ou similar, verificando CRUD completo.
Integrar com frontend: executar Next.js e verificar carregamento de dados via API.
Validar migrações Prisma: aplicar schema e seeds, confirmar dados no banco.
Decisions

Estrutura por módulo: Usar src/projects/domain/, src/contact/domain/, etc., para melhor organização em DDD, já que o portfólio tem módulos distintos (projetos, contato, stats).
Autenticação: Não incluir inicialmente, focar em endpoints públicos; sugerir JWT para admin no futuro.
Validação: Usar class-validator para DTOs.
Tratamento de erros: Implementar filtros globais para respostas consistentes.
Further Considerations

Sugestão: Adicionar GraphQL em vez de REST para queries mais flexíveis em projetos — justificativa: portfólio pode beneficiar de queries customizadas para filtrar projetos por tech stack.
Sugestão: Implementar CQRS com eventos para operações como envio de contato (enviar email) — justificativa: separa leitura/escrita, melhora escalabilidade.
Sugestão: Usar Docker para desenvolvimento local — justificativa: facilita setup de Postgres e NestJS, embora não seja DevOps.
Sugestão: Adicionar logs estruturados com Winston — justificativa: melhor monitoramento em produção, mas opcional para desenvolvimento.