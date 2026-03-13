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
  background: "#1A1A1E",
  displayBackground: "#1A1A1E",
  displayText: "#FFFFFF",
  // Botões numéricos e vírgula
  buttonDefault: "#3A3F47",
  buttonDefaultText: "#FFFFFF",
  // Operadores ( ), %, ÷, ×, -, +
  buttonOperator: "#5A6270",
  buttonOperatorText: "#FFFFFF",
  // AC - azul vibrante
  buttonAC: "#007AFF",
  buttonACText: "#FFFFFF",
  // =
  buttonEqual: "#D297DB",
  buttonEqualText: "#FFFFFF",
  // Backspace
  buttonBackspace: "#3A3F47",
  buttonBackspaceText: "#FFFFFF",
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;
