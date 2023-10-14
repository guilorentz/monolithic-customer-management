import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductStateModel } from '../model/product';

const getProductState = createFeatureSelector<ProductStateModel>('product');

export const getProducts = createSelector(getProductState, (state) => {
  return state.products;
});

export const getProduct = createSelector(getProductState, (state) => {
  return state.product;
});
