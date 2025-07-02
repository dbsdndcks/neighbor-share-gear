
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, User } from 'lucide-react';

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

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onChatClick: (product: Product) => void;
}

const ProductDetailModal = ({ isOpen, onClose, product, onChatClick }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 상품 이미지 */}
          <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Badge variant="secondary" className="bg-gray-800 text-white text-lg px-4 py-2">
                  대여중
                </Badge>
              </div>
            )}
          </div>

          {/* 가격 정보 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-orange-500">
                {product.price.toLocaleString()}원
              </span>
              <Badge 
                variant={product.available ? "default" : "secondary"}
                className={product.available ? "bg-green-500" : "bg-gray-500"}
              >
                {product.available ? "대여가능" : "대여중"}
              </Badge>
            </div>
            {product.hourlyRate && (
              <p className="text-lg text-orange-600">
                시간당 {product.hourlyRate.toLocaleString()}원
              </p>
            )}
          </div>

          {/* 상품 정보 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{product.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{product.timeAgo}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <User className="w-5 h-5" />
              <span>물건 소유자</span>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">상품 설명</h4>
            <p className="text-gray-700">
              상점과 같이 컨디션 좋습니다. 믿을만 아니고 원래 디자인 입니다.
              {product.category === 'furniture' && ' 촬영용으로 사용했기에 실사용 하지 않았습니다.'}
              {product.category === 'tools' && ' 몇 번 사용하지 않아 거의 새 상품과 같습니다.'}
              {product.category === 'camping' && ' 캠핑 2-3회 사용으로 깨끗한 상태입니다.'}
            </p>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>• 사전과 같이 컨디션 좋습니다</p>
              <p>• 사실상 쿠폰의 컨디션을 확인하시기나 예의하신분에게는 맞지 않습니다</p>
              <p>• 치킨과 꾸욱의 컨디션을 확인하시지 하차발</p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex space-x-3">
            <Button 
              onClick={() => onChatClick(product)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={!product.available}
            >
              {product.available ? '채팅하기' : '대여중'}
            </Button>
            <Button variant="outline" className="px-6">
              찜하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
