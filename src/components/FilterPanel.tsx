
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterPanelProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const FilterPanel = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedLocation, 
  onLocationChange 
}: FilterPanelProps) => {
  const categories = [
    { id: 'all', label: '전체', count: 0 },
    { id: 'tools', label: '공구', count: 12 },
    { id: 'camping', label: '캠핑용품', count: 8 },
    { id: 'furniture', label: '가구', count: 15 },
    { id: 'electronics', label: '전자제품', count: 6 },
  ];

  const locations = [
    { id: 'hannam', label: '한남동' },
    { id: 'yongsan', label: '용산구' },
    { id: 'gangnam', label: '강남구' },
    { id: 'all', label: '전체' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-6">
        {/* 필터 헤더 */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">필터</h3>
          <Button variant="outline" size="sm">
            초기화
          </Button>
        </div>

        {/* 거래 가능만 보기 */}
        <div className="flex items-center space-x-2">
          <Checkbox id="available" />
          <label htmlFor="available" className="text-sm text-gray-700">
            거래 가능만 보기
          </label>
        </div>

        {/* 위치 필터 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">위치</h4>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={location.id}
                  name="location"
                  checked={selectedLocation === location.id}
                  onChange={() => onLocationChange(location.id)}
                  className="text-orange-500"
                />
                <label htmlFor={location.id} className="text-sm text-gray-700">
                  {location.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">카테고리</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={category.id}
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => onCategoryChange(category.id)}
                    className="text-orange-500"
                  />
                  <label htmlFor={category.id} className="text-sm text-gray-700">
                    {category.label}
                  </label>
                </div>
                {category.count > 0 && (
                  <span className="text-xs text-gray-500">{category.count}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
