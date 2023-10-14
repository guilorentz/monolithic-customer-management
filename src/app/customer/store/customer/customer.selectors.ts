import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerStateModel } from '../model/customer';

const getCustomerState = createFeatureSelector<CustomerStateModel>('customer');

export const getCustomers = createSelector(getCustomerState, (state) => {
  return state.customers;
});

export const getCustomer = createSelector(getCustomerState, (state) => {
  return state.customer;
});
