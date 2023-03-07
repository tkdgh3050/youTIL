import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainVideoDivWrapper = styled(Link)`
  display: flex;
  align-items: baseline;
  width: 100%;
  padding: var(--padding-size-m) var(--padding-size-s);
  transition: background-color 0.3s;
  cursor: pointer;
  :hover {
    background-color: var(--color-gray-light);
  }
`;

export const FirstTitleSpan = styled.span`
  flex: 1 1 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SecondTimeSpan = styled.span`
  display: flex;
  flex: 1 1 45%;
  justify-content: flex-end;
  color: var(--color-gray);
  font-size: 12px;
`;
