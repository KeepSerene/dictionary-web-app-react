import "./AppContent.css";

// Context import
import { useAppContext } from "../AppContextProvider";

// Component imports
import Header from "../header/Header";
import SearchForm from "../searchForm/SearchForm";
import Error from "../error/Error";
import SearchResult from "../searchResult/SearchResult";
import WelcomeNote from "../welcomeNote/WelcomeNote";

function AppContent() {
  const { isLoading, errorMsg, result } = useAppContext();

  return (
    <main className="app-content">
      <Header />

      <SearchForm />

      {isLoading && (
        <div
          className="loader | wrapper"
          role="status"
          aria-label="Searching"
        />
      )}

      {errorMsg && <Error errorMsg={errorMsg} />}

      {result ? (
        <SearchResult result={result} />
      ) : (
        !(isLoading || errorMsg) && <WelcomeNote />
      )}
    </main>
  );
}

export default AppContent;
