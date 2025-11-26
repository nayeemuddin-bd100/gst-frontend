import React from "react";
import ReasonsSection from "../../../modules/Reasons";
import TitleText from "../../TitleText";
import FormSectionHeader from "../form-components/FormSectionHeader";
import ProcessText from "../../../functions/LanguageSorter";
import { usePageData } from "../../../modules/PageDataContext";
import FormTitleText from "../form-components/FormTitleText";
import { Link } from "react-router-dom";

const FormSoloTravel = () => {
  const { soloTravelPageData, setSoloTravelPageData } = usePageData();

  const onHeaderChange = (e, type) => {
    setSoloTravelPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

const onTitleChange = (e, type, fieldKey) => {
  const value = e.target.value;
  setSoloTravelPageData((prev) => ({
    ...prev,
    [fieldKey]: {
      ...prev[fieldKey],
      [type]: value,
    },
  }));
};


  return (
    <div>
      <div style={{ backgroundColor: "#eee" }}>
        <FormSectionHeader
          onHeaderChange={onHeaderChange}
          image={soloTravelPageData.sectionHeader.image}
          title={soloTravelPageData.sectionHeader.title}
          subtitle={soloTravelPageData.sectionHeader.subtitle}
          description={soloTravelPageData.sectionHeader.description}
        />

        <FormTitleText
        fieldKey="titleText1"
          onTitleChange={onTitleChange}
          title={soloTravelPageData.titleText1.title}
          text={soloTravelPageData.titleText1.text}
        />
        <FormTitleText
        fieldKey="titleText2"
          onTitleChange={onTitleChange}
          title={soloTravelPageData.titleText2.title}
          text={soloTravelPageData.titleText2.text}
        />
        <FormTitleText
        fieldKey="titleText3"
          onTitleChange={onTitleChange}
          title={soloTravelPageData.titleText3.title}
          text={soloTravelPageData.titleText3.text}
        />

        <Link className="btn-primary"  to="/dashboard?page=home">Edit this section</Link>
        <ReasonsSection />
      </div>
    </div>
  );
};

export default FormSoloTravel;
