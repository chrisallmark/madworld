import styled from "styled-components";
import { BackgroundProps } from "./Background.types";

export const Background = styled.div<BackgroundProps>`
  background-image: url("/images/madworld-${(props) => props.background}.jpg");
  background-position: center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
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
