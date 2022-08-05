import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import useDate from "../hooks/useDate";
import useBaseTime from "../hooks/useBaseTime";
import HourlyForecast, { Item } from "./HourlyForecast";

// 타입스크립트에서는 Object 에 들어갈 값들의 타입을 미리 지정해줘야한다.
// Object에 어떤 타입이 들어가는지 아는 경우에는 key: type; 으로 해주고
// 만약 모른다면 [key: string]: any; 이렇게 지정해준다.

const mockData: Item[] = [
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127,
  },
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127,
  },
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127,
  },
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127,
  },
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "1",
    nx: 60,
    ny: 127,
  },
  {
    baseDate: "20220805",
    baseTime: "1430",
    category: "PTY",
    fcstDate: "20220805",
    fcstTime: "1500",
    fcstValue: "0",
    nx: 60,
    ny: 127,
  },
];

export interface FetchData {
  response: {
    body: {
      items: {
        item: Item[];
      };
    };
    header: {
      resultCode: string;
    };
  };
}

function Forecast() {
  // typescript에서 useState를 빈배열로 초기화시키면 never type으로 인식이 되기 때문에 구체적인 타입을 지정해줘야한다.
  const [pty, setPty] = useState<Item[]>([]);
  const [rn1, setRn1] = useState<Item[]>([]);
  const [url, setUrl] = useState<string>("");
  const baseDate = useDate();
  const baseTime = useBaseTime();

  //vite에서는 .env 파일에 접근하기 위해서 import.meta.env 를 사용한다.
  //그리고 환경변수 들의 이름은 VITE_로 시작해야한다.
  const [error, data] = useFetch(url);

  useEffect(() => {
    if (!error) {
      const items = data.response.body.items.item;
      setPty(
        items.filter(
          (item) => item.category === "PTY" /*||
          item.category === "RN1" ||
          item.category === "SKY"*/
        )
      );
      setRn1(
        items.filter(
          (item) => item.category === "RN1" /*||
          item.category === "RN1" ||
          item.category === "SKY"*/
        )
      );
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
      <span>
        {pty.every((item) => item.fcstValue === "0")
          ? "외출 시 우산은 필요없습니다"
          : "외출 시 우산을 챙겨주세요!"}
      </span>
      <div>
        {rn1.map((item, index) => {
          return <HourlyForecast key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Forecast;
