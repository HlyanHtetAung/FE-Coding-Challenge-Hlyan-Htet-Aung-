import { useState, useEffect } from "react";
import axios from "axios";

export type Price = {
  currency: string;
  date: string;
  price: number;
};

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
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { data, loading, error };
}
