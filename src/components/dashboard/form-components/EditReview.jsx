import { useRef, useState } from "react";
import "../../../styles/social-post.css";
import { usePageData } from "../../../modules/PageDataContext";
import { updateReview } from "../../../firebase/actions"; // ⚠️ Make sure this function exists
import DashTopbar from "./DashTopbar";
import { useLocation, useNavigate } from "react-router-dom";

const EditReview = () => {
  const { state } = useLocation();
  const [formData, setFormData] = useState(state || {
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
      const res = await updateReview(SITE_ID, state.id, formData);
      console.log("Updated review:", res);
    } catch (err) {
      console.error(err);
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
        title="Edit Review"
        onCancel={handleCancel}
        buttonText={loading ? "Updating..." : "Update"}
        onSubmit={() => formRef.current.requestSubmit()}
        disabled={loading}
      />
      <form ref={formRef} onSubmit={handleSubmit} className="csp-form">
        <label className="csp-label" htmlFor="reviewText">
          Review Text
        </label>
        <textarea
          className="csp-textarea"
          id="reviewText"
          name="reviewText"
          rows="3"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Enter review text"
          required
        />

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

        <label className="csp-label" htmlFor="leaderPhotoUrl">
          Leader Photo URL
        </label>
        <input
          className="csp-input"
          id="leaderPhotoUrl"
          name="leaderPhotoUrl"
          type="url"
          value={formData.leaderPhotoUrl}
          onChange={handleChange}
          placeholder="Enter photo URL"
        />
      </form>
    </div>
  );
};

export default EditReview;
