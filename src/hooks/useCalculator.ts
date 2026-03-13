import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "calculator_history";

const parseDisplay = (value: string): number => {
  if (value === "Erro") return 0;
  const parts = value.split(",");
  const intPart = parts[0].replace(/\./g, "") || "0";
  const decPart = parts[1] || "";
  const cleaned = decPart ? `${intPart}.${decPart}` : intPart;
  return parseFloat(cleaned) || 0;
};

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const previousValueRef = useRef<number | null>(null);
  const operationRef = useRef<string | null>(null);
  const waitingForNewValueRef = useRef(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  };

  const saveHistory = async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
    }
  };

  const addToHistory = (calculation: string) => {
    setHistory((prev) => {
      const next = [calculation, ...prev].slice(0, 50);
      saveHistory(next);
      return next;
    });
  };

  const formatDisplay = (value: number): string => {
    if (!Number.isFinite(value)) return "Erro";
    if (Math.abs(value) >= 1e15) return value.toExponential(2);
    const [intPart, decPart] = value.toString().split(".");
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decPart ? `${formatted},${decPart}` : formatted;
  };

  const handleNumberPress = (num: string) => {
    setDisplay((prev) => {
      if (prev === "Erro" || waitingForNewValueRef.current) {
        waitingForNewValueRef.current = false;
        return num === "0" ? "0" : num;
      }
      if (prev === "0" && num === "0") return prev;
      if (prev === "0" && num !== "0") return num;
      return prev + num;
    });
  };

  const handleDecimal = () => {
    setDisplay((prev) => {
      if (prev === "Erro" || waitingForNewValueRef.current) {
        waitingForNewValueRef.current = false;
        return "0,";
      }
      if (prev.includes(",")) return prev;
      return prev + ",";
    });
  };

  const handleOperator = (operator: string) => {
    const current = parseDisplay(display);

    if (previousValueRef.current === null) {
      previousValueRef.current = current;
      operationRef.current = operator;
      waitingForNewValueRef.current = true;
      return;
    }

    if (!waitingForNewValueRef.current && operationRef.current) {
      const result = calculate(
        previousValueRef.current,
        current,
        operationRef.current
      );
      const formatted = formatDisplay(result);
      setDisplay(formatted);
      previousValueRef.current = result;
    }

    operationRef.current = operator;
    waitingForNewValueRef.current = true;
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
      case "×":
        return a * b;
      case "/":
      case "÷":
        return b === 0 ? Infinity : a / b;
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (previousValueRef.current === null || operationRef.current === null)
      return;

    const current = parseDisplay(display);
    const result = calculate(
      previousValueRef.current,
      current,
      operationRef.current
    );
    const prevFormatted = formatDisplay(previousValueRef.current);
    const currFormatted = formatDisplay(current);
    const opSymbol =
      operationRef.current === "*"
        ? "×"
        : operationRef.current === "/"
          ? "÷"
          : operationRef.current;

    let historyEntry: string;
    if (!Number.isFinite(result)) {
      historyEntry = `${prevFormatted} ${opSymbol} ${currFormatted} = Erro`;
      setDisplay("Erro");
    } else {
      const resultFormatted = formatDisplay(result);
      historyEntry = `${prevFormatted} ${opSymbol} ${currFormatted} = ${resultFormatted}`;
      setDisplay(resultFormatted);
    }

    addToHistory(historyEntry);
    previousValueRef.current = null;
    operationRef.current = null;
    waitingForNewValueRef.current = false;
  };

  const handleAC = () => {
    setDisplay("0");
    previousValueRef.current = null;
    operationRef.current = null;
    waitingForNewValueRef.current = false;
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length <= 1) return "0";
      const next = prev.slice(0, -1);
      return next === "-" || next === "" ? "0" : next;
    });
  };

  const handleSquareRoot = () => {
    const current = parseDisplay(display);
    if (current < 0) {
      setDisplay("Erro");
      addToHistory(`√(${display}) = Erro`);
      return;
    }
    const result = Math.sqrt(current);
    const formatted = formatDisplay(result);
    setDisplay(formatted);
    addToHistory(`√(${display}) = ${formatted}`);
  };

  const handlePercentage = () => {
    const current = parseDisplay(display);
    const result = current / 100;
    setDisplay(formatDisplay(result));
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const handleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const handleCloseHistory = () => {
    setShowHistory(false);
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
    handleClearHistory,
    handleHistory,
    handleCloseHistory,
  };
}
