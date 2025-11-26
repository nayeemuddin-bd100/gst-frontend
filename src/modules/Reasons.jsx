import React from "react";
import { GiAlienFire } from "react-icons/gi";
import "../styles/reasons-section.css"; // Asegúrate de importar el archivo CSS
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { usePageData } from "./PageDataContext";

function ReasonsSection() {

  const {homePageData} = usePageData()

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

  // const items = [
  //   {
  //     imgSrc:
  //       "https://imgs.search.brave.com/K0BK5EWgF5wPXP6mQTgCP73e9EffLAfDWBjqnb_G9Og/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE2LzA0LzY3/LzM2MF9GXzIxNjA0/Njc5OV8yREJ4RXcy/ZEVxYWVGaXQ1bkZr/RjRZajlIWE1iaHIy/Wi5qcGc",
  //     title: processText("Transportation***Transporte"),
  //     text: processText("By trains, cable-cars, cruise ships, scenic ferries, or private first-class motorcoaches (most with free Wi-Fi and other services), Cosmos makes getting there half the fun. After all, isn't the journey part of the destination?***En trenes, teleféricos, cruceros, transbordadores escénicos o autocares privados de primera clase (la mayoría con Wi-Fi gratuito y otros servicios), Cosmos hace que llegar sea la mitad de la diversión. Después de todo, ¿no es el viaje parte del destino? ")
  //   },
  //   {
  //     imgSrc:
  //       "https://imgs.search.brave.com/uXRjfw9p8hkoSoc7EDdBmJFrXKOjZ6PyvZv1mnyIBIY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y2l0eS1zaWdodHNl/ZWluZy5pdC9Qcm9k/dWN0Lzc4Ni9kNjQ0/ZGE0NS1jZGQwLTQ4/MDItOGI3Yy1jM2Mw/YTRmNjgxYjcuanBn",
  //     title: processText("Sightseeing***Turismo"),
  //     text: processText("Our packages include guided sightseeing and scenic highlights that reveal the best of your destination. Enjoy inside visits of the must-see sites with knowledgeable Local Guides who will bring each destination to life.***Nuestros paquetes incluyen visitas guiadas y aspectos destacados escénicos que revelan lo mejor de su destino. Disfrute de las visitas internas de los sitios imperdibles con Guías Locales expertos que darán vida a cada destino."),
  //   },
  //   {
  //     imgSrc:
  //       "https://s3.eu-west-2.amazonaws.com/staticgh.gentinghotel.co.uk/uploads/hero/SuiteNov2022_0008_1920.jpg",
  //     title: processText("Accommodations***Hospedajes"),
  //     text:processText( "After a day of traveling you want to relax at a comfortable, clean, and attractive hotel. We select hotels with the best guestrooms (always with a private bathroom), service, and food for the money. See individual itinerary pages for hotels.***Después de un día de viaje, desea relajarse en un hotel cómodo, limpio y atractivo. Seleccionamos hoteles con las mejores habitaciones (siempre con baño privado), servicio y comida por el dinero. Ver páginas de itinerarios individuales para hoteles"),
  //   },
  //   {
  //     imgSrc:
  //       "https://media.istockphoto.com/id/1081422898/es/foto/pan-frito-pato.jpg?s=612x612&w=0&k=20&c=EkLPXE34WLsjVb1_GH1d2vz8FLv222xLugXJBzUc8xc=",
  //     title: processText("Meals***Comidas"),
  //     text: processText("When it comes to meals, Good Shepherd tours strikes a perfect balance. We include some meals to save you time and money, yet we also leave enough free time so you can sample gastronomic delights on your own way.***Cuando se trata de comidas, Good Shepherd tours logra un equilibrio perfecto. Incluimos algunas comidas para ahorrarle tiempo y dinero, pero también dejamos suficiente tiempo libre para que pueda probar las delicias gastronómicas a su manera."),
  //   },
  //   {
  //     imgSrc:
  //       "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/8e/0c/7c/caption.jpg?w=1200&h=700&s=1",
  //     title: processText("Personalization with Good Shepherd Tours*** Personalizacion con Good Shepherd Tours"),
  //     text: processText("We build free time into every vacation, so you can eat, shop, and explore as you please. Whether you're into art, music, food, wine, or history, you'll love the freedom to truly personalize your trip with optional excursions.***Construimos tiempo libre en cada vacación, para que pueda comer, comprar y explorar a su antojo. Ya sea que te guste el arte, la música, la comida, el vino o la historia, te encantará la libertad de personalizar realmente tu viaje con excursiones opcionales."),
  //   },
  //   {
  //     imgSrc:
  //       "https://student-cms.prd.timeshighereducation.com/sites/default/files/styles/default/public/iphone_apps.jpg?itok=C7KU9wJK",
  //     title: processText("Good Shepherd Tours App***Aplicacion de Good Shepherd Tours"),
  //     text: processText("Our complimentary good shepherd tours app was designed to put a world of pre- and on-trip information at your fingertips. Check flight, hotel and transfer information, review your itinerary, and customize your trip with a host of suggestions.***Nuestra aplicación gratuita de good shepherd tours fue diseñada para poner a su alcance un mundo de información previa y de viaje. Compruebe la información de vuelo, hotel y traslado, revise su itinerario y personalice su viaje con una serie de sugerencias."),
  //   },
  // ];

  const items = homePageData.reasonList;
  return (
    <div className="r-reasons-container">
      <h2>{processText("Why travel with Good Shepherd Tours?***¿Por qué viajar con Good Shepherd Tours?")}</h2>
      <div className="r-section-container">
        {items.map((item, index) => (
          <div className="r-section-item" key={index}>
            <img src={item.imgSrc} alt={item.title} />
            <GiAlienFire size={64} className="r-hero-arrow" />
            <div>
              <h3>{processText(item.title)}</h3>
              <p>{processText(item.text)}</p>
              <Link to={"/why-gst"}>{processText("Read More***Leer Más")}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReasonsSection;
