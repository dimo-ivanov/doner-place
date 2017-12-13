import { combineReducers } from 'redux';
import { IAppState } from './app.state';

import { coreReducer } from './core/core.reducer';
import { usersReducer } from './users/users.reducer';
import { productsReducer } from './products/products.reducer';

export const reducer = combineReducers<IAppState>({
  core: coreReducer,
  users: usersReducer,
  products: productsReducer
});