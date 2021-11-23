import React from 'react';
import {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';
import {requestResetPassword} from '../../../services/AuthService';

const ForgotPassword = ({children}) => {
  const [emailData, setEmailData] = useState({
    value: '',
    valid: false,
    touched: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  const updateEmailData = (event) => {
    setEmailData({
      value: event.target.value,
      valid: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
        event.target.value,
      ),
      touched: true,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailData.valid) {
      try {
        await requestResetPassword(emailData.value);
        setErrorMessage('');
        setRequestSuccess(true);
      } catch (err) {
        setRequestSuccess(false);
        switch (err.response.status) {
          case 404:
            setErrorMessage('Is your email correct?');
            break;
          default:
            setErrorMessage('Server error');
            break;
        }
      }
    }
  };

  return (
    <>
      {requestSuccess ? (
        <p>
          Password reset requested, check your email for further instructions
        </p>
      ) : (
        <Form
          onSubmit={onSubmit}
          style={{width: 250, padding: 10}}
          className='d-flex flex-column gap-2'
        >
          <h3>Reset Password</h3>
          <p style={{color: 'red'}}>{errorMessage}</p>
          <InputGroup className='d-flex flex-column'>
            <label htmlFor='email'>
              Email
              <FormControl
                type='text'
                id='email'
                value={emailData.value}
                className='form-control w-100'
                onChange={updateEmailData}
              />
              {!emailData.valid && emailData.touched ? (
                <p style={{color: 'red'}}>*Must be a valid email</p>
              ) : (
                ''
              )}
            </label>
          </InputGroup>
          <Button type='submit'>Submit</Button>
          {children}
        </Form>
      )}
    </>
  );
};

export default ForgotPassword;
