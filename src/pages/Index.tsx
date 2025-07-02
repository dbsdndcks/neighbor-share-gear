
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import ProductCard from '@/components/ProductCard';
import ChatModal from '@/components/ChatModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import GoogleMapModal from '@/components/GoogleMapModal';
import MapApiKeyModal from '@/components/MapApiKeyModal';
import { mockProducts, Product } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('hannam');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || 
        (selectedLocation === 'hannam' && product.location === '한남동') ||
        (selectedLocation === 'yongsan' && product.location === '용산구') ||
        (selectedLocation === 'gangnam' && product.location === '강남구');
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedLocation, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleChatClick = (product: Product) => {
    setSelectedProduct(product);
    setIsChatOpen(true);
  };

  const handleRentConfirm = (productId: string) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, available: false }
          : product
      )
    );
  };

  const handleSettingsClick = () => {
    setIsApiKeyModalOpen(true);
  };

  const handleMapViewClick = () => {
    if (!googleMapsApiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }
    setViewMode('map');
  };

  const handleProductLocationClick = (product: Product) => {
    if (!googleMapsApiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }
    setSelectedProduct(product);
    setIsMapOpen(true);
  };

  const handleApiKeySet = (apiKey: string) => {
    setGoogleMapsApiKey(apiKey);
    localStorage.setItem('googleMapsApiKey', apiKey);
  };

  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem('googleMapsApiKey');
    if (savedApiKey) {
      setGoogleMapsApiKey(savedApiKey);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        onSettingsClick={handleSettingsClick}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 페이지 타이틀 */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>홈</span>
            <span>›</span>
            <span>대여서비스</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            서울특별시 용산구 한남동 대여서비스
          </h1>
          
          {/* 뷰 모드 선택 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                목록보기
              </Button>
              <Button 
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={handleMapViewClick}
                size="sm"
              >
                지도보기
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                총 {filteredProducts.length}개
              </Badge>
              <select className="text-sm border border-gray-200 rounded px-3 py-1">
                <option>최신순</option>
                <option>가격낮은순</option>
                <option>가격높은순</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* 왼쪽 필터 패널 */}
          <div className="w-64 flex-shrink-0">
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            {viewMode === 'map' ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">지도 기능은 Google Maps API 키가 필요합니다.</p>
                <Button onClick={() => setIsApiKeyModalOpen(true)}>
                  API 키 설정하기
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      product={product}
                      onProductClick={() => handleProductClick(product)}
                      onChatClick={() => handleChatClick(product)}
                      onLocationClick={() => handleProductLocationClick(product)}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
                <p className="text-sm text-gray-400 mt-2">
                  다른 검색어나 필터를 시도해보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 상품 상세 모달 */}
      <ProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onChatClick={handleChatClick}
      />

      {/* 채팅 모달 */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        product={selectedProduct}
        onRentConfirm={handleRentConfirm}
      />

      {/* Google Maps 모달 */}
      <GoogleMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        product={selectedProduct}
        googleMapsApiKey={googleMapsApiKey}
      />

      {/* API 키 설정 모달 */}
      <MapApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onApiKeySet={handleApiKeySet}
        currentApiKey={googleMapsApiKey}
      />

      {/* 인기 검색어 태그 */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 검색어</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              '드릴', '사다리', '망치', '톱', '에어컨', '자전거', 
              '노트북', '컴퓨터', '냉장고', '세탁기', '책상', '의자',
              '텐트', '캠핑용품', '파티용품', '음향장비', '청소기', '다리미',
              '프로젝터', '게임기', '운동기구', '골프용품', '낚시용품', '등산용품'
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="group bg-white/70 backdrop-blur-sm hover:bg-orange-50 hover:border-orange-200 
                         border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 
                         hover:text-orange-600 transition-all duration-200 text-left
                         hover:shadow-md hover:scale-105 active:scale-95"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 group-hover:scale-110 transition-transform">
                    #
                  </span>
                  <span>{tag}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* 추가 정보 */}
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <p className="text-xs text-gray-500 text-center">
              공유창고에서 다양한 생활용품을 합리적으로 대여하세요 • 
              이웃과 함께하는 스마트한 소비문화
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
