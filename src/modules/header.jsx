import React, { useState, useEffect } from "react";
import DropdownButton from "../components/DropdownButton";
import HeaderButton from "../components/Header-contact-button";
import MobileMenu from "../components/MobileMenu";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/header.css";
import axios from "axios";
import { Adress } from "../functions/Variables";
import LanguageSwitcher from "../components/LanguageSwitch";
import ProcessText from "../functions/LanguageSorter";
import { useLanguage } from "./LanguageContext";
import { usePageData } from "./PageDataContext";

function Header() {
  const { headerData } = usePageData();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [countryData, setCountryData] = useState([]);

  const titleExplore = ProcessText("Explore Tours***Explorar Tours");
  const titleTravel = ProcessText("Travel styles *** Estilos de viaje");
  const titleAbout = ProcessText("About us ***Sobre nosotros");
  const callAdvisorText = ProcessText(headerData.callAdvisorText);

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

  const jsonData = [
    {
      category: {
        id: 1,
        category_name: processText("Learn about***Conocenos"),
      },
      options: [
        ["/explore-tours", processText("Explore Tours***Explora Tours")],
        ["/solo-travel", processText("Solo travel*** Viajes en solitario")],
        ["/small-groups", processText("Small groups*** Grupos pequeños")],
        ["/private-touring", processText("Private touring*** Tours privados")],
      ],
    },
  ];

  const jsonDataAbout = [
    {
      category: {
        id: 1,
        category_name: processText(
          "Meet good shepherd Tours***Conoce a Good Shepherd Tours"
        ),
      },
      options: [
        [
          "/why-gst",
          processText("why Good Shepherd Tours***Por qué Good Shepherd Tours"),
        ],
        [
          "/tech-on-tours",
          processText("Tech on tours***Tecnologia en los tours"),
        ],
        ["/videos", processText("Video gallery***Galeria de video")],
        [
          "/reviews",
          processText("Reviews and testimonials***Opiniones y testimonios"),
        ],
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(Adress + "api/listTours");
        setCountryData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleRedirect = () => {
    window.location.href = import.meta.env.VITE_BACKEND_API;
  };

  return (
    <div className="header-container">
      <div className="top-bar" style={{ backgroundColor: "#333333" }}>
        <div>
          <button
            onClick={handleRedirect}
            style={{
              backgroundColor: "rgb(255 255 255)",
              color: "var(--primary-color)",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "lighter",
              marginRight: "5px",
            }}
          >
            {headerData.topbarText}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="header">
        <div className="header-items">
          <Link to={"/"}>
            <img className="" src={headerData.logo} alt="Logo" />
          </Link>
          <DropdownButton
            id="1"
            isOpen={openDropdown === "1"}
            toggleDropdown={toggleDropdown}
            title={titleExplore}
            data={countryData}
            resumeLink={true}
          />
          <DropdownButton
            id="2"
            isOpen={openDropdown === "2"}
            toggleDropdown={toggleDropdown}
            title={titleTravel}
            data={jsonData}
            resumeLink={false}
          />
          <DropdownButton
            id="3"
            isOpen={openDropdown === "3"}
            toggleDropdown={toggleDropdown}
            title={titleAbout}
            data={jsonDataAbout}
            resumeLink={false}
          />
        </div>
        <div
          className="header-items header-number-contact"
          onClick={() => setOpenDropdown(null)}
        >
          <HeaderButton />
          <div>
            <a href="tel:+123456789" className="phone-container">
              <FaPhoneAlt fill="#fff" size={20} /> <p>{headerData.phone}</p>
            </a>
            <p style={{ color: "#fff", fontSize: "12px" }}>{callAdvisorText}</p>
          </div>
        </div>
      </nav>
      <MobileMenu />
    </div>
  );
}

export default Header;
