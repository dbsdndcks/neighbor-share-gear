
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Clock, MapPin, Package, User } from 'lucide-react';

interface RentalItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  original_price: number;
  hourly_rate: number;
  daily_rate: number;
  location: string;
  status: string;
  created_at: string;
}

interface Rental {
  id: string;
  start_date: string;
  end_date: string;
  total_cost: number;
  status: string;
  rental_items: RentalItem;
}

const MyPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [myRentals, setMyRentals] = useState<Rental[]>([]);
  const [myItems, setMyItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // 내가 대여한 물품들
      const { data: rentalsData, error: rentalsError } = await supabase
        .from('rentals')
        .select(`
          *,
          rental_items (*)
        `)
        .eq('renter_id', user?.id);

      if (rentalsError) throw rentalsError;

      // 내가 등록한 물품들
      const { data: itemsData, error: itemsError } = await supabase
        .from('rental_items')
        .select('*')
        .eq('owner_id', user?.id);

      if (itemsError) throw itemsError;

      setMyRentals(rentalsData || []);
      setMyItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('로그아웃 실패');
    } else {
      toast.success('로그아웃 되었습니다.');
      navigate('/');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:text-emerald-500 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📦</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">공유창고</h1>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                안녕하세요, {user?.email?.split('@')[0]}님!
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">대여 현황과 등록한 물품을 관리하세요</p>
        </div>

        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rentals">대여 중인 물품</TabsTrigger>
            <TabsTrigger value="items">등록한 물품</TabsTrigger>
            <TabsTrigger value="add">물품 등록</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>대여 중인 물품</span>
                </CardTitle>
                <CardDescription>
                  현재 대여 중인 물품들의 상태를 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myRentals.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>대여 중인 물품이 없습니다.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {myRentals.map((rental) => (
                      <div key={rental.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <img
                            src={rental.rental_items.image_url || '/placeholder.svg'}
                            alt={rental.rental_items.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{rental.rental_items.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{rental.rental_items.description}</p>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>대여일: {formatDate(rental.start_date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{rental.rental_items.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant={rental.status === 'active' ? 'default' : 'secondary'}>
                                {rental.status === 'active' ? '대여중' : '반납완료'}
                              </Badge>
                              <div className="text-right">
                                <p className="font-semibold text-emerald-600">
                                  총 {formatPrice(rental.total_cost || 0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>등록한 물품</span>
                </CardTitle>
                <CardDescription>
                  내가 등록한 물품들의 대여 상태를 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>등록한 물품이 없습니다.</p>
                    <Button 
                      className="mt-4 bg-emerald-500 hover:bg-emerald-600"
                      onClick={() => {
                        const tabsTrigger = document.querySelector('[value="add"]') as HTMLElement;
                        tabsTrigger?.click();
                      }}
                    >
                      물품 등록하기
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {myItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <img
                          src={item.image_url || '/placeholder.svg'}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-emerald-600 font-semibold">
                            원가: {formatPrice(item.original_price)}
                          </p>
                          {item.hourly_rate && (
                            <p>시간당: {formatPrice(item.hourly_rate)}</p>
                          )}
                          {item.daily_rate && (
                            <p>일당: {formatPrice(item.daily_rate)}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant={item.status === 'available' ? 'default' : 'secondary'}
                              className={item.status === 'available' ? 'bg-emerald-500' : ''}
                            >
                              {item.status === 'available' ? '대여가능' : '대여중'}
                            </Badge>
                            <span className="text-gray-500">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>물품 등록</CardTitle>
                <CardDescription>
                  대여할 물품을 등록해 보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => navigate('/add-item')}
                >
                  물품 등록 페이지로 이동
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
