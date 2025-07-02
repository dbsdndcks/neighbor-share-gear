
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

export const mockProducts: Product[] = [
  {
    id: '1',
    title: '이태리 앤틱 2인 벤치소파 응접실소파',
    price: 350000,
    hourlyRate: 5000,
    location: '한남동',
    timeAgo: '6분 전',
    image: '/lovable-uploads/d414cf85-231a-483e-a6ff-aeee96ece7e9.png',
    category: 'furniture',
    available: true
  },
  {
    id: '2',
    title: '오클리 Bathroom Sink 백팩 새상품',
    price: 170000,
    hourlyRate: 3000,
    location: '한남동',
    timeAgo: '6분 전',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=400&fit=crop',
    category: 'tools',
    available: true
  },
  {
    id: '3',
    title: '구찌 자가드 토트백',
    price: 350000,
    hourlyRate: 4000,
    location: '한남동',
    timeAgo: '7분 전',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    category: 'tools',
    available: true
  },
  {
    id: '4',
    title: '니트바지',
    price: 5000,
    hourlyRate: 1000,
    location: '한남동',
    timeAgo: '곧은 7분 전',
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=400&fit=crop',
    category: 'furniture',
    available: true
  },
  {
    id: '5',
    title: '전동드릴 세트 - DIY 필수템',
    price: 80000,
    hourlyRate: 8000,
    location: '용산구',
    timeAgo: '15분 전',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
    category: 'tools',
    available: true
  },
  {
    id: '6',
    title: '캠핑 텐트 4인용 + 타프',
    price: 120000,
    hourlyRate: 10000,
    location: '한남동',
    timeAgo: '23분 전',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop',
    category: 'camping',
    available: true
  },
  {
    id: '7',
    title: '사다리 3단 접이식',
    price: 45000,
    hourlyRate: 3000,
    location: '강남구',
    timeAgo: '1시간 전',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=400&fit=crop',
    category: 'tools',
    available: false
  },
  {
    id: '8',
    title: '노트북 MacBook Pro 16인치',
    price: 250000,
    hourlyRate: 15000,
    location: '한남동',
    timeAgo: '2시간 전',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
    category: 'electronics',
    available: true
  }
];

export const mockCategories = [
  { id: 'all', label: '전체', count: mockProducts.length },
  { id: 'tools', label: '공구', count: mockProducts.filter(p => p.category === 'tools').length },
  { id: 'camping', label: '캠핑용품', count: mockProducts.filter(p => p.category === 'camping').length },
  { id: 'furniture', label: '가구', count: mockProducts.filter(p => p.category === 'furniture').length },
  { id: 'electronics', label: '전자제품', count: mockProducts.filter(p => p.category === 'electronics').length },
];
