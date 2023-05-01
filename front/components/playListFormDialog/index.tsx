import React, { FunctionComponent, useCallback, useState } from 'react';
import { addPlayList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from './styles';

// 재생목록 추가 다이얼로그
const PlayListFormDialog: FunctionComponent<{ addPlayListDialogRef: React.RefObject<HTMLDialogElement> }> = ({
  addPlayListDialogRef,
}) => {
  const dispatch = useAppDispatch();
  const [PlayListName, setPlayListName] = useState('');
  const [PlayListNameError, setPlayListNameError] = useState(false);

  const onChangePlayListName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 플레이리스트 이름 입력 시
      setPlayListName(e.target.value);
      setPlayListNameError(false);
    },
    [PlayListName],
  );

  const onSubmitAddPlayList = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // 플레이리스트 추가 버튼 클릭 시
      e.preventDefault();

      if (!PlayListName) {
        // 플레이리스트 이름을 적지 않으면 예외처리
        setPlayListNameError(true);
        return;
      }

      // 플레이리스트를 추가한 뒤 다이얼로그 닫기
      dispatch(addPlayList({ id: -1, playListName: PlayListName }));
      addPlayListDialogRef.current?.close();
    },
    [PlayListName, addPlayListDialogRef],
  );

  const onCloseAddPlayList = useCallback(() => {
    // 취소 버튼 클릭 시
    setPlayListName('');
    setPlayListNameError(false);
    addPlayListDialogRef.current?.close();
  }, [addPlayListDialogRef]);

  return (
    <DialogWrapper ref={addPlayListDialogRef} onClose={onCloseAddPlayList}>
      <DialogFormWrapper onSubmit={onSubmitAddPlayList} method="dialog">
        <h3>재생목록 추가</h3>
        <input
          type="text"
          name="playListName"
          value={PlayListName}
          onChange={onChangePlayListName}
          placeholder="재생목록 이름"
        />
        {PlayListNameError && <ErrorDivWrapper>재생목록 이름을 입력해주세요.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className="normal" type="button" onClick={onCloseAddPlayList}>
            취소
          </StyledButton>
          <StyledButton className="primary" type="submit">
            생성
          </StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  );
};

export default PlayListFormDialog;
