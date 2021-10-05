import Header from '../../shared/header/Header';
import DisplayOrdersPage from '../orders/display-orders/DisplayOrdersPage';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../services/context-provider/ServiceProvider';


const OrderPage = () => {
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
      <DisplayOrdersPage authenticated={authenticated} />
    </Header>
  );
};

export default OrderPage;
