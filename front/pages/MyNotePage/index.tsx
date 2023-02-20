import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { lodePlayList } from '../../actions/note';

import Title from '../../components/title';
import PlayList from '../../components/playList';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import {
  CenterDivWrapper, AllListControlDivWrapper, StyledButton,
} from './styles';
import PlayListFormDialog from '../../components/playListFormDialog';
import VideoListFormDialog from '../../components/videoListFormDialog';

const MyNote = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();
  const addPlayListDialog = useRef<HTMLDialogElement>(null);
  const addVideoListDialog = useRef<HTMLDialogElement>(null);
  const [PlayListId, setPlayListId] = useState('');

  useEffect(() => {
    const req = dispatch(lodePlayList());
    req.unwrap()
      .then((result) => {
        console.log('done', result);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const onClickAddPlayList = useCallback(() => {
    if (addPlayListDialog.current) {
      addPlayListDialog.current.showModal();
    }
  }, [addPlayListDialog]);

  const clickAddVideoList = useCallback((id: string) => {
    if (addVideoListDialog.current) {
      setPlayListId(id);
      addVideoListDialog.current.showModal();
    }
  }, [addVideoListDialog]);

  return (
    <>
      <Title title='내 노트' />
      <CenterDivWrapper>
        <AllListControlDivWrapper>
          <span>내 재생목록</span>
          <StyledButton className='primary' onClick={onClickAddPlayList}>재생목록 추가</StyledButton>
        </AllListControlDivWrapper>
        {note.playList
          ? note.playList.map((data) => <PlayList key={data.playListName} data={data} clickAddVideoList={clickAddVideoList} />)
          : <div>재생목록이 없습니다.</div>
        }
      </CenterDivWrapper>
      <PlayListFormDialog addPlayListDialog={addPlayListDialog} />
      <VideoListFormDialog addVideoListDialog={addVideoListDialog} id={PlayListId} />
    </>

  )
};

export default MyNote;
