
import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onSettingsClick: () => void;
}

const Header = ({ onSearch, searchQuery, onSettingsClick }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">📦</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">공유창고</h1>
            </div>
          </div>

          {/* 설정 및 앱 다운로드 */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSettingsClick}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg">
              앱 다운로드
            </Button>
          </div>
        </div>

        {/* 검색바 */}
        <div className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg">
              <span>📍 한남동</span>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative">
                <Input 
                  type="text"
                  placeholder="검색어를 입력해주세요"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-gray-800 text-white border-none rounded-xl pl-4 pr-12 h-12 shadow-lg"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
