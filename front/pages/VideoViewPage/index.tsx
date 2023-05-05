import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube, { YouTubeEvent, YouTubeProps, YouTubePlayer } from 'react-youtube';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import dialogPolyfill from 'dialog-polyfill';

import BookmarkList from '../../components/bookmarkList';
import CustomTextEditor from '../../components/customTextEditor';
import Title from '../../components/title';
import { StyledButton } from '../../components/playList/styles';
import {
  VideoViewFlexWrapper, LeftWrapper, VideoViewOperationDivWrapper, EditorDivWrapper,
} from './styles';
import { useAppDispatch } from '../../store/configureStore';
import { RootState } from '../../reducers';
import {
  addBookmark,
  loadVideoInfoData,
  PlayListInVideo,
  updateIsPinned,
  updateTextNoteLastViewTime,
  Video,
} from '../../actions/note';
import VideoViewContinueConfirmDialog from '../../components/videoViewContinueConfirmDialog';
import { UserState } from '../../reducers/user';

// 비디오 보는 페이지
function VideoView() {
  const videoInfo = useSelector<RootState, Video | null>(state => state.note.videoInfo);
  const user = useSelector<RootState, UserState>(state => state.user);
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
    },
  }); // 유튜브API 기본 설정
  const { finalTranscript, listening, resetTranscript } = useSpeechRecognition(); // STT API 기본 state

  useEffect(() => {
    // 로그인 하지 않은 경우 로그인 페이지로 리다이렉션
    if (!user.userInfo) {
      alert('로그인이 필요합니다.');
      navigator('/login');
    }
  }, [user]);

  // useEffect(() => {
  //   if (videoViewContinueConfirmDialogRef.current) dialogPolyfill.registerDialog(videoViewContinueConfirmDialogRef.current);

  //   return () => {
  //     if (videoViewContinueConfirmDialogRef.current?.open) videoViewContinueConfirmDialogRef.current?.close();
  //   };
  // }, [videoViewContinueConfirmDialogRef]);

  useEffect(() => {
    // 비디오 정보 로드하는 부분
    dispatch(loadVideoInfoData(queryString.current))
      .unwrap()
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
      });
  }, []);

  useEffect(() => {
    // 비디오에 이전 보던 시간이 존재하는 경우 이어볼지 여부 확인하는 다이얼로그 띄우기
    if (ContinueTime && VideoHandler?.h) {
      if (ContinueTime && ContinueTime !== 0) {
        if (videoViewContinueConfirmDialogRef.current) dialogPolyfill.registerDialog(videoViewContinueConfirmDialogRef.current);
        videoViewContinueConfirmDialogRef.current?.showModal();
      }
    }
  }, [videoViewContinueConfirmDialogRef, ContinueTime, VideoHandler]);

  useEffect(() => {
    // STT가 끝나면 finalTranscript 가 만들어지고, 기존 STT 한 부분은 리셋해주기 위한 로직
    resetTranscript();
  }, [finalTranscript]);

  const saveNoteData = useCallback(() => {
    // 현재 상태 저장 로직
    let now = VideoHandler.getCurrentTime();
    const total = VideoHandler.getDuration();
    if (total - 10 <= now) {
      // 끝나기 10초 전까지 봤으면 다 본 것으로 처리
      now = 0;
    }
    const data = {
      textNote: TextNote,
      lastViewTime: now,
      playListInVideo: queryString.current,
    };
    dispatch(updateTextNoteLastViewTime(data));
  }, [TextNote, VideoHandler]);

  useEffect(
    () => () => {
      if (VideoHandler) {
        // 나갈 때도 저장됨
        saveNoteData();
      }
    },
    [TextNote, VideoHandler],
  );

  const onReadyPlayer: YouTubeProps['onReady'] = useCallback((e: YouTubeEvent<any>) => {
    // 유튜브 API가 비디오를 다 불러온 경우 실행. 해당 비디오를 컨트롤 할 수 있는 객체를 저장해둠
    setVideoHandler(e.target);
  }, []);

  const onStateChange = useCallback(
    (event: YouTubeEvent<number>) => {
      // 비디오를 멈추거나 재생할때도 마지막으로 본 위치 저장하기 위한 함수
      if (event.data === 1 || event.data === 2) {
        // 1은 동영상 재생, 2는 동영상 멈춤
        saveNoteData();
      }
    },
    [TextNote, VideoHandler],
  );

  const onClickAddBookmark = useCallback(() => {
    // 북마크 추가 버튼 클릭 시
    const data = {
      time: VideoHandler.getCurrentTime(),
      playListInVideo: queryString.current,
    };
    dispatch(addBookmark(data)).unwrap();
  }, [VideoHandler]);

  const onClickBefore = useCallback(() => {
    // 10초 전 버튼 클릭 시
    if (VideoHandler) {
      const now = VideoHandler.getCurrentTime();
      VideoHandler.seekTo(now - 10);
    }
  }, [VideoHandler]);

  const onClickAfter = useCallback(() => {
    // 10초 후 버튼 클릭 시
    if (VideoHandler) {
      const now = VideoHandler.getCurrentTime();
      VideoHandler.seekTo(now + 10);
    }
  }, [VideoHandler]);

  const onClickStart = useCallback(() => {
    // STT 버튼 클릭 시
    // 한번 시작하면 멈출 때까지 지속하고 언어는 한국어로 지정
    SpeechRecognition.startListening({ continuous: true, language: 'ko' });
  }, []);

  const onClickEnd = useCallback(() => {
    // STT 중단 클릭 시
    SpeechRecognition.stopListening();
  }, []);

  const onClickPin = useCallback(() => {
    // 즐겨찾기 클릭 시
    const data = {
      isPinned: videoInfo?.isPinned === 1 ? 0 : 1,
      playListInVideo: queryString.current,
    };
    dispatch(updateIsPinned(data)).unwrap();
  }, [videoInfo?.isPinned]);

  const clickBookmark = useCallback(
    (time: number) => {
      // 북마크 클릭 시 해당 위치로 이동
      VideoHandler.seekTo(time);
    },
    [VideoHandler],
  );

  if (!VideoId) {
    // 로딩중인 경우 표시
    return <div>로딩중..</div>;
  }

  return (
    <>
      <Title title={`비디오 - ${videoInfo?.videoName}`} />
      <VideoViewFlexWrapper>
        {/* video */}
        <LeftWrapper>
          <div ref={YoutubeTag}>
            <YouTube videoId={VideoId} onReady={onReadyPlayer} opts={opts} onStateChange={onStateChange} />
          </div>
          {/* operation buttons */}
          <VideoViewOperationDivWrapper>
            <StyledButton className="normal" onClick={onClickAddBookmark}>
              북마크 추가
            </StyledButton>
            {listening ? (
              <StyledButton className="danger" onClick={onClickEnd}>
                STT 중단
              </StyledButton>
            ) : (
              <StyledButton className="normal" onClick={onClickStart}>
                STT 시작
              </StyledButton>
            )}
            <StyledButton className="normal" onClick={onClickBefore}>
              &nbsp;- 10초
            </StyledButton>
            <StyledButton className="normal" onClick={onClickAfter}>
              &nbsp;+ 10초
            </StyledButton>
            {videoInfo?.isPinned ? (
              <span onClick={onClickPin} onKeyDown={onClickPin} role="button" tabIndex={0}>
                <i className="fa-solid fa-star" />
              </span>
            ) : (
              <span onClick={onClickPin} onKeyDown={onClickPin} role="button" tabIndex={0}>
                <i className="fa-regular fa-star" />
              </span>
            )}
          </VideoViewOperationDivWrapper>
          {/* bookmarks */}
          <BookmarkList videoHandler={VideoHandler} bookmarks={videoInfo?.bookmarkList} clickBookmark={clickBookmark} />
        </LeftWrapper>
        {/* text editor */}
        <EditorDivWrapper>
          <CustomTextEditor finalTranscript={finalTranscript} textNote={TextNote} setTextNote={setTextNote} />
        </EditorDivWrapper>
      </VideoViewFlexWrapper>
      <VideoViewContinueConfirmDialog
        videoViewContinueConfirmDialogRef={videoViewContinueConfirmDialogRef}
        time={ContinueTime}
        clickBookmark={clickBookmark}
      />
    </>
  );
}

export default VideoView;
