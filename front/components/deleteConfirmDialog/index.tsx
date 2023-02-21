import React, { FunctionComponent, useCallback, useState } from 'react';

import { DialogConfirmWrapper } from './styles';
import { DialogMenuWrapper, DialogWrapper } from '../playListFormDialog/styles';
import { StyledButton } from '../playList/styles';
import { useAppDispatch } from '../../store/configureStore';
import { deletePlayList, deleteVideo } from '../../actions/note';

const DeleteConfirmDialog: FunctionComponent<{ deleteConfirmDialogRef: React.RefObject<HTMLDialogElement>, flag: deleteFlag, id: string, name: string }> = ({ deleteConfirmDialogRef, flag, id, name }) => {
  const dispatch = useAppDispatch();
  const onClose = useCallback(() => {
    deleteConfirmDialogRef.current?.close();
  }, [deleteConfirmDialogRef]);

  const onClickDeleteConfirm = useCallback(() => {
    console.log('confirm', flag);
    if (flag === 'playList') {
      console.log('delete playlist', id);
      dispatch(deletePlayList(id));
    } else if (flag === 'video') {
      console.log('delete video', id, name);
      const [videoId, playListId] = id.split(' ');
      dispatch(deleteVideo({ videoId, playListId }));
    }
    onClose();
  }, [flag, id]);

  return (
    <DialogWrapper ref={deleteConfirmDialogRef} >
      <DialogConfirmWrapper >
        <h3>{name}</h3>
        <h3>정말로 삭제하시겠습니까?</h3>
        <DialogMenuWrapper>
          <StyledButton className='normal' type='button' onClick={onClose}>취소</StyledButton>
          <StyledButton className='danger' type="button" onClick={onClickDeleteConfirm}>삭제</StyledButton>
        </DialogMenuWrapper>
      </DialogConfirmWrapper>
    </DialogWrapper>
  )
};

export type deleteFlag = '' | 'playList' | 'video';
export default DeleteConfirmDialog;
