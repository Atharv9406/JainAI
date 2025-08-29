// aiService.ts
// Direct Perplexity AI Service for JAIN AI - No Supabase needed

export interface AIResponse {
  content: string;
  usedWebSearch: boolean;
  sectarian?: {
    svetambara?: string;
    digambara?: string;
    common?: string;
  };
  error?: boolean;
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
• Most challenging form of austerity
• Usually for 1-3 days maximum

**5. Navkarsi (Nine-Hour Fasting):**
• No food or water for 9 hours after sunrise
• Breaking fast with simple, pure food
• Daily practice for spiritual discipline

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

**Benefits:**
• Spiritual purification and soul cleansing
• Development of self-control and discipline
• Reduction of karmic bondage
• Enhanced spiritual awareness
• Physical detoxification`,
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

**लाभ:**
• आध्यात्मिक शुद्धि और आत्मा की सफाई
• आत्म-नियंत्रण और अनुशासन का विकास
• कर्म बंधन में कमी
• आध्यात्मिक जागरूकता में वृद्धि
• शारीरिक विषहरण`,
      sectarian: {
        svetambara: "श्वेतांबर समुदायों में कुछ सब्जियों और समय को लेकर थोड़ी अधिक लचीली व्याख्याएं हो सकती हैं।",
        digambara: "दिगंबर परंपरा मूल सब्जियों को लेकर अधिक सख्त होती है और भोजन के समय को लेकर बहुत सटीक नियम रखती है।",
        common: "दोनों परंपराएं समान मूल सिद्धांत पर जोर देती हैं: आहार विकल्पों के माध्यम से सभी जीवों को न्यूनतम हानि पहुंचाना।"
      }
    },
    meditation: {
      content: `**जैन ध्यान (ध्यान) अभ्यास गाइड**

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

**लाभ:**
• आध्यात्मिक शुद्धि और आत्मा की सफाई
• आत्म-नियंत्रण और अनुशासन का विकास
• कर्म बंधन में कमी
• आध्यात्मिक जागरूकता में वृद्धि
• शारीरिक विषहरण`,
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

// Direct Perplexity API call function
async function callPerplexityAPI(prompt: string, language: 'english' | 'hindi', apiKey: string) {
  console.log('Starting direct Perplexity API call...');
  
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
    console.log('Making direct request to Perplexity API...');
    
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

// Main AI response function - now calls Perplexity directly
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

    // 4. Call Perplexity API directly
    console.log('Calling Perplexity API directly...');
    
    const response = await callPerplexityAPI(question, selectedLanguage, apiKey);
    
    return {
      content: response.content,
      usedWebSearch: response.usedWebSearch,
      sectarian: response.sectarian
    };
    
  } catch (err) {
    console.error("Perplexity API failed with error:", err);
    
    // Provide more specific error messages
    let errorMessage = '';
    
    if (err.message?.includes('Failed to fetch') || err.message?.includes('Network')) {
      errorMessage = selectedLanguage === 'hindi'
        ? "**नेटवर्क त्रुटि** 🌐\n\nइंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।"
        : "**Network Error** 🌐\n\nPlease check your internet connection and try again.";
    } else if (err.message?.includes('API key') || err.message?.includes('401')) {
      errorMessage = selectedLanguage === 'hindi'
        ? "**API कुंजी त्रुटि** 🔑\n\nकृपया सेटिंग्स में अपनी Perplexity API कुंजी जांचें।"
        : "**API Key Error** 🔑\n\nPlease check your Perplexity API key in settings.";
    } else if (err.message?.includes('Rate limit') || err.message?.includes('429')) {
      errorMessage = selectedLanguage === 'hindi'
        ? "**दर सीमा पार** ⏱️\n\nकृपया कुछ समय बाद पुनः प्रयास करें।"
        : "**Rate Limit Exceeded** ⏱️\n\nPlease try again in a few moments.";
    } else {
      errorMessage = selectedLanguage === 'hindi'
        ? `**सेवा त्रुटि** ⚠️\n\nPerplexity AI सेवा में समस्या: ${err.message}\n\nकृपया कुछ समय बाद पुनः प्रयास करें।`
        : `**Service Error** ⚠️\n\nPerplexity AI service issue: ${err.message}\n\nPlease try again in a few moments.`;
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