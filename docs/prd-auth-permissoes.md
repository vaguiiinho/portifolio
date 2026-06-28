# PRD - Autenticação e Permissões

## Objetivo
Implementar autenticação e autorização no projeto com dois papéis:
- `visitante`: somente leitura pública;
- `administrador`: pode criar, editar e deletar conteúdo.

O backend deve continuar sendo a fonte da verdade das permissões.

## Escopo
- Proteger rotas administrativas no backend.
- Criar base de usuário e papel no banco.
- Implementar login e validação de sessão.
- Criar guards e decorators para controle por papel.
- Ajustar o frontend para suportar login e área administrativa.
- Manter o acesso público para visitantes.

## Fora de escopo
- Cadastro público de usuários.
- Recuperação de senha.
- Multi-tenant.
- Permissões granulares além de visitante e administrador.

## Fases de Execução

### Fase 1: Definição da base de autenticação
- Escolher o método de login do administrador.
- Definir se haverá um admin fixo ou múltiplos usuários.
- Definir como o token será emitido e armazenado.
- Fechar as regras de acesso.

### Fase 2: Modelagem de dados e domínio
- Criar o model `User` no Prisma.
- Criar o enum de papel com `visitante` e `administrador`.
- Criar entidade de domínio para usuário.
- Criar interface de repositório de autenticação.
- Criar seed inicial do administrador, se aplicável.

### Fase 3: Núcleo de autenticação no backend
- Criar módulo `auth`.
- Criar use case de login.
- Criar validação de credenciais.
- Criar geração e validação de JWT.
- Criar decorator de role.
- Criar guard de autenticação.
- Criar guard de autorização por papel.

### Fase 4: Proteção das rotas administrativas
- Proteger `POST /projects`.
- Proteger `PUT /projects/:id`.
- Proteger `DELETE /projects/:id`.
- Proteger `PUT /config`.
- Revisar outros endpoints que possam virar administrativos no futuro.

### Fase 5: Ajustes no frontend público
- Manter as páginas públicas sem exigir login.
- Garantir tratamento amigável para `401` e `403`.
- Evitar exibir ações administrativas para visitantes.

### Fase 6: Área administrativa no frontend
- Criar página de login.
- Criar estado de sessão do administrador.
- Criar persistência do token.
- Criar interface para criar, editar e excluir projetos.
- Criar logout.

### Fase 7: Segurança e robustez
- Validar expiração do token.
- Padronizar respostas de `401` e `403`.
- Revisar CORS, headers e storage do token.
- Garantir que as permissões sejam validadas no backend.

### Fase 8: Testes e validação
- Criar testes do use case de login.
- Criar testes dos guards.
- Atualizar testes dos controllers protegidos.
- Cobrir o fluxo completo com testes e2e, se necessário.

## Ordem Recomendada
1. Definir a estratégia de login.
2. Modelar `User` e `role`.
3. Implementar `auth` no backend.
4. Proteger as rotas administrativas.
5. Criar a área admin no frontend.
6. Escrever testes e revisar segurança.

## Critérios de Aceite
- Visitante acessa apenas leitura pública.
- Administrador autentica com sucesso.
- Rotas de escrita rejeitam acesso sem permissão.
- O frontend reflete corretamente o estado de autenticação.
- Os testes cobrem os principais fluxos de acesso.
