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
    handleDecimal,
    handleOperator,
    handleEqual,
    handleAC,
    handleBackspace,
    handleSquareRoot,
    handleHistory,
  } = useCalculator();

  return (
    <View style={styles.container}>
      <Header />
      <Display value={display} />
      <ButtonGrid
        onNumberPress={handleNumberPress}
        onDecimalPress={handleDecimal}
        onOperatorPress={handleOperator}
        onACPress={handleAC}
        onBackspacePress={handleBackspace}
        onSquareRootPress={handleSquareRoot}
        onEqualPress={handleEqual}
        onHistoryPress={handleHistory}
      />
    </View>
  );
}
