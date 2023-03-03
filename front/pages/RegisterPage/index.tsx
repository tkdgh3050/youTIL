import React, { useState, useCallback, FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../actions/user';

import Title from '../../components/title';
import { RootState } from '../../reducers';
import { UserState } from '../../reducers/user';
import { useAppDispatch } from '../../store/configureStore';
import { ErrorDivWrapper, FormDivWrapper, FormWrapper } from '../LoginPage/styles';
import { TermDivWrapper } from './styles';

const RegisterPage: FunctionComponent = () => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [Email, setEmail] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [Password, setPassword] = useState('');
  const [PasswordError, setPasswordError] = useState(false);
  const [PasswordConfirm, setPasswordConfirm] = useState('');
  const [PasswordConfirmError, setPasswordConfirmError] = useState(false);
  const [Term, setTerm] = useState(false);
  const [TermError, setTermError] = useState(false);

  useEffect(() => {
    if (user.userInfo) {
      navigator('/');
    }
  }, [user, user.userInfo]);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호가 8~20 글자가 아닌경우 오류 표시
    e.target.value.length < 8 || e.target.value.length > 20 ? setPasswordError(true) : setPasswordError(false);

    // 비밀번호확인과 비밀번호 비교 후 일치하지 않을 경우 비밀번호확인 오류 표시
    if (PasswordConfirm) {
      setPasswordConfirmError(e.target.value !== PasswordConfirm);
    }
  }, [PasswordConfirm]);

  const onChangePasswordConfirm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);

    // 비밀번호확인과 비밀번호 비교 후 일치하지 않을 경우 비밀번호확인 오류 표시
    setPasswordConfirmError(e.target.value !== Password);
  }, [Password]);

  const onChangeTerm = useCallback(() => {
    setTerm((prev) => !prev);

    // 개인정보 이용약관 비동의 시 오류 표시
    setTermError(false);
  }, [Term]);

  const onSubmitUserRegister = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 회원가입 데이터 전송 전 데이터 무결성 재확인
    if (Password.length < 8 || Password.length > 20) {
      setPasswordError(true);
      return;
    }
    if (Password !== PasswordConfirm) {
      setPasswordConfirmError(true);
      return;
    }
    if (!Term) {
      setTermError(true);
      return;
    }

    const register = dispatch(userRegister({
      email: Email,
      password: Password,
    }));

    register.unwrap()
      .then((result) => {
        alert('회원가입이 완료되었습니다.');
        navigator('/login');
      })
      .catch((error: { status: number, data: string }) => {
        if (error.status === 403) {
          setEmailError(true);
        } else {
          alert(`오류가 발생했습니다. 관리자에게 문의하세요. ${error.data}`);
        }
      });

  }, [Email, Password, PasswordConfirm, Term]);

  if (user.userInfo) {
    return null;
  }

  return (
    <>
      <Title title={'회원가입'} />
      <FormDivWrapper>
        <FormWrapper onSubmit={onSubmitUserRegister}>
          <input type="email" name="email" placeholder='이메일' value={Email} onChange={onChangeEmail} />
          {EmailError && <ErrorDivWrapper>중복된 이메일이 존재합니다.</ErrorDivWrapper>}

          <input type="password" name="userPassword" placeholder='비밀번호 (8글자 ~ 20글자)' value={Password} onChange={onChangePassword} />
          {PasswordError && <ErrorDivWrapper>비밀번호는 8글자 ~ 20글자입니다.</ErrorDivWrapper>}

          <input type="password" name="userPasswordConfirm" placeholder='비밀번호 확인' value={PasswordConfirm} onChange={onChangePasswordConfirm} />
          {PasswordConfirmError && <ErrorDivWrapper>비밀번호가 일치하지 않습니다.</ErrorDivWrapper>}

          <TermDivWrapper>
            <input type="checkbox" name="userTerm" id="userTerm" checked={Term} onChange={onChangeTerm} />
            <label htmlFor="userTerm">개인정보 처리방침에 동의합니다.</label>
          </TermDivWrapper>
          {TermError && <ErrorDivWrapper>동의가 필요합니다.</ErrorDivWrapper>}

          <button type="submit">회원가입</button>
        </FormWrapper>
      </FormDivWrapper>
    </>
  );
}

export default RegisterPage;