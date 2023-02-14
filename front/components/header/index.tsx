import React, { useCallback, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Wrapper, SidebarWrapper } from './styles';

const StyledUl = styled.ul`
  padding: var(--padding-size-m);
  & li {
    padding-bottom: var(--padding-size-s);
    font-size: var(--font-size-m);
    & a:hover{
      color: var(--color-white);
      transition: 0.2s;
    }
  }
`;

const Header = () => {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
    if (sidebarRef.current) {
      sidebarRef.current.focus();
    }
  }, [sidebarRef]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, [IsSidebarOpen]);

  return (
    <>
      <Wrapper>
        <span><Link to={'/'}>YouTIL</Link></span>
        <SidebarWrapper ref={sidebarRef} open={IsSidebarOpen} onBlur={closeSidebar} tabIndex={0}>
          {/* <span><Link to={'/'}>로그아웃</Link></span> */}
          <span><Link to={'/'}>로그인</Link></span>
          <span><Link to={'/'}>메인페이지</Link></span>
          <span><Link to={'/'}>공지사항</Link></span>
          <span><Link to={'/'}>내 노트</Link></span>
        </SidebarWrapper>
        <span className='menu__icon' onClick={openSidebar}><i className="fa-solid fa-bars"></i></span>
      </Wrapper>
    </>
  )
};

export default Header;