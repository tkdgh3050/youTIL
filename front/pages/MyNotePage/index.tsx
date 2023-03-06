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
import DeleteConfirmDialog, { deleteFlag } from '../../components/deleteConfirmDialog';

const MyNote = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();
  const addPlayListDialogRef = useRef<HTMLDialogElement>(null);
  const addVideoListDialogRef = useRef<HTMLDialogElement>(null);
  const deleteConfirmDialogRef = useRef<HTMLDialogElement>(null);
  const [ParamId, setParamId] = useState<number[]>([]);
  const [DeleteFlag, setDeleteFlag] = useState<deleteFlag>('');
  const [DeleteName, setDeleteName] = useState('');

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
    if (addPlayListDialogRef.current) {
      addPlayListDialogRef.current.showModal();
    }
  }, [addPlayListDialogRef]);

  const clickAddVideoList = useCallback((id: number[]) => {
    if (addVideoListDialogRef.current) {
      setParamId(id);
      addVideoListDialogRef.current.showModal();
    }
  }, [addVideoListDialogRef]);

  const clickDeletePlayList = useCallback((id: number[], name: string) => {
    if (deleteConfirmDialogRef.current) {
      setDeleteFlag('playList');
      setDeleteName(name);
      setParamId(id);
      deleteConfirmDialogRef.current.showModal();
    }
  }, [deleteConfirmDialogRef]);

  const clickDeleteVideo = useCallback((id: number[], name: string) => {
    if (deleteConfirmDialogRef.current) {
      setDeleteFlag('video');
      setDeleteName(name);
      setParamId(id);
      deleteConfirmDialogRef.current.showModal();
    }
  }, [deleteConfirmDialogRef]);

  return (
    <>
      <Title title='내 노트' />
      <CenterDivWrapper>
        <AllListControlDivWrapper>
          <span>내 재생목록</span>
          <StyledButton className='primary' onClick={onClickAddPlayList}>재생목록 추가</StyledButton>
        </AllListControlDivWrapper>
        {note.playList?.length
          ? note.playList.map((data) => <PlayList key={data.playListName} data={data} clickAddVideoList={clickAddVideoList} clickDeletePlayList={clickDeletePlayList} clickDeleteVideo={clickDeleteVideo} />)
          : <div>재생목록이 없습니다.</div>
        }
      </CenterDivWrapper>
      <PlayListFormDialog addPlayListDialogRef={addPlayListDialogRef} />
      <VideoListFormDialog addVideoListDialogRef={addVideoListDialogRef} id={ParamId} />
      <DeleteConfirmDialog deleteConfirmDialogRef={deleteConfirmDialogRef} flag={DeleteFlag} id={ParamId} name={DeleteName} />
    </>

  )
};

export default MyNote;
