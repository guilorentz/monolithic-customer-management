import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderStateModel } from '../model/order';

const getOrderState = createFeatureSelector<OrderStateModel>('order');

export const getOrders = createSelector(getOrderState, (state) => {
  return state.orders;
});

export const getOrder = createSelector(getOrderState, (state) => {
  return state.order;
});
