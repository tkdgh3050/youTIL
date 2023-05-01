import styled from 'styled-components';

export const VideoViewFlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: var(--padding-size-l);
  & iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const LeftWrapper = styled.div`
  flex: 1 1 70%;
  @media screen and (max-width: 768px) {
    width: 93vw;
    flex-direction: column;
  }
`;

export const VideoViewOperationDivWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: var(--padding-size-m);
  & button {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: var(--padding-size-s);
  }
`;

export const EditorDivWrapper = styled.div`
  flex: 1 1 30%;
  padding-left: var(--padding-size-m);
  @media screen and (max-width: 768px) {
    padding-left: 0;
    width: 93vw;
  }
  /* .wrapper-class {
    margin: 0 auto;
    margin-bottom: 4rem;
  }
  .editor {
    height: 90vh;
    border: 1px solid #f1f1f1;
    padding: 5px;
    border-radius: 2px;
  } */
`;
