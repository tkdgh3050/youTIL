import styled from 'styled-components';

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
  &.normal {
    transition: all 0.3s;
    color: var(--color-gray);
    &:hover {
      background-color: var(--color-gray);
      color: var(--color-white);
    }
  }
`;

export const CenterDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: var(--padding-size-l);
`;

export const AllListControlDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: var(--padding-size-m);
  font-size: var(--font-size-ml);

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
