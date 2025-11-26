import React from 'react'
import FormSectionHeader from '../form-components/FormSectionHeader';
import { usePageData } from '../../../modules/PageDataContext';

const FormSocialContent = () => {

      const { socialContentPageData, setSocialContentPageData } = usePageData();
    
      const onHeaderChange = (e, type) => {
        setSocialContentPageData((prev) => ({
          ...prev,
          sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
        }));
      };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={socialContentPageData.sectionHeader.image}
        title={socialContentPageData.sectionHeader.title}
        subtitle={socialContentPageData.sectionHeader.subtitle}
        description={socialContentPageData.sectionHeader.description}
      />
    </div>
  )
}

export default FormSocialContent