import { useState } from "react";
import { Pressable, View } from "react-native";
import { RotateCcw, MoreVertical } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { OptionsMenu } from "@/components/OptionsMenu";
import { styles } from "./index.style";

interface HeaderProps {
  onHistoryPress?: () => void;
}

export function Header({ onHistoryPress }: HeaderProps) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const iconColor = theme.displayText;

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={onHistoryPress}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
          hitSlop={12}
        >
          <RotateCcw size={24} color={iconColor} />
        </Pressable>
        <View style={styles.spacer} />
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
          hitSlop={12}
        >
          <MoreVertical size={24} color={iconColor} />
        </Pressable>
      </View>
      <OptionsMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </>
  );
}
