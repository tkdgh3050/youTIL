import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadLastViewVideoList } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';
import { ListDivWrapper, TitleSpan, MainVideoDivWrapper } from './styles';

// 메인페이지 - 시청 중 동영상 부분 컴포넌트
function LastViewVideoList() {
  const note = useSelector<RootState, NoteState>(state => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 시청 중 동영상 초기 로드
    dispatch(loadLastViewVideoList()).unwrap();
  }, []);

  return (
    <ListDivWrapper className="mainWrapper">
      <TitleSpan>
        <i className="fa-solid fa-eye" />
        {' '}
        시청 중 동영상
      </TitleSpan>
      <MainVideoDivWrapper>
        {note.lastViewVideoList?.length ? (
          note.lastViewVideoList.map(video => (
            <MainVideo key={video.id} videoType="lastViewVideoList" videoData={video} />
          ))
        ) : (
          <div>시청 중인 동영상이 없습니다.</div>
        )}
      </MainVideoDivWrapper>
    </ListDivWrapper>
  );
}

export default LastViewVideoList;
