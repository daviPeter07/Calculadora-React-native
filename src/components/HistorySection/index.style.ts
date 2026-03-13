import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 160,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  clearButton: {
    padding: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  list: {
    maxHeight: 120,
  },
  listContent: {
    paddingBottom: 12,
  },
  item: {
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 4,
    opacity: 0.9,
  },
});
