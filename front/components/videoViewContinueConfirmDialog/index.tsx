import React, { FunctionComponent, useCallback } from 'react'

import { DialogConfirmWrapper } from '../deleteConfirmDialog/styles';
import { DialogMenuWrapper, DialogWrapper } from '../playListFormDialog/styles';
import { StyledButton } from '../playList/styles';
import { changeSecondsToTimeString } from '../../pages/VideoViewPage';

type props = {
  videoViewContinueConfirmDialogRef: React.RefObject<HTMLDialogElement>
  time: number,
  clickBookmark: (time: number) => void,
}
const VideoViewContinueConfirmDialog: FunctionComponent<props> = ({ videoViewContinueConfirmDialogRef, time, clickBookmark }) => {
  const onClose = useCallback(() => {
    if (videoViewContinueConfirmDialogRef.current) {
      videoViewContinueConfirmDialogRef.current.close();
    }
  }, [videoViewContinueConfirmDialogRef]);

  const onClickViewContinue = useCallback(() => {
    clickBookmark(time);
    onClose();
  }, [videoViewContinueConfirmDialogRef, clickBookmark]);

  return (
    <DialogWrapper ref={videoViewContinueConfirmDialogRef} >
      <DialogConfirmWrapper >
        <h3>{changeSecondsToTimeString(time)}</h3>
        <h3>부터 이어보시겠습니까?</h3>
        <DialogMenuWrapper>
          <StyledButton className='normal' type='button' onClick={onClose}>취소</StyledButton>
          <StyledButton className='primary' type="button" onClick={onClickViewContinue}>이어보기</StyledButton>
        </DialogMenuWrapper>
      </DialogConfirmWrapper>
    </DialogWrapper>
  )
};

export default VideoViewContinueConfirmDialog;
