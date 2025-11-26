import React from "react";
import "../styles/header-section.css";
import ProcessText from "../functions/LanguageSorter";

const HeaderSection = ({
  image = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg",
  title = "title ",
  subtitle = "subtitle",
  description = "description",
  children,
}) => {
  return (
    <>
      <header className="hs-container">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="hs-background"
        ></div>
      </header>
      {children ? (
        <div className="hs-text-container">
        <h1>{ProcessText(title)}</h1>
          {children}
        </div>
      ) : (
        <div className="hs-text-container">
          <h1>{ProcessText(title)} </h1>
          <div className="hs-text">
            <h2>{ProcessText(subtitle)}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{ProcessText(description)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderSection;
