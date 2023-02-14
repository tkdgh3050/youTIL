import styled from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 1px solid var(--color-gray-light);
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-ml);
  color: var(--color-white);
  padding: 0 var(--padding-size-m);
  & > span > a {
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: var(--font-size-l);
    font-weight: bold;
    :hover {
      background: linear-gradient(to right, var(--color-primary-light), var(--color-secondary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  & .menu__icon {
    display: none;
  }

  @media screen and (max-width: 768px) {
    & .menu__icon {
      display: inline-block;
      color: var(--color-black);
    }
  }
`;

export const SidebarWrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: var(--font-size-m);
  & span {
    line-height: 60px;
    margin-left: var(--padding-size-l);
    :hover {
      transition: 0.3s;
      border-bottom: 2px solid var(--color-primary);
    }
    & a:hover {
      transition: 0.3s;
      color: var(--color-primary);
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    font-weight: bold;
    top: 0;
    ${({ open }) => {
      return open ? "right: 0px;" : "right: -200px;";
    }}
    transition: .5s;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-light);
    width: 200px;
    height: 100vh;
    padding: var(--padding-size-s);

    & span {
      margin-left: 0;
      :hover {
        border: none;
      }
      & a:hover {
        transition: 0.3s;
        color: var(--color-primary);
      }
    }

    :focus {
      border-color: none;
      outline: none;
    }
  }
`;
