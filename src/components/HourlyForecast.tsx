import React from "react";

export interface Item {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

function HourlyForecast({
  baseDate,
  baseTime,
  category,
  fcstDate,
  fcstTime,
  fcstValue,
  nx,
  ny,
}: Item) {
  return (
    <div>
      {fcstTime.slice(0, 2)}시 {fcstValue}
    </div>
  );
}

export default HourlyForecast;
