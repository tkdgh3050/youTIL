import React, { useState, useCallback, FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../actions/user';

import Title from '../../components/title';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';
import { useAppDispatch } from '../../store/configureStore';
import { ErrorDivWrapper, FormDivWrapper, FormWrapper, OperationDivWrapper } from './styles';

// 로그인 하는 페이지
const LoginPage: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);

  useEffect(() => {
    // 만약 로그인을 이미 한 경우 메인페이지로 돌아가도록 함
    if (user.userInfo) {
      navigator('/');
    }
  }, [user]);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 이메일 변경 시 이벤트
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 변경 시 이벤트
    setPassword(e.target.value);
  }, []);

  const onSubmitUserLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // 로그인 버튼 클릭 시
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    dispatch(userLogin({ email: Email, password: Password })).unwrap()
      .then((result) => {
        // 로그인 성공 시 메인페이지로
        alert(`${result.email} 님 환영합니다.`);
        navigator('/');
      })
      .catch((error: { status: number, data: { type: string, message: string } }) => {
        // 로그인 실패 시
        if (error.status === 400) {
          if (error.data.type === 'email') {
            setEmailError(true);
          } else if (error.data.type === 'password') {
            setPasswordError(true);
          } else {
            alert(`오류가 발생했습니다. 관리자에게 문의하세요. ${error.data.message}`);
          }
        } else {
          alert(`오류가 발생했습니다. 관리자에게 문의하세요. ${error.data}`);
        }
      });
  }, [Email, Password]);

  if (user.userInfo) {
    // 로그인 정보가 있을 경우 화면을 그릴 필요 없으므로 리턴함
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