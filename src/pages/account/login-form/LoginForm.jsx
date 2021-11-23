import {Button, Form, FormGroup} from 'react-bootstrap';
import React, {useState} from 'react';
import ForgotPassword from '../forgot-password/ForgotPassword';
import {useAuth} from '../../../services/context-provider/ServiceProvider';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);

  const authService = useAuth();

  const [errorMessage, setErrorMessage] = useState('');

  const checkInputs = () => {
    if (
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)
    ) {
      if (password.length >= 8) {
        return true;
      } else {
        setErrorMessage('Password too short');
        return false;
      }
    } else {
      setErrorMessage('Invalid email');
      return false;
    }
  };

  const handleLogin = async () => {
    if (checkInputs()) {
      const authRequest = {
        isDriver: true,
        password: password,
        email: email,
      };

      const errorCode = await authService.login(authRequest);
      if (errorCode) {
        switch (errorCode) {
          case 401:
            setErrorMessage('Incorrect email or password');
            break;
          default:
            setErrorMessage('Failed to connect to server');
        }
      }
    }
  };

  return (
    <>
      {!showResetPassword ? (
        <div style={{width: 250, padding: 10}}>
          <Form>
            <FormGroup>
              <Form.Label style={{fontSize: 25}}>Login</Form.Label>
            </FormGroup>
            <div style={{color: 'red'}}>{errorMessage}</div>
            <FormGroup>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Enter email'
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
              />
              <a
                role='button'
                onClick={() => setShowResetPassword(true)}
                style={{color: 'blue'}}
              >
                Forgot Password?
              </a>
            </FormGroup>
            <div style={{paddingTop: 10}}>
              <Button onClick={() => handleLogin()}>Login</Button>
            </div>
          </Form>
        </div>
      ) : (
        <>
          <ForgotPassword>
            <a
              role='button'
              onClick={() => setShowResetPassword(false)}
              style={{color: 'blue', alignSelf: 'center'}}
            >
              Login
            </a>
          </ForgotPassword>
        </>
      )}
    </>
  );
};

export default LoginForm;
