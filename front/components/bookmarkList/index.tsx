import React, { useCallback, FunctionComponent, memo } from 'react'
import { YouTubePlayer } from 'react-youtube';
import { Bookmark, deleteBookmark } from '../../actions/note';
import { OverflowSpan, StyledButton, VideoListDivWrapper } from '../../components/playList/styles';
import { changeSecondsToTimeString } from '../../pages/VideoViewPage';
import { useAppDispatch } from '../../store/configureStore';
import { VideoControlDivWrapper } from '../videoList/styles';

import { ListDivWrapper, ListControlDivWrapper } from './styles';


const BookmarkList: FunctionComponent<{ videoHandler: YouTubePlayer, bookmarks: Bookmark[] | undefined, clickBookmark: (time: number) => void }> = memo(({ videoHandler, bookmarks, clickBookmark }) => {
  const dispatch = useAppDispatch();

  const onClickToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }, []);

  const onClickBookmark = useCallback((time: number) => (e: React.MouseEvent<HTMLSpanElement>) => {
    clickBookmark(time);
  }, [clickBookmark]);

  const onClickDeleteBookmark = useCallback((id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteBookmark(id));
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
            <VideoControlDivWrapper key={v.id}>
              <OverflowSpan className='bookmarkSpanPointer' onClick={onClickBookmark(v.time)}>{changeSecondsToTimeString(v.time)}</OverflowSpan>
              <StyledButton className='danger' onClick={onClickDeleteBookmark(v.id)}>삭제</StyledButton>
            </VideoControlDivWrapper>
          ))
          : <div>북마크가 없습니다.</div>
        }
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
});

export default BookmarkList;