import React, { useCallback, FunctionComponent } from 'react';
import { YouTubePlayer } from 'react-youtube';
import { Bookmark, deleteBookmark } from '../../actions/note';
import { OverflowSpan, StyledButton, VideoListDivWrapper } from '../playList/styles';

import { useAppDispatch } from '../../store/configureStore';
import { VideoControlDivWrapper } from '../videoList/styles';

import { ListDivWrapper, ListControlDivWrapper } from './styles';
import { changeSecondsToTimeString } from '../../utils/changeTimeType';

// videoView에서 북마크 리스트 보여주는 component
const BookmarkList: FunctionComponent<{
  videoHandler: YouTubePlayer;
  bookmarks: Bookmark[] | undefined;
  clickBookmark: (time: number) => void;
}> = ({ videoHandler, bookmarks, clickBookmark }) => {
  const dispatch = useAppDispatch();

  const onClickToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 북마크 리스트 토글방식으로 보여줬다가 안보여줬다가 하는 이벤트
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }, []);

  const onClickBookmark = useCallback(
    (time: number) => () => {
      // 북마크 추가 버튼을 클릭시 발생 이벤트
      clickBookmark(time);
    },
    [clickBookmark],
  );

  const onClickDeleteBookmark = useCallback(
    (id: number) => () => {
      // 북마크 제거 버튼을 클릭시 발생 이벤트
      dispatch(deleteBookmark(id));
    },
    [videoHandler],
  );

  return (
    <ListDivWrapper>
      <ListControlDivWrapper>
        <OverflowSpan onClick={onClickToggle} className="active">
          <i className="fa-solid fa-play" />
          {' '}
&nbsp;
          <span>북마크 목록</span>
        </OverflowSpan>
      </ListControlDivWrapper>
      <VideoListDivWrapper className="active">
        {bookmarks?.length ? (
          bookmarks.map(v => (
            <VideoControlDivWrapper key={v.id}>
              <OverflowSpan className="bookmarkSpanPointer" onClick={onClickBookmark(v.time)}>
                {changeSecondsToTimeString(v.time)}
              </OverflowSpan>
              <StyledButton className="danger" onClick={onClickDeleteBookmark(v.id)}>
                삭제
              </StyledButton>
            </VideoControlDivWrapper>
          ))
        ) : (
          <div>북마크가 없습니다.</div>
        )}
      </VideoListDivWrapper>
    </ListDivWrapper>
  );
};

BookmarkList.displayName = 'BookmarkList';

export default BookmarkList;
