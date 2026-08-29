import type { BMIResult, BMICategory, Language } from '@/types';

interface ChatbotResponse {
  keywords: string[];
  responses: Record<Language, string[]>;
}

const chatbotKnowledge: ChatbotResponse[] = [
  {
    keywords: ['bmi', 'calculate', 'body mass', 'index'],
    responses: {
      en: [
        'BMI (Body Mass Index) is calculated by dividing your weight in kilograms by your height in meters squared. A healthy BMI range is 18.5 to 25.0.',
        'You can calculate your BMI using the calculator on this page. Just enter your height and weight, and the gauge will show your result instantly!',
      ],
      te: [
        'BMI (బాడీ మాస్ ఇండెక్స్) అనేది మీ ఎత్తును మీటర్లలో వర్గం చేసి, మీ బరువును కిలోగ్రాములలో భాగిస్తే వస్తుంది. ఆరోగ్యకరమైన BMI 18.5 నుండి 25.0 మధ్య.',
        'ఈ పేజీలోని కాలిక్యులేటర్‌ను ఉపయోగించి మీ BMI లెక్కించవచ్చు. మీ ఎత్తు మరియు బరువు నమోదు చేయండి!',
      ],
      hi: [
        'BMI (बॉडी मास इंडेक्स) आपके वजन को आपकी ऊंचाई के वर्ग (मीटर में) से विभाजित करके गणना किया जाता है। स्वस्थ BMI 18.5 से 25.0 है।',
        'आप इस पेज के कैलकुलेटर का उपयोग करके अपना BMI गणना कर सकते हैं। बस अपनी ऊंचाई और वजन दर्ज करें!',
      ],
    },
  },
  {
    keywords: ['weight', 'lose', 'gain', 'reduce', 'loss', 'heavy', 'light'],
    responses: {
      en: [
        'For healthy weight loss, aim for a moderate caloric deficit of 300-500 calories per day. This helps you lose about 0.5kg per week sustainably.',
        'To gain weight healthily, focus on nutrient-dense foods like nuts, avocados, whole grains, and lean proteins. Aim for a 300-500 calorie surplus.',
        'Remember: sustainable changes happen gradually. Crash diets often lead to rebound weight gain!',
      ],
      te: [
        'ఆరోగ్యకరమైన బరువు తగ్గింపు కోసం, రోజుకు 300-500 కేలరీల లోటును లక్ష్యంగా చేయండి.',
        'బరువు పెంచుకోవడానికి పోషక-సమృద్ధ ఆహారాలపై దృష్టి పెట్టండి.',
      ],
      hi: [
        'स्वस्थ वजन घटाने के लिए, प्रतिदिन 300-500 कैलोरी की कमी का लक्ष्य रखें। यह आपको हफ्ते में लगभग 0.5 किलो कम करने में मदद करेगा।',
        'वजन बढ़ाने के लिए पोषक-घन खाद्य पदार्थों पर ध्यान दें जैसे नट्स, एवोकाडो, अनाज और प्रोटीन।',
      ],
    },
  },
  {
    keywords: ['exercise', 'workout', 'gym', 'fitness', 'training', 'cardio', 'strength'],
    responses: {
      en: [
        'For general fitness, aim for at least 150 minutes of moderate aerobic activity per week, plus strength training 2-3 times per week.',
        'If you\'re just starting, begin with 15-20 minute sessions and gradually increase. Consistency matters more than intensity!',
        'Check out the Video Tutorials section for guided workout routines for all fitness levels.',
      ],
      te: [
        'సాధారణ ఆరోగ్యం కోసం, వారానికి కనీసం 150 నిమిషాల మితమైన వ్యాయామం లక్ష్యంగా చేయండి.',
        'మీరు ఇప్పుడే ప్రారంభిస్తే, 15-20 నిమిషాల సెషన్‌తో ప్రారంభించండి.',
      ],
      hi: [
        'सामान्य फिटनेस के लिए, सप्ताह में कम से कम 150 मिनट का मध्यम व्यायाम लक्ष्य रखें, साथ ही हफ्ते में 2-3 बार शक्ति प्रशिक्षण।',
        'अगर आप अभी शुरू कर रहे हैं, तो 15-20 मिनट के सत्र से शुरू करें और धीरे-धीरे बढ़ाएं।',
      ],
    },
  },
  {
    keywords: ['diet', 'nutrition', 'food', 'eat', 'meal', 'protein', 'calorie'],
    responses: {
      en: [
        'A balanced diet includes lean proteins, whole grains, healthy fats, and plenty of fruits and vegetables. Check out the Meal Planning section for personalized meal ideas!',
        'Protein is essential for muscle repair and growth. Aim for 1.2-2.2g per kg of body weight depending on your activity level.',
        'Stay hydrated! Drink at least 2-3 liters of water daily for optimal metabolism.',
      ],
      te: [
        'సమతుల్య ఆహారంలో ప్రొటీన్, ధాన్యాలు, ఆరోగ్యకరమైన కొవ్వులు మరియు పండ్లు, కూరగాయలు ఉండాలి. భోజన ప్రణాళిక విభాగాన్ని చూడండి!',
        'కండరాల మరమ్మతు కోసం ప్రొటీన్ అవసరం. మీ శరీర బరువుకు గ్రాముకు 1.2-2.2g లక్ష్యంగా చేయండి.',
      ],
      hi: [
        'संतुलित आहार में प्रोटीन, अनाज, स्वस्थ वसा और फल-सब्जियां शामिल हैं। भोजन योजना अनुभाग देखें!',
        'मांसपेशी मरम्मत के लिए प्रोटीन आवश्यक है। अपने शरीर के वजन के अनुसार प्रति किलो 1.2-2.2g लक्ष्य रखें।',
      ],
    },
  },
  {
    keywords: ['sleep', 'rest', 'recovery', 'tired', 'energy'],
    responses: {
      en: [
        'Quality sleep is crucial for health! Aim for 7-9 hours per night. Poor sleep increases hunger hormones and reduces workout recovery.',
        'Active recovery days are important too. Light walking, stretching, or yoga on rest days helps maintain blood flow and flexibility.',
      ],
      te: [
        'నాణ్యమైన నిద్ర ఆరోగ్యానికి అత్యంతం అవసరం! రాత్రికి 7-9 గంటలు లక్ష్యంగా చేయండి.',
        'సక్రియ పునరుద్ధరణ దినాలు కూడా ముఖ్యం. విశ్రాంతి దినాల్లో తేలికపాటి నడక సహాయపడుతుంది.',
      ],
      hi: [
        'गुणवत्तापूर्ण नींद स्वास्थ्य के लिए महत्वपूर्ण है! रात में 7-9 घंटे का लक्ष्य रखें।',
        'सक्रिय बचाव दिन भी महत्वपूर्ण हैं। विश्राम दिनों पर हल्की सैर या योग मदद करता है।',
      ],
    },
  },
  {
    keywords: ['challenge', 'goal', 'motivation', 'habit', 'consistent'],
    responses: {
      en: [
        'Setting small, achievable goals is the key to building lasting habits. Check out the Group Challenges section to join a challenge and stay motivated!',
        'Consistency beats perfection. Even a 10-minute workout is better than skipping entirely. Build the habit first, then increase intensity.',
      ],
      te: [
        'చిన్న, సాధించగలిగే లక్ష్యాలను పెట్టుకోవడం శాశ్వత అలవాట్లకు మంచిది. సమూహ సవాళ్ల విభాగాన్ని చూడండి!',
        'స్థిరత్వం పరిపూర్ణతకంటే మెరుగైనది. 10 నిమిషాల వ్యాయామం కూడా వదిలివేయడం కంటే మంచిది.',
      ],
      hi: [
        'छोटे, प्राप्य लक्ष्य निर्धारित करना आदत बनाने की कुंजी है। समूह चुनौती अनुभाग देखें!',
        'निरंतरता पूर्णता से बेहतर है। 10 मिनट का व्यायाम भी छोड़ने से बेहतर है।',
      ],
    },
  },
  {
    keywords: ['water', 'hydration', 'drink', 'thirsty'],
    responses: {
      en: [
        'Staying hydrated is essential! Aim for 2-3 liters of water daily. Dehydration can cause fatigue, headaches, and reduced workout performance.',
        'Tip: Carry a reusable water bottle and set reminders to drink throughout the day. Your urine should be pale yellow — that\'s a sign of good hydration!',
      ],
      te: [
        'జలయశయం అవసరం! రోజుకు 2-3 లీటర్ల నీరు తాగండి. నిర్జలీకరణ అలసట మరియు తలనొప్పికి కారణమవుతుంది.',
        'చిట్కా: నీళ్ల సీసా తీసుకువెళ్లండి మరియు రోజంతా తాగడానికి గుర్తులు పెట్టుకోండి.',
      ],
      hi: [
        'जलयापन आवश्यक है! प्रतिदिन 2-3 लीटर पानी का लक्ष्य रखें। निर्जलीकरण से थकान और सिरदर्द हो सकता है।',
        'सुझाव: पानी की बोतल साथ रखें और पूरे दिन पानी पीने के लिए अनुस्मारक सेट करें।',
      ],
    },
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start'],
    responses: {
      en: [
        'Hello! I\'m your FitGuide AI assistant. I can help with BMI questions, nutrition advice, exercise tips, and more. What would you like to know?',
        'Hi there! Feel free to ask me about your BMI, workout routines, meal planning, or general health tips!',
      ],
      te: [
        'నమస్కారం! నేను మీ FitGuide AI సహాయకుడిని. BMI ప్రశ్నలు, పోషణ సలహా, వ్యాయామ చిట్కాలతో సహాయం చేయగలను. ఏమి తెలుసుకోవాలి?',
        'నమస్కారం! BMI, వ్యాయామం, భోజన ప్రణాళిక లేదా ఆరోగ్య చిట్కాల గురించి నన్ను అడగండి!',
      ],
      hi: [
        'नमस्ते! मैं आपका FitGuide AI सहायक हूं। BMI प्रश्नों, पोषण सलाह, व्यायाम युक्तियों में मदद कर सकता हूं। क्या जानना चाहेंगे?',
        'नमस्ते! BMI, व्यायाम, भोजन योजना या स्वास्थ्य युक्तियों के बारे में पूछें!',
      ],
    },
  },
];

const fallbackResponses: Record<Language, string[]> = {
  en: [
    'That\'s a great question! I\'d recommend focusing on the fundamentals: balanced nutrition, regular exercise, adequate sleep, and staying hydrated. Is there a specific area you\'d like to dive deeper into?',
    'I\'m here to help with BMI, nutrition, exercise, sleep, and general wellness. Could you ask about one of those topics?',
  ],
  te: [
    'మంచి ప్రశ్న! సమతుల్య పోషణ, క్రమం తప్పకుండా వ్యాయామం, సరైన నిద్ర, మరియు జలయశయంపై దృష్టి పెట్టండి. ఏ అంశంపై లోతుగా తెలుసుకోవాలి?',
    'నేను BMI, పోషణ, వ్యాయామం, నిద్ర మరియు సాధారణ ఆరోగ్యం గురించి సహాయం చేయగలను.',
  ],
  hi: [
    'अच्छा प्रश्न! संतुलित पोषण, नियमित व्यायाम, पर्याप्त नींद और जलयापन पर ध्यान दें। किस विषय पर गहराई से जानना चाहेंगे?',
    'मैं BMI, पोषण, व्यायाम, नींद और सामान्य स्वास्थ्य के बारे में मदद कर सकता हूं।',
  ],
};

export function getChatbotResponse(message: string, language: Language, bmiResult: BMIResult | null): string {
  const lower = message.toLowerCase();

  for (const entry of chatbotKnowledge) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      const responses = entry.responses[language];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  if (bmiResult && (lower.includes('my') || lower.includes('me') || lower.includes('result'))) {
    const categoryLabels: Record<Language, Record<BMICategory, string>> = {
      en: { underweight: 'underweight', normal: 'in the normal range', overweight: 'overweight', obese: 'in the obese range' },
      te: { underweight: 'అండర్ వెయిట్', normal: 'సాధారణ శ్రేణిలో', overweight: 'ఓవర్ వెయిట్', obese: 'ఊబకాయం శ్రేణిలో' },
      hi: { underweight: 'कम वजन', normal: 'सामान्य श्रेणी में', overweight: 'अधिक वजन', obese: 'मोटापा श्रेणी में' },
    };
    const label = categoryLabels[language][bmiResult.category];
    const templates: Record<Language, string[]> = {
      en: [`Your current BMI is ${bmiResult.value.toFixed(1)}, which is ${label}. Check the Recommendations section for personalized tips!`],
      te: [`మీ ప్రస్తుత BMI ${bmiResult.value.toFixed(1)}, ఇది ${label}. వ్యక్తిగత చిట్కాల కోసం సిఫార్సుల విభాగాన్ని చూడండి!`],
      hi: [`आपका वर्तमान BMI ${bmiResult.value.toFixed(1)} है, जो ${label} है। सिफारिश अनुभाग देखें!`],
    };
    return templates[language][0];
  }

  return fallbackResponses[language][Math.floor(Math.random() * fallbackResponses[language].length)];
}

export const chatbotSuggestions: Record<Language, string[]> = {
  en: ['What is BMI?', 'How to lose weight?', 'Best exercises for beginners', 'What should I eat?'],
  te: ['BMI అంటే ఏమిటి?', 'బరువు ఎలా తగ్గించాలి?', 'కొత్తవారికి ఉత్తమ వ్యాయామాలు', '�ేను ఏమి తినాలి?'],
  hi: ['BMI क्या है?', 'वजन कैसे घटाएं?', 'शुरुआती लोगों के लिए व्यायाम', 'मुझे क्या खाना चाहिए?'],
};
