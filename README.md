# MindEase Mobile (React Native)

Aplicativo mobile para o desafio de acessibilidade cognitiva, com foco em previsibilidade, reducao de carga mental e personalizacao da experiencia.

## Pre-requisitos

- Node.js `20` (definido em `.nvmrc`)
- npm (recomendado para este projeto)
- Expo Go no dispositivo ou emulador Android/iOS
- Xcode instalado (apenas para iOS no macOS)

## Como executar

1. `cd mindease-mobile`
2. `nvm use`
3. `npm install`
4. `npm run start`

Atalhos uteis:

- `npm run android`
- `npm run ios`
- `npm run web`

## Observacoes importantes

- Use **npm** neste projeto. Se voce rodar `yarn` e receber erro de workspace (projeto "nearest package directory"), volte para `npm`.
- O arquivo `.nvmrc` fixa a versao de Node para manter compatibilidade com Expo/React Native.
- Se o Expo avisar sobre versoes esperadas de dependencias, rode `npx expo install --check` para validar e ajustar.

## Troubleshooting (iOS)

### Erro: `xcrun is not configured correctly`

Rode:

1. `xcode-select -p`
2. `sudo xcode-select --reset`
3. `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
4. `sudo xcodebuild -runFirstLaunch`
5. `xcrun simctl list`

Se necessario:

- `sudo xcodebuild -license accept`

### Erro: `Invalid device or device pair`

Isso ocorre quando o Expo tenta abrir um simulador com UUID antigo. Rode:

1. `killall Simulator`
2. `xcrun simctl shutdown all`
3. `xcrun simctl list devices available`
4. `open -a Simulator`
5. `npx expo start --ios --device "iPhone 16"`

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
