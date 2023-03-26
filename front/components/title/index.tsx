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

// 웹페이지 타이틀 지정해주는 공통부분. 각 회면에 진입하면 이 컴포넌트를 불러와 제목과 타이틀을 변경해줌
const Title: FunctionComponent<{ title: string }> = ({ title }) => {
  useEffect(() => {
    // 타이틀을 빈 값으로 설정 시 기본값 YouTIL 적용
    document.title = title === '' ? 'YouTIL' : `${title} | YouTIL`
  }, [title])

  return (
    <>
      <TitleH2Wrapper>{title}</TitleH2Wrapper>
    </>
  )
};

export default Title;