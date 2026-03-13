import { Modal, View, Text, Pressable } from "react-native";
import { useTheme, useThemeSettings } from "@/theme/ThemeContext";
import { Sun, Moon, Smartphone } from "lucide-react-native";
import { styles } from "./index.style";

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function OptionsMenu({ visible, onClose }: OptionsMenuProps) {
  const theme = useTheme();
  const { themeMode, setThemeMode } = useThemeSettings();

  const options = [
    { id: "light" as const, label: "Claro", icon: Sun },
    { id: "dark" as const, label: "Escuro", icon: Moon },
    { id: "system" as const, label: "Sistema", icon: Smartphone },
  ];

  return (
    <Modal visible={visible} transparent animationType="none">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.menu, { backgroundColor: theme.background }]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={[styles.title, { color: theme.displayText }]}>Tema</Text>
          {options.map(({ id, label, icon: Icon }) => (
            <Pressable
              key={id}
              onPress={() => {
                setThemeMode(id);
                onClose();
              }}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.pressed,
                themeMode === id && styles.optionSelected,
              ]}
            >
              <Icon size={20} color={theme.displayText} />
              <Text style={[styles.optionText, { color: theme.displayText }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
