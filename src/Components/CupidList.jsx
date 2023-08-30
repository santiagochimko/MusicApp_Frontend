import React, { useEffect, useState } from "react";
import cross from "../assets/cross.svg";
import like from "../assets/like.svg";
import "../styles/CupidList.css";
import { useNavigate } from "react-router";

const CupidList = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [rotationCompleted, setRotationCompleted] = useState(false);
  const [likedArtists, setLikedArtists] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/artistas", {
          credentials: "include",
        });
        const data = await response.json();
        setArtists(data.artistas);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreatePlaylist = async () => {
    try {
      const userData = {
        nombreLista: listName,
        artistaID: likedArtists,
      };

      const response = await fetch("http://localhost:3000/user/cupido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Playlist creada exitosamente");
        navigate(`/user_profile`);
      } else {
        console.log("Error al crear:", responseData.error); // Cambia "error" por el campo correcto en la respuesta del servidor
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLike = () => {
    if (currentArtistIndex === artists.length - 1) {
      setRotationCompleted(true);
    } else {
      const currentArtist = artists[currentArtistIndex].id;
      setLikedArtists((prevLikedArtists) => [
        ...prevLikedArtists,
        currentArtist,
      ]);
      setCurrentArtistIndex(currentArtistIndex + 1);
    }
  };

  const handleDislike = () => {
    if (currentArtistIndex === artists.length - 1) {
      setRotationCompleted(true);
    } else {
      setCurrentArtistIndex(currentArtistIndex + 1);
    }
  };

  if (artists.length === 0) {
    return <div>Cargando...</div>;
  }

  if (rotationCompleted) {
    return (
      <div>
        <div>¡Has visto todos los artistas!</div>
        <div>Lista de reproducción:</div>
        <div className="liked-artists">
          {likedArtists.map((artist) => (
            <img
              key={artist}
              src={new URL(`../assets/artistas/${artist}.jpg`, import.meta.url)}
              alt={artist.nombre}
              className="liked-artist"
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Nombre de la playlist"
          onChange={(e) => {
            setListName(e.target.value);
          }}
        />
        <button onClick={handleCreatePlaylist}>Crear playlist</button>
      </div>
    );
  }

  const currentArtist = artists[currentArtistIndex];
  const nextArtistIndex = (currentArtistIndex + 1) % artists.length;
  const nextArtist = artists[nextArtistIndex];

  return (
    <div className="cupid-card">
      <img
        src={
          new URL(`../assets/artistas/${currentArtist.id}.jpg`, import.meta.url)
        }
        alt={currentArtist.nombre}
        className="singer"
      />
      <img
        src={
          new URL(`../assets/artistas/${nextArtist.id}.jpg`, import.meta.url)
        }
        alt={nextArtist.nombre}
        className="singer2"
      />
      <div className="buttons">
        <button className="like" onClick={handleLike}>
          <img src={like} alt="Like" />
        </button>
        <button className="dislike" onClick={handleDislike}>
          <img src={cross} alt="Dislike" />
        </button>
      </div>
      <h2>{currentArtist.nombre}</h2>

      <div className="liked-artists">
        {likedArtists.map((artist) => (
          <img
            key={artist}
            src={new URL(`../assets/artistas/${artist}.jpg`, import.meta.url)}
            alt={artist.nombre}
            className="liked-artist"
          />
        ))}
      </div>

      <input
        type="text"
        placeholder="Nombre de la playlist"
        onChange={(e) => {
          setListName(e.target.value);
        }}
      />
      <button onClick={handleCreatePlaylist} className="playlist-button">
        Crear playlist
      </button>
    </div>
  );
};

export default CupidList;
