import { useState, useEffect } from "react";
 
function useFetch(url: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(url);
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
  }, [url]);
 
  return { error, loading, data };
}
 
export default useFetch;
