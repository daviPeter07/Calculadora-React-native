# Arquitetura da Aplicação Calculadora

## Visão Geral

A aplicação segue um padrão de arquitetura em camadas, separando responsabilidades em:

- Camada de Apresentação (UI Components)
- Camada de Lógica de Negócio (Custom Hooks)
- Camada de Tipos (Type Definitions)
- Camada de Dados (AsyncStorage)

## Fluxo de Dados

```
Usuário pressiona botão
        |
        v
Button Component
        |
        v
Handler Function (ex: handleNumberPress)
        |
        v
useCalculator Hook (atualiza estado)
        |
        v
Display Component atualiza
        |
        v
Histórico persiste em AsyncStorage
```

## Detalhamento de Cada Camada

### 1. Camada de Apresentação (src/components/)

#### Button Component

- Componente agnóstico de domínio
- Responsável apenas por renderizar UI
- Aceita props `onPress` para ações
- Não contém lógica de negócio

```typescript
interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "default" | "operator" | "ac" | "equal";
}
```

#### ButtonGrid Component

- Compõe múltiplos Button components
- Organiza layout da calculadora
- Passa handlers do hook para os botões
- Define a estrutura visual do teclado

#### Display Component

- Apresenta valor numérico ao usuário
- Recebe valor via prop
- Sem lógica de cálculo

#### Header, HistoryButton

- Componentes auxiliares
- Complementam a interface

### 2. Camada de Lógica de Negócio (src/hooks/useCalculator.ts)

Este é o componente mais importante da aplicação. Centraliza toda a lógica.

#### Estado Principal

```typescript
const [display, setDisplay] = useState<string>("0");
const [history, setHistory] = useState<string[]>([]);
```

#### Estado Interno (necessário para implementação)

Para funcionar corretamente, o hook precisará gerenciar:

```typescript
// Estes precisam ser adicionados:
const previousValueRef = useRef<number | null>(null);
const operationRef = useRef<string | null>(null);
const waitingForNewValueRef = useRef<boolean>(false);
```

#### Handlers Explicados

**handleNumberPress(num: string)**

```
1. Se waitingForNewValue estiver true, limpa display
2. Se num === "0" e display === "0", não adiciona
3. Caso contrário, concatena num ao display
4. Seta waitingForNewValue para false
```

**handleOperator(operator: string)**

```
1. Se previousValue estiver null, guarda valor atual em previousValue
2. Guarda operator em operationRef
3. Seta waitingForNewValue para true
4. Está pronto para receber novo número
```

**handleEqual()**

```
1. Se previousValue e operation existem:
   a. Converte display para número
   b. Realiza cálculo baseado em operation
   c. Formata resultado
   d. Atualiza display
   e. Adiciona cálculo ao histórico
   f. Reseta estado
```

**handleAC()**

```
1. Reseta display para "0"
2. Limpa previousValue
3. Limpa operation
4. Seta waitingForNewValue para false
```

**handleBackspace()**

```
1. Se display.length === 1, seta display para "0"
2. Caso contrário, remove último caractere
```

**handleDecimal()**

```
1. Se já há ponto no display, não faz nada
2. Caso contrário, adiciona ponto ao final
```

**handleSquareRoot()**

```
1. Converte display para número
2. Calcula Math.sqrt()
3. Formata resultado
4. Atualiza display
5. Adiciona operação ao histórico
```

**handleClearHistory()**

```
1. Limpa array history
2. Remove dados do AsyncStorage
3. Executa saveHistory([])
```

**formatDisplay(value: number)**

```
Adiciona separadores de milhares (pontos) ao número:
- 1000 = "1.000"
- 1000000 = "1.000.000"
- 1000000000 = "1.000.000.000"
Números menores que 1000 são exibidos normalmente
```

**loadHistory()** (useEffect ao montar)

```
1. Carrega dados do AsyncStorage com chave "calculator_history"
2. Se encontrar, parseia JSON e atualiza history
3. Se erro, loga erro
```

**saveHistory(newHistory: string[])**

```
1. Serializa history como JSON
2. Salva em AsyncStorage com chave "calculator_history"
3. Se erro, loga erro
```

**addToHistory(calculation: string)**

```
1. Cria novo array com calculation adicionado
2. Atualiza history com setHistory
3. Chama saveHistory para persistir
```

### 3. Camada de Tipos (src/types/)

#### ButtonProps

Define a interface para o componente Button com propriedades opcionais.

#### ButtonGridProps

Define a interface para o componente ButtonGrid com 8 handlers necessários.

### 4. Camada de Persistência

Utiliza AsyncStorage para guardar o histórico:

- Chave: "calculator_history"
- Valor: Array de strings em formato JSON
- Carregado ao inicializar o componente
- Atualizado toda vez que um cálculo é realizado

## Padrões de Design Utilizados

### 1. Container/Presentational Pattern

```
Componentes Presentacionais: Button, Display
Componentes Container: App (usa useCalculator)
```

### 2. Custom Hook Pattern

```
useCalculator encapsula toda lógica
App apenas renderiza e passa props
```

### 3. Refs para Valores Mutáveis

```
previousValue, operation, waitingForNewValue
Não causam re-renders
Mantém estado sem atualizar UI desnecessariamente
```

### 4. Composite Pattern

```
Button é composto por label ou icon
ButtonGrid é composto por múltiplos Buttons
```

## Fluxo de um Cálculo Passo a Passo

### Exemplo: 5 + 3 =

1. Usuário pressiona "5"
   - handleNumberPress("5") é chamado
   - display muda para "5"
2. Usuário pressiona "+"
   - handleOperator("+") é chamado
   - previousValue = 5
   - operation = "+"
   - waitingForNewValue = true
3. Usuário pressiona "3"
   - handleNumberPress("3") é chamado
   - Como waitingForNewValue é true, display é resetado
   - display muda para "3"
4. Usuário pressiona "="
   - handleEqual() é chamado
   - Cálculo: 5 + 3 = 8
   - display muda para "8"
   - addToHistory("5 + 3 = 8") é chamado
   - Histórico é salvo em AsyncStorage
   - Estados são resetados

## Tratamento de Erros

A aplicação deve tratar:

1. Divisão por zero
   - Exibir "Erro" ou "Infinito"
   - Adicionar ao histórico como erro
2. Overflow numérico
   - Usar formatDisplay para abreviar
   - Mostrar notação científica se necessário
3. Falha ao salvar/carregar AsyncStorage
   - Log do erro
   - Continuar funcionando sem persistência
   - Notificar usuário (opcional)

## Performance

### Otimizações Implementadas

1. Refs para valores não-renderizados
   - previousValue usa useRef, não useState
   - Evita re-renders desnecessários

2. Custom Hook reutilizável
   - Lógica centralizada
   - Fácil de testar isoladamente

3. Path aliases
   - Cachear do bundler otimizado
   - Bundle menor

### Possíveis Otimizações Futuras

1. Memoização de componentes Button

   ```typescript
   export default memo(Button);
   ```

2. useCallback para handlers

   ```typescript
   const handleNumberPress = useCallback((num: string) => {...}, []);
   ```

3. Lazy loading de screens
   - Histórico carregado sob demanda

## Testabilidade

O código foi estruturado para ser testável:

### Unit Tests (useCalculator)

```typescript
test("handleNumberPress concatenates numbers correctly", () => {
  const { result } = renderHook(() => useCalculator());
  act(() => result.current.handleNumberPress("5"));
  expect(result.current.display).toBe("5");
});
```

### Integration Tests

```typescript
test("complete calculation flow", () => {
  const { result } = renderHook(() => useCalculator());
  // Série de ações que simulam cálculo
  // Verificar resultado final e histórico
});
```

### Component Tests

```typescript
test('Button renders with label or icon', () => {
  const { getByText } = render(<Button label="5" onPress={() => {}} />);
  expect(getByText("5")).toBeTruthy();
});
```

## Conclusão

A arquitetura foi projetada com foco em:

- Clareza e legibilidade
- Separação de responsabilidades
- Facilidade de teste e manutenção
- Escalabilidade para novos recursos
- Performance otimizada para mobile
