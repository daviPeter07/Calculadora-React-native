# Arquitetura da Aplicação Calculadora

## Visão Geral

Calculadora baseada em expressão (estilo Motorola) construída com React Native + Expo Router. A aplicação segue um padrão de arquitetura em camadas:

- **Apresentação** — Componentes de UI (Button, Display, Header, etc.)
- **Lógica de Negócio** — Custom Hooks (useCalculator, useHistory)
- **Utilitários** — Funções puras (evaluate, formatter)
- **Tipos** — Definições de tipos centralizadas
- **Persistência** — AsyncStorage para histórico
- **Tema** — Context API para light/dark/system

## Estrutura de Pastas

```
src/
├── app/
│   ├── _layout.tsx              # Layout raiz com ThemeProvider
│   ├── index.tsx                # Tela principal (Calculator)
│   └── index.style.ts
├── components/
│   ├── Button/                  # Botão individual (agnóstico de domínio)
│   ├── ButtonGrid/              # Grid 5x4 dos botões da calculadora
│   ├── Display/                 # Display com font dinâmico e cursor animado
│   ├── Header/                  # Barra superior (histórico + menu de tema)
│   ├── HistorySection/          # Painel colapsável de histórico
│   └── OptionsMenu/             # Modal de seleção de tema
├── hooks/
│   ├── useCalculator.ts         # Orquestra input, expressão e resultado
│   └── useHistory.ts            # Persistência e gerenciamento do histórico
├── utils/
│   ├── evaluate.ts              # Parser e avaliador de expressões matemáticas
│   └── formatter.ts             # Formatação de números e expressões (pt-BR)
├── theme/
│   ├── ThemeContext.tsx          # Provider e hooks de tema (light/dark/system)
│   └── colors.ts                # Paletas de cores (lightTheme, darkTheme)
└── types/
    ├── Button.ts                # ButtonProps
    ├── ButtonGrid.ts            # ButtonGridProps
    └── Evaluate.ts              # ParseState (usado pelo avaliador)
```

## Fluxo de Dados

```
Usuário pressiona botão
        │
        v
ButtonGrid → chama handler correspondente
        │
        v
useCalculator → atualiza expression/resultValue
        │
        v
formatter → formata expressão para exibição (pt-BR)
        │
        v
Display → renderiza com font dinâmico + cursor
        │
        v
useHistory → persiste cálculos no AsyncStorage
```

## Camada de Lógica de Negócio

### useCalculator (src/hooks/useCalculator.ts)

Hook principal que orquestra a calculadora. Consome `useHistory` e funções de `formatter` e `evaluate`.

**Estado:**

- `expression` — expressão raw sendo construída (ex: `"12+34×5"`)
- `resultValue` — resultado formatado após pressionar "=" (ex: `"182"`)
- `display` — valor derivado: mostra `resultValue` ou `formatExpression(expression)`

**Handlers:**

| Handler             | Descrição                                                           |
| ------------------- | ------------------------------------------------------------------- |
| `handleNumberPress` | Insere dígito, trata zeros à esquerda e estado pós-resultado        |
| `handleDecimal`     | Insere vírgula decimal, evita duplicatas no mesmo número            |
| `handleOperator`    | Adiciona operador (+, -, ×, ÷), substitui anterior se repetido      |
| `handleEqual`       | Avalia a expressão completa via `evaluate()` e salva no histórico   |
| `handleAC`          | Reset completo (expressão + resultado)                              |
| `handleBackspace`   | Remove último caractere ou converte resultado em expressão editável |
| `handleParentheses` | Insere `(` ou `)` de forma inteligente baseado no contexto          |
| `handlePercentage`  | Divide o último número da expressão por 100                         |
| `handleSquareRoot`  | Calcula raiz quadrada do resultado ou da expressão avaliada         |

### useHistory (src/hooks/useHistory.ts)

Hook responsável pela persistência e UI do histórico.

- Carrega do AsyncStorage ao montar
- Salva automaticamente a cada novo cálculo
- Máximo de 50 itens (FIFO)
- Controla visibilidade do painel

## Camada de Utilitários

### evaluate.ts — Avaliador de Expressões

Usa **recursive descent parsing** com precedência de operadores:

```
parseExpression → resolve + e - (menor precedência)
  └── parseTerm → resolve × e ÷ (maior precedência)
       └── parseFactor → resolve números, parênteses e sinais unários
            └── parseNumber → lê dígitos e ponto decimal
```

Antes de avaliar, `prepareForEval` remove operadores soltos do final e fecha parênteses abertos automaticamente.

### formatter.ts — Formatação pt-BR

| Função             | Descrição                                                    |
| ------------------ | ------------------------------------------------------------ |
| `formatNumber`     | Número → display pt-BR (`1000` → `"1.000"`, `0.5` → `"0,5"`) |
| `resultToRaw`      | Display pt-BR → número raw (`"1.000,5"` → `"1000.5"`)        |
| `formatExpression` | Expressão raw → display (`"12+34×5"` → `"12 + 34 × 5"`)      |
| `getLastNumber`    | Extrai o último segmento numérico da expressão               |
| `isOperator`       | Verifica se um caractere é operador (+, -, ×, ÷)             |

## Camada de Apresentação

### Button

- Componente agnóstico — aceita `label`, `icon`, `variant` e `onPress`
- Variantes: `default`, `operator`, `ac`, `equal`
- Cada variante usa cores específicas do tema

### ButtonGrid

- Grid 5×4: AC, ( ), %, ÷ | 7, 8, 9, × | 4, 5, 6, - | 1, 2, 3, + | 0, vírgula, backspace, =
- Delega todas as ações via props para o hook

### Display

- Font dinâmico: 64px (≤6 chars) → 24px (≥18 chars)
- Cursor animado piscante (530ms)
- Scroll horizontal para expressões longas

### Header

- Botão de histórico (RotateCcw) + menu de opções (MoreVertical)
- Renderiza o OptionsMenu (modal de seleção de tema)

### HistorySection

- Painel colapsável com altura máxima de 160px
- FlatList scrollável + botão de limpar (Trash2)
- Estado vazio com mensagem informativa

## Sistema de Temas

Três modos: **Claro**, **Escuro** e **Sistema** (padrão).

- `ThemeProvider` detecta preferência do sistema via `useColorScheme()`
- `useTheme()` retorna o objeto de cores atual
- `useThemeSettings()` retorna `themeMode` e `setThemeMode`
- Cada tema define cores para: background, display, botões (default, operator, ac, equal) e backspace

## Fluxo de Cálculo — Exemplo: `12 + 34 × 5 =`

1. Digita `1`, `2` → expression: `"12"`
2. Pressiona `+` → expression: `"12+"`
3. Digita `3`, `4` → expression: `"12+34"`
4. Pressiona `×` → expression: `"12+34×"`
5. Digita `5` → expression: `"12+34×5"`
6. Display mostra: `"12 + 34 × 5"`
7. Pressiona `=`:
   - `evaluate("12+34*5")` → parseia com precedência → 12 + (34 × 5) = **182**
   - Histórico: `"12 + 34 × 5 = 182"`
   - Display mostra: `"182"`
8. Pressionar número inicia nova expressão; pressionar operador continua do resultado

## Tratamento de Erros

- **Divisão por zero** → exibe "Erro" e salva no histórico
- **Raiz de negativo** → exibe "Erro" e salva no histórico
- **Overflow numérico** → notação científica (ex: `1.5e+15`)
- **Falha no AsyncStorage** → log de erro, app continua funcionando
- **Expressão incompleta** → operadores soltos são removidos, parênteses são fechados automaticamente

## Padrões de Design

- **Container/Presentational** — Calculator (container) usa useCalculator; Button, Display (presentational)
- **Custom Hook** — Lógica encapsulada em hooks reutilizáveis
- **Composição de Hooks** — useCalculator consome useHistory
- **Funções Puras** — evaluate e formatter são independentes de React
- **Context API** — Tema global sem prop drilling
