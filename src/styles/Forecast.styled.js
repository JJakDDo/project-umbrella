import styled from "styled-components";

export const HourlyForecastContainer = styled.div`
  display: flex;
  width: 90vw;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const HourlyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 230px;
  background-color: #1a1a1a;
  border-radius: 20px;
  border: 3px solid #eaeaea;
`;

export const Bar = styled.div`
  position: relative;
  background-color: #faf7ff;
  border-radius: 15px;
  height: 350px;
  overflow: hidden;
`;

export const ForecastContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 90vw;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;
