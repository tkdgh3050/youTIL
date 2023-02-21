import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube, { } from 'react-youtube';
import { Editor, } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from 'styled-components';

import BookmarkList from '../../components/bookmarkList';
import { StyledButton } from '../../components/playList/styles';
import Title from '../../components/title';

export const VideoViewFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: var(--padding-size-l);
`;

export const YoutubeWrapper = styled(YouTube)`
  display: flex;
  justify-content: center;
`
export const VideoViewOperationDivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  padding-bottom: var(--padding-size-m);
  & button {
    margin: 0;
  }
`

export const EditorDivWrapper = styled.div`
  .wrapper-class{
    width: 90vw;
    margin: 0 auto;
    margin-bottom: 4rem;
    padding-top: var(--padding-size-m);
  }
  .editor {
    height: 500px ;
    border: 1px solid #f1f1f1 ;
    padding: 5px ;
    border-radius: 2px ;
  }
`;

const VideoView = () => {
  const [StateEditor, setStateEditor] = useState(EditorState.createEmpty());
  // const { videoId } = useParams();
  const onReadyPlayer = useCallback((e) => {
    console.log(e);
  }, []);

  const opts = {
    height: '220',
    width: '340',
  }
  return (
    <>
      <Title title='비디오' />
      <VideoViewFlexWrapper>
        {/* video */}
        <YouTube videoId='2zjoKjt97vQ' onReady={onReadyPlayer} opts={opts} />
        {/* operation buttons */}
        <VideoViewOperationDivWrapper>
          <StyledButton className='normal'>북마크 추가</StyledButton>
          <StyledButton className='normal'>스크린샷</StyledButton>
          <StyledButton className='normal'>느리게</StyledButton>
          <StyledButton className='normal'>빠르게</StyledButton>
        </VideoViewOperationDivWrapper>
        {/* bookmarks */}
        <BookmarkList />
        {/* text editor */}
        <EditorDivWrapper>
          <Editor
            editorState={StateEditor}
            onEditorStateChange={setStateEditor}
            // 에디터와 툴바 모두에 적용되는 클래스
            wrapperClassName="wrapper-class"
            // 에디터 주변에 적용된 클래스
            editorClassName="editor"
            // 툴바 주위에 적용된 클래스
            toolbarClassName="toolbar-class"
            placeholder="내용을 작성해주세요."
            // 한국어 설정
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
