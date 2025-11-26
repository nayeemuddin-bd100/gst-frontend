import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { GiAlienFire } from "react-icons/gi";
import { ImFlag } from "react-icons/im";
import { RiRestaurantLine } from "react-icons/ri";
import ExpandableContainer from "../modules/TourDay";
import GuideCard from "../components/GuideCard";
import HotelCard from "../components/HotelCard";
import "../styles/tour-view.css";
import axios from "axios";
import TitleText from "../components/TitleText";
import PriceCalculator from "../components/PriceCalculator";

import { useLanguage } from "../modules/LanguageContext";
import { Adress } from "../functions/Variables";
import { BookTour } from "../components/BookTour";

const TourView = () => {
  const location = useLocation();

  const [tourData, setTourData] = useState([]);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("tour_id", location.state.data);
    }
  }, []);

  useEffect(() => {
    const postData = async () => {
      const url = Adress + "api/viewItinerary";
      let data = { id: parseInt(localStorage.getItem("tour_id")) };

      try {
        const response = await axios.post(url, data);

        setTourData(response.data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    postData();
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
    <div style={{ background: "#dddddd" }}>
      {tourData.length > 0 ? (
        <>
          <BookTour
            tour={[tourData[4], tourData[0], tourData[7]]}
            display={showBooking}
            setShowBooking={setShowBooking}
          />
          <div
            className="tour-hero"
            style={{
              backgroundImage: `url(${Adress}uploads/tour-profile/${tourData[4].tour_image})`,
            }}
          ></div>
          <div className="container">
            <div className="left-section">
              <GiAlienFire
                size={72}
                fill="var(--primary-color)"
                className="tour-hero-arrow"
              />
              <br />
              <h1>{processText(tourData[4].gti_name)}</h1>
              <br />
              <p>{processText(tourData[4].description)}</p>

              <TitleText
                title="All This. Included.***Todo esto, incluido."
                text="The world is within reach with everything you need for perfectly affordable touring. good shepherd tours includes hand-selected accommodations, guided sightseeing, and seamless transportation between destinations—with value-minded travel lovers in mind. Explore with expert good shepherd Tour Directors and Local Guides, and private, first-class, and air-conditioned motorcoach. Enhance your free time to explore like a local with your good shepherd tours mobile app!***El mundo está al alcance con todo lo que necesita para un recorrido perfectamente asequible.los buenos tours de pastores incluyen alojamiento seleccionado a mano, visitas guiadas y transporte sin interrupciones entre destinos, con amantes de los viajes de valor en mente. Explore con expertos buenos directores de tours de pastores y Guías Locales, y un autocar privado, de primera clase y con aire acondicionado. ¡Mejora tu tiempo libre para explorar como un local con tu aplicación móvil good shepherd tours!"
              />
            </div>
            <div className="right-section">
              <div className="day-country-container">
                <div>
                  <p>{tourData[4].gti_total_days}</p>
                  <p>{processText("Days***Dias")}</p>
                </div>
                <span>/</span>
                <div>
                  <p>{tourData[1].length}</p>
                  <p>
                    {tourData[1].length < 2
                      ? processText("country***Pais")
                      : processText("countries***Paises")}
                  </p>
                </div>
              </div>
              <div className="countries-meals-container">
                <div>
                  <div className="icon">
                    <ImFlag />
                    <p>{processText("COUNTRIES***PAISES")}</p>
                  </div>
                  <div className="countries-meals-grid-container">
                    {tourData[1].map((item, index) => (
                      <p key={index}>{processText(item)}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="icon">
                    <RiRestaurantLine />
                    <p>{processText("MEALS INCLUDED***COMIDAS INCLUIDAS")}</p>
                  </div>
                  <div
                    style={{ display: "flex" }}
                    className="countries-meals-grid-container"
                  >
                    {tourData[4].meals}
                  </div>
                </div>
              </div>
              <img
                src={
                  tourData[4].map
                    ? `${Adress}uploads/gti-map/${tourData[4].map}`
                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                }
                alt="map"
                className="tour-map"
              />

              <div className="price-container">
                <p>
                  {processText("From***Desde")}
                  <br />
                  (USD)
                </p>
                <div>
                  {/* {tourData[4].tour_price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  .00 */}
                  <PriceCalculator
                    tourData={tourData[4]}
                    promotion={tourData[8]}
                    deal={null}
                  />
                </div>
              </div>
              <div className="tv-reserve-btns">
                <button
                  className="tv-show-booking"
                  onClick={() => setShowBooking(true)}
                >
                  {processText("Book this tour***Reservar este tour")}
                </button>
                <br />
                {tourData[8].length > 0 ? (
                  <Link
                    to="/Deals"
                    className="tv-deals"
                    state={{
                      tour: tourData[4],
                      flights: tourData[0],
                      countries: tourData[7],
                      promotions: tourData[8],
                    }}
                  >
                    {processText(
                      "Explore deals and promotions***Explorar promociones y ofertas"
                    )}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          {tourData[4].notes ? (
            <TitleText title="Notes***Notas" text={tourData[4].notes} />
          ) : null}

          <ExpandableContainer
            data={JSON.parse(tourData[5][0].tour_itinerary)}
          />

          {tourData[3].length > 0 ? (
            <div className="our-guides">
              <h4>
                <span>{processText("Our***Nuestros")}</span>{" "}
                {processText("Guides***Guías")}
              </h4>
              <p>
                {processText(
                  "there’s no better way to get to know your destination than through the eyes of a Tour Director. We’d like you to meet one of our Tour Directors, who average over a decade of experience and are representative of the type of expert that will be with you on your vacation. Please note: This may not be your actual tour director on your tour.***no hay mejor manera de conocer su destino que a través de los ojos de un Director de Turismo. Nos gustaria que conozca a uno de nuestros Directores de Turismo, que tiene un promedio de más de una década de experiencia y es representativo del tipo de experto que estará con usted en sus vacaciones. Tenga en cuenta: Este puede no ser su director de gira real en su recorrido."
                )}
              </p>
            </div>
          ) : null}
          {tourData[3].map((data, index) => (
            <GuideCard
              key={index}
              name={data.guide_first_n + " " + data.guide_l_name}
              image={data.image}
              description={data.guide_address}
            />
          ))}
          {tourData[2].length > 0 ? (
            <div className="our-guides">
              <h4>
                {processText("hand-picked***Hoteles")}
                <span>{processText("Hotels***Escogidos a mano")}</span>
              </h4>
              <p>
                {processText(
                  "After a day of traveling, you want to relax at a comfortable, clean, and attractive hotel. We select hotels with the best guestrooms (always with a private bathroom), service, and food for the money.***Después de un día de viaje, desea relajarse en un hotel cómodo, limpio y atractivo. Seleccionamos hoteles con las mejores habitaciones (siempre con baño privado), servicio y comida por el dinero."
                )}
                .
              </p>
            </div>
          ) : null}
          <HotelCard hotelData={tourData[2]} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default TourView;
