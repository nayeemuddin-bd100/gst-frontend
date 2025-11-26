// import LandingPage from "./pages/LandingPage";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import TourView from "./pages/TourView";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./modules/header";
// import Footer from "./modules/Footer";
// import Tours from "./pages/Tours";
// import Category from "./pages/CategoryResume";
// import ExploreTours from "./pages/ExploreTours";
// import SmallGroups from "./pages/SmallGroups";
// import SoloTravel from "./pages/SoloTravel";
// import PrivateTouring from "./pages/PrivateTouring";
// import WhyGST from "./pages/WhyGST";
// import TechOnTours from "./pages/TechOnTours";
// import VideoGallery from "./pages/VideoGallery";
// import Reviews from "./pages/Reviews";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/tours" element={<Tours />} />
//         <Route path="/viewTour" element={<TourView />} />
//         <Route path="/category" element={<Category />} />
//         <Route path="/explore-tours" element={<ExploreTours />} />
//         <Route path="/small-groups" element={<SmallGroups />} />
//         <Route path="/solo-travel" element={<SoloTravel />} />
//         <Route path="/private-touring" element={<PrivateTouring />} />
//         <Route path="/why-gst" element={<WhyGST />} />
//         <Route path="/tech-on-tours" element={<TechOnTours />} />
//         <Route path="/videos" element={<VideoGallery />} />
//         <Route path="/reviews" element={<Reviews />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;

import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TourView from "./pages/TourView";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./modules/header";
import Footer from "./modules/Footer";
import Tours from "./pages/Tours";
import Category from "./pages/CategoryResume";
import ExploreTours from "./pages/ExploreTours";
import SmallGroups from "./pages/SmallGroups";
import SoloTravel from "./pages/SoloTravel";
import PrivateTouring from "./pages/PrivateTouring";
import WhyGST from "./pages/WhyGST";
import TechOnTours from "./pages/TechOnTours";
import VideoGallery from "./pages/VideoGallery";
import Reviews from "./pages/Reviews";
import Deals from "./pages/Deals";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "sonner";
import CreateSocialPost from "./components/dashboard/form-components/CreateSocialPost";
import UpdateSocialPost from "./components/dashboard/form-components/UpdateSocialPost";
import { usePageData } from "./modules/PageDataContext";
import Loader from "./components/Loader";
import SocialContent from "./pages/SocialContent";
import DashLogin from "./components/dashboard/DashLogin";
import DashPrivateRoute from "./components/dashboard/DashPrivateRoute";
import AddNewReview from "./components/dashboard/form-components/AddNewReview";
import EditReview from "./components/dashboard/form-components/EditReview";

// Este componente lo usaremos para aplicar location.key
const AppRoutes = () => {
  const location = useLocation();

  const hideLayoutRoutes = ["/dashboard", "/admin-login"];
  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes location={location} key={location.key}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/viewTour" element={<TourView />} />
        <Route path="/category" element={<Category />} />
        <Route path="/explore-tours" element={<ExploreTours />} />
        <Route path="/small-groups" element={<SmallGroups />} />
        <Route path="/solo-travel" element={<SoloTravel />} />
        <Route path="/private-touring" element={<PrivateTouring />} />
        <Route path="/why-gst" element={<WhyGST />} />
        <Route path="/tech-on-tours" element={<TechOnTours />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/social-contents/:slug" element={<SocialContent />} />


        <Route path="/admin-login" element={<DashLogin />} />


        <Route path="/dashboard" element={<DashPrivateRoute><Dashboard /></DashPrivateRoute>}>
          <Route path="create-post" element={<CreateSocialPost />} />
          <Route path="update-post/:id" element={<UpdateSocialPost />} />
          <Route path="add-review" element={<AddNewReview />} />
          <Route path="edit-review/:id" element={<EditReview />} />
        </Route>
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
  const { loading } = usePageData();
  return (
    <Router>
      {loading ? (
        <div className="main-loader"><Loader /></div>
      ) : (
        <>
          <AppRoutes />
          <Toaster position="top-center" />
        </>
      )}
    </Router>
  );
};

export default App;
