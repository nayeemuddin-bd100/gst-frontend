import React, { useEffect, useState } from "react";
import { usePageData } from "../../../modules/PageDataContext";
import { deleteReview, getReviewsData } from "../../../firebase/actions";
import DashTopbar from "./DashTopbar";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";

const ReviewsList = () => {
  const { SITE_ID, reviews, setReviews } = usePageData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchReviews = async (isInitial = false) => {
    setLoading(true);
    const data = await getReviewsData(SITE_ID, 10, isInitial ? null : lastVisible);

    if (isInitial) {
      setReviews(data.reviews);
    } else {
      setReviews((prev) => [...prev, ...data.reviews]);
    }

    setLastVisible(data.lastVisible);
    setHasMore(data.reviews.length > 9);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews(true);
  }, []);

  return (
    <div>
      <DashTopbar
        title="All Reviews"
        onSubmit={() => navigate("/dashboard/add-review")}
        buttonText="Add New Review"
        cancelOption={false}
      />

      <div>
        {!loading && reviews.length === 0 && <h2 className="no-p-found">No reviews found</h2>}

        {reviews?.map((review) => (
          <ReviewRow key={review.id} review={review} />
        ))}

        {loading && <Loader />}

        {!loading && hasMore && (
          <button
            onClick={() => fetchReviews(false)}
            className="btn-primary"
            style={{ width: "100%" }}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;


const ReviewRow = ({ review }) => {
  const [showModal, setShowModal] = useState(false);
  const { SITE_ID, setReviews } = usePageData();
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "No date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteReview(SITE_ID, reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setShowModal(false);
  };

  return (
    <div className="post-row">
      <img
        className="post-row__image"
        src={review.leaderPhotoUrl}
        alt="Leader"
      />

      <div className="post-row__content">
        <h2 className="post-row__title" style={{ cursor: "default" }}>
          {review.reviewText?.slice(0, 100)}...
        </h2>
        <p className="post-row__date">{formatDate(review.createdAt)}</p>
      </div>

      <div className="post-row__actions">
        <button
          onClick={() => navigate(`/dashboard/edit-review/${review.id}`, { state: review })}
          className="post-row__icon-btn edit"
          title="Edit"
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="post-row__icon-btn delete"
          title="Delete"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={() => handleDeleteReview(review.id)}
      />
    </div>
  );
};


const Modal = ({ showModal, setShowModal, onSubmit }) => {
  const handleModalClose = () => setShowModal(false);

  return (
    showModal && (
      <div className="modal-overlay" onClick={handleModalClose}>
        <div
          className="modal-content"
          style={{ height: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Are you sure want to delete the review?</h2>

          <button className="close-btn" onClick={handleModalClose}>
            <RiCloseLargeFill />
          </button>

          <div className="modal-actions">
            <button className="modal-btn confirm" onClick={onSubmit}>
              Okay
            </button>
            <button className="modal-btn cancel" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};
