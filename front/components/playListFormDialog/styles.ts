import styled from "styled-components";

export const DialogWrapper = styled.dialog`
  border: 1px solid var(--color-third);
  border-radius: 7px;
  width: 30vw;
  min-width: 240px;
`;

export const DialogFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & input {
    font-size: var(--font-size-ms);
    line-height: 20px;
    margin-bottom: var(--padding-size-s);
  }
`;

export const DialogMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: var(--padding-size-m);
  & button {
    margin: 0 var(--padding-size-s);
  }
`;
