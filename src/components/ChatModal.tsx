
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Product {
  id: string;
  title: string;
  price: number;
  hourlyRate?: number;
  location: string;
  timeAgo: string;
  image: string;
  category: string;
  available: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ChatModal = ({ isOpen, onClose, product }: ChatModalProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'owner',
      text: '안녕하세요! 대여 문의해주셔서 감사합니다.',
      time: '오후 2:30'
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // 자동 응답 시뮬레이션
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          sender: 'owner',
          text: '네, 언제 대여 원하시나요? 시간 조율해서 만나뵐게요!',
          time: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>소유자</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">물건 소유자</p>
              <p className="text-sm text-gray-500">{product.title}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* 상품 정보 */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex space-x-3">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{product.title}</h4>
              <p className="text-orange-500 font-bold">
                {product.price.toLocaleString()}원
              </p>
              {product.hourlyRate && (
                <p className="text-xs text-gray-500">
                  시간당 {product.hourlyRate.toLocaleString()}원
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 채팅 메시지 */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 메시지 입력 */}
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-orange-500 hover:bg-orange-600"
          >
            전송
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
