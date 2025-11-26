// getPageData.js
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  deleteDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "sonner";

// get page data
export const getPageData = async (siteId) => {
  try {
    const docRef = doc(db, "sites", siteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().fullPageData;
    } else {
      console.log(`No page data found for ID: ${siteId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
};

// save page data
export const savePageData = async (siteId, pageData) => {
  try {
    console.log("Loading...");
    await setDoc(
      doc(db, "sites", siteId),
      {
        fullPageData: pageData,
        updatedAt: new Date(),
      },
      { merge: true } 
    );
    console.log(`Page data saved successfully with ID: ${siteId}`);
    toast.success("Page data saved successful")
  } catch (error) {
    console.error("Error saving page data:", error);
    toast.error("Error saving page data")
  }
};

// add new post
export const addPostData = async (siteId, postData) => {
  try {
    const postRef = collection(db, "sites", siteId, "postsData");

    // Check for duplicate title
    const q = query(postRef, where("title", "==", postData.title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("A post with this title already exists. Please use a unique title.");
      return null; // Don't proceed with adding the post
    }

    const newPost = {
      ...postData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(postRef, newPost);
    toast.success("Post added successfully");
    console.log("Post added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    toast.error("Failed to publish post");
    console.error("Error adding post:", error);
  }
};


// get posts data
export const getPostsData = async (siteId, limitCount = 10, lastDoc = null) => {
  try {
    const postsRef = collection(db, "sites", siteId, "postsData");

    const q = lastDoc
      ? query(
          postsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(limitCount)
        )
      : query(postsRef, orderBy("createdAt", "desc"), limit(limitCount));

    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      posts,
      lastVisible,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], lastVisible: null };
  }
};


// get single post data
export const getSinglePost = async (siteId, postId) => {
  const postRef = doc(db, 'sites', siteId, 'postsData', postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    return postSnap.data(); // returns the post object
  } else {
    throw new Error('Post not found');
  }
}

export const getPostBySlug = async (siteId, slug) => {
  try {
    const postsRef = collection(db, "sites", siteId, "postsData");
    const q = query(postsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};

// delete a post
export const deletePost = async (siteId, postId) => {
  try {
    const postRef = doc(db, "sites", siteId, "postsData", postId);
    await deleteDoc(postRef);
    toast.success("Post deleted successfully");
    console.log(`Post with ID ${postId} deleted successfully`);
  } catch (error) {
    toast.error("Failed to delete post");
    console.error("Error deleting post:", error);
  }
};

// update a post
export const updatePost = async (siteId, postId, updatedData) => {
  try {
    const postRef = doc(db, "sites", siteId, "postsData", postId);
    await updateDoc(postRef, updatedData);
    toast.success("Post updated successfully");
    console.log(`Post with ID ${postId} updated successfully`);
  } catch (error) {
    toast.error("Failed to update post");
    console.error("Error updating post:", error);
  }
};



// add new review
export const addReviewData = async (siteId, reviewData) => {
  try {
    const reviewRef = collection(db, "sites", siteId, "reviewsData");

    const newReview = {
      ...reviewData,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(reviewRef, newReview);
    toast.success("Review added successfully");
    console.log("Review added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    toast.error("Failed to publish review");
    console.error("Error adding review:", error);
  }
};


// get reviews
export const getReviewsData = async (siteId, limitCount = 10, lastDoc = null) => {
  try {
    const reviewsRef = collection(db, "sites", siteId, "reviewsData");

    const q = lastDoc
      ? query(
          reviewsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(limitCount)
        )
      : query(reviewsRef, orderBy("createdAt", "desc"), limit(limitCount));

    const snapshot = await getDocs(q);
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return {
      reviews,
      lastVisible,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { reviews: [], lastVisible: null };
  }
};

// delete review
export const deleteReview = async (siteId, reviewId) => {
  try {
    const reviewRef = doc(db, "sites", siteId, "reviewsData", reviewId);
    await deleteDoc(reviewRef);
    toast.success("Review deleted successfully");
    console.log(`Review with ID ${reviewId} deleted successfully`);
  } catch (error) {
    toast.error("Failed to delete review");
    console.error("Error deleting review:", error);
  }
};

// update review
export const updateReview = async (siteId, reviewId, updatedData) => {
  try {
    const reviewRef = doc(db, "sites", siteId, "reviewsData", reviewId);
    await updateDoc(reviewRef, updatedData);
    toast.success("Review updated successfully");
    console.log(`Review with ID ${reviewId} updated successfully`);
  } catch (error) {
    toast.error("Failed to update review");
    console.error("Error updating review:", error);
  }
};
