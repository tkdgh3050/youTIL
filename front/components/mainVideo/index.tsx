import React, { FunctionComponent, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayListInVideo, Video } from '../../actions/note';
import { changeSecondsToTimeString } from '../../pages/VideoViewPage';

import { FirstTitleSpan, MainVideoDivWrapper, SecondTimeSpan } from './styles';

type videoType = 'lastViewVideoList' | 'recentAddVideoList' | 'pinnedVideoList';

// 로그인 시 메인페이지에서 비디오 리스트 컴포넌트
const MainVideo: FunctionComponent<{ videoType: videoType, videoData: Video }> = ({ videoType, videoData }) => {
  const queryString = useRef<PlayListInVideo>({ playListId: videoData.playListId ? videoData.playListId : -1, videoId: videoData.id });

  const RenderSecondTimeSpan = useCallback(() => {
    // 어떤 파트냐에 따라 비디오 정보 다르게 표시해주는 부분
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