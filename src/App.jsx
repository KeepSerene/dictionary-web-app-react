// Context provider import
import AppContextProvider from "./components/AppContextProvider";

// Component import
import AppContent from "./components/appContent/AppContent";

// API: https://dictionaryapi.dev/

// Live site url: https://fem-dictionary-web-app.vercel.app/

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
