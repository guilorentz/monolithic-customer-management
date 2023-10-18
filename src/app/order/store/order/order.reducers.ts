import { createReducer, on } from '@ngrx/store';
import { OrderState } from './order.state';
import {
  addOrderSuccess,
  deleteOrderSuccess,
  getOrderSuccess,
  loadOrdersFailure,
  loadOrdersSuccess,
  openPopUp,
  updateOrderSuccess,
} from './order.actions';

const _orderReducer = createReducer(
  OrderState,
  on(loadOrdersSuccess, (state, action) => {
    return {
      ...state,
      orders: [...action.orders],
      error: '',
    };
  }),
  on(loadOrdersFailure, (state, action) => {
    return {
      ...state,
      orders: [],
      error: action.error,
    };
  }),
  on(getOrderSuccess, (state, action) => {
    return {
      ...state,
      order: action.order,
      error: '',
    };
  }),
  on(addOrderSuccess, (state, action) => {
    const _maxId = Math.max(...state.orders.map((o) => o.id));
    const _order = { ...action.order };
    _order.id = _maxId + 1;
    return {
      ...state,
      orders: [...state.orders, _order],
      error: '',
    };
  }),
  on(updateOrderSuccess, (state, action) => {
    const _orders = state.orders.map((o) => {
      return o.id === action.order.id ? action.order : o;
    });
    return {
      ...state,
      orders: _orders,
      error: '',
    };
  }),
  on(deleteOrderSuccess, (state, action) => {
    const _orders = state.orders.filter((o) => o.id !== action.id);
    return {
      ...state,
      orders: _orders,
      error: '',
    };
  }),
  on(openPopUp, (state, action) => {
    return {
      ...state,
      order: {
        id: 0,
        customer: '',
        products: [],
        totalItens: 0,
        totalValue: 0,
      },
    };
  })
);

export function OrderReducer(state: any, action: any) {
  return _orderReducer(state, action);
}
