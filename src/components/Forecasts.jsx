import React, { useState, useEffect, useRef } from "react";

import {
  ForecastContainer,
  CloseContainer,
  Title,
  Navigation,
  Container,
} from "../styles/Forecast.styled";
import HourlyForecast from "./HourlyForecast";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

import fetchData from "../utils/fetchData";
import { seoulData } from "../data/seoul";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Forecasts = () => {
  const {
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
    selectedMapName,
    setSelectedMapName,
  } = useContext(DataContext);
  const [ptyData, setPtyData] = useState([]);
  const [skyData, setSkyData] = useState([]);
  const [buttonPosition, setButtonPosition] = useState({});

  const showFullMap = () => {
    setTransforms({ scale: 1 });
    setSelectedMapId("");
    setOpacity(1);
    setShowForecast(false);
  };

  const showNextRegion = async (direction) => {
    const currentPath = svgRef.current.getElementById(`${selectedMapId}`);
    let nextIndex = Number(selectedMapId) + direction;
    if (nextIndex < 0) {
      nextIndex = seoulData.length - 1;
    } else if (nextIndex >= seoulData.length) {
      nextIndex = 0;
    }
    setSelectedMapId(nextIndex + "");

    const nextPath = svgRef.current.getElementById(`${nextIndex}`);

    // 다음 지역으로 이동하는 애니메이션 로직
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

    // 다음 지역의 기상예보 정보 가져오기
    const data = await fetchData(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?ServiceKey=${
        import.meta.env.VITE_KEY
      }&pageNo=1&numOfRows=24&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${
        seoulData[nextIndex].x
      }&ny=${seoulData[nextIndex].y}`
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
    <Container>
      <Navigation>
        <div onClick={() => showNextRegion(-1)}>
          <MdOutlineNavigateBefore />
        </div>
        <p>{seoulData[selectedMapId].name}</p>
        <div onClick={() => showNextRegion(1)}>
          <MdOutlineNavigateNext />
        </div>
      </Navigation>
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
    </Container>
  );
};

export default Forecasts;
