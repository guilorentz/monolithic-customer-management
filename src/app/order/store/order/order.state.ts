import { OrderStateModel } from '../model/order';

export const OrderState: OrderStateModel = {
  orders: [],
  order: {
    id: 0,
    customer: '',
    products: [],
    totalItens: 0,
    totalValue: 0,
  },
  error: '',
};
