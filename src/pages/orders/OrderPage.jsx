import Header from '../../shared/header/Header';
import DisplayOrdersPage from '../orders/display-orders/DisplayOrdersPage';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../services/context-provider/ServiceProvider';
import {Button, Container, Row} from 'react-bootstrap';
import {checkIn, checkOut} from '../../services/DriverService';
import {useSessionState} from '../../hooks/SessionState';

const OrderPage = () => {
  // auth guard stuff
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

  // Driver check in stuff
  const [checkedIn, setCheckedIn] = useSessionState('checkedIn', false);
  const lcheckIn = async () => {
    try {
      await checkIn();
      setCheckedIn(true);
    } catch (err) {
      setCheckedIn(false);
    }
  };
  const lcheckOut = async () => {
    try {
      await checkOut();
      setCheckedIn(false);
    } catch (err) {}
  };

  return (
    <Header>
      <Container fluid={true} className='p-0'>
        {checkedIn === true ? (
          <>
            <Row>
              <DisplayOrdersPage authenticated={authenticated} />
            </Row>
            <Row className='d-flex justify-content-center p-5'>
              <Button
                data-testid='checkout'
                onClick={() => {
                  lcheckOut();
                }}
              >
                Check out
              </Button>
            </Row>
          </>
        ) : (
          <Row className='d-flex justify-content-center p-5'>
            <Button
              data-testid='checkIn'
              onClick={() => {
                lcheckIn();
              }}
            >
              Check in
            </Button>
          </Row>
        )}
      </Container>
    </Header>
  );
};

export default OrderPage;
