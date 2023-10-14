import { CustomerStateModel } from '../model/customer';

export const CustomerState: CustomerStateModel = {
  customers: [],
  customer: {
    id: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'PF',
  },
  error: '',
};
