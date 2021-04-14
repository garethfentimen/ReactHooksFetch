import { useState, useEffect } from "react";
 
function useFetch<T>(url: string, userId: string): [T | undefined, boolean, string, Function] {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { 
          headers: {
            userId
          }
        });
        const json = await response.json();
 
        if (json) {
          setLoading(false);
          setData(json);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
 
      setLoading(false);
    }
 
    fetchData();
  }, [url, userId]);
 
  return [ data, loading, error, setData ];
}
 
export default useFetch;
