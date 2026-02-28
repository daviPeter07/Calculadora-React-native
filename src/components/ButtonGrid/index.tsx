import { View } from "react-native";
import { Button } from "../Button";
import { styles } from "./index.style";
import { Delete, Divide, History, Radical } from "lucide-react";
import type { ButtonGridProps } from "@/types/ButtonGrid";

export function ButtonGrid({
  onNumberPress,
  onDecimalPress,
  onOperatorPress,
  onACPress,
  onBackspacePress,
  onSquareRootPress,
  onEqualPress,
  onHistoryPress,
}: ButtonGridProps) {
  return (
    <View style={styles.buttonsContainer}>
      {/* AC e Operadores */}
      <View style={styles.row}>
        <Button label="AC" onPress={onACPress} variant="ac" />
        <Button
          icon={<Delete size={24} color="#fff" />}
          onPress={onBackspacePress}
          variant="operator"
        />
        <Button
          icon={<Radical size={24} color="#fff" />}
          onPress={onSquareRootPress}
          variant="operator"
        />
        <Button
          label="+"
          onPress={() => onOperatorPress("+")}
          variant="operator"
        />
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <Button label="7" onPress={() => onNumberPress("7")} />
        <Button label="8" onPress={() => onNumberPress("8")} />
        <Button label="9" onPress={() => onNumberPress("9")} />
        <Button
          label="-"
          onPress={() => onOperatorPress("-")}
          variant="operator"
        />
      </View>

      {/* Linha 3 */}
      <View style={styles.row}>
        <Button label="4" onPress={() => onNumberPress("4")} />
        <Button label="5" onPress={() => onNumberPress("5")} />
        <Button label="6" onPress={() => onNumberPress("6")} />
        <Button
          label="×"
          onPress={() => onOperatorPress("*")}
          variant="operator"
        />
      </View>

      {/* Linha 4 */}
      <View style={styles.row}>
        <Button label="1" onPress={() => onNumberPress("1")} />
        <Button label="2" onPress={() => onNumberPress("2")} />
        <Button label="3" onPress={() => onNumberPress("3")} />
        <Button
          icon={<Divide size={24} color="#fff" />}
          onPress={() => onOperatorPress("/")}
          variant="operator"
        />
      </View>

      {/* Linha 5 */}
      <View style={styles.row}>
        <Button label="0" onPress={() => onNumberPress("0")} />
        <Button label="," onPress={onDecimalPress} />
      </View>

      {/* Linha 6 */}
      <View style={styles.row}>
        <Button
          icon={<History size={24} color="#fff" />}
          onPress={onHistoryPress}
          variant="operator"
        />
        <Button label="=" onPress={onEqualPress} variant="equal" />
      </View>
    </View>
  );
}
