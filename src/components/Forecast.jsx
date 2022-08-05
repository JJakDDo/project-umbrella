import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDate from "../hooks/useDate";
import useBaseTime from "../hooks/useBaseTime";

function Forecast() {
  // typescript에서 useState를 빈배열로 초기화시키면 never type으로 인식이 되기 때문에 구체적인 타입을 지정해줘야한다.
  const [forecast, setForecast] = useState([]);
  const [pty, setPty] = useState([]);
  const [rn1, setRn1] = useState([]);
  const [url, setUrl] = useState("");
  const baseDate = useDate();
  const baseTime = useBaseTime();

  //vite에서는 .env 파일에 접근하기 위해서 import.meta.env 를 사용한다.
  //그리고 환경변수 들의 이름은 VITE_로 시작해야한다.
  const [error, data] = useFetch(url);

  useEffect(() => {
    if (!error) {
      const items = data.response.body.items.item;
      setForecast(
        items.filter(
          (item) =>
            item.category === "PTY" ||
            item.category === "RN1" ||
            item.category === "SKY"
        )
      );
      setPty(items.filter((item) => item.category === "PTY"));
      setRn1(items.filter((item) => item.category === "RN1"));
    }
  }, [data]);

  useEffect(() => {
    if (baseTime !== "" && baseDate !== "") {
      setUrl(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${
          import.meta.env.VITE_KEY
        }&pageNo=1&numOfRows=60&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=60&ny=127`
      );
    }
  }, [baseTime, baseDate]);
  return (
    <div>
      {pty.every((item) => item.fcstValue === "0")
        ? "외출 시 우산은 필요없습니다!"
        : "외출 시 우산을 챙기세요!"}
    </div>
  );
}

export default Forecast;
