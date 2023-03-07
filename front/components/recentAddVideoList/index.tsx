import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { loadRecentAddVideoList } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';
import { ListDivWrapper, MainVideoDivWrapper, TitleSpan } from './styles';

const RecentAddVideoList = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadRecentAddVideoList()).unwrap();
  }, [])
  return (
    <ListDivWrapper className='mainWrapper'>
      <TitleSpan><i className="fa-solid fa-file-circle-plus"></i> 최근 추가 동영상</TitleSpan>
      <MainVideoDivWrapper>
        {
          note.recentAddVideoList
            ? note.recentAddVideoList.map((video) => <MainVideo key={video.id} videoType='recentAddVideoList' videoData={video} />)
            : <div>최근 추가한 동영상이 없습니다.</div>
        }
      </MainVideoDivWrapper>
    </ListDivWrapper>
  )
}

export default RecentAddVideoList;