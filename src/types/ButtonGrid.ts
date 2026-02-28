export interface ButtonGridProps {
  onNumberPress: (num: string) => void;
  onDecimalPress: () => void;
  onOperatorPress: (operator: string) => void;
  onACPress: () => void;
  onBackspacePress: () => void;
  onSquareRootPress: () => void;
  onEqualPress: () => void;
  onHistoryPress: () => void;
}
