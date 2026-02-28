import { Pressable, Text } from "react-native";
import { styles } from "./index.style";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "default" | "operator" | "ac" | "equal";
}

export function Button({ label, onPress, variant = "default" }: ButtonProps) {
  //Array para variação de estilo
  const buttonStyles = [
    styles.button,
    variant === "operator" && styles.operatorButton,
    variant === "ac" && styles.acButton,
    variant === "equal" && styles.equalButton,
  ];

  return (
    <Pressable style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}
