import React, { useEffect, useState } from "react";
import axios from "axios";
import { Adress } from "../functions/Variables";

const PriceCalculator = ({ tourData, deal }) => {
  const [promotionsData, setPromotionsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Format number as currency with commas and no decimals
  const formatCurrency = (value) => {
    if (typeof value !== "number") return "0";
    return value
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const response = await axios.post(Adress + "api/calculatePrice", {
          tour_id: tourData.id,
        });
        setPromotionsData(response.data);
      } catch (error) {
        console.error("Error fetching price:", error);
        setPromotionsData(null);
      } finally {
        setLoading(false);
      }
    };

    if (tourData?.id) {
      fetchPrice();
    }
  }, [tourData]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!promotionsData || promotionsData.length === 0) {
    return <p>No promotions available.</p>;
  }

  // Get best promotion or deal specified
  const bestPromotion = promotionsData.reduce((best, current) => {
    if (!best) return current;
    return current.totals_after_discount.general <
      best.totals_after_discount.general
      ? current
      : best;
  }, null);

  const selectedPromotion = deal
    ? promotionsData.find((promo) => promo.promotion_id === deal) ||
      bestPromotion
    : bestPromotion;

  // Decide which total to show
  const displayPrice =
    selectedPromotion.totals_after_discount &&
    Object.keys(selectedPromotion.totals_after_discount).length > 0
      ? selectedPromotion.totals_after_discount.general
      : selectedPromotion.totals_before_discount.general;

  return (
    <div>
      <p
        style={{
          color: "var(--primary-color)",
          fontSize: "24px",
          fontWeight: 600,
          fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
        }}
      >
        {formatCurrency(displayPrice)} $
      </p>
    </div>
  );
};

export default PriceCalculator;
