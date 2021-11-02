/* eslint-disable comma-dangle */
/* eslint-disable indent */
import axios from 'axios';

export default class OrderService {}

export function getOrders(sortType, page, size) {
  return axios.get('/orders/driver', {
    params: {sort_type: sortType, page: page - 1, size: size},
  });
}

export function assignOrder(order, driver) {
  return axios.patch(
    '/orders/drivers',
    {},
    {params: {order: order, driver: driver, assign: true}}
  );
}

export function getAcceptedOrders() {
  return axios.get('/order/driver/accepted');
}

export function pickUpOrder(id) {
  return axios.post('/order/driver/update', {orderId: id, action: 'retrieved'});
}
