import React from 'react'
import styled from 'styled-components';
import { OverflowSpan, StyledButton, VideoListDivWrapper } from '../../components/playList/styles';
import { VideoControlDivWrapper } from '../videoList/styles';

const ListDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  /* max-width: 800px; */
  margin: var(--padding-size-m);
`;

const ListControlDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & .active {
    & .fa-play {
      transform: rotate(90deg);
    }
  }
`

const BookmarkList = () => {

  const onClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }

  return (
    <ListDivWrapper>
      <ListControlDivWrapper>
        <OverflowSpan onClick={onClickToggle} className='active'>
          <i className="fa-solid fa-play"></i> &nbsp;
          <span>북마크 목록</span>
        </OverflowSpan>
      </ListControlDivWrapper>
      <VideoListDivWrapper className='active'>
        <VideoControlDivWrapper>
          <OverflowSpan>00:00:12</OverflowSpan>
          <StyledButton className='danger' >삭제</StyledButton>
        </VideoControlDivWrapper>
        <VideoControlDivWrapper>
          <OverflowSpan>00:23:33</OverflowSpan>
          <StyledButton className='danger' >삭제</StyledButton>
        </VideoControlDivWrapper>
        <VideoControlDivWrapper>
          <OverflowSpan>00:32:11</OverflowSpan>
          <StyledButton className='danger' >삭제</StyledButton>
        </VideoControlDivWrapper>
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
};

export default BookmarkList;