import React from "react";
import "../styles/matchScreen.css";
import arrow from "../assets/left-icon-placeholder.svg";
import CupidList from "../components/CupidList";
import { useNavigate } from "react-router";

const MatchScreen = () => {
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
          <h1> Cupido musical </h1>
        </div>
      </div>

      <CupidList />
    </main>
  );
};

export default MatchScreen;
