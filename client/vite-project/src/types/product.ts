export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  size?: string;
  color?: string;
  price: number;
  oldPrice?: number | null;
  isOnSale?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewsCount?: number;
  image: string;
  score?: number;
}
