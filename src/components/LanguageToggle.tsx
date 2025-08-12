
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'english' | 'hindi';
  onLanguageChange: (language: 'english' | 'hindi') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div className="flex rounded-lg border bg-muted p-1">
        <Button
          variant={currentLanguage === 'english' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('english')}
          className="text-xs px-3 py-1 h-7"
        >
          EN
        </Button>
        <Button
          variant={currentLanguage === 'hindi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('hindi')}
          className="text-xs px-3 py-1 h-7 devanagari"
        >
          हिं
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggle;
