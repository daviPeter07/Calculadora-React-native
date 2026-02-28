import { useState } from "react";

export function useCalculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const handleNumberPress = (num: string) => {
    // Lógica dos números
  };

  const handleOperator = (operator: string) => {
    // Lógica dos operadores
  };

  const handleEqual = () => {
    // Lógica do cálculo
  };

  const handleAC = () => {
    setDisplay("0");
  };

  const handleHistory = () => {
    // Lógica para mostrar histórico
  };

  return {
    display,
    history,
    handleNumberPress,
    handleOperator,
    handleEqual,
    handleAC,
    handleHistory,
  };
}
