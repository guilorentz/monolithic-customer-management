export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProductStateModel {
  products: Product[];
  product: Product;
  error: string;
}
