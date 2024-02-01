export interface Product {
  id: string;
  ownerId?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  tags?: string[];
  ratings?: number;
  reviews?: Review[];
}

export interface Review {
  id?: string;
  productId: string;
  username: string;
  message: string;
  photoUrl?: string;
  ratings?: number;
}
