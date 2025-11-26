import React from "react";
import "../styles/pagination-select.css";
import ProcessText from "../functions/LanguageSorter";

export function Select({ children, onChange, className, placeholder }) {
  return (
    <select className={`select ${className}`} onChange={onChange}>
      <option value="">{placeholder ||ProcessText("Select an option *** Selecciona una opción")}</option>
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}