import React, { useState, useEffect, useRef } from "react";

import {
  ForecastContainer,
  CloseContainer,
  Title,
} from "../styles/Forecast.styled";
import HourlyForecast from "./HourlyForecast";
import { IoCloseCircle } from "react-icons/io5";

import fetchData from "../utils/fetchData";
import { seoulData } from "../data/seoul";

const Forecasts = ({
  baseTime,
  baseDate,
  fcstData,
  setFcstData,
  setTransforms,
  setSelectedMapId,
  setOpacity,
  setShowForecast,
  selectedMapId,
  svgRef,
  transforms,
}) => {
  const [ptyData, setPtyData] = useState([]);
  const [skyData, setSkyData] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({});

  const handleMouseMove = (e) => {
    console.log(e.target.tagName);
    const { top, left, width, height } = e.target.getBoundingClientRect();
    const x = e.pageX - left;
    const y = e.pageY - top;
    const centerX = x - width / 2;
    const centerY = y - height / 2;
    console.log(x, y);
    console.log(width, height);
    console.log(centerX, centerY);
    setButtonPosition({ centerX, centerY });
  };

  const showFullMap = () => {
    setTransforms({ scale: 1 });
    setSelectedMapId("");
    setOpacity(1);
    setShowForecast(false);
  };

  const showNextRegion = async () => {
    const currentPath = svgRef.current.getElementById(`${selectedMapId}`);
    let nextMapId = "0";
    let nextPath = svgRef.current.getElementById(
      `${Number(selectedMapId) + 1}`
    );
    if (nextPath === null) {
      nextPath = svgRef.current.getElementById(nextMapId);
      setSelectedMapId("0");
    }
    nextMapId = Number(selectedMapId) + 1 + "";
    setSelectedMapId(nextMapId);
    const { x: cx, y: cy, width: cw, height: ch } = currentPath.getBBox();
    const { x: nx, y: ny, width: nw, height: nh } = nextPath.getBBox();
    const transfromX = cx + cw / 2 - (nx + nw / 2);
    const transfromY = cy + ch / 2 - (ny + nh / 2);
    setOpacity(1);
    setShowForecast(false);
    setTransforms({
      translate: [
        transfromX * 3 + transforms.translate[0],
        transfromY * 3 + transforms.translate[1],
      ],
      scale: 3,
    });
    const data = await fetchData(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${
        import.meta.env.VITE_KEY
      }&pageNo=1&numOfRows=24&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${
        seoulData[nextMapId].x
      }&ny=${seoulData[nextMapId].y}`
    );
    setFcstData(data);
    setTimeout(() => {
      setOpacity(0.2);
      setShowForecast(true);
    }, 1000);
  };

  useEffect(() => {
    setPtyData(fcstData.filter((data) => data.category === "PTY"));
    setSkyData(fcstData.filter((data) => data.category === "SKY"));
  }, [fcstData]);

  return (
    <>
      <Title>
        <button onClick={showNextRegion}>다음</button>
      </Title>
      <ForecastContainer>
        {ptyData.map((elem, index) => {
          return (
            <HourlyForecast
              key={index}
              pty={elem}
              sky={skyData[index]}
              index={index}
            />
          );
        })}
      </ForecastContainer>
      <CloseContainer onClick={showFullMap}>
        <IoCloseCircle style={{ pointerEvents: "none" }} />
      </CloseContainer>
    </>
  );
};

export default Forecasts;
