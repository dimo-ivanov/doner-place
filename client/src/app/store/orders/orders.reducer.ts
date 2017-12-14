import { initialState } from './orders.state';
import { CREATE_ORDER } from './orders.actions';

function createOrder (state, action) {
  const result = action.result
  console.log(result);
  return Object.assign({}, state, {
    orderAdded: result._id ? true : false,
    orderAddedId: result._id ? result._id : null
  });
}

export function ordersReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return createOrder(state, action);
    default:
      return state;
  }
}