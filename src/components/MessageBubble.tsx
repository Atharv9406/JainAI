
import React from 'react';
import { Copy, Search, Users, Globe, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import type { Message } from './JainAIChat';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: message.language === 'hindi' ? 'कॉपी हो गया' : 'Copied',
        description: message.language === 'hindi' 
          ? 'संदेश कॉपी हो गया है' 
          : 'Message copied to clipboard'
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] md:max-w-[70%]">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-3xl rounded-br-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className={`${message.language === 'hindi' ? 'font-devanagari' : 'font-sans'} text-sm leading-relaxed whitespace-pre-wrap`}>
              {message.content}
            </div>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
              <span className="text-xs text-white/80">
                {formatTime(message.timestamp)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-6 px-2 text-xs hover:bg-white/20 text-white/80 hover:text-white"
              >
                <Copy className="h-3 w-3 mr-1" />
                {message.language === 'hindi' ? 'कॉपी' : 'Copy'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] md:max-w-[80%]">
        <Card className={`backdrop-blur-md p-6 rounded-3xl rounded-bl-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
          message.error 
            ? 'bg-red-50/90 dark:bg-red-950/90 border border-red-200/50 dark:border-red-800/50' 
            : 'bg-white/90 dark:bg-gray-800/90 border border-orange-200/30 dark:border-orange-800/30'
        }`}>
          {/* Error Indicator */}
          {message.error && (
            <div className="flex items-center space-x-2 text-xs text-red-600 dark:text-red-400 mb-4 bg-red-100 dark:bg-red-950/50 px-3 py-2 rounded-full">
              <AlertTriangle className="h-3 w-3" />
              <span className="font-medium">
                {message.language === 'hindi' 
                  ? 'त्रुटि या चेतावनी' 
                  : 'Error or Warning'
                }
              </span>
            </div>
          )}

          {/* Web Search Indicator */}
          {message.isWebSearch && !message.error && (
            <div className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 mb-4 bg-orange-50 dark:bg-orange-950/30 px-4 py-3 rounded-full border border-orange-200 dark:border-orange-800">
              <div className="relative">
                <CheckCircle className="h-4 w-4" />
                <div className="absolute -inset-1 bg-orange-400/30 rounded-full animate-pulse"></div>
              </div>
              <span className="font-semibold">
                {message.language === 'hindi' 
                  ? 'लाइव वेब खोज से जानकारी' 
                  : 'Live web search results'
                }
              </span>
            </div>
          )}

          {/* Enhanced Sectarian Perspectives */}
          {message.sectarian && (
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2">
                <Users className="h-4 w-4 text-orange-500" />
                <span>
                  {message.language === 'hindi' 
                    ? 'संप्रदायिक दृष्टिकोण' 
                    : 'Sectarian Perspectives'
                  }
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {message.sectarian.svetambara && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      <strong className="text-blue-700 dark:text-blue-300 text-sm">
                        {message.language === 'hindi' ? 'श्वेतांबर परंपरा' : 'Śvetāmbara Tradition'}
                      </strong>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {message.sectarian.svetambara}
                    </p>
                  </div>
                )}
                
                {message.sectarian.digambara && (
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 p-4 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                      <strong className="text-orange-700 dark:text-orange-300 text-sm">
                        {message.language === 'hindi' ? 'दिगंबर परंपरा' : 'Digambara Tradition'}
                      </strong>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {message.sectarian.digambara}
                    </p>
                  </div>
                )}
              </div>
              
              {message.sectarian.common && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <strong className="text-green-700 dark:text-green-300 text-sm">
                      {message.language === 'hindi' ? 'साझा तत्व' : 'Common Elements'}
                    </strong>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {message.sectarian.common}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Main Message Content */}
          <div className={`${message.language === 'hindi' ? 'font-devanagari' : 'font-sans'} text-base leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200`}>
            {message.content}
          </div>

          {/* Enhanced Message Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
            <span className="text-xs text-muted-foreground flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                message.error ? 'bg-red-500' : 'bg-green-500'
              }`}></div>
              <span>{formatTime(message.timestamp)}</span>
              {message.isWebSearch && !message.error && (
                <span className="text-orange-500 font-medium">• Live</span>
              )}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-9 px-4 text-sm hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 rounded-full transition-all duration-200 font-semibold"
            >
              <Copy className="h-4 w-4 mr-2" />
              {message.language === 'hindi' ? 'कॉपी' : 'Copy'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessageBubble;
