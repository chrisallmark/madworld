import styled from "styled-components";
import { BackgroundProps } from "./Background.types";

export const Background = styled.div<BackgroundProps>`
  background-image: url("/images/madworld-${(props) => props.background}.jpg");
  background-position: center;
  background-size: cover;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

export const Rain = styled.hr`
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: rain;
  animation-timing-function: linear;
  border-color: transparent;
  border-right-color: white;
  border-right-width: 100px;
  bottom: 100%;
  position: absolute;
  transform-origin: 100% 50%;
  width: 50px;
  @keyframes rain {
    from {
      transform: rotate(105deg) translateX(0);
    }
    to {
      transform: rotate(105deg) translateX(calc(100vh + 20px));
    }
  }
`;

export const Scanlines = styled.div`
  align-items: center;
  background-image: url("/images/scanlines.png");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  width: 100%;
`;
