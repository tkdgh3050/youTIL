import React, { FunctionComponent, useCallback } from 'react';

import { PlayList } from '../../actions/note';
import VideoList from '../videoList/index';
import {
  StyledButton, ListControlDivWrapper, ListDivWrapper,
  ListOperatorDivWrapper, OverflowSpan, VideoListDivWrapper
} from './styles';

type propType = {
  data: PlayList,
  clickAddVideoList(id: number[]): void,
  clickDeletePlayList(id: number[], name: string): void,
  clickDeleteVideo(id: number[], name: string): void,
};

// 내 플레이리스트 화면에서 플레이리스트 그려주는 컴포넌트
const PlayListComp: FunctionComponent<propType> = ({ data, clickAddVideoList, clickDeletePlayList, clickDeleteVideo }) => {

  const onClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    // 플레이리스트 토글 클릭 시 닫혔다가 열렸다가 함
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }

  const onClickAddVideoListButton = useCallback(() => {
    // 비디오 추가 눌렀을 시 상위 컴포넌트로 아이디 값 넘겨줌
    clickAddVideoList([data.id]);
  }, [data]);

  const onClickDeleteListButton = useCallback(() => {
    // 플레이리스트 삭제 버튼 눌었을 시 상위 컴포넌트로 값 넘겨줌
    clickDeletePlayList([data.id], data.playListName);
  }, [data]);

  return (
    <ListDivWrapper>
      <ListControlDivWrapper>
        <OverflowSpan onClick={onClickToggle}>
          <i className="fa-solid fa-play"></i> &nbsp;
          <span>{data.playListName}</span>
        </OverflowSpan>
        <ListOperatorDivWrapper>
          <StyledButton className='primary' onClick={onClickAddVideoListButton}>동영상 추가</StyledButton>
          <StyledButton className='danger' onClick={onClickDeleteListButton}>목록 삭제</StyledButton>
        </ListOperatorDivWrapper>
      </ListControlDivWrapper>
      <VideoListDivWrapper>
        {data.videoList?.length
          ? data.videoList.map((video) => <VideoList key={video.videoName + video.id} data={video} clickDeleteVideo={clickDeleteVideo} playListId={data.id} />)
          : <div>동영상이 없습니다.</div>
        }
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
};

export default PlayListComp;