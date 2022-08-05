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
  flex-direction: column;
  gap: 10px;
`;

export const Bar = styled.div`
  position: relative;
  background-color: #faf7ff;
  border-radius: 15px;
  height: 350px;
  overflow: hidden;
`;
