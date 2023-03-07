import React, { } from 'react';

import LastViewVideoList from '../lastViewVideoList';
import PinnedVideoList from '../pinnedVideoList';
import RecentAddVideoList from '../recentAddVideoList';
import { ContentDivWrapper } from './styles';

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
