import { initialState } from './orders.state';
import { CREATE_ORDER, ORDER_DETAILS } from './orders.actions';

function createOrder (state, action) {
  const result = action.result;
  return Object.assign({}, state, {
    orderAdded: result._id ? true : false,
    orderAddedId: result._id ? result._id : null
  });
}

function getOrderDetails (state, action) {
  const result = action.result.order;
  return Object.assign({}, state, {
    orderDetails : result._id ? result : null
  });
}

export function ordersReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return createOrder(state, action);
    case ORDER_DETAILS:
      return getOrderDetails(state, action);
    default:
      return state;
  }
}