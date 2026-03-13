# Calculadora - React Native

Aplicação mobile de calculadora baseada em expressão, inspirada na calculadora da Motorola. Desenvolvida com React Native e Expo como projeto acadêmico da disciplina de Desenvolvimento Mobile.

## Desenvolvido por

- Davi Peterson Matos Conde
- José Lucas Ferreira Chaves

## Funcionalidades

- **Expressões completas** — digite `12 + 34 × 5` e veja a expressão inteira no display
- **Precedência de operadores** — multiplicação e divisão são avaliadas antes de soma e subtração
- **Parênteses** — suporte a agrupamento com inserção inteligente de `(` e `)`
- **Porcentagem** — converte o último número para percentual
- **Raiz quadrada** — calcula a raiz do resultado ou da expressão
- **Histórico** — últimos 50 cálculos salvos localmente (AsyncStorage)
- **Temas** — claro, escuro ou automático (sistema)
- **Display dinâmico** — fonte ajusta automaticamente ao tamanho da expressão, com cursor animado e scroll horizontal
- **Backspace** — corrige erros removendo o último caractere
- **Formatação pt-BR** — ponto como separador de milhar, vírgula como decimal

## Tecnologias Utilizadas

- React Native
- Expo 54
- Expo Router (navegação)
- TypeScript
- AsyncStorage (persistência)
- Lucide React Native (ícones)
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

## Como Usar

1. A aplicação inicia com o display vazio e o cursor piscando
2. Pressione os botões numéricos para construir a expressão
3. Adicione operadores (+, -, ×, ÷) entre os números
4. Use o botão `( )` para agrupar operações com parênteses
5. Use `%` para converter o último número em percentual
6. Pressione `=` para avaliar a expressão completa (com precedência de operadores)
7. Após o resultado, digitar um número inicia nova expressão; digitar operador continua do resultado
8. Pressione `AC` para limpar tudo
9. Pressione o ícone de histórico no header para ver cálculos anteriores
10. Pressione o ícone de menu para alternar entre temas (claro, escuro, sistema)

## Documentação Técnica

Para entender a arquitetura completa da aplicação, fluxo de dados, padrões de design e detalhamento de cada camada, consulte o arquivo [ARCHITECTURE.md](ARCHITECTURE.md).
