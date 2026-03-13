import { useState } from "react";
import { evaluate, countOpenParens } from "@/utils/evaluate";
import {
  isOperator,
  formatNumber,
  resultToRaw,
  formatExpression,
  getLastNumber,
} from "@/utils/formatter";
import { useHistory } from "./useHistory";

// Hook principal que orquestra a lógica da calculadora baseada em expressão
export const useCalculator = () => {
  const [expression, setExpression] = useState("");
  const [resultValue, setResultValue] = useState<string | null>(null);

  const {
    history,
    showHistory,
    addToHistory,
    handleClearHistory,
    handleHistory,
    handleCloseHistory,
  } = useHistory();

  // Exibe o resultado formatado ou a expressão em construção
  const display =
    resultValue !== null ? resultValue : formatExpression(expression) || "";

  // Insere um dígito na expressão, tratando zeros à esquerda e pós-resultado
  const handleNumberPress = (num: string) => {
    if (resultValue !== null) {
      setResultValue(null);
      setExpression(num === "0" ? "0" : num);
      return;
    }

    setExpression((prev) => {
      if (prev === "" || prev === "0") {
        return num === "0" ? "0" : num;
      }

      const lastChar = prev[prev.length - 1];

      if (lastChar === ")") return prev;

      if (lastChar === "0") {
        const beforeZero = prev.length >= 2 ? prev[prev.length - 2] : "";
        if (isOperator(beforeZero) || beforeZero === "(" || prev.length === 1) {
          if (num === "0") return prev;
          return prev.slice(0, -1) + num;
        }
      }

      return prev + num;
    });
  };

  // Insere separador decimal, evitando duplicatas no mesmo número
  const handleDecimal = () => {
    if (resultValue !== null) {
      setResultValue(null);
      setExpression("0.");
      return;
    }

    setExpression((prev) => {
      const lastNum = getLastNumber(prev);
      if (lastNum.includes(".")) return prev;

      if (prev === "") return "0.";

      const lastChar = prev[prev.length - 1];
      if (isOperator(lastChar) || lastChar === "(") return prev + "0.";
      if (lastChar === ")") return prev;

      return prev + ".";
    });
  };

  // Adiciona operador à expressão, substituindo o anterior se necessário
  const handleOperator = (operator: string) => {
    const symbol = operator === "*" ? "×" : operator === "/" ? "÷" : operator;

    if (resultValue !== null) {
      const raw = resultToRaw(resultValue);
      setExpression(raw + symbol);
      setResultValue(null);
      return;
    }

    if (expression === "") return;

    const lastChar = expression[expression.length - 1];

    if (isOperator(lastChar)) {
      setExpression((prev) => prev.slice(0, -1) + symbol);
      return;
    }

    if (lastChar === "(") {
      if (symbol === "-") {
        setExpression((prev) => prev + symbol);
      }
      return;
    }

    setExpression((prev) => prev + symbol);
  };

  // Avalia a expressão completa e exibe o resultado
  const handleEqual = () => {
    if (expression === "" && resultValue === null) return;

    const exprToEval =
      resultValue !== null ? resultToRaw(resultValue) : expression;

    try {
      const result = evaluate(exprToEval);
      const formatted = formatNumber(result);
      const displayExpr = formatExpression(exprToEval);
      addToHistory(`${displayExpr} = ${formatted}`);
      setResultValue(formatted);
      setExpression("");
    } catch {
      setResultValue("Erro");
      setExpression("");
    }
  };

  // Limpa toda a expressão e o resultado (reset completo)
  const handleAC = () => {
    setExpression("");
    setResultValue(null);
  };

  // Remove o último caractere da expressão ou converte resultado em expressão editável
  const handleBackspace = () => {
    if (resultValue !== null) {
      const raw = resultToRaw(resultValue);
      if (raw.length <= 1 || (raw.startsWith("-") && raw.length <= 2)) {
        setResultValue(null);
        setExpression("");
      } else {
        setResultValue(null);
        setExpression(raw.slice(0, -1));
      }
      return;
    }

    setExpression((prev) => {
      if (prev.length <= 1) return "";
      return prev.slice(0, -1);
    });
  };

  // Insere "(" ou ")" de forma inteligente baseado no contexto da expressão
  const handleParentheses = () => {
    if (resultValue !== null) {
      const raw = resultToRaw(resultValue);
      setResultValue(null);
      setExpression(raw + "×(");
      return;
    }

    const open = countOpenParens(expression);
    const lastChar = expression[expression.length - 1] || "";

    if (expression === "" || isOperator(lastChar) || lastChar === "(") {
      setExpression((prev) => prev + "(");
    } else if (
      open > 0 &&
      ((lastChar >= "0" && lastChar <= "9") ||
        lastChar === ")" ||
        lastChar === ".")
    ) {
      setExpression((prev) => prev + ")");
    } else {
      setExpression((prev) => prev + "×(");
    }
  };

  // Divide o último número da expressão por 100
  const handlePercentage = () => {
    if (resultValue !== null) {
      const raw = resultToRaw(resultValue);
      const val = parseFloat(raw) / 100;
      setResultValue(formatNumber(val));
      return;
    }

    const match = expression.match(/(\d+\.?\d*)$/);
    if (match) {
      const lastNum = match[1];
      const val = parseFloat(lastNum) / 100;
      setExpression(
        (prev) => prev.slice(0, prev.length - lastNum.length) + val.toString()
      );
    }
  };

  // Calcula a raiz quadrada do resultado atual ou da expressão avaliada
  const handleSquareRoot = () => {
    if (resultValue !== null) {
      const raw = resultToRaw(resultValue);
      const val = parseFloat(raw);
      if (val < 0) {
        setResultValue("Erro");
        addToHistory(`√(${resultValue}) = Erro`);
        return;
      }
      const result = Math.sqrt(val);
      const formatted = formatNumber(result);
      addToHistory(`√(${resultValue}) = ${formatted}`);
      setResultValue(formatted);
      return;
    }

    const displayExpr = formatExpression(expression);
    try {
      const val = evaluate(expression);
      if (val < 0) {
        setResultValue("Erro");
        addToHistory(`√(${displayExpr}) = Erro`);
        setExpression("");
        return;
      }
      const result = Math.sqrt(val);
      const formatted = formatNumber(result);
      addToHistory(`√(${displayExpr}) = ${formatted}`);
      setResultValue(formatted);
      setExpression("");
    } catch {
      setResultValue("Erro");
      setExpression("");
    }
  };

  return {
    display,
    history,
    showHistory,
    handleNumberPress,
    handleDecimal,
    handleOperator,
    handleEqual,
    handleAC,
    handleBackspace,
    handleSquareRoot,
    handlePercentage,
    handleParentheses,
    handleClearHistory,
    handleHistory,
    handleCloseHistory,
  };
};
