import { Order } from './../model/order';
import { createAction, props } from '@ngrx/store';

export const LOAD_ORDERS = '[ORDERS] load orders';
export const LOAD_ORDERS_SUCCESS = '[ORDERS] load orders success';
export const LOAD_ORDERS_FAILURE = '[ORDERS] load orders failure';

export const ADD_ORDER = '[ORDERS] add order';
export const ADD_ORDER_SUCCESS = '[ORDERS] add order success';

export const UPDATE_ORDER = '[ORDERS] update order';
export const UPDATE_ORDER_SUCCESS = '[ORDERS] update order success';

export const DELETE_ORDER = '[ORDERS] delete order';
export const DELETE_ORDER_SUCCESS = '[ORDERS] delete order success';

export const GET_ORDER = '[ORDERS] get order';
export const GET_ORDER_SUCCESS = '[ORDERS] get order success';

export const OPEN_POPUP = '[ORDERS] open pop-up';

export const loadOrders = createAction(LOAD_ORDERS);
export const loadOrdersSuccess = createAction(
  LOAD_ORDERS_SUCCESS,
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  LOAD_ORDERS_FAILURE,
  props<{ error: string }>()
);

export const addOrder = createAction(ADD_ORDER, props<{ order: Order }>());
export const addOrderSuccess = createAction(
  ADD_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const updateOrder = createAction(
  UPDATE_ORDER,
  props<{ order: Order }>()
);
export const updateOrderSuccess = createAction(
  UPDATE_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const deleteOrder = createAction(DELETE_ORDER, props<{ id: number }>());
export const deleteOrderSuccess = createAction(
  DELETE_ORDER_SUCCESS,
  props<{ id: number }>()
);

export const getOrder = createAction(GET_ORDER, props<{ id: number }>());
export const getOrderSuccess = createAction(
  GET_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const openPopUp = createAction(OPEN_POPUP);
