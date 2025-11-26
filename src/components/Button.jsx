import React from "react";
import "../styles/paginationButton.css";

export function Button({ children, onClick, disabled, variant = "solid" }) {
  const variantClass =
    disabled
      ? "button-disabled"
      : variant === "ghost"
      ? "button-ghost"
      : "button-solid";

  return (
    <button
      className={`button ${variantClass}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
