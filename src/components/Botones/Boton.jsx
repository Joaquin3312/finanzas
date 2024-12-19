import React from "react";

const Boton = ({ className, icon, label, onClick }) => {
  return (
    <button className={`buttons ${className}`} onClick={onClick}>
      {icon} {label}
    </button>
  );
};

export default Boton;
