import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import HeaderButton from "../components/Header-contact-button";
import "../styles/mobile-menu.css";
import { Link } from "react-router-dom";
import NestedDropdown from "./NestedDropdown";
import axios from "axios";
import { Adress } from "../functions/Variables";
import { useLanguage } from "../modules/LanguageContext";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "../modules/PageDataContext";

// const jsonData = [
//   {
//     category: {
//       id: 1,
//       category_name: "Learn about",
//     },
//     options: [
//       ["/explore-tours", "Explore Tours"],
//       ["/solo-travel", "Solo travel"],
//       ["/small-groups", "Small groups"],
//       ["/private-touring", "Private touring"],
//     ],
//   }
// ];

// const jsonDataAbout = [
//   {
//     category: {
//       id: 1,
//       category_name: "Meet good shepherd Tours",
//     },
//     options: [
//       ["/why-gst", "why Good Shepherd Tours"],
//       ["/tech-on-tours", "Tech on tours"],
//       ["/videos", "Video gallery"],
//       ["/reviews", "Reviews and testimonials"],
//     ],
//   }
// ];

function MobileMenu() {

    const { headerData } = usePageData();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [countryData, setCountryData] = useState([]);

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
    }
  ];
  
  const jsonDataAbout = [
    {
      category: {
        id: 1,
        category_name: processText("Meet good shepherd Tours***Conoce a Good Shepherd Tours"),
      },
      options: [
        ["/why-gst", processText("why Good Shepherd Tours***Por qué Good Shepherd Tours")],
        ["/tech-on-tours", processText("Tech on tours***Tecnologia en los tours")],
        ["/videos", processText("Video gallery***Galeria de video")],
        ["/reviews", processText("Reviews and testimonials***Opiniones y testimonios")],
      ],
    }
  ];

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
    window.scrollTo(0, 0)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          Adress + "api/listTours"
        );
        setCountryData(response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mobile-menu">
      <a href="/">
        <img className="" src={headerData.logo} />
      </a>
      <button className="mm-open-button" onClick={() => setMenuOpen(!menuOpen)}>
        <IoIosMenu size={72} fill="#fff" />
      </button>
      <div className={`mobile-menu-bg ${menuOpen ? "isOpen" : "isClosed"}`}>
        <div className="mobile-menu-container">
          <button className="mm-close-button" onClick={() => setMenuOpen(!menuOpen)}>
            <IoMdClose size={32} />
          </button>
          <HeaderButton />
          <div className="mobile-item">
            <NestedDropdown data={countryData} dropdownName={ProcessText('Explore tours*** Explorar tours')} resumeLink={true} onToggle={handleToggle}   />
            <NestedDropdown data={jsonData} dropdownName={ProcessText('Travel Styles***Estilos de viaje')}  resumeLink={false} onToggle={handleToggle} />
            <NestedDropdown data={jsonDataAbout} dropdownName={ProcessText('About Us***Sobre nosotros')}  resumeLink={false} onToggle={handleToggle} />
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
