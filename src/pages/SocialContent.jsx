import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostBySlug } from "../firebase/actions";
import { toast } from "sonner";
import Loader from "../components/Loader";
import HeaderSection from "../components/HeaderSection";
import { usePageData } from "../modules/PageDataContext";
import "../styles/social-content.css";
import DOMPurify from "dompurify";
import ReactPlayer from "react-player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const SocialContent = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { socialContentPageData } = usePageData();

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const data = await getPostBySlug(import.meta.env.VITE_SITE_ID, slug);
      if (data) {
        setPostData(data);
      } else {
        toast.error("Failed to get the post");
      }
      setLoading(false);
    };
    getPost();
  }, []);



  return loading ? (
    <div style={{height : "100vh"}}><Loader /></div>
  ) : (
    <div style={{ backgroundColor: "" }}>
      <HeaderSection
        image={socialContentPageData.sectionHeader.image}
        title={socialContentPageData.sectionHeader.title}
        subtitle={socialContentPageData.sectionHeader.subtitle}
        description={socialContentPageData.sectionHeader.description}
      />
      <SocialPost post={postData} />
    </div>
  );
};

export default SocialContent;




const SocialPost = ({ post }) => {
  
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      onAuthStateChanged(auth, (u) => {
        setAdmin(u);
      });
    }, []);
  

  return (
    <div className="social-post-container">
      {/* Left contents */}
      <div className="left-content">
       <div className="flex my">
         <h1>{post.title}</h1>
        {admin && <button onClick={() => navigate(`/dashboard/update-post/${post.id}`, {state : post})} className="btn-primary">Edit post</button>}

       </div>
        <div
          className="quill-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.bodyContent),
          }}
        />
      </div>

      {/* Right medias */}
      <div className="right-media">
        <div>
          <h3>{post?.videoTitle}</h3>
          <ReactPlayer
            url={post.videoUrl} // Usamos el estado para la URL del video actual
            className=""
            width="100%" // Ajustamos al tamaño del contenedor
            height="100%" // Ajustamos al tamaño del contenedor
            controls={true} // Mostramos los controles
          />
        </div>
        <div className="r-m-img-container">
          <h3>{post?.imageTitle}</h3>
          <img src={post.imageUrl} alt="" />
        </div>
      </div>
    </div>
  );
};
