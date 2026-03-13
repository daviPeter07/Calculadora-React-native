import { StyleSheet } from "react-native";

const BUTTON_SIZE = 72;
const GAP = 16;

export const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "400",
  },
});
