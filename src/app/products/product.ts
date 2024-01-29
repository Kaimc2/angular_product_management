export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  tags?: string[];
  ratings?: number;
  reviews?: string[];
}
