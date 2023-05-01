import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';

export const TextEditorDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

export const TextEditorHeaderDivWrapper = styled.div`
  border-bottom: 1px solid var(--color-gray-light);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 40px;
  padding: 0 var(--padding-size-s);
  background-color: var(--color-gray-light);
`;

export const TextEditorButton = styled.button`
  cursor: pointer;
  margin: 0 1px;
  width: 28px;
  height: 20px;
  border: none;
`;

// export const TextEditorDiv = styled.div`
//   padding: 0 var(--padding-size-s);
//   outline: none;
//   min-height: 600px;
// `;

export const TextEditorDiv = styled(ContentEditable)`
  padding: 0 var(--padding-size-s);
  outline: none;
  min-height: 600px;
`;

export const BookmarkSpan = styled.span`
  color: aqua;
  background-color: var(--color-gray-light);
`;
