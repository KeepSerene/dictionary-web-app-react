import "./SearchResult.css";

// React imports
import { useRef, useState } from "react";

function SearchResult({ result }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Get the first available audio URL
  const audioURL =
    result?.phonetics.find((phonetic) => phonetic.audio)?.audio || "";

  const handleAudioPlay = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) audioRef.current.pause();
    else audioRef.current.play();
  };

  return (
    <article className="search-result | wrapper">
      {/* Word and phonetics section */}
      <section className="word-phonetics">
        <div className="word-audio-wrapper">
          <h1 className="word">{result.word}</h1>

          {/* Audio play/pause/muted button */}
          <button
            type="button"
            onClick={handleAudioPlay}
            disabled={!audioURL}
            aria-label={`${
              audioURL
                ? isAudioPlaying
                  ? "Pause pronunciation"
                  : "Play pronunciation"
                : "No pronunciation available"
            }`}
            style={{ cursor: !audioURL ? "not-allowed" : "" }}
            className="audio-control-btn"
          >
            {/* Play/pause/no-sound icon */}
            {audioURL ? (
              isAudioPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="icon pause"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="icon play"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="icon mute"
              >
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
              </svg>
            )}
          </button>

          {/* Audio */}
          <audio
            src={audioURL}
            ref={audioRef}
            onPlay={() => setIsAudioPlaying(true)}
            onPause={() => setIsAudioPlaying(false)}
            onEnded={() => setIsAudioPlaying(false)}
            className="phonetic-audio"
          />
        </div>

        <p className="phonetic-text">
          {result?.phonetics.find((phonetic) => phonetic.text)?.text}
        </p>
      </section>

      {/* Meanings section */}
      {result.meanings.map((meaning, index) => (
        <section key={index} className="meaning">
          <h2 className="part-of-speech-label">{meaning.partOfSpeech}</h2>

          <h3 className="meaning-label">Meaning</h3>

          {/* Definitions */}
          <ul className="def-list">
            {meaning.definitions.map((def, idx) => (
              <li key={idx} className="def-item">
                <p className="def">{def.definition}</p>

                {/* Definition example */}
                {def.example && <p className="def-example">{def.example}</p>}

                {/* Definition synonyms */}
                {def.synonyms.length > 0 && (
                  <div className="def-info-wrapper">
                    <h4 className="def-info-label">Synonyms</h4>

                    <p className="def-info">{def.synonyms.join(", ")}</p>
                  </div>
                )}

                {/* Definition antonyms */}
                {def.antonyms.length > 0 && (
                  <div className="def-info-wrapper">
                    <h4 className="def-info-label">Antonyms</h4>

                    <p className="def-info">{def.antonyms.join(", ")}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Synonyms */}
          {meaning.synonyms.length > 0 && (
            <div className="info-wrapper">
              <h3 className="info-label">Synonyms</h3>

              <p className="info">{meaning.synonyms.join(", ")}</p>
            </div>
          )}

          {/* Antonyms */}
          {meaning.antonyms.length > 0 && (
            <div className="info-wrapper">
              <h3 className="info-label">Antonyms</h3>

              <p className="info">{meaning.antonyms.join(", ")}</p>
            </div>
          )}
        </section>
      ))}

      {/* Source links section */}
      <footer className="source-wrapper">
        <h3 className="source-label">Source</h3>

        <ul role="list" className="source-list">
          {result.sourceUrls.map((url, index) => (
            <li key={index} className="source-item">
              <a href={url} target="_blank" className="source-link">
                <span className="source-link-text">{url}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="icon new-window"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
}

export default SearchResult;
