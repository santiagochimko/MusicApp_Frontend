import React from "react";
import "../styles/BottomBar.css";
import home from "../assets/home.svg";
import search from "../assets/search.svg";
import user from "../assets/user.svg";
import friends from "../assets/friends.svg";
import { useNavigate } from "react-router";

const BottomBar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/home`);
  };
  const handleSearch = () => {
    navigate(`/searcher`);
  };
  const handleProfile = () => {
    navigate(`/user_profile`);
  };

  return (
    <div className="bottom-bar">
      <button className="bottom-buttons" onClick={handleHome}>
        <img src={home} alt=""  />
        Inicio
      </button>

      <button className="bottom-buttons" onClick={handleSearch}>
        <img src={search} alt=""  />
        Buscar
      </button>

      <button className="bottom-buttons" onClick={handleProfile}>
        <img src={user} alt=""  />
        Usuario
      </button>
      <button className="bottom-buttons">
        <img src={friends} alt="" />
        Amigos
      </button>
    </div>
  );
};

export default BottomBar;
