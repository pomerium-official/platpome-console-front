import axios from 'axios';

export interface Customer {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
  };
  company: string;
  date: string;
  status: string;
  activity: number;
  representative: {
    name: string;
    image: string;
  };
}

export interface CustomerLarge extends Customer {
  verified: boolean;
  balance: number;
}

export class CustomerService {
  getCustomersMedium() {
    return axios
      .get<{ data: Customer[] }>('/assets/sample/data/customers-medium.json')
      .then((res) => res.data.data);
  }

  getCustomersLarge() {
    return axios
      .get<{ data: CustomerLarge[] }>(
        '/assets/sample/data/customers-large.json'
      )
      .then((res) => res.data.data);
  }
}
