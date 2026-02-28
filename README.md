# Calculadora - React Native

Aplicação mobile de calculadora desenvolvida com React Native e Expo, como projeto acadêmico da disciplina de Desenvolvimento Mobile.

## Desenvolvido por

- Davi Peterson Matos Conde
- Lucas Chaves

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- AsyncStorage
- Lucide React (ícones)
- Prettier (formatação de código)

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou pnpm (gerenciador de pacotes)
- Expo CLI instalado globalmente: `npm install -g expo-cli`

## Instalação

1. Clonar o repositório:

```bash
git clone https://github.com/daviPeter07/Calculadora-React-native
cd Calculadora-React-native
```

2. Instalar dependências:

```bash
pnpm install
```

3. Iniciar a aplicação:

```bash
pnpm start
```

4. Escanear o código QR gerado com o Expo Go no seu dispositivo mobile, ou pressionar:
   - `i` para emulador iOS
   - `a` para emulador Android
   - `w` para web

## Scripts Disponíveis

```bash
pnpm start          # Inicia o servidor de desenvolvimento Expo
pnpm android        # Inicia no emulador Android
pnpm ios            # Inicia no emulador iOS
pnpm web            # Inicia na versão web
pnpm lint           # Executa o linter do projeto
pnpm format         # Formata código com Prettier
pnpm format:check   # Verifica formatação sem fazer alterações
```

## Funcionalidades

- Operações matemáticas básicas (adição, subtração, multiplicação, divisão)
- Raiz quadrada
- Histórico de cálculos persistido em armazenamento local
- Decimal/vírgula para números fracionários
- Botão de backspace para corrigir erros
- Interface intuitiva e responsiva

## Como Usar

1. A aplicação inicia com o display mostrando "0"
2. Pressione os botões numéricos para digitar números
3. Pressione um operador (+, -, ×, ÷) para selecionar a operação
4. Digite o segundo número
5. Pressione "=" para executar o cálculo
6. O resultado é adicionado automaticamente ao histórico
7. Pressione "AC" para limpar tudo
8. Pressione o botão de histórico para ver cálculos anteriores

## Documentação Técnica

Para entender a arquitetura completa da aplicação, estrutura de componentes, fluxo de dados e detalhamento de cada funcionalidade, consulte o arquivo [ARCHITECTURE.md](ARCHITECTURE.md).
