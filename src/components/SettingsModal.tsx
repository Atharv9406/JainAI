import React, { useEffect, useState } from 'react';
import { X, Moon, Sun, Type, Info, Shield, Key, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { getAPIKey, setAPIKey } from '../utils/aiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'english' | 'hindi';
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [hasAPIKey, setHasAPIKey] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Check API key status
  useEffect(() => {
    setHasAPIKey(!!getAPIKey());
  }, [isOpen]);

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleClearAPIKey = () => {
    localStorage.removeItem('jain_ai_perplexity_key');
    setHasAPIKey(false);
    // Reload page to show API key setup
    window.location.reload();
  };

  const text = {
    english: {
      title: 'Settings',
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      apiSettings: 'API Settings',
      apiKeyStatus: 'API Key Status',
      configured: 'Configured',
      notConfigured: 'Not Configured',
      clearApiKey: 'Clear API Key',
      fontSize: 'Font Size',
      about: 'About JAIN AI',
      aboutText: 'JAIN AI provides comprehensive information about Jain religion, philosophy, and traditions. We present balanced perspectives from both Śvetāmbara and Digambara traditions.',
      privacy: 'Privacy',
      privacyText: 'Your conversations are not stored permanently. We respect your privacy and use secure connections.',
      disclaimer: 'Disclaimer',
      disclaimerText: 'This app provides educational information about Jainism. For religious guidance, please consult qualified Jain scholars and teachers.',
      close: 'Close'
    },
    hindi: {
      title: 'सेटिंग्स',
      appearance: 'रूप-रंग',
      darkMode: 'डार्क मोड',
      apiSettings: 'API सेटिंग्स',
      apiKeyStatus: 'API कुंजी स्थिति',
      configured: 'कॉन्फ़िगर किया गया',
      notConfigured: 'कॉन्फ़िगर नहीं किया गया',
      clearApiKey: 'API कुंजी साफ़ करें',
      fontSize: 'फ़ॉन्ट आकार',
      about: 'जैन एआई के बारे में',
      aboutText: 'जैन एआई जैन धर्म, दर्शन और परंपराओं के बारे में व्यापक जानकारी प्रदान करता है। हम श्वेतांबर और दिगंबर दोनों परंपराओं के संतुलित दृष्टिकोण प्रस्तुत करते हैं।',
      privacy: 'गोपनीयता',
      privacyText: 'आपकी बातचीत स्थायी रूप से संग्रहीत नहीं होती। हम आपकी गोपनीयता का सम्मान करते हैं और सुरक्षित कनेक्शन का उपयोग करते हैं।',
      disclaimer: 'अस्वीकरण',
      disclaimerText: 'यह ऐप जैन धर्म के बारे में शैक्षिक जानकारी प्रदान करता है। धार्मिक मार्गदर्शन के लिए कृपया योग्य जैन विद्वानों और शिक्षकों से सलाह लें।',
      close: 'बंद करें'
    }
  };

  const currentText = text[currentLanguage];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className={`text-xl font-semibold ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
            {currentText.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Appearance Settings */}
          <Card className="p-4">
            <h3 className={`font-medium mb-3 flex items-center space-x-2 ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{currentText.appearance}</span>
            </h3>
            
            <div className="flex items-center justify-between">
              <span className={`text-sm ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
                {currentText.darkMode}
              </span>
              <Switch
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </Card>

          {/* API Settings */}
          <Card className="p-4">
            <h3 className={`font-medium mb-3 flex items-center space-x-2 ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              <Key className="h-4 w-4" />
              <span>{currentText.apiSettings}</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
                  {currentText.apiKeyStatus}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${hasAPIKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs font-medium ${hasAPIKey ? 'text-green-600' : 'text-red-600'}`}>
                    {hasAPIKey ? currentText.configured : currentText.notConfigured}
                  </span>
                </div>
              </div>
              
              {hasAPIKey && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAPIKey}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  {currentText.clearApiKey}
                </Button>
              )}
            </div>
          </Card>

          {/* About Section */}
          <Card className="p-4">
            <h3 className={`font-medium mb-2 flex items-center space-x-2 ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              <Info className="h-4 w-4" />
              <span>{currentText.about}</span>
            </h3>
            <p className={`text-sm text-muted-foreground ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              {currentText.aboutText}
            </p>
          </Card>

          {/* Privacy Section */}
          <Card className="p-4">
            <h3 className={`font-medium mb-2 flex items-center space-x-2 ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              <Shield className="h-4 w-4" />
              <span>{currentText.privacy}</span>
            </h3>
            <p className={`text-sm text-muted-foreground ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              {currentText.privacyText}
            </p>
          </Card>

          {/* Disclaimer */}
          <Card className="p-4 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <p className={`text-sm text-orange-800 dark:text-orange-200 ${currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}`}>
              <strong className="block mb-1">{currentText.disclaimer}:</strong>
              <span>{currentText.disclaimerText}</span>
            </p>
          </Card>

          {/* Close Button */}
          <div className="pt-2">
            <Button 
              onClick={onClose} 
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg"
              variant="default"
            >
              <span className={currentLanguage === 'hindi' ? 'devanagari' : 'english-text'}>
                {currentText.close}
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;