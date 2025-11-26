import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import ProcessText from "../functions/LanguageSorter";
import axios from "axios";

// Transforma tu lista de países para react-select

const CountrySearchSelect = ({ country, options }) => {

  //const [selectedOption, setSelectedOption] = useState(null);
  //const timeoutRef = useRef(null);
  // const fetchOpenAIPData = async (countryCode,searchText) => {
  //   console.log(countryCode,searchText)
  //   try {
  //     const apiKey = "49e8b70b8993746cd7350a96a0e2ec7a";
  //     const url = `https://api.core.openaip.net/api/airports?${country ? "country=" + countryCode + "&" : ""}search=${searchText}`;
  //     const response = await axios.get(url,
  //       {
  //         headers: {
  //           "x-openaip-api-key": apiKey,
  //         },
  //       }
  //     );
  //     const data = response.data.items || [];

  //     const formatted = data
  //       .filter((item) => item.iataCode)
  //       .map((item) => ({
  //         label: `${item.name}`,
  //         value: item.iataCode
  //       }));
        
  //     setOptions(formatted);
  //   } catch (error) {
  //     console.error("Error fetching OpenAIP data:", error);
  //   }
  // };

  // const handleInputChange = (newValue, { action }) => {
  //   if (action === "input-change") {
  //     setInputValue(newValue); // actualiza el inputValue directamente
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //     timeoutRef.current = setTimeout(() => {
  //       if (newValue.length > 2) {
  //         fetchOpenAIPData(country,newValue);
  //       }
  //     }, 1000);
  //   }
  // };

  //   const handleChange = (option) => {
  //     setSelectedOption(option);
  //     setInputValue(option ? option.label : "");
  //   };

  // const handleChange = (option) => {
  //   setSelectedOption(option);
    
  //   setInputValue(option ? option.label : "");
  // };

  const [selectedAirport, setSelectedAirport] = useState(null);

  useEffect(() => {
    setSelectedAirport(null);
  }, [country]);

  const handleSelectChange = (selectedOption) => {
    setSelectedAirport(selectedOption);
  };


  return (
    <Select
      className="airport-select"
      value={selectedAirport}
      onChange={handleSelectChange}
      options={options}
      placeholder={ProcessText('Search for your nearest airport...***Busque su aeropuerto mas cercano')}
      isClearable
      name="airport"
    />
  );
};

export default CountrySearchSelect;
