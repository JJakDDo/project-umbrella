import { HourlyContainer } from "../styles/Forecast.styled";
import WeatherAnimation from "./WeatherAnimation";
import useConversion from "../hooks/useConversion";

function HourlyForecast({ pty, sky, index }) {
  const [timeStr] = useConversion(pty.fcstTime);

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
