import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';

import { PlayListInVideo, Video } from '../../actions/note';
import { VideoControlDivWrapper, OverflowSpan, StyledButton } from './styles'

type propType = {
  data: Video,
  clickDeleteVideo(id: number[], name: string): void,
  playListId: number,
};

// 내 비디오 리스트에서 비디오 리스트 부분 컴포넌트
const VideoList: FunctionComponent<propType> = ({ data, clickDeleteVideo, playListId }) => {
  const queryString = useRef<PlayListInVideo>({ playListId: playListId, videoId: data.id });

  const onClickDeleteVideo = useCallback(() => {
    // 비디오 삭제 클릭 시
    clickDeleteVideo([data.id, playListId], data.videoName);
  }, []); //'/videoView?playListId=' + playListId + '&videoId=' + data.id

  return (
    <VideoControlDivWrapper>
      <Link to={'/videoView'} state={queryString.current}><OverflowSpan>{data.videoName}</OverflowSpan></Link>
      <StyledButton className='danger' onClick={onClickDeleteVideo}>삭제</StyledButton>
    </VideoControlDivWrapper>
  )
};

export default VideoList;