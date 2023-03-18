import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';

import Title from '../../components/title';
import UserMain from '../../components/userMain';
import IntroMain from '../../components/introMain';

const LandingPage: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>((state) => state.user);

  return (
    <>
      {user.userInfo
        ? //로그인한 경우 현황페이지
        <>
          <Title title={'My YouTIL'} />
          <UserMain />
        </>
        : //로그인하지 않은 경우 YouTIL 소개 페이지
        <>
          <Title title={''} />
          <IntroMain />
        </>
      }
    </>
  )
};

export default LandingPage;