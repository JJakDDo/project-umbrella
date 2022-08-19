import React, { useState, useEffect, useRef } from "react";

import { ForecastContainer } from "../styles/Forecast.styled";
import HourlyForecast from "./HourlyForecast";

const Forecasts = ({ fcstData }) => {
  const [ptyData, setPtyData] = useState([]);
  const [skyData, setSkyData] = useState([]);
  useEffect(() => {
    setPtyData(fcstData.filter((data) => data.category === "PTY"));
    setSkyData(fcstData.filter((data) => data.category === "SKY"));
  }, [fcstData]);
  return (
    <ForecastContainer>
      {ptyData.map((elem, index) => {
        return <HourlyForecast key={index} pty={elem} sky={skyData[index]} />;
      })}
    </ForecastContainer>
  );
};

export default Forecasts;
