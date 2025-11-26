import React from "react";
import FormSectionHeader from "../form-components/FormSectionHeader";
import { usePageData } from "../../../modules/PageDataContext";
import ProcessText from "../../../functions/LanguageSorter";

const FormExplorePage = () => {
  const { exploreTourPageData, setExploreTourPageData } = usePageData();

  const onHeaderChange = (e, type) => {
    setExploreTourPageData((prev) => ({
      ...prev,
      sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
    }));
  };

  return <div>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={exploreTourPageData.sectionHeader.image}
        title={exploreTourPageData.sectionHeader.title}
        subtitle={exploreTourPageData.sectionHeader.subtitle}
        description={exploreTourPageData.sectionHeader.description}
      />
      {/* <h2 className="wow">{ProcessText("")}</h2>   */}
      <input type="text" onChange={e => setExploreTourPageData(prev => ({...prev, wowText : e.target.value}))} className="input-field wow" value={exploreTourPageData.wowText} />
  </div>;
};

export default FormExplorePage;
