import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { GoDownload } from "react-icons/go";

const DownloadPostUrlList = () => {
    const siteId =  import.meta.env.VITE_SITE_ID;
     const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const slugs = [];

    try {
      const postsRef = collection(db, "sites", siteId, "postsData");
      const snapshot = await getDocs(postsRef);

      const baseUrl = window.location.origin; // dynamically get the site's URL

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.slug) {
          const url = `${baseUrl}/#/social-contents/${data.slug}`;
          slugs.push(url);
        }
      });

      const textContent = slugs.join("\n");
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "post-urls.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate posts url list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="btn-primary my"
    >
      {loading ? "Generating..." : <div className="flex"><GoDownload /> Download Post URLs</div>}
    </button>
  )
}

export default DownloadPostUrlList