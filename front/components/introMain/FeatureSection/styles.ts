import styled from "styled-components";

export const FeatureDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-size-s) 0;
  align-items: center;
  justify-content: center;
`;

export const LineDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-around;
`;

export const BoxDivWrapper = styled.div`
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  border: 1px solid black;
  padding: 0 var(--padding-size-m);
  margin: var(--padding-size-m);
  margin-top: var(--padding-size-l);
  border-radius: 10px;
  box-shadow: 1px 1px 2px;
  & div {
    position: relative;
    top: -35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary-light);
    border: 1px solid black;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    color: var(--color-white);
    font-size: var(--font-size-l);
  }
  & span {
    font-size: min(25px, 4vw);
    font-weight: bold;
  }
  & hr {
    width: 70px;
    margin: var(--padding-size-s) 0;
  }
  & p {
    text-align: center;
    font-size: min(20px, 3.5vw);
    word-break: keep-all;
  }
`;
