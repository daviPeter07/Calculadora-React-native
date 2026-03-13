import { ReactNode } from "react";

export interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "default" | "operator" | "ac" | "equal";
  /** Quando true, o botão ocupa o espaço de 2 colunas (ex: botão =) */
  doubleWidth?: boolean;
}
