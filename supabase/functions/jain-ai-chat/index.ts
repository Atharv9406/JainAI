import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

// ===== Enhanced Jain Knowledge Base =====
const jainKnowledgeBase = {
  hindi: {
    'मुनि तीर्थंकर अभिषेक': `**जैन मुनि तीर्थंकरों का अभिषेक क्यों नहीं करते?**

**मुख्य कारण:**

**1. अपरिग्रह सिद्धांत:**
• मुनि सभी भौतिक वस्तुओं का त्याग कर चुके हैं
• अभिषेक सामग्री (दूध, दही, घी) का उपयोग अपरिग्रह के विपरीत
• वे केवल आत्मा की शुद्धि पर केंद्रित रहते हैं

**2. आंतरिक पूजा पर जोर:**
• मुनि मानसिक पूजा और ध्यान करते हैं
• बाहरी अनुष्ठानों से मुक्त रहकर आध्यात्मिक साधना
• तीर्थंकरों के गुणों का चिंतन ही सच्ची पूजा

**3. सादगी और त्याग:**
• मुनि जीवन में किसी भी प्रकार का आडंबर नहीं
• सरल जीवन और उच्च विचार
• भौतिक पूजा सामग्री से दूरी

**4. आत्म-शुद्धि पर केंद्रण:**
• बाहरी शुद्धता से अधिक आंतरिक शुद्धता महत्वपूर्ण
• कर्म निर्जरा के लिए मानसिक तप
• मोक्ष मार्ग में भौतिक अनुष्ठान बाधक

**गृहस्थों के लिए अभिषेक:**
• गृहस्थ जैन अभिषेक कर सकते हैं
• यह उनकी भक्ति और श्रद्धा का प्रतीक
• मुनियों का मार्ग अलग, गृहस्थों का अलग`,
    'moksha saptami': `**मोक्ष सप्तमी - तीर्थंकरों की मुक्ति का दिन**

**कार्तिक कृष्ण सप्तमी** को मनाई जाने वाली यह पवित्र तिथि है।

**महत्व:**
• कई तीर्थंकरों को इस दिन मोक्ष प्राप्त हुआ
• आत्मा की मुक्ति का प्रतीक दिन
• कर्म बंधन से छुटकारे का स्मरण

**मनाने की विधि:**
• प्रातःकाल स्नान और शुद्ध वस्त्र धारण
• तीर्थंकर मंदिर में दर्शन और पूजा
• मोक्ष प्राप्त तीर्थंकरों का स्मरण
• दान और पुण्य कार्य

**आध्यात्मिक लाभ:**
• मोक्ष मार्ग की प्रेरणा
• कर्म शुद्धि का अवसर
• आत्म-चिंतन और सुधार`,
    'upvas': `**जैन उपवास - आत्मा की शुद्धि का मार्ग**

**उपवास के प्रकार:**

**1. निराहार उपवास:**
• पूरे दिन भोजन नहीं, केवल पानी
• सूर्योदय से अगले दिन सूर्योदय तक

**2. निर्जल उपवास:**
• भोजन और पानी दोनों का त्याग
• अत्यधिक कठिन तप

**3. आयंबिल:**
• दिन में एक बार सादा भोजन
• नमक, तेल, मसाले, दूध रहित

**4. एकासन:**
• दिन में केवल एक बार बैठकर भोजन
• बीच में कुछ नहीं खाना

**लाभ:**
• कर्म निर्जरा और आत्म-शुद्धि
• इंद्रिय नियंत्रण का विकास
• आध्यात्मिक शक्ति में वृद्धि`
  },
  english: {
    'monks abhishek tirthankar': `**Why Don't Jain Monks Perform Abhishek of Tirthankaras?**

**Main Reasons:**

**1. Aparigraha Principle:**
• Monks have renounced all material possessions
• Using abhishek materials (milk, curd, ghee) contradicts non-attachment
• They focus solely on spiritual purification

**2. Emphasis on Internal Worship:**
• Monks practice mental worship and meditation
• Freedom from external rituals for spiritual practice
• Contemplation of Tirthankara qualities is true worship

**3. Simplicity and Renunciation:**
• No ostentation in monastic life
• Simple living and high thinking
• Distance from material worship items

**4. Focus on Self-Purification:**
• Internal purity more important than external cleanliness
• Mental austerity for karmic purification
• Material rituals can be obstacles on path to liberation

**For Householders:**
• Lay Jains can perform abhishek
• It represents their devotion and faith
• Different paths for monks and householders`,
    'fasting': `**Jain Fasting - Path to Soul Purification**

**Types of Fasting:**

**1. Niraahar (Food Fasting):**
• No food all day, only water allowed
• From sunrise to next sunrise

**2. Nirjal (Waterless Fasting):**
• Complete abstinence from food and water
• Most challenging form of austerity

**3. Ayambil:**
• One simple meal per day
• Without salt, oil, spices, or milk

**4. Ekasan:**
• Eating only once while sitting
• No food between meals

**Benefits:**
• Karmic purification and soul cleansing
• Development of sense control
• Enhancement of spiritual strength`
  }
};

// ===== Helper Functions =====
function getJainKnowledgeResponse(query: string, language: 'english' | 'hindi'): string | null {
  const lowerQuery = query.toLowerCase();
  const knowledge = jainKnowledgeBase[language];

  // Enhanced keyword matching
  for (const [key, response] of Object.entries(knowledge)) {
    const keywords = key.toLowerCase().split(' ');
    const matchCount = keywords.filter(keyword => lowerQuery.includes(keyword)).length;
    
    // If more than half the keywords match, return this response
    if (matchCount > keywords.length / 2) {
      return response;
    }
  }

  // Specific pattern matching for fasting
  if (lowerQuery.includes('fasting') || lowerQuery.includes('upvas') || lowerQuery.includes('उपवास') || 
      lowerQuery.includes('व्रत') || lowerQuery.includes('एकादशी') || lowerQuery.includes('पर्युषण') ||
      lowerQuery.includes('आयंबिल') || lowerQuery.includes('निर्जला')) {
    return knowledge['upvas'] || knowledge['fasting'];
  }

  return null;
}

function detectLanguage(text: string): 'english' | 'hindi' {
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hindi' : 'english';
}

// ===== Enhanced Perplexity API Call with Better Error Handling =====
async function callPerplexityAPI(prompt: string, language: 'english' | 'hindi', apiKey: string) {
  console.log('Starting Perplexity API call...');
  
  // Validate API key format
  if (!apiKey || !apiKey.startsWith('pplx-')) {
    throw new Error('Invalid API key format. Perplexity keys must start with "pplx-"');
  }

  const systemPrompt = language === 'hindi'
    ? `आप जैन एआई हैं, जैन धर्म के विशेषज्ञ। आपको केवल हिंदी में उत्तर देना है। जैन धर्म, दर्शन, उपवास विधि, और परंपराओं के बारे में सटीक और संतुलित जानकारी प्रदान करें। श्वेतांबर और दिगंबर दोनों परंपराओं का सम्मान करें। उत्तर में मार्कडाउन फॉर्मेटिंग का उपयोग करें।`
    : `You are JAIN AI, an expert in Jain religion and philosophy. Provide accurate, balanced information about Jainism, including perspectives from both Śvetāmbara and Digambara traditions. Focus on authentic Jain teachings, practices, and principles. Always respond in English with markdown formatting.`;

  const enhancedPrompt = language === 'hindi'
    ? `जैन धर्म के संदर्भ में इस प्रश्न का उत्तर दें: ${prompt}\n\nकृपया श्वेतांबर और दिगंबर दोनों परंपराओं के दृष्टिकोण शामिल करें यदि प्रासंगिक हो।`
    : `Answer this question in the context of Jain religion: ${prompt}\n\nPlease include perspectives from both Śvetāmbara and Digambara traditions if relevant.`;

  try {
    console.log('Making request to Perplexity API...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "JainAI/1.0"
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-large-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: enhancedPrompt }
        ],
        temperature: 0.2,
        max_tokens: 2000,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('Perplexity API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API Error Response:', errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Perplexity API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status >= 500) {
        throw new Error('Perplexity service is temporarily unavailable. Please try again later.');
      } else {
        throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Perplexity API response received successfully');
    
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from Perplexity API");
    }

    return {
      content: content,
      usedWebSearch: true
    };

  } catch (error) {
    console.error('Perplexity API call failed:', error);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    
    throw error;
  }
}

// ===== Main Supabase Edge Function =====
serve(async (req) => {
  console.log('Edge function called with method:', req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bodyText = await req.text();
    console.log('Request body received, length:', bodyText.length);
    
    if (!bodyText) {
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { question, language: requestedLang, apiKey } = parsed;
    console.log('Parsed request - Question length:', question?.length, 'Language:', requestedLang);
    
    if (!question) {
      return new Response(JSON.stringify({ error: "Question is required" }), {
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is required" }), {
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const language = requestedLang || detectLanguage(question);
    console.log('Detected/Selected language:', language);

    // Try Knowledge Base first
    const kbResponse = getJainKnowledgeResponse(question, language);
    if (kbResponse) {
      console.log('Returning knowledge base response');
      return new Response(JSON.stringify({ 
        content: kbResponse, 
        usedWebSearch: false 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Fallback to Perplexity AI with enhanced error handling
    console.log('Calling Perplexity API for question:', question.substring(0, 50) + '...');
    
    try {
      const aiResponse = await callPerplexityAPI(question, language, apiKey);
      console.log('Perplexity API call successful');
      
      return new Response(JSON.stringify(aiResponse), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } catch (perplexityError) {
      console.error('Perplexity API Error:', perplexityError);
      
      // Return a helpful fallback response
      const fallbackContent = language === 'hindi'
        ? `**क्षमा करें** 🙏\n\nमुझे इस समय Perplexity AI से जुड़ने में समस्या हो रही है।\n\n**संभावित समाधान:**\n• अपनी API कुंजी जांचें\n• कुछ समय बाद पुनः प्रयास करें\n• सुनिश्चित करें कि आपकी API कुंजी सक्रिय है\n\n**त्रुटि:** ${perplexityError.message}`
        : `**Sorry** 🙏\n\nI'm having trouble connecting to Perplexity AI right now.\n\n**Possible solutions:**\n• Check your API key\n• Try again in a few moments\n• Ensure your API key is active\n\n**Error:** ${perplexityError.message}`;

      return new Response(JSON.stringify({
        content: fallbackContent,
        usedWebSearch: false,
        error: true
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

  } catch (err) {
    console.error('Edge Function Error:', err);
    return new Response(JSON.stringify({
      error: err.message || "Unknown error occurred",
      details: err.toString()
    }), { 
      status: 500, 
      headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
});