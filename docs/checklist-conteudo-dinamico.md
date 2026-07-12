# Checklist de Implementação — Conteúdo Dinâmico

## Objetivo

Permitir que o administrador controle a quantidade de conteúdo das seções públicas e que o site não exiba caminhos ou blocos sem conteúdo publicado.

## Fase 1 — Modelagem e regras de conteúdo

- [x] Manter a bio de Sobre como uma lista de parágrafos, com mínimo de um item.
- [x] Manter serviços, depoimentos e pontos de confiança como listas independentes.
- [x] Permitir listas vazias para serviços, depoimentos e pontos de confiança.
- [x] Preservar o conteúdo em PT e EN separadamente.
- [x] Tratar listas vazias como conteúdo intencionalmente despublicado, sem restaurar dados padrão na área pública.

**Critério de aceite:** a API salva 1 ou mais parágrafos de Sobre e salva listas vazias para as demais coleções.

## Fase 2 — Painel administrativo

- [x] Adicionar e remover parágrafos da seção Sobre.
- [x] Impedir a remoção do último parágrafo de Sobre.
- [x] Adicionar e remover cards de serviços.
- [x] Adicionar e remover cards de depoimentos.
- [x] Adicionar e remover pontos de confiança.
- [x] Aplicar as mesmas ações em cada idioma.

**Critério de aceite:** o administrador consegue configurar, por idioma, por exemplo 1 ou 4 parágrafos e qualquer quantidade de cards ou pontos de confiança.

## Fase 3 — Exibição pública condicional

- [x] Ocultar a seção de depoimentos quando não houver depoimentos nem pontos de confiança.
- [x] Ocultar a rota `/servicos` da navegação desktop e mobile quando não houver cards de serviço.
- [x] Ocultar os atalhos de serviços da home e o CTA correspondente do hero quando não houver serviços.
- [x] Retornar página não encontrada para acesso direto a `/servicos` sem serviços publicados.

**Critério de aceite:** nenhum visitante encontra seção, link ou página vazia de serviços; prova social vazia não deixa espaço na página.

## Fase 4 — Validação e publicação

- [ ] Validar no painel a inclusão e remoção em PT e EN.
- [ ] Validar que salvar zero serviços remove a rota e os links públicos.
- [ ] Validar que salvar zero depoimentos e zero pontos oculta a seção na home e em Serviços.
- [ ] Executar `npm run lint` em `frontend/`.
- [ ] Registrar screenshots da área administrativa e das páginas públicas no PR.

**Critério de aceite:** os fluxos funcionam em desktop e mobile sem regressões de navegação.
