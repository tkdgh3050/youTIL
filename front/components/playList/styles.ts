import styled from 'styled-components';

export const OverflowSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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

export const ListDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 800px;
  border-bottom: 1px solid black;
  padding: var(--padding-size-s);
`;

export const VideoListDivWrapper = styled.div`
  padding: var(--padding-size-s) var(--padding-size-m);
  display: none;
  background-color: var(--color-gray-light);
  margin: var(--padding-size-s);
  &.active {
    display: block;
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 65px;
  }
`;

export const ListOperatorDivWrapper = styled.div`
  display: flex;
`;
