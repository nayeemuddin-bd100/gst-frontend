import React from "react";
import HeaderSection from "../components/HeaderSection";
import DescriptionCard from "../components/DescriptionCard";
import "../styles/why-gst.css";
import { usePageData } from "../modules/PageDataContext";

const WhyGST = () => {
        const { whyGSTPageData } = usePageData();
  
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <HeaderSection
        image={whyGSTPageData.sectionHeader.image}
        title={whyGSTPageData.sectionHeader.title}
        subtitle={whyGSTPageData.sectionHeader.subtitle}
        description={whyGSTPageData.sectionHeader.description}
      />
      <div className="wg-description-cards-container">
        {whyGSTPageData.descriptionCards.map(({title, img, miniImg, text}, idx) => <DescriptionCard
        key={idx}
          title={title}
          img={img}
          miniImg={miniImg}
          text={text}
        />)}
      </div>
    </div>
  );
};

export default WhyGST;
