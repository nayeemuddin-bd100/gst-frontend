import React from "react";
import HeaderSection from "../components/HeaderSection";
import "../styles/small-groups.css";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "../modules/PageDataContext";


const SmallGroups = () => {
      const {smallGroupPageData} = usePageData();
  
  
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <HeaderSection image={smallGroupPageData.sectionHeader.image} title={smallGroupPageData.sectionHeader.title} >
        <div className="sg-container">
          <img src={smallGroupPageData.leftImage}  />
          <div>
            <h2>{ProcessText(smallGroupPageData.titleText)}</h2>
            <p>
              {ProcessText(smallGroupPageData.para1)}<br/><br/>
              {ProcessText(smallGroupPageData.para2)}<br /> <br/>
              {ProcessText(smallGroupPageData.para3)}
            </p>
          </div>
        </div>
      </HeaderSection>
    </div>
  );
};

export default SmallGroups;
