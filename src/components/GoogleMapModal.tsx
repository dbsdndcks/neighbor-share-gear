import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { Item } from '@/types/index';

interface GoogleMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  googleMapsApiKey: string;
}

const GoogleMapModal = ({ isOpen, onClose, item, googleMapsApiKey }: GoogleMapModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !item || !googleMapsApiKey || !mapRef.current) return;

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: googleMapsApiKey,
          version: 'weekly',
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');

        // 한남동 좌표 (예시)
        const position = { lat: 37.5345, lng: 127.0035 };

        const map = new Map(mapRef.current, {
          zoom: 15,
          center: position,
          mapId: 'DEMO_MAP_ID',
        });

        // 마커 추가
        new AdvancedMarkerElement({
          map,
          position,
          title: item.title,
        });

        setMapError(null);
      } catch (error) {
        console.error('지도 로드 중 오류:', error);
        setMapError('지도를 로드할 수 없습니다. API 키를 확인해주세요.');
      }
    };

    initMap();
  }, [isOpen, item, googleMapsApiKey]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>📍</span>
            <span>{item?.title} 위치</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 relative">
          {mapError ? (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div className="text-center">
                <p className="text-red-500 mb-2">{mapError}</p>
                <p className="text-sm text-gray-600">
                  Google Maps API 키가 올바른지 확인해주세요.
                </p>
              </div>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              className="w-full h-full rounded-lg"
              style={{ minHeight: '400px' }}
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="font-medium">{item?.title}</p>
            <p className="text-sm text-gray-600">{item?.location}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">{item?.price.toLocaleString()}원</p>
            {item?.hourlyRate && (
              <p className="text-sm text-orange-500">
                시간당 {item.hourlyRate.toLocaleString()}원
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleMapModal;
