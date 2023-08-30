import React, { useState } from "react";
import "../styles/Registration.css";
import { Link } from "react-router-dom";
import arrowLeftImage from "../assets/left-icon-placeholder.svg";
import Button from "../Components/Button";
import eyeSvg from "../assets/eye.svg";
import eyeOpenSvg from "../assets/eye_open.svg";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(newPassword.length >= 8);
  };

  const isUserNameEmpty = userName.trim() === "";
  const isPasswordEmpty = password === "";

  const isFormValid = !isUserNameEmpty && !isPasswordEmpty && isPasswordValid;

  const handleHome = () => {
    if (isFormValid) {
      const userData = {
        nombre: userName,
        contrasenia: password,
      };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userData),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            navigate("/home");
          } else {
            console.error("Authentication failed");
          }
        })
        .catch((error) => {
          console.error("Error occurred while logging in:", error);
        });
    }
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
        <h2>Iniciar Sesión</h2>
      </div>

      <label htmlFor="userName">Nombre de Usuario:</label>
      <input
        type="text"
        id="userName"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <label className="pswlabel" htmlFor="psw">
        Contraseña:
      </label>
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          id="psw"
          name="psw"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="password-toggle" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <img src={eyeOpenSvg} alt="Mostrar contraseña" />
          ) : (
            <img src={eyeSvg} alt="Ocultar contraseña" />
          )}
        </span>
      </div>

      <Button
        className={`btn_continue ${isFormValid ? "valid-email" : ""}`}
        text="Continuar"
        disabled={!isFormValid}
        onClick={handleHome}
      />

      <div className="btm-gradient"></div>
    </main>
  );
};

export default Login;
