
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header = ({ onSearch, searchQuery }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📦</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">공유창고</h1>
            </div>
          </div>

          {/* 앱 다운로드 버튼 */}
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            앱 다운로드
          </Button>
        </div>

        {/* 검색바 */}
        <div className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <span>📍 한남동</span>
            </div>
            
            <div className="flex-1 relative">
              <div className="flex bg-gray-800 rounded-lg">
                <select className="bg-gray-800 text-white px-4 py-3 rounded-l-lg border-none outline-none">
                  <option>중고거래</option>
                  <option>장비대여</option>
                </select>
                <div className="relative flex-1">
                  <Input 
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="bg-gray-800 text-white border-none rounded-none rounded-r-lg pl-4 pr-12"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
