import Link from "next/link";
import styled from "styled-components";

export const ESRB = styled.img`
  background-image: url("/images/esrb-mature-17+.png");
  margin: 1em 0;
  bottom: 0;
  height: 90px;
  min-height: 90px;
  min-width: 64px;
  position: absolute;
  width: 64px;
  @media only screen and (max-height: 500px) {
    bottom: auto;
    position: relative;
  }
`;

export const MadworldSplash = styled(Link)`
  height: 100%;
  margin: 1em 0;
  max-height: 500px;
  max-width: 500px;
  position: relative;
  width: 100%;
`;
