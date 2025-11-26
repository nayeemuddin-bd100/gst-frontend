import { useState, useRef } from "react";
import axios from "axios";
import "../styles/BookTour.css";
import ProcessText from "../functions/LanguageSorter";
import PasswordChecklist from "react-password-checklist";
import CountrySearchSelect from "./AirportSelect";
import { Adress } from "../functions/Variables";
import { IoIosArrowDown } from "react-icons/io";
import fligthRoute from "../assets/images/flight-route.jpg";
import {
  FaPlane,
  FaPersonChalkboard,
  FaMapLocationDot,
  FaMoneyBillTransfer,
  FaSignHanging,
  FaRoute,
} from "react-icons/fa6";
import {
  FaPhoneAlt,
  FaCarSide,
  FaMonument,
  FaClipboardList,
} from "react-icons/fa";
import { MdEmail, MdLocalHotel, MdPersonPinCircle } from "react-icons/md";
import { IoTelescope, IoTicket } from "react-icons/io5";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { useLanguage } from "../modules/LanguageContext";

const Discount = ({ amount }) => {
  return amount != null ? (
    <p className="bt-discount-text">
      {amount}% {ProcessText("Discount applied!!!***De descuento aplicado!!!")}
    </p>
  ) : null;
};

export const BookTour = ({ display, setShowBooking, tour }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userType, setUserType] = useState(true);
  const [displayBookForm, setDisplayBookForm] = useState(true);
  const [tourInfo, setTourInfo] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [guests, setGuests] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [userMail, setUserMail] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
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
    console.log("text is ", texto);

    return texto;
  };

  console.log("this is tour", tour);

  const [currentForm, setCurrentForm] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const show = { height: "fit-content", overflow: "inherit" };
  const hide = { height: "0", overflow: "hidden" };

  let tourData = tour[0];
  let airports = tour[1];
  let deal = tour[3] != undefined ? true : false;

  let pastorsPrice = deal
    ? calculateDiscount(tourData.tour_price_pastors, tour[3].leader_cost)
    : tourData.tour_price_pastors;
  let regularPrice = deal
    ? calculateDiscount(tourData.tour_price, tour[3].general_cost)
    : tourData.tour_price;

  let currentPrice = userType ? pastorsPrice : regularPrice;

  let countries = tour[2];

  let options = [];
  const userDataForm = useRef(null);

  if (selectedCountry) {
    options = airports
      .filter((item) => item.country_id == selectedCountry)
      .map((item) => ({
        label: `${processText(item.airport_name)}`,
        value: item.id,
      }));
  } else {
    options = airports.map((item) => ({
      label: `${processText(item.airport_name)}`,
      value: [item.id, item.country_id],
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submittedData = {};
    for (let [key, value] of formData.entries()) {
      submittedData[key] = value;
      if (key === "guests") setGuests(parseInt(value));
    }
    setCurrentForm(formData);

    try {
      const response = await axios.post(`${Adress}api/bookTour`, formData);

      if (response.data != "found") {
        setDisplayBookForm(false);
        setTourInfo(response.data);
      } else alert("user already exists");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("La contraseña no cumple los requisitos.");
      return;
    }
    const priceData = [
      calculateFlightPrice(),
      calculateSightPrice(),
      calculateHotelPrice(),
      calculateGuidePrice(),
      calculateTransportPrice(),
      currentPrice,
    ];

    const extraFormData = currentForm;
    extraFormData.append("deal_id", deal ? tour[3].id : null);
    extraFormData.append("password", password);
    extraFormData.append("priceData", JSON.stringify(priceData));

    try {
      const response = await axios.post(
        `${Adress}api/setBooking`,
        extraFormData
      );

      if (response.data === "found") {
        alert("user already exists");
      } else {
        setShowBooking(false);
        setDisplayBookForm(true);
        e.target.reset();
        userDataForm.current?.reset();
        setShowSuccess(true);
        setShowSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
  };

  const deployPriceSection = (section) => {
    if (section == deployed) {
      setDeployed(null);
    } else {
      setDeployed(section);
    }
  };

  function calculateDiscount(amount, discountPercent) {
    const discount = (amount * discountPercent) / 100;
    return amount - discount;
  }

  function formatCurrency(value) {
    const fixed = Number(value).toFixed(2); // limita a 2 decimales
    return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const calculateFlightPrice = () => {
    let flightCost = 0;

    let flightData = tourInfo[2].map((item) => {
      flightCost = flightCost += item.ticket_price;
      return [item.ticket_price, item.airline.name];
    });
    let flightTotalCost = flightCost * guests;
    return [
      flightCost,
      deal
        ? calculateDiscount(flightTotalCost, tour[3].flight)
        : flightTotalCost,
      flightData,
    ];
  };

  const calculateSightPrice = () => {
    let sightCost = 0;
    tourInfo[3].map((item) => {
      sightCost = sightCost += item.sight_entrance_fees;
    });
    let sightTotalCost = sightCost * guests;
    return [
      sightCost,
      deal ? calculateDiscount(sightTotalCost, tour[3].sights) : sightTotalCost,
    ];
  };

  const calculateGuidePrice = () => {
    let guideTotalCost = 0;

    let guideData = tourInfo[0].map((item) => {
      let guideCost = item[0].guide_fees_per_day * item[1];
      guideTotalCost = guideTotalCost += guideCost;

      return [
        guideCost,
        item[1],
        item[0].guide_first_n + " " + item[0].guide_l_name,
        item[0].guide_fees_per_day,
      ];
    });
    return [
      guideData,
      deal ? calculateDiscount(guideTotalCost, tour[3].guides) : guideTotalCost,
    ];
  };

  //hotel logics

  const calculateHotelPrice = () => {
    let roomsNeeded = Math.ceil(guests / 2);
    let hotelstotal = 0;
    const hotelData = tourInfo[1].map((hotel) => {
      let total = hotel[0].doubleBd * roomsNeeded * hotel[1];
      hotelstotal = hotelstotal += total;

      return [hotel[1], roomsNeeded, total, hotel[0].hotel_name];
    });

    return [
      hotelData,
      deal ? calculateDiscount(hotelstotal, tour[3].hotels) : hotelstotal,
    ];
  };

  const calculateTransportPrice = () => {
    let transportTotal = 0;

    const transportData = tourInfo[4].map((item) => {
      let transportNeeded = Math.ceil(guests / item.max_persons);
      let total = item.cost * transportNeeded;
      transportTotal = transportTotal += total;
      return [transportNeeded, total, item.supplier];
    });
    return [
      transportData,
      deal
        ? calculateDiscount(transportTotal, tour[3].transport)
        : transportTotal,
    ];
  };

  return (
    <>
      <div
        className="bt-background"
        style={{ display: `${display ? "flex" : "none"}` }}
      >
        <button className="bt-close-btn" onClick={() => setShowBooking(false)}>
          ✕
        </button>
        <div className="bt-container">
          <h3 className="bt-tour-name">
            {processText("Book a tour:***Reservar un tour:")}{" "}
            {processText(tourData.gti_name)}
          </h3>
          <div className="bt-sections-container">
            {/* <div className="bt-section bt-left">
            {display ? "si se muestra" : "no se muestra"}
          </div> */}
            <div className="bt-section bt-right">
              <form
                method="POST"
                onSubmit={handleSubmit}
                style={{ display: `${displayBookForm ? "flex" : "none"}` }}
                ref={userDataForm}
              >
                <div className="switch-button">
                  <p className="bt-leader-question">
                    {processText(
                      "Are you a pastor or religious leader?***Es usted un pastor o lider religioso?"
                    )}
                  </p>
                  <input type="hidden" value={userType} name="userType" />
                  <input type="hidden" name="tour_id" value={tour[0].id} />
                  <div className="bt-switch-container">
                    <input
                      type="checkbox"
                      name="switch-button"
                      id="switch-label"
                      className="switch-button__checkbox"
                    />

                    <label
                      htmlFor="switch-label"
                      className="switch-button__label"
                      onClick={() => setUserType(!userType)}
                    ></label>
                    <p>{userType ? processText("Yes***Si") : "No"}</p>
                  </div>
                  <div className="bt-user-data-container">
                    <div className="bt-user-data-item">
                      <label htmlFor="country">
                        {processText(
                          "Select your country***Seleccione su pais"
                        )}
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        required
                      >
                        <option value="">
                          {processText("Select country***Seleccionar pais")}
                        </option>
                        {countries.map((country, idx) => (
                          <option key={idx} value={country.id}>
                            {processText(country.country_name)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bt-user-data-item">
                      <label>
                        {processText(
                          "Select an ariport***Selecciona un aeropuerto"
                        )}
                      </label>
                      <CountrySearchSelect
                        //onChange={(selected) => console.log(selected)}
                        country={selectedCountry}
                        options={options}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="name">
                        {processText("Name***Nombre")}{" "}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                        }}
                        placeholder={processText(
                          "Type your name***Escriba su nombre"
                        )}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="tl_m_name">
                        {processText("Middle name***Segundo nombre")}{" "}
                      </label>
                      <input
                        type="text"
                        id="tl_m_name"
                        name="tl_m_name"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                        }}
                        placeholder={processText(
                          "Type your middle name***Escribe tu segundo nombre"
                        )}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="last-name">
                        {processText("Last name***Apellidos")}{" "}
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last_name"
                        required
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                        }}
                        placeholder={processText(
                          "Type your last name***Escriba su apellido"
                        )}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="second_last_name">
                        {processText("Second Last name***Segundo Apellido")}{" "}
                      </label>
                      <input
                        type="text"
                        id="second_last_name"
                        name="second_last_name"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                        }}
                        placeholder={processText(
                          "Type your second last name***Escribe tu segundo apellido"
                        )}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="email">
                        {processText("Email adress***Correo electronico")}{" "}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={processText(
                          "Type your email***Escriba su correo electrónico"
                        )}
                        onChange={(e) => setUserMail(e.target.value)}
                      />
                    </div>
                    <div className="bt-user-data-item">
                      <label htmlFor="phone">
                        {processText("Phone number***Numero telefónico")}{" "}
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        required
                        placeholder={processText(
                          "Type your phone number***Escriba su numero telefonico"
                        )}
                      />
                    </div>
                    {userType ? (
                      <>
                        <div className="bt-user-data-item">
                          <label htmlFor="church-name">
                            {processText("Church Name***Nombre de su iglesia")}{" "}
                          </label>
                          <input
                            type="text"
                            id="church-name"
                            name="church_name"
                            placeholder={processText(
                              "Type the name of your church***Escriba el nombre de su iglesia"
                            )}
                            required
                          />
                        </div>
                        <div className="bt-user-data-item">
                          <label htmlFor="church-adress">
                            {processText(
                              "Church adress***dirección de su iglesia"
                            )}{" "}
                          </label>
                          <input
                            type="tel"
                            id="church-adress"
                            name="church_adress"
                            placeholder={processText(
                              "Type your church adress***Escriba la direccion de su iglesia"
                            )}
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="bt-user-data-item">
                      <label htmlFor="guests">
                        {processText(
                          "How many people will participate on the tour?***¿cuantas personas participaran en el tour?"
                        )}
                      </label>
                      <input
                        id="guests"
                        type="number"
                        name="guests"
                        min="0"
                        className="bt-guests"
                        placeholder={processText(
                          "Set how many passengers***Escriba cuantos pasageros"
                        )}
                        required
                      />
                    </div>
                    {!deal ? (
                      <div className="bt-user-data-item">
                        <label htmlFor="departure">
                          {processText(
                            "Set an aproximate departure date***coloque una fecha de salida aproximada"
                          )}
                        </label>
                        <input
                          id="departure"
                          type="date"
                          min={today}
                          name="departure"
                          className="departure"
                          required
                        />
                      </div>
                    ) : (
                      <div className="bt-user-data-item">
                        <label>
                          {processText("Departure Date***Fecha de salida")}
                        </label>
                        <input
                          readOnly
                          id="departure"
                          name="departure"
                          value={tour[3].expiration.split(" ")[0]}
                        />
                      </div>
                    )}
                  </div>
                  <p className="bt-warning">
                    *
                    {processText(
                      "The information provided is confidential and will not be shared, it will only be used for contact purposes.***la informacion proporcionada es confidencial y no sera compartida, solo sera usada para fines de contacto."
                    )}
                    *
                  </p>
                </div>

                <button type="submit" className="bt-form-submit-btn">
                  {processText("Get a quote***Obtener un presupuesto")}
                </button>
              </form>
              <div
                className="bt-resume-container"
                style={{ display: `${displayBookForm ? "none" : "flex"}` }}
              >
                <button
                  className="bt-back-btn"
                  onClick={() => setDisplayBookForm(true)}
                >
                  ⮜{processText("Go back***Volver")}
                </button>

                <h5 className="bt-total-cost-title">
                  {processText("Total Costs***Costos totales")}
                </h5>
                <p className="bt-total-cost-passengers">
                  {processText("Passengers***Pasajeros")} <span>{guests}</span>
                </p>
                {tourInfo != null ? (
                  <div>
                    <div className="bt-section-container">
                      <div className="bt-section-deploy">
                        <h6 onClick={() => deployPriceSection(1)}>
                          <span>
                            {processText("Deploy Flights***Desplegar Vuelos")}
                            <FaPlane size={24} />
                          </span>
                          <IoIosArrowDown
                            size={24}
                            style={{
                              transform:
                                deployed == 1
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        </h6>
                        <div
                          className="bt-flights-section-container bt-dropdown-section"
                          style={deployed == 1 ? show : hide}
                        >
                          {tourInfo[2].map((item, index) => {
                            return (
                              <div className="bt-flight-container" key={index}>
                                <h5 className="bt-flight-position">
                                  {processText(
                                    `flight ${index + 1}*** Vuelo ${index + 1}`
                                  )}
                                </h5>
                                <div className="bt-flight-route">
                                  <p>{processText(item.city_of_depart)}</p>
                                  <img
                                    src={fligthRoute}
                                    alt="image route icon"
                                  />
                                  <p>{processText(item.city_of_arrival)}</p>
                                </div>
                                <div className="bt-airline-data-container">
                                  <img
                                    src={`${Adress}uploads/supplier-profile/${item.airline.image}`}
                                  />
                                  <div className="bt-airline-data">
                                    <div>
                                      <p>
                                        <FaPlane fill="var(--primary-color)" />{" "}
                                        {processText(
                                          "Airline name***Nombre de la aerolinea"
                                        )}
                                      </p>
                                      <p>{item.airline.name}</p>
                                    </div>
                                    <div>
                                      <p>
                                        <MdEmail fill="var(--primary-color)" />{" "}
                                        {processText(
                                          "email adress***correo electrónico"
                                        )}
                                      </p>
                                      <p>{item.airline.email}</p>
                                    </div>
                                    <div>
                                      <p>
                                        <FaPhoneAlt fill="var(--primary-color)" />{" "}
                                        {processText(
                                          "Phone number***Número de teléfono"
                                        )}
                                      </p>
                                      <p>{item.airline.phone}</p>
                                    </div>
                                    {/* <div>
                                      <p>
                                        <IoTicket fill="var(--primary-color)" />{" "}
                                        {processText(
                                          "Ticket Price***Precio del boleto"
                                        )}
                                      </p>
                                      <p>{item.ticket_price} $</p>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {/* <div className="bt-flight-price-container">
                            <p className="bt-price-title">
                              {processText(
                                "Flight price resume***Precios total de los vuelos"
                              )}
                            </p>
                            {calculateFlightPrice()[2].map((item, index) => {
                              return (
                                <div className="bt-flight-price" key={index}>
                                  <p>
                                    {processText("Flight***Vuelo")} {index + 1}
                                  </p>
                                  <div className="bt-flight-price-data">
                                    <p>
                                      {processText("Airline***Aerolinea")}{" "}
                                      <br /> {item[1]}
                                    </p>
                                    <p></p>
                                    <p>
                                      {processText("Price***Precio")} <br />{" "}
                                      {item[0]
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      $
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="bt-flight-total">
                              <div>
                                <p>
                                  {processText(
                                    "Flight Individual total price***Precio total individual de los vuelos"
                                  )}
                                </p>
                                <p></p>
                                <p>
                                  {calculateFlightPrice()[0]
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  $
                                </p>
                              </div>
                              <div>
                                <p>
                                  {processText(
                                    "Flight Total Price***Precio completo de los vuelos"
                                  )}
                                </p>
                                <p></p>
                                <p>
                                  {calculateFlightPrice()[1]
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                  $
                                </p>
                              </div>
                              {deal ? (
                                <Discount
                                  amount={
                                    tour[3].flight > 0 ? tour[3].flight : null
                                  }
                                />
                              ) : null}
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="bt-section-deploy">
                        <h6 onClick={() => deployPriceSection(2)}>
                          <span>
                            {processText("Deploy sights***Desplegar Lugares")}{" "}
                            <IoTelescope size={24} />
                          </span>
                          <IoIosArrowDown
                            size={24}
                            style={{
                              transform:
                                deployed == 2
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        </h6>
                        <div
                          className="bt-sights-container bt-dropdown-section"
                          style={deployed == 2 ? show : hide}
                        >
                          {tourInfo[3].map((item, index) => {
                            return (
                              <div className="bt-sights-data" key={index}>
                                <div>
                                  <p>
                                    <FaMonument fill="var(--primary-color)" />
                                    {processText("Sight***Lugar")}
                                  </p>
                                  <p>{item.sight_name}</p>
                                </div>
                                <div>
                                  <p>
                                    <FaMapLocationDot fill="var(--primary-color)" />
                                    {processText("Location***Ubicación")}{" "}
                                  </p>
                                  <p>
                                    {processText(item.city_id)},{" "}
                                    {processText(item.country_id)}
                                  </p>
                                </div>
                                {/* <div>
                                  <p>
                                    <IoTicket fill="var(--primary-color)" />
                                    {processText(
                                      "Entrance fees per person***Precio de entrada por persona"
                                    )}
                                  </p>
                                  <p>
                                    {item.sight_entrance_fees == 0
                                      ? processText("Free ***Gratis")
                                      : item.sight_entrance_fees + " $"}{" "}
                                  </p>
                                </div> */}
                              </div>
                            );
                          })}
                          {/* <div className="bt-sight-total">
                            <p className="bt-price-title">
                              {processText(
                                "Sight price resume***Precios total de los Lugares"
                              )}
                            </p>
                            <div>
                              <p>
                                {processText(
                                  "sight Individual total price***Precio total individual de los lugares"
                                )}
                              </p>
                              <p></p>
                              <p>{calculateSightPrice()[0]} $</p>
                            </div>
                            <div>
                              <p>
                                {processText("Total price***precio completo")}
                              </p>
                              <p></p>
                              <p>{calculateSightPrice()[1]} $</p>
                            </div>
                            <div className="bt-sight-amount">
                              {deal ? (
                                <Discount
                                  amount={
                                    tour[3].sights > 0 ? tour[3].sights : null
                                  }
                                />
                              ) : null}
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="bt-section-deploy">
                        <h6 onClick={() => deployPriceSection(3)}>
                          <span>
                            {processText("Deploy Guides***Desplegar Guias")}
                            <FaPersonChalkboard size={24} />
                          </span>
                          <IoIosArrowDown
                            size={24}
                            style={{
                              transform:
                                deployed == 3
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        </h6>
                        <div
                          className="bt-guides-container bt-dropdown-section"
                          style={deployed == 3 ? show : hide}
                        >
                          {tourInfo[0].map((item, index) => {
                            return (
                              <div className="bt-guides-data" key={index}>
                                <div>
                                  <p>
                                    <BsFileEarmarkPersonFill fill="var(--primary-color)" />
                                    {processText(
                                      "Guide name***Nombre del guia"
                                    )}
                                  </p>
                                  <p>
                                    {item[0].guide_first_n}{" "}
                                    {item[0].guide_l_name}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <MdPersonPinCircle
                                      size="20px"
                                      fill="var(--primary-color)"
                                    />
                                    {processText(
                                      "Guide Location***Ubicación del guía"
                                    )}
                                  </p>
                                  <p>
                                    {processText(item[0].guide_city)},{" "}
                                    {processText(item[0].guide_country)}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <MdEmail fill="var(--primary-color)" />
                                    {processText("email***email")}
                                  </p>
                                  <p>{item[0].guide_email}</p>
                                </div>
                                <div>
                                  <p>
                                    <GiReceiveMoney fill="var(--primary-color)" />
                                    {processText(
                                      "Days required***Dias requeridos"
                                    )}
                                  </p>
                                  <p className="bt-align-center">{item[1]}</p>
                                </div>
                              </div>
                            );
                          })}
                          {/* <div className="bt-guide-price-container">
                            <div>
                              <p className="bt-price-title">
                                {processText(
                                  "Guides price resume***Precios total de los Guias"
                                )}
                              </p>
                              {calculateGuidePrice()[0].map((item, index) => {
                                return (
                                  <div className="bt-guide-price" key={index}>
                                    <div className="bt-guide-data-container">
                                      <div>
                                        <p>
                                          {processText("Guide***Guia")}{" "}
                                          {index + 1}
                                        </p>
                                        <p>{item[2]}</p>
                                      </div>
                                      <div>
                                        <p>
                                          {processText(
                                            "cost per day***Costo por dia"
                                          )}
                                        </p>
                                        <p>{item[3]} $</p>
                                      </div>
                                      <div>
                                        <p>
                                          {processText(
                                            "days required***Dias requeridos"
                                          )}
                                          :
                                        </p>
                                        <p>{item[1]}</p>
                                      </div>
                                    </div>
                                    <div className="bt-guide-total">
                                      <p>
                                        {processText(
                                          "Total cost***Costo total"
                                        )}
                                      </p>
                                      <p></p>
                                      <p>{item[0]} $</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="bt-guides-total">
                              <p>
                                {processText(
                                  "guides Total Price***Precio Total de los guias"
                                )}
                              </p>
                              <p></p>
                              <p>{calculateGuidePrice()[1]} $</p>
                            </div>
                            <br />
                            {deal ? (
                              <Discount
                                amount={
                                  tour[3].guides > 0 ? tour[3].guides : null
                                }
                              />
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                      <div className="bt-section-deploy">
                        <h6 onClick={() => deployPriceSection(4)}>
                          <span>
                            {processText("Deploy Hotels***Desplegar Hoteles")}
                            <MdLocalHotel size={24} />
                          </span>
                          <IoIosArrowDown
                            size={24}
                            style={{
                              transform:
                                deployed == 4
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        </h6>
                        <div
                          className="bt-hotels-container bt-dropdown-section"
                          style={deployed == 4 ? show : hide}
                        >
                          {tourInfo[1].map((item, index) => {
                            return (
                              <div className="bt-hotels-data" key={index}>
                                <div>
                                  <p>
                                    <FaSignHanging fill="var(--primary-color)" />
                                    {processText(
                                      "Hotel name***Nombre del hotel"
                                    )}
                                  </p>
                                  <p>{processText(item[0].hotel_name)}</p>
                                </div>
                                <div>
                                  <p>
                                    <FaMapLocationDot fill="var(--primary-color)" />
                                    {processText(
                                      "Hotel Location***Ubicacion del hotel"
                                    )}
                                  </p>
                                  <p>
                                    {processText(item[0].hotel_city)},{" "}
                                    {processText(item[0].hotel_country)}.
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <MdEmail fill="var(--primary-color)" />
                                    {processText(
                                      "Hotel email***Correo del hotel"
                                    )}
                                  </p>
                                  <p>{processText(item[0].hotel_email)}</p>
                                </div>
                                <div>
                                  <p>
                                    <FaMoneyBillTransfer fill="var(--primary-color)" />
                                    {processText(
                                      "Days at this hotel***Dias en este hotel"
                                    )}
                                  </p>
                                  <p className="bt-align-center">{item[1]}</p>
                                </div>
                              </div>
                            );
                          })}
                          {/* <div className="bt-guide-price-container">
                            <p className="bt-price-title">
                              {processText(
                                "Hotels price resume***Precios total de los hoteles"
                              )}
                            </p>
                            {calculateHotelPrice()[0].map((item, index) => {
                              return (
                                <div className="bt-guide-price" key={index}>
                                  <div className="bt-guide-data-container">
                                    <div>
                                      <p>
                                        {processText(
                                          "Hotel name***Nombre de hotel"
                                        )}
                                      </p>
                                      <p>{item[3]}</p>
                                    </div>
                                    <div>
                                      <p>
                                        {processText(
                                          "Days at hotel***Dias en el hotel"
                                        )}
                                      </p>
                                      <p>{item[0]}</p>
                                    </div>
                                    <div>
                                      <p>
                                        {processText(
                                          "Rooms needed***Habitaciones Requeridas"
                                        )}
                                      </p>
                                      <p>{item[1]}</p>
                                    </div>
                                  </div>
                                  <div className="bt-guide-total">
                                    <p>
                                      {processText(
                                        "Hotel total cost***Costo total del hotel"
                                      )}
                                    </p>
                                    <p></p>
                                    <p>{item[2]} $</p>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="bt-guides-total">
                              <p>
                                {processText(
                                  "Hotels total price***Precio Total de los hoteles"
                                )}
                              </p>
                              <p></p>
                              <p>{calculateHotelPrice()[1]} $</p>
                            </div>
                            <br />
                            {deal ? (
                              <Discount
                                amount={
                                  tour[3].hotels > 0 ? tour[3].hotels : null
                                }
                              />
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                      <div className="bt-section-deploy">
                        <h6 onClick={() => deployPriceSection(5)}>
                          <span>
                            {processText(
                              "Deploy Transport***Desplegar Transportes"
                            )}
                            <FaCarSide size={24} />
                          </span>
                          <IoIosArrowDown
                            size={24}
                            style={{
                              transform:
                                deployed == 4
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        </h6>
                        <div
                          className="bt-transport-container bt-dropdown-section"
                          style={deployed == 5 ? show : hide}
                        >
                          {tourInfo[4].map((item, index) => {
                            return (
                              <div className="bt-transport-data" key={index}>
                                <div>
                                  <p>
                                    <FaRoute fill="var(--primary-color)" />
                                    {processText("Route***Ruta")}
                                  </p>
                                  <p>{processText(item.route_name)}</p>
                                </div>
                                <div>
                                  <p>
                                    <FaClipboardList fill="var(--primary-color)" />
                                    {processText("Supplier***Proveedor")}
                                  </p>
                                  <p>
                                    {processText(item.transport_supplier.name)}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <FaMapLocationDot fill="var(--primary-color)" />
                                    {processText(
                                      "Supplier Location***Ubicación del proveedor"
                                    )}
                                  </p>
                                  <p>
                                    {processText(item.transport_supplier.city)},{" "}
                                    {processText(
                                      item.transport_supplier.country
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <MdEmail fill="var(--primary-color)" />
                                    Email
                                  </p>
                                  <p>
                                    {processText(item.transport_supplier.email)}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    <FaMoneyBillTransfer fill="var(--primary-color)" />
                                    {processText(
                                      "Maximum passengers per service***Pasajeros por servicio"
                                    )}
                                  </p>
                                  <p className="bt-align-center">
                                    {item.max_persons}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          {/* <div className="bt-guide-price-container">
                            <p className="bt-price-title">
                              {processText(
                                "Transport price resume***Precios total de los Transportes"
                              )}
                            </p>
                            {calculateTransortPrice()[0].map((item, index) => {
                              return (
                                <div className="bt-guide-price" key={index}>
                                  <div className="bt-guide-data-container">
                                    <div>
                                      <p>{processText("Route***Ruta")}</p>{" "}
                                      <p>{index + 1}</p>
                                    </div>
                                    <div>
                                      <p>
                                        {processText("Supplier***Proveedor")}
                                      </p>{" "}
                                      <p>{item[2]}</p>
                                    </div>
                                    <div>
                                      <p>
                                        {processText(
                                          "Transports requires***Transportes Requeridos"
                                        )}
                                      </p>{" "}
                                      <p>{item[0]}</p>
                                    </div>
                                  </div>
                                  <div className="bt-guide-total">
                                    <p>Total</p>
                                    <p></p>
                                    <p>{item[1]} $</p>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="bt-guides-total">
                              <p>
                                {processText(
                                  "transport total price***Precio Total de los transportes"
                                )}
                              </p>
                              <p></p>
                              <p>{calculateTransortPrice()[1]} $</p>
                            </div>
                            <br />
                            {deal ? (
                              <Discount
                                amount={
                                  tour[3].transport > 0
                                    ? tour[3].transport
                                    : null
                                }
                              />
                            ) : null}
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="bt-costs-container">
                      {/* <div className="bt-administrative-cost">
                        <p>
                          {processText(
                            "Administrative and management fees***Costos administrativos"
                          )}
                        </p>
                        <p></p>
                        <p>
                          {userType
                            ? deal
                              ? formatCurrency(
                                  calculateDiscount(
                                    tourData.tour_price_pastors,
                                    tour[3].leader_cost
                                  )
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : tourData.tour_price_pastors
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : deal
                            ? formatCurrency(
                                calculateDiscount(
                                  tourData.tour_price,
                                  tour[3].general_cost
                                )
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : tourData.tour_price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          / person
                        </p>
                      </div> */}
                      {/* {deal ? (
                        userType ? (
                          <Discount
                            amount={
                              tour[3].leader_cost > 0
                                ? tour[3].leader_cost
                                : null
                            }
                          />
                        ) : (
                          <Discount
                            amount={
                              tour[3].general_cost > 0
                                ? tour[3].general_cost
                                : null
                            }
                          />
                        )
                      ) : null} */}
                      <div className="bt-administrative-cost">
                        <p>
                          {processText(
                            "Tour total price***Costo total del tour"
                          )}{" "}
                        </p>
                        <p></p>
                        <p className="bt-total-price">
                          {formatCurrency(
                            (calculateFlightPrice()[1] +
                              calculateSightPrice()[1] +
                              calculateHotelPrice()[1] +
                              calculateGuidePrice()[1] +
                              calculateTransportPrice()[1] +
                              currentPrice * guests) / guests / 3 * 4
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          $ / person
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => setShowSubmit(true)}
                  style={{ display: `${showSubmit ? "none" : "flex"}` }}
                  className="bt-continue-reservation"
                >
                  {processText(
                    "CONTINUE WITH RESERVATION***CONTINUAR CON LA RESERVACIÓN"
                  )}
                </button>
                {showSubmit ? (
                  <form className="bt-password-form" onSubmit={handleSetSubmit}>
                    <p>
                      Email: <span>{userMail}</span>
                    </p>
                    <div className="bt-password-section">
                      <div>
                        <label htmlFor="bt-password">
                          {processText("Password***Contraseña")}
                        </label>
                        <input
                          id="bt-password"
                          type="password"
                          placeholder={processText(
                            "Set a password***Crea una contraseña"
                          )}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="bt-repeat-password">
                          {processText(
                            "Repeat password***Repite la contraseña"
                          )}
                        </label>
                        <input
                          id="bt-repeat-password"
                          type="password"
                          placeholder={processText(
                            "Repeat password***Repite la contraseña"
                          )}
                          onChange={(e) => setPasswordAgain(e.target.value)}
                        />
                      </div>
                    </div>

                    <PasswordChecklist
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                      ]}
                      className="bt-password-checklist"
                      minLength={5}
                      value={password}
                      valueAgain={passwordAgain}
                      onChange={setIsPasswordValid}
                    />
                    <button className="bt-submit-info-final" type="submit">
                      {processText("Send info***Enviar info")}
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bt-success-background"
        style={{ display: `${showSuccess ? "flex" : "none"}` }}
        onClick={() => setShowSuccess(false)}
      >
        <div className="bt-success-modal">
          <p>
            {processText(
              "User created successfully***usuario creado con exito"
            )}
          </p>
          <button onClick={() => setShowSuccess(false)}>
            {processText("Close***Cerrar")}
          </button>
        </div>
      </div>
    </>
  );
};
