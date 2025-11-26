import React from 'react'
import { usePageData } from '../../../modules/PageDataContext';
import FormSectionHeader from '../form-components/FormSectionHeader';

const FormReviewsPage = () => {
 
      const { reviewsPageData, setReviewsPageData } = usePageData();
    
      const onHeaderChange = (e, type) => {
        setReviewsPageData((prev) => ({
          ...prev,
          sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
        }));
      };

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={reviewsPageData.sectionHeader.image}
        title={reviewsPageData.sectionHeader.title}
        subtitle={reviewsPageData.sectionHeader.subtitle}
        description={reviewsPageData.sectionHeader.description}
      />
    </div>
  )
}

export default FormReviewsPage