import { useState, useEffect } from "react";
import { FetchData } from "../components/Forecast";

function useFetch(url: string): [boolean, FetchData] {
  // Type에 지정한 키값에 맞게 초기화 시켜준다.
  const [data, setData] = useState<FetchData>({
    response: { body: { items: { item: [] } }, header: { resultCode: "" } },
  });
  const [error, setError] = useState(true);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data: FetchData) => {
          if (data.response.header.resultCode === "00") {
            setData(data);
            setError(false);
          }
        });
    }
  }, [url]);

  return [error, data];
}

export default useFetch;
