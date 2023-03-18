import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { loadLastViewVideoList, Video } from '../../actions/note';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import MainVideo from '../mainVideo';
import { ListDivWrapper, TitleSpan, MainVideoDivWrapper } from './styles';

export const LastViewVideoList = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadLastViewVideoList()).unwrap();
  }, [])

  return (
    <ListDivWrapper className='mainWrapper'>
      <TitleSpan><i className="fa-solid fa-eye"></i> 시청 중 동영상</TitleSpan>
      <MainVideoDivWrapper>
        {
          note.lastViewVideoList?.length
            ? note.lastViewVideoList.map((video) => <MainVideo key={video.id} videoType='lastViewVideoList' videoData={video} />)
            : <div>시청 중인 동영상이 없습니다.</div>
        }
      </MainVideoDivWrapper>
    </ListDivWrapper>
  )
}

export default LastViewVideoList;