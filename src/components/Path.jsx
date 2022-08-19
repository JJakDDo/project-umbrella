import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import { MapPath, MapText } from "../styles/Map";
import WeatherIcon from "./WeatherIcon";
const Path = ({
  id,
  d,
  name,
  x,
  y,
  tx,
  ty,
  baseDate,
  baseTime,
  setFcstData,
  setTransforms,
  svgBBox,
  setSelectedMapId,
  selectedMapId,
  setShowForecast,
}) => {
  const [fcstValue, setFcstValue] = useState("");
  const [opacity, setOpacity] = useState(1);
  const transformX = useRef(0);
  const transformY = useRef(0);

  const fetchData = async (url) => {
    const data = await axios.get(url);
    const header = data.data.response.header;
    const body = data.data.response.body;
    if (header.resultCode === "00") {
      setFcstData(
        body.items.item.filter(
          (item) => item.category === "PTY" || item.category === "SKY"
        )
      );
    }
  };

  const onClickHandler = async (e) => {
    if (selectedMapId === "") {
      const { x: vx, y: vy, width: vw, height: vh } = svgBBox;
      const { x: bx, y: by, width: bw, height: bh } = e.target.getBBox();
      transformX.current = -bx * 3 + vx + vw / 2 - (bw * 3) / 2;
      transformY.current = -by * 3 + vy + vh / 2 - (bh * 3) / 2;
      setTransforms({
        translate: [transformX.current, transformY.current],
        scale: 3,
      });
      setSelectedMapId(e.target.id);
      await fetchData(
        `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${
          import.meta.env.VITE_KEY
        }&pageNo=1&numOfRows=24&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`
      );
      setTimeout(() => {
        setOpacity(0.2);
        setShowForecast(true);
      }, 1000);
    } else {
      setTransforms({ scale: 1 });
      setSelectedMapId("");
      setFcstValue("");
      setOpacity(1);
      setShowForecast(false);
    }
  };

  return (
    <>
      <MapPath
        id={`${id}`}
        d={d}
        zoomed={selectedMapId !== ""}
        opacity={opacity}
        animation={selectedMapId === "" || id === selectedMapId}
        onClick={onClickHandler}
      ></MapPath>
      <MapText animation={selectedMapId === ""} x={tx} y={ty}>
        {name}
      </MapText>
      {selectedMapId !== "" && <WeatherIcon fcst={fcstValue} tx={tx} ty={ty} />}
    </>
  );
};

export default Path;
