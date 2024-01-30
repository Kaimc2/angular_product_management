export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  tags?: string[];
  ratings?: number;
  reviews?: string[];
}
