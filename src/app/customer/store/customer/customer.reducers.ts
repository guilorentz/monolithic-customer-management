import { createReducer, on } from '@ngrx/store';
import { CustomerState } from './customer.state';
import {
  addCustomerSuccess,
  deleteCustomerSuccess,
  getCustomerSuccess,
  loadCustomersFailure,
  loadCustomersSuccess,
  openPopUp,
  updateCustomerSuccess,
} from './customer.actions';

const _customerReducer = createReducer(
  CustomerState,
  on(loadCustomersSuccess, (state, action) => {
    return {
      ...state,
      customers: [...action.customers],
      error: '',
    };
  }),
  on(loadCustomersFailure, (state, action) => {
    return {
      ...state,
      customers: [],
      error: action.error,
    };
  }),
  on(getCustomerSuccess, (state, action) => {
    return {
      ...state,
      customer: action.customer,
      error: '',
    };
  }),
  on(addCustomerSuccess, (state, action) => {
    const _maxId = Math.max(...state.customers.map((o) => o.id));
    const _customer = { ...action.customer };
    _customer.id = _maxId + 1;
    return {
      ...state,
      customers: [...state.customers, _customer],
      error: '',
    };
  }),
  on(updateCustomerSuccess, (state, action) => {
    const _customers = state.customers.map((o) => {
      return o.id === action.customer.id ? action.customer : o;
    });
    return {
      ...state,
      customers: _customers,
      error: '',
    };
  }),
  on(deleteCustomerSuccess, (state, action) => {
    const _customers = state.customers.filter((o) => o.id !== action.id);
    return {
      ...state,
      customers: _customers,
      error: '',
    };
  }),
  on(openPopUp, (state, action) => {
    return {
      ...state,
      customer: {
        id: 0,
        name: '',
        phone: '',
        email: '',
        address: '',
        type: 'PF',
      },
    };
  })
);

export function CustomerReducer(state: any, action: any) {
  return _customerReducer(state, action);
}
