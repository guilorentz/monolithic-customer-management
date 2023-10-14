export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
}

export interface CustomerStateModel {
  customers: Customer[];
  customer: Customer;
  error: string;
}
