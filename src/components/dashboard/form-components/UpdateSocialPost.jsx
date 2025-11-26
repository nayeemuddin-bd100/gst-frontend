import  {useRef, useState } from "react";
import "../../../styles/social-post.css";
import { usePageData } from "../../../modules/PageDataContext";
import {
  addPostData,
  updatePost,
} from "../../../firebase/actions";
import DashTopbar from "./DashTopbar";
import TextEditor from "./TextEditor";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateSocialPost = () => {
      const {state} = useLocation();
  const [formData, setFormData] = useState(state || {
    title: "",
    imageUrl: "",
    imageTitle : "",
    videoTitle : "",
    videoUrl: "",
    description: "",
  });
  const [bodyContent, setBodyContent] = useState(state.bodyContent || "");
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const navigate = useNavigate();

  const { SITE_ID } = usePageData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { ...formData, bodyContent };

    console.log("Submitted social post:", postData);

    try {
    setLoading(true)
      const res = await updatePost(SITE_ID, state.id, postData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      imageUrl: "",
          imageTitle : "",
    videoTitle : "",
      videoUrl: "",
      description: "",
    });
    setBodyContent("");
    navigate("/dashboard?page=content-social-posts");
  };

  return (
    <div className="csp-container">
      <DashTopbar
        title="Update Post"
        onCancel={handleCancel}
        buttonText={loading ? "Updating..." : "Update"}
        onSubmit={() => formRef.current.requestSubmit()}
        disabled={loading}
      />
      <form ref={formRef} onSubmit={handleSubmit} className="csp-form">
        <label className="csp-label" htmlFor="title">
          Title
        </label>
        <input
          className="csp-input"
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />

        <div className="flex">
          <div className="w-full my">
            <label className="csp-label" htmlFor="imageTitle">
              Image Title
            </label>
            <input
              className="csp-input"
              id="imageTitle"
              name="imageTitle"
              type="text"
              value={formData.imageTitle}
              onChange={handleChange}
              placeholder="Enter image title"
            />
          </div>

          <div className="w-full my">
            <label className="csp-label" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              className="csp-input"
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>
        </div>
        <div className="flex my">
          <div className="w-full">
            <label className="csp-label" htmlFor="videoTitle">
              Video Title
            </label>
            <input
              className="csp-input"
              id="videoTitle"
              name="videoTitle"
              type="text"
              value={formData.videoTitle}
              onChange={handleChange}
              placeholder="Enter image title"
            />
          </div>

          <div className="w-full">
            <label className="csp-label" htmlFor="videoUrl">
              Video URL
            </label>
            <input
              className="csp-input"
              id="videoUrl"
              name="videoUrl"
              type="url"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="Enter video URL"
              
            />
          </div>
        </div>

        <label className="csp-label" style={{marginBottom : "-20px"}} htmlFor="bodyContent">
          Body Content
        </label>
        <TextEditor value={bodyContent} setValue={setBodyContent} />
      </form>
    </div>
  );
};

export default UpdateSocialPost;
