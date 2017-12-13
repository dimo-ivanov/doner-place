import { ICoreState } from './core/core.state';
import { IUsersState } from './users/users.state';
import { IProductsState } from './products/products.state';

export interface IAppState {
  core: ICoreState,
  users: IUsersState,
  products: IProductsState
}