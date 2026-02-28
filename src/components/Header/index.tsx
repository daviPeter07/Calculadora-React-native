import { View } from "react-native";
import { HistoryButton } from "../HistoryButton";
import { styles } from "./index.style";

interface HeaderProps {
  onHistoryPress: () => void;
}

export function Header({ onHistoryPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <HistoryButton onPress={onHistoryPress} />
    </View>
  );
}
