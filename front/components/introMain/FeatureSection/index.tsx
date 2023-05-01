import React from 'react';

import { FeatureDivWrapper, LineDivWrapper, BoxDivWrapper } from './styles';

// 인트로페이지 - YouTIL 특징 부분
function FeatureSection() {
  return (
    <FeatureDivWrapper>
      <LineDivWrapper>
        <BoxDivWrapper>
          <div>1</div>
          <span>내 플레이리스트</span>
          <hr />
          <p>내 플레이리스트를 만들어 원하는 카테고리별로 정리</p>
        </BoxDivWrapper>
        <BoxDivWrapper>
          <div>2</div>
          <span>즐겨찾기 기능</span>
          <hr />
          <p>즐겨찾기로 등록하면 메인화면에서 바로 확인 가능</p>
        </BoxDivWrapper>
        <BoxDivWrapper>
          <div>3</div>
          <span>이어보기 기능</span>
          <hr />
          <p>동영상을 보다가 나가면 나중에 해당 위치에서 자동으로 이어보기 가능</p>
        </BoxDivWrapper>
        <BoxDivWrapper>
          <div>4</div>
          <span>북마크 기능</span>
          <hr />
          <p>원하는 동영상 위치에서 북마크 추가하여 해당 위치 저장 가능</p>
        </BoxDivWrapper>
        <BoxDivWrapper>
          <div>5</div>
          <span>노트필기 기능</span>
          <hr />
          <p>동영상을 보면서 기록이 필요한 내용을 노트필기 작성 가능</p>
        </BoxDivWrapper>
        <BoxDivWrapper>
          <div>6</div>
          <span>필기 내 STT</span>
          <hr />
          <p>마이크장치를 통해 STT (Speech-To-Text) 로 자동 노트필기 작성 가능</p>
        </BoxDivWrapper>
      </LineDivWrapper>
    </FeatureDivWrapper>
  );
}

export default FeatureSection;
