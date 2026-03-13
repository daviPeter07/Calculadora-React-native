import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    minHeight: 48,
  },
  iconButton: {
    padding: 8,
  },
  spacer: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
});
