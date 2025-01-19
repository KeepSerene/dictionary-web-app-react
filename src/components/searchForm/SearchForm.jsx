import "./SearchForm.css";

// Context import
import { useAppContext } from "../AppContextProvider";

function SearchForm() {
  const { word, setWord, isLoading, onSearch } = useAppContext();

  return (
    <form onSubmit={onSearch} className="search-form | wrapper">
      <label htmlFor="search-term" className="sr-only">
        Enter any word to learn its meaning and more
      </label>

      <input
        type="text"
        id="search-term"
        value={word}
        onChange={(event) => setWord(event.target.value)}
        disabled={isLoading}
        placeholder="Search for any word..."
        className="search-input"
      />

      <button type="submit" aria-label="Search meaning" className="search-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
          className="search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchForm;
