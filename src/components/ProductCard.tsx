
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
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

interface ProductCardProps {
  product: Product;
  onChatClick: (event: React.MouseEvent, product: Product) => void;
}

const ProductCard = ({ product, onChatClick }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-square bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              대여중
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 flex-shrink-0">
          {product.title}
        </h3>
        
        <div className="space-y-1 mb-3 flex-shrink-0">
          <p className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString()}원
          </p>
          {product.hourlyRate && (
            <p className="text-sm text-emerald-500">
              시간당 {product.hourlyRate.toLocaleString()}원
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3 flex-shrink-0">
          <span>{product.location}</span>
          <span>{product.timeAgo}</span>
        </div>

        <div className="mt-auto">
          <Button 
            onClick={(e) => onChatClick(e, product)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={!product.available}
          >
            {product.available ? '채팅하기' : '대여중'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
