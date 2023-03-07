import React, { FunctionComponent, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayListInVideo, Video } from '../../actions/note';
import { changeSecondsToTimeString } from '../../pages/VideoViewPage';

import { FirstTitleSpan, MainVideoDivWrapper, SecondTimeSpan } from './styles';

type videoType = 'lastViewVideoList' | 'recentAddVideoList' | 'pinnedVideoList';
const MainVideo: FunctionComponent<{ videoType: videoType, videoData: Video }> = ({ videoType, videoData }) => {
  const queryString = useRef<PlayListInVideo>({ playListId: videoData.playListId ? videoData.playListId : -1, videoId: videoData.id });
  const RenderSecondTimeSpan = useCallback(() => {
    if (videoType === 'lastViewVideoList') {
      return <SecondTimeSpan>{changeSecondsToTimeString(videoData.lastViewTime)} 까지</SecondTimeSpan>
    } else if (videoType === 'recentAddVideoList') {
      return <SecondTimeSpan>{videoData.created_at && videoData.created_at.split('T')[0].slice(2)} 추가</SecondTimeSpan>
    } else if (videoType === 'pinnedVideoList') {
      return <SecondTimeSpan>{videoData.modified_isPinned_at && videoData.modified_isPinned_at.split('T')[0].slice(2)} 즐겨찾기</SecondTimeSpan>
    } else {
      return <span></span>
    }
  }, [videoType, videoData]);
  return (
    <MainVideoDivWrapper to={'videoView'} state={queryString.current}>
      <FirstTitleSpan>{videoData.videoName}</FirstTitleSpan>
      <RenderSecondTimeSpan />
    </MainVideoDivWrapper>
  )
};

export default MainVideo;