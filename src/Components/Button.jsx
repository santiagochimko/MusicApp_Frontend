import React from 'react';
import "../styles/Button.css"

const Button = ({ id, className, text, onClick }) => {
  return (
    <button id={id} className={className} onClick={onClick}>{text}</button>
  );
};

export default Button;
