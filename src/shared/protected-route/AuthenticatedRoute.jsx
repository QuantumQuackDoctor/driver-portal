import React from 'react';
import {Redirect, Route} from 'react-router';
import {useAuth} from '../../services/context-provider/ServiceProvider';

/**
 * This relies on the auth service provider
 * @returns
 */
const AuthenticatedRoute = ({children, ...rest}) => {
  const authService = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        return authService.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to='/account' />
        );
      }}
    />
  );
};

export default AuthenticatedRoute;
