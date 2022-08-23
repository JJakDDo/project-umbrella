import React, { useState, useEffect, useRef } from "react";

import { ForecastContainer, CloseContainer } from "../styles/Forecast.styled";
import HourlyForecast from "./HourlyForecast";
import { IoCloseCircle } from "react-icons/io5";

const Forecasts = ({
  fcstData,
  setTransforms,
  setSelectedMapId,
  setOpacity,
  setShowForecast,
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

  useEffect(() => {
    setPtyData(fcstData.filter((data) => data.category === "PTY"));
    setSkyData(fcstData.filter((data) => data.category === "SKY"));
  }, [fcstData]);

  return (
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
      <CloseContainer onClick={showFullMap}>
        <IoCloseCircle style={{ pointerEvents: "none" }} />
      </CloseContainer>
    </ForecastContainer>
  );
};

export default Forecasts;
