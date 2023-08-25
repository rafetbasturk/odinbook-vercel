/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme(current => {
      return current === "dark" ? "light" : "dark"
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export {
  ThemeProvider,
  ThemeContext
}