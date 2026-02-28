import { View } from "react-native";
import { styles } from "./index.style";
import { Header } from "@/components/Header";
import { Display } from "@/components/Display";
import { ButtonGrid } from "@/components/ButtonGrid";
import { useCalculator } from "@/hooks/useCalculator";

export default function Calculator() {
  const { display, history, ...handlers } = useCalculator();

  return (
    <View style={styles.container}>
      <Header />
      <Display value={display} />
      <ButtonGrid
        onNumberPress={handlers.handleNumberPress}
        onDecimalPress={handlers.handleDecimal}
        onOperatorPress={handlers.handleOperator}
        onACPress={handlers.handleAC}
        onBackspacePress={handlers.handleBackspace}
        onSquareRootPress={handlers.handleSquareRoot}
        onEqualPress={handlers.handleEqual}
        onHistoryPress={handlers.handleHistory}
      />
    </View>
  );
}
