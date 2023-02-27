import React, { FunctionComponent, useCallback } from 'react'

import { DialogConfirmWrapper } from '../deleteConfirmDialog/styles';
import { DialogMenuWrapper, DialogWrapper } from '../playListFormDialog/styles';
import { StyledButton } from '../playList/styles';

type props = {
  videoViewContinueConfirmDialogRef: React.RefObject<HTMLDialogElement>
  timestamp: string,
  clickBookmark: (timestamp: string) => void,
}
const VideoViewContinueConfirmDialog: FunctionComponent<props> = ({ videoViewContinueConfirmDialogRef, timestamp, clickBookmark }) => {
  const onClose = useCallback(() => {
    if (videoViewContinueConfirmDialogRef.current) {
      videoViewContinueConfirmDialogRef.current.close();
    }
  }, [videoViewContinueConfirmDialogRef]);

  const onClickViewContinue = useCallback(() => {
    clickBookmark(timestamp);
    onClose();
  }, [videoViewContinueConfirmDialogRef, clickBookmark]);

  return (
    <DialogWrapper ref={videoViewContinueConfirmDialogRef} >
      <DialogConfirmWrapper >
        <h3>{timestamp}</h3>
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
