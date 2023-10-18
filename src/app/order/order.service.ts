import { Order } from './store/model/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getOrderById(id: number) {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Order) {
    return this.http.post<Order>(this.baseUrl, order);
  }

  updateOrder(order: Order) {
    return this.http.put<Order>(`${this.baseUrl}/${order.id}`, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
