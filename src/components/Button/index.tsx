import { Pressable, Text } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";
import { ButtonProps } from "@/types/Button";

export function Button({
  label,
  icon,
  onPress,
  variant = "default",
}: ButtonProps) {
  const theme = useTheme();

  const backgroundColor =
    variant === "ac"
      ? theme.buttonAC
      : variant === "equal"
        ? theme.buttonEqual
        : variant === "operator"
          ? theme.buttonOperator
          : theme.buttonDefault;

  const textColor =
    variant === "equal"
      ? theme.buttonEqualText
      : variant === "operator" || variant === "ac"
        ? theme.buttonOperatorText
        : theme.buttonDefaultText;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed && { opacity: 0.7 },
      ]}
      onPress={onPress}
    >
      {icon ? (
        icon
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
      )}
    </Pressable>
  );
}
