// Constants
const THEME_STORAGE_KEY = "dictionaryTheme";
const FF_STORAGE_KEY = "dictionaryFF";
const FONT_FAMILIES = ["sans", "serif", "mono"];

// Helper functions
const isInitialThemeDark = () => {
  const userTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isSysThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (userTheme) {
    return userTheme === "dark";
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, isSysThemeDark ? "dark" : "light");

    return isSysThemeDark;
  }
};

const getInitialFFName = () => {
  const storedFF = localStorage.getItem(FF_STORAGE_KEY);

  return storedFF ? storedFF : "sans";
};

export {
  THEME_STORAGE_KEY,
  FF_STORAGE_KEY,
  FONT_FAMILIES,
  isInitialThemeDark,
  getInitialFFName,
};
