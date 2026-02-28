import { Pressable, Text } from "react-native";
import { styles } from "./index.style";

interface HistoryButtonProps {
  onPress: () => void;
}

export function HistoryButton({ onPress }: HistoryButtonProps) {
  return (
    <Pressable style={styles.historyButton} onPress={onPress}>
      <Text>Histórico</Text>
    </Pressable>
  );
}
