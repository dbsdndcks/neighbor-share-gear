
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MapViewProps {
  products: any[];
  onProductClick: (product: any) => void;
}

const MapView = ({ products, onProductClick }: MapViewProps) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      console.log('Mapbox token set:', mapboxToken);
    }
  };

  if (showTokenInput) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">지도 서비스 활성화</h3>
        <p className="text-gray-600 mb-4">
          지도 기능을 사용하려면 Mapbox API 키를 입력해주세요.
        </p>
        <div className="max-w-md mx-auto space-y-3">
          <Input
            type="text"
            placeholder="Mapbox API 키를 입력하세요"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <Button 
            onClick={handleTokenSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            지도 활성화
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          API 키는 <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-orange-500">mapbox.com</a>에서 발급받을 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
      {/* 지도 시뮬레이션 */}
      <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">한남동 지역 지도</p>
          </div>
        </div>

        {/* 가상 상품 마커들 */}
        {products.slice(0, 6).map((product, index) => (
          <div
            key={product.id}
            className="absolute w-12 h-12 cursor-pointer transform hover:scale-110 transition-transform"
            style={{
              left: `${20 + (index % 3) * 25}%`,
              top: `${30 + Math.floor(index / 3) * 30}%`,
            }}
            onClick={() => onProductClick(product)}
          >
            <div className="w-full h-full bg-white rounded-full border-2 border-orange-500 overflow-hidden shadow-lg">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 지도 컨트롤 */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            총 {products.length}개의 대여 가능한 물품
          </p>
          <Button size="sm" variant="outline">
            전체 화면
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;
