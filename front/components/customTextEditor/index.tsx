import React, { FunctionComponent, useEffect, useState, useCallback, useRef } from 'react';
import DOMPurify from 'dompurify';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { BookmarkSpan, TextEditorButton, TextEditorDiv, TextEditorDivWrapper, TextEditorHeaderDivWrapper } from './styles';

type props = {
  finalTranscript: string,
  textNote: string,
  setTextNote: React.Dispatch<React.SetStateAction<string>>
}

// 텍스트 에디터 component
const CustomTextEditor: FunctionComponent<props> = ({ finalTranscript, textNote, setTextNote }) => {
  // const [TextState, setTextState] = useState('');
  const TextStateRef = useRef<HTMLElement | null>(null);

  const onChangeTextEditor = useCallback((e: ContentEditableEvent) => {
    // 텍스트 에디터 내부에 값이 변경될 때 마다 purify 진행한 값을 저장해주는 이벤트
    setTextNote(DOMPurify.sanitize(e.target.value));
  }, []);

  const onClickOperation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // 텍스트에디터 내부 오퍼레이션을 적용해주는 이벤트
    let command = e.currentTarget.dataset.operation;
    if (command) {
      document.execCommand(command, false);
    }
    if (TextStateRef.current) {
      TextStateRef.current.focus();
    }
  }, [TextStateRef]);

  useEffect(() => {
    // STT가 진행되면 finalTranscript 값이 prop으로 들어오고 그 값을 텍스트 에디터에도 추가해주는 로직
    setTextNote((prev) => prev + finalTranscript);
  }, [finalTranscript]);

  return (
    <TextEditorDivWrapper >
      <TextEditorHeaderDivWrapper>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="bold">
          <i className="fa-solid fa-bold"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="italic">
          <i className="fa-solid fa-italic"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="underline">
          <i className="fa-solid fa-underline"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="insertUnorderedList">
          <i className="fa-solid fa-list-ul"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="insertOrderedList">
          <i className="fa-solid fa-list-ol"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="insertHorizontalRule">
          <i className="fa-solid fa-minus"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="justifyLeft">
          <i className="fa-solid fa-align-left"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="justifyCenter">
          <i className="fa-solid fa-align-center"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="justifyRight">
          <i className="fa-solid fa-align-right"></i>
        </TextEditorButton>
        <TextEditorButton onClick={onClickOperation} type='button' data-operation="justifyFull">
          <i className="fa-solid fa-align-justify"></i>
        </TextEditorButton>
      </TextEditorHeaderDivWrapper>
      <TextEditorDiv
        innerRef={TextStateRef}
        html={textNote}
        disabled={false}
        onChange={onChangeTextEditor}
        tagName='article'
      ></TextEditorDiv>
    </TextEditorDivWrapper>
  )
};

export default CustomTextEditor;
