import { StyleSheet } from "react-native";

const GAP = 12;

export const styles = StyleSheet.create({
  buttonsContainer: {
    paddingBottom: 32,
    gap: GAP,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: GAP,
  },
});
