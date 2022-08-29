import styled, { keyframes, css } from "styled-components";

const entranceAnimation = keyframes`
  60%{
    transform: translateY(0px);
  }
  70%{
    transform: translateY(40px);
  }
  80%{
    transform: translateY(15px);
  }
  90%{
    transform: translateY(25px);
  }
  100%{
    transform: translateY(20px);
  }
`;

export const HourlyForecastContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const Wrapper = styled.div`
  position: relative;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
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
  display: flex;
  width: 80%;
  height: 600px;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  flex-flow: wrap;
  z-index: 10;
  overflow: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const CloseContainer = styled.div`
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
`;

export const Title = styled.div`
  font-size: 3rem;
`;

export const Navigation = styled.div`
  display: flex;
  z-index: 15;
  width: 80%;
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
