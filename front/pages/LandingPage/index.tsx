import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';

import Title from '../../components/title';
import UserMain from '../../components/userMain';
import IntroMain from '../../components/introMain';

// 메인페이지. 로그인 안하면 소개하는 페이지가 뜨고, 로그인 시 내 현황페이지 보이도록 설정
const LandingPage: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>(state => state.user);

  const RenderComp = user.userInfo ? (
    <>
      <Title title="My YouTIL" />
      <UserMain />
    </>
  ) : (
    <>
      <Title title="" />
      <IntroMain />
    </>
  );
  return RenderComp;
};

export default LandingPage;
