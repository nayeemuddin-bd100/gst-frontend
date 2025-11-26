import React, { useEffect, useState } from "react";
import { GiAlienFire } from "react-icons/gi";
import { usePageData } from "../../../modules/PageDataContext";
import "../../../styles/hero.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../modules/LanguageContext";

const FormLandingPage = () => {
  const { homePageData, setHomePageData } = usePageData();

  //   Hero
  const images = homePageData.hero.images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Video List
  const [currentVideo, setCurrentVideo] = useState(
    homePageData.videoListCurrentVideo
  );
  const videoList = homePageData.videoList;
  const handleVideoChange = (url) => {
    setCurrentVideo(url);
  };
  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? match[1] : "";
  };

  // Travel Types
  const travelTypes = homePageData.travelTypes;

  // Reason Sections
  const reasonItems = homePageData.reasonList;
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
    <div>
      {/* Hero */}
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
              <input
                type="text"
                onChange={(e) =>
                  setHomePageData((prev) => ({
                    ...prev,
                    ["hero"]: { ...prev.hero, ["text1"]: e.target.value },
                  }))
                }
                value={homePageData.hero.text1}
              />
              <input
                type="text"
                onChange={(e) =>
                  setHomePageData((prev) => ({
                    ...prev,
                    ["hero"]: { ...prev.hero, ["text2"]: e.target.value },
                  }))
                }
                value={homePageData.hero.text2}
              />
            </div>
            <hr />
          </div>
        </div>
      </section>
      <div className="h-image-links">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <p>Image Link {index + 1}</p>
            <input
              type="text"
              placeholder="image url"
              value={homePageData.hero.images[index]}
              onChange={(e) =>
                setHomePageData((prev) => {
                  const newImages = [...prev.hero.images];
                  newImages[index] = e.target.value;
                  return {
                    ...prev,
                    hero: {
                      ...prev.hero,
                      images: newImages,
                    },
                  };
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Video List */}
      <section style={{ marginTop: 50 }}>
        <div className="vp-video-section">
          <div className="vp-video-container">
            <ReactPlayer
              url={currentVideo} // Usamos el estado para la URL del video actual
              className="vp-react-player"
              width="100%" // Ajustamos al tamaño del contenedor
              height="100%" // Ajustamos al tamaño del contenedor
              controls={true} // Mostramos los controles
            />
          </div>

          {/* Contenedor de miniaturas */}
          <div className="vp-thumbnails-container">
            {videoList.map((video, index) => (
              <div
                key={index}
                className={`vp-thumbnail ${
                  video.url === currentVideo ? "active" : ""
                }`}
                onClick={() => handleVideoChange(video.url)} // Cambiar video al hacer clic
              >
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail ${index}`}
                  className="vp-thumbnail-img"
                />
              </div>
            ))}
          </div>
          <div className="h-image-links">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <p>Video Link {index + 1}</p>
                <input
                  type="text"
                  placeholder="video url"
                  value={homePageData.videoList[index].url}
                  onChange={(e) =>
                    setHomePageData((prev) => {
                      const newVideoList = [...prev.videoList];
                      newVideoList[index] = {
                        ...newVideoList[index],
                        url: e.target.value,
                        // optionally update thumbnail if it's YouTube:
                        thumbnail: `https://img.youtube.com/vi/${extractYouTubeId(
                          e.target.value
                        )}/hqdefault.jpg`,
                      };
                      return {
                        ...prev,
                        videoList: newVideoList,
                      };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Types */}
      <div className="tt-flex-container">
        {travelTypes.map((item, index) => (
          <div className="tt-items-container" key={index}>
            <div
              className="tt-item-background"
              style={{ backgroundImage: `url(${item.background})` }}
            ></div>
            <div className="tt-flex-item">
              <input
                type="text"
                value={item.title}
                className="input-field"
                onChange={(e) =>
                  setHomePageData((prev) => ({
                    ...prev,
                    travelTypes: prev.travelTypes.map((tt, i) =>
                      i === index ? { ...tt, title: e.target.value } : tt
                    ),
                  }))
                }
              />

              <p>Learn More***Conocer Más</p>
            </div>
            <input
              type="text"
              className="tt-img-url-field"
              value={item.background}
              onChange={(e) =>
                setHomePageData((prev) => {
                  const updatedTravelTypes = [...prev.travelTypes];
                  updatedTravelTypes[index] = {
                    ...updatedTravelTypes[index],
                    background: e.target.value,
                  };
                  return {
                    ...prev,
                    travelTypes: updatedTravelTypes,
                  };
                })
              }
            />
          </div>
        ))}
      </div>

      {/* Reason Section */}
      <section>
        <div className="r-reasons-container">
          <h2>
            {processText(
              "Why travel with Good Shepherd Tours?***¿Por qué viajar con Good Shepherd Tours?"
            )}
          </h2>
          <div className="r-section-container">
            {reasonItems.map((item, index) => (
              <div className="r-section-item e-r-section-item" key={index}>
                <img src={item.imgSrc} alt={item.title} />
                <input
                  type="text"
                  className="r-s-card-img"
                  value={item.imgSrc}
                  onChange={(e) =>
                    setHomePageData((prev) => ({
                      ...prev,
                      reasonList: prev.reasonList.map((reason, i) =>
                        i === index
                          ? { ...reason, imgSrc: e.target.value }
                          : reason
                      ),
                    }))
                  }
                />
                <GiAlienFire size={64} className="r-hero-arrow" />
                <div>
                  {/* <h3>{processText(item.title)}</h3> */}
                  <input
                    type="text"
                    value={item.title}
                    className="input-field r-s-card-title"
                    onChange={(e) =>
                      setHomePageData((prev) => ({
                        ...prev,
                        reasonList: prev.reasonList.map((reason, i) =>
                          i === index
                            ? { ...reason, title: e.target.value }
                            : reason
                        ),
                      }))
                    }
                  />

                  <textarea
                    type="text"
                    value={item.text}
                    className="input-field r-s-card-text"
                    onChange={(e) =>
                      setHomePageData((prev) => ({
                        ...prev,
                        reasonList: prev.reasonList.map((reason, i) =>
                          i === index
                            ? { ...reason, text: e.target.value }
                            : reason
                        ),
                      }))
                    }
                  />
                  <Link to={"/why-gst"}>
                    {processText("Read More***Leer Más")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormLandingPage;
