import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube, { YouTubeEvent, YouTubeProps, YouTubePlayer } from 'react-youtube';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';

import BookmarkList from '../../components/bookmarkList';
import CustomTextEditor from '../../components/customTextEditor';
import Title from '../../components/title';
import { StyledButton } from '../../components/playList/styles';
import { VideoViewFlexWrapper, LeftWrapper, VideoViewOperationDivWrapper, EditorDivWrapper } from './styles';
import { useAppDispatch } from '../../store/configureStore';
import { RootState } from '../../reducers';
import { addBookmark, loadVideoInfoData, PlayListInVideo, updateIsPinned, updateTextNoteLastViewTime, Video } from '../../actions/note';
import VideoViewContinueConfirmDialog from '../../components/videoViewContinueConfirmDialog';
import { UserState } from '../../reducers/user';

export const changeTimeStringToSeconds = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':');
  return Number(hours) * (60 ** 2) + Number(minutes) * 60 + Number(seconds);
}

export const changeSecondsToTimeString = (seconds: number) => {
  const hours = Math.trunc(seconds / 3600) < 10 ? '0' + Math.trunc(seconds / 3600) : Math.trunc(seconds / 3600).toString();
  const mins = Math.trunc((seconds % 3600) / 60) < 10 ? '0' + Math.trunc((seconds % 3600) / 60) : Math.trunc((seconds % 3600) / 60).toString();
  const secs = seconds % 60 < 10 ? '0' + Math.trunc(seconds % 60) : Math.trunc(seconds % 60).toString();
  return [hours, mins, secs].join(':');
};

const VideoView = () => {
  const videoInfo = useSelector<RootState, Video | null>((state) => state.note.videoInfo);
  const user = useSelector<RootState, UserState>((state) => state.user);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [VideoId, setVideoId] = useState('');
  const [ContinueTime, setContinueTime] = useState<number>(0);
  const [VideoHandler, setVideoHandler] = useState<YouTubePlayer>();
  const [TextNote, setTextNote] = useState<string>('');
  const videoViewContinueConfirmDialogRef = useRef<HTMLDialogElement>(null);
  const queryString = useRef<PlayListInVideo>(location.state);
  const YoutubeTag = useRef<HTMLDivElement>(null);
  const opts: YouTubeProps['opts'] = useRef({
    playerVars: {
      modestbranding: 1,
    }
  });
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!user.userInfo) {
      alert('로그인이 필요합니다.');
      navigator('/login');
    }
  }, [user]);

  useEffect(() => {
    dispatch(loadVideoInfoData(queryString.current)).unwrap()
      .then(result => {
        if (result?.videoURL) {
          setVideoId(result.videoURL);
        }
        if (result?.textNote) {
          setTextNote(result.textNote);
        }
        if (result?.lastViewTime) {
          setContinueTime(result.lastViewTime);
        }
      })
  }, [])

  useEffect(() => {
    if (ContinueTime && VideoHandler?.h) {
      if (ContinueTime && ContinueTime !== 0) {
        videoViewContinueConfirmDialogRef.current?.showModal();
      }
    }
  }, [videoViewContinueConfirmDialogRef, ContinueTime, VideoHandler]);

  useEffect(() => {
    return () => {
      if (VideoHandler) {
        // 글 작성할 때마다 글 저장
        // 나갈 때도 저장됨
        saveNoteData();
      }
    }
  }, [TextNote, VideoHandler]);

  useEffect(() => {
    resetTranscript();
  }, [finalTranscript]);

  const saveNoteData = useCallback(() => {
    // 현재 상태 저장 로직
    console.log(TextNote);
    let now = VideoHandler.getCurrentTime();
    const total = VideoHandler.getDuration();
    if (total <= now) {
      now = 0;
    }
    const data = {
      textNote: TextNote,
      lastViewTime: now,
      playListInVideo: queryString.current
    }
    dispatch(updateTextNoteLastViewTime(data));
  }, [TextNote, VideoHandler]);

  const onReadyPlayer: YouTubeProps['onReady'] = useCallback((e: YouTubeEvent<any>) => {
    setVideoHandler(e.target);
  }, []);

  const onClickAddBookmark = useCallback(() => {
    const data = {
      time: VideoHandler.getCurrentTime(),
      playListInVideo: queryString.current,
    }
    dispatch(addBookmark(data)).unwrap();
  }, [VideoHandler]);

  const onClickBefore = useCallback(() => {
    if (VideoHandler) {
      const now = VideoHandler.getCurrentTime();
      VideoHandler.seekTo(now - 10);
    }
  }, [VideoHandler]);

  const onClickAfter = useCallback(() => {
    if (VideoHandler) {
      const now = VideoHandler.getCurrentTime();
      VideoHandler.seekTo(now + 10);
    }
  }, [VideoHandler]);

  const onClickStart = useCallback(() => {
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  }, []);

  const onClickEnd = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  const onClickPin = useCallback(() => {
    const data = {
      isPinned: videoInfo?.isPinned === 1 ? 0 : 1,
      playListInVideo: queryString.current,
    }
    dispatch(updateIsPinned(data)).unwrap();
  }, [videoInfo?.isPinned]);

  const clickBookmark = useCallback((time: number) => {
    VideoHandler.seekTo(time);
  }, [VideoHandler]);

  if (!VideoId) {
    return <div>로딩중..</div>
  }

  return (
    <>
      <Title title={`비디오 - ${videoInfo?.videoName}`} />
      <VideoViewFlexWrapper>
        {/* video */}
        <LeftWrapper>
          <div ref={YoutubeTag}>
            <YouTube videoId={VideoId} onReady={onReadyPlayer} opts={opts} />
          </div>
          {/* operation buttons */}
          <VideoViewOperationDivWrapper>
            <StyledButton className='normal' onClick={onClickAddBookmark}>북마크 추가</StyledButton>
            {
              listening
                ? <StyledButton className='danger' onClick={onClickEnd}>STT 중단</StyledButton>
                : <StyledButton className='normal' onClick={onClickStart}>STT 시작</StyledButton>
            }
            <StyledButton className='normal' onClick={onClickBefore}>&nbsp;- 10초</StyledButton>
            <StyledButton className='normal' onClick={onClickAfter}>&nbsp;+ 10초</StyledButton>
            {
              videoInfo?.isPinned
                ? <span onClick={onClickPin}><i className="fa-solid fa-star"></i></span>
                : <span onClick={onClickPin}><i className="fa-regular fa-star"></i></span>
            }

          </VideoViewOperationDivWrapper>
          {/* bookmarks */}
          <BookmarkList videoHandler={VideoHandler} bookmarks={videoInfo?.bookmarkList} clickBookmark={clickBookmark} />
        </LeftWrapper>
        {/* text editor */}
        <EditorDivWrapper>
          <CustomTextEditor finalTranscript={finalTranscript} textNote={TextNote} setTextNote={setTextNote} />
        </EditorDivWrapper>
      </VideoViewFlexWrapper>
      <VideoViewContinueConfirmDialog videoViewContinueConfirmDialogRef={videoViewContinueConfirmDialogRef} time={ContinueTime} clickBookmark={clickBookmark} />
    </>
  )
};

export default VideoView;
