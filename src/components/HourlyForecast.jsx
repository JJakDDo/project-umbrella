import { useState, useEffect, useRef } from "react";
import { Bar, HourlyContainer } from "../styles/Forecast.styled";

function HourlyForecast({
  baseDate,
  baseTime,
  category,
  fcstDate,
  fcstTime,
  fcstValue,
  nx,
  ny,
}) {
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    //canvas사이즈를 css에서 리사이즈하게되면 스케일까지 바뀌게된다.
    //그래서 js에서 직접 width와 height를 지정해준다.
    canvas.width = 100;
    canvas.height = 350;
    setCtx(canvas.getContext("2d"));
  }, []);

  useEffect(() => {
    if (ctx) {
      console.log(canvasRef.current.width);
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "#00c7eb";
      ctx.fillRect(0, 250, 100, 100);
    }
  }, [ctx]);

  return (
    <HourlyContainer>
      <Bar>
        <canvas ref={canvasRef}></canvas>
      </Bar>
      <span>{fcstTime.slice(0, 2)} 시</span>
    </HourlyContainer>
  );
}

export default HourlyForecast;
