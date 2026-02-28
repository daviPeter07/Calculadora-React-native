import { Text, View } from "react-native";
import { styles } from "./index.style";

interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  return (
    <View style={styles.displayContainer}>
      <Text style={styles.display}>{value}</Text>
    </View>
  );
}
