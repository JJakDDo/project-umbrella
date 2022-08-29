import React, { useState, useEffect, useRef } from "react";
import { DataContext } from "../context/DataContext";

import useDate from "../hooks/useDate";
import useBaseTime from "../hooks/useBaseTime";
import { seoulData } from "../data/seoul";

import Path from "./Path";

import { MapSvg, MapG, BaseDateText } from "../styles/Map";
import Forecasts from "./Forecasts";

// * 서울시 지도 svg 파일 출처:
// http://www.gisdeveloper.co.kr/?p=8555

const Seoul = () => {
  const svgRef = useRef(null);
  const [fcstData, setFcstData] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState("");
  const [transforms, setTransforms] = useState({});
  const [svgBBox, setSvgBBox] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [selectedMapName, setSelectedMapName] = useState("");
  const [opacity, setOpacity] = useState(1);
  const baseDate = useDate();
  const baseTime = useBaseTime();

  useEffect(() => {
    setSvgBBox(svgRef.current.getBBox());
    console.log(svgRef.current.getBBox());
  }, [svgRef]);

  useEffect(() => {
    console.log(selectedMapId);
  }, [selectedMapId]);

  return (
    <DataContext.Provider
      value={{
        baseDate,
        baseTime,
        svgBBox,
        fcstData,
        setFcstData,
        selectedMapId,
        setSelectedMapId,
        transforms,
        setTransforms,
        setShowForecast,
        opacity,
        setOpacity,
        svgRef,
        selectedMapName,
        setSelectedMapName,
      }}
    >
      <BaseDateText>
        기준 시간: {baseDate} {baseTime}
      </BaseDateText>
      {showForecast && <Forecasts />}
      <MapSvg
        xmlns='http://www.w3.org/2000/svg'
        transform='translate(0,0)scale(1,1)'
        viewBox='67 55 666 546'
        preserveAspectRatio='xMidYMid meet'
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
          <pattern
            id='diagonalHatch'
            patternUnits='userSpaceOnUse'
            width='4'
            height='4'
          >
            <path
              d='M-1,1 l2,-2
           M0,4 l4,-4
           M3,5 l2,-2'
              style={{ stroke: "black", strokeWidth: "1" }}
            />
          </pattern>
        </defs>
        <MapG
          transform={
            transforms.translate
              ? `translate(${transforms.translate}) scale(${transforms.scale})`
              : "translate(0,0) scale(1,1)"
          }
          filter='url(#dropshadow)'
        >
          {seoulData.map((data) => {
            return <Path key={data.id} {...data} />;
          })}
        </MapG>
      </MapSvg>
    </DataContext.Provider>
  );
};

export default Seoul;
