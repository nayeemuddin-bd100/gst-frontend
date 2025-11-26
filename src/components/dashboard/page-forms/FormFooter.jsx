import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePageData } from "../../../modules/PageDataContext";
import ProcessText from "../../../functions/LanguageSorter";

const FormFooter = () => {
  const { footerData, setFooterData } = usePageData();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1 */}
        <div className="footer-column">
   
            <img className="" src={footerData.logo} />
           <div style={{marginTop : "10px"}}>
            <span style={{fontSize : "0.7rem", color : "#fff"}}>File Path : </span>
             <input onChange={(e) => setFooterData(prev => ({...prev, logo : e.target.value}))} type="text" className="input-field" style={{width : "90px", color : "#fff", margin : "0 5px"}} value={footerData.logo} />
           </div>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <Link className="footer-links" to={"/"}>
            {ProcessText("Home***Inicio")}
          </Link>
          <Link className="footer-links" to={"/explore-tours"}>
            Tours
          </Link>
          <Link className="footer-links" to={"/small-groups"}>
            {ProcessText("small groups***Grupos pequeños")}
          </Link>
          <Link className="footer-links" to={"/solo-travel"}>
            {ProcessText("solo travel***Viajes en solitario")}
          </Link>
        </div>

        {/* Columna 3 */}
        <div className="footer-column">
          <Link className="footer-links" to={"/tech-on-tours"}>
            {ProcessText("tech on tours***Tecnología en los tours")}
          </Link>
          <Link className="footer-links" to={"/videos"}>
            {ProcessText("video gallery***Galería de video")}
          </Link>
          <Link className="footer-links" to={"/reviews"}>
            {ProcessText("Reviews and testimonials***Opiniones y testimonios")}
          </Link>
          <Link className="footer-links" to={"/why-gst"}>
            {ProcessText("about us***sobre nosotros")}
          </Link>
        </div>

        {/* Columna 4 */}
        <div className="footer-column">
          <h5>{ProcessText("have a question?***Tienes alguna pregunta?")}</h5>
          <input type="text" onChange={(e) => setFooterData(prev => ({...prev, phone : e.target.value}))} className="input-field footer-phone d-footer-phone" value={footerData.phone} />

          <ul className="wrapper">
            <li className="icon d-f-icon">
              <a href={footerData.links.facebook}>
                <FaFacebook size={24} />
              </a>
            </li>
            <li className="icon d-f-icon">
              <a href={footerData.links.instagram}>
                <FaInstagram size={24} />
              </a>
             
            </li>
            <li className="icon d-f-icon">
              <a href={footerData.links.youtube} target="_blank">
                <FaYoutube size={24} />
              </a>
              
            </li>
            <li className="icon d-f-icon">
              <a href={footerData.links.tiktok}>
                <FaTiktok size={24} />
              </a>
              
            </li>
          </ul>
          <div>
            <input
              type="text"
              value={footerData.links.facebook}
              placeholder="facebook"
              onChange={(e) =>
                setFooterData((prev) => ({
                  ...prev,
                  links: { ...prev.links, facebook: e.target.value },
                }))
              }
            />
             <input
                type="text"
                value={footerData.links.instagram}
                placeholder="instagram"
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    links: { ...prev.links, instagram: e.target.value },
                  }))
                }
              />
                            <input
                type="text"
                value={footerData.links.youtube}
                placeholder="youtube"
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    links: { ...prev.links, youtube: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                value={footerData.links.tiktok}
                placeholder="tiktok"
                onChange={(e) =>
                  setFooterData((prev) => ({
                    ...prev,
                    links: { ...prev.links, tiktok: e.target.value },
                  }))
                }
              />

          </div>
        </div>
      </div>
    </footer>
  );
};

export default FormFooter;
