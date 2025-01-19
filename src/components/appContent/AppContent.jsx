import "./AppContent.css";

// Context import
import { useAppContext } from "../AppContextProvider";

// Component imports
import Header from "../header/Header";
import SearchForm from "../searchForm/SearchForm";
import SearchResult from "../searchResult/SearchResult";

function AppContent() {
  const { isLoading, errorMsg, result } = useAppContext();

  return (
    <main className="app-content">
      <Header />

      <SearchForm />

      {isLoading && <p className="wrapper">Searching...</p>}

      {errorMsg && <p className="wrapper">{errorMsg}</p>}

      {result && <SearchResult result={result} />}
    </main>
  );
}

export default AppContent;
