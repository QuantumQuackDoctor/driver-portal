import Header from '../../shared/header/Header';
import LoginForm from './login-form/LoginForm';
import DriverPage from './driver-page/DriverPage';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../services/context-provider/ServiceProvider';

const AccountPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const authService = useAuth();
  useEffect(() => {
    const unsubscribe = authService.subscribe((authStatus) => {
      setAuthenticated(authStatus);
    });
    return () => {
      unsubscribe();
    };
  }, [authService, authenticated, setAuthenticated]);
  return (
    <Header>
      <LoginForm />
      <DriverPage authenticated={authenticated} />
    </Header>
  );
};

export default AccountPage;

