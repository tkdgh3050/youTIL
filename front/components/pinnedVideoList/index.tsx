import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadPinnedVideoList } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';

import { ListDivWrapper, MainVideoDivWrapper, TitleSpan } from './styles';

const PinnedVideoList = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadPinnedVideoList()).unwrap();
  }, []);
  return (
    <ListDivWrapper className='mainWrapper'>
      <TitleSpan><i className="fa-solid fa-star"></i> 즐겨찾기 동영상</TitleSpan>
      <MainVideoDivWrapper>
        {
          note.pinnedVideoList
            ? note.pinnedVideoList.map((video) => <MainVideo key={video.id} videoType='pinnedVideoList' videoData={video} />)
            : <div>즐겨찾기한 동영상이 없습니다.</div>
        }
      </MainVideoDivWrapper>
    </ListDivWrapper>
  )
};

export default PinnedVideoList;