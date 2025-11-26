import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const useGetActivePage = () => {

const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get('page');
    setActivePage(pageFromUrl);
  }, [location.search])

  return {activePage, setActivePage, path : location.pathname.slice(1, location.pathname.length)}
}

export default useGetActivePage