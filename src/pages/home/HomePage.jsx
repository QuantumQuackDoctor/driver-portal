import Header from '../../shared/header/Header';
import React from 'react';
import AcceptedOrders from './accepted-orders/AcceptedOrders';

const HomePage = () => {
  return (
    <Header>
      <AcceptedOrders />
    </Header>
  );
};

export default HomePage;
