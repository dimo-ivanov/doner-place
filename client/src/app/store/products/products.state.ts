export interface IProductsState {
  productAdded: boolean,
  productAddedId: string,
  allProducts: object
}

export const initialState: IProductsState = {
  productAdded: false,
  productAddedId: null,
  allProducts: {}
}