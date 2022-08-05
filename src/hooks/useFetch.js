import { useState, useEffect } from "react";

function useFetch(url) {
  // Type에 지정한 키값에 맞게 초기화 시켜준다.
  const [data, setData] = useState({});
  const [error, setError] = useState(true);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
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
