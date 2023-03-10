import styled from "styled-components";

export const ContentDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 15vh;
  justify-content: space-between;
  align-items: flex-start;
  height: 70vh;
  & .mainWrapper {
    flex: 1 1 33%;
    padding: var(--padding-size-s);
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: var(--padding-size-l);
    height: auto;
    & .mainWrapper {
      width: 90vw;
    }
  }
`;
