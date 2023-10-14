import { createReducer, on } from '@ngrx/store';
import { ProductState } from './product.state';
import {
  addProductSuccess,
  deleteProductSuccess,
  getProductSuccess,
  loadProductsFailure,
  loadProductsSuccess,
  openPopUp,
  updateProductSuccess,
} from './product.actions';

const _productReducer = createReducer(
  ProductState,
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: [...action.products],
      error: '',
    };
  }),
  on(loadProductsFailure, (state, action) => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(getProductSuccess, (state, action) => {
    return {
      ...state,
      product: action.product,
      error: '',
    };
  }),
  on(addProductSuccess, (state, action) => {
    const _maxId = Math.max(...state.products.map((o) => o.id));
    const _product = { ...action.product };
    _product.id = _maxId + 1;
    return {
      ...state,
      products: [...state.products, _product],
      error: '',
    };
  }),
  on(updateProductSuccess, (state, action) => {
    const _products = state.products.map((o) => {
      return o.id === action.product.id ? action.product : o;
    });
    return {
      ...state,
      products: _products,
      error: '',
    };
  }),
  on(deleteProductSuccess, (state, action) => {
    const _products = state.products.filter((o) => o.id !== action.id);
    return {
      ...state,
      products: _products,
      error: '',
    };
  }),
  on(openPopUp, (state, action) => {
    return {
      ...state,
      product: {
        id: 0,
        name: '',
        description: '',
        price: 0,
      },
    };
  })
);

export function ProductReducer(state: any, action: any) {
  return _productReducer(state, action);
}
