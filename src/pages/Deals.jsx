import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BookTour } from "../components/BookTour";
import "../styles/Deals.css";
import ProcessText from "../functions/LanguageSorter";
import { FaArrowRight } from "react-icons/fa";
import PriceCalculator from "../components/PriceCalculator";

const Deals = () => {
  const location = useLocation();

  const [showBooking, setShowBooking] = useState(false);
  const [deal, setDeal] = useState(null);
  const dealList = orderByDate(location.state?.promotions);

  function parseDate(dateStr) {
    const date = new Date(dateStr.split(" ")[0]);
    const diasSemana = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const meses = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return [
      diasSemana[date.getDay()],
      date.getDate(),
      meses[date.getMonth()],
      date.getFullYear(),
    ];
  }
  const groupedByMonth = dealList?.reduce((acc, item) => {
    const [, , mes] = parseDate(item.expiration);
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(item);
    return acc;
  }, {});
  function sumarDias(dateStr, days) {
    // Extrae solo la parte de la fecha
    const soloFecha = dateStr.split(" ")[0];

    // Crear objeto Date
    const fecha = new Date(soloFecha);

    // Sumar días
    fecha.setDate(fecha.getDate() + days);

    // Formatear de nuevo a "YYYY-MM-DD 00:00:00.00000"
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
    const dd = String(fecha.getDate()).padStart(2, "0");

    //console.log(`${yyyy}-${mm}-${dd} 00:00:00.00000`)

    return `${yyyy}-${mm}-${dd} 00:00:00.00000`;
  }

  function orderByDate(data) {
    return data?.sort((a, b) => {
      const dateA = new Date(a.expiration.split(" ")[0]);
      const dateB = new Date(b.expiration.split(" ")[0]);
      return dateA - dateB;
    });
  }
  const currentTour = location.state?.tour;

  return (
    <div className="de-main-container">
      <BookTour
        tour={[
          location.state?.tour,
          location.state?.flights,
          location.state?.countries,
          deal,
        ]}
        display={showBooking}
        setShowBooking={setShowBooking}
      />
      <div className="de-tour-data-container">
        <h1>
          {ProcessText("Selected Tour***Tour seleccionado")}{": "}
          <span>{currentTour?.gti_name}</span>
        </h1>
        {Object.entries(groupedByMonth).map(([mes, items], groupIndex) => (
          <div key={groupIndex}>
            <p className="de-month">{mes}</p>
            {items.map((item, index) => {
              let departure = parseDate(item.expiration);
              let returns = parseDate(
                sumarDias(item.expiration, currentTour?.gti_total_days)
              );
              return (
                <div className="de-deal-container" key={index}>
                  <div className="de-dates">
                    <div>
                      <p>{departure[0]}</p>
                      <p>{`${departure[1]} ${departure[2]} ${departure[3]}`}</p>
                    </div>
                    <FaArrowRight size={26} />
                    <div>
                      <p>{returns[0]}</p>
                      <p>{`${returns[1]} ${returns[2]} ${returns[3]}`}</p>
                    </div>
                  </div>
                  <div className="de-price-button">
                    <div>{ProcessText('From***Desde')}   <span><PriceCalculator tourData={currentTour} promotion={[item]} deal={item.id}/></span> </div>
                    <button
                      onClick={() => {
                        setDeal(item);
                        setShowBooking(true);
                      }}
                    >
                      {ProcessText('Get this deal***Obten esta oferta')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
