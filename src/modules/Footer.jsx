import React from "react";
import "../styles/footer.css"; // Asegúrate de importar el archivo CSS
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProcessText from "../functions/LanguageSorter";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1 */}
        <div className="footer-column">
        <Link to={"/"}><img src="/logo1.png" /></Link>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <Link className="footer-links" to={"/"}>{ProcessText("Home***Inicio")}</Link>
          <Link className="footer-links" to={"/explore-tours"}>Tours</Link>
          <Link className="footer-links" to={"/small-groups"}>{ProcessText("small groups***Grupos pequeños")}</Link>
          <Link className="footer-links" to={"/solo-travel"}>{ProcessText("solo travel***Viajes en solitario")}</Link>
        </div>

        {/* Columna 3 */}
        <div className="footer-column">
        <Link className="footer-links" to={"/tech-on-tours"}>{ProcessText("tech on tours***Tecnología en los tours")}</Link>
          <Link className="footer-links" to={"/videos"}>{ProcessText("video gallery***Galería de video")}</Link>
          <Link className="footer-links" to={"/reviews"}>{ProcessText("Reviews and testimonials***Opiniones y testimonios")}</Link>
          <Link className="footer-links" to={"/why-gst"}>{ProcessText("about us***sobre nosotros")}</Link>
        </div>

        {/* Columna 4 */}
        <div className="footer-column">
          <h5>{ProcessText("have a question?***Tienes alguna pregunta?")}</h5>
          <a className="footer-phone" href="tel:+123456789">123.456.789</a>
          <ul className="wrapper">
            <li className="icon">
              <a href="">
                <FaFacebook size={24} />
              </a>
            </li>
            <li className="icon">
              <a href="">
                <FaInstagram size={24} />
              </a>
            </li>
            <li className="icon">
              <a href="">
                <FaYoutube size={24} />
              </a>
            </li>
            <li className="icon">
              <a href="">
                <FaTiktok size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
