export interface IOrdersState {
  orderAdded: boolean,
  orderAddedId: string,
  allOrders: object,
  myOrders: object,
  orderDetails: object
}

export const initialState: IOrdersState = {
  orderAdded: false,
  orderAddedId: null,
  allOrders: {},
  myOrders: {},
  orderDetails: {}
}