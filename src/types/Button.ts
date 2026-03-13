import { ReactNode } from "react";

export interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
  variant?: "default" | "operator" | "ac" | "equal";
}
