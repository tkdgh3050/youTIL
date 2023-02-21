import React, { FunctionComponent, useCallback } from 'react'
import { Link } from 'react-router-dom';

import { Video } from '../../actions/note';
import { VideoControlDivWrapper, OverflowSpan, StyledButton } from './styles'

type propType = {
  data: Video,
  clickDeleteVideo(id: string, name: string): void,
  playListId: string,
};

const VideoList: FunctionComponent<propType> = ({ data, clickDeleteVideo, playListId }) => {
  const onClickDeleteVideo = useCallback(() => {
    clickDeleteVideo(data.id + ' ' + playListId, data.videoName);
  }, []);
  return (
    <VideoControlDivWrapper>
      <Link to={'/videoView/' + data.id}><OverflowSpan>{data.videoName}</OverflowSpan></Link>
      <StyledButton className='danger' onClick={onClickDeleteVideo}>삭제</StyledButton>
    </VideoControlDivWrapper>
  )
};

export default VideoList;