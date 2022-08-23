import styled, { keyframes, css } from "styled-components";

const entranceAnimation = keyframes`
  60%{
    transform: translateY(30px);
  }
  70%{
    transform: translateY(70px);
  }
  80%{
    transform: translateY(45px);
  }
  90%{
    transform: translateY(55px);
  }
  100%{
    transform: translateY(50px);
  }
`;

export const HourlyForecastContainer = styled.div`
  display: flex;
  width: 90vw;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const HourlyContainer = styled.div`
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 230px;
  background-color: #1a1a1a;
  border-radius: 20px;
  border: 3px solid #eaeaea;
  gap: 20px;
  transform: translateY(700px);
  animation: ${({ delay }) =>
    css`
      ${entranceAnimation} 0.7s ease-out forwards ${delay}s;
    `};
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
  height: 250px;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const CloseContainer = styled.div`
  position: absolute;
  bottom: -200px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
`;
