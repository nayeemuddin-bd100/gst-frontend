import React from 'react'
import FormSectionHeader from '../form-components/FormSectionHeader';
import VideoPlayer from '../../../modules/video-player';
import { usePageData } from '../../../modules/PageDataContext';
import { Link } from 'react-router-dom';

const FormVideoGallery = () => {

      const { videoGalleryPageData, setVideoGalleryPageData } = usePageData();

      
    
      const onHeaderChange = (e, type) => {
        setVideoGalleryPageData((prev) => ({
          ...prev,
          sectionHeader: { ...prev.sectionHeader, [type]: e.target.value },
        }));
      };

  return (
        <div style={{ backgroundColor: "#eee" }}>
              <FormSectionHeader
        onHeaderChange={onHeaderChange}
        image={videoGalleryPageData.sectionHeader.image}
        title={videoGalleryPageData.sectionHeader.title}
        subtitle={videoGalleryPageData.sectionHeader.subtitle}
        description={videoGalleryPageData.sectionHeader.description}
      />
        <br/>
        <br/>
        <br/>
        <Link className="btn-primary" style={{display : "block", width: "fit-content", marginBottom : "30px"}}  to="/dashboard?page=home">Edit this section</Link>
        <br/>

        <VideoPlayer /> 
    </div>
  )
}

export default FormVideoGallery