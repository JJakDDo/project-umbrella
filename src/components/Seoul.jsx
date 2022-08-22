import React, { useState, useEffect, useRef } from "react";

import useDate from "../hooks/useDate";
import useBaseTime from "../hooks/useBaseTime";
import { seoulData } from "../data/seoul";

import Path from "./Path";

import { MapSvg, MapG } from "../styles/Map";
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
  const baseDate = useDate();
  const baseTime = useBaseTime();

  useEffect(() => {
    setSvgBBox(svgRef.current.getBBox());
  }, [svgRef]);

  return (
    <>
      <p>
        기준 시간: {baseDate} {baseTime}
      </p>
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
          {/*glow 효과
          // https://gist.github.com/lukeeey/fe79f682d06056205e1907a350c15524

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
          */}
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
            return (
              <Path
                key={data.id}
                {...data}
                baseDate={baseDate}
                baseTime={baseTime}
                setFcstData={setFcstData}
                setTransforms={setTransforms}
                svgBBox={svgBBox}
                selectedMapId={selectedMapId}
                setSelectedMapId={setSelectedMapId}
                setShowForecast={setShowForecast}
              />
            );
          })}
        </MapG>
      </MapSvg>
      {showForecast && <Forecasts fcstData={fcstData} />}
    </>
  );
};

export default Seoul;
