import React, { FunctionComponent, useState, useCallback } from 'react'
import { addVideoList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from '../playListFormDialog/styles';

const VideoListFormDialog: FunctionComponent<{ addVideoListDialog: React.RefObject<HTMLDialogElement>, id?: string }> = ({ addVideoListDialog, id }) => {
  const dispatch = useAppDispatch();
  const [VideoName, setVideoName] = useState('');
  const [VideoURL, setVideoURL] = useState('');
  const [VideoNameError, setVideoNameError] = useState(false);
  const [VideoURLError, setVideoURLError] = useState(false);

  const onChangeVideoName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoName(e.target.value);
    setVideoNameError(false);
  }, []);

  const onChangeVideoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
    setVideoURLError(false);
  }, []);

  const onSubmitAddVideoList = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!VideoName) {
      setVideoNameError(true);
      return;
    }

    if (!VideoURL) {
      setVideoURLError(true);
      return;
    }
    console.log(VideoName, VideoURL);
    dispatch(addVideoList({ playListId: id, id: '1', videoName: VideoName, videoURL: VideoURL, lastViewTime: '' }));
    addVideoListDialog.current?.close();
  }, [VideoName, VideoURL, addVideoListDialog]);

  const onCloseAddVideo = useCallback(() => {
    setVideoName('');
    setVideoURL('');
    setVideoNameError(false);
    setVideoURLError(false);
    addVideoListDialog.current?.close();
  }, [addVideoListDialog, VideoName, VideoURL]);

  return (
    <DialogWrapper ref={addVideoListDialog} onClose={onCloseAddVideo}>
      <DialogFormWrapper method="dialog" onSubmit={onSubmitAddVideoList}>
        <h3>동영상 추가</h3>
        <input type="text" name='VideoName' value={VideoName} onChange={onChangeVideoName} placeholder="동영상 이름" />
        {VideoNameError && <ErrorDivWrapper>동영상 이름을 입력해주세요.</ErrorDivWrapper>}
        <input type="url" name='VideoURL' value={VideoURL} onChange={onChangeVideoURL} placeholder="동영상 URL" />
        {VideoURLError && <ErrorDivWrapper>동영상 URL을 입력해주세요.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className='danger' type='button' onClick={onCloseAddVideo}>취소</StyledButton>
          <StyledButton className='primary' type="submit">생성</StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  )
};

export default VideoListFormDialog;