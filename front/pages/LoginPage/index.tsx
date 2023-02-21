import React, { useState, useCallback, FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../actions/user';

import Title from '../../components/title';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';
import { useAppDispatch } from '../../store/configureStore';
import { ErrorDivWrapper, FormDivWrapper, FormWrapper, OperationDivWrapper } from './styles';

const LoginPage: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user.userInfo) {
      navigator('/');
    }
  }, [user, user.userInfo]);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitUserLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Email, Password);
    dispatch(userLogin({ userEmail: Email, userPassword: Password }));
  }, [Email, Password]);

  if (user.userInfo) {
    return null;
  }

  return (
    <>
      <Title title={'로그인'} />
      <FormDivWrapper>
        <FormWrapper onSubmit={onSubmitUserLogin}>
          <input type="email" name="userEmail" placeholder='이메일' value={Email} onChange={onChangeEmail} />
          {EmailError && <ErrorDivWrapper>존재하지 않는 이메일입니다.</ErrorDivWrapper>}

          <input type="password" name="userPassword" placeholder='비밀번호 (8글자 ~ 20글자)' value={Password} onChange={onChangePassword} />
          {PasswordError && <ErrorDivWrapper>비밀번호가 일치하지 않습니다.</ErrorDivWrapper>}

          <button type="submit">로그인</button>
        </FormWrapper>
        <OperationDivWrapper>
          <Link to={'/register'}>회원가입</Link>
          <Link to={'/passwordModify'}>비밀번호 초기화</Link>
        </OperationDivWrapper>
      </FormDivWrapper>
    </>
  );
}

export default LoginPage;