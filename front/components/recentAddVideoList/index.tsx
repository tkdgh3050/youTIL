import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadRecentAddVideoList } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';
import { ListDivWrapper, MainVideoDivWrapper, TitleSpan } from './styles';

// 메인페이지 - 최근 추가한 동영상 리스트 보여주는 컴포넌트
const RecentAddVideoList = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 최근 추가한 동영상 리스트 불러오는 부분
    dispatch(loadRecentAddVideoList()).unwrap();
  }, []);

  return (
    <ListDivWrapper className='mainWrapper'>
      <TitleSpan><i className="fa-solid fa-file-circle-plus"></i> 최근 추가 동영상</TitleSpan>
      <MainVideoDivWrapper>
        {
          note.recentAddVideoList?.length
            ? note.recentAddVideoList.map((video) => <MainVideo key={video.id} videoType='recentAddVideoList' videoData={video} />)
            : <div>최근 추가한 동영상이 없습니다.</div>
        }
      </MainVideoDivWrapper>
    </ListDivWrapper>
  )
}

export default RecentAddVideoList;