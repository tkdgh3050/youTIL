import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { lodeNoteData } from '../../actions/note';

import Title from '../../components/title';
import PlayList from '../../components/playList';
import { RootState } from '../../reducers';
import { NoteState } from '../../reducers/note';
import { useAppDispatch } from '../../store/configureStore';
import {
  CenterDivWrapper, AllListControlDivWrapper, StyledButton,
} from './styles';

const MyNote = () => {
  const note = useSelector<RootState, NoteState>((state) => state.note);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const req = dispatch(lodeNoteData());
    req.unwrap()
      .then((result) => {
        console.log('done', result);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <Title title='내 노트' />
      <CenterDivWrapper>
        <AllListControlDivWrapper>
          <span>내 재생목록</span>
          <StyledButton className='primary'>재생목록 추가</StyledButton>
        </AllListControlDivWrapper>
        {note.noteData
          ? note.noteData.map((data) => <PlayList key={data.playListName} data={data} />)
          : <div>재생목록이 없습니다.</div>
        }
      </CenterDivWrapper>
    </>

  )
};

export default MyNote;
