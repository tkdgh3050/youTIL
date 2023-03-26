import React, { FunctionComponent, useState, useCallback } from 'react'
import { addVideoList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from '../playListFormDialog/styles';

const checkRegURL = (url: string): [isRegValid: boolean, regVideoURL: string] => {
  // 입력한 URL 이 올바른 URL인지 확인한 뒤 필요한 비디오 아이디만 추출해서 리턴해주는 함수

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

// 비디오 추가 클릭 시 뜨는 다이얼로그
const VideoListFormDialog: FunctionComponent<{ addVideoListDialogRef: React.RefObject<HTMLDialogElement>, id?: number[] }> = ({ addVideoListDialogRef, id }) => {
  const dispatch = useAppDispatch();
  const [VideoName, setVideoName] = useState('');
  const [VideoURL, setVideoURL] = useState('');
  const [VideoNameError, setVideoNameError] = useState(false);
  const [VideoURLError, setVideoURLError] = useState(false);
  const [VideoURLRegError, setVideoURLRegError] = useState(false);

  const onChangeVideoName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 비디오 이름 변경 시
    setVideoName(e.target.value);
    setVideoNameError(false);
  }, []);

  const onChangeVideoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 비디오 URL 변경 시
    setVideoURL(e.target.value);
    setVideoURLError(false);
    setVideoURLRegError(false);
  }, []);

  const onSubmitAddVideoList = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // 비디오 추가 버튼 클릭 시 유효성 체크하고 올바르다면 비디오 추가 진행
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
          alert('동영상이 추가되었습니다.');
        })
        .catch((err) => {
          alert(`동영상 추가에 오류가 발생했습니다. ${err}`);
        })
    }
    addVideoListDialogRef.current?.close();
  }, [VideoName, VideoURL, addVideoListDialogRef]);

  const onCloseAddVideo = useCallback(() => {
    // 취소 클릭 시
    setVideoName('');
    setVideoURL('');
    setVideoNameError(false);
    setVideoURLError(false);
    addVideoListDialogRef.current?.close();
  }, [addVideoListDialogRef, VideoName, VideoURL]);

  return (
    <DialogWrapper ref={addVideoListDialogRef} onClose={onCloseAddVideo}>
      <DialogFormWrapper method="dialog" onSubmit={onSubmitAddVideoList}>
        <h3>동영상 추가</h3>
        <input type="text" name='VideoName' value={VideoName} onChange={onChangeVideoName} placeholder="동영상 이름" />
        {VideoNameError && <ErrorDivWrapper>동영상 이름을 입력해주세요.</ErrorDivWrapper>}
        <input type="url" name='VideoURL' value={VideoURL} onChange={onChangeVideoURL} placeholder="동영상 URL" />
        {VideoURLError && <ErrorDivWrapper>동영상 URL을 입력해주세요.</ErrorDivWrapper>}
        {VideoURLRegError && <ErrorDivWrapper>유튜브 동영상 URL 형식이 올바르지 않습니다.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className='normal' type='button' onClick={onCloseAddVideo}>취소</StyledButton>
          <StyledButton className='primary' type="submit">생성</StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  )
};

export default VideoListFormDialog;