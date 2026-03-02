# MindEase Mobile (React Native)

Aplicativo mobile para o desafio de acessibilidade cognitiva, com foco em previsibilidade, reducao de carga mental e personalizacao da experiencia.

## Como executar

1. `cd mindease-mobile`
2. `npm install`
3. `npm run start`

## Arquitetura (Clean Architecture)

Separacao em camadas:

- `src/domain`: entidades e contratos de repositorio (independente de UI).
- `src/application`: casos de uso (regras de negocio / orquestracao).
- `src/infrastructure`: adaptadores concretos (persistencia AsyncStorage).
- `src/presentation`: telas, componentes e estados da interface.
- `src/core/di`: composicao de dependencias.

## Modulos exigidos no briefing

- **Painel cognitivo personalizavel**: `DashboardScreen`.
- **Organizador de tarefas com suporte cognitivo**: `TasksScreen`.
- **Perfil + configuracoes persistentes**: `ProfileScreen`.

## Requisitos de acessibilidade cognitiva implementados

- Nivel ajustavel de complexidade (`simple`, `balanced`, `detailed`).
- Modo de foco para ocultar distracoes.
- Modo resumo x detalhado.
- Contraste, espacamento e escala de fonte configuraveis.
- Alertas cognitivos e transicao suave entre atividades.
- Opcao de reduzir animacoes.

## Persistencia

- Preferencias do usuario: AsyncStorage (`mindease.settings.v1`).
- Tarefas e checklist: AsyncStorage (`mindease.tasks.v1`).
