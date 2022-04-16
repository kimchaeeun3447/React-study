import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout()); //logout 액션 생성 함수를 디스패치
  };
  return <Header user={user} onLogout={onLogout} />;// 헤더에 함수 전달
};

export default HeaderContainer;