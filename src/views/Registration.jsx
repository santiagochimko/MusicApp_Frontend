import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrowLeftImage from "../assets/left-icon-placeholder.svg";
import Button from "../Components/Button";
import "../styles/Registration.css";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    // Validar el formato del correo electrónico usando una expresión regular
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(newEmail === "" ? false : emailPattern.test(newEmail));
  };

  return (
    <main id="main-registration">
      <div className="top-gradient"></div>
      <div className="heading">
        <Link to="/">
          <button className="arrow_back">
            <img src={arrowLeftImage} alt="close modal" />
          </button>
        </Link>
        <h2>Crear Cuenta</h2>
      </div>
      <h1>¿Cuál es tu correo electrónico?</h1>
      <label htmlFor="email">Correo Electrónico:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      <p className="msj_alert">Deberás poder confirmarlo luego.</p>
      <Link
        className="btn_placer"
        to={isValidEmail ? "/registration_step_2" : ""}
      >
        <Button
          className={`btn_continue ${isValidEmail ? "valid-email" : ""}`}
          text="Continuar"
          disabled={!isValidEmail}
          onClick={() => {
            localStorage.setItem("mail", email);
          }}
        />
      </Link>
      <div className="btm-gradient"></div>
    </main>
  );
};

export default Registration;
