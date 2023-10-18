export interface Order {
  id: number;
  customer: string;
  products: string[];
  totalItens: number;
  totalValue: number;
}

export interface OrderStateModel {
  orders: Order[];
  order: Order;
  error: string;
}
