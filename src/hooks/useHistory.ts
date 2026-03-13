import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "calculator_history";
const MAX_HISTORY = 50;

// Hook responsável pela persistência e gerenciamento do histórico de cálculos
export const useHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Carrega o histórico salvo no AsyncStorage ao montar o componente
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as string[];
          setHistory(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };
    load();
  }, []);

  // Persiste o histórico atualizado no AsyncStorage
  const save = useCallback(async (newHistory: string[]) => {
    try {
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
    }
  }, []);

  // Adiciona um novo cálculo ao topo do histórico (máx. 50 itens)
  const addToHistory = useCallback(
    (calculation: string) => {
      setHistory((prev) => {
        const next = [calculation, ...prev].slice(0, MAX_HISTORY);
        save(next);
        return next;
      });
    },
    [save]
  );

  // Limpa todo o histórico do estado e do AsyncStorage
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    save([]);
  }, [save]);

  // Alterna a visibilidade do painel de histórico
  const handleHistory = useCallback(() => {
    setShowHistory((prev) => !prev);
  }, []);

  // Fecha o painel de histórico
  const handleCloseHistory = useCallback(() => {
    setShowHistory(false);
  }, []);

  return {
    history,
    showHistory,
    addToHistory,
    handleClearHistory,
    handleHistory,
    handleCloseHistory,
  };
};
