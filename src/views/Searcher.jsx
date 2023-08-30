import React, { useState, useEffect } from "react";
import "../styles/Searcher.css";
import searchIcon from "../assets/search.svg";
import arrowLeftImage from "../assets/left-icon-placeholder.svg";
import BottomBar from "../components/BottomBar";

const Searcher = () => {
  const [searchText, setSearchText] = useState("");
  const [songs, setSongs] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);
  const [showTop20, setShowTop20] = useState(true);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
    setShowTop20(inputValue === "");
    setShowRecentSearches(inputValue !== "");

    if (inputValue !== "") {
      const filteredSongs = songs.filter(
        (song) =>
          song.nombre.toLowerCase().includes(inputValue.toLowerCase()) ||
          song.artista.toLowerCase().includes(inputValue.toLowerCase())
      );

      setRecentSearches(filteredSongs);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim() !== "") {
      const searchExists = recentSearches.some(
        (song) =>
          song.nombre.toLowerCase() === searchText.toLowerCase() ||
          song.artista.toLowerCase() === searchText.toLowerCase()
      );

      if (!searchExists) {
        const newSearch = songs.find(
          (song) =>
            song.nombre.toLowerCase() === searchText.toLowerCase() ||
            song.artista.toLowerCase() === searchText.toLowerCase()
        );

        if (newSearch) {
          setRecentSearches([newSearch, ...recentSearches]);
        }
      }
    }
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(document.cookie)
        const response = await fetch("http://localhost:3000/user/canciones", {credentials: 'include'});
        const data = await response.json();
        setSongs(data.canciones);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main id="main-searcher">
      <div className="top-gradient"></div>
      {searchText === "" && <h2 id="searchTitle">Buscador</h2>}
      <div
        className={`search-input-container ${
          isInputFocused || searchText ? "active" : ""
        }`}
      >
        <input
          type="text"
          id="search"
          name="search"
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(e);
            }
          }}
          placeholder="¿Qué deseas escuchar?"
        />

        <img
          src={searchText || isInputFocused ? arrowLeftImage : searchIcon}
          alt="Ícono"
          className="search-icon"
        />
      </div>
      <section
        id="top-20"
        style={{ display: showRecentSearches ? "none" : "flex" }}
      >
        {showTop20 && (
          <>
            <div className="dividerContainer">
              <h2>Top 20s</h2>
              <div className="divider"></div>
            </div>

            <section className="songContainer">
              {songs?.map((song) => (
               <div className="songCard" key={song.id}>
                <img
                 src={
                   new URL(
                     `../assets/albumfoto/${song.album_id}.jpg`,
                     import.meta.url
                   )
                 }
                 alt={`Este album pertenece a: ${song.artista}`}
               />
               <h2 className="songTitle">{song.nombre}</h2>
               <h3 className="songArtist">{song.artista}</h3>
             </div>
              ))}
            </section>
          </>
        )}
      </section>
      <section
        id="recent-searches"
        style={{ display: showRecentSearches ? "flex" : "none" }}
      >
        <div className="dividerContainer">
          <h2>Búsquedas Recientes:</h2>
          <div className="divider"></div>
        </div>
        <section className="songContainer">
          {recentSearches?.map((song) => (
            <div className="songCard" key={song.id}>
            <img
              src={
                new URL(
                  `../assets/albumfoto/${song.album_id}.jpg`,
                  import.meta.url
                )
              }
              alt={`Este album pertenece a: ${song.artista}`}
            />
            <h2 className="songTitle">{song.nombre}</h2>
            <h3 className="songArtist">{song.artista}</h3>
          </div>
          ))}
        </section>
      </section>

      <BottomBar />
      <div className="btm-gradient"></div>
    </main>
  );
};

export default Searcher;
