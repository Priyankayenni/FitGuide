import type { Language } from '@/types';

export interface Translation {
  nav: {
    home: string;
    calculator: string;
    trends: string;
    recommendations: string;
    meals: string;
    videos: string;
    challenges: string;
    dashboard: string;
    history: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
  };
  auth: {
    signInTitle: string;
    signUpTitle: string;
    signInSubtitle: string;
    signUpSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    signUp: string;
    noAccount: string;
    haveAccount: string;
    signOut: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    height: string;
    weight: string;
    date: string;
    note: string;
    notePlaceholder: string;
    calculate: string;
    save: string;
    saved: string;
    saving: string;
    yourBmi: string;
    category: string;
    healthyRange: string;
    enterValues: string;
    underweight: string;
    normal: string;
    overweight: string;
    obese: string;
    healthyWeightRange: string;
    signInToSave: string;
  };
  trends: {
    title: string;
    subtitle: string;
    noData: string;
    noDataDesc: string;
    latestBmi: string;
    averageBmi: string;
    trend: string;
    trendUp: string;
    trendDown: string;
    trendStable: string;
    entries: string;
    export: string;
    clearAll: string;
    confirmClear: string;
  };
  recommendations: {
    title: string;
    subtitle: string;
    calculateFirst: string;
    nutrition: string;
    exercise: string;
    lifestyle: string;
    nutritionDesc: string;
    exerciseDesc: string;
    lifestyleDesc: string;
    tipsFor: string;
  };
  meals: {
    title: string;
    subtitle: string;
    calculateFirst: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    ingredients: string;
  };
  videos: {
    title: string;
    subtitle: string;
    all: string;
    comingSoon: string;
  };
  challenges: {
    title: string;
    subtitle: string;
    signInToJoin: string;
    join: string;
    leave: string;
    progress: string;
    logProgress: string;
    completed: string;
    days: string;
    target: string;
  };
  predictions: {
    title: string;
    subtitle: string;
    needData: string;
    needDataDesc: string;
    predictedBmi: string;
    trend: string;
    trendUp: string;
    trendDown: string;
    trendStable: string;
    confidence: string;
    weeksToGoal: string;
    atGoal: string;
    weeklyRate: string;
    insight: string;
    disclaimer: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    signInRequired: string;
    wearable: string;
    wearableDesc: string;
    sync: string;
    steps: string;
    heartRate: string;
    caloriesBurned: string;
    activeMinutes: string;
    sleep: string;
    distance: string;
    emailAlerts: string;
    emailAlertsDesc: string;
    alertSaved: string;
    adminPanel: string;
    adminPanelDesc: string;
    totalEntries: string;
    latestBmi: string;
    averageBmi: string;
    categories: string;
    categoryBreakdown: string;
    adminNote: string;
  };
  chatbot: {
    button: string;
    title: string;
    online: string;
    placeholder: string;
    welcome: string;
  };
  share: {
    title: string;
    subtitle: string;
    copy: string;
    exportPdf: string;
  };
  history: {
    title: string;
    subtitle: string;
    noData: string;
    date: string;
    bmi: string;
    category: string;
    note: string;
    delete: string;
    confirmDelete: string;
  };
  footer: {
    tagline: string;
    rights: string;
    disclaimer: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
  };
}

const en: Translation = {
  nav: {
    home: 'Home',
    calculator: 'Calculator',
    trends: 'Trends',
    recommendations: 'Tips',
    meals: 'Meals',
    videos: 'Videos',
    challenges: 'Challenges',
    dashboard: 'Dashboard',
    history: 'History',
  },
  hero: {
    badge: 'AI-Powered Health Tracking',
    title: 'Know Your Body,',
    titleHighlight: 'Transform Your Health',
    subtitle: 'Track your BMI, visualize trends, get personalized recommendations, plan meals, join challenges, and sync your wearable — all in one place.',
    cta: 'Calculate My BMI',
    secondaryCta: 'Explore Features',
    stat1Label: 'BMI Accuracy',
    stat1Value: '99.9%',
    stat2Label: 'Languages',
    stat2Value: '3',
    stat3Label: 'Health Tips',
    stat3Value: '50+',
  },
  auth: {
    signInTitle: 'Welcome Back',
    signUpTitle: 'Create Account',
    signInSubtitle: 'Sign in to sync your data and join challenges',
    signUpSubtitle: 'Start your health journey today',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signOut: 'Sign Out',
  },
  calculator: {
    title: 'BMI Calculator',
    subtitle: 'Enter your measurements to instantly calculate your Body Mass Index',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    date: 'Date',
    note: 'Note (optional)',
    notePlaceholder: 'e.g., Morning measurement',
    calculate: 'Calculate',
    save: 'Save Entry',
    saved: 'Saved!',
    saving: 'Saving...',
    yourBmi: 'Your BMI',
    category: 'Category',
    healthyRange: 'Healthy BMI Range: 18.5 — 25.0',
    enterValues: 'Enter your height and weight to see your BMI',
    underweight: 'Underweight',
    normal: 'Normal',
    overweight: 'Overweight',
    obese: 'Obese',
    healthyWeightRange: 'Healthy weight range for your height',
    signInToSave: 'Sign in to save entries',
  },
  trends: {
    title: 'Your BMI Trend',
    subtitle: 'Visualize your progress over time',
    noData: 'No entries yet',
    noDataDesc: 'Save your first BMI entry to start tracking your progress.',
    latestBmi: 'Latest BMI',
    averageBmi: 'Average BMI',
    trend: 'Trend',
    trendUp: 'Increasing',
    trendDown: 'Decreasing',
    trendStable: 'Stable',
    entries: 'Entries',
    export: 'Export CSV',
    clearAll: 'Clear All',
    confirmClear: 'Are you sure you want to delete all entries? This cannot be undone.',
  },
  recommendations: {
    title: 'Personalized Recommendations',
    subtitle: 'Tailored advice based on your BMI category',
    calculateFirst: 'Calculate your BMI to get personalized recommendations',
    nutrition: 'Nutrition',
    exercise: 'Exercise',
    lifestyle: 'Lifestyle',
    nutritionDesc: 'Fuel your body right',
    exerciseDesc: 'Move with purpose',
    lifestyleDesc: 'Build lasting habits',
    tipsFor: 'Tips for',
  },
  meals: {
    title: 'Meal Planning',
    subtitle: 'Personalized meal suggestions based on your BMI',
    calculateFirst: 'Calculate your BMI to get personalized meal plans',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    ingredients: 'Ingredients',
  },
  videos: {
    title: 'Video Tutorials',
    subtitle: 'Guided workouts and wellness sessions for every level',
    all: 'All',
    comingSoon: 'Video player coming soon',
  },
  challenges: {
    title: 'Group Challenges',
    subtitle: 'Join health challenges and build lasting habits together',
    signInToJoin: 'Sign in to join challenges and track your progress',
    join: 'Join Challenge',
    leave: 'Leave',
    progress: 'Progress',
    logProgress: 'Log',
    completed: 'Completed',
    days: 'days',
    target: 'target',
  },
  predictions: {
    title: 'ML Predictions',
    subtitle: 'AI-powered BMI forecasting based on your trends',
    needData: 'Not enough data yet',
    needDataDesc: 'Save at least 2 BMI entries to enable ML predictions.',
    predictedBmi: 'Predicted BMI (4 weeks)',
    trend: 'Trend',
    trendUp: 'Rising',
    trendDown: 'Falling',
    trendStable: 'Stable',
    confidence: 'Confidence',
    weeksToGoal: 'Weeks to Goal',
    atGoal: 'At goal',
    weeklyRate: 'Weekly Rate',
    insight: 'AI Insight',
    disclaimer: 'Predictions are based on linear regression of your historical data and are for informational purposes only.',
  },
  dashboard: {
    title: 'Health Dashboard',
    subtitle: 'Wearable sync, email alerts, and your health overview',
    signInRequired: 'Sign in to access your health dashboard',
    wearable: 'Wearable Sync',
    wearableDesc: 'Sync data from your fitness tracker',
    sync: 'Sync',
    steps: 'Steps',
    heartRate: 'Heart Rate',
    caloriesBurned: 'Calories Burned',
    activeMinutes: 'Active Minutes',
    sleep: 'Sleep',
    distance: 'Distance',
    emailAlerts: 'Email Alerts',
    emailAlertsDesc: 'Get weekly BMI summary and goal reminders',
    alertSaved: 'Alert preference saved!',
    adminPanel: 'Health Overview',
    adminPanelDesc: 'Your BMI statistics and category breakdown',
    totalEntries: 'Total Entries',
    latestBmi: 'Latest BMI',
    averageBmi: 'Average BMI',
    categories: 'Categories',
    categoryBreakdown: 'Category Breakdown',
    adminNote: 'This is your personal health dashboard. Data is specific to your account and synced devices.',
  },
  chatbot: {
    button: 'Ask AI',
    title: 'FitGuide Assistant',
    online: 'Online',
    placeholder: 'Ask about BMI, nutrition, exercise...',
    welcome: "Hello! I'm your FitGuide AI assistant. Ask me anything about BMI, nutrition, exercise, or general health tips!",
  },
  share: {
    title: 'Share Your Progress',
    subtitle: 'Share your health journey with friends',
    copy: 'Copy Link',
    exportPdf: 'Export PDF',
  },
  history: {
    title: 'Entry History',
    subtitle: 'All your recorded BMI entries',
    noData: 'No entries recorded yet',
    date: 'Date',
    bmi: 'BMI',
    category: 'Category',
    note: 'Note',
    delete: 'Delete',
    confirmDelete: 'Delete this entry?',
  },
  footer: {
    tagline: 'Your personal health companion — built for a stronger, healthier you.',
    rights: 'All rights reserved.',
    disclaimer: 'Disclaimer: FitGuide provides general health information for educational purposes only. Always consult a healthcare professional before making medical decisions.',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    close: 'Close',
  },
};

const te: Translation = {
  nav: {
    home: 'హోమ్',
    calculator: 'కాలిక్యులేటర్',
    trends: 'ధోరణులు',
    recommendations: 'చిట్కాలు',
    meals: 'భోజనం',
    videos: 'వీడియోలు',
    challenges: 'సవాళ్లు',
    dashboard: 'డాష్‌బోర్డ్',
    history: 'చరిత్ర',
  },
  hero: {
    badge: 'AI-ఆధారిత ఆరోగ్య ట్రాకింగ్',
    title: 'మీ శరీరాన్ని తెలుసుకోండి,',
    titleHighlight: 'మీ ఆరోగ్యాన్ని మార్చండి',
    subtitle: 'మీ BMI ని ట్రాక్ చేయండి, ధోరణులను విజువలైజ్ చేయండి, భోజన ప్రణాళిక, సవాళ్లు మరియు మరిన్ని — అన్నీ ఒకే చోట.',
    cta: 'నా BMI లెక్కించండి',
    secondaryCta: 'ఫీచర్లను చూడండి',
    stat1Label: 'BMI ఖచ్చితత్వం',
    stat1Value: '99.9%',
    stat2Label: 'భాషలు',
    stat2Value: '3',
    stat3Label: 'ఆరోగ్య చిట్కాలు',
    stat3Value: '50+',
  },
  auth: {
    signInTitle: 'తిరిగి స్వాగతం',
    signUpTitle: 'ఖాతా సృష్టించండి',
    signInSubtitle: 'మీ డేటాను సింక్ చేయడానికి సైన్ ఇన్ చేయండి',
    signUpSubtitle: 'మీ ఆరోగ్య ప్రయాణాన్ని ప్రారంభించండి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    noAccount: 'ఖాతా లేదా?',
    haveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    signOut: 'సైన్ అవుట్',
  },
  calculator: {
    title: 'BMI కాలిక్యులేటర్',
    subtitle: 'మీ బాడీ మాస్ ఇండెక్స్ ని తక్షణంగా లెక్కించడానికి మీ కొలమానాలను నమోదు చేయండి',
    height: 'ఎత్తు (సెం.మీ)',
    weight: 'బరువు (కేజీ)',
    date: 'తేదీ',
    note: 'గమనిక (ఐచ్ఛిక)',
    notePlaceholder: 'ఉదా. ఉదయం కొలమానం',
    calculate: 'లెక్కించు',
    save: 'ఎంట్రీ సేవ్ చేయి',
    saved: 'సేవ్ అయింది!',
    saving: 'సేవ్ చేస్తోంది...',
    yourBmi: 'మీ BMI',
    category: 'వర్గం',
    healthyRange: 'ఆరోగ్యకరమైన BMI శ్రేణి: 18.5 — 25.0',
    enterValues: 'మీ BMI చూడటానికి ఎత్తు మరియు బరువు నమోదు చేయండి',
    underweight: 'అండర్ వెయిట్',
    normal: 'సాధారణ',
    overweight: 'ఓవర్ వెయిట్',
    obese: 'ఊబకాయం',
    healthyWeightRange: 'మీ ఎత్తుకు ఆరోగ్యకరమైన బరువు శ్రేణి',
    signInToSave: 'ఎంట్రీలను సేవ్ చేయడానికి సైన్ ఇన్ చేయండి',
  },
  trends: {
    title: 'మీ BMI ధోరణి',
    subtitle: 'కాలక్రమేణా మీ పురోగతిని విజువలైజ్ చేయండి',
    noData: 'ఇంకా ఎంట్రీలు లేవు',
    noDataDesc: 'మీ పురోగతిని ట్రాక్ చేయడం ప్రారంభించడానికి మీ మొదటి BMI ఎంట్రీని సేవ్ చేయండి.',
    latestBmi: 'తాజా BMI',
    averageBmi: 'సగటు BMI',
    trend: 'ధోరణి',
    trendUp: 'పెరుగుతోంది',
    trendDown: 'తగ్గుతోంది',
    trendStable: 'స్థిరంగా',
    entries: 'ఎంట్రీలు',
    export: 'CSV ఎక్స్‌పోర్ట్',
    clearAll: 'అన్నీ తొలగించు',
    confirmClear: 'అన్ని ఎంట్రీలను తొలగించాలా? ఇది రద్దు చేయబడదు.',
  },
  recommendations: {
    title: 'వ్యక్తిగత సిఫార్సులు',
    subtitle: 'మీ BMI వర్గం ఆధారంగా అనుకూలీకరించిన సలహా',
    calculateFirst: 'వ్యక్తిగత సిఫార్సుల కోసం మీ BMI లెక్కించండి',
    nutrition: 'పోషణ',
    exercise: 'వ్యాయామం',
    lifestyle: 'జీవనశైలి',
    nutritionDesc: 'మీ శరీరాన్ని సరైన ఇంధనంతో నింపండి',
    exerciseDesc: 'ఉద్దేశ్యంతో కదలండి',
    lifestyleDesc: 'శాశ్వత అలవాట్లను ఏర్పరచండి',
    tipsFor: 'చిట్కాలు —',
  },
  meals: {
    title: 'భోజన ప్రణాళిక',
    subtitle: 'మీ BMI ఆధారంగా వ్యక్తిగత భోజన సూచనలు',
    calculateFirst: 'వ్యక్తిగత భోజన ప్రణాళిక కోసం మీ BMI లెక్కించండి',
    breakfast: 'అలపాహారం',
    lunch: 'భోజనం',
    dinner: 'రాత్రి భోజనం',
    snack: 'స్నాక్',
    calories: 'కేలరీలు',
    protein: 'ప్రొటీన్',
    carbs: 'కార్బ్స్',
    fat: 'కొవ్వు',
    ingredients: 'పదార్థాలు',
  },
  videos: {
    title: 'వీడియో ట్యుటోరియల్స్',
    subtitle: 'ప్రతి స్థాయికి గైడెడ్ వర్కౌట్స్ మరియు వెల్‌నెస్ సెషన్లు',
    all: 'అన్నీ',
    comingSoon: 'వీడియో ప్లేయర్ త్వరలో',
  },
  challenges: {
    title: 'సమూహ సవాళ్లు',
    subtitle: 'సవాళ్లలో చేరండి మరియు శాశ్వత అలవాట్లను నిర్మించండి',
    signInToJoin: 'సవాళ్లలో చేరడానికి సైన్ ఇన్ చేయండి',
    join: 'సవాల్‌లో చేరండి',
    leave: 'విడిచిపెట్టు',
    progress: 'పురోగతి',
    logProgress: 'నమోదు',
    completed: 'పూర్తయింది',
    days: 'రోజులు',
    target: 'లక్ష్యం',
  },
  predictions: {
    title: 'ML అంచనాలు',
    subtitle: 'మీ ధోరణుల ఆధారంగా AI-ఆధారిత BMI అంచనా',
    needData: 'ఇంకా సరిపడ డేటా లేదు',
    needDataDesc: 'ML అంచనాల కోసం కనీసం 2 BMI ఎంట్రీలను సేవ్ చేయండి.',
    predictedBmi: 'అంచనా BMI (4 వారాలు)',
    trend: 'ధోరణి',
    trendUp: 'పెరుగుతోంది',
    trendDown: 'తగ్గుతోంది',
    trendStable: 'స్థిరం',
    confidence: 'విశ్వాసం',
    weeksToGoal: 'లక్ష్యానికి వారాలు',
    atGoal: 'లక్ష్యం వద్ద',
    weeklyRate: 'వారాంతం రేటు',
    insight: 'AI అంతర్దృష్టి',
    disclaimer: 'అంచనాలు మీ చారిత్రక డేటా యొక్క లీనియర్ రిగ్రెషన్‌పై ఆధారపడి ఉంటాయి.',
  },
  dashboard: {
    title: 'ఆరోగ్య డాష్‌బోర్డ్',
    subtitle: 'వేరబుల్ సింక్, ఇమెయిల్ హెచ్చరికలు, మరియు ఆరోగ్య సారాంశం',
    signInRequired: 'మీ ఆరోగ్య డాష్‌బోర్డ్‌ని యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి',
    wearable: 'వేరబుల్ సింక్',
    wearableDesc: 'మీ ఫిట్‌నెస్ ట్రాకర్ నుండి డేటా సింక్ చేయండి',
    sync: 'సింక్',
    steps: 'అడుగులు',
    heartRate: 'గుండె వేగం',
    caloriesBurned: 'ఖర్చు కేలరీలు',
    activeMinutes: 'సక్రియ నిమిషాలు',
    sleep: 'నిద్ర',
    distance: 'దూరం',
    emailAlerts: 'ఇమెయిల్ హెచ్చరికలు',
    emailAlertsDesc: 'వారాంతం BMI సారాంశం మరియు లక్ష్య రిమైండర్‌లు',
    alertSaved: 'హెచ్చరిక ప్రాధాన్యత సేవ్ అయింది!',
    adminPanel: 'ఆరోగ్య సారాంశం',
    adminPanelDesc: 'మీ BMI గణాంకాలు మరియు వర్గ విభజన',
    totalEntries: 'మొత్తం ఎంట్రీలు',
    latestBmi: 'తాజా BMI',
    averageBmi: 'సగటు BMI',
    categories: 'వర్గాలు',
    categoryBreakdown: 'వర్గ విభజన',
    adminNote: 'ఇది మీ వ్యక్తిగత ఆరోగ్య డాష్‌బోర్డ్. డేటా మీ ఖాతాకు మరియు సింక్ చేసిన పరికరాలకు ప్రత్యేకం.',
  },
  chatbot: {
    button: 'AI అడగండి',
    title: 'FitGuide అసిస్టెంట్',
    online: 'ఆన్‌లైన్',
    placeholder: 'BMI, పోషణ, వ్యాయామం గురించి అడగండి...',
    welcome: 'నమస్కారం! నేను మీ FitGuide AI సహాయకుడిని. BMI, పోషణ, వ్యాయామం లేదా ఆరోగ్య చిట్కాల గురించి ఏదైనా అడగండి!',
  },
  share: {
    title: 'మీ పురోగతిని పంచుకోండి',
    subtitle: 'మీ ఆరోగ్య ప్రయాణాన్ని స్నేహితులతో పంచుకోండి',
    copy: 'లింక్ కాపీ',
    exportPdf: 'PDF ఎక్స్‌పోర్ట్',
  },
  history: {
    title: 'ఎంట్రీ చరిత్ర',
    subtitle: 'మీ అన్ని నమోదు చేసిన BMI ఎంట్రీలు',
    noData: 'ఇంకా ఎంట్రీలు నమోదు చేయబడలేదు',
    date: 'తేదీ',
    bmi: 'BMI',
    category: 'వర్గం',
    note: 'గమనిక',
    delete: 'తొలగించు',
    confirmDelete: 'ఈ ఎంట్రీని తొలగించాలా?',
  },
  footer: {
    tagline: 'మీ వ్యక్తిగత ఆరోగ్య సహచరుడు — బలంగా, ఆరోగ్యవంతంగా ఉండటానికి.',
    rights: 'అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',
    disclaimer: 'హెచ్చరిక: FitGuide విద్యా ప్రయోజనాల కోసం సాధారణ ఆరోగ్య సమాచారాన్ని అందిస్తుంది. వైద్య నిర్ణయాలు తీసుకునే ముందు ఎల్లప్పుడూ ఆరోగ్య నిపుణులను సంప్రదించండి.',
  },
  common: {
    loading: 'లోడ్ అవుతోంది...',
    error: 'ఏదో తప్పు జరిగింది',
    retry: 'మళ్లీ ప్రయత్నించు',
    close: 'మూసివేయి',
  },
};

const hi: Translation = {
  nav: {
    home: 'होम',
    calculator: 'कैलकुलेटर',
    trends: 'रुझान',
    recommendations: 'युक्तियां',
    meals: 'भोजन',
    videos: 'वीडियो',
    challenges: 'चुनौतियां',
    dashboard: 'डैशबोर्ड',
    history: 'इतिहास',
  },
  hero: {
    badge: 'AI-संचालित स्वास्थ्य ट्रैकिंग',
    title: 'अपने शरीर को जानें,',
    titleHighlight: 'अपने स्वास्थ्य को बदलें',
    subtitle: 'अपने BMI को ट्रैक करें, रुझान देखें, भोजन योजना बनाएं, चुनौतियों में शामिल हों और अपने वेयरेबल को सिंक करें — सब एक जगह।',
    cta: 'मेरा BMI गणना करें',
    secondaryCta: 'विशेषताएं देखें',
    stat1Label: 'BMI सटीकता',
    stat1Value: '99.9%',
    stat2Label: 'भाषाएं',
    stat2Value: '3',
    stat3Label: 'स्वास्थ्य युक्तियां',
    stat3Value: '50+',
  },
  auth: {
    signInTitle: 'वापसी पर स्वागत है',
    signUpTitle: 'खाता बनाएं',
    signInSubtitle: 'अपना डेटा सिंक करने और चुनौतियों में शामिल होने के लिए साइन इन करें',
    signUpSubtitle: 'आज ही अपनी स्वास्थ्य यात्रा शुरू करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    signOut: 'साइन आउट',
  },
  calculator: {
    title: 'BMI कैलकुलेटर',
    subtitle: 'अपना बॉडी मास इंडेक्स तुरंत गणना करने के लिए अपनी मापें दर्ज करें',
    height: 'ऊंचाई (सेमी)',
    weight: 'वजन (किग्रा)',
    date: 'तारीख',
    note: 'नोट (वैकल्पिक)',
    notePlaceholder: 'जैसे, सुबह की माप',
    calculate: 'गणना करें',
    save: 'प्रविष्टि सहेजें',
    saved: 'सहेजा गया!',
    saving: 'सहेजा जा रहा है...',
    yourBmi: 'आपका BMI',
    category: 'श्रेणी',
    healthyRange: 'स्वस्थ BMI श्रेणी: 18.5 — 25.0',
    enterValues: 'अपना BMI देखने के लिए ऊंचाई और वजन दर्ज करें',
    underweight: 'कम वजन',
    normal: 'सामान्य',
    overweight: 'अधिक वजन',
    obese: 'मोटापा',
    healthyWeightRange: 'आपकी ऊंचाई के लिए स्वस्थ वजन श्रेणी',
    signInToSave: 'प्रविष्टियां सहेजने के लिए साइन इन करें',
  },
  trends: {
    title: 'आपका BMI रुझान',
    subtitle: 'समय के साथ अपनी प्रगति को विज़ुअलाइज़ करें',
    noData: 'अभी तक कोई प्रविष्टि नहीं',
    noDataDesc: 'अपनी प्रगति को ट्रैक करना शुरू करने के लिए अपनी पहली BMI प्रविष्टि सहेजें।',
    latestBmi: 'नवीनतम BMI',
    averageBmi: 'औसत BMI',
    trend: 'रुझान',
    trendUp: 'बढ़ रहा है',
    trendDown: 'घट रहा है',
    trendStable: 'स्थिर',
    entries: 'प्रविष्टियां',
    export: 'CSV निर्यात',
    clearAll: 'सभी साफ़ करें',
    confirmClear: 'क्या आप सभी प्रविष्टियां हटाना चाहते हैं? इसे पूर्ववत नहीं किया जा सकता।',
  },
  recommendations: {
    title: 'व्यक्तिगत सिफारिशें',
    subtitle: 'आपकी BMI श्रेणी के आधार पर अनुरूपित सलाह',
    calculateFirst: 'व्यक्तिगत सिफारिशें पाने के लिए अपना BMI गणना करें',
    nutrition: 'पोषण',
    exercise: 'व्यायाम',
    lifestyle: 'जीवनशैली',
    nutritionDesc: 'अपने शरीर को सही ईंधन दें',
    exerciseDesc: 'उद्देश्य के साथ आगे बढ़ें',
    lifestyleDesc: 'स्थायी आदतें बनाएं',
    tipsFor: 'युक्तियां —',
  },
  meals: {
    title: 'भोजन योजना',
    subtitle: 'आपके BMI के आधार पर व्यक्तिगत भोजन सुझाव',
    calculateFirst: 'व्यक्तिगत भोजन योजना के लिए अपना BMI गणना करें',
    breakfast: 'नाश्ता',
    lunch: 'दोपहर का भोजन',
    dinner: 'रात का भोजन',
    snack: 'स्नैक',
    calories: 'कैलोरी',
    protein: 'प्रोटीन',
    carbs: 'कार्ब्स',
    fat: 'वसा',
    ingredients: 'सामग्री',
  },
  videos: {
    title: 'वीडियो ट्यूटोरियल',
    subtitle: 'हर स्तर के लिए निर्देशित वर्कआउट और वेलनेस सत्र',
    all: 'सभी',
    comingSoon: 'वीडियो प्लेयर जल्द आ रहा है',
  },
  challenges: {
    title: 'समूह चुनौतियां',
    subtitle: 'चुनौतियों में शामिल हों और एक साथ स्थायी आदतें बनाएं',
    signInToJoin: 'चुनौतियों में शामिल होने के लिए साइन इन करें',
    join: 'चुनौती में शामिल हों',
    leave: 'छोड़ें',
    progress: 'प्रगति',
    logProgress: 'दर्ज करें',
    completed: 'पूर्ण',
    days: 'दिन',
    target: 'लक्ष्य',
  },
  predictions: {
    title: 'ML भविष्यवाणियां',
    subtitle: 'आपके रुझानों के आधार पर AI-संचालित BMI पूर्वानुमान',
    needData: 'अभी तक पर्याप्त डेटा नहीं',
    needDataDesc: 'ML भविष्यवाणियों के लिए कम से कम 2 BMI प्रविष्टियां सहेजें।',
    predictedBmi: 'पूर्वानुमित BMI (4 सप्ताह)',
    trend: 'रुझान',
    trendUp: 'बढ़ रहा',
    trendDown: 'गिर रहा',
    trendStable: 'स्थिर',
    confidence: 'विश्वसनीयता',
    weeksToGoal: 'लक्ष्य तक सप्ताह',
    atGoal: 'लक्ष्य पर',
    weeklyRate: 'साप्ताहिक दर',
    insight: 'AI अंतर्दृष्टि',
    disclaimer: 'भविष्यवाणियां आपके ऐतिहासिक डेटा के रैखिक प्रतिगमन पर आधारित हैं।',
  },
  dashboard: {
    title: 'स्वास्थ्य डैशबोर्ड',
    subtitle: 'वेयरेबल सिंक, ईमेल अलर्ट, और आपका स्वास्थ्य सारांश',
    signInRequired: 'अपने स्वास्थ्य डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    wearable: 'वेयरेबल सिंक',
    wearableDesc: 'अपने फिटनेस ट्रैकर से डेटा सिंक करें',
    sync: 'सिंक',
    steps: 'कदम',
    heartRate: 'हृदय गति',
    caloriesBurned: 'जली कैलोरी',
    activeMinutes: 'सक्रिय मिनट',
    sleep: 'नींद',
    distance: 'दूरी',
    emailAlerts: 'ईमेल अलर्ट',
    emailAlertsDesc: 'साप्ताहिक BMI सारांश और लक्ष्य रिमाइंडर पाएं',
    alertSaved: 'अलर्ट प्राथमिकता सहेजी गई!',
    adminPanel: 'स्वास्थ्य सारांश',
    adminPanelDesc: 'आपके BMI आँकड़े और श्रेणी ब्रेकडाउन',
    totalEntries: 'कुल प्रविष्टियां',
    latestBmi: 'नवीनतम BMI',
    averageBmi: 'औसत BMI',
    categories: 'श्रेणियां',
    categoryBreakdown: 'श्रेणी ब्रेकडाउन',
    adminNote: 'यह आपका व्यक्तिगत स्वास्थ्य डैशबोर्ड है। डेटा आपके खाते और सिंक किए गए उपकरणों के लिए विशिष्ट है।',
  },
  chatbot: {
    button: 'AI पूछें',
    title: 'FitGuide सहायक',
    online: 'ऑनलाइन',
    placeholder: 'BMI, पोषण, व्यायाम के बारे में पूछें...',
    welcome: 'नमस्ते! मैं आपका FitGuide AI सहायक हूं। BMI, पोषण, व्यायाम या स्वास्थ्य युक्तियों के बारे में कुछ भी पूछें!',
  },
  share: {
    title: 'अपनी प्रगति साझा करें',
    subtitle: 'अपनी स्वास्थ्य यात्रा दोस्तों के साथ साझा करें',
    copy: 'लिंक कॉपी',
    exportPdf: 'PDF निर्यात',
  },
  history: {
    title: 'प्रविष्टि इतिहास',
    subtitle: 'आपकी सभी दर्ज BMI प्रविष्टियां',
    noData: 'अभी तक कोई प्रविष्टि दर्ज नहीं है',
    date: 'तारीख',
    bmi: 'BMI',
    category: 'श्रेणी',
    note: 'नोट',
    delete: 'हटाएं',
    confirmDelete: 'यह प्रविष्टि हटाएं?',
  },
  footer: {
    tagline: 'आपका व्यक्तिगत स्वास्थ्य साथी — एक मजबूत, स्वस्थ आप के लिए।',
    rights: 'सर्वाधिकार सुरक्षित।',
    disclaimer: 'अस्वीकरण: FitGuide केवल शैक्षणिक उद्देश्यों के लिए सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सीय निर्णय लेने से पहले हमेशा स्वास्थ्य पेशेवर से परामर्श करें।',
  },
  common: {
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हुआ',
    retry: 'पुनः प्रयास करें',
    close: 'बंद करें',
  },
};

export const translations: Record<Language, Translation> = { en, te, hi };

export const languageNames: Record<Language, string> = {
  en: 'English',
  te: 'తెలుగు',
  hi: 'हिन्दी',
};

export const languageFlags: Record<Language, string> = {
  en: 'EN',
  te: 'TE',
  hi: 'HI',
};
