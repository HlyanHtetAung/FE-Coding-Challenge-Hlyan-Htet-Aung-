import { useState, useEffect } from "react";
import axios from "axios";
import type { Price } from "../../types";

export function usePrices() {
  const [data, setData] = useState<Price[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pricesApiUrl = import.meta.env.VITE_PRICES_API_URL;

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Price[]>(pricesApiUrl);
        const rawData = response.data;

        // *** Sort by date newest to oldest ***
        const sortedData = [...rawData].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // *** Filter for unique currencies ***
        const cleanedData = sortedData.filter((item, index, self) => {
          return self.findIndex((t) => t.currency === item.currency) === index;
        });

        setData(cleanedData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [pricesApiUrl]);

  return { data, loading, error };
}
