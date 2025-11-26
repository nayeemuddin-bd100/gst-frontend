import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import ProcessText from "../functions/LanguageSorter";
import { useLanguage } from "../modules/LanguageContext";

import "../styles/NestedDropdown.css"; // Importa los estilos CSS

const NestedDropdown = ({ dropdownName, data, resumeLink, onToggle }) => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { language } = useLanguage();

  const processText = (texto) => {
    const clave = "***";
    const index = texto.indexOf(clave);
    return index === -1
      ? texto
      : language === "en"
      ? texto.substring(0, index)
      : texto.substring(index + clave.length);
  };

  const toggleMainDropdown = () => {
    setIsMainOpen(!isMainOpen);
  };

  const toggleSubDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="nd-dropdown-container">
      {/* Dropdown Principal */}
      <button className="nd-dropdown-button" onClick={toggleMainDropdown}>
        {ProcessText(dropdownName)}{" "}
        <IoIosArrowDown
          fill="var(--primary-color)"
          style={
            isMainOpen ? { transform: "rotate(180deg)" } : { transform: "" }
          }
        />
      </button>

      <div className={`nd-dropdown-menu ${isMainOpen ? "open" : ""}`}>
        {data.map((item, index) => (
          <div key={item.category.id} className="nd-dropdown-item">
            <button
              className="nd-dropdown-submenu-button"
              onClick={() => toggleSubDropdown(index)}
            >
              {processText(item.category.category_name)}{" "}
              <IoIosArrowDown
                fill="#666"
                style={
                  openDropdown === index
                    ? { transform: "rotate(180deg)" }
                    : { transform: "" }
                }
              />
            </button>

            <div
              className={`nd-dropdown-submenu ${
                openDropdown === index ? "open" : ""
              }`}
            >
              {resumeLink ? (
                <Link
                  onClick={onToggle}
                  className="nd-dropdown-link"
                  to="/category"
                  state={{ item }}
                >
                  {processText("Find A *** Buscar un Tour en") +
                    " " +
                    processText(item.category.category_name) +
                    " " +
                    processText("Tour *** . ")}
                </Link>
              ) : null}
              {item.options.map((option, index) => (
                <Link
                  key={index}
                  to={!resumeLink ? option[0] : "/tours"}
                  state={{ data: option[0], category: item.category }}
                  className="nd-dropdown-link"
                  onClick={onToggle}
                >
                  {processText(option[1])}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NestedDropdown;
