import { Customer } from './store/model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers() {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.baseUrl}/${customer.id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
