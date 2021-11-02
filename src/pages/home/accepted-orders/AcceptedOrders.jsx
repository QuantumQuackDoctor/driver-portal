import React, {useEffect} from 'react';
import {useState} from 'react';
import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import {getAcceptedOrders, pickUpOrder} from '../../../services/OrderService';

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    updateOrders();
  }, [setOrders]);

  const updateOrders = async () => {
    try {
      const res = await getAcceptedOrders();
      setOrders(res.data);
    } catch (err) {}
  };

  const formatTime = (time) => {
    if (time == null) {
      return null;
    }
    const parts = time.slice(0, -1).split('T');
    // let dateComponent = parts[0];
    const timeComponent = parts[1];
    return timeComponent.toString().substring(0, 5);
  };

  const findOrderStatus = (order) => {
    let status;
    if (order.orderTime.driverPickUp) {
      status = 'Picked up';
    } else if (order.orderTime.restaurantComplete) {
      status = 'Ready for pickup';
    } else {
      status = 'Preparing';
    }
    return status;
  };

  const [showModal, setShowModal] = useState(false);
  const [modalOrder, setModalOrder] = useState({});
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const openOrderModal = (order) => {
    setModalOrder(order);
    setShowModal(true);
  };
  const closeOrderModal = () => setShowModal(false);

  const updateOrderPickUp = async (id) => {
    try {
      await pickUpOrder(id);
      updateOrders();
      closeOrderModal();
    } catch (err) {
      switch (err.status) {
        case 404:
          setModalErrorMessage('Order does not exist');
          break;
        case 410:
          setModalErrorMessage('Order was not accepted');
          break;
        default:
          setModalErrorMessage('Server error');
      }
    }
  };

  const updateOrderDeliver = (id) => {
    console.log(id);
  };

  return (
    <>
      <Container className='p-3'>
        <Row className={'p-3'}>
          <Col className='text-center'>Address</Col>
          <Col className='text-center'>Drop-off Time</Col>
          <Col className='text-center'>Tip</Col>
          <Col className='text-center'>Status</Col>
        </Row>
        <hr
          style={{
            color: 'black',
            backgroundColor: 'black',
            height: 2,
          }}
        />
        {orders.map((order) => (
          <button
            key={'accepted-order-' + order.id}
            className={'my-3 p-3 bg-light rounded row row-hover w-100 border-0'}
            onClick={() => openOrderModal(order)}
          >
            <Col>{order.address}</Col>
            <Col>{formatTime(order.orderTime.deliverySlot)}</Col>
            <Col>{order.price.tip}</Col>
            <Col>{findOrderStatus(order)}</Col>
          </button>
        ))}
      </Container>
      <Modal show={showModal} onHide={closeOrderModal}>
        <Modal.Header>Update Order Status: {modalOrder.address}</Modal.Header>
        <Modal.Body>
          <div className='text-warning w-100'>{modalErrorMessage}</div>
          <div className='d-flex justify-content-between'>
            <Button onClick={() => updateOrderPickUp(modalOrder.id)}>
              Picked up order
            </Button>
            <Button onClick={() => updateOrderDeliver(modalOrder.id)}>
              Delivered Order
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AcceptedOrders;
