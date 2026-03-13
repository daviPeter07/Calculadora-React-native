import { View } from "react-native";
import { Button } from "../Button";
import { Delete } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";
import type { ButtonGridProps } from "@/types/ButtonGrid";

export function ButtonGrid({
  onNumberPress,
  onDecimalPress,
  onOperatorPress,
  onACPress,
  onBackspacePress,
  onEqualPress,
  onParenthesesPress = () => {},
  onPercentagePress = () => {},
}: ButtonGridProps) {
  const theme = useTheme();
  const iconColor = theme.buttonDefaultText;

  return (
    <View style={styles.buttonsContainer}>
      {/* Linha 1: AC, ( ), %, ÷ */}
      <View style={styles.row}>
        <Button label="AC" onPress={onACPress} variant="ac" />
        <Button label="( )" onPress={onParenthesesPress} variant="operator" />
        <Button label="%" onPress={onPercentagePress} variant="operator" />
        <Button
          label="÷"
          onPress={() => onOperatorPress("/")}
          variant="operator"
        />
      </View>

      {/* Linha 2: 7, 8, 9, × */}
      <View style={styles.row}>
        <Button label="7" onPress={() => onNumberPress("7")} />
        <Button label="8" onPress={() => onNumberPress("8")} />
        <Button label="9" onPress={() => onNumberPress("9")} />
        <Button
          label="×"
          onPress={() => onOperatorPress("*")}
          variant="operator"
        />
      </View>

      {/* Linha 3: 4, 5, 6, - */}
      <View style={styles.row}>
        <Button label="4" onPress={() => onNumberPress("4")} />
        <Button label="5" onPress={() => onNumberPress("5")} />
        <Button label="6" onPress={() => onNumberPress("6")} />
        <Button
          label="-"
          onPress={() => onOperatorPress("-")}
          variant="operator"
        />
      </View>

      {/* Linha 4: 1, 2, 3, + */}
      <View style={styles.row}>
        <Button label="1" onPress={() => onNumberPress("1")} />
        <Button label="2" onPress={() => onNumberPress("2")} />
        <Button label="3" onPress={() => onNumberPress("3")} />
        <Button
          label="+"
          onPress={() => onOperatorPress("+")}
          variant="operator"
        />
      </View>

      {/* Linha 5: 0, , (vírgula), backspace, = */}
      <View style={styles.row}>
        <Button label="0" onPress={() => onNumberPress("0")} />
        <Button label="," onPress={onDecimalPress} />
        <Button
          icon={<Delete size={28} color={iconColor} />}
          onPress={onBackspacePress}
        />
        <Button label="=" onPress={onEqualPress} variant="equal" />
      </View>
    </View>
  );
}
