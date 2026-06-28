# 🎯 Objetivo
Elevar o padrão de código do frontend do portfólio para uma base mais modular, previsível e alinhada com Next.js moderno.

O foco é reduzir componentes monolíticos, separar UI de lógica e dados, diminuir estado desnecessário no client e organizar o código para facilitar manutenção, testes manuais e evolução de conteúdo.
Também entra no escopo evoluir a navegação para páginas por rota quando isso trouxer mais clareza, SEO e compartilhamento de links.

---

# 🧱 Contexto Técnico

* Frontend: Next.js App Router
* Linguagem: TypeScript
* UI: componentes React/Tailwind
* Dados: config local, hooks e rotas do backend
* Objetivo de arquitetura: preferir Server Components e usar Client Components apenas quando necessário

---

# 📌 Problemas Observados

## Código e responsabilidades
* Há componentes que concentram mais responsabilidade do que o ideal.
* Parte do conteúdo e das regras de exibição ainda fica espalhada entre `data/`, `hooks/` e `components/`.
* Alguns componentes misturam renderização com montagem de estados/CTAs/decisões de fluxo.
* Existem textos e blocos com regras repetidas para links internos e externos.

## Organização
* Ainda há chance de melhorar a separação entre:
  * UI pura
  * lógica de apresentação
  * dados e fontes de verdade
* Algumas áreas podem virar estruturas mais explícitas, como:
  * `components/sections/`
  * `components/layout/`
  * `hooks/`
  * `lib/content/`
  * `app/`

## Next.js moderno
* Alguns componentes client-side existem por necessidade real, mas outros podem ser convertidos para Server Components.
* Conteúdo estático e partes sem estado podem ser renderizadas no servidor.
* O formulário de contato e interações de tema/menu continuam justificando client-side.
* Seções com identidade própria podem virar páginas dedicadas em rotas separadas, mantendo a home mais enxuta.

---

# ⚙️ Regras de Implementação

* Priorizar Server Components sempre que não houver estado, eventos ou APIs do navegador.
* Usar Client Components somente para:
  * formulários interativos
  * tema
  * menu mobile
  * animações estritamente dependentes do client
  * interações locais com `useState`/`useEffect`
* Separar claramente:
  * UI em componentes sem regra de negócio
  * lógica em hooks/services/helpers
  * dados em módulos de conteúdo/fonte de verdade
* Evitar componentes monolíticos.
* Eliminar duplicidade de CTA, link externo/interno e textos de fallback.
* Melhorar nomes de arquivos, funções e variáveis quando houver ambiguidade.
* Preferir composição simples em vez de componentes “faz tudo”.

---

# 📂 Estrutura Esperada

frontend/
src/app/
src/components/
  layout/
  portfolio/
  sections/
  ui/
src/hooks/
src/lib/
  content/
  api/
  utils/
src/data/

---

# 🚀 Fases de Execução

Status atual:
* Fases 1, 2 e 3: concluídas.
* Fase 4: em andamento.
* Fases 5 e 6: pendentes.

## Fase 1: Auditoria e limites
### Status
* Concluída
### Subtarefas
* Mapear componentes que podem virar Server Components.
* Identificar componentes com múltiplas responsabilidades.
* Listar duplicidades de CTA, links e mensagens.
* Classificar arquivos em UI, lógica, dados e composição.
* Marcar componentes com `use client` que podem ser removidos.

### Critério de aceite
* Existe um inventário claro do que é UI, lógica e dado.

## Fase 2: Separação de responsabilidades
### Status
* Concluída
### Subtarefas
* Extrair conteúdo estático para módulos específicos.
* Extrair lógica reutilizável para hooks ou helpers.
* Dividir seções grandes em partes menores.
* Extrair regras de CTA/link interno-externo para helper compartilhado.
* Reduzir arquivos que misturam markup com montagem de conteúdo.

### Critério de aceite
* Nenhuma seção principal depende de um componente monolítico.

## Fase 3: Server Components primeiro
### Status
* Concluída
### Subtarefas
* Converter para Server Components tudo o que não precisar de estado.
* Manter client components apenas onde houver necessidade real.
* Reduzir `use client` ao mínimo.
* Separar blocos estáticos da página principal em componentes de servidor.
* Manter a camada de interação isolada em pontos específicos.

### Critério de aceite
* O número de client components cai sem perda funcional.

## Fase 4: Estrutura por rotas e páginas
### Status
* Em andamento
### Subtarefas
* Definir quais seções continuam na home e quais viram rotas próprias.
* Criar páginas dedicadas para áreas com contexto próprio, como portfólio, currículo ou contato, quando fizer sentido.
* Manter a home como landing page com visão geral e CTAs de navegação.
* Reaproveitar componentes compartilhados entre as rotas sem duplicar layout.
* Ajustar navegação e breadcrumbs/links para refletir a nova estrutura.

### Critério de aceite
* O site deixa de depender de uma única página longa para tudo o que é relevante.

## Fase 5: Consolidação de dados e fluxos
### Status
* Pendente
### Subtarefas
* Centralizar dados em módulos mais semânticos.
* Padronizar links internos/externos.
* Padronizar CTAs por persona e por objetivo.
* Quebrar `data/site.ts` em fontes de conteúdo por domínio.
* Remover textos duplicados de fallback e estado vazio.

### Critério de aceite
* O conteúdo não fica duplicado em múltiplos arquivos.

## Fase 6: Validação final
### Status
* Pendente
### Subtarefas
* Rodar lint e typecheck.
* Validar build.
* Revisar responsividade e navegação.

### Critério de aceite
* O frontend permanece estável e mais fácil de manter.

---

# ✅ Resultado Esperado

* Base mais legível e modular.
* Menor acoplamento entre dados, lógica e UI.
* Menos componentes client-side desnecessários.
* Melhor alinhamento com Next.js moderno.
* Menos duplicidade e mais previsibilidade para próximas features.
