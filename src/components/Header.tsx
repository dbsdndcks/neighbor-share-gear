
import React from 'react';
import { Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onSettingsClick: () => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

const Header = ({ onSearch, searchQuery, onSettingsClick, selectedLocation, onLocationChange }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const locations = [
    { value: 'all', label: '전체 지역' },
    { value: 'gangnam', label: '강남구' },
    { value: 'gangdong', label: '강동구' },
    { value: 'gangbuk', label: '강북구' },
    { value: 'gangseo', label: '강서구' },
    { value: 'gwanak', label: '관악구' },
    { value: 'gwangjin', label: '광진구' },
    { value: 'guro', label: '구로구' },
    { value: 'geumcheon', label: '금천구' },
    { value: 'nowon', label: '노원구' },
    { value: 'dobong', label: '도봉구' },
    { value: 'dongdaemun', label: '동대문구' },
    { value: 'dongjak', label: '동작구' },
    { value: 'mapo', label: '마포구' },
    { value: 'seodaemun', label: '서대문구' },
    { value: 'seocho', label: '서초구' },
    { value: 'seongdong', label: '성동구' },
    { value: 'seongbuk', label: '성북구' },
    { value: 'songpa', label: '송파구' },
    { value: 'yangcheon', label: '양천구' },
    { value: 'yeongdeungpo', label: '영등포구' },
    { value: 'yongsan', label: '용산구' },
    { value: 'eunpyeong', label: '은평구' },
    { value: 'jongno', label: '종로구' },
    { value: 'jung', label: '중구' },
    { value: 'jungnang', label: '중랑구' },
  ];

  const handleAuthClick = () => {
    if (user) {
      navigate('/mypage');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">📦</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">공유창고</h1>
            </div>
          </div>

          {/* 우측 버튼들 */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSettingsClick}
              className="p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant={user ? "default" : "outline"}
              size="sm"
              onClick={handleAuthClick}
              className={user ? "bg-emerald-500 hover:bg-emerald-600" : "border-emerald-500 text-emerald-500 hover:bg-emerald-50"}
            >
              <User className="w-4 h-4 mr-2" />
              {user ? '마이페이지' : '로그인'}
            </Button>
          </div>
        </div>

        {/* 검색바 */}
        <div className="pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-48">
              <Select value={selectedLocation} onValueChange={onLocationChange}>
                <SelectTrigger className="bg-gradient-to-r from-gray-800 to-gray-700 text-white border-none rounded-xl h-12 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
