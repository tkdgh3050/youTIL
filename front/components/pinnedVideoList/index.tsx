import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadPinnedVideoList } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';
import { ListDivWrapper, MainVideoDivWrapper, TitleSpan } from './styles';

// 메인페이지 - 즐겨찾기한 동영상 보여주는 컴포넌트
const PinnedVideoList = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 즐겨찾기한 동영상 불러오는 부분
    dispatch(loadPinnedVideoList()).unwrap();
  }, []);

  return (
    <ListDivWrapper className='mainWrapper'>
      <TitleSpan><i className="fa-solid fa-star"></i> 즐겨찾기 동영상</TitleSpan>
      <MainVideoDivWrapper>
        {
          note.pinnedVideoList?.length
            ? note.pinnedVideoList.map((video) => <MainVideo key={video.id} videoType='pinnedVideoList' videoData={video} />)
            : <div>즐겨찾기한 동영상이 없습니다.</div>
        }
      </MainVideoDivWrapper>
    </ListDivWrapper>
  )
};

export default PinnedVideoList;