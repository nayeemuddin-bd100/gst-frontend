import React, { useEffect, useState } from "react";
import "../styles/main-tour.css";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import axios from "axios";
import { Adress } from "../functions/Variables";
function SectionColumns() {
  const information = [
    {
      imageUrl: "https://images.globusfamily.com/promo/4810.jpg",
      imageAlt: "image 1",
      title:
        "Save up to $300 per couple on select 2025 good shepherd Tours Worldwide*",
      text: "Join this tour now and enjoy an adventure",
    },
    {
      imageUrl: "https://images.globusfamily.com/promo/1105.jpg",
      imageAlt: "image 2",
      title:
        "Save up to $200 per couple on select 2025 good shepherd Tours Worldwide*",
      text: "Join this tour now and enjoy an adventure",
    },
    {
      imageUrl: "https://images.globusfamily.com/promo/LH.jpg",
      imageAlt: "image 23",
      title:
        "Save 50% on the Single Supplement on select 2025 good shepherd Europe & North America Tours*",
      text: "Join this tour now and enjoy an adventure",
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Adress}api/promotions`);
        console.log("Response data:", response.data); // logs immediately from response
        setData(response.data); // updates state asynchronously
      } catch (error) {
        console.error("Error fetching promotions with itineraries:", error);
      }
    };

    fetchData();
  }, []);

  // Log when data changes
  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);
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
    <section className="mt-columns-container">
      {data.map((item, index) => (
        <div className="mt-column" key={index}>
          <div className="mt-content-container">
            <img src={item.imageUrl} className="mt-image" />
            <div className="mt-text-container">
              <h2 className="mt-title">{processText(item.title)}</h2>
              <p className="mt-text">{processText(item.text)}</p>
              <div className="mt-buttons">
                <Link
                  to="/viewTour"
                  state={{ data: item.gti_id }}
                  className="mt-button"
                >
                  {processText("View Tour *** Ver tour")}
                </Link>
                <Link
                  to="/viewTour"
                  state={{ data: item.gti_id }}
                  className="mt-button mt-second-button"
                >
                  {processText("Get this deal*** Obtener esta oferta")}
                </Link>
                {/* <button className="mt-button mt-second-button">
                  
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SectionColumns;
