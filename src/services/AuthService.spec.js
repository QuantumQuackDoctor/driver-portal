import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AuthService from './AuthService';

describe('AuthService tests', () => {
  const authService = new AuthService();
  const adapter = new MockAdapter(axios);

  let authorization;
  adapter.onPost('/accounts/login').reply(200, {jwt: 'jwt'});
  adapter.onGet('/accounts/authenticated').reply((config) => {
    authorization = config.headers.Authorization;
    return [200];
  });

  it('Send login', (done) => {
    authService.login().then((token) => {
      expect(token).toEqual('jwt');
      done();
    });
  });

  it('Add authorization header', (done) => {
    authService.testAuthentication().then(() => {
      expect(authorization).toBe('Bearer jwt');
      done();
    });
  });

  adapter.onGet('/unauthorized').reply(401);

  it('logout on 401', async () => {
    expect(authService.isAuthenticated).toBeTruthy();
    await axios.get('/unauthorized').catch((error) => {
      return error;
    });
    expect(authService.isAuthenticated).toBeFalsy();
    expect(localStorage.getItem(authService.token)).toBeNull();
  });
});
