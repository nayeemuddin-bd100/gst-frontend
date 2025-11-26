import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import useGetActivePage from "../../functions/useGetActivePage";
import { LiaAngleDownSolid, LiaAngleUpSolid } from "react-icons/lia";
import { usePageData } from "../../modules/PageDataContext";
import SignOutButton from "./SignOutButton";

const sidebarPageTabs = [
  { id: "header", name: "Header" },
  { id: "footer", name: "Footer" },
  { id: "home", name: "Home" },
  { id: "small-groups", name: "Small Groups" },
  { id: "solo-travel", name: "Solo Travel" },
  { id: "tech-on-tours", name: "Mobile App" },
  { id: "video-gallery", name: "Video gallery" },
  { id: "private-touring", name: "Private Tour" },
  { id: "social-content", name: "Social Content" },
  { id: "explore-tours", name: "Explore Tours" },
  { id: "why-gst", name: "Why GST" },
  { id: "reviews", name: "Reviews Page" },
];

const sidebarContentsTabs = [
  { id: "content-social-posts", name: "Social Posts List" },
  { id: "content-reviews-list", name: "Reviews List" },
];

const STORAGE_KEYS = {
  pages: "sidebar_isPagesOpen",
  contents: "sidebar_isContentsOpen",
  pagesUserToggled: "sidebar_pagesUserToggled",
  contentsUserToggled: "sidebar_contentsUserToggled",
};

const Sidebar = () => {
  const { activePage } = useGetActivePage();

  // State and flags for user toggling
  const [isPagesOpen, setIsPagesOpen] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.pages);
    return saved === null ? false : JSON.parse(saved);
  });
  const [isContentsOpen, setIsContentsOpen] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.contents);
    return saved === null ? false : JSON.parse(saved);
  });

  const pagesUserToggled = useRef(false);
  const contentsUserToggled = useRef(false);

  // Load user toggled flags from localStorage once
  useEffect(() => {
    pagesUserToggled.current =
      localStorage.getItem(STORAGE_KEYS.pagesUserToggled) === "true";
    contentsUserToggled.current =
      localStorage.getItem(STORAGE_KEYS.contentsUserToggled) === "true";
  }, []);

  // Auto-open Pages section ONLY if activePage inside AND user hasn't toggled manually
  useEffect(() => {
    const inPages = sidebarPageTabs.some((item) => item.id === activePage);
    if (inPages && !isPagesOpen && !pagesUserToggled.current) {
      setIsPagesOpen(true);
    }
  }, [activePage, isPagesOpen]);

  // Auto-open Contents section ONLY if activePage inside AND user hasn't toggled manually
  useEffect(() => {
    const inContents = sidebarContentsTabs.some(
      (item) => item.id === activePage
    );
    if (inContents && !isContentsOpen && !contentsUserToggled.current) {
      setIsContentsOpen(true);
    }
  }, [activePage, isContentsOpen]);

  // Save states to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(isPagesOpen));
  }, [isPagesOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.contents, JSON.stringify(isContentsOpen));
  }, [isContentsOpen]);

  // Toggle handlers that also mark user toggled flag and save it
  const togglePages = () => {
    setIsPagesOpen((prev) => {
      const newState = !prev;
      localStorage.setItem(STORAGE_KEYS.pages, JSON.stringify(newState));
      pagesUserToggled.current = true;
      localStorage.setItem(STORAGE_KEYS.pagesUserToggled, "true");
      return newState;
    });
  };

  const toggleContents = () => {
    setIsContentsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem(STORAGE_KEYS.contents, JSON.stringify(newState));
      contentsUserToggled.current = true;
      localStorage.setItem(STORAGE_KEYS.contentsUserToggled, "true");
      return newState;
    });
  };

  return (
    <div className="dash-sidebar">
      
      <ColorPicker />
      
      <AccordionSection
        title="Edit Pages"
        items={sidebarPageTabs}
        activePage={activePage}
        isOpen={isPagesOpen}
        toggleOpen={togglePages}
      />
      <AccordionSection
        title="Contents"
        items={sidebarContentsTabs}
        activePage={activePage}
        isOpen={isContentsOpen}
        toggleOpen={toggleContents}
      />


      <SignOutButton />

    </div>
  );
};

export default Sidebar;

const AccordionSection = ({ title, items, activePage, isOpen, toggleOpen }) => {
  return (
    <div style={{ marginTop: title === "Contents" ? "30px" : "0" }}>
      <h2
        onClick={toggleOpen}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title} {isOpen ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="s-tabs-wrapper"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/dashboard?page=${item.id}`}
                className={`s-tab ${activePage === item.id ? "active" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ColorPicker = () => {
  const { primaryColor, setPrimaryColor } = usePageData();

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);

  return (
    <div className="color-picker">
      <div>
        <label htmlFor="color">Theme Color: </label>
        <input
          type="color"
          id="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>
    </div>
  );
};
