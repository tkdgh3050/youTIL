import styled from "styled-components";

export const OverflowSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    transition: all 0.3s;
    color: var(--color-third);
  }
`;

export const StyledButton = styled.button`
  border: 1px solid;
  border-radius: 7px;
  height: 30px;
  white-space: nowrap;
  margin-left: var(--padding-size-s);
  background-color: transparent;
  &.primary {
    transition: all 0.3s;
    color: var(--color-third);
    &:hover {
      background-color: var(--color-third);
      color: var(--color-white);
    }
  }
  &.danger {
    transition: all 0.3s;
    color: var(--color-primary-dark);
    &:hover {
      background-color: var(--color-primary-dark);
      color: var(--color-white);
    }
  }
`;

export const VideoControlDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 0.5px solid var(--color-gray);
  padding: var(--padding-size-s);
`;
