import styled from "styled-components";

export const Dropdown = styled.div`
  .ui {
    .menu {
      background-color: #272a2a;
      top: 37px;
    }
    &.selection {
      &.dropdown {
        background-color: #272a2a;
        .item {
          border-top: none;
        }
      }
      &.dropdown:focus,
      &.active.dropdown,
      &.active.dropdown .menu {
        border-color: #c41f1f;
      }
    }
    .icon,
    .text {
      color: white;
    }
  }
`;

export const MadWorldLogo = styled.img`
  max-width: 1366px;
  width: 100%;
`;
