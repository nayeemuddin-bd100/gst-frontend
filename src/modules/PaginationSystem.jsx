import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import { Select, SelectItem } from "../components/Select";
import { Button } from "../components/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../styles/pagination-system.css";
import HeaderSection from "../components/HeaderSection";
import { Adress } from "../functions/Variables";
import { useLanguage } from "./LanguageContext";
import PriceCalculator from "../components/PriceCalculator";

// function ImageModal({ image, onClose }) {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-button" onClick={onClose}>
//           ×
//         </button>
//         <img src={image} alt="Expanded" className="modal-image" />
//       </div>
//     </div>
//   );
// }

// function PaginatedCardSection() {
//   const [data, setData] = useState([]);
//   const [sortedData, setSortedData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [sortOption, setSortOption] = useState("");
//   const [description, setDescription] = useState();
//   const [modalImage, setModalImage] = useState(null);

//   const { language } = useLanguage();

//   const processText = (texto) => {
//     if (texto) {
//       const clave = "***";
//       const index = texto.indexOf(clave);
//       return index === -1
//         ? texto
//         : language === "en"
//         ? texto.substring(0, index)
//         : texto.substring(index + clave.length);
//     }
//     return texto;
//   };

//   const location = useLocation();
//   const id = location.state ? location.state.data : 0;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(Adress + "api/completeItinerary", { id });
//         setData(response.data[1]);
//         setSortedData(response.data[1]);
//         setDescription(response.data[0][0]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [location.state]);

//   useEffect(() => {
//     let sorted = [...data];
//     if (sortOption === "price-asc") {
//       sorted.sort((a, b) => a.tour_price - b.tour_price);
//     } else if (sortOption === "price-desc") {
//       sorted.sort((a, b) => b.tour_price - a.tour_price);
//     } else if (sortOption === "duration-asc") {
//       sorted.sort((a, b) => a.gti_total_days - b.gti_total_days);
//     } else if (sortOption === "duration-desc") {
//       sorted.sort((a, b) => b.gti_total_days - a.gti_total_days);
//     }
//     setSortedData(sorted);
//   }, [sortOption, data]);

//   return (
//     <div className="psy-container">
//       {modalImage && <ImageModal image={modalImage} onClose={() => setModalImage(null)} />}
//       <div className="section-container">
//         <div className="card-grid">
//           {sortedData.map((item) => (
//             <Card key={item.id}>
//               <img
//                 src={item.tour_image ? Adress + "uploads/tour-profile/" + item.tour_image : "https://via.placeholder.com/300"}
//                 alt="landscape"
//                 className="card-image"
//               />
//               <CardContent>
//                 <h2 className="card-title">{processText(item.gti_name)}</h2>
//                 <button className="open-image-btn" onClick={() => setModalImage(Adress + "uploads/tour-profile/" + item.tour_image)}>
//                   Abrir Imagen
//                 </button>
//                 <p className="card-description">
//                   {processText(item.description).length > 250 ? processText(item.description).slice(0, 250) + "..." : processText(item.description)}
//                 </p>
//                 <Link to="/viewTour" state={{ data: item.id }} className="card-link">
//                   {processText("View More***Ver más")}
//                 </Link>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

function PaginatedCardSection() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState("");
  const [description, setDescription] = useState();

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

  const location = useLocation();
  // const id = location.state ? location.state.data : 0;
  // const category = location.state ? location.state.category : 0;

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("id", location.state.data);
      localStorage.setItem("category", location.state.category.id);
    }
  }, []);

  const maxVisiblePages = 5; // Máximo de páginas visibles

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let id = localStorage.getItem("id")
  //     let category = localStorage.getItem("category")
  //     try {
  //       const response = await axios.post(Adress + "api/completeItinerary", {
  //         id,
  //         category,
  //       });

  //       setData(response.data[1]);
  //       setSortedData(response.data[1]);
  //       setDescription(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      let id = localStorage.getItem("id");
      let category = localStorage.getItem("category");
      try {
        const response = await axios.post(Adress + "api/completeItinerary", {
          id,
          category,
        });
        setData(response.data[1]);
        setSortedData(response.data[1]);
        setDescription(response.data[0][0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.state]);

  // Handle sorting
  useEffect(() => {
    let sorted = [...data];
    if (sortOption === "price-asc") {
      sorted.sort((a, b) => a.tour_price - b.tour_price);
    } else if (sortOption === "price-desc") {
      sorted.sort((a, b) => b.tour_price - a.tour_price);
    } else if (sortOption === "duration-asc") {
      sorted.sort((a, b) => a.gti_total_days - b.gti_total_days);
    } else if (sortOption === "duration-desc") {
      sorted.sort((a, b) => b.gti_total_days - a.gti_total_days);
    }
    setSortedData(sorted);
  }, [sortOption, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(
    indexOfFirstItem,
    indexOfLastItem === 999 ? undefined : indexOfLastItem
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Define el rango de páginas visibles
  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  return (
    <div className="psy-container">
      <HeaderSection
        image={
          description
            ? `${Adress}uploads/country-profile/${description.image}`
            : "https://s1.it.atcdn.net/wp-content/uploads/2014/06/shutterstock_129551465.jpg"
        }
        title={
          description
            ? processText(location.state.category.category_name) +
              processText(" in *** en ") +
              processText(description.country_name)
            : "Tours"
        }
        subtitle={
          description
            ? processText(description.title)
            : processText("Our Tours***Nuestros tours")
        }
        description={description ? processText(description.description) : ""}
      />

      <div className="hero-text">
        <div>
          <img src="/logo1.png" />
        </div>
      </div>
      <div className="section-container">
        {/* Dropdown Controls */}
        <div className="dropdowns-container">
          <label className="ps-select-label" htmlFor="ps-order">
            {processText("Order by:***Ordenar por:")}
          </label>
          <Select
            id="ps-order"
            className="dropdown"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <SelectItem value="price-asc">
              {processText("Price (Low to High)*** Precio (Menor a Mayor)")}
            </SelectItem>
            <SelectItem value="price-desc">
              {processText("Price (High to Low)*** Precio (Mayor a Menor)")}
            </SelectItem>
            <SelectItem value="duration-asc">
              {processText(
                "Duration (Short to Long)*** Duracion (Menor a Mayor)"
              )}
            </SelectItem>
            <SelectItem value="duration-desc">
              {processText(
                "Duration (Long to Short)*** Duracion (Mayor a Menor)"
              )}
            </SelectItem>
          </Select>
          <label className="ps-select-label" htmlFor="ps-results">
            {processText("Results per page: *** Resultados por Página:")}
          </label>
          <Select
            id="ps-results"
            className="dropdown"
            onChange={(e) =>
              setItemsPerPage(
                e.target.value === "all" ? Infinity : Number(e.target.value)
              )
            }
          >
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="48">48</SelectItem>
            <SelectItem value="all">{processText("All***Todos")}</SelectItem>
          </Select>
        </div>

        {/* Card Grid */}
        <div className="card-grid">
          {currentItems.map((item) => (
            <Card key={item[0].id}>
              <img
                src={
                  item[0].tour_image
                    ? Adress + "uploads/tour-profile/" + item[0].tour_image
                    : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                }
                alt="landscape"
                className="card-image"
              />
              <CardContent>
                <h2 className="card-title">{processText(item[0].gti_name)}</h2>
                <p className="card-description">
                  {processText(item[0].description).length > 250
                    ? processText(item[0].description).slice(0, 250) + "..."
                    : processText(item[0].description)}
                </p>

                <div className="price">
                  <p>
                    {processText("From***Desde")} <br /> (USD)
                  </p>
                  <PriceCalculator
                    tourData={item[0]}
                    promotion={item[1]}
                    deal={null}
                    className
                  />
                </div>
                <Link
                  to="/viewTour"
                  state={{ data: item[0].id }}
                  className="card-link"
                >
                  {processText("View More***Ver mas")}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-container">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaArrowLeft />
          </Button>

          <div className="pagination-numbers">
            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
              const page = startPage + index;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "solid" : "ghost"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaginatedCardSection;
