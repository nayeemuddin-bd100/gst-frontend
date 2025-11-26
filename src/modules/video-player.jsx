import React, { useState } from "react";
import ReactPlayer from "react-player";
import '../styles/video-player.css'; // Importa el archivo CSS
import { usePageData } from "./PageDataContext";

function VideoPlayer() {

  const {homePageData} = usePageData();

  // Estado para almacenar el video que se está reproduciendo
  const [currentVideo, setCurrentVideo] = useState(homePageData.videoListCurrentVideo);
  
  // Lista de videos con miniaturas y URLs
  // const videoList = [
  //   {
  //     url: "https://www.youtube.com/watch?v=5p_SuO96Jd4",
  //     thumbnail: "https://img.youtube.com/vi/5p_SuO96Jd4/hqdefault.jpg"
  //   },
  //   {
  //     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  //     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
  //   },
  //   {
  //     url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
  //     thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg"
  //   },
  // ];

  const videoList = homePageData.videoList;

  // Función para cambiar el video actual
  const handleVideoChange = (url) => {
    setCurrentVideo(url);
  };

  return (
    <div className="vp-video-section">
      <div className="vp-video-container">
        <ReactPlayer 
          url={currentVideo} // Usamos el estado para la URL del video actual
          className="vp-react-player"
          width="100%" // Ajustamos al tamaño del contenedor
          height="100%" // Ajustamos al tamaño del contenedor
          controls={true} // Mostramos los controles
        />
      </div>

      {/* Contenedor de miniaturas */}
      <div className="vp-thumbnails-container">
        {videoList.map((video, index) => (
          <div
            key={index}
            className={`vp-thumbnail ${video.url === currentVideo ? 'active' : ''}`} 
            onClick={() => handleVideoChange(video.url)} // Cambiar video al hacer clic
          >
            <img 
              src={video.thumbnail} 
              alt={`Thumbnail ${index}`} 
              className="vp-thumbnail-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;

