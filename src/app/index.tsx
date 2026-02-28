import { View } from "react-native";
import { styles } from "./index.style";
import { Header } from "../components/Header";
import { Display } from "../components/Display";
import { ButtonGrid } from "../components/ButtonGrid";
import { useCalculator } from "../hooks/useCalculator";

export default function Calculator() {
  const {
    display,
    handleNumberPress,
    handleOperator,
    handleEqual,
    handleAC,
    handleHistory,
  } = useCalculator();

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
