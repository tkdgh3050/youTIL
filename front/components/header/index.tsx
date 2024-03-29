import React, {
  FunctionComponent, useCallback, useState, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Wrapper, SidebarWrapper } from './styles';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';
import { useAppDispatch } from '../../store/configureStore';
import { userLogout } from '../../actions/user';

// header 부분
const Header: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>(state => state.user);
  const dispatch = useAppDispatch();

  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'YouTIL';
  }, []);

  const openSidebar = useCallback(() => {
    // 사이드바 열었을 때 로직
    setIsSidebarOpen(true);
    if (sidebarRef.current) {
      // 포커스를 줘서 포커스가 나가면 창 닫히도록 설정
      sidebarRef.current.focus();
    }
  }, [sidebarRef]);

  const closeSidebar = useCallback(() => {
    // 사이드바 닫았을 때 로직
    setIsSidebarOpen(false);
  }, [IsSidebarOpen]);

  const onClickLogout = useCallback(() => {
    // 로그아웃 클릭 시 이벤트
    dispatch(userLogout())
      .unwrap()
      .then(() => {
        alert('로그아웃 하였습니다.');
      })
      .catch(err => {
        alert(`로그아웃에 실패하였습니다. 관리자에게 문의하세요 ${err}`);
      });
  }, []);

  return (
    <Wrapper>
      <span>
        <Link to="/">YouTIL</Link>
      </span>
      <SidebarWrapper ref={sidebarRef} open={IsSidebarOpen} onBlur={closeSidebar} tabIndex={0}>
        {user.userInfo ? (
          <span>
            <Link to="/" onClick={onClickLogout}>
              로그아웃
            </Link>
          </span>
        ) : (
          <span>
            <Link to="/login">로그인</Link>
          </span>
        )}
        <span>
          <Link to="/">메인페이지</Link>
        </span>
        {/* <span><Link to={'/notice'}>공지사항</Link></span> */}
        {user.userInfo && (
          <span>
            <Link to="/myNote">내 노트</Link>
          </span>
        )}
      </SidebarWrapper>
      <span className="menu__icon" onClick={openSidebar} onKeyDown={openSidebar} role="button" tabIndex={0}>
        <i className="fa-solid fa-bars" />
      </span>
    </Wrapper>
  );
};

export default Header;
