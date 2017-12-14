import { combineReducers } from 'redux';
import { IAppState } from './app.state';

import { coreReducer } from './core/core.reducer';
import { usersReducer } from './users/users.reducer';
import { productsReducer } from './products/products.reducer';
import { ordersReducer } from './orders/orders.reducer';

export const reducer = combineReducers<IAppState>({
  core: coreReducer,
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer
});