// aiService.ts
// AI Service for JAIN AI - Uses Supabase Edge Function with Perplexity API only
import { supabase } from "@/integrations/supabase/client";

export interface AIResponse {
  content: string;
  usedWebSearch: boolean;
  sectarian?: {
    svetambara?: string;
    digambara?: string;
    common?: string;
  };
}

// Language detection
export function detectLanguage(text: string): 'english' | 'hindi' {
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hindi' : 'english';
}

// Enhanced Jain knowledge base including fasting methods
const jainKnowledgeBase = {
  english: {
    fasting: {
      content: `**Jain Fasting Methods (Upvas Vidhi) - Complete Guide**

**Types of Jain Fasting:**

**1. Ekadashi Upvas (11th Day Fasting):**
• Complete abstinence from food and water for 24 hours
• Begins at sunset on 10th day, ends after sunrise on 12th day
• Spiritual purification and karma reduction

**2. Paryushan Upvas (Festival Fasting):**
• 8-day fasting period during Paryushan festival
• Various levels: complete fasting, one meal, specific foods only
• Includes spiritual reading and meditation

**3. Ayambil Upvas (Single Meal Fasting):**
• One meal per day without salt, oil, spices, milk, or sweets
• Only boiled rice, dal, vegetables, and fruits allowed
• Duration: 1 day to several days

**4. Nirjala Upvas (Waterless Fasting):**
• Complete abstinence from food and water
• Most challenging form of fasting
• Usually for 1-3 days maximum

**5. Navkarsi (Nine-Hour Fasting):**
• No food or water for 9 hours after sunrise
• Breaking fast with simple, pure food
• Daily practice for spiritual discipline

**Fasting Rules & Guidelines:**

**Preparation:**
• Mental preparation through prayer and meditation
• Clean body and pure thoughts
• Seek blessings from elders and Acharyas

**During Fasting:**
• Recite Navkar Mantra regularly
• Read Jain scriptures and religious texts
• Practice meditation and introspection
• Avoid negative thoughts and actions
• Stay in temple or spiritual environment if possible

**Breaking the Fast:**
• Break with simple, pure food
• First consume water, then light foods
• Offer gratitude to Tirthankaras
• Share food with others (dan-punya)

**Benefits:**
• Spiritual purification and soul cleansing
• Development of self-control and discipline
• Reduction of karmic bondage
• Enhanced spiritual awareness
• Physical detoxification`,
      sectarian: {
        svetambara: "Śvetāmbara tradition allows more flexibility in fasting methods and includes detailed rituals with temple participation.",
        digambara: "Digambara tradition emphasizes stricter fasting rules with precise timing and minimal external aids.",
        common: "Both traditions agree on the spiritual purpose of fasting for soul purification and karma reduction."
      }
    },
    meditation: {
      content: `**Jain Meditation (Dhyana) Practice Guide**

Jain meditation is a fundamental spiritual practice aimed at purifying the soul and achieving liberation (moksha). Here's a comprehensive guide:

**Types of Jain Meditation:**

**1. Dharana Dhyana (Virtuous Meditation):**
• **Pindastha Dhyana:** Meditation on the physical form
  - Focus on Tirthankara images or symbols
  - Concentrate on the 24 Tirthankaras
  - Visualize divine qualities

• **Padastha Dhyana:** Meditation on mantras/sounds
  - Recite "Om Namah Siddhebhyah"
  - Chant Navkar Mantra
  - Practice Panch Paramesthi meditation

**2. Shukla Dhyana (Pure Meditation):**
• Advanced practice for spiritual purification
• Focus on the nature of the soul (atma)
• Contemplate the path to liberation

**Daily Practice Steps:**

**Morning Practice (Prabhat Dhyana):**
1. **Preparation:** Clean environment, face east/north
2. **Posture:** Sit in Padmasana or comfortable position
3. **Breathing:** Begin with deep, rhythmic breathing
4. **Navkar Mantra:** Recite 108 times with focus
5. **Contemplation:** Reflect on Jain principles (Ahimsa, Satya, etc.)
6. **Duration:** Start with 15-20 minutes, gradually increase

**Evening Practice (Sandhya Dhyana):**
1. **Self-reflection:** Review daily actions against Jain ethics
2. **Forgiveness:** Practice Kshama (forgiveness)
3. **Gratitude:** Express gratitude to Tirthankaras
4. **Pure thoughts:** Cultivate compassion for all beings

**Key Meditation Objects:**
• **Arihant:** Perfect souls who have conquered karma
• **Siddha:** Liberated souls
• **Acharya:** Spiritual leaders
• **Upadhyaya:** Teachers of scriptures
• **Sadhu:** Monks and nuns

**Benefits:**
• Mental peace and clarity
• Spiritual purification
• Reduction of karmic bondage
• Development of right knowledge
• Cultivation of non-violence in thoughts`,
      sectarian: {
        svetambara: "Śvetāmbara tradition emphasizes meditation on Tirthankara images and includes visualization of white-clad monks and nuns in practice.",
        digambara: "Digambara tradition focuses more on meditation without external aids, emphasizing inner contemplation and the practice of sky-clad meditation principles.",
        common: "Both traditions agree on the fundamental goal of meditation: purification of consciousness, reduction of karmic bondage, and progress toward liberation (moksha)."
      }
    },
    principles: {
      content: `**The Five Fundamental Principles of Jainism:**

**1. Ahimsa (Non-Violence):**
• Physical: No harm to any living being
• Mental: Avoiding violent thoughts
• Verbal: Speaking without causing hurt
• Environmental: Minimizing ecological impact

**2. Satya (Truthfulness):**
• Absolute truth in speech and thought
• Avoiding exaggeration or deception
• Speaking only when necessary and beneficial
• Truth that doesn't harm others

**3. Asteya (Non-Stealing):**
• Not taking what isn't given
• Using resources mindfully
• Avoiding waste and overconsumption
• Respecting others' property and rights

**4. Brahmacharya (Celibacy/Chastity):**
• For monks/nuns: Complete celibacy
• For householders: Moderation and fidelity
• Control over sensual desires
• Mental purity and spiritual focus

**5. Aparigraha (Non-Attachment):**
• Freedom from material possessions
• Emotional detachment from outcomes
• Simplicity in lifestyle
• Sharing resources with others

**The Three Jewels (Ratnatraya):**
• **Samyak Darshan:** Right Faith/Belief
• **Samyak Gyan:** Right Knowledge
• **Samyak Charitra:** Right Conduct

These principles work together to purify the soul and lead to liberation.`,
      sectarian: {
        common: "All Jain sects agree on these five fundamental principles as the foundation of Jain ethics and spiritual practice."
      }
    },
    diet: {
      content: `**Jain Dietary Guidelines (Ahimsa-Based Nutrition):**

**Prohibited Foods:**
• **Root Vegetables:** Potatoes, onions, garlic, carrots, radishes
  - Reason: Contain many micro-organisms
  - Destroying them causes violence to countless beings

• **Non-Vegetarian:** All meat, fish, eggs
  - Direct violence to animals
  - Against fundamental principle of Ahimsa

**Permitted Vegetables:**
• Above-ground vegetables: Tomatoes, peppers, leafy greens
• Fruits: Apples, mangoes, oranges (without seeds when possible)
• Grains: Rice, wheat, lentils, beans
• Dairy: Milk, yogurt, paneer (from healthy, well-treated cows)

**Time Restrictions:**
• **No eating after sunset:** Prevents harm to night insects
• **Early dinner:** Complete meals before dark
• **Dawn to dusk:** Ideal eating window

**Water Guidelines:**
• **Filtered water only:** Removes micro-organisms
• **Boiled and cooled water:** Purification process
• **Avoid ice:** May contain organisms

**Food Preparation:**
• Clean, hygienic environment
• Minimal processing to preserve life force
• Fresh preparation daily
• Offered to divine before consumption

**Fasting Practices:**
• **Ekadashi:** Fasting on 11th day of lunar cycle
• **Paryushan:** Extended fasting during holy period
• **Ayambil:** Single meal without spices/oil`,
      sectarian: {
        svetambara: "Śvetāmbara communities may have slightly more flexible interpretations regarding certain vegetables and timing.",
        digambara: "Digambara tradition tends to be more strict about root vegetables and maintains very precise timing for meals.",
        common: "Both traditions emphasize the same core principle: minimizing harm to all living beings through dietary choices."
      }
    }
  },
  hindi: {
    fasting: {
      content: `**जैन उपवास की विधि - संपूर्ण गाइड**

**जैन उपवास के प्रकार:**

**1. एकादशी उपवास (11वें दिन का उपवास):**
• 24 घंटे तक भोजन और पानी से पूर्ण परहेज
• 10वें दिन सूर्यास्त से शुरू, 12वें दिन सूर्योदय के बाद समाप्त
• आध्यात्मिक शुद्धि और कर्म निर्जरा

**2. पर्युषण उपवास (त्योहारी उपवास):**
• पर्युषण त्योहार के दौरान 8 दिन का उपवास काल
• विभिन्न स्तर: पूर्ण उपवास, एक समय भोजन, विशिष्ट आहार
• आध्यात्मिक अध्ययन और ध्यान सम्मिलित

**3. आयंबिल उपवास (एक समय भोजन):**
• दिन में एक बार भोजन बिना नमक, तेल, मसाले, दूध या मिठाई के
• केवल उबले चावल, दाल, सब्जी और फल की अनुमति
• अवधि: 1 दिन से कई दिन तक

**4. निर्जला उपवास (जल रहित उपवास):**
• भोजन और पानी दोनों से पूर्ण परहेज
• उपवास का सबसे कठिन रूप
• आमतौर पर अधिकतम 1-3 दिन के लिए

**5. नवकारसी (नौ घंटे का उपवास):**
• सूर्योदय के बाद 9 घंटे तक भोजन-पानी नहीं
• सादे, शुद्ध भोजन से उपवास तोड़ना
• आध्यात्मिक अनुशासन के लिए दैनिक अभ्यास

**उपवास के नियम और दिशानिर्देश:**

**तैयारी:**
• प्रार्थना और ध्यान के माध्यम से मानसिक तैयारी
• स्वच्छ शरीर और शुद्ध विचार
• बुजुर्गों और आचार्यों से आशीर्वाद लें

**उपवास के दौरान:**
• नियमित रूप से नवकार मंत्र का जाप करें
• जैन धर्मग्रंथों और धार्मिक ग्रंथों का अध्ययन
• ध्यान और आत्म-चिंतन का अभ्यास
• नकारात्मक विचारों और कार्यों से बचें
• संभव हो तो मंदिर या आध्यात्मिक वातावरण में रहें

**उपवास तोड़ना:**
• सादे, शुद्ध भोजन से उपवास तोड़ें
• पहले पानी, फिर हल्का भोजन लें
• तीर्थंकरों के प्रति कृतज्ञता व्यक्त करें
• दूसरों के साथ भोजन साझा करें (दान-पुण्य)

**लाभ:**
• आध्यात्मिक शुद्धि और आत्मा की सफाई
• आत्म-नियंत्रण और अनुशासन का विकास
• कर्म बंधन में कमी
• आध्यात्मिक जागरूकता में वृद्धि
• शारीरिक विषहरण`,
      sectarian: {
        svetambara: "श्वेतांबर परंपरा में उपवास की विधियों में अधिक लचीलापन है और मंदिर सहभागिता के साथ विस्तृत अनुष्ठान शामिल हैं।",
        digambara: "दिगंबर परंपरा में सख्त उपवास नियमों पर जोर दिया जाता है जिसमें सटीक समय और न्यूनतम बाहरी सहायता होती है।",
        common: "दोनों परंपराएं आत्मा की शुद्धि और कर्म निर्जरा के लिए उपवास के आध्यात्मिक उद्देश्य पर सहमत हैं।"
      }
    },
    meditation: {
      content: `**जैन ध्यान (ध्यान) अभ्यास गाइड**

जैन ध्यान एक मौलिक आध्यात्मिक अभ्यास है जिसका उद्देश्य आत्मा की शुद्धि और मोक्ष प्राप्ति है। यहाँ एक संपूर्ण गाइड है:

**जैन ध्यान के प्रकार:**

**1. धारणा ध्यान (सद्गुण ध्यान):**
• **पिंडस्थ ध्यान:** भौतिक रूप पर ध्यान
  - तीर्थंकर मूर्तियों या प्रतीकों पर केंद्रित करें
  - 24 तीर्थंकरों पर एकाग्रता
  - दिव्य गुणों का चिंतन

• **पदस्थ ध्यान:** मंत्र/ध्वनि पर ध्यान
  - "ॐ नमः सिद्धेभ्यः" का जाप
  - नवकार मंत्र का उच्चारण
  - पंच परमेष्ठी ध्यान

**2. शुक्ल ध्यान (शुद्ध ध्यान):**
• आध्यात्मिक शुद्धि के लिए उन्नत अभ्यास
• आत्मा की प्रकृति पर केंद्रित
• मोक्ष मार्ग का चिंतन

**दैनिक अभ्यास के चरण:**

**प्रातःकालीन अभ्यास (प्रभात ध्यान):**
1. **तैयारी:** स्वच्छ वातावरण, पूर्व/उत्तर दिशा की ओर मुख
2. **आसन:** पद्मासन या आरामदायक स्थिति
3. **श्वास:** गहरी, लयबद्ध श्वास से शुरुआत
4. **नवकार मंत्र:** 108 बार एकाग्रता से जाप
5. **चिंतन:** जैन सिद्धांतों (अहिंसा, सत्य, आदि) पर विचार
6. **अवधि:** 15-20 मिनट से शुरू करें, धीरे-धीरे बढ़ाएं

**संध्याकालीन अभ्यास (संध्या ध्यान):**
1. **आत्म-चिंतन:** जैन नैतिकता के मुकाबले दैनिक कार्यों की समीक्षा
2. **क्षमा:** क्षमा का अभ्यास
3. **कृतज्ञता:** तीर्थंकरों के प्रति आभार व्यक्त करें
4. **शुद्ध विचार:** सभी प्राणियों के लिए करुणा विकसित करें

**मुख्य ध्यान वस्तुएं:**
• **अरिहंत:** कर्म को जीतने वाली पूर्ण आत्माएं
• **सिद्ध:** मुक्त आत्माएं
• **आचार्य:** आध्यात्मिक नेता
• **उपाध्याय:** शास्त्रों के शिक्षक
• **साधु:** मुनि और आर्यिकाएं

**लाभ:**
• मानसिक शांति और स्पष्टता
• आध्यात्मिक शुद्धि
• कर्म बंधन में कमी
• सम्यक ज्ञान का विकास
• विचारों में अहिंसा की भावना`,
      sectarian: {
        svetambara: "श्वेतांबर परंपरा में तीर्थंकर मूर्तियों पर ध्यान और श्वेत वस्त्रधारी मुनि-आर्यिकाओं के चिंतन पर जोर दिया जाता है।",
        digambara: "दिगंबर परंपरा में बाहरी सहायता के बिना ध्यान पर अधिक जोर दिया जाता है, आंतरिक चिंतन और दिगंबर ध्यान सिद्धांतों पर केंद्रित।",
        common: "दोनों परंपराएं ध्यान के मूलभूत लक्ष्य पर सहमत हैं: चेतना की शुद्धि, कर्म बंधन में कमी, और मोक्ष की दिशा में प्रगति।"
      }
    },
    principles: {
      content: `**जैन धर्म के पांच मूलभूत सिद्धांत:**

**1. अहिंसा (अहिंसा):**
• शारीरिक: किसी भी जीव को हानि न पहुंचाना
• मानसिक: हिंसक विचारों से बचना
• वाचिक: बिना दुख पहुंचाए बोलना
• पर्यावरणीय: पारिस्थितिक प्रभाव को कम करना

**2. सत्य (सत्यता):**
• वाणी और विचार में पूर्ण सत्य
• अतिशयोक्ति या छल से बचना
• केवल आवश्यक और लाभकारी बात करना
• ऐसा सत्य जो दूसरों को हानि न पहुंचाए

**3. अस्तेय (चोरी न करना):**
• जो न दिया गया हो उसे न लेना
• संसाधनों का सावधान उपयोग
• बर्बादी और अधिक उपभोग से बचना
• दूसरों की संपत्ति और अधिकारों का सम्मान

**4. ब्रह्मचर्य (ब्रह्मचर्य/शुचिता):**
• मुनि/आर्यिकाओं के लिए: पूर्ण ब्रह्मचर्य
• गृहस्थों के लिए: संयम और निष्ठा
• इंद्रिय इच्छाओं पर नियंत्रण
• मानसिक पवित्रता और आध्यात्मिक केंद्रण

**5. अपरिग्रह (अनासक्ति):**
• भौतिक संपत्ति से मुक्ति
• परिणामों से भावनात्मक अनासक्ति
• जीवनशैली में सादगी
• दूसरों के साथ संसाधन साझा करना

**रत्नत्रय (तीन रत्न):**
• **सम्यक दर्शन:** सही श्रद्धा/विश्वास
• **सम्यक ज्ञान:** सही ज्ञान
• **सम्यक चरित्र:** सही आचरण

ये सिद्धांत मिलकर आत्मा को शुद्ध करते हैं और मोक्ष की ओर ले जाते हैं।`,
      sectarian: {
        common: "सभी जैन संप्रदाय इन पांच मूलभूत सिद्धांतों को जैन नैतिकता और आध्यात्मिक अभ्यास की आधारशिला मानते हैं।"
      }
    },
    diet: {
      content: `**जैन आहार दिशानिर्देश (अहिंसा-आधारित पोषण):**

**निषिद्ध आहार:**
• **मूल सब्जियां:** आलू, प्याज, लहसुन, गाजर, मूली
  - कारण: इनमें अनेक सूक्ष्म जीव होते हैं
  - इन्हें नष्ट करना अनगिनत प्राणियों की हिंसा है

• **मांसाहार:** सभी मांस, मछली, अंडे
  - जानवरों की प्रत्यक्ष हिंसा
  - अहिंसा के मूल सिद्धांत के विपरीत

**अनुमतित सब्जियां:**
• भूमि के ऊपर की सब्जियां: टमाटर, मिर्च, पत्तेदार साग
• फल: सेब, आम, संतरे (संभव हो तो बीज रहित)
• अनाज: चावल, गेहूं, दाल, बीन्स
• डेयरी: दूध, दही, पनीर (स्वस्थ, अच्छी तरह पाली गई गायों से)

**समय प्रतिबंध:**
• **सूर्यास्त के बाद भोजन नहीं:** रात्रि कीटों की हानि से बचाव
• **जल्दी रात्रि भोजन:** अंधेरे से पहले पूरा भोजन
• **भोर से शाम तक:** आदर्श भोजन समय

**पानी दिशानिर्देश:**
• **केवल फिल्टर किया हुआ पानी:** सूक्ष्म जीवों को हटाता है
• **उबाला और ठंडा किया हुआ पानी:** शुद्धीकरण प्रक्रिया
• **बर्फ से बचें:** इसमें जीव हो सकते हैं

**भोजन तैयारी:**
• स्वच्छ, स्वच्छता पूर्ण वातावरण
• जीवन शक्ति को संरक्षित करने के लिए न्यूनतम प्रसंस्करण
• दैनिक ताजा तैयारी
• सेवन से पहले दिव्य को अर्पित

**उपवास प्रथाएं:**
• **एकादशी:** चांद्र चक्र के 11वें दिन उपवास
• **पर्युषण:** पवित्र अवधि के दौरान विस्तृत उपवास
• **अयंबिल:** मसाले/तेल के बिना एक भोजन`,
      sectarian: {
        svetambara: "श्वेतांबर समुदायों में कुछ सब्जियों और समय को लेकर थोड़ी अधिक लचीली व्याख्याएं हो सकती हैं।",
        digambara: "दिगंबर परंपरा मूल सब्जियों को लेकर अधिक सख्त होती है और भोजन के समय को लेकर बहुत सटीक नियम रखती है।",
        common: "दोनों परंपराएं समान मूल सिद्धांत पर जोर देती हैं: आहार विकल्पों के माध्यम से सभी जीवों को न्यूनतम हानि पहुंचाना।"
      }
    }
  }
};

// Enhanced response matching with fasting knowledge
function getKnowledgeResponse(query: string, language: 'english' | 'hindi'): { content: string; sectarian?: any } | null {
  const lowerQuery = query.toLowerCase();
  const knowledgeBase = jainKnowledgeBase[language];
  
  // Fasting keywords
  if (lowerQuery.includes('fasting') || lowerQuery.includes('upvas') || lowerQuery.includes('उपवास') || 
      lowerQuery.includes('व्रत') || lowerQuery.includes('एकादशी') || lowerQuery.includes('पर्युषण') ||
      lowerQuery.includes('आयंबिल') || lowerQuery.includes('निर्जला')) {
    return knowledgeBase.fasting;
  }
  
  // Meditation keywords
  if (lowerQuery.includes('meditation') || lowerQuery.includes('dhyana') || 
      lowerQuery.includes('ध्यान') || lowerQuery.includes('अभ्यास')) {
    return knowledgeBase.meditation;
  }
  
  // Principles keywords
  if (lowerQuery.includes('principle') || lowerQuery.includes('सिद्धांत') || 
      lowerQuery.includes('ahimsa') || lowerQuery.includes('अहिंसा')) {
    return knowledgeBase.principles;
  }
  
  // Diet keywords
  if (lowerQuery.includes('diet') || lowerQuery.includes('food') || 
      lowerQuery.includes('आहार') || lowerQuery.includes('भोजन')) {
    return knowledgeBase.diet;
  }
  
  return null;
}

// API Key management functions
let storedAPIKey: string | null = null;

export function setAPIKey(key: string): void {
  storedAPIKey = key;
  localStorage.setItem('jain_ai_perplexity_key', key);
}

export function getAPIKey(): string | null {
  if (storedAPIKey) return storedAPIKey;
  
  const stored = localStorage.getItem('jain_ai_perplexity_key');
  if (stored) {
    storedAPIKey = stored;
    return stored;
  }
  
  return null;
}

export function isAPIKeyConfigured(): boolean {
  return !!getAPIKey();
}

// Main AI response function
export async function getAIResponse(
  question: string, 
  selectedLanguage: 'english' | 'hindi',
  setWebSearchStatus?: (searching: boolean) => void
): Promise<AIResponse> {
  
  // 1. Check knowledge base first
  const knowledgeResponse = getKnowledgeResponse(question, selectedLanguage);
  if (knowledgeResponse) {
    return {
      content: knowledgeResponse.content,
      usedWebSearch: false,
      sectarian: knowledgeResponse.sectarian
    };
  }

  // 2. Check if API key is configured
  const apiKey = getAPIKey();
  if (!apiKey) {
    return {
      content: selectedLanguage === 'hindi'
        ? "**API कुंजी आवश्यक है**\n\nकृपया सेटिंग्स में अपनी Perplexity API कुंजी दर्ज करें।"
        : "**API Key Required**\n\nPlease enter your Perplexity API key in settings to continue.",
      usedWebSearch: false
    };
  }

  // 3. Validate API key format
  if (!apiKey.startsWith('pplx-')) {
    return {
      content: selectedLanguage === 'hindi'
        ? "**अमान्य API कुंजी**\n\nPerplexity API कुंजी 'pplx-' से शुरू होनी चाहिए। कृपया सेटिंग्स में सही कुंजी दर्ज करें।"
        : "**Invalid API Key**\n\nPerplexity API key must start with 'pplx-'. Please enter the correct key in settings.",
      usedWebSearch: false
    };
  }
  try {
    if (setWebSearchStatus) setWebSearchStatus(true);

    // 4. Call Supabase edge function with enhanced error handling
    console.log('Calling Supabase edge function...');
    
    const { data, error } = await supabase.functions.invoke('jain-ai-chat', {
      body: { 
        question, 
        language: selectedLanguage,
        apiKey: apiKey
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Supabase function response:', { data, error });
    if (error) {
      console.error('Supabase function error details:', error);
      
      // Handle specific error types
      if (error.message?.includes('Failed to fetch')) {
        throw new Error('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message?.includes('API key')) {
        throw new Error('API key validation failed. Please check your Perplexity API key in settings.');
      } else {
        throw new Error(error.message || 'Failed to connect to AI service');
      }
    }

    if (data?.content) {
      return {
        content: data.content,
        usedWebSearch: data.usedWebSearch || true,
        sectarian: data.sectarian
      };
    }

    // Handle empty response
    if (data?.error) {
      throw new Error(data.error);
    }
    throw new Error("Empty response from AI service");
    
  } catch (err) {
    console.error("AI service failed with error:", err);
    
    // Provide more specific error messages
    let errorMessage = '';
    
    if (err.message?.includes('Network connection failed')) {
      errorMessage = selectedLanguage === 'hindi'
        ? "**नेटवर्क त्रुटि** 🌐\n\nइंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।"
        : "**Network Error** 🌐\n\nPlease check your internet connection and try again.";
    } else if (err.message?.includes('API key')) {
      errorMessage = selectedLanguage === 'hindi'
        ? "**API कुंजी त्रुटि** 🔑\n\nकृपया सेटिंग्स में अपनी Perplexity API कुंजी जांचें।"
        : "**API Key Error** 🔑\n\nPlease check your Perplexity API key in settings.";
    } else {
      errorMessage = selectedLanguage === 'hindi'
        ? `**सेवा त्रुटि** ⚠️\n\nAI सेवा में समस्या: ${err.message}\n\nकृपया कुछ समय बाद पुनः प्रयास करें।`
        : `**Service Error** ⚠️\n\nAI service issue: ${err.message}\n\nPlease try again in a few moments.`;
    }
    
    return {
      content: errorMessage,
      usedWebSearch: false,
      error: true
    };
  } finally {
    if (setWebSearchStatus) setWebSearchStatus(false);
  }
}

export function areAPIKeysConfigured(): boolean {
  return isAPIKeyConfigured();
}