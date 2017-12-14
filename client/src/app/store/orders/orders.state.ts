export interface IOrdersState {
  orderAdded: boolean,
  orderAddedId: string,
  allOrders: object,
  myOrders: object
}

export const initialState: IOrdersState = {
  orderAdded: false,
  orderAddedId: null,
  allOrders: {},
  myOrders: {}
}