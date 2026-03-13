export const lightTheme = {
  background: "#FFFFFF",
  displayBackground: "#FFFFFF",
  displayText: "#1A1A1A",
  // Botões numéricos e vírgula
  buttonDefault: "#E8E8E8",
  buttonDefaultText: "#1A1A1A",
  // Operadores ( ), %, ÷, ×, -, +
  buttonOperator: "#D4D8F0",
  buttonOperatorText: "#1A1A1A",
  // AC
  buttonAC: "#D4D8F0",
  buttonACText: "#1A1A1A",
  // =
  buttonEqual: "#6B4EAA",
  buttonEqualText: "#FFFFFF",
  // Backspace
  buttonBackspace: "#E8E8E8",
  buttonBackspaceText: "#1A1A1A",
} as const;

export const darkTheme = {
  background: "#000000",
  displayBackground: "#000000",
  displayText: "#FFFFFF",
  // Botões numéricos e operadores básicos
  buttonDefault: "#2D2D2D",
  buttonDefaultText: "#FFFFFF",
  buttonOperator: "#2D2D2D",
  buttonOperatorText: "#FFFFFF",
  // AC - azul escuro/teal
  buttonAC: "#1E5F74",
  buttonACText: "#FFFFFF",
  // =
  buttonEqual: "#8B7AB8",
  buttonEqualText: "#FFFFFF",
  // Backspace
  buttonBackspace: "#2D2D2D",
  buttonBackspaceText: "#FFFFFF",
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;
