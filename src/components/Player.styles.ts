import styled from "styled-components";

export const Dropdown = styled.div`
  .ui {
    .menu {
      background-color: black;
      > .message:not(.ui) {
        color: #890302;
      }
    }
    &.search {
      background-color: #272a2a;
      input {
        color: white;
      }
    }
    &.selection.dropdown .item {
      border-top: none;
    }
    .text {
      color: white;
    }
  }
`;

export const MadWorldLogo = styled.img`
  max-width: 1180px;
  width: 100%;
`;
