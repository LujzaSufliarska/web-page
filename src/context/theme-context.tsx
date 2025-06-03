import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type Props = {
  children: React.ReactNode;
};

// createContext<type - "interface">(values)
const ThemeContext = createContext<{
  // Theme context type (params)
  theme: Theme;
  toggleTheme: () => void;
}>({
  // Default values
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider(props: Props) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export const useTheme = () => useContext(ThemeContext);
