import { Pressable, View } from "react-native";
import { RotateCcw } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";

interface HeaderProps {
  onHistoryPress?: () => void;
}

export function Header({ onHistoryPress }: HeaderProps) {
  const theme = useTheme();
  const iconColor = theme.displayText;

  return (
    <View style={styles.header}>
      <Pressable
        onPress={onHistoryPress}
        style={({ pressed }) => [styles.historyButton, pressed && styles.pressed]}
        hitSlop={12}
      >
        <RotateCcw size={24} color={iconColor} />
      </Pressable>
    </View>
  );
}
