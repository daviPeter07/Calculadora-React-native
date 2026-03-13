import { View, Text, FlatList, Pressable } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { Trash2 } from "lucide-react-native";
import { styles } from "./index.style";

interface HistorySectionProps {
  history: string[];
  onClearHistory: () => void;
}

export function HistorySection({ history, onClearHistory }: HistorySectionProps) {
  const theme = useTheme();

  if (history.length === 0) return null;

  return (
    <View style={[styles.container, { borderBottomColor: theme.background === "#000000" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.displayText }]}>
          Histórico
        </Text>
        <Pressable
          onPress={onClearHistory}
          style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
        >
          <Trash2 size={20} color={theme.displayText} />
        </Pressable>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Text style={[styles.item, { color: theme.displayText }]}>{item}</Text>
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        scrollEnabled={history.length > 3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
