
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import ProductCard from '@/components/ProductCard';
import ChatModal from '@/components/ChatModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import MapView from '@/components/MapView';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 페이지 타이틀 */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span>홈</span>
            <span>›</span>
            <span>중고거래</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            서울특별시 용산구 한남동 중고거래
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
                onClick={() => setViewMode('map')}
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
              <MapView 
                products={filteredProducts}
                onProductClick={handleProductClick}
              />
            ) : (
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

      {/* 태그 클라우드 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
          {['인기 검색어', '에어컨', '자전거', '아이폰', '컴퓨터', '냉장고', '세탁기', '책상', '의자', '러닝', '다이슨', '생활용품', '상품전', '노트북', '레고', '바이크', '아이패드', '식탁', '침대', '티비', '블루투스', '스탠드', '가방', '옷걸이', '에어팟', '게임', '모니터', '화장품', '프로덕트', '아이템'].map((tag, index) => (
            <span key={index} className="hover:text-orange-500 cursor-pointer">
              {tag}
              {index < 30 && <span className="ml-2">•</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
