import React, { FunctionComponent, useCallback, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, SidebarWrapper } from './styles';

const Header: FunctionComponent = () => {
  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'YouTIL'
  }, [])

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
          <span><Link to={'/login'}>로그인</Link></span>
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