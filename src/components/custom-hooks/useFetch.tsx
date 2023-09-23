import axios from "axios";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  productName: string;
  details: {
    brand: string;
    model: string;
  };
  dispatchTime: string;
  price: number;
  productImage: string;
}

interface UseFetchResult {
  data: Product[] | null;
  isPending: boolean;
  error: string | null;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        // Check if the response status code is in the 200-299 range (success)

        if (response.status >= 200 && response.status < 300) {
          const responseData = response.data;
          setData(responseData);
          setIsPending(false);
          setError(null);
        } else {
          throw new Error("Error in fetching data.");
        }
      } catch (error: unknown) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
