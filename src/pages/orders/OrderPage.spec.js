/* eslint-disable comma-dangle */
/* eslint-disable indent */
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import OrderPage from './OrderPage';
import React from 'react';
import ServiceProvider from '../../services/context-provider/ServiceProvider';
import {BrowserRouter} from 'react-router-dom';

describe('Orders page', () => {
  const adapter = new MockAdapter(axios);
  it('can check in', () => {
    let checkInCalled = false;
    adapter.onPost('/accounts/driver/checkin').reply(() => {
      checkInCalled = true;
      return [200];
    });

    render(
      <ServiceProvider>
        <BrowserRouter>
          <OrderPage />
        </BrowserRouter>
      </ServiceProvider>
    );

    const button = screen.getByTestId('checkIn');
    fireEvent.click(button);

    return waitFor(() => {
      expect(checkInCalled).toEqual(true);
    });
  });

  it('can check out', () => {
    let checkOutCalled = false;
    adapter.onPost('/accounts/driver/checkout').reply(() => {
      checkOutCalled = true;
      return [200];
    });

    render(
      <ServiceProvider>
        <BrowserRouter>
          <OrderPage />
        </BrowserRouter>
      </ServiceProvider>
    );

    const checkOutButton = screen.getByTestId('checkout');
    fireEvent.click(checkOutButton);

    return waitFor(() => {
      expect(checkOutCalled).toEqual(true);
    });
  });
});
