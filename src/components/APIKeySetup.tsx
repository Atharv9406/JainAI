import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Key, CheckCircle } from 'lucide-react';
import { setAPIKey, isAPIKeyConfigured } from '../utils/aiService';

interface APIKeySetupProps {
  onKeyConfigured: () => void;
  currentLanguage: 'english' | 'hindi';
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ onKeyConfigured, currentLanguage }) => {
  const [perplexityKey, setPerplexityKey] = useState('');
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if key is already configured
    const configured = isAPIKeyConfigured();
    setIsConfigured(configured);
    if (configured) {
      onKeyConfigured();
    }
  }, [onKeyConfigured]);

  const handleSaveKey = () => {
    if (perplexityKey.trim()) {
      setAPIKey(perplexityKey.trim());
      setIsConfigured(true);
      onKeyConfigured();

      // Store in localStorage for session persistence
      localStorage.setItem('jain_ai_perplexity_key_set', 'true');
    }
  };

  const labels = {
    english: {
      title: 'Configure Perplexity API',
      subtitle: 'Enter your Perplexity API key to enable accurate Jain knowledge responses',
      perplexityLabel: 'Perplexity API Key',
      perplexityPlaceholder: 'Enter your Perplexity API key...',
      saveButton: 'Save & Continue',
      helpText: 'Your API key is stored locally and not shared.',
      configured: 'API Key Configured Successfully!'
    },
    hindi: {
      title: 'Perplexity API कॉन्फ़िगर करें',
      subtitle: 'सटीक जैन ज्ञान उत्तर सक्षम करने के लिए अपनी Perplexity API कुंजी दर्ज करें',
      perplexityLabel: 'Perplexity API कुंजी',
      perplexityPlaceholder: 'अपनी Perplexity API कुंजी दर्ज करें...',
      saveButton: 'सेव करें और जारी रखें',
      helpText: 'आपकी API कुंजी स्थानीय रूप से संग्रहीत है और साझा नहीं की जाती।',
      configured: 'API कुंजी सफलतापूर्वक कॉन्फ़िगर की गई!'
    }
  };

  const currentLabels = labels[currentLanguage];

  if (isConfigured) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            {currentLabels.configured}
          </h3>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
      <Card className="p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <Key className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {currentLabels.title}
          </h2>
          <p className="text-sm text-gray-600">
            {currentLabels.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {currentLabels.perplexityLabel}
            </label>
            <div className="relative">
              <Input
                type={showPerplexityKey ? 'text' : 'password'}
                value={perplexityKey}
                onChange={(e) => setPerplexityKey(e.target.value)}
                placeholder={currentLabels.perplexityPlaceholder}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPerplexityKey(!showPerplexityKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPerplexityKey ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button
            onClick={handleSaveKey}
            disabled={!perplexityKey.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {currentLabels.saveButton}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            {currentLabels.helpText}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default APIKeySetup;
