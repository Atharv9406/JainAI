
import React from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FloatingInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  language: 'english' | 'hindi';
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  value,
  onChange,
  onSend,
  onKeyPress,
  isLoading,
  language,
  inputRef
}) => {
  const placeholder = language === 'hindi'
    ? 'जैन सिद्धांत, उपवास विधि, या शिक्षाओं के बारे में पूछें...'
    : 'Ask about Jain principles, fasting methods, or teachings...';

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-gray-900/95 dark:via-gray-900/90 backdrop-blur-xl border-t border-orange-200/30 dark:border-orange-800/30 z-50">
      {/* Enhanced Mobile-First Input Container */}
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-orange-200/60 dark:border-orange-800/60 p-3 transition-all duration-300 hover:shadow-3xl hover:border-orange-300/80 dark:hover:border-orange-700/80 hover:scale-[1.01]">
          <div className="flex items-end space-x-3">
            {/* Main Input Area */}
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyPress}
                placeholder={placeholder}
                className={`w-full min-h-[52px] max-h-36 px-5 py-4 bg-transparent border-0 resize-none focus:ring-0 focus:outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base ${
                  language === 'hindi' ? 'font-devanagari' : 'font-sans'
                } text-base leading-relaxed scrollbar-hide`}
                disabled={isLoading}
                rows={1}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Voice Input Button (Future Feature) */}
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200 hover:scale-105"
                disabled={isLoading}
              >
                <Mic className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>

              {/* Send Button with Enhanced Styling */}
              <Button
                onClick={onSend}
                disabled={isLoading || !value.trim()}
                className="h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white dark:border-gray-700"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Character Counter (Optional) */}
          {value.length > 200 && (
            <div className="text-right mt-1 mr-2">
              <span className={`text-xs font-medium ${value.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                {value.length}/500
              </span>
            </div>
          )}
        </div>

        {/* Quick Action Hints */}
        <div className="flex justify-center mt-2 space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center space-x-1">
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">⏎</span>
            <span>{language === 'hindi' ? 'भेजें' : 'Send'}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">⇧⏎</span>
            <span>{language === 'hindi' ? 'नई लाइन' : 'New line'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatingInput;
