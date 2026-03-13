import { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { styles } from "./index.style";

const MIN_FONT_SIZE = 24;
const MAX_FONT_SIZE = 64;
const SCROLL_THRESHOLD = 18;

const getFontSize = (length: number) => {
  if (length <= 6) return MAX_FONT_SIZE;
  if (length >= SCROLL_THRESHOLD) return MIN_FONT_SIZE;
  const size = MAX_FONT_SIZE - (length - 6) * 4;
  return Math.max(MIN_FONT_SIZE, size);
};

interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  const theme = useTheme();
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const scrollRef = useRef<ScrollView>(null);
  const length = value.length;
  const fontSize = getFontSize(length);
  const useScroll = length >= SCROLL_THRESHOLD;

  useEffect(() => {
    if (useScroll) {
      scrollRef.current?.scrollToEnd({ animated: false });
    }
  }, [value, useScroll]);

  useEffect(() => {
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
  }, [cursorOpacity]);

  const textContent = (
    <View style={styles.textRow}>
      <Text style={[styles.display, { color: theme.displayText, fontSize }]}>
        {value}
      </Text>
      <Animated.Text
        style={[
          styles.display,
          styles.cursor,
          {
            color: theme.displayText,
            opacity: cursorOpacity,
            fontSize,
          },
        ]}
      >
        |
      </Animated.Text>
    </View>
  );

  return (
    <View
      style={[
        styles.displayContainer,
        { backgroundColor: theme.displayBackground },
      ]}
    >
      {useScroll ? (
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {textContent}
        </ScrollView>
      ) : (
        textContent
      )}
    </View>
  );
}
