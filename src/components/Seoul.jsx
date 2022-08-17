import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import useDate from "../hooks/useDate";
import useBaseTime from "../hooks/useBaseTime";
import { seoulData } from "../data/seoul";

import Path from "./Path";

// * 서울시 지도 svg 파일 출처:
// http://www.gisdeveloper.co.kr/?p=8555

const Seoul = () => {
  const svgRef = useRef(null);
  const [fcstData, setFcstData] = useState([...seoulData]);
  const baseDate = useDate();
  const baseTime = useBaseTime();

  const changeRenderOrder = (id) => {
    const index = fcstData.findIndex((data) => data.id === id);
    const tempFcst = [...fcstData];
    const lastIndex = tempFcst.length - 1;
    const temp = tempFcst[lastIndex];
    tempFcst[lastIndex] = tempFcst[index];
    tempFcst[index] = temp;
    setFcstData(tempFcst);
  };

  const fetchData = async (url) => {
    const data = await axios.get(url);
    const header = data.data.response.header;
    const body = data.data.response.body;
    if (header.resultCode === "00") {
      return new Promise((response, reject) => {
        if (header.resultCode === "00") {
          console.log(body);
          response(
            body.items.item.filter((item) => item.category === "PTY")[0]
              .fcstValue
          );
        }

        reject(new Error());
      });
    }
  };

  const batchFetch = async () => {
    const results = [];
    for await (const data of seoulData) {
      const res = await fetchData(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${
          import.meta.env.VITE_KEY
        }&pageNo=1&numOfRows=24&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${
          data.x
        }&ny=${data.y}`
      );
      results.push(res);
    }
    setFcstData(
      seoulData.map((data, index) => {
        return { ...data, fcst: results[index] };
      })
    );
  };

  useEffect(() => {
    //batchFetch();
  }, [baseDate, baseTime]);

  return (
    <>
      <p>
        기준 시간: {baseDate} {baseTime}
      </p>
      <button onClick={batchFetch}>데이터 가져오기</button>
      <svg
        style={{
          background: "#242424",
          overflow: "visible",
          height: "650px",
          width: "800px",
        }}
        xmlns='http://www.w3.org/2000/svg'
        ref={svgRef}
      >
        <defs>
          <filter id='dropshadow'>
            <feGaussianBlur in='SourceAlpha' stdDeviation='7' />
            <feOffset dx='0' dy='0' result='offsetblur' />
            <feMerge>
              <feMergeNode />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          <filter id='dropshadow2'>
            <feGaussianBlur in='SourceAlpha' stdDeviation='1.4' />
            <feOffset dx='1' dy='1' result='offsetblur' />
            <feMerge>
              <feMergeNode />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          {/*glow 효과
          // https://gist.github.com/lukeeey/fe79f682d06056205e1907a350c15524*/}

          <filter id='glow' height='300%' width='300%' x='-75%' y='-75%'>
            <feMorphology
              operator='dilate'
              radius='4'
              in='SourceAlpha'
              result='thicken'
            />
            <feGaussianBlur in='thicken' stdDeviation='4' result='blurred' />
            <feFlood floodColor='#eaeaea' result='glowColor' />
            <feComposite
              in='glowColor'
              in2='blurred'
              operator='in'
              result='softGlow_colored'
            />
            <feMerge>
              <feMergeNode in='softGlow_colored' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
        <g filter='url(#dropshadow)'>
          {fcstData.map((data) => {
            return (
              <Path
                key={data.id}
                id={data.id}
                name={data.name}
                d={data.d}
                tx={data.tx}
                ty={data.ty}
                fcst={data.fcst}
                changeRenderOrder={changeRenderOrder}
              />
            );
          })}
        </g>
        <g filter='url(#dropshadow2)'></g>
      </svg>
    </>
  );
};

export default Seoul;
