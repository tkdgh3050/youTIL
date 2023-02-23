import styled from "styled-components";

export const ListDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & .bookmarkSpanPointer {
    cursor: pointer;
    transition: all 0.3s;
    :hover {
      color: var(--color-third);
    }
  }
`;

export const ListControlDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .active {
    & .fa-play {
      transform: rotate(90deg);
    }
  }
`;
