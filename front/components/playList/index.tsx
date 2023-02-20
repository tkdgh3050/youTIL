import React, { FunctionComponent, useCallback } from 'react';

import { PlayList } from '../../actions/note';
import VideoList from '../videoList/index';
import {
  StyledButton, ListControlDivWrapper, ListDivWrapper,
  ListOperatorDivWrapper, OverflowSpan, VideoListDivWrapper
} from './styles';

const PlayList: FunctionComponent<{ data: PlayList, clickAddVideoList(id: string): void }> = ({ data, clickAddVideoList }) => {

  const onClickToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active');
    e.currentTarget.parentElement?.nextElementSibling?.classList.toggle('active');
  }

  const onClickAddVideoListButton = useCallback(() => {
    clickAddVideoList(data.id);
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
          <StyledButton className='danger'>목록 삭제</StyledButton>
        </ListOperatorDivWrapper>
      </ListControlDivWrapper>
      <VideoListDivWrapper>
        {data.videoList?.length
          ? data.videoList.map((video) => <VideoList key={video.videoName + video.id} data={video} />)
          : <div>동영상이 없습니다.</div>
        }
      </VideoListDivWrapper>
    </ListDivWrapper>
  )
};

export default PlayList;