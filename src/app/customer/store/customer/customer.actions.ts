import { createAction, props } from '@ngrx/store';
import { Customer } from '../model/customer';

export const LOAD_CUSTOMERS = '[CUSTOMERS] load customers';
export const LOAD_CUSTOMERS_SUCCESS = '[CUSTOMERS] load customers success';
export const LOAD_CUSTOMERS_FAILURE = '[CUSTOMERS] load customers failure';

export const ADD_CUSTOMER = '[CUSTOMERS] add customer';
export const ADD_CUSTOMER_SUCCESS = '[CUSTOMERS] add customer success';

export const UPDATE_CUSTOMER = '[CUSTOMERS] update customer';
export const UPDATE_CUSTOMER_SUCCESS = '[CUSTOMERS] update customer success';

export const DELETE_CUSTOMER = '[CUSTOMERS] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[CUSTOMERS] delete customer success';

export const GET_CUSTOMER = '[CUSTOMERS] get customer';
export const GET_CUSTOMER_SUCCESS = '[CUSTOMERS] get customer success';

export const OPEN_POPUP = '[CUSTOMERS] open pop-up';

export const loadCustomers = createAction(LOAD_CUSTOMERS);
export const loadCustomersSuccess = createAction(
  LOAD_CUSTOMERS_SUCCESS,
  props<{ customers: Customer[] }>()
);
export const loadCustomersFailure = createAction(
  LOAD_CUSTOMERS_FAILURE,
  props<{ error: string }>()
);

export const addCustomer = createAction(
  ADD_CUSTOMER,
  props<{ customer: Customer }>()
);
export const addCustomerSuccess = createAction(
  ADD_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const updateCustomer = createAction(
  UPDATE_CUSTOMER,
  props<{ customer: Customer }>()
);
export const updateCustomerSuccess = createAction(
  UPDATE_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const deleteCustomer = createAction(
  DELETE_CUSTOMER,
  props<{ id: number }>()
);
export const deleteCustomerSuccess = createAction(
  DELETE_CUSTOMER_SUCCESS,
  props<{ id: number }>()
);

export const getCustomer = createAction(GET_CUSTOMER, props<{ id: number }>());
export const getCustomerSuccess = createAction(
  GET_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const openPopUp = createAction(OPEN_POPUP);
