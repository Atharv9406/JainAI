import React, { useState, useEffect } from 'react';
import JainAIChat from '../components/JainAIChat';
import APIKeySetup from '../components/APIKeySetup';
import { isAPIKeyConfigured } from '../utils/aiService';

const Index = () => {
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'hindi'>('english');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if API key is configured
    const checkAPIKey = () => {
      const configured = isAPIKeyConfigured();
      setIsKeyConfigured(configured);
      setIsLoading(false);
    };

    // Small delay to prevent flash
    setTimeout(checkAPIKey, 100);
  }, []);

  const handleKeyConfigured = () => {
    setIsKeyConfigured(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading JAIN AI...</p>
        </div>
      </div>
    );
  }

  if (!isKeyConfigured) {
    return (
      <APIKeySetup 
        onKeyConfigured={handleKeyConfigured}
        currentLanguage={currentLanguage}
      />
    );
  }

  return <JainAIChat />;
};

export default Index;