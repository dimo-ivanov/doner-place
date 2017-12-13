import { initialState } from './products.state';

import { PRODUCTS_ALL, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from './products.actions';

function getAll (state, action) {
  return Object.assign({}, state, {
    allProducts: action.result.allProducts
  });
}

function create (state, action) {
  const result = action.result;
  return Object.assign({}, state, {
    productAdded: result._id ? true : false,
    productAddedId: result._id ? result._id : null
  })
}

function edit (state, action) {
  const result = action.result;

  return Object.assign({}, state, {
    allProducts: result.allProducts
  });
}

function deleteProduct (state, action) {
  const result = action.result;
  const currentProducts = Object.assign({}, state.allProducts);
  for (let category in currentProducts) {
    currentProducts[category] = currentProducts[category].filter(product => product._id != result._id);
  }
  
  return Object.assign({}, state, {
    allProducts: currentProducts
  });
}

export function productsReducer (state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_ALL:
      return getAll(state, action);
    case CREATE_PRODUCT:
      return create(state, action);
    case EDIT_PRODUCT:
      return edit(state, action);
    case DELETE_PRODUCT:
      return deleteProduct(state, action);
    default:
      return state;
  }
}