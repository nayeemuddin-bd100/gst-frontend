import React, { useEffect, useState } from "react";
import { usePageData } from "../../../modules/PageDataContext";
import { deletePost, getPostsData } from "../../../firebase/actions";
import DashTopbar from "./DashTopbar";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import DownloadPostUrlList from "./DownloadPostUrlList";

const ListSocialPosts = () => {
  const { SITE_ID, socialPosts, setSocialPosts } = usePageData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);



  const fetchPosts = async (isInitial = false) => {
    setLoading(true);
    const data = await getPostsData(SITE_ID, 10, isInitial ? null : lastVisible);
    
    if (isInitial) {
      setSocialPosts(data.posts);
    } else {
      setSocialPosts(prev => [...prev, ...data.posts]);
    }

    setLastVisible(data.lastVisible);
    setHasMore(data.posts.length > 9);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(true)
  }, []);

  return (
    <div>
      <DashTopbar
        title="All Social Posts"
        onSubmit={() => navigate("/dashboard/create-post")}
        buttonText="Create New Post"
        cancelOption={false}
      />

{socialPosts.length !== 0 && <DownloadPostUrlList/>}
      <div>

        {!loading && socialPosts.length === 0 && <h2 className="no-p-found"> Not posts found</h2>}

        {socialPosts.map((post) => (
          <PostRow post={post} key={post.id} />
        ))}

        {loading && <Loader />}

        {!loading && hasMore && (
          <button
            onClick={() => fetchPosts(false)}
            className="btn-primary"
            style={{width : "100%"}}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default ListSocialPosts;

const PostRow = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const { SITE_ID, setSocialPosts } = usePageData();
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

  const handleDeletePost = async (postId) => {
    await deletePost(SITE_ID, postId);
    setSocialPosts((prev) => prev.filter((p) => p.id !== postId));
    setShowModal(false);
  };

  return (
    <div className="post-row">
      <img className="post-row__image" src={post.imageUrl} alt={post.title} />

      <div className="post-row__content">
        <h2 className="post-row__title" onClick={() => navigate(`/social-contents/${post.slug}`)}>{post.title}</h2>
        <p className="post-row__date"> {formatDate(post.createdAt)}</p>
      </div>

      <div className="post-row__actions">
        <button onClick={() => navigate(`/dashboard/update-post/${post.id}`, {state : post})} className="post-row__icon-btn edit" title="Edit">
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
        onSubmit={() => handleDeletePost(post.id)}
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
          <h2>Are you sure want to delete the post?</h2>

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
