import React, { useState, useEffect } from "react";
import { GiAlienFire } from "react-icons/gi";
import "../styles/hero.css";
import { useLanguage } from "./LanguageContext";
import { usePageData } from "./PageDataContext";

function Hero() {

const {homePageData} = usePageData()
  // const images = [
  //   "https://ychef.files.bbci.co.uk/1280x720/p0h96r6y.jpg",
  //   "https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2021/06/conviertete-gladiador-dia-2391723.jpg?tf=3840x",
  //   "https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2023/08/mujer-frente-torre-eiffel-3117732.jpg?tf=3840x",
  // ];

  const images = homePageData.hero.images;


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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="lp-hero">
      <div
        className="lp-hero-image"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="lp-hero-circle">
          <GiAlienFire size={64} className="lp-hero-arrow" />
          <div>
            <h4>
              {processText(homePageData.hero.text1)}
              <br />
              {processText(homePageData.hero.text2)}
            </h4>

          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}

export default Hero;
