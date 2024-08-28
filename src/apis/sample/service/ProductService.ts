import axios from 'axios';

export interface Product {
  id?: string | null;
  code?: string;
  name?: string;
  description?: string;
  image?: string | null;
  price?: number;
  category?: string | null;
  quantity?: number;
  inventoryStatus?: string;
  rating?: number;
}

export interface Order {
  id: string;
  productCode: string;
  date: string;
  amount: number;
  quantity: number;
  customer: string;
  status: string;
}

export interface ProductOrder extends Product {
  orders?: Order[];
}

export class ProductService {
  getProductsSmall() {
    return axios
      .get<{ data: ProductOrder[] }>('/assets/sample/data/products-small.json')
      .then((res) => res.data.data);
  }

  getProducts() {
    return axios
      .get<{ data: ProductOrder[] }>('/assets/sample/data/products.json')
      .then((res) => res.data.data);
  }

  getProductsWithOrdersSmall() {
    return axios
      .get<{ data: ProductOrder[] }>(
        '/assets/sample/data/products-orders-small.json'
      )
      .then((res) => res.data.data);
  }
}
