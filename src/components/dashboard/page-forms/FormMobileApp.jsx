import React from "react";
import FormSectionHeader from "../form-components/FormSectionHeader";
import { usePageData } from "../../../modules/PageDataContext";

const FormMobileApp = () => {
  const { mobileAppPageData, setMobileAppPageData } = usePageData();

  const onHeaderChange = (e, type) => {
    setMobileAppPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={mobileAppPageData.sectionHeader.image}
        title={mobileAppPageData.sectionHeader.title}
        subtitle={mobileAppPageData.sectionHeader.subtitle}
        description={mobileAppPageData.sectionHeader.description}
      />
    </div>
  );
};

export default FormMobileApp;
