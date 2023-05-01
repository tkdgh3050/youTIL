import React, { FunctionComponent, useCallback } from 'react';

import DialogConfirmWrapper from '../deleteConfirmDialog/styles';
import { DialogMenuWrapper, DialogWrapper } from '../playListFormDialog/styles';
import { StyledButton } from '../playList/styles';
import { changeSecondsToTimeString } from '../../utils/changeTimeType';

type Props = {
  videoViewContinueConfirmDialogRef: React.RefObject<HTMLDialogElement>;
  time: number;
  clickBookmark: (time: number) => void;
};

// 이전 재싱시간 존재하는 비디오 보기 접근 시, 이어볼 지 여부 확인하는 다이얼로그
const VideoViewContinueConfirmDialog: FunctionComponent<Props> = ({
  videoViewContinueConfirmDialogRef,
  time,
  clickBookmark,
}) => {
  const onClose = useCallback(() => {
    // 취소 클릭 시
    if (videoViewContinueConfirmDialogRef.current) {
      videoViewContinueConfirmDialogRef.current.close();
    }
  }, [videoViewContinueConfirmDialogRef]);

  const onClickViewContinue = useCallback(() => {
    // 계속 보기 클릭 시 북마크 클릭한 것과 동일하게 해당 위치 재생 진행
    clickBookmark(time);
    onClose();
  }, [videoViewContinueConfirmDialogRef, clickBookmark]);

  return (
    <DialogWrapper ref={videoViewContinueConfirmDialogRef}>
      <DialogConfirmWrapper>
        <h3>{changeSecondsToTimeString(time)}</h3>
        <h3>부터 이어보시겠습니까?</h3>
        <DialogMenuWrapper>
          <StyledButton className="normal" type="button" onClick={onClose}>
            취소
          </StyledButton>
          <StyledButton className="primary" type="button" onClick={onClickViewContinue}>
            이어보기
          </StyledButton>
        </DialogMenuWrapper>
      </DialogConfirmWrapper>
    </DialogWrapper>
  );
};

export default VideoViewContinueConfirmDialog;
