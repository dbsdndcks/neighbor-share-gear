
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import ProductCard from '@/components/ProductCard';
import ChatModal from '@/components/ChatModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import { mockProducts, Product } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || 
        (selectedLocation === 'gangnam' && product.location === '강남구') ||
        (selectedLocation === 'gangdong' && product.location === '강동구') ||
        (selectedLocation === 'gangbuk' && product.location === '강북구') ||
        (selectedLocation === 'gangseo' && product.location === '강서구') ||
        (selectedLocation === 'gwanak' && product.location === '관악구') ||
        (selectedLocation === 'gwangjin' && product.location === '광진구') ||
        (selectedLocation === 'guro' && product.location === '구로구') ||
        (selectedLocation === 'geumcheon' && product.location === '금천구') ||
        (selectedLocation === 'nowon' && product.location === '노원구') ||
        (selectedLocation === 'dobong' && product.location === '도봉구') ||
        (selectedLocation === 'dongdaemun' && product.location === '동대문구') ||
        (selectedLocation === 'dongjak' && product.location === '동작구') ||
        (selectedLocation === 'mapo' && product.location === '마포구') ||
        (selectedLocation === 'seodaemun' && product.location === '서대문구') ||
        (selectedLocation === 'seocho' && product.location === '서초구') ||
        (selectedLocation === 'seongdong' && product.location === '성동구') ||
        (selectedLocation === 'seongbuk' && product.location === '성북구') ||
        (selectedLocation === 'songpa' && product.location === '송파구') ||
        (selectedLocation === 'yangcheon' && product.location === '양천구') ||
        (selectedLocation === 'yeongdeungpo' && product.location === '영등포구') ||
        (selectedLocation === 'yongsan' && product.location === '용산구') ||
        (selectedLocation === 'eunpyeong' && product.location === '은평구') ||
        (selectedLocation === 'jongno' && product.location === '종로구') ||
        (selectedLocation === 'jung' && product.location === '중구') ||
        (selectedLocation === 'jungnang' && product.location === '중랑구');
      
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
    // Settings functionality can be added here
  };

  const getLocationLabel = (locationValue: string) => {
    const locationMap: { [key: string]: string } = {
      'all': '전체 지역',
      'gangnam': '강남구',
      'gangdong': '강동구',
      'gangbuk': '강북구',
      'gangseo': '강서구',
      'gwanak': '관악구',
      'gwangjin': '광진구',
      'guro': '구로구',
      'geumcheon': '금천구',
      'nowon': '노원구',
      'dobong': '도봉구',
      'dongdaemun': '동대문구',
      'dongjak': '동작구',
      'mapo': '마포구',
      'seodaemun': '서대문구',
      'seocho': '서초구',
      'seongdong': '성동구',
      'seongbuk': '성북구',
      'songpa': '송파구',
      'yangcheon': '양천구',
      'yeongdeungpo': '영등포구',
      'yongsan': '용산구',
      'eunpyeong': '은평구',
      'jongno': '종로구',
      'jung': '중구',
      'jungnang': '중랑구',
    };
    return locationMap[locationValue] || '전체 지역';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        onSettingsClick={handleSettingsClick}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
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
            {getLocationLabel(selectedLocation)} 대여서비스
          </h1>
          
          {/* 검색 결과 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                총 {filteredProducts.length}개
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
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

          {/* 메인 콘텐츠 - 그리드 뷰만 */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <ProductCard
                    product={product}
                    onChatClick={(e) => {
                      e.stopPropagation();
                      handleChatClick(product);
                    }}
                  />
                </div>
              ))}
            </div>

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
                className="group bg-white/70 backdrop-blur-sm hover:bg-emerald-50 hover:border-emerald-200 
                         border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 
                         hover:text-emerald-600 transition-all duration-200 text-left
                         hover:shadow-md hover:scale-105 active:scale-95"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-500 group-hover:scale-110 transition-transform">
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
