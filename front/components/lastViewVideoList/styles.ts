import styled from "styled-components";

export const ListDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: var(--padding-size-m);
`;

export const TitleSpan = styled.span`
  font-size: var(--font-size-m);
  font-weight: bold;
  padding-bottom: var(--padding-size-s);
  color: var(--color-primary);
`;

export const MainVideoDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 3px solid var(--color-primary);
  width: 100%;
  & div:not(:last-child) {
    border-bottom: 1px dotted var(--color-primary);
  }
`;
