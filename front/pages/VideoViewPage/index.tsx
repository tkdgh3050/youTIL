import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube, { YouTubeEvent, YouTubeProps, YouTubePlayer } from 'react-youtube';
import { ContentState, Editor, } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertFromHTML, Modifier } from 'draft-js';
import html2canvas from 'html2canvas';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import BookmarkList from '../../components/bookmarkList';
import { StyledButton } from '../../components/playList/styles';
import Title from '../../components/title';
import { VideoViewFlexWrapper, LeftWrapper, VideoViewOperationDivWrapper, EditorDivWrapper } from './styles';
import { useAppDispatch } from '../../store/configureStore';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { addBookmark, loadVideoInfoData, Video } from '../../actions/note';
import { videoViewQueryString } from '../../components/videoList';

const changeSecondsToTimeString = (seconds: number) => {
  const hours = Math.trunc(seconds / 3600) < 10 ? '0' + Math.trunc(seconds / 3600) : Math.trunc(seconds / 3600).toString();
  const mins = Math.trunc((seconds % 3600) / 60) < 10 ? '0' + Math.trunc((seconds % 3600) / 60) : Math.trunc((seconds % 3600) / 60).toString();
  const secs = seconds % 60 < 10 ? '0' + Math.trunc(seconds % 60) : Math.trunc(seconds % 60).toString();
  return [hours, mins, secs].join(':');
};

const VideoView = () => {
  const videoInfo = useSelector<RootState, Video | null>((state) => state.note.videoInfo);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryString = useRef<videoViewQueryString>(location.state);
  const YoutubeTag = useRef<HTMLDivElement>(null);
  const textEditorRef = useRef<Editor>(null);

  const [StateEditor, setStateEditor] = useState(EditorState.createEmpty());
  const [VideoId, setVideoId] = useState('');
  const [VideoHandler, setVideoHandler] = useState<YouTubePlayer>();
  const [TextNote, setTextNote] = useState<Draft.RawDraftContentState>();


  useEffect(() => {
    dispatch(loadVideoInfoData(queryString.current)).unwrap()
      .then((result) => {
        if (result?.textNote) {
          setStateEditor(EditorState.createWithContent(convertFromRaw(result.textNote)));
        }
      });
  }, []);

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      modestbranding: 1,
    }
  };

  const onReadyPlayer: YouTubeProps['onReady'] = useCallback((e: YouTubeEvent<any>) => {
    setVideoId('2zjoKjt97vQ');
    setVideoHandler(e.target);
  }, [VideoId]);

  const addContentIntoTextEditor = useCallback((text) => {
    const currentContent = StateEditor.getCurrentContent();
    const currentSelection = StateEditor.getSelection();
    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text,
    );
    setStateEditor(EditorState.push(StateEditor, newContent, 'insert-fragment'));
  }, [StateEditor]);

  const onClickAddBookmark = useCallback(() => {
    const timeString = changeSecondsToTimeString(VideoHandler.getCurrentTime());
    dispatch(addBookmark(timeString)).unwrap()
      .then((result) => {
        addContentIntoTextEditor('#' + timeString + " ");
        textEditorRef.current?.focusEditor();
      });
  }, [VideoHandler, StateEditor]);

  const onClickTakeScreenshot = useCallback(() => {
    console.log('screen', TextNote);

  }, [VideoHandler, YoutubeTag, TextNote]);

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

  const onContentStateChange = useCallback((contentState: Draft.RawDraftContentState) => {
    setTextNote(contentState);
  }, []);

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
            <StyledButton className='normal' onClick={onClickTakeScreenshot}>스크린샷</StyledButton>
            <StyledButton className='normal' onClick={onClickBefore}>&nbsp;- 10초</StyledButton>
            <StyledButton className='normal' onClick={onClickAfter}>&nbsp;+ 10초</StyledButton>
          </VideoViewOperationDivWrapper>
          {/* bookmarks */}
          <BookmarkList videoHandler={VideoHandler} bookmarks={videoInfo?.bookmarkList} />
        </LeftWrapper>
        {/* text editor */}
        <EditorDivWrapper>
          <Editor
            ref={textEditorRef}
            editorState={StateEditor}
            onEditorStateChange={setStateEditor}
            wrapperClassName="wrapper-class"
            editorClassName="editor"
            toolbarClassName="toolbar-class"
            placeholder="필기를 작성하세요!"
            onContentStateChange={onContentStateChange}
            localization={{
              locale: 'ko',
            }}
          />
        </EditorDivWrapper>
      </VideoViewFlexWrapper>
    </>
  )
};

export default VideoView;
