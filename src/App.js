import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import React from 'react';
import HomePage from './pages/home/HomePage';
import AccountPage from './pages/account/AccountPage';
import OrderPage from './pages/orders/OrderPage';
import ServiceProvider from './services/context-provider/ServiceProvider';
import AuthenticatedRoute from './shared/protected-route/AuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <ServiceProvider>
        <Switch>
          <Route exact path={['/', '/home']} component={HomePage} />
          <Route path='/account' component={AccountPage} />
          <AuthenticatedRoute path='/orders' redirect='/account'>
            <OrderPage />
          </AuthenticatedRoute>
        </Switch>
      </ServiceProvider>
    </BrowserRouter>
  );
}

export default App;
