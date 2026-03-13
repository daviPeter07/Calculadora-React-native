import { StyleSheet } from "react-native";

const GAP = 16;

export const styles = StyleSheet.create({
  buttonsContainer: {
    paddingBottom: 40,
    paddingTop: 8,
    gap: GAP,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: GAP,
  },
});
