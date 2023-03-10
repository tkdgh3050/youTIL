import React, { FunctionComponent, useState, useCallback } from 'react'
import { addVideoList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from '../playListFormDialog/styles';

const checkRegURL = (url: string): [isRegValid: boolean, regVideoURL: string] => {
  if (/^(http(s)?:\/\/youtu.be\/)/.test(url)) {
    const regURL = url.replace(/^(http(s)?:\/\/youtu.be\/)/, '');
    return [true, regURL];
  } else if (/^(http(s)?:\/\/www.youtube\.com\/embed\/)/.test(url)) {
    const regURL = url.replace(/^(http(s)?:\/\/www.youtube\.com\/embed\/)/, '');
    return [true, regURL];
  } else if (/^(http(s)?:\/\/www.youtube\.com\/watch\?)/.test(url)) {
    const regURLParam = url.replace(/^(http(s)?:\/\/www.youtube\.com\/watch\?)/, '').split('&');
    if (regURLParam.filter(v => v.includes('v=')).length > 0) {
      const regURL = regURLParam.filter(v => v.includes('v='))[0].replace('v=', '');
      return [true, regURL];
    }
  }
  return [false, ''];
}

const VideoListFormDialog: FunctionComponent<{ addVideoListDialogRef: React.RefObject<HTMLDialogElement>, id?: number[] }> = ({ addVideoListDialogRef, id }) => {
  const dispatch = useAppDispatch();
  const [VideoName, setVideoName] = useState('');
  const [VideoURL, setVideoURL] = useState('');
  const [VideoNameError, setVideoNameError] = useState(false);
  const [VideoURLError, setVideoURLError] = useState(false);
  const [VideoURLRegError, setVideoURLRegError] = useState(false);

  const onChangeVideoName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoName(e.target.value);
    setVideoNameError(false);
  }, []);

  const onChangeVideoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoURL(e.target.value);
    setVideoURLError(false);
    setVideoURLRegError(false);
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

    const [isRegValid, regVideoURL] = checkRegURL(VideoURL);
    if (!isRegValid) {
      setVideoURLRegError(true);
      return
    }

    if (id) {
      dispatch(addVideoList({
        playListId: id[0],
        id: -1,
        videoName: VideoName,
        videoURL: regVideoURL,
        lastViewTime: 0
      })).unwrap()
        .then((result) => {
          alert('???????????? ?????????????????????.');
        })
        .catch((err) => {
          alert(`????????? ????????? ????????? ??????????????????. ${err}`);
        })
    }
    addVideoListDialogRef.current?.close();
  }, [VideoName, VideoURL, addVideoListDialogRef]);

  const onCloseAddVideo = useCallback(() => {
    setVideoName('');
    setVideoURL('');
    setVideoNameError(false);
    setVideoURLError(false);
    addVideoListDialogRef.current?.close();
  }, [addVideoListDialogRef, VideoName, VideoURL]);

  return (
    <DialogWrapper ref={addVideoListDialogRef} onClose={onCloseAddVideo}>
      <DialogFormWrapper method="dialog" onSubmit={onSubmitAddVideoList}>
        <h3>????????? ??????</h3>
        <input type="text" name='VideoName' value={VideoName} onChange={onChangeVideoName} placeholder="????????? ??????" />
        {VideoNameError && <ErrorDivWrapper>????????? ????????? ??????????????????.</ErrorDivWrapper>}
        <input type="url" name='VideoURL' value={VideoURL} onChange={onChangeVideoURL} placeholder="????????? URL" />
        {VideoURLError && <ErrorDivWrapper>????????? URL??? ??????????????????.</ErrorDivWrapper>}
        {VideoURLRegError && <ErrorDivWrapper>????????? ????????? URL ????????? ???????????? ????????????.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className='normal' type='button' onClick={onCloseAddVideo}>??????</StyledButton>
          <StyledButton className='primary' type="submit">??????</StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  )
};

export default VideoListFormDialog;