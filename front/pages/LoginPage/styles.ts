import styled from "styled-components";

export const FormDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 74vh;
  justify-content: center;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  & input,
  button {
    margin-top: var(--padding-size-m);
    width: 250px;
    line-height: 30px;
    font-size: var(--font-size-m);
  }
  & button {
    background-color: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    :hover {
      transition: 0.2s;
      background-color: var(--color-secondary-light);
      border: 1px solid var(--color-secondary-light);
    }
  }
`;

export const OperationDivWrapper = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
  & a:hover {
    transition: 0.2s;
    color: var(--color-secondary);
  }
`;

export const ErrorDivWrapper = styled.div`
  color: red;
  font-size: var(--font-size-ms);
  padding-left: var(--padding-size-s);
`;
