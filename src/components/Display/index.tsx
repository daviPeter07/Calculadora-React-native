import { Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";

interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.displayContainer,
        { backgroundColor: theme.displayBackground },
      ]}
    >
      <Text style={[styles.display, { color: theme.displayText }]}>
        {value}
      </Text>
    </View>
  );
}
