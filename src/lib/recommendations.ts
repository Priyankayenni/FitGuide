import type { BMICategory, Language } from '@/types';

export interface RecommendationTip {
  title: string;
  description: string;
}

export interface RecommendationGroup {
  nutrition: RecommendationTip[];
  exercise: RecommendationTip[];
  lifestyle: RecommendationTip[];
}

const recommendations: Record<Language, Record<BMICategory, RecommendationGroup>> = {
  en: {
    underweight: {
      nutrition: [
        { title: 'Caloric Surplus', description: 'Aim for 300–500 extra calories per day from nutrient-dense foods like nuts, avocados, and whole grains.' },
        { title: 'Protein Intake', description: 'Consume 1.6–2.2g of protein per kg of body weight to support healthy muscle growth.' },
        { title: 'Frequent Meals', description: 'Eat 5–6 smaller meals throughout the day to increase total caloric intake comfortably.' },
      ],
      exercise: [
        { title: 'Strength Training', description: 'Focus on compound movements (squats, deadlifts, bench press) 3–4 times per week.' },
        { title: 'Limit Cardio', description: 'Keep cardio to 2 light sessions per week to preserve your caloric surplus.' },
        { title: 'Progressive Overload', description: 'Gradually increase weights by 2–5% each week to stimulate muscle growth.' },
      ],
      lifestyle: [
        { title: 'Sleep 8+ Hours', description: 'Muscle recovery and hormone regulation happen during deep sleep.' },
        { title: 'Track Progress', description: 'Weigh yourself weekly and log entries here to monitor healthy weight gain.' },
        { title: 'Reduce Stress', description: 'High cortisol can suppress appetite — practice mindfulness or deep breathing.' },
      ],
    },
    normal: {
      nutrition: [
        { title: 'Balanced Diet', description: 'Maintain a balanced intake of lean proteins, whole grains, and healthy fats.' },
        { title: 'Hydration', description: 'Drink 2–3 liters of water daily to support metabolism and overall health.' },
        { title: 'Micronutrients', description: 'Ensure adequate intake of vitamins and minerals through varied fruits and vegetables.' },
      ],
      exercise: [
        { title: 'Mixed Training', description: 'Combine strength training and cardiovascular exercise 4–5 times per week.' },
        { title: 'Active Recovery', description: 'Include yoga, stretching, or light walks on rest days to maintain flexibility.' },
        { title: 'Consistency', description: 'Aim for 150 minutes of moderate aerobic activity per week as recommended by WHO.' },
      ],
      lifestyle: [
        { title: 'Sleep 7–9 Hours', description: 'Quality sleep is essential for maintaining your healthy weight and energy.' },
        { title: 'Routine Check-ups', description: 'Schedule annual health screenings to stay ahead of any potential issues.' },
        { title: 'Stay Active', description: 'Take the stairs, walk short distances, and avoid prolonged sitting.' },
      ],
    },
    overweight: {
      nutrition: [
        { title: 'Moderate Deficit', description: 'Aim for a 300–500 calorie daily deficit to lose 0.5kg per week sustainably.' },
        { title: 'High Protein', description: 'Prioritize protein to preserve muscle mass while losing fat — aim for 1.5g/kg.' },
        { title: 'Fiber-Rich Foods', description: 'Load up on vegetables, legumes, and whole grains to feel full longer.' },
      ],
      exercise: [
        { title: 'Daily Cardio', description: 'Start with 30 minutes of brisk walking, cycling, or swimming 5 days per week.' },
        { title: 'Strength Training', description: 'Add resistance training 2–3 times per week to boost metabolism and preserve muscle.' },
        { title: 'NEAT Activities', description: 'Increase non-exercise activity — stand more, take walks, use a standing desk.' },
      ],
      lifestyle: [
        { title: 'Food Journaling', description: 'Track what you eat to build awareness of portions and hidden calories.' },
        { title: 'Sleep Quality', description: 'Poor sleep increases hunger hormones — aim for 7–8 hours consistently.' },
        { title: 'Limit Sugary Drinks', description: 'Replace sodas and juices with water, herbal tea, or black coffee.' },
      ],
    },
    obese: {
      nutrition: [
        { title: 'Structured Deficit', description: 'Work with a professional to create a 500–750 calorie deficit tailored to your needs.' },
        { title: 'Whole Foods Only', description: 'Eliminate processed foods — focus on vegetables, lean proteins, and whole grains.' },
        { title: 'Meal Prep', description: 'Plan and prepare meals in advance to avoid impulsive food choices.' },
      ],
      exercise: [
        { title: 'Low-Impact Cardio', description: 'Start with swimming, water aerobics, or cycling to protect your joints.' },
        { title: 'Gradual Progression', description: 'Begin with 10–15 minute sessions and increase gradually as fitness improves.' },
        { title: 'Professional Guidance', description: 'Consider working with a certified trainer to ensure safe exercise form.' },
      ],
      lifestyle: [
        { title: 'Medical Consultation', description: 'Speak with your doctor about a comprehensive weight management plan.' },
        { title: 'Behavioral Changes', description: 'Identify emotional eating triggers and develop healthier coping strategies.' },
        { title: 'Support System', description: 'Join a support group or involve family members in your health journey.' },
      ],
    },
  },
  te: {
    underweight: {
      nutrition: [
        { title: 'కేలరీ అధిక్యతం', description: 'రోజుకు 300–500 అదనపు కేలరీలు పోషక-సమృద్ధ ఆహారాల నుండి తీసుకోండి.' },
        { title: 'ప్రొటీన్ తీసుకోవడం', description: 'కిలో బరువుకు 1.6–2.2g ప్రొటీన్ తీసుకోండి.' },
        { title: 'తరచు భోజనం', description: 'రోజులో 5–6 చిన్న భోజనాలు తీసుకోండి.' },
      ],
      exercise: [
        { title: 'బల శిక్షణ', description: 'వారానికి 3–4 సార్లు సంయుక్త వ్యాయామాలు చేయండి.' },
        { title: 'కార్డియో పరిమితం', description: 'వారానికి 2 సులభ సెషన్లకు కార్డియో పరిమితించండి.' },
        { title: 'క్రమాభివృద్ధి', description: 'వారానికి 2–5% బరువులు పెంచుకుంటూ వెళ్ళండి.' },
      ],
      lifestyle: [
        { title: '8+ గంటల నిద్ర', description: 'కండరాల పునరుద్ధరణ లోతైన నిద్రలో జరుగుతుంది.' },
        { title: 'పురోగతి ట్రాక్', description: 'వారానికి ఒకసారి బరువు చేయండి.' },
        { title: 'ఒత్తిడి తగ్గించు', description: 'అధిక కార్టిసాల్ ఆకలిని తగ్గిస్తుంది.' },
      ],
    },
    normal: {
      nutrition: [
        { title: 'సమతుల్య ఆహారం', description: 'ప్రొటీన్, ధాన్యాలు, మరియు ఆరోగ్యకరమైన కొవ్వుల సమతుల్య తీసుకోలిని కొనసాగించండి.' },
        { title: 'జలయశయం', description: 'రోజుకు 2–3 లీటర్ల నీరు తాగండి.' },
        { title: 'సూక్ష్మపోషకాలు', description: 'వివిధ పండ్లు మరియు కూరగాయల ద్వారా విటమిన్లను తీసుకోండి.' },
      ],
      exercise: [
        { title: 'మిశ్రిత శిక్షణ', description: 'బల శిక్షణ మరియు కార్డియో వ్యాయామాలను వారానికి 4–5 సార్లు కలపండి.' },
        { title: 'సక్రియ పునరుద్ధరణ', description: 'విశ్రాంతి దినాల్లో యోగా లేదా తేలికపాటి నడకను చేయండి.' },
        { title: 'స్థిరత్వం', description: 'WHO ప్రకారం వారానికి 150 నిమిషాల మితమైన వ్యాయామం చేయండి.' },
      ],
      lifestyle: [
        { title: '7–9 గంటల నిద్ర', description: 'మీ ఆరోగ్యకరమైన బరువును నిర్వహించడానికి నాణ్యమైన నిద్ర అవసరం.' },
        { title: 'క్రమ తనిఖీలు', description: 'ఏడాదికి ఒకసారి ఆరోగ్య పరీక్షలు చేయించుకోండి.' },
        { title: 'చురుకుగా ఉండండి', description: 'మెట్లు ఎక్కండి, తరచుగా నడవండి.' },
      ],
    },
    overweight: {
      nutrition: [
        { title: 'మితమైన లోటు', description: 'రోజుకు 300–500 కేలరీల లోటును లక్ష్యంగా చేసుకోండి.' },
        { title: 'అధిక ప్రొటీన్', description: 'కిలోకు 1.5g ప్రొటీన్ తీసుకోండి.' },
        { title: 'ఫైబర్-రిచ్ ఆహారాలు', description: 'కూరగాయలు, పప్పులు మరియు ధాన్యాలను ఎక్కువగా తీసుకోండి.' },
      ],
      exercise: [
        { title: 'రోజువారీ కార్డియో', description: 'వారానికి 5 రోజులు 30 నిమిషాల వేగవంతమైన నడక ప్రారంభించండి.' },
        { title: 'బల శిక్షణ', description: 'వారానికి 2–3 సార్లు ప్రతిఘటన శిక్షణ చేయండి.' },
        { title: 'NEAT కార్యకలాపాలు', description: 'నిలబడటం, నడవడం ఎక్కువగా చేయండి.' },
      ],
      lifestyle: [
        { title: 'ఆహార జర్నల్', description: 'మీరు తినేది ట్రాక్ చేయండి.' },
        { title: 'నిద్ర నాణ్యత', description: '7–8 గంటల నిద్రకు లక్ష్యంగా చేసుకోండి.' },
        { title: 'చక్కెర పానీయాలు', description: 'నీరు, మూలికా టీ లేదా బ్లాక్ కాఫీతో భర్తీ చేయండి.' },
      ],
    },
    obese: {
      nutrition: [
        { title: 'నిర్మాణాత్మక లోటు', description: '500–750 కేలరీల లోటును సృష్టించడానికి నిపుణుడితో పనిచేయండి.' },
        { title: 'సంపూర్ణ ఆహారాలు', description: 'ప్రాసెస్ చేసిన ఆహారాలను తొలగించండి.' },
        { title: 'భోజన తయారీ', description: 'ముందుగా భోజనం ప్లాన్ చేయండి.' },
      ],
      exercise: [
        { title: 'తక్కువ-ప్రభావ కార్డియో', description: 'ఈత, నీటి వ్యాయామం లేదా సైక్లింగ్ ప్రారంభించండి.' },
        { title: 'క్రమాభివృద్ధి', description: '10–15 నిమిషాల సెషన్లతో ప్రారంభించండి.' },
        { title: 'వృత్తి మార్గదర్శకత్వం', description: 'ధృవీకరించబడిన శిక్షణ నిపుణుడితో పనిచేయండి.' },
      ],
      lifestyle: [
        { title: 'వైద్య సలహా', description: 'మీ డాక్టర్‌తో మాట్లాడండి.' },
        { title: 'ప్రవర్తన మార్పులు', description: 'భావోద్వేగ తినడం ట్రిగ్గర్‌లను గుర్తించండి.' },
        { title: 'మద్దతు వ్యవస్థ', description: 'మద్దతు సమూహంలో చేరండి.' },
      ],
    },
  },
  hi: {
    underweight: {
      nutrition: [
        { title: 'कैलोरी अधिशेष', description: 'प्रतिदिन 300–500 अतिरिक्त कैलोरी पोषक-घन खाद्य पदार्थों से प्राप्त करें।' },
        { title: 'प्रोटीन सेवन', description: 'किलो वजन के अनुसार 1.6–2.2g प्रोटीन लें।' },
        { title: 'बार-बार भोजन', description: 'दिन में 5–6 छोटे भोजन करें।' },
      ],
      exercise: [
        { title: 'शक्ति प्रशिक्षण', description: 'सप्ताह में 3–4 बार यौगिक व्यायाम करें।' },
        { title: 'कार्डियो सीमित करें', description: 'कार्डियो को सप्ताह में 2 हल्के सत्र तक सीमित रखें।' },
        { title: 'क्रमिक अधिभार', description: 'प्रति सप्ताह 2–5% वजन बढ़ाएं।' },
      ],
      lifestyle: [
        { title: '8+ घंटे नींद', description: 'मांसपेशी बचाव गहरी नींद में होता है।' },
        { title: 'प्रगति ट्रैक करें', description: 'साप्ताहिक वजन लें।' },
        { title: 'तनाव कम करें', description: 'उच्च कोर्टिसोल भूख को कम करता है।' },
      ],
    },
    normal: {
      nutrition: [
        { title: 'संतुलित आहार', description: 'प्रोटीन, अनाज और स्वस्थ वसा का संतुलित सेवन बनाए रखें।' },
        { title: 'जलयापन', description: 'रोजाना 2–3 लीटर पानी पिएं।' },
        { title: 'सूक्ष्मपोषक', description: 'विविध फलों और सब्जियों से विटामिन लें।' },
      ],
      exercise: [
        { title: 'मिश्रित प्रशिक्षण', description: 'शक्ति और कार्डियो व्यायाम सप्ताह में 4–5 बार करें।' },
        { title: 'सक्रिय बचाव', description: 'विश्राम दिनों पर योग या हल्की सैर करें।' },
        { title: 'निरंतरता', description: 'WHO अनुसार सप्ताह में 150 मिनट व्यायाम करें।' },
      ],
      lifestyle: [
        { title: '7–9 घंटे नींद', description: 'स्वस्थ वजन के लिए गुणवत्तापूर्ण नींद आवश्यक है।' },
        { title: 'नियमित जांच', description: 'वार्षिक स्वास्थ्य जांच कराएं।' },
        { title: 'सक्रिय रहें', description: 'सीढ़ियां चढ़ें, छोटी दूरी पैदल चलें।' },
      ],
    },
    overweight: {
      nutrition: [
        { title: 'मध्यम घाटा', description: 'प्रतिदिन 300–500 कैलोरी का घाटा लक्ष्य बनाएं।' },
        { title: 'उच्च प्रोटीन', description: 'किलो के अनुसार 1.5g प्रोटीन लें।' },
        { title: 'फाइबर-युक्त खाद्य', description: 'सब्जियां, दालें और अनाज अधिक खाएं।' },
      ],
      exercise: [
        { title: 'दैनिक कार्डियो', description: 'सप्ताह में 5 दिन 30 मिनट तेज चलना शुरू करें।' },
        { title: 'शक्ति प्रशिक्षण', description: 'सप्ताह में 2–3 बार प्रतिरोध प्रशिक्षण करें।' },
        { title: 'NEAT गतिविधियां', description: 'अधिक खड़े रहें, टहलें।' },
      ],
      lifestyle: [
        { title: 'भोजन जर्नल', description: 'अपने भोजन को ट्रैक करें।' },
        { title: 'नींद की गुणवत्ता', description: '7–8 घंटे नींद का लक्ष्य रखें।' },
        { title: 'मीठे पेय सीमित करें', description: 'पानी, हर्बल चाय से बदलें।' },
      ],
    },
    obese: {
      nutrition: [
        { title: 'संरचित घाटा', description: '500–750 कैलोरी घाटा बनाने के लिए पेशेवर के साथ काम करें।' },
        { title: 'संपूर्ण खाद्य', description: 'प्रसंस्कृत खाद्यों को हटाएं।' },
        { title: 'भोजन तैयारी', description: 'भोजन पहले से योजना बनाएं।' },
      ],
      exercise: [
        { title: 'कम-प्रभाव कार्डियो', description: 'तैराकी, जल व्यायाम या साइकिलिंग शुरू करें।' },
        { title: 'क्रमिक प्रगति', description: '10–15 मिनट सत्र से शुरू करें।' },
        { title: 'पेशेवर मार्गदर्शन', description: 'प्रमाणित ट्रेनर के साथ काम करें।' },
      ],
      lifestyle: [
        { title: 'चिकित्सा परामर्श', description: 'अपने डॉक्टर से बात करें।' },
        { title: 'व्यवहार परिवर्तन', description: 'भावनात्मक खाने के ट्रिगर पहचानें।' },
        { title: 'सहायता प्रणाली', description: 'सहायता समूह में शामिल हों।' },
      ],
    },
  },
};

export function getRecommendations(language: Language, category: BMICategory): RecommendationGroup {
  return recommendations[language][category];
}
