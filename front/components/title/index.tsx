import React, { FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';

const TitleH2Wrapper = styled.h2`
  margin: 0;
  position: absolute;
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