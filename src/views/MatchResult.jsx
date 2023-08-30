import React from "react";
import "../styles/MatchResult.css";
import arrow from "../assets/left-icon-placeholder.svg";
import singer from "../assets/artist/1.png";
import singer2 from "../assets/artist/2.png";
import singer3 from "../assets/artist/3.png";
import singer4 from "../assets/artist/4.png";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router";

const MatchResult = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/home`);
  };
  return (
    <main className="Card">
      <div className="header">
        <div className="Backgr-degrade" />
        <div className="top-bar">
          <img src={arrow} srcSet="" onClick={handleHome} />
          <div className="titles">
            <h3> Generada del Cupido musical </h3>
            <h1>-Nombre de la playlist-</h1>
          </div>
        </div>
        <div>-</div>
      </div>

      <div className="ssinger">
        <img src={singer} className="ssinger2" />
        <img src={singer2} className="ssinger2" />
        <img src={singer3} className="ssinger3" />
        <img src={singer4} className="ssinger2" />
      </div>
      <div className="actions-bar">
        -icon- -verified- -share- -duration- -historial-
      </div>
      <div>-create copy- -Random/inline song- -play-</div>
      <div className="Songs">
        mapeo de las canciones -hamburger-<br></br>
        mapeo de las canciones -hamburger-<br></br>
        mapeo de las canciones -hamburger-<br></br>
        mapeo de las canciones -hamburger-<br></br>
      </div>
      <BottomBar />
    </main>
  );
};

export default MatchResult;
