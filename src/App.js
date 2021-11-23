import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import HomePage from './pages/home/HomePage';
import AccountPage from './pages/account/AccountPage';
import OrderPage from './pages/orders/OrderPage';
import ServiceProvider from './services/context-provider/ServiceProvider';
import AuthenticatedRoute from './shared/protected-route/AuthenticatedRoute';
import ResetPassword from './pages/reset-password/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Switch>
          <Route path='/reset-password/:token' component={ResetPassword} />
          <Route path='/account' component={AccountPage} />
          <AuthenticatedRoute path='/orders' redirect='/account'>
            <OrderPage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={['/', '/home']} redirect='/account'>
            <HomePage />
          </AuthenticatedRoute>
        </Switch>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
