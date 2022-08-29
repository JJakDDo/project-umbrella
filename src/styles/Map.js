import styled, { keyframes, css } from "styled-components";

const disappear = keyframes`
  100% {
    opacity: 0;
  }
`;

export const MapSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #242424;
  overflow: visible;
  height: 100vh;
  width: 100vw;
`;

export const MapG = styled.g`
  transition: all 0.5s linear;
`;

export const MapPath = styled.path`
  stroke-linejoin: round;
  stroke: #ffffff;
  stroke-width: 1;
  fill: ${({ zoomed }) => (zoomed ? "black" : css`url(#diagonalHatch)`)};
  animation: ${({ animation }) =>
    !animation
      ? css`
          ${disappear} 0.5s linear forwards;
        `
      : ""};
  opacity: ${({ opacity }) => opacity};
  &:hover {
    fill: black;
  }
  transition: opacity 0.5s linear;
`;

export const MapText = styled.text`
  fill: #ffffff;
  font-size: 16px;
  font-weight: bolder;
  text-anchor: middle;
  alignment-baseline: middle;
  animation: ${({ animation }) =>
    !animation
      ? css`
          ${disappear} 0.5s linear forwards;
        `
      : ""};
`;

export const BaseDateText = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 10;
`;
