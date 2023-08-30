import React from "react";
import "../styles/Home2.css";
import BottomBar from "../components/BottomBar";
import headphones from "../assets/headphones.svg";
import cherub from "../assets/cherub.svg";
import map from "../assets/map.svg";
import question from "../assets/question.svg";
import bell from "../assets/bell.svg";
import vector from "../assets/Vector.svg";

import { useNavigate } from "react-router";

const Home2 = () => {
  const navigate = useNavigate();

  const handleCupid = () => {
    navigate(`/match_screen`);
  };
  const handleContextual = () => {
    navigate(`/musica_contextual`);
  };

  return (
    <main className="Card">
      <div className="header">
        <div className="Backgr-degrade" />
        <div className="top-bar">
          <h1> Música ya </h1>
          <div className="Home2-Buttons">
            <button>
              <img src={vector} alt="" />
            </button>
            <button>
              <img src={bell} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="playlists-type" onClick={handleCupid}>
        <div className="imgs">
          <img src={headphones} alt="" />
          <img src={cherub} alt="" className="img2" />
        </div>
        <div className="playlists-info">
          <h2>Cupido Musical</h2>
          <p>
            Tus artistas favoritos nunca te van a dejar con el corazón roto.
          </p>
        </div>
      </div>

      <div className="playlists-type" onClick={handleContextual}>
        <div className="imgs2">
          <img src={map} alt="" className="img1" />
          <img src={question} alt="" className="img2" />
        </div>
        <div className="playlists-info">
          <h2>Música Contextual</h2>
          <p>Creamos una playlist perfecta para cualquier situación.</p>
        </div>
      </div>

      <BottomBar />
    </main>
  );
};

export default Home2;
