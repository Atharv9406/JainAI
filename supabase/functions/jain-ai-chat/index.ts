// index.ts — Jain AI Chat with Perplexity & Knowledge Base
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

// ===== Jain Knowledge Base =====
const jainKnowledgeBase = {
  hindi: {
    'मुनि तीर्थंकर अभिषेक': `**जैन मुनि तीर्थंकरों का अभिषेक क्यों नहीं करते?**

जैन मुनि तीर्थंकरों की मूर्तियों का अभिषेक (स्नान या जलाभिषेक) नहीं करते हैं...`,
    'moksha saptami': 'मोक्ष सप्तमी कार्तिक कृष्ण सप्तमी को मनाई जाती है...',
    'suhag dhsami': 'सुहाग दशमी आश्विन शुक्ल दशमी को मनाई जाती है...',
    'ashtami': 'अष्टमी जैन धर्म में विशेष तप का दिन है...',
    'chaudash': 'चौदश (चतुर्दशी) को पर्व दिवस माना जाता है...',
    'upvas': 'जैन उपवास में निराहार, निर्जल और आयंबिल जैसे प्रकार हैं...'
  },
  english: {
    'monks abhishek tirthankar': `**Why Don't Jain Monks Perform Abhishek of Tirthankaras?**

Jain monks (munis) do not perform abhishek (ritual bathing/consecration)...`,
    'moksha saptami': 'Moksha Saptami is observed on Kartik Krishna Saptami...',
    'dates': 'Jain festival dates vary each year based on the lunar calendar...',
    'ashtami': 'Ashtami (8th day) is considered auspicious for fasting...',
    'chaudash': 'Chaudash (14th day) is considered a festival day in Jainism...',
    'fasting': 'Jain fasting includes Nirjala, Ayambil, and complete fasting...'
  }
};

// ===== Helper Functions =====
function getJainKnowledgeResponse(query: string, language: 'english' | 'hindi'): string | null {
  const lowerQuery = query.toLowerCase();
  const knowledge = jainKnowledgeBase[language];

  if ((lowerQuery.includes('मुनि') && (lowerQuery.includes('तीर्थंकर') || lowerQuery.includes('अभिषेक'))) ||
      (lowerQuery.includes('monk') && (lowerQuery.includes('abhishek') || lowerQuery.includes('tirthankar')))) {
    return knowledge['मुनि तीर्थंकर अभिषेक'] || knowledge['monks abhishek tirthankar'];
  }

  for (const [key, response] of Object.entries(knowledge)) {
    if (lowerQuery.includes(key.toLowerCase()) ||
        lowerQuery.includes(key.replace(' ', '')) ||
        (key === 'moksha saptami' && lowerQuery.includes('moksha') && lowerQuery.includes('saptami')) ||
        (key === 'suhag dhsami' && (lowerQuery.includes('suhag') || lowerQuery.includes('suhaag')))) {
      return response;
    }
  }
  return null;
}

function detectLanguage(text: string): 'english' | 'hindi' {
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hindi' : 'english';
}

// ===== Perplexity API Call =====
async function callPerplexityAPI(prompt: string, language: 'english' | 'hindi') {
  const perplexityKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!perplexityKey) throw new Error("Perplexity API key not set in Supabase secrets");

  const systemPrompt = language === 'hindi'
    ? `आप जैन एआई हैं। आपको केवल हिंदी में उत्तर देना है।`
    : `You are JAIN AI, an expert in Jain religion and philosophy.`;

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${perplexityKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar-pro-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!res.ok) throw new Error(`Perplexity API error: ${await res.text()}`);

  const data = await res.json();
  return {
    content: data.choices?.[0]?.message?.content || "No answer available",
    usedWebSearch: true
  };
}

// ===== Main Supabase Edge Function =====
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { question, language: requestedLang } = parsed;
    if (!question) {
      return new Response(JSON.stringify({ error: "Question is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const language = requestedLang || detectLanguage(question);

    // Try Knowledge Base first
    const kbResponse = getJainKnowledgeResponse(question, language);
    if (kbResponse) {
      return new Response(JSON.stringify({ content: kbResponse, usedWebSearch: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Fallback to Perplexity AI
    const aiResponse = await callPerplexityAPI(question, language);
    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: err.message || "Unknown error"
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
