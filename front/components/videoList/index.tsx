import React, { FunctionComponent, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';

import { Video } from '../../actions/note';
import { VideoControlDivWrapper, OverflowSpan, StyledButton } from './styles'

type propType = {
  data: Video,
  clickDeleteVideo(id: string, name: string): void,
  playListId: string,
};

export interface videoViewQueryString {
  playListId: string;
  videoId: string;
}

const VideoList: FunctionComponent<propType> = ({ data, clickDeleteVideo, playListId }) => {
  const queryString = useRef<videoViewQueryString>({ playListId: playListId, videoId: data.id });

  const onClickDeleteVideo = useCallback(() => {
    clickDeleteVideo(data.id + ' ' + playListId, data.videoName);
  }, []); //'/videoView?playListId=' + playListId + '&videoId=' + data.id

  return (
    <VideoControlDivWrapper>
      <Link to={'/videoView'} state={queryString.current}><OverflowSpan>{data.videoName}</OverflowSpan></Link>
      <StyledButton className='danger' onClick={onClickDeleteVideo}>삭제</StyledButton>
    </VideoControlDivWrapper>
  )
};

export default VideoList;