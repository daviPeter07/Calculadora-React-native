import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, type Theme } from "./colors";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const theme = useMemo(() => {
    if (themeMode === "light") return lightTheme;
    if (themeMode === "dark") return darkTheme;
    return systemColorScheme === "dark" ? darkTheme : lightTheme;
  }, [themeMode, systemColorScheme]);

  const value = useMemo(
    () => ({ theme, themeMode, setThemeMode }),
    [theme, themeMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context.theme;
};

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within ThemeProvider");
  }
  return { themeMode: context.themeMode, setThemeMode: context.setThemeMode };
};
