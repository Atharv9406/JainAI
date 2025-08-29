import React, { useState, useRef, useEffect } from 'react';
import { Settings, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import JainHeader from './JainHeader';
import MessageBubble from './MessageBubble';
import LanguageToggle from './LanguageToggle';
import QuickSuggestions from './QuickSuggestions';
import SettingsModal from './SettingsModal';
import FloatingInput from './FloatingInput';
import { getAIResponse, getAPIKey } from '../utils/aiService';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  language: 'english' | 'hindi';
  isWebSearch?: boolean;
  error?: boolean;
  sectarian?: {
    svetambara?: string;
    digambara?: string;
    common?: string;
  };
}

const JainAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi'>('english');
  const [showSettings, setShowSettings] = useState(false);
  const [isWebSearching, setIsWebSearching] = useState(false);
  const [showQuickSuggestions, setShowQuickSuggestions] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check connection status
  useEffect(() => {
    const checkConnection = async () => {
      setConnectionStatus('checking');
      try {
        const apiKey = getAPIKey();
        if (apiKey && apiKey.startsWith('pplx-')) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('disconnected');
        }
      } catch (error) {
        console.log('Connection check failed:', error);
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    // Welcome message based on current language
    const welcomeMessage: Message = {
      id: '1',
      content: currentLanguage === 'hindi' 
        ? '**नमस्कार!** 🙏\n\nमैं **जैन एआई** हूं। मैं जैन धर्म, दर्शन, उपवास विधि, और परंपराओं के बारे में आपके सभी प्रश्नों का उत्तर दे सकता हूं।\n\n**मैं दोनों परंपराओं के दृष्टिकोण प्रस्तुत करता हूं:**\n• श्वेतांबर परंपरा\n• दिगंबर परंपरा\n\nकृपया अपना प्रश्न पूछें। 📿'
        : '**Namaste!** 🙏\n\nI am **JAIN AI**, your comprehensive guide to Jain religion, philosophy, fasting methods, and traditions.\n\n**I provide balanced perspectives from:**\n• Śvetāmbara tradition\n• Digambara tradition\n• Common practices\n\nHow may I help you on your spiritual journey today? 📿',
      sender: 'ai',
      timestamp: new Date(),
      language: currentLanguage
    };
    
    setMessages([welcomeMessage]);
    setShowQuickSuggestions(true);
  }, [currentLanguage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setShowQuickSuggestions(false);

    // Always use the currently selected language instead of detecting from input
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      language: currentLanguage // Use selected language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsWebSearching(true);

    try {
      // Pass the currently selected language to the AI service
      const response = await getAIResponse(inputMessage, currentLanguage, setIsWebSearching);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        language: currentLanguage, // Use selected language for response
        isWebSearch: response.usedWebSearch,
        error: response.content.includes('API key') || response.content.includes('Sorry') || response.content.includes('क्षमा करें'),
        sectarian: response.sectarian
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: currentLanguage === 'hindi' 
          ? '**क्षमा करें** 🙏\n\nमुझे इस समय उत्तर देने में कठिनाई हो रही है। कृपया अपना प्रश्न दोबारा पूछें।'
          : '**Sorry** 🙏\n\nI\'m having difficulty responding right now. Please try rephrasing your question.',
        sender: 'ai',
        timestamp: new Date(),
        language: currentLanguage,
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: currentLanguage === 'hindi' ? 'त्रुटि' : 'Error',
        description: currentLanguage === 'hindi' 
          ? 'एआई सेवा में समस्या है। कृपया पुनः प्रयास करें।'
          : 'There was an issue with the AI service. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
      setIsWebSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setShowQuickSuggestions(false);
    // Auto-send the quick question
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-orange-50/80 via-white to-green-50/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <JainHeader 
        currentLanguage={currentLanguage}
        onSettingsClick={() => setShowSettings(true)}
        onClearChat={() => {}}
        connectionStatus={connectionStatus}
      />

      {/* Language Toggle Bar */}
      <div className="px-4 py-3 border-b bg-white/70 dark:bg-gray-800/70 backdrop-blur-md transition-all duration-300 relative z-10">
        <LanguageToggle 
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
      </div>

      {/* Messages Area with enhanced styling */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 relative z-10 pb-32 md:pb-24">
        {/* Quick Suggestions - Modern Card Layout */}
        {showQuickSuggestions && messages.length <= 1 && (
          <div className="animate-fade-in">
            <QuickSuggestions 
              language={currentLanguage}
              onQuestionSelect={handleQuickQuestion}
            />
          </div>
        )}
        
        {/* Messages */}
        {messages.map((message) => (
          <div key={message.id} className="animate-message-slide">
            <MessageBubble message={message} />
          </div>
        ))}
        
        {/* Enhanced Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-4 text-muted-foreground px-6 py-8">
            <div className="relative">
              {isWebSearching ? (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="h-8 w-8 animate-spin text-orange-500" />
                    <div className="absolute -inset-2 bg-orange-400/20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'hindi' ? 'जानकारी खोजी जा रही है...' : 'Searching for information...'}
                    </span>
                    <span className="text-sm opacity-70 font-medium">
                      {currentLanguage === 'hindi' ? 'कृपया प्रतीक्षा करें' : 'Please wait'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Sparkles className="h-8 w-8 text-orange-500 animate-pulse" />
                    <div className="absolute -inset-2 bg-orange-400/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'hindi' ? 'जैन एआई सोच रहा है...' : 'JAIN AI is thinking...'}
                    </span>
                    <span className="text-sm opacity-70 font-medium">
                      {currentLanguage === 'hindi' ? 'उत्तर तैयार कर रहे हैं' : 'Preparing response'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Floating Input Component */}
      <FloatingInput
        value={inputMessage}
        onChange={setInputMessage}
        onSend={handleSendMessage}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
        language={currentLanguage}
        inputRef={inputRef}
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default JainAIChat;
