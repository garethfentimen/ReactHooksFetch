import { useState, useEffect } from "react";
 
function useFetch(url: string, userId: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url, { 
          headers: {
            userId
          }
        });
        const json = await data.json();
 
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
 
  return [ data, loading, error ];
}
 
export default useFetch;
