import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { useLanguage } from "../modules/LanguageContext";

function DropdownButton({
  id,
  isOpen,
  toggleDropdown,
  title,
  data,
  resumeLink,
}) {
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

  return (
    <div className="mobile-dropdown">
      <button
        className="mobile-dropdown-button"
        onClick={() => toggleDropdown(id)}
      >
        <p>{processText(title)}</p> <IoIosArrowDown fill="#fff" />
      </button>

      <div
        className="mobile-dropdown-content"
        style={isOpen ? { display: "flex" } : { display: "none" }}
      >
        {data.map((item) => (
          <div key={item.category.id} className="category-container">
            <h3>{processText(item.category.category_name)}</h3>
            <div>
              {resumeLink ? (
                <Link
                  onClick={() => toggleDropdown(id)}
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
                  onClick={() => toggleDropdown(id)}
                  key={index}
                  to={!resumeLink ? option[0] : "/tours"}
                  state={{ data: option[0],category: item.category}}
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
}

export default DropdownButton;
