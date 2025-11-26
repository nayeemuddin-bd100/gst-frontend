import { useRef, useState } from "react";
import "../../../styles/social-post.css"
import { usePageData } from "../../../modules/PageDataContext";
import { addReviewData } from "../../../firebase/actions"; // you can reuse this or create a separate function
import DashTopbar from "./DashTopbar";
import { useNavigate } from "react-router-dom";

const AddNewReview = () => {
  const [formData, setFormData] = useState({
    reviewText: "",
    videoUrl: "",
    leaderPhotoUrl: "",
  });
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
    try {
      setLoading(true);
      const res = await addReviewData(SITE_ID, formData);

          setFormData({
      reviewText: "",
      videoUrl: "",
      leaderPhotoUrl: "",
    });
     navigate("/dashboard?page=content-reviews-list");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      reviewText: "",
      videoUrl: "",
      leaderPhotoUrl: "",
    });
    navigate("/dashboard?page=content-reviews-list");
  };

  return (
    <div className="csp-container">
      <DashTopbar
        title="Add New Review"
        onCancel={handleCancel}
        buttonText={loading ? "Adding..." : "Add Review"}
        onSubmit={() => formRef.current.requestSubmit()}
        disabled={loading}
      />
      <form ref={formRef} onSubmit={handleSubmit} className="csp-form">
        <label className="csp-label" htmlFor="reviewText">Review Text</label>
        <textarea
          className="csp-textarea"
          id="reviewText"
          name="reviewText"
          rows="5"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Enter the review text"
          required
        />

        <label className="csp-label" htmlFor="videoUrl">Video URL</label>
        <input
          className="csp-input"
          id="videoUrl"
          name="videoUrl"
          type="url"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="Enter video URL"
        />

        <label className="csp-label" htmlFor="leaderPhotoUrl">Leader Photo URL</label>
        <input
          className="csp-input"
          id="leaderPhotoUrl"
          name="leaderPhotoUrl"
          type="url"
          value={formData.leaderPhotoUrl}
          onChange={handleChange}
          placeholder="Enter leader photo URL"
        />
      </form>
    </div>
  );
};

export default AddNewReview;