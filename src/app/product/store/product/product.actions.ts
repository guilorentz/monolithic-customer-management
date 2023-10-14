import { createAction, props } from '@ngrx/store';
import { Product } from '../model/product';

export const LOAD_PRODUCTS = '[PRODUCTS] load products';
export const LOAD_PRODUCTS_SUCCESS = '[PRODUCTS] load products success';
export const LOAD_PRODUCTS_FAILURE = '[PRODUCTS] load products failure';

export const ADD_PRODUCT = '[PRODUCTS] add product';
export const ADD_PRODUCT_SUCCESS = '[PRODUCTS] add product success';

export const UPDATE_PRODUCT = '[PRODUCTS] update product';
export const UPDATE_PRODUCT_SUCCESS = '[PRODUCTS] update product success';

export const DELETE_PRODUCT = '[PRODUCTS] delete product';
export const DELETE_PRODUCT_SUCCESS = '[PRODUCTS] delete product success';

export const GET_PRODUCT = '[PRODUCTS] get product';
export const GET_PRODUCT_SUCCESS = '[PRODUCTS] get product success';

export const OPEN_POPUP = '[PRODUCTS] open pop-up';

export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(
  LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  LOAD_PRODUCTS_FAILURE,
  props<{ error: string }>()
);

export const addProduct = createAction(
  ADD_PRODUCT,
  props<{ product: Product }>()
);
export const addProductSuccess = createAction(
  ADD_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  UPDATE_PRODUCT,
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  DELETE_PRODUCT,
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  DELETE_PRODUCT_SUCCESS,
  props<{ id: number }>()
);

export const getProduct = createAction(GET_PRODUCT, props<{ id: number }>());
export const getProductSuccess = createAction(
  GET_PRODUCT_SUCCESS,
  props<{ product: Product }>()
);

export const openPopUp = createAction(OPEN_POPUP);
