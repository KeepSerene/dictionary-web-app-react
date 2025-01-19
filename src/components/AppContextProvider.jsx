// React imports
import { createContext, useContext, useEffect, useState } from "react";

// Helper function & constant imports
import {
  FF_STORAGE_KEY,
  getInitialFFName,
  isInitialThemeDark,
  THEME_STORAGE_KEY,
} from "../utils/utils";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(isInitialThemeDark);
  const [fontFamily, setFontFamily] = useState(getInitialFFName);
  const [activeFFName, setActiveFFName] = useState("");
  const [isFFPopupOpen, setIsFFPopupOpen] = useState(false);
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);

  // =========== THEME ============
  useEffect(() => {
    document.documentElement.style.colorScheme = isDarkTheme ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, isDarkTheme ? "dark" : "light");
    document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  // =========== FONT FAMILY ============
  useEffect(() => {
    setActiveFFName(fontFamily);
    localStorage.setItem(FF_STORAGE_KEY, fontFamily);
    document.body.setAttribute("data-font-family", fontFamily);
  }, [fontFamily]);

  // =========== SEARCH MEANING =============
  const onSearch = async (event) => {
    event.preventDefault();

    if (!word.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word
          .trim()
          .toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("No definitions found for the word!");
      }

      const data = await response.json();

      console.log(data);

      // Set the most relevant result
      setResult(data[0]);
      setWord("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
        fontFamily,
        setFontFamily,
        activeFFName,
        isFFPopupOpen,
        setIsFFPopupOpen,
        word,
        setWord,
        isLoading,
        errorMsg,
        onSearch,
        result,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
