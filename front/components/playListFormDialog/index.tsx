import React, { FunctionComponent, useCallback, useState } from 'react'
import { addPlayList } from '../../actions/note';

import { ErrorDivWrapper } from '../../pages/LoginPage/styles';
import { useAppDispatch } from '../../store/configureStore';
import { StyledButton } from '../playList/styles';
import { DialogWrapper, DialogFormWrapper, DialogMenuWrapper } from './styles';

const PlayListFormDialog: FunctionComponent<{ addPlayListDialog: React.RefObject<HTMLDialogElement> }> = ({ addPlayListDialog }) => {
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
    dispatch(addPlayList({ id: '1', playListName: PlayListName }));
    addPlayListDialog.current?.close();
  }, [PlayListName, addPlayListDialog]);

  const onCloseAddPlayList = useCallback(() => {
    setPlayListName('');
    setPlayListNameError(false);
    addPlayListDialog.current?.close();
  }, [addPlayListDialog]);


  return (
    <DialogWrapper ref={addPlayListDialog} onClose={onCloseAddPlayList}>
      <DialogFormWrapper onSubmit={onSubmitAddPlayList} method="dialog">
        <h3>재생목록 추가</h3>
        <input type="text" name='playListName' value={PlayListName} onChange={onChangePlayListName} placeholder="재생목록 이름" />
        {PlayListNameError && <ErrorDivWrapper>재생목록 이름을 입력해주세요.</ErrorDivWrapper>}
        <DialogMenuWrapper>
          <StyledButton className='danger' type='button' onClick={onCloseAddPlayList}>취소</StyledButton>
          <StyledButton className='primary' type="submit">생성</StyledButton>
        </DialogMenuWrapper>
      </DialogFormWrapper>
    </DialogWrapper>
  )
};

export default PlayListFormDialog;