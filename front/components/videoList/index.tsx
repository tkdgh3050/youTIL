import React, { FunctionComponent } from 'react'
import { Video } from '../../actions/note';

import { VideoControlDivWrapper, OverflowSpan, StyledButton } from './styles'

const VideoList: FunctionComponent<{ data: Video }> = ({ data }) => {
  return (
    <VideoControlDivWrapper>
      <OverflowSpan>{data.videoName}</OverflowSpan>
      <StyledButton className='danger'>삭제</StyledButton>
    </VideoControlDivWrapper>
  )
};

export default VideoList;