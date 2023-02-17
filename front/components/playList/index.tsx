import React, { FunctionComponent } from 'react';
import { NoteData } from '../../actions/note';

import {
  StyledButton, ListControlDivWrapper, ListDivWrapper,
  ListOperatorDivWrapper, OverflowSpan, VideoControlDivWrapper,
  VideoListDivWrapper
} from './styles';

const PlayList: FunctionComponent<{ data: NoteData }> = ({ data }) => {

  const onClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }
  return (
    <ListDivWrapper>
      <ListControlDivWrapper>
        <OverflowSpan onClick={onClickToggle}>
          <i className="fa-solid fa-play"></i> &nbsp;
          <span>목록11111111111111111111111111111111111111111111111111111111111111111111111111</span>
        </OverflowSpan>
        <ListOperatorDivWrapper>
          <StyledButton className='primary'>동영상 추가</StyledButton>
          <StyledButton className='danger'>목록 삭제</StyledButton>
        </ListOperatorDivWrapper>
      </ListControlDivWrapper>
      <VideoListDivWrapper>
        <VideoControlDivWrapper><OverflowSpan>동영상11111111111111111111</OverflowSpan><StyledButton className='danger'>삭제</StyledButton></VideoControlDivWrapper>
        <VideoControlDivWrapper><OverflowSpan>동영상2</OverflowSpan><StyledButton className='danger'>삭제</StyledButton></VideoControlDivWrapper>
        <VideoControlDivWrapper><OverflowSpan>동영상3</OverflowSpan><StyledButton className='danger'>삭제</StyledButton></VideoControlDivWrapper>
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
};

export default PlayList;