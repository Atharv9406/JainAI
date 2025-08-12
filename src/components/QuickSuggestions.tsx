
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, BookOpen, Heart, Calendar, Sparkles, Flower, CircleDot } from 'lucide-react';

interface QuickSuggestionsProps {
  language: 'english' | 'hindi';
  onQuestionSelect: (question: string) => void;
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({
  language,
  onQuestionSelect
}) => {
  const suggestions = {
    english: [
      {
        icon: <CircleDot className="h-5 w-5" />,
        title: "🙏 Principles & Philosophy",
        gradient: "from-orange-500 to-yellow-500",
        questions: [
          "What are the main principles of Jainism?",
          "Explain Ahimsa in daily life",
          "What is Anekantavada?",
          "How do the Five Vows guide Jain life?"
        ]
      },
      {
        icon: <Flower className="h-5 w-5" />,
        title: "🍃 Lifestyle & Practices",
        gradient: "from-green-500 to-teal-500",
        questions: [
          "Jain dietary guidelines",
          "How to practice Jain meditation?",
          "Morning prayers and rituals",
          "Jain fasting practices and benefits"
        ]
      },
      {
        icon: <MessageCircle className="h-5 w-5" />,
        title: "⛩️ Traditions & Sects",
        gradient: "from-blue-500 to-purple-500",
        questions: [
          "Differences between Śvetāmbara and Digambara",
          "Important Jain festivals and celebrations",
          "Sacred Jain pilgrimage sites",
          "Jain art and temple architecture"
        ]
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        title: "📰 Current & Community",
        gradient: "from-pink-500 to-rose-500",
        questions: [
          "Recent Jain festivals and celebrations",
          "Current Jain community initiatives",
          "Modern Jain charitable movements",
          "Contemporary Jain spiritual leaders"
        ]
      }
    ],
    hindi: [
      {
        icon: <CircleDot className="h-5 w-5" />,
        title: "🙏 मुख्य सिद्धांत",
        gradient: "from-orange-500 to-yellow-500",
        questions: [
          "जैन धर्म के मुख्य सिद्धांत क्या हैं?",
          "दैनिक जीवन में अहिंसा का क्या अर्थ है?",
          "अनेकांतवाद क्या है?",
          "पंच व्रत जैन जीवन का मार्गदर्शन कैसे करते हैं?"
        ]
      },
      {
        icon: <Flower className="h-5 w-5" />,
        title: "🍃 दैनिक अभ्यास",
        gradient: "from-green-500 to-teal-500",
        questions: [
          "जैन आहार के नियम क्या हैं?",
          "जैन ध्यान का अभ्यास कैसे करें?",
          "प्रातःकालीन प्रार्थना और अनुष्ठान",
          "जैन उपवास की विधि और लाभ"
        ]
      },
      {
        icon: <MessageCircle className="h-5 w-5" />,
        title: "⛩️ परंपराएं",
        gradient: "from-blue-500 to-purple-500",
        questions: [
          "श्वेतांबर और दिगंबर परंपराओं में क्या अंतर है?",
          "महत्वपूर्ण जैन त्योहार और उत्सव",
          "पवित्र जैन तीर्थ स्थल",
          "जैन कला और मंदिर वास्तुकला"
        ]
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        title: "📰 वर्तमान घटनाएं",
        gradient: "from-pink-500 to-rose-500",
        questions: [
          "हाल के जैन त्योहार और समारोह",
          "वर्तमान जैन समुदाय की पहल",
          "आधुनिक जैन धर्मार्थ आंदोलन",
          "समकालीन जैन आध्यात्मिक नेता"
        ]
      }
    ]
  };

  const currentSuggestions = suggestions[language];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section with Jain Symbols */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <img 
            src="/lovable-uploads/0a5c2291-2771-4e7d-9db3-2f1015d90e33.png" 
            alt="Jain Symbol" 
            className="w-32 h-32 object-contain"
          />
        </div>
        <div className="relative z-10">
          <h2 className={`text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2 ${language === 'hindi' ? 'font-devanagari' : 'font-sans'}`}>
            {language === 'hindi' ? 'लोकप्रिय प्रश्न' : 'Popular Questions'}
          </h2>
          <p className={`text-muted-foreground ${language === 'hindi' ? 'font-devanagari' : 'font-sans'}`}>
            {language === 'hindi' 
              ? 'शुरुआत के लिए इनमें से किसी भी प्रश्न को चुनें'
              : 'Choose any question below to get started'
            }
          </p>
          
          {/* Decorative Jain Symbols */}
          <div className="flex justify-center space-x-8 mt-4 opacity-60">
            <img 
              src="/lovable-uploads/9c5645af-b001-468b-ab6d-25de7e9ac907.png" 
              alt="Jain Flag" 
              className="w-8 h-8 object-contain"
            />
            <img 
              src="/lovable-uploads/612f85ce-a1d8-4d59-8e8a-8683fd0ef287.png" 
              alt="Jain Pathshala" 
              className="w-8 h-8 object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Enhanced Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSuggestions.map((category, categoryIndex) => (
          <Card 
            key={categoryIndex} 
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative p-6">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className={`font-bold text-lg ${language === 'hindi' ? 'font-devanagari' : 'font-sans'}`}>
                  {category.title}
                </h3>
              </div>
              
              {/* Questions */}
              <div className="space-y-3">
                {category.questions.map((question, questionIndex) => (
                  <Button
                    key={questionIndex}
                    variant="ghost"
                    className={`w-full text-left justify-start h-auto p-4 text-sm rounded-xl hover:bg-gradient-to-r hover:${category.gradient} hover:text-white transition-all duration-300 group/btn ${
                      language === 'hindi' ? 'font-devanagari' : 'font-sans'
                    } bg-gray-50/50 dark:bg-gray-700/50 hover:shadow-lg hover:scale-[1.02]`}
                    onClick={() => onQuestionSelect(question)}
                  >
                    <Sparkles className="h-3 w-3 mr-2 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="text-left leading-relaxed">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${category.gradient} opacity-10 rounded-bl-full`} />
          </Card>
        ))}
      </div>

      {/* Bottom Decoration with Jain Symbol */}
      <div className="flex justify-center pt-4">
        <img 
          src="/lovable-uploads/7f153b34-b868-4fd8-aae1-004d115fac9a.png" 
          alt="Jain Meditation" 
          className="w-16 h-16 object-contain opacity-30 rounded-xl"
        />
      </div>
    </div>
  );
};

export default QuickSuggestions;
