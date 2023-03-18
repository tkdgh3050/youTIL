import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

const TitleH2Wrapper = styled.h2`
  margin: 0;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  width: -webkit-fill-available;
  text-overflow: ellipsis;
`;

const Title: FunctionComponent<{ title: string }> = ({ title }) => {
  useEffect(() => {
    document.title = title === '' ? 'YouTIL' : `${title} | YouTIL`
  }, [title])

  return (
    <>
      <TitleH2Wrapper>{title}</TitleH2Wrapper>
    </>
  )
};

export default Title;