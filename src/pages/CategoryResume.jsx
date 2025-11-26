import React from "react";
import { useLocation } from "react-router-dom";
import HeaderSection from "../components/HeaderSection";
import { Link } from "react-router-dom";
import '../styles/category-resume.css'
import { Adress } from "../functions/Variables";
import ProcessText from "../functions/LanguageSorter";

function Category() {
  const location = useLocation();
  const data = location.state.item != null ? location.state.item : null;

  return (
    <div style={{ backgroundColor: "#eee", zIndex: "-1" }}>
      <HeaderSection
        image={`${Adress}uploads/category-profile/${data.category.image}`}
        title={ProcessText(data.category.category_name)}
        subtitle={ProcessText(data.category.title)}
        description={ProcessText(data.category.description)}
      />
      <div className="cr-countries-container">
        {data.options.map((item,index)=> (
         <div key={index} className="cr-category-item">
          
          <img src={`${Adress}uploads/country-profile/${item[2]}`} />
          <h3>{ProcessText(item[1])}</h3>
          <Link  to={"/tours"} state={{data : item[0],category: data.category}}>{ProcessText("View Tours*** Ver Tours")} </Link>
         </div> 
        ))}
      </div>
    </div>
  );
}


export default Category;

