import React from "react";
import "../styles/travel-types.css";
import { Link } from "react-router-dom";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "./PageDataContext";

function TravelTypes() {
 const {homePageData} = usePageData() 
  // const items = [
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/a35ace82c7e74485a5bc5d28f628fd12?v=4ea8ee99&t=w500",
  //     url: "/why-gst",
  //     title: ProcessText("about us***Sobre nosotros"),
  //   },
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/f825f15188244274b96306884e595d2c?v=6a75a77c&t=w500",
  //     url: "/private-touring",
  //     title: ProcessText("Private Touring***Tours Privados"),
  //   },
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/d214554c9e3348a58c0acbb3e608384e?v=0c8c38be&t=w500",
  //     url: "/small-groups",
  //     title: ProcessText("Small Group Departures***Salidas de grupos pequeños"),
  //   },
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/4e44308aa9fa4d5e85e49baa84dc304d?v=6eec1a01&t=w500",
  //     url: "/solo-travel",
  //     title: ProcessText("Solo Travel***Viaje en solitario"),
  //   },
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/e2fe2775649c48bba709cc6c10bf721f?v=7544b614&t=w500",
  //     url: "/videos",
  //     title: ProcessText("video gallery***Galeria de video"),
  //   },
  //   {
  //     background:
  //       "https://delivery.gfobcontent.com/api/public/content/e4c5c3f89433468c9f67c3fffb3a1b6b?v=2a933371&t=w500",
  //     url: "/tech-on-tours",
  //     title: ProcessText("Religious Tours***Tours religiosos"),
  //   },
  // ];

  const items = homePageData.travelTypes;

  return (
    <div className="tt-flex-container">
      {items.map((item, index) => (
        <div className="tt-items-container" key={index}>
          <div className="tt-item-background" style={{ backgroundImage: `url(${item.background})` }}></div>
          <Link to={item.url} className="tt-flex-item">
            <h4>{ProcessText(item.title)}</h4>
            <hr/>
            <p>{ProcessText("Learn More***Conocer Más")}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TravelTypes;
