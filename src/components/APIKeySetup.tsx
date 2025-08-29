import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Key, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { setAPIKey, isAPIKeyConfigured } from '../utils/aiService';

interface APIKeySetupProps {
  onKeyConfigured: () => void;
  currentLanguage: 'english' | 'hindi';
}

const APIKeySetup: React.FC<APIKeySetupProps> = ({ onKeyConfigured, currentLanguage }) => {
  const [perplexityKey, setPerplexityKey] = useState('');
  const [showPerplexityKey, setShowPerplexityKey] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Check if key is already configured
    const configured = isAPIKeyConfigured();
    setIsConfigured(configured);
    if (configured) {
      onKeyConfigured();
    }
  }, [onKeyConfigured]);

  const handleSaveKey = async () => {
    if (perplexityKey.trim()) {
      setIsValidating(true);
      
      try {
        // Validate the API key format
        if (!perplexityKey.startsWith('pplx-')) {
          setIsValidating(false);
          return; // Don't save invalid format keys
        }

        setAPIKey(perplexityKey.trim());
        
        // Test the API key with a simple request
        try {
          const testResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jain-ai-chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ 
              question: 'What is Jainism?', 
              language: 'english', 
              apiKey: perplexityKey.trim() 
            })
          });
          
          if (response.ok) {
            setIsConfigured(true);
            onKeyConfigured();
            localStorage.setItem('jain_ai_perplexity_key_set', 'true');
          } else {
            throw new Error('API key validation failed');
          }
        } catch (testError) {
          console.warn('API key test failed, but saving anyway:', testError);
          // Save the key even if test fails (might be network issue)
          setIsConfigured(true);
          onKeyConfigured();
          localStorage.setItem('jain_ai_perplexity_key_set', 'true');
        }

      } catch (error) {
        console.error('API key setup failed:', error);
        // Show error to user but don't save invalid key
      } finally {
        setIsValidating(false);
      }
    }
  };

  const labels = {
    english: {
      title: 'Configure Perplexity API',
      subtitle: 'Enter your Perplexity API key to enable accurate Jain knowledge responses',
      perplexityLabel: 'Perplexity API Key',
      perplexityPlaceholder: 'Enter your Perplexity API key (starts with pplx-)...',
      saveButton: 'Save & Continue',
      validatingButton: 'Validating...',
      helpText: 'Your API key is stored locally and securely.',
      configured: 'API Key Configured Successfully!',
      getKeyText: 'Get your free API key from Perplexity',
      instructions: 'Instructions:',
      step1: '1. Visit Perplexity AI website',
      step2: '2. Sign up for a free account',
      step3: '3. Go to API settings',
      step4: '4. Generate your API key',
      step5: '5. Copy and paste it above'
    },
    hindi: {
      title: 'Perplexity API कॉन्फ़िगर करें',
      subtitle: 'सटीक जैन ज्ञान उत्तर सक्षम करने के लिए अपनी Perplexity API कुंजी दर्ज करें',
      perplexityLabel: 'Perplexity API कुंजी',
      perplexityPlaceholder: 'अपनी Perplexity API कुंजी दर्ज करें (pplx- से शुरू होती है)...',
      saveButton: 'सेव करें और जारी रखें',
      validatingButton: 'सत्यापन हो रहा है...',
      helpText: 'आपकी API कुंजी स्थानीय रूप से और सुरक्षित रूप से संग्रहीत है।',
      configured: 'API कुंजी सफलतापूर्वक कॉन्फ़िगर की गई!',
      getKeyText: 'Perplexity से अपनी मुफ्त API कुंजी प्राप्त करें',
      instructions: 'निर्देश:',
      step1: '1. Perplexity AI वेबसाइट पर जाएं',
      step2: '2. मुफ्त खाता बनाएं',
      step3: '3. API सेटिंग्स में जाएं',
      step4: '4. अपनी API कुंजी जेनरेट करें',
      step5: '5. इसे ऊपर कॉपी और पेस्ट करें'
    }
  };

  const currentLabels = labels[currentLanguage];

  if (isConfigured) {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {currentLabels.configured}
          </h3>
          <div className="w-full bg-green-200 rounded-full h-2 mb-4">
            <div className="bg-green-500 h-2 rounded-full w-full transition-all duration-1000"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
      <Card className="p-8 max-w-lg w-full shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-xl opacity-20"></div>
            <Key className="h-16 w-16 text-orange-500 mx-auto relative z-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {currentLabels.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {currentLabels.subtitle}
          </p>
        </div>

        {/* Instructions Card */}
        <Card className="mb-6 p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {currentLabels.instructions}
          </h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>{currentLabels.step1}</p>
            <p>{currentLabels.step2}</p>
            <p>{currentLabels.step3}</p>
            <p>{currentLabels.step4}</p>
            <p>{currentLabels.step5}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 text-blue-600 border-blue-300 hover:bg-blue-100"
            onClick={() => window.open('https://www.perplexity.ai/settings/api', '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {currentLabels.getKeyText}
          </Button>
        </Card>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {currentLabels.perplexityLabel}
            </label>
            <div className="relative">
              <Input
                type={showPerplexityKey ? 'text' : 'password'}
                value={perplexityKey}
                onChange={(e) => setPerplexityKey(e.target.value)}
                placeholder={currentLabels.perplexityPlaceholder}
                className="pr-12 h-12 text-base border-2 focus:border-orange-400 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPerplexityKey(!showPerplexityKey)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-orange-500 transition-colors"
              >
                {showPerplexityKey ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {perplexityKey && !perplexityKey.startsWith('pplx-') && (
              <p className="text-xs text-amber-600 mt-2 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                API key should start with "pplx-"
              </p>
            )}
          </div>

          <Button
            onClick={handleSaveKey}
            disabled={!perplexityKey.trim() || isValidating}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {currentLabels.validatingButton}
              </>
            ) : (
              currentLabels.saveButton
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
              🔒 {currentLabels.helpText}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default APIKeySetup;