import React, { useState, useEffect } from "react";
import HeaderSection from "../components/HeaderSection";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/category-resume.css";
import TitleText from "../components/TitleText";
import { Adress } from "../functions/Variables";
import { useLanguage } from "../modules/LanguageContext";


const ExploreTours = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          Adress + "api/listTours"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const { language } = useLanguage();
  
    const processText = (texto) => {
      if (texto) {
        const clave = "***";
        const index = texto.indexOf(clave);
        return index === -1
          ? texto
          : language === "en"
          ? texto.substring(0, index)
          : texto.substring(index + clave.length);
      }
      return texto;
    };

  return (
    <>
      <HeaderSection
        image="https://delivery.gfobcontent.com/api/public/content/93dc8f187c9a4ab39800a4aecaa6fe23?v=25947c4a&t=w2999"
        title={processText("Explore Good Shepherd Tours***Explorar Good Shepherd Tours")}
        subtitle={processText("Tour Packages that Really Deliver***Paquetes Turisticos que cumplen su función")}
        description={processText("We deliver experiences that go beyond the globe’s go-to landmarks to get you up close to our local favorites – and favorite locals – while presenting you the greatest menu of touring styles to experience the world in the “wow” ways and great travel deals.***Entregamos experiencias que van más allá de los puntos de referencia de la globalidad para acercarte a nuestros lugares favoritos mientras te presentamos el mejor menú de estilos de Tours para experimentar el mundo en las formas que te haran decir “wow” ademas de excelentes ofertas de viajes. ")}
      />
      <h2 className="wow">{processText("WOW IS WAITING***WOW ESTÁ A LA ESPERA")}</h2>  
      <div className="et-container">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="et-items-container" key={index}>
              <div
                style={{
                  backgroundImage: `url(${Adress}uploads/category-profile/${item.category.image})`,
                }}
                className="et-background"
              ></div>
              <h3>{processText(item.category?.category_name) || "No category"}</h3>
              <Link to={'/category'} state={{ item : item} }>{processText("Explore Tours***Explorar Tours")}</Link>
            </div>
          ))
        ) : (
          <p>webo</p>
        )}
      </div>
      <div className="et-tour-types">
        <h2>{processText("Destination Amazing***Destino a lo increible")}</h2>
        <TitleText title={processText("Private Touring***Tours privados")} text={processText("See more of the world, without the rest of the world. Keep it to yourselves with your inner circle of friends, family, or favorite travel companions on a Private Touring vacation. ***Ver más del mundo, sin el resto del mundo. Guárdelo con su círculo íntimo de amigos, familiares o compañeros de viaje favoritos en unas vacaciones de Tours Privados.")} />
        <TitleText title={processText("Small-Group Discoveries***Descubrimientos en grupos pequeños")} text={processText("Experience the world with the option of choosing Small-Group Discoveries with an average of 20-24 guests per tour departure. Intimate, inspiring, and a lot more elbow room to explore.***Experimente el mundo con la opción de elegir Descubrimientos de Grupos Pequeños con un promedio de 20-24 invitados por salida del tour. Íntimo, inspirador y mucho más espacio para los codos para explorar.")} />
        <TitleText title={processText("GoParks! Tours***Tours en parques")} text={processText("Protecting our national treasures while supporting the Wildland Firefighter Foundation is just one way we help preserve the wild places and National Parks for generations to enjoy.***Proteger nuestros tesoros nacionales mientras apoyamos a la Wildland Firefighter Foundation es solo una forma en que ayudamos a preservar los lugares salvajes y los Parques Nacionales para que las generaciones disfruten. ")} />
        <TitleText title={processText("Cruise & Tour***Cruseros y tours")} text={processText("See the world by land and by sea on these great combination tours that deliver new perspectives and pleasures from ship to shore.***Vea el mundo por tierra y por mar en estos grandes recorridos combinados que ofrecen nuevas perspectivas y placeres desde el barco hasta la costa.")} />
      </div>
      
    </>
  );
};

export default ExploreTours;
