import React, { } from 'react';

import LastViewVideoList from '../lastViewVideoList';
import PinnedVideoList from '../pinnedVideoList';
import RecentAddVideoList from '../recentAddVideoList';
import { ContentDivWrapper } from './styles';

// 로그인한 유저가 메인페이지 접근 시 보여주는 컴포넌트
const UserMain = () => {
  return (
    <ContentDivWrapper>
      <LastViewVideoList />
      <RecentAddVideoList />
      <PinnedVideoList />
    </ContentDivWrapper>
  )
};

export default UserMain;
