import { Text, View } from "react-native";
import { styles } from "./style";

export default function Page() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello world</Text>
    </View>
  );
}