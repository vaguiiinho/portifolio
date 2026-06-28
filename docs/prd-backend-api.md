# PRD - Backend da API

## Objetivo

Construir uma API REST profissional utilizando NestJS + Prisma + PostgreSQL, seguindo Clean Architecture e Domain-Driven Design (DDD), para servir dados dinâmicos a um frontend Next.js de portfólio.

A API deve ser escalável, testável e organizada por módulos de domínio: Projects, Contact, Stats e Config.
---

## Contexto Técnico

* Backend: NestJS
* ORM: Prisma
* Banco: PostgreSQL
* Validação: class-validator
* Arquitetura: Clean Architecture + DDD
* Testes: Jest (unitário + integração)
* Estrutura modular por domínio

---

## Estrutura Esperada

src/
modules/
projects/
domain/
application/
infrastructure/
presentation/
contact/
stats/
config/
shared/
domain/
infrastructure/
utils/

prisma/
schema.prisma

---

## Regras de Implementação

* Separar claramente camadas:

  * Domain: regras puras (sem dependência externa)
  * Application: casos de uso
  * Infrastructure: Prisma, serviços externos
  * Presentation: controllers + DTOs

* Usar interfaces para repositórios (Dependency Inversion)

* DTOs com validação usando class-validator

* Controllers SEM lógica de negócio

* Services = casos de uso

---

## Execução por Tarefas

### Tarefa 1: Setup do Projeto

#### Subtarefas

* Criar projeto NestJS
* Instalar dependências:

  * @nestjs/config
  * prisma
  * @prisma/client
  * class-validator
  * class-transformer
* Configurar Prisma com PostgreSQL
* Criar .env com DATABASE_URL
* Inicializar Prisma (init + generate)

#### Critério de Aceite

* Projeto roda com `npm run start:dev`
* Prisma conectado ao banco

---

### Tarefa 2: Modelagem do Banco (Prisma)

#### Subtarefas

Criar models:

Project:

* id
* title
* description
* techStack (array)
* githubUrl
* liveUrl
* createdAt

Contact:

* id
* name
* email
* message
* createdAt

Stats:

* id
* projectsCount
* visitors
* updatedAt

Config:

* id
* siteName
* description
* updatedAt

#### Critério de Aceite

* `prisma migrate dev` executa sem erros
* Banco criado corretamente

---

### Tarefa 3: Domínio

#### Subtarefas

* Criar entidades:

  * Project
  * Contact
  * Stats
  * Config

* Criar interfaces de repositório:

  * IProjectRepository
  * IContactRepository
  * etc.

#### Regras

* Sem dependência de NestJS ou Prisma
* Entidades com métodos de domínio se necessário

#### Critério de Aceite

* Domínio isolado e reutilizável

---

### Tarefa 4: Infraestrutura

#### Subtarefas

* Criar PrismaService
* Implementar repositórios:

  * ProjectPrismaRepository
  * ContactPrismaRepository

#### Regras

* Implementar interfaces do domínio
* Mapear Prisma ↔ Entidade

#### Critério de Aceite

* Repositórios funcionando com o banco

---

### Tarefa 5: Casos de Uso

#### Subtarefas

Projects:

* CreateProject
* ListProjects
* UpdateProject
* DeleteProject

Contact:

* SendContact

Stats:

* GetStats
* UpdateStats

#### Regras

* Cada caso de uso = 1 classe
* Injetar repositórios via interface

#### Critério de Aceite

* Lógica isolada e testável

---

### Tarefa 6: Apresentação

#### Subtarefas

Criar controllers:

ProjectsController:

* GET /projects
* POST /projects
* PUT /projects/:id
* DELETE /projects/:id

ContactController:

* POST /contact

StatsController:

* GET /stats

#### DTOs

* CreateProjectDto
* UpdateProjectDto
* ContactDto

#### Regras

* Validar dados com class-validator
* Usar pipes globais

#### Critério de Aceite

* Endpoints funcionando via Postman

---

### Tarefa 7: Tratamento de Erros

#### Subtarefas

* Criar GlobalExceptionFilter
* Padronizar resposta:

{
statusCode,
message,
error
}

#### Critério de Aceite

* Erros consistentes em toda API
* Endpoints funcionando via Postman ou `curl`

---

### Tarefa 8: Testes

#### Subtarefas

* Unitários:
  
  * domain
  * Casos de uso

* Integração:
* Repositórios utilizando Testcontainers
  * Controllers

#### Meta

* Cobertura mínima: 80%

#### Critério de Aceite

* `npm run test` sem falhas

---

### Tarefa 9: Seed de Dados

#### Subtarefas

* Criar seed.ts no Prisma
* Inserir projetos iniciais

#### Critério de Aceite

* Banco populado automaticamente

---

### Tarefa 10: Integração com Next.js

#### Subtarefas

* Criar client HTTP (fetch/axios)
* Substituir dados mock por API
* Criar hooks (useProjects, etc.)

#### Critério de Aceite

* Frontend consumindo a API corretamente

---

### Tarefa 11: CRUD de Projetos no Frontend e Backend

#### Subtarefas

* Criar fluxo de cadastro de projeto
* Criar fluxo de edição de projeto
* Reaproveitar os endpoints do backend para salvar alterações
* Adicionar ações de criar e editar na interface de projetos
* Validar título, descrição, tecnologias e URLs

#### Critério de Aceite

* Projetos podem ser criados e editados pela interface
* Backend persiste as alterações corretamente
* Lista de projetos atualiza após salvar

---

### Tarefa 12: Vídeos de Apresentação dos Projetos

#### Subtarefas

* Adicionar suporte a vídeo de apresentação por projeto
* Exibir vídeo na visualização de detalhes do projeto
* Permitir configurar URL ou arquivo de vídeo no cadastro/edição

#### Critério de Aceite

* Cada projeto pode exibir um vídeo de demonstração
* Vídeos ficam acessíveis na tela de detalhes do projeto

---

## Melhorias Futuras

* Autenticação JWT (admin)
* GraphQL
* CQRS + Events (envio de email no contact)
* Logs com Winston
* Docker

---

## Regras para o Agente

* Implementar UMA tarefa por vez
* NÃO pular etapas
* Sempre gerar código completo
* Manter consistência de nomes
* Evitar lógica duplicada
* Seguir rigorosamente DDD

---

## Resultado Esperado

Uma API:

* Escalável
* Organizada por domínio
* Pronta para produção (nível inicial)
* Fácil de integrar com frontend
* Com testes e boas práticas
