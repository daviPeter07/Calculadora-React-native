import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";

interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  const theme = useTheme();
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (value === "") {
      const blink = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 530,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 530,
            useNativeDriver: true,
          }),
        ])
      );
      blink.start();
      return () => blink.stop();
    }
  }, [value, cursorOpacity]);

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
      {value === "" && (
        <Animated.Text
          style={[
            styles.display,
            styles.cursor,
            { color: theme.displayText, opacity: cursorOpacity },
          ]}
        >
          |
        </Animated.Text>
      )}
    </View>
  );
}
