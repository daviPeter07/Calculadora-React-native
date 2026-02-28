import { Pressable, Text } from "react-native";
import { styles } from "./index.style";
import { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "default" | "operator" | "ac" | "equal";
}

export function Button({
  label,
  icon,
  onPress,
  variant = "default",
}: ButtonProps) {
  //Array para variação de estilo
  const buttonStyles = [
    styles.button,
    variant === "operator" && styles.operatorButton,
    variant === "ac" && styles.acButton,
    variant === "equal" && styles.equalButton,
  ];

  return (
    <Pressable style={buttonStyles} onPress={onPress}>
      {icon ? icon : <Text style={styles.buttonText}>{label}</Text>}
    </Pressable>
  );
}
