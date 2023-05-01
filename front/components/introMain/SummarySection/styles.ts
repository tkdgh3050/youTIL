import styled from 'styled-components';

export const ArticleDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    display: flex;
    font-weight: bold;
    font-size: 34px;
    & i {
      font-size: var(--font-size-m);
    }
  }

  & p {
    font-size: var(--font-size-ml);
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    align-items: center;

    & > span {
      font-size: 24px;
      & i {
        font-size: 12px;
      }
    }

    & p {
      font-size: 19px;
    }
  }
`;

export const LinkDivWrapper = styled.div`
  display: flex;
  /* padding-left: 100px; */
  align-items: center;
  height: 40px;
  padding-top: var(--padding-size-m);
  & span {
    padding: var(--padding-size-s) var(--padding-size-l);
    border-radius: 15px;
    background-color: var(--color-white);
    font-size: 15px;
    font-weight: bold;
    box-shadow: 2px 2px 2px;
    transition: all 0.3s;
    :hover {
      color: var(--color-primary);
    }
  }
  @media screen and (max-width: 768px) {
    padding-left: 0;
  }
`;

// export const ContentDivWrapper = styled.div`
//   flex: 1 1 40%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media screen and (max-width: 768px) {
//     padding-top: var(--padding-size-l);
//   }
// `;

export const CustomDivider = styled.div`
  position: relative;
  bottom: 100px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  @media screen and (max-width: 768px) {
    bottom: 50px;
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
