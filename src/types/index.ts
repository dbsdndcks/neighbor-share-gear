
export interface Item {
  id: string;
  title: string;
  price: number;
  hourlyRate?: number;
  location: string;
  timeAgo: string;
  image: string;
  category: string;
  available: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  hourlyRate?: number;
  location: string;
  timeAgo: string;
  image: string;
  category: string;
  available: boolean;
}
