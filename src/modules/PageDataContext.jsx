import { createContext, useContext, useEffect, useState } from "react";
import {
  exploreToursPageMockData,
  footerMockData,
  headerMockData,
  homePageMockData,
  mobileAppPageMockData,
  privateTourPageMockData,
  reviewsPageMockData,
  smallGroupPageMockData,
  socialContentPageMockData,
  soloTravelPageMockData,
  videoGalleryPageMockData,
  whyGSTPageMockData,
} from "../functions/pageMockData";
import { toast } from "sonner";
import { savePageData } from "../firebase/actions";
import { getPageData } from "../firebase/actions";

const SITE_ID = import.meta.env.VITE_SITE_ID;

const PageDataContext = createContext();

const isEmpty = (value) => {
  if (value == null) return false; 
  if (Array.isArray(value)) return value.length === 0 ? false : value;
  if (typeof value === 'object') return Object.keys(value).length === 0 ? false : value;
  return value; 
};



export const PageDataProvider = ({ children }) => {
  const [pagesData, setPagesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [socialPosts, setSocialPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [primaryColor, setPrimaryColor] = useState(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim()
  );

  const [headerData, setHeaderData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [homePageData, setHomePageData] = useState(null);
  const [smallGroupPageData, setSmallGroupPageData] = useState(null);
  const [soloTravelPageData, setSoloTravelPageData] = useState(null);
  const [mobileAppPageData, setMobileAppPageData] = useState(null);
  const [videoGalleryPageData, setVideoGalleryPageData] = useState(null);
  const [privateTourPageData, setPrivateTourPageData] = useState(null);
  const [socialContentPageData, setSocialContentPageData] = useState(null);
  const [exploreTourPageData, setExploreTourPageData] = useState(null);
  const [whyGSTPageData, setWhyGSTPageData] = useState(null);
  const [reviewsPageData, setReviewsPageData] = useState(null);

  // Get all pages data
  useEffect(() => {
    const getPages = async () => {
      try {
        setLoading(true);
        const data = await getPageData(SITE_ID);

        if (data) {
          setPagesData(data);
        }
        setHeaderData(data?.header || headerMockData);
        setFooterData(data?.footer || footerMockData);
        setHomePageData(data?.home || homePageMockData);
        setSmallGroupPageData(data?.smallGroup || smallGroupPageMockData);
        setSoloTravelPageData(data?.soloTravel || soloTravelPageMockData);
        setMobileAppPageData(data?.mobileApp || mobileAppPageMockData);
        setVideoGalleryPageData(data?.videoGallery || videoGalleryPageMockData);
        setPrivateTourPageData(data?.privateTour || privateTourPageMockData);
        setSocialContentPageData(
          data?.socialContent || socialContentPageMockData
        );
        setExploreTourPageData(data?.exploreTour || exploreToursPageMockData);
        setWhyGSTPageData(data?.whyGST || whyGSTPageMockData);
        setReviewsPageData(data?.reviews || reviewsPageMockData);

        // set primary color
        setPrimaryColor(data?.primaryColor || "#b91c22");
        document.documentElement.style.setProperty(
          "--primary-color",
          data?.primaryColor || "#b91c22"
        );

        // console.log(data)
      } catch (error) {
        console.log(error);
        toast.error("Failed to get page contents");
      } finally {
        setLoading(false);
      }
    };

    getPages();
  }, []);

  // Save page data
  const onSave = async () => {
const newPageData = {
  primaryColor: primaryColor,
  header: isEmpty(headerData) || headerMockData,
  footer: isEmpty(footerData) || footerMockData,
  home: isEmpty(homePageData) || homePageMockData,
  smallGroup: isEmpty(smallGroupPageData) || smallGroupPageMockData,
  soloTravel: isEmpty(soloTravelPageData) || soloTravelPageMockData,
  mobileApp: isEmpty(mobileAppPageData) || mobileAppPageMockData,
  videoGallery: isEmpty(videoGalleryPageData) || videoGalleryPageMockData,
  privateTour: isEmpty(privateTourPageData) || privateTourPageMockData,
  socialContent: isEmpty(socialContentPageData) || socialContentPageMockData,
  exploreTour: isEmpty(exploreTourPageData) || exploreToursPageMockData,
  whyGST: isEmpty(whyGSTPageData) || whyGSTPageMockData,
  reviews: isEmpty(reviewsPageData) || reviewsPageMockData,
};

    try {
      await savePageData(SITE_ID, newPageData);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    loading,
    SITE_ID,
    onSave,
    pagesData,
    setPagesData,
    primaryColor,
    setPrimaryColor,
    headerData,
    footerData,
    homePageData,
    smallGroupPageData,
    soloTravelPageData,
    mobileAppPageData,
    videoGalleryPageData,
    privateTourPageData,
    socialContentPageData,
    exploreTourPageData,
    whyGSTPageData,
    reviewsPageData,
    setHeaderData,
    setFooterData,
    setHomePageData,
    setSmallGroupPageData,
    setSoloTravelPageData,
    setMobileAppPageData,
    setVideoGalleryPageData,
    setPrivateTourPageData,
    setSocialContentPageData,
    setExploreTourPageData,
    setWhyGSTPageData,
    setReviewsPageData,
    socialPosts,
    setSocialPosts,
    reviews,
    setReviews,
  };

  return (
    <PageDataContext.Provider value={values}>
      {children}
    </PageDataContext.Provider>
  );
};

export const usePageData = () => useContext(PageDataContext);
