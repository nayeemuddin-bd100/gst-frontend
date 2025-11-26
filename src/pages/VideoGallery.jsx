import React from "react";
import HeaderSection from "../components/HeaderSection";
import VideoPlayer from "../modules/video-player";
import ProcessText from "../functions/LanguageSorter";
import { usePageData } from "../modules/PageDataContext";

const VideoGallery = () => {
    const { videoGalleryPageData } = usePageData();
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <HeaderSection
        image={videoGalleryPageData.sectionHeader.image}
        title={videoGalleryPageData.sectionHeader.title}
        subtitle={videoGalleryPageData.sectionHeader.subtitle}
        description={videoGalleryPageData.sectionHeader.description}
      />
      <br />
      <br />
      <br />
      <br />
      <VideoPlayer />
    </div>
  );
};

export default VideoGallery;
