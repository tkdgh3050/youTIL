import React, { FunctionComponent, useCallback, useState } from 'react'
import { addPlayList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from './styles';

const PlayListFormDialog: FunctionComponent<{ addPlayListDialogRef: React.RefObject<HTMLDialogElement> }> = ({ addPlayListDialogRef }) => {
  const dispatch = useAppDispatch();
  const [PlayListName, setPlayListName] = useState('');
  const [PlayListNameError, setPlayListNameError] = useState(false);

  const onChangePlayListName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayListName(e.target.value);
    setPlayListNameError(false);
  }, [PlayListName]);

  const onSubmitAddPlayList = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!PlayListName) {
      setPlayListNameError(true);
      return;
    }
    console.log(PlayListName);
    dispatch(addPlayList({ id: -1, playListName: PlayListName }));
    addPlayListDialogRef.current?.close();
  }, [PlayListName, addPlayListDialogRef]);

  const onCloseAddPlayList = useCallback(() => {
    setPlayListName('');
    setPlayListNameError(false);
    addPlayListDialogRef.current?.close();
  }, [addPlayListDialogRef]);


  return (
    <DialogWrapper ref={addPlayListDialogRef} onClose={onCloseAddPlayList}>
      <DialogFormWrapper onSubmit={onSubmitAddPlayList} method="dialog">
        <h3>재생목록 추가</h3>
        <input type="text" name='playListName' value={PlayListName} onChange={onChangePlayListName} placeholder="재생목록 이름" />
        {PlayListNameError && <ErrorDivWrapper>재생목록 이름을 입력해주세요.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className='normal' type='button' onClick={onCloseAddPlayList}>취소</StyledButton>
          <StyledButton className='primary' type="submit">생성</StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  )
};

export default PlayListFormDialog;