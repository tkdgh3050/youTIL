import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { lodePlayList } from '../../actions/note';

import Title from '../../components/title';
import PlayListComp from '../../components/playList';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import { CenterDivWrapper, AllListControlDivWrapper, StyledButton } from './styles';
import PlayListFormDialog from '../../components/playListFormDialog';
import VideoListFormDialog from '../../components/videoListFormDialog';
import DeleteConfirmDialog, { DeleteFlag } from '../../components/deleteConfirmDialog';
import { UserState } from '../../reducers/user';

// 내 노트 목록 보여주는 페이지
function MyNote() {
  const note = useSelector<RootState, NoteState>(state => state.note);
  const user = useSelector<RootState, UserState>(state => state.user);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const addPlayListDialogRef = useRef<HTMLDialogElement>(null);
  const addVideoListDialogRef = useRef<HTMLDialogElement>(null);
  const deleteConfirmDialogRef = useRef<HTMLDialogElement>(null);
  const [ParamId, setParamId] = useState<number[]>([]);
  const [DeleteFlag, setDeleteFlag] = useState<DeleteFlag>('');
  const [DeleteName, setDeleteName] = useState('');

  useEffect(() => {
    // 로그인 하지 않은 경우 접근하지 못하므로 로그인 페이지로 리다이렉션
    if (!user.userInfo) {
      alert('로그인이 필요합니다.');
      navigator('/login');
    }
  }, [user]);

  useEffect(() => {
    // 내 노트 목록 불러오기
    const req = dispatch(lodePlayList());
    req
      .unwrap()
      .then(() => {
        // console.log('done', result);
      })
      .catch(() => {
        // console.log(err);
      });
  }, []);

  const onClickAddPlayList = useCallback(() => {
    // 플레이리스트 버튼 클릭 시 다이얼로그 보여주기
    if (addPlayListDialogRef.current) {
      addPlayListDialogRef.current.showModal();
    }
  }, [addPlayListDialogRef]);

  const clickAddVideoList = useCallback(
    (id: number[]) => {
      // 비디오 추가 버튼 클릭 시 다이얼로그 보여주기
      if (addVideoListDialogRef.current) {
        setParamId(id);
        addVideoListDialogRef.current.showModal();
      }
    },
    [addVideoListDialogRef],
  );

  const clickDeletePlayList = useCallback(
    (id: number[], name: string) => {
      // 플레이리스트 삭제 버튼 클릭 시
      if (deleteConfirmDialogRef.current) {
        setDeleteFlag('playList');
        setDeleteName(name);
        setParamId(id);
        deleteConfirmDialogRef.current.showModal();
      }
    },
    [deleteConfirmDialogRef],
  );

  const clickDeleteVideo = useCallback(
    (id: number[], name: string) => {
      // 비디오 삭제 버튼 클릭 시
      if (deleteConfirmDialogRef.current) {
        setDeleteFlag('video');
        setDeleteName(name);
        setParamId(id);
        deleteConfirmDialogRef.current.showModal();
      }
    },
    [deleteConfirmDialogRef],
  );

  if (!user.userInfo) {
    // 로그인하지 않은 유저가 접근하면 화면을 그릴 필요 없으므로 표시
    return null;
  }

  return (
    <>
      <Title title="내 노트" />
      <CenterDivWrapper>
        <AllListControlDivWrapper>
          <span>내 재생목록</span>
          <StyledButton className="primary" onClick={onClickAddPlayList}>
            재생목록 추가
          </StyledButton>
        </AllListControlDivWrapper>
        {note.playList?.length ? (
          note.playList.map(data => (
            <PlayListComp
              key={data.playListName}
              data={data}
              clickAddVideoList={clickAddVideoList}
              clickDeletePlayList={clickDeletePlayList}
              clickDeleteVideo={clickDeleteVideo}
            />
          ))
        ) : (
          <div>재생목록이 없습니다.</div>
        )}
      </CenterDivWrapper>
      <PlayListFormDialog addPlayListDialogRef={addPlayListDialogRef} />
      <VideoListFormDialog addVideoListDialogRef={addVideoListDialogRef} id={ParamId} />
      <DeleteConfirmDialog
        deleteConfirmDialogRef={deleteConfirmDialogRef}
        flag={DeleteFlag}
        id={ParamId}
        name={DeleteName}
      />
    </>
  );
}

export default MyNote;
