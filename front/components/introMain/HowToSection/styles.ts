import styled from "styled-components";

export const CustomDivider = styled.div`
  position: relative;
  top: 100px;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  @media screen and (max-width: 768px) {
    top: 50px;
  }

  & svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 100px;
    @media screen and (max-width: 768px) {
      height: 50px;
    }
  }

  & .shape-fill {
    fill: #ffffff;
  }
`;

export const LineDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: var(--padding-size-m);
  & span {
    flex: 1 1 40%;
    text-align: center;
    font-size: max(25px, 3vw);
    color: var(--color-white);
  }
  & div {
    flex: 1 1 60%;
    & img {
      width: 50vw;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    & div {
      & img {
        width: 80vw;
      }
    }
  }
`;
