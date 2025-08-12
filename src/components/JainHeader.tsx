
import React from 'react';
import { Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JainHeaderProps {
  currentLanguage: 'english' | 'hindi';
  onSettingsClick: () => void;
  onClearChat: () => void;
}

const JainHeader: React.FC<JainHeaderProps> = ({
  currentLanguage,
  onSettingsClick,
  onClearChat
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b shadow-sm">
      <div className="flex flex-col px-4 py-3">
        {/* Developer Credit */}
        <div className="text-center mb-2">
          <p className="text-xs text-muted-foreground">
            Developed by Neuratantra AI - Vaibhav Jain
          </p>
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <div className="text-white font-bold text-lg">🤚</div>
            </div>
            <div>
              <h1 className="text-xl font-bold jain-text-gradient">
                JAIN AI
              </h1>
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'hindi' ? 'जैन एआई' : 'Jin Shashan Guide'}
              </p>
              <p className="text-xs text-orange-600 font-medium">
                powered by Jain Samaj Youth Welfare Society Indore
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettingsClick}
              className="text-muted-foreground hover:text-foreground"
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
