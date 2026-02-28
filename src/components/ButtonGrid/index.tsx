import { View } from "react-native";
import { Button } from "../Button";
import { styles } from "./index.style";

interface ButtonGridProps {
  onNumberPress: (num: string) => void;
  onOperatorPress: (operator: string) => void;
  onACPress: () => void;
  onEqualPress: () => void;
}

export function ButtonGrid({
  onNumberPress,
  onOperatorPress,
  onACPress,
  onEqualPress,
}: ButtonGridProps) {
  return (
    <View style={styles.buttonsContainer}>
      {/* AC e Operadores */}
      <View style={styles.row}>
        <Button label="AC" onPress={onACPress} variant="ac" />
        <Button
          label="+"
          onPress={() => onOperatorPress("+")}
          variant="operator"
        />
        <Button
          label="-"
          onPress={() => onOperatorPress("-")}
          variant="operator"
        />
        <Button
          label="×"
          onPress={() => onOperatorPress("*")}
          variant="operator"
        />
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <Button label="7" onPress={() => onNumberPress("7")} />
        <Button label="8" onPress={() => onNumberPress("8")} />
        <Button label="9" onPress={() => onNumberPress("9")} />
        <Button
          label="÷"
          onPress={() => onOperatorPress("/")}
          variant="operator"
        />
      </View>

      {/* Linha 3 */}
      <View style={styles.row}>
        <Button label="4" onPress={() => onNumberPress("4")} />
        <Button label="5" onPress={() => onNumberPress("5")} />
        <Button label="6" onPress={() => onNumberPress("6")} />
      </View>

      {/* Linha 4 */}
      <View style={styles.row}>
        <Button label="1" onPress={() => onNumberPress("1")} />
        <Button label="2" onPress={() => onNumberPress("2")} />
        <Button label="3" onPress={() => onNumberPress("3")} />
      </View>

      {/* Linha 5 */}
      <View style={styles.row}>
        <Button label="0" onPress={() => onNumberPress("0")} />
        <Button label="." onPress={() => onNumberPress(".")} />
      </View>

      {/* Linha 6 */}
      <View style={styles.row}>
        <Button label="=" onPress={onEqualPress} variant="equal" />
      </View>
    </View>
  );
}
