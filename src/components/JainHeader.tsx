
import React from 'react';
import { Settings, Menu, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JainHeaderProps {
  currentLanguage: 'english' | 'hindi';
  onSettingsClick: () => void;
  onClearChat: () => void;
  connectionStatus?: 'connected' | 'disconnected' | 'checking';
}

const JainHeader: React.FC<JainHeaderProps> = ({
  currentLanguage,
  onSettingsClick,
  onClearChat,
  connectionStatus = 'checking'
}) => {
  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500 animate-pulse" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return currentLanguage === 'hindi' ? 'कनेक्टेड' : 'Connected';
      case 'disconnected':
        return currentLanguage === 'hindi' ? 'डिस्कनेक्टेड' : 'Disconnected';
      default:
        return currentLanguage === 'hindi' ? 'जांच रहे हैं' : 'Checking';
    }
  };
  return (
    <header className="bg-white/95 backdrop-blur-md border-b shadow-lg">
      <div className="flex flex-col px-4 py-3">
        {/* Developer Credit */}
        <div className="text-center mb-2">
          <p className="text-xs text-muted-foreground font-medium">
            Developed by Neuratantra AI - Vaibhav Jain
          </p>
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl border-2 border-white">
              <div className="text-white font-bold text-lg">🤚</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                JAIN AI
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                {currentLanguage === 'hindi' ? 'जैन एआई' : 'Jin Shashan Guide'}
              </p>
              <p className="text-xs text-orange-600 font-semibold">
                powered by Jain Samaj Youth Welfare Society Indore
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Connection Status */}
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              {getConnectionIcon()}
              <span className="text-xs font-medium">
                {getConnectionText()}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              className="text-muted-foreground hover:text-foreground hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200"
              title={currentLanguage === 'hindi' ? 'सेटिंग्स' : 'Settings'}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JainHeader;
