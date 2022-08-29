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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  max-width: 180px;
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 80vw;
  height: 250px;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  flex-flow: wrap;
  z-index: 10;
`;

export const CloseContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
`;

export const Title = styled.div`
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
`;

export const Navigation = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 15;
  width: 80vw;
  justify-content: space-evenly;
  align-items: center;
  cursor: default;

  font-size: 4rem;

  & > p {
    font-size: 2rem;
  }

  & > div {
    cursor: pointer;
  }
`;
