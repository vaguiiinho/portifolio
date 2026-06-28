# PRD - Frontend do Portfólio

## Objetivo
Transformar o portfólio em uma vitrine de conversão para vagas no LinkedIn e oportunidades freelance na Workana, destacando credibilidade, clareza de impacto e contato rápido.

O foco é apresentar projetos como cases, expor serviços com CTA direto e facilitar o download de currículo, o contato e a leitura rápida por recrutadores e clientes.

---

## Contexto Técnico

* Frontend: Next.js
* Backend: NestJS
* ORM: Prisma
* Banco: PostgreSQL
* Validação: class-validator
* Arquitetura: Clean Architecture + DDD no backend
* Testes: Jest no backend, validação manual/lint no frontend
* Público-alvo: recrutadores, gestores técnicos e clientes freelance

---

## Estrutura Esperada

frontend/
src/components/portfolio/
src/components/ui/
src/hooks/
src/lib/

backend/
src/modules/
  projects/
  contact/
  stats/
  config/
  testimonials/
  services/
prisma/
schema.prisma

---

## Regras de Implementação

* Cada projeto deve virar um estudo de caso com problema, solução e resultado.
* CTA principal deve ser visível em toda a navegação.
* Serviços devem ser claros e orientados a contratação.
* Links de contato devem incluir LinkedIn, GitHub, e-mail e WhatsApp.
* O backend deve continuar modular, com DTOs validados e controllers sem lógica de negócio.
* Preferir conteúdo objetivo, escaneável e orientado a conversão.

---

## Execução por Tarefas

### Tarefa 1: Posicionamento e Conteúdo Base

#### Subtarefas

* Definir headline principal do portfólio.
* Escrever bio curta para recrutadores e clientes.
* Revisar stack exibida publicamente.
* Padronizar CTAs para LinkedIn, GitHub, e-mail e WhatsApp.

#### Critério de Aceite

* O visitante entende em 5 segundos quem você é, o que faz e como te contatar.

### Tarefa 2: Estudos de Caso dos Projetos

#### Subtarefas

* Criar campos para problema, solução e resultado.
* Adicionar métricas ou impacto sempre que possível.
* Exibir tecnologia usada em cada projeto.
* Incluir vídeo ou captura quando houver material.

#### Critério de Aceite

* Cada projeto conta uma história de entrega, não apenas uma lista de tecnologias.

### Tarefa 3: Página ou Seção de Serviços

#### Subtarefas

* Criar cards de serviços com escopo claro.
* Priorizar serviços contratáveis: landing pages, dashboards, APIs, integrações e manutenção.
* Adicionar CTA de orçamento ou contato direto.

#### Critério de Aceite

* Um cliente consegue entender o que pode contratar sem ler o site inteiro.

### Tarefa 4: Currículo e Experiência

#### Subtarefas

* Criar página de currículo com resumo profissional.
* Listar experiência, formação e principais entregas.
* Incluir botão para baixar PDF.

#### Critério de Aceite

* Recrutadores acessam currículo e histórico sem sair do site.

### Tarefa 5: Prova Social

#### Subtarefas

* Criar seção de depoimentos.
* Permitir inserir nomes, cargo e empresa.
* Adicionar logos, certificados ou conquistas relevantes.

#### Critério de Aceite

* O portfólio transmite confiança além do código.

### Tarefa 6: SEO e Compartilhamento

#### Subtarefas

* Ajustar metadata, title e description por página.
* Configurar Open Graph e imagem de compartilhamento.
* Garantir URLs amigáveis para projetos e páginas institucionais.

#### Critério de Aceite

* O site compartilha bem no LinkedIn e aparece com contexto claro.

### Tarefa 7: Métricas e Conversão

#### Subtarefas

* Medir acessos por seção.
* Registrar cliques em CTAs principais.
* Identificar quais projetos recebem mais atenção.

#### Critério de Aceite

* É possível saber o que atrai mais recrutadores ou clientes.

### Tarefa 8: Internacionalização Opcional

#### Subtarefas

* Preparar PT-BR e EN para hero, projetos e contato.
* Priorizar versão em inglês para páginas mais vistas.

#### Critério de Aceite

* O portfólio pode ser lido por público local e internacional.

### Tarefa 9: Validação Final

#### Subtarefas

* Revisar responsividade desktop/mobile.
* Validar formulários, links e mídias.
* Conferir tempo de carregamento e consistência visual.

#### Critério de Aceite

* O site está pronto para compartilhamento público em LinkedIn e Workana.

---

## Prioridade Recomendada

### Fase 1: Conversão Imediata
Entregue primeiro o que mais impacta contratação e lead:
* Tarefa 1: Posicionamento e Conteúdo Base
* Tarefa 3: Página ou Seção de Serviços
* Tarefa 4: Currículo e Experiência
* Tarefa 9: Validação Final básica de links, formulários e responsividade

Resultado esperado:
* O visitante entende rapidamente o seu perfil e consegue te contatar ou contratar.

### Fase 2: Credibilidade e Prova Social
Depois foque em reforçar confiança:
* Tarefa 2: Case Studies de Projetos
* Tarefa 5: Prova Social
* Ajustes finos nos CTAs e textos de apoio

Resultado esperado:
* O portfólio passa de “site bonito” para “histórico real de entrega”.

### Fase 3: Alcance e Otimização
Por fim, amplie a descoberta e a mensuração:
* Tarefa 6: SEO e Compartilhamento
* Tarefa 7: Métricas e Conversão
* Tarefa 8: Internacionalização Opcional

Resultado esperado:
* Melhor alcance orgânico, leitura em múltiplos canais e base para iterar com dados.
