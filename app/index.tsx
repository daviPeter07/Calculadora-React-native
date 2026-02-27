import { Text, View, Pressable } from "react-native";
import { styles } from "./style";
import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const handleNumberPress = (num: string) => {
    // Lógica dos números
  };

  const handleOperator = (operator: string) => {
    // Lógica dos operadores
  };

  const handleEqual = () => {
    // Lógica do cálculo
  };

  const handleAC = () => {
    setDisplay("0");
  };

  const handleHistory = () => {
    // Lógica para mostrar histórico
  };

  return (
    <View style={styles.container}>
      {/*Historico*/}
      <View style={styles.header}>
        <Pressable style={styles.historyButton} onPress={handleHistory}>
          <Text>Histórico</Text>
        </Pressable>
      </View>

      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        {/* AC e Operadores */}
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleAC}>
            <Text style={styles.buttonText}>AC</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleOperator("+")}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleOperator("-")}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleOperator("*")}>
            <Text style={styles.buttonText}>×</Text>
          </Pressable>
        </View>

        {/* Linha 2 */}
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleOperator("/")}>
            <Text style={styles.buttonText}>÷</Text>
          </Pressable>
        </View>

        {/* Linha 3 */}
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </Pressable>
        </View>

        {/* Linha 4 */}
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </Pressable>
        </View>

        {/* Linha 5 */}
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.zeroButton]}
            onPress={() => handleNumberPress("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleNumberPress(".")}
          >
            <Text style={styles.buttonText}>.</Text>
          </Pressable>
        </View>

        {/* Linha 6 */}
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.equalButton]}
            onPress={handleEqual}
          >
            <Text style={styles.buttonText}>=</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
