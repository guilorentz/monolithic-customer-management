import { Product } from './store/model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
