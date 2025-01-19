import "./Header.css";

// Context import
import { useAppContext } from "../AppContextProvider";
import { FONT_FAMILIES } from "../../utils/utils";

function Header() {
  const {
    isDarkTheme,
    setIsDarkTheme,
    setFontFamily,
    activeFFName,
    isFFPopupOpen,
    setIsFFPopupOpen,
  } = useAppContext();

  return (
    <header id="header" className="header | wrapper">
      {/* Logo */}
      <a href="#header" className="logo" aria-label="Site logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="38"
          viewBox="0 0 34 38"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke="#838383"
            strokeLinecap="round"
            strokeWidth="1.5"
          >
            <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
            <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
            <path d="M11 9h12" />
          </g>
        </svg>
      </a>

      {/* Settings */}
      <div className="settings">
        {/* Font family options */}
        <div className="font-switcher-wrapper">
          <button
            type="button"
            onClick={() => setIsFFPopupOpen(!isFFPopupOpen)}
            className="switch-ff-btn"
          >
            <span>{activeFFName}</span>

            {/* Chevron-(up/down) icon */}
            {isFFPopupOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="header-icon chevron up"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="header-icon chevron down"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </button>

          {/* Font family options popup */}
          <ul
            role="list"
            style={{ display: isFFPopupOpen ? "grid" : "none" }}
            className="font-families"
          >
            {FONT_FAMILIES.map((ff, index) => (
              <li
                key={index}
                onClick={() => {
                  setFontFamily(ff);
                  setIsFFPopupOpen(false);
                }}
                tabIndex={0}
                style={{
                  color: activeFFName === ff ? "hsl(var(--primary))" : "",
                  fontFamily:
                    ff === "sans"
                      ? "var(--ff-sans)"
                      : "serif"
                      ? "var(--ff-serif)"
                      : "var(--ff-mono)",
                }}
                className="font-family"
              >
                {ff}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Theme toggle slider */}
        <div className="theme-toggler-wrapper">
          {/* Slider track */}
          <button
            type="button"
            role="switch"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            aria-label="Toggle theme"
            style={{
              backgroundColor: isDarkTheme
                ? "hsl(var(--primary))"
                : "hsl(var(--light-text-secondary))",
            }}
            className="slider-track"
          >
            {/* Sliding knob */}
            <span
              style={{
                transform: isDarkTheme
                  ? "translate(25px, -50%)"
                  : "translate(5px, -50%)",
              }}
              className="sliding-knob"
            />
          </button>

          {/* Radio for dark theme */}
          <label htmlFor="dark-theme" tabIndex={0} className="dark-theme-label">
            <input
              type="radio"
              id="dark-theme"
              value="dark"
              checked={isDarkTheme}
              onChange={() => setIsDarkTheme(true)}
              aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
              className="dark-theme-input"
            />

            {/* Moon icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className="header-icon moon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Header;
