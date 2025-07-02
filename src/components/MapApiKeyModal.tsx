
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MapApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

const MapApiKeyModal = ({ isOpen, onClose, onApiKeySet, currentApiKey }: MapApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      setError('API 키를 입력해주세요.');
      return;
    }
    
    onApiKeySet(apiKey.trim());
    onClose();
    setError('');
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>🗺️</span>
            <span>Google Maps API 설정</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Google Maps API 키</Label>
            <Input
              id="apiKey"
              type="text"
              placeholder="Google Maps API 키를 입력하세요"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-2"
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">API 키 발급 방법:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a>에 접속</li>
              <li>2. 프로젝트 생성 또는 선택</li>
              <li>3. Maps JavaScript API 활성화</li>
              <li>4. 사용자 인증 정보에서 API 키 생성</li>
            </ol>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapApiKeyModal;
