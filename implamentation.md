# 🎯 Objetivo

Construir uma API REST profissional utilizando NestJS + Prisma + PostgreSQL, seguindo Clean Architecture e Domain-Driven Design (DDD), para servir dados dinâmicos a um frontend Next.js de portfólio.

A API deve ser escalável, testável e organizada por módulos de domínio: Projects, Contact, Stats e Config.

utilizar docker compose exec para rodar os comandos



---

# 🧱 Contexto Técnico

* Backend: NestJS
* ORM: Prisma
* Banco: PostgreSQL
* Validação: class-validator
* Arquitetura: Clean Architecture + DDD
* Testes: Jest (unitário + integração)
* Estrutura modular por domínio

---

# 📂 Estrutura Esperada

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

# ⚙️ Regras de Implementação

* Separar claramente camadas:

  * Domain: regras puras (sem dependência externa)
  * Application: casos de uso
  * Infrastructure: Prisma, serviços externos
  * Presentation: controllers + DTOs

* Usar interfaces para repositórios (Dependency Inversion)

* DTOs com validação usando class-validator

* Controllers SEM lógica de negócio

* Services = UseCases

---

# 🚀 Execução por Tarefas

## 🔹 Tarefa 1: Setup do Projeto

### Subtarefas

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

### Critério de Aceite

* Projeto roda com `npm run start:dev`
* Prisma conectado ao banco

---

## 🔹 Tarefa 2: Modelagem do Banco (Prisma)

### Subtarefas

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

### Critério de Aceite

* `prisma migrate dev` executa sem erros
* Banco criado corretamente

---

## 🔹 Tarefa 3: Domain Layer

### Subtarefas

* Criar entidades:

  * Project
  * Contact
  * Stats
  * Config

* Criar interfaces de repositório:

  * IProjectRepository
  * IContactRepository
  * etc.

### Regras

* Sem dependência de NestJS ou Prisma
* Entidades com métodos de domínio se necessário

### Critério de Aceite

* Domain isolado e reutilizável

---

## 🔹 Tarefa 4: Infrastructure Layer

### Subtarefas

* Criar PrismaService
* Implementar repositórios:

  * ProjectPrismaRepository
  * ContactPrismaRepository

### Regras

* Implementar interfaces do domínio
* Mapear Prisma ↔ Entidade

### Critério de Aceite

* Repositórios funcionando com banco

---

## 🔹 Tarefa 5: Application Layer (Use Cases)

### Subtarefas

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

### Regras

* Cada use case = 1 classe
* Injetar repositórios via interface

### Critério de Aceite

* Lógica isolada e testável

---

## 🔹 Tarefa 6: Presentation Layer

### Subtarefas

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

### DTOs

* CreateProjectDto
* UpdateProjectDto
* ContactDto

### Regras

* Validar dados com class-validator
* Usar pipes globais

### Critério de Aceite

* Endpoints funcionando via Postman

---

## 🔹 Tarefa 7: Tratamento de Erros

### Subtarefas

* Criar GlobalExceptionFilter
* Padronizar resposta:

{
statusCode,
message,
error
}

### Critério de Aceite

* Erros consistentes em toda API

---

## 🔹 Tarefa 8: Testes

### Subtarefas

* Unitários:

  * UseCases
  * Repositories (mock)

* Integração:

  * Controllers

### Meta

* Cobertura mínima: 80%

### Critério de Aceite

* `npm run test` sem falhas

---

## 🔹 Tarefa 9: Seed de Dados

### Subtarefas

* Criar seed.ts no Prisma
* Inserir projetos iniciais

### Critério de Aceite

* Banco populado automaticamente

---

## 🔹 Tarefa 10: Integração com Next.js

### Subtarefas

* Criar client HTTP (fetch/axios)
* Substituir dados mock por API
* Criar hooks (useProjects, etc.)

### Critério de Aceite

* Front consumindo API corretamente

---

# 📈 Melhorias Futuras (NÃO IMPLEMENTAR AGORA)

* Autenticação JWT (admin)
* GraphQL
* CQRS + Events (envio de email no contact)
* Logs com Winston
* Docker

---

# ⚠️ Regras para o Copilot Agent

* Implementar UMA tarefa por vez
* NÃO pular etapas
* Sempre gerar código completo
* Manter consistência de nomes
* Evitar lógica duplicada
* Seguir rigorosamente DDD

---

# ✅ Resultado Esperado

Uma API:

* Escalável
* Organizada por domínio
* Pronta para produção (nível inicial)
* Fácil de integrar com frontend
* Com testes e boas práticas
