import { View } from "react-native";
import { styles } from "./index.style";
import { useState } from "react";
import { Header } from "../components/Header";
import { Display } from "../components/Display";
import { ButtonGrid } from "../components/ButtonGrid";

export default function Calculator() {
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

  return (
    <View style={styles.container}>
      <Header onHistoryPress={handleHistory} />
      <Display value={display} />
      <ButtonGrid
        onNumberPress={handleNumberPress}
        onOperatorPress={handleOperator}
        onACPress={handleAC}
        onEqualPress={handleEqual}
      />
    </View>
  );
}
