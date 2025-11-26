import { useState, useEffect } from "react";
import "../styles/hotel-card.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import GoogleMapIframe from "./AddressMap";
import { Adress } from "../functions/Variables";
import { useLanguage } from "../modules/LanguageContext";

function HotelCard({ hotelData = [] }) {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    if (hotelData.length > 0) {
      setSelectedHotel(hotelData[0]);
    }
  }, [hotelData]);

  const correctIframe = (text) => {
    if (text) {
      let texto = text.replace(/height="450"/g, "");
      texto = texto.replace(/width="600" /g, "");
      texto = texto.replace(/style="border:0;"/g, "");
      texto = texto.replace(/allowfullscreen=""/g, "");
      texto = texto.replace(
        /referrerpolicy="no-referrer-when-downgrade"/g,
        'referrerPolicy="no-referrer-when-downgrade"'
      );
      return texto;
    }
    return "";
  };

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    setDropdownOpen(false);
  };

  if (!selectedHotel) return <p>No hotel data available.</p>;

  return (
    <div className="hic-hotel-info-container">
      <div className="hic-button-section">
        {hotelData.map((hotel) => (
          <button
            key={hotel.id}
            onClick={() => setSelectedHotel(hotel)}
            className={`hic-hotel-button ${
              selectedHotel.id === hotel.id ? "hic-active" : ""
            }`}
          >
            {processText(hotel.hotel_city)}
          </button>
        ))}
      </div>

      <div className="hic-dropdown-container">
        <button
          className="hic-dropdown-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {processText(selectedHotel.hotel_city)} ▼
        </button>
        {dropdownOpen && (
          <ul className="hic-dropdown-menu">
            {hotelData.map((hotel) => (
              <li
                key={hotel.id}
                onClick={() => handleSelect(hotel)}
                className={`hic-dropdown-item ${
                  selectedHotel.id === hotel.id ? "hic-active" : ""
                }`}
              >
                {processText(hotel.hotel_city)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hic-display-section">
        <div className="hic-left-section">
          <img
            src={Adress + "uploads/hotel-profile/" + selectedHotel.image}
            alt={selectedHotel.hotel_name}
            className="hic-hotel-image"
          />
          <div
            className="iframe-container"
            dangerouslySetInnerHTML={{
              __html: correctIframe(selectedHotel.hotel_map),
            }}
            style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
          />
        </div>

        {/* Right Section: Hotel Info */}
        <div className="hic-right-section">
          <h4>{processText(selectedHotel.hotel_name)}</h4>
          <p className="hic-adress">
            <FaMapLocationDot /> {processText(selectedHotel.hotel_address)}
          </p>
          <p className="hic-phone">
            <FaPhoneAlt /> {processText(selectedHotel.hotel_phone)}
          </p>
          <p className="hic-email">
            <MdEmail /> {processText(selectedHotel.hotel_email)}
          </p>
          <div className="hic-description-container">
            <p className="hic-description">
              {processText(selectedHotel.description)}
            </p>
            <div className="hic-hotel-features">
              {selectedHotel.hotel_features !== null ? (
                <>
                  <h5>
                    <IoIosArrowForward size={28} fill="var(--primary-color)" />
                    {processText("Hotel Amenities***Características del Hotel")}
                  </h5>
                  <div>
                    {processText(selectedHotel.hotel_features)
                      .split(",")
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="hic-hotel-features">
              {selectedHotel.room_features !== null ? (
                <>
                  <h5>
                    {" "}
                    <IoIosArrowForward size={28} fill="var(--primary-color)" />
                    {processText(
                      "Room Features***Características de la habitación"
                    )}
                  </h5>
                  <div>
                    {processText(selectedHotel.room_features)
                      .split(",")
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
