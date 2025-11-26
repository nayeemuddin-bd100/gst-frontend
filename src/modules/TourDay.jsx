import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import "../styles/tour-day.css";
import { useLanguage } from "./LanguageContext";

function ImageComponent({ imageUrl }) {
  const [isValid, setIsValid] = useState(true);

  return (
    <div>
      {isValid && (
        <img
          src={imageUrl}
          alt="landscape"
          onError={() => setIsValid(false)}
          style={{
            aspectRatio: "16 / 9",
            width: "100%",
            overflow: "hidden !important",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
    </div>
  );
}

function CollapsibleSections({ data }) {
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDaySection = (dayIndex) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayIndex]: !prev[dayIndex],
    }));
  };

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
    <div className="day-main-container">
      <h2 className="itinerary-title">
        {processText("Itinerary***Itinerario")}
      </h2>
      <p className="dbd">
        {processText("Day***Dia")} <span>{processText("by *** Por")}</span>{" "}
        {processText("day ***dia")}
      </p>
      {data.map((dayData, dayIndex) => (
        <div key={dayIndex} className="day-container">
          <button
            className="toggle-day-button"
            onClick={() => toggleDaySection(dayIndex)}
          >
            {expandedDays[dayIndex] ? (
              <div>
                {processText("Day***Dia")} {dayIndex + 1}{" "}
                <IoIosArrowDown size={32} fill="var(--primary-color)" />
              </div>
            ) : (
              <div>
                {processText("Day***Dia")} {dayIndex + 1}{" "}
                <IoIosArrowUp size={32} fill="var(--primary-color)" />
              </div>
            )}
          </button>

          {expandedDays[dayIndex] && (
            <div className="day-content">
              {dayData.map((activity, activityIndex) => (
                <div key={activityIndex} className="activity-item">
                  <h3>
                    <IoIosArrowForward size={28} fill="var(--primary-color)" />
                    {processText(activity.title)}
                    <br></br>
                    {processText(activity.city)},{" "}
                    {processText(activity.country)}
                  </h3>
                  <div className="td-activity-container">
                    {activity.image ? (
                      activity.image.includes("drive.google.com") ? (
                        <iframe
                          src={activity.image}
                          title={`Sight ${activityIndex + 1}`}
                          style={{
                            aspectRatio: "16 / 9",
                            width: "100%",
                            maxWidth: "30rem",
                            overflow: "hidden !important",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          frameBorder="0"
                          scrolling="no"
                        ></iframe>
                      ) : (
                        <ImageComponent imageUrl={activity.image} />
                      )
                    ) : null}
                    <div>
                      {processText(activity.description)
                        .split("\n")
                        .map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CollapsibleSections;
