import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import styles from "./index.style";
import { useTheme } from "@/theme/ThemeContext";
import { Header } from "@/components/Header";
import { HistorySection } from "@/components/HistorySection";
import { Display } from "@/components/Display";
import { ButtonGrid } from "@/components/ButtonGrid";
import { useCalculator } from "@/hooks/useCalculator";

export default function Calculator() {
  const { display, history, ...handlers } = useCalculator();
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={["top"]}
      >
        <View style={styles.container}>
          <Header onHistoryPress={handlers.handleHistory} />
          <HistorySection
            history={history}
            onClearHistory={handlers.handleClearHistory}
          />
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
            onPercentagePress={handlers.handlePercentage}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
