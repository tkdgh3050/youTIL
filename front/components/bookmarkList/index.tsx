import React, { useCallback, FunctionComponent, memo } from 'react'
import { YouTubePlayer } from 'react-youtube';
import { deleteBookmark } from '../../actions/note';
import { OverflowSpan, StyledButton, VideoListDivWrapper } from '../../components/playList/styles';
import { useAppDispatch } from '../../store/configureStore';
import { VideoControlDivWrapper } from '../videoList/styles';

import { ListDivWrapper, ListControlDivWrapper } from './styles';

const changeTimeStringToSeconds = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':');
  return Number(hours) * (60 ** 2) + Number(minutes) * 60 + Number(seconds);
}

const BookmarkList: FunctionComponent<{ videoHandler: YouTubePlayer, bookmarks: string[] | undefined }> = memo(({ videoHandler, bookmarks }) => {
  const dispatch = useAppDispatch();

  const onClickToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }, []);

  const onClickBookmark = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (e.currentTarget.textContent) {
      videoHandler.seekTo(changeTimeStringToSeconds(e.currentTarget.textContent));
    }
  }, [videoHandler]);

  const onClickDeleteBookmark = useCallback((idx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(idx);
    dispatch(deleteBookmark(idx));
  }, [videoHandler]);

  return (
    <ListDivWrapper>
      <ListControlDivWrapper>
        <OverflowSpan onClick={onClickToggle} className='active'>
          <i className="fa-solid fa-play"></i> &nbsp;
          <span>북마크 목록</span>
        </OverflowSpan>
      </ListControlDivWrapper>
      <VideoListDivWrapper className='active'>
        {bookmarks?.length
          ? bookmarks.map((v, i) => (
            <VideoControlDivWrapper key={v + i}>
              <OverflowSpan className='bookmarkSpanPointer' onClick={onClickBookmark}>{v}</OverflowSpan>
              <StyledButton className='danger' onClick={onClickDeleteBookmark(i)}>삭제</StyledButton>
            </VideoControlDivWrapper>
          ))
          : <div>북마크가 없습니다.</div>
        }
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
});

export default BookmarkList;