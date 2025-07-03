
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Upload } from 'lucide-react';

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    originalPrice: '',
    hourlyRate: '',
    dailyRate: '',
    quantity: '1',
    category: '',
    location: ''
  });

  const categories = [
    { value: 'tools', label: '공구' },
    { value: 'camping', label: '캠핑용품' },
    { value: 'electronics', label: '전자제품' },
    { value: 'furniture', label: '가구' },
    { value: 'sports', label: '스포츠용품' },
    { value: 'kitchen', label: '주방용품' },
    { value: 'cleaning', label: '청소용품' },
    { value: 'others', label: '기타' },
  ];

  const locations = [
    '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('rental_items')
        .insert({
          owner_id: user.id,
          title: formData.title,
          description: formData.description,
          image_url: formData.imageUrl || '/placeholder.svg',
          original_price: parseInt(formData.originalPrice),
          hourly_rate: formData.hourlyRate ? parseInt(formData.hourlyRate) : null,
          daily_rate: formData.dailyRate ? parseInt(formData.dailyRate) : null,
          quantity: parseInt(formData.quantity),
          available_quantity: parseInt(formData.quantity),
          category: formData.category,
          location: formData.location,
          status: 'available'
        });

      if (error) throw error;

      toast.success('물품이 성공적으로 등록되었습니다!');
      navigate('/mypage');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('물품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/mypage')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>마이페이지로 돌아가기</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📦</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">공유창고</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">물품 등록</CardTitle>
            <CardDescription>
              대여할 물품의 정보를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">물품명 *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="물품명을 입력하세요"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">물품 설명</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="물품에 대한 상세한 설명을 입력하세요"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">이미지 URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  이미지 URL을 입력하거나 추후 파일 업로드 기능을 이용하세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리 *</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange('category')}>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">지역 *</Label>
                  <Select value={formData.location} onValueChange={handleSelectChange('location')}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">원래 가격 (원) *</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  placeholder="100000"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">시간당 대여료 (원)</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    placeholder="5000"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyRate">일일 대여료 (원)</Label>
                  <Input
                    id="dailyRate"
                    name="dailyRate"
                    type="number"
                    placeholder="30000"
                    value={formData.dailyRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">수량 *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                disabled={loading}
              >
                {loading ? '등록 중...' : '물품 등록'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddItem;
