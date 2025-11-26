// import React, { useEffect } from 'react'
// import HeaderSection from '../components/HeaderSection'
// import ProcessText from '../functions/LanguageSorter'
// import { usePageData } from '../modules/PageDataContext';
// import { getReviewsData } from '../firebase/actions';

// const Reviews = () => {
//     const { reviewsPageData } = usePageData();
//     const [reviews, setReviews] = useEffect(null);
//     const [loading, setLoading] = useEffect(true);
    

//   return (
//     <div style={{ backgroundColor: "#eee" }}>
//       <HeaderSection
//         image={reviewsPageData.sectionHeader.image}
//         title={reviewsPageData.sectionHeader.title}
//         subtitle={reviewsPageData.sectionHeader.subtitle}
//         description={reviewsPageData.sectionHeader.description}
//       />

//       <div>
//         {/* List the reviews for visitors */}
//         <Review />
//         {/* Review is a component that will be renderded inside map */}
//       </div>
//     </div>
//   )
// }

// export default Reviews


import React, { useEffect, useState } from "react";
import HeaderSection from "../components/HeaderSection";
import { usePageData } from "../modules/PageDataContext";
import { getReviewsData } from "../firebase/actions";
import Loader from "../components/Loader";
import "../styles/reviews-page.css";
import ReactPlayer from "react-player";

const Reviews = () => {
  const { reviewsPageData, SITE_ID } = usePageData();
  const [reviews, setReviews] = useState([]);
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
    <div >
      <HeaderSection
        image={reviewsPageData.sectionHeader.image}
        title={reviewsPageData.sectionHeader.title}
        subtitle={reviewsPageData.sectionHeader.subtitle}
        description={reviewsPageData.sectionHeader.description}
      />

      <div className="reviews-list-container">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}

        {loading && <Loader />}

        {!loading && hasMore && (
          <button
            onClick={() => fetchReviews(false)}
            className="btn-primary"
            style={{ marginTop: 20 }}
          >
            Show More
          </button>
        )}

        {!loading && reviews.length === 0 && (
          <p className="no-p-found">No reviews found</p>
        )}

        {!hasMore && (
  <p className="r-p-end-text"> You've reached the end of the reviews.</p>
)}

      </div>
    </div>
  );
};

export default Reviews;





const Review = ({ review }) => {
  if (!review) return null;

  return (
    <div className="r-p-container">
      {/* Left: Review Text */}
      <div className="r-p-text">
        <p>{review.reviewText}</p>
      </div>

      {/* Middle: Video */}
      <div className="r-p-video">
        {review.videoUrl ? (
          <div className="r-p-video-wrapper">
            <ReactPlayer
              url={review.videoUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        ) : (
          <div className="r-p-video--empty">No video</div>
        )}
      </div>

      {/* Right: Leader Photo */}
      <div className="r-p-photo">
        {review.leaderPhotoUrl ? (
          <img src={review.leaderPhotoUrl} alt="Leader" />
        ) : (
          <div className="r-p-photo--empty">No photo</div>
        )}
      </div>
    </div>
  );
};