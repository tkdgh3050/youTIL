import React, { FunctionComponent, useCallback, useState } from 'react';

import { DialogConfirmWrapper } from './styles';
import { DialogMenuWrapper, DialogWrapper } from '../playListFormDialog/styles';
import { StyledButton } from '../playList/styles';
import { useAppDispatch } from '../../store/configureStore';
import { deletePlayList, deleteVideo } from '../../actions/note';

// 재생목록, 동영상 삭제 버튼 클릭 시, 확인을 위한 다이얼로그 창
const DeleteConfirmDialog: FunctionComponent<{ deleteConfirmDialogRef: React.RefObject<HTMLDialogElement>, flag: deleteFlag, id: number[], name: string }> = ({ deleteConfirmDialogRef, flag, id, name }) => {
  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    // 닫기 버튼 클릭 시 다이얼로그 닫아주는 이벤트
    deleteConfirmDialogRef.current?.close();
  }, [deleteConfirmDialogRef]);

  const onClickDeleteConfirm = useCallback(() => {
    // 삭제 확인을 클릭 시 처리하는 이벤트

    if (flag === 'playList') {
      // 플레이리스트를 삭제한 경우
      dispatch(deletePlayList(id[0])).unwrap()
        .then((result) => {
          alert('재생목록 삭제완료 하였습니다.');
        })
        .catch((err) => {
          alert(`재생목록 삭제에 실패했습니다. ${err.message}`);
        })
    } else if (flag === 'video') {
      // 비디오를 삭제한 경우
      const [videoId, playListId] = id;
      dispatch(deleteVideo({ videoId, playListId })).unwrap()
        .then((result) => {
          alert('동영상 삭제완료 하였습니다.');
        })
        .catch((err) => {
          alert(`동영상 삭제에 실패했습니다. ${err.message}`);
        })
    }

    //삭제 완료 후 다이얼로그 창 닫기
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
