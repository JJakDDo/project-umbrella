import { useState, useEffect, useRef } from "react";
import { Wrapper, Bar, HourlyContainer } from "../styles/Forecast.styled";
import WeatherAnimation from "./WeatherAnimation";

function HourlyForecast({ pty, sky, index }) {
  const [timeStr, setTimeStr] = useState("");

  const convertTimeToString = (time) => {
    const hour = Number(time.slice(0, 2));
    if (hour === 18) {
      setStyles(true);
    }
    if (hour < 12) {
      setTimeStr(`오전 ${hour}시`);
      return;
    }

    setTimeStr(`오후 ${hour - 12}시`);
  };

  useEffect(() => {
    convertTimeToString(pty.fcstTime);
  }, []);
  return (
    <HourlyContainer delay={index * 0.1}>
      <WeatherAnimation
        ptyValue={pty?.fcstValue}
        skyValue={sky?.fcstValue}
        time={pty?.fcstTime}
      />
      <span>{timeStr}</span>
    </HourlyContainer>
  );
}

export default HourlyForecast;
