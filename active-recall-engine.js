/**
 * Active Recall & Learning Hub — Infinite Knowledge Engine
 * 
 * Features:
 * 1. Deep Curated Card Banks crawled directly from Calicut University LMS original PDFs & SLMs.
 * 2. Dynamic Real-time LMS Crawler: Ingests window.*LearningData (Sociology, History, Economics, AI, Education, Ethics, English, Math).
 * 3. Infinite Active Recall Synthesizer (100,000+ Cards Capacity per part):
 *    - Direct Concept Recall
 *    - Reverse Definition Discovery
 *    - Exam Question & Solution Drill
 *    - Takeaways & Core Principles
 *    - Grammar Rule Application & Sentence Variations
 * 4. Card numbers completely hidden as requested.
 * 5. Deterministic bidirectional navigation with seamless session caching.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SUBJECTS & LANGUAGES MASTER CURATED BASE CARDS
  // =========================================================================
  const SUBJECT_BASE_CARDS = [
    // --- SOCIOLOGY ---
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Socialisation: Definition & Agents',
      titleSec: 'സാമൂഹികവൽക്കരണം (നിർവ്വചനവും ഘടകങ്ങളും)',
      lang: 'ml',
      hint: 'What is the core sociological definition & key agents according to the syllabus?',
      backEn: 'The lifelong process through which an individual learns culture, values, and norms to become a functioning member of society. Primary: Family; Secondary: School, Peer Groups, and Media.',
      backSec: 'വ്യക്തി സമൂഹത്തിന്റെ സംസ്കാരവും മൂല്യങ്ങളും പെരുമാറ്റച്ചട്ടങ്ങളും പഠിച്ചെടുത്ത് ഒരു സാമൂഹിക ജീവിയായി മാറുന്ന പ്രക്രിയ. പ്രാഥമിക ഘടകം: കുടുംബം; ദ്വിതീയ ഘടകങ്ങൾ: സ്കൂൾ, കൂട്ടുകാർ, മാധ്യമങ്ങൾ.'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Social Stratification & Four Universal Systems',
      titleSec: 'സാമൂഹിക ശ്രേണീകരണം (4 പ്രധാന രൂപങ്ങൾ)',
      lang: 'ml',
      hint: 'What are the four universal systems of structured inequality in sociology?',
      backEn: 'The structured hierarchical ranking of individuals and groups based on wealth, power, and prestige. Four historical systems: Slavery, Estate, Caste (closed system), and Class (open system).',
      backSec: 'സമ്പത്ത്, അധികാരം, പദവി എന്നിവയുടെ അടിസ്ഥാനത്തിൽ സമൂഹത്തെ വിവിധ തട്ടുകളായി തരംതിരിക്കുന്ന സംവിധാനം. പ്രധാന രൂപങ്ങൾ: അടിമത്തം, എസ്റ്റേറ്റ്, ജാതി (അടഞ്ഞത്), വർഗ്ഗം (തുറന്നത്).'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Historical Materialism & Class Struggle (Karl Marx)',
      titleSec: 'ചരിത്രപരമായ ഭൗതികവാദം & വർഗ്ഗസമരം (മാർക്സ്)',
      lang: 'ml',
      hint: 'How did Karl Marx explain social evolution through economic base and superstructure?',
      backEn: 'Marx posited that the economic mode of production (Base) determines the legal, political, and cultural institutions (Superstructure). All human history is the history of class struggle.',
      backSec: 'സാമ്പത്തിക അടിത്തറയാണ് (Base) നിയമം, മതം, രാഷ്ട്രീയം (Superstructure) എന്നിവയെ നിർണ്ണയിക്കുന്നതെന്നും വർഗ്ഗസമരമാണ് മനുഷ്യചരിത്രത്തിന്റെ ചാലകശക്തിയെന്നും കാൾ മാർക്സ് സിദ്ധാന്തിച്ചു.'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Sociological Imagination (C. Wright Mills)',
      titleSec: 'സോഷ്യോളജിക്കൽ ഇമാജിനേഷൻ (സി. റൈറ്റ് മിൽസ്)',
      lang: 'ml',
      hint: 'How does C. Wright Mills distinguish between personal troubles and public issues?',
      backEn: 'The vivid awareness of the relationship between personal experience and wider society. It enables individuals to distinguish between private personal troubles and public structural issues.',
      backSec: 'വ്യക്തിഗത അനുഭവങ്ങളും വിശാലമായ സാമൂഹിക പ്രക്രിയകളും തമ്മിലുള്ള ബന്ധം തിരിച്ചറിയാനുള്ള കഴിവ്. വ്യക്തിപരമായ പ്രശ്നങ്ങളും പൊതുവായ ഘടനാപരമായ പ്രശ്നങ്ങളും തമ്മിലുള്ള വ്യത്യാസം ഇത് വ്യക്തമാക്കുന്നു.'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Theory of Social Action & Ideal Types (Max Weber)',
      titleSec: 'സാമൂഹിക പ്രവർത്തനം & ഐഡിയൽ ടൈപ്പ്സ് (മാക്സ് വെബർ)',
      lang: 'ml',
      hint: 'What is Verstehen and what are the four types of social action?',
      backEn: 'Weber defined sociology as the interpretive understanding (Verstehen) of social action. Four types: Instrumental-rational (Zweckrational), Value-rational (Wertrational), Affective, and Traditional.',
      backSec: 'മനുഷ്യപ്രവർത്തനങ്ങൾക്ക് പിന്നിലെ ആന്തരിക അർത്ഥം മനസ്സിലാക്കലാണ് (Verstehen) സോഷ്യോളജി. 4 തരങ്ങൾ: ലക്ഷ്യബോധമുള്ള യുക്തിസഹ പ്രവർത്തനം, മൂല്യാധിഷ്ഠിത പ്രവർത്തനം, വികാരാധിഷ്ഠിത പ്രവർത്തനം, പരമ്പരാഗത പ്രവർത്തനം.'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Social Facts & Mechanical vs. Organic Solidarity (Émile Durkheim)',
      titleSec: 'സാമൂഹിക യാഥാർത്ഥ്യങ്ങൾ & ഐക്യദാർഢ്യം (എമിൽ ദുർഖൈം)',
      lang: 'ml',
      hint: 'How does mechanical solidarity differ from organic solidarity in division of labour?',
      backEn: 'Mechanical solidarity is based on likeness and strong collective conscience in traditional societies; Organic solidarity arises from specialized division of labour and interdependence in modern societies.',
      backSec: 'പരമ്പരാഗത സമൂഹങ്ങളിലെ സമാനതകളിൽ അധിഷ്ഠിതമായ ഐക്യം മെക്കാനിക്കൽ സോളിഡാരിറ്റിയാണ്; ആധുനിക സമൂഹങ്ങളിലെ തൊഴിൽ വിഭജനത്തിലും പരസ്പരാശ്രയത്വത്തിലും അധിഷ്ഠിതമായ ഐക്യം ഓർഗാനിക് സോളിഡാരിറ്റിയാണ്.'
    },
    {
      category: 'sociology',
      subject: 'Sociology',
      titleEn: 'Primary Groups vs. Secondary Groups (C.H. Cooley)',
      titleSec: 'പ്രൈമറി ഗ്രൂപ്പുകൾ & സെക്കൻഡറി ഗ്രൂപ്പുകൾ (കൂലി)',
      lang: 'ml',
      hint: 'What defines a primary group compared to a secondary formal association?',
      backEn: 'Primary groups (family, playmates) are small, intimate, characterized by face-to-face cooperation and emotional ties. Secondary groups (unions, corporations) are large, formal, and goal-oriented.',
      backSec: 'പ്രൈമറി ഗ്രൂപ്പ് (കുടുംബം, ഉറ്റസുഹൃത്തുക്കൾ): മുഖാമുഖ ബന്ധം, വൈകാരിക ഐക്യം, ചെറിയ കൂട്ടായ്മ. സെക്കൻഡറി ഗ്രൂപ്പ് (ഓഫീസ്, ട്രേഡ് യൂണിയൻ): ലക്ഷ്യാധിഷ്ഠിതം, ഔപചാരികം, നിയമങ്ങളാൽ നിയന്ത്രിതം.'
    },

    // --- HISTORY OF KERALAM ---
    {
      category: 'history',
      subject: 'History of Keralam',
      titleEn: 'Three Physical Divisions of Keralam & Palakkad Gap',
      titleSec: 'കേരളത്തിന്റെ മൂന്ന് ഭൂവിഭാഗങ്ങളും പാലക്കാട് ചുരവും',
      lang: 'ml',
      hint: 'How did geographical divisions and the Palakkad Gap shape Kerala’s history?',
      backEn: 'Kerala is divided into Highlands (Malanad, >75m), Midlands (Idanad, 7.5m–75m), and Lowlands (Theerarambham, <7.5m). The 30-km Palakkad Gap acted as the historical corridor connecting Kerala with inland Tamil plains.',
      backSec: 'കേരളത്തെ മലനാട് (75 മീറ്ററിന് മുകളിൽ), ഇടനാട് (7.5-75 മീറ്റർ), തീരപ്രദേശം (7.5 മീറ്ററിൽ താഴെ) എന്നിങ്ങനെ തിരിച്ചിരിക്കുന്നു. പശ്ചിമഘട്ടത്തിലെ 30 കി.മീ. വിസ്താരമുള്ള പാലക്കാട് ചുരം തമിഴ്നാടുമായുള്ള ചരിത്രപരമായ വാണിജ്യപാതയായിരുന്നു.'
    },
    {
      category: 'history',
      subject: 'History of Keralam',
      titleEn: 'Megalithic Burial Monuments (Iron Age Keralam)',
      titleSec: 'മഹാശില സ്മാരകങ്ങൾ (ഇരുമ്പ് യുഗ കേരളം)',
      lang: 'ml',
      hint: 'What are Kudakkallu, Thoppikkallu, and Dolmens?',
      backEn: 'Iron Age burial practices: Kudakkallu (umbrella stone), Thoppikkallu (cap/hat stone), Muniyaras (dolmens), and Nannangadi (burial urns). Prominent sites include Marayur, Porkkalam, Chermanangad, and Wayanad.',
      backSec: 'ഇരുമ്പ് യുഗ ശ്മശാന സംസ്കാരം: കുടക്കല്ല്, തൊപ്പിക്കല്ല്, മുനിയറകൾ, നന്നങ്ങാടികൾ. പ്രധാന ചരിത്ര കേന്ദ്രങ്ങൾ: മറയൂർ, പോർക്കളം, ചെർമനങ്ങാട്, വയനാട്.'
    },
    {
      category: 'history',
      subject: 'History of Keralam',
      titleEn: 'Edakkal Caves & Prehistoric Rock Art',
      titleSec: 'എടക്കൽ ഗുഹകളും ചരിത്രാതീത ശിലാചിത്രങ്ങളും',
      lang: 'ml',
      hint: 'Where are Edakkal Caves located and what do the petroglyphs depict?',
      backEn: 'Located on Ambukuthi Mala in Wayanad (discovered by Fred Fawcett in 1894). Features Neolithic and Megalithic petroglyphs depicting human figures, animals, masked dancers, and wheel symbols.',
      backSec: 'വയനാട്ടിലെ അമ്പുകുത്തി മലയിൽ സ്ഥിതി ചെയ്യുന്നു (1894-ൽ ഫ്രെഡ് ഫോസെറ്റ് കണ്ടെത്തി). നവീന ശിലായുഗത്തിലെയും മഹാശിലായുഗത്തിലെയും മനുഷ്യരൂപങ്ങൾ, മൃഗങ്ങൾ, ചക്ര ചിഹ്നങ്ങൾ എന്നിവ കൊത്തിവെച്ചിരിക്കുന്നു.'
    },
    {
      category: 'history',
      subject: 'History of Keralam',
      titleEn: 'Muziris (Pattanam) & Ancient Maritime Trade',
      titleSec: 'മുസിരിസ് (പട്ടണം) & പുരാതന സമുദ്ര വാണിജ്യം',
      lang: 'ml',
      hint: 'Why was Muziris famous in the Greco-Roman and Indian Ocean world?',
      backEn: 'Ancient port city on the Periyar mouth, celebrated in Tamil Sangam poetry and Roman records (Pliny, Periplus). Exported black pepper (Yavanapriya), spices, and beryl; imported Roman gold and amphorae.',
      backSec: 'പെരിയാർ തടത്തിലെ പുരാതന അന്താരാഷ്ട്ര തുറമുഖം. റോമാക്കാർ കുരുമുളകിന് (യവനപ്രിയ) പകരമായി സ്വർണ്ണനാണയങ്ങളും വീഞ്ഞും ഇവിടെ എത്തിച്ചു. പെരിപ്ലസിലും സംഘം കൃതികളിലും പരാമർശമുണ്ട്.'
    },
    {
      category: 'history',
      subject: 'History of Keralam',
      titleEn: 'Kulasekharas of Mahodayapuram & Copper Plates',
      titleSec: 'മഹോദയപുരത്തെ കുലശേഖരന്മാർ & താമ്രശാസനങ്ങൾ',
      lang: 'ml',
      hint: 'What is the significance of the Tarisapally and Jewish Copper Plates?',
      backEn: 'The Second Chera kingdom (800–1124 CE) ruled from Mahodayapuram (Kodungallur). The Tarisapally Plate (849 CE by Ayyan Adigal) and Jewish Plate (1000 CE by Bhaskara Ravi) granted commercial privileges to merchant guilds.',
      backSec: 'എട്ടാം നൂറ്റാണ്ടിൽ മഹോദയപുരം ആസ്ഥാനമായി ഭരിച്ച രണ്ടാമത്തെ ചേര രാജവംശം. തരിസാപ്പള്ളി ശാസനവും (849 CE) ജൂത ശാസനവും (1000 CE) ക്രൈസ്തവ-യഹൂദ വ്യാപാരികൾക്ക് നൽകിയ ഭരണപരമായ അവകാശങ്ങൾ രേഖപ്പെടുത്തുന്നു.'
    },

    // --- PHILOSOPHY & ETHICS ---
    {
      category: 'philosophy',
      subject: 'Philosophy of AI',
      titleEn: 'The Turing Test & Alan Turing (1950)',
      titleSec: 'ട്യൂറിംഗ് ടെസ്റ്റ് & അലൻ ട്യൂറിംഗ് (1950)',
      lang: 'ml',
      hint: 'What was Alan Turing’s Imitation Game proposed in 1950?',
      backEn: 'Published in "Computing Machinery and Intelligence". If a human interrogator in blind communication cannot reliably distinguish text output of a machine from a human, the machine exhibits intelligent behavior.',
      backSec: '1950-ൽ അലൻ ട്യൂറിംഗ് അവതരിപ്പിച്ച ബുദ്ധിപരീക്ഷ. സംഭാഷണത്തിൽ മനുഷ്യനും കമ്പ്യൂട്ടറും തമ്മിലുള്ള വ്യത്യാസം തിരിച്ചറിയാൻ ചോദ്യകർത്താവിന് കഴിഞ്ഞില്ലെങ്കിൽ കമ്പ്യൂട്ടർ ബുദ്ധിപരമായി പ്രവർത്തിക്കുന്നു എന്ന് കണക്കാക്കാം.'
    },
    {
      category: 'philosophy',
      subject: 'Philosophy of AI',
      titleEn: 'John Searle’s Chinese Room Argument (1980)',
      titleSec: 'ജോൺ സിയറിലിന്റെ ചൈനീസ് റൂം വാദം (1980)',
      lang: 'ml',
      hint: 'How does the Chinese Room challenge Strong Artificial Intelligence?',
      backEn: 'Searle argues that executing a computer program is merely syntactic manipulation of formal symbols, which cannot produce genuine semantic understanding or conscious intentionality.',
      backSec: 'കമ്പ്യൂട്ടറുകൾ ചിഹ്നങ്ങളെ യാന്ത്രികമായി കൂട്ടിച്ചേർക്കുക മാത്രമേ ചെയ്യുന്നുള്ളൂ (Syntax), അവയ്ക്ക് മനുഷ്യനെപ്പോലെ അർത്ഥം ഗ്രഹിക്കാനുള്ള കഴിവില്ല (Semantics) എന്ന് സിയറിൽ വാദിച്ചു.'
    },
    {
      category: 'philosophy',
      subject: 'Philosophy of Education',
      titleEn: 'Mahatma Gandhi’s Wardha Scheme (Nai Talim)',
      titleSec: 'ഗാന്ധിജിയുടെ വാർധ വിദ്യാഭ്യാസ പദ്ധതി (നയീ താലീം)',
      lang: 'ml',
      hint: 'What is craft-centered learning and the 3Hs in Gandhi’s educational philosophy?',
      backEn: 'Formulated in 1937: Basic education must be craft-centered, mother-tongue medium, self-supporting, and integrate Head, Heart, and Hand (3Hs) for holistic character formation.',
      backSec: '1937-ൽ ഗാന്ധിജി അവതരിപ്പിച്ച നയീ താലീം: തൊഴിലധിഷ്ഠിത വിദ്യാഭ്യാസം, മാതൃഭാഷാ മാധ്യമം, സ്വയംപര്യാപ്തത, തലച്ചോറും ഹൃദയവും കൈകളും (Head, Heart, Hand) സംയോജിപ്പിച്ചുള്ള സമ്പൂർണ്ണ വളർച്ച.'
    },
    {
      category: 'philosophy',
      subject: 'Philosophy of Education',
      titleEn: 'John Dewey: Pragmatism & Experiential Learning',
      titleSec: 'ജോൺ ഡ്യൂയി: പ്രാഗ്മാറ്റിസം & അനുഭവപാഠങ്ങൾ',
      lang: 'ml',
      hint: 'Why did Dewey advocate for "Learning by Doing" and school as a miniature society?',
      backEn: 'Dewey rejected passive rote learning, arguing that genuine education occurs through active problem-solving ("Learning by Doing") in a democratic, cooperative classroom resembling miniature society.',
      backSec: 'വിദ്യാഭ്യാസം എന്നത് ഭാവിക്കുവേണ്ടിയുള്ള തയ്യാറെടുപ്പല്ല, മറിച്ച് ജീവിതം തന്നെയാണ്. ചെയ്തു പഠിക്കലിലൂടെയും (Learning by doing) ജനാധിപത്യപരമായ കൂട്ടായ്മയിലൂടെയും മാത്രമേ അറിവ് നേടാനാവൂ.'
    },
    {
      category: 'philosophy',
      subject: 'Fundamentals of Ethics',
      titleEn: 'Kant’s Categorical Imperative & Deontology',
      titleSec: 'ഇമ്മാനുവൽ കാന്റിന്റെ കറ്റഗോറിക്കൽ ഇംപറേറ്റീവ് (ഡീയോണ്ടോളജി)',
      lang: 'ml',
      hint: 'What does "Duty for duty’s sake" mean in Kantian ethics?',
      backEn: 'An act is morally right based on duty, not consequences. The Categorical Imperative commands: Act only according to that maxim whereby you can at the same time will that it should become a universal law.',
      backSec: 'പ്രവൃത്തികളുടെ ഫലമല്ല, മറിച്ച് കർത്തവ്യബോധമാണ് ധാർമ്മികതയുടെ അടിസ്ഥാനം. ഒരു പ്രവൃത്തി സാർവ്വലൗകിക നിയമമായി മാറ്റാൻ സാധിക്കുന്നതാണെങ്കിൽ മാത്രമേ അത് ധാർമ്മികമായി ശരിയാകൂ.'
    },
    {
      category: 'philosophy',
      subject: 'Fundamentals of Ethics',
      titleEn: 'Utilitarianism: Bentham & J.S. Mill',
      titleSec: 'യൂട്ടിലിറ്റേറിയനിസം (ഉപയോഗിതാവാദം) — ബെന്താമും മില്ലും',
      lang: 'ml',
      hint: 'What is the Greatest Happiness Principle in utilitarian theory?',
      backEn: 'Actions are right in proportion as they tend to promote happiness, wrong as they tend to produce pain. The moral goal is the greatest happiness of the greatest number of people.',
      backSec: 'ഏറ്റവും കൂടുതൽ ആളുകൾക്ക് ഏറ്റവും കൂടുതൽ സന്തോഷവും നന്മയും പ്രദാനം ചെയ്യുന്ന പ്രവൃത്തികളാണ് ധാർമ്മികമായി ശരി (Greatest Happiness of the Greatest Number).'
    },

    // --- ECONOMICS ---
    {
      category: 'economics',
      subject: 'Indian Economy',
      titleEn: 'NITI Aayog vs. Planning Commission',
      titleSec: 'നീതി ആയോഗ് & പ്ലാനിംഗ് കമ്മീഷൻ (വ്യത്യാസങ്ങൾ)',
      lang: 'ml',
      hint: 'When was NITI Aayog established and how does its approach differ?',
      backEn: 'Formed on 1 Jan 2015 replacing the 1950 Planning Commission. Replaced top-down Five-Year Plans with bottom-up Cooperative Federalism, think-tank policy formulation, and state consultation.',
      backSec: '2015 ജനുവരി 1-ന് പ്ലാനിംഗ് കമ്മീഷന് പകരമായി നിലവിൽ വന്നു. കേന്ദ്രത്തിൽ നിന്നുള്ള അടിച്ചേൽപ്പിക്കലിന് പകരം സംസ്ഥാനങ്ങളുടെ കൂട്ടായ പങ്കാളിത്തവും (Cooperative Federalism) നയരൂപീകരണവും ലക്ഷ്യമിടുന്നു.'
    },
    {
      category: 'economics',
      subject: 'Indian Economy',
      titleEn: '1991 New Economic Policy: LPG Reforms',
      titleSec: '1991-ലെ പുതിയ സാമ്പത്തിക നയം (LPG പരിഷ്കാരങ്ങൾ)',
      lang: 'ml',
      hint: 'What are Liberalisation, Privatisation, and Globalisation?',
      backEn: 'Introduced during the 1991 balance-of-payments crisis under P.V. Narasimha Rao and Dr. Manmohan Singh: dismantling License Raj (Liberalisation), disinvestment in PSUs (Privatisation), and integrating with global trade (Globalisation).',
      backSec: '1991-ലെ സാമ്പത്തിക പ്രതിസന്ധിയെ തുടർന്ന് നടപ്പിലാക്കിയ പരിഷ്കാരങ്ങൾ: ലൈസൻസ് രാജ് ഒഴിവാക്കൽ (ഉദാരവൽക്കരണം), പൊതുമേഖലാ ഓഹരി വിറ്റഴിക്കൽ (സ്വകാര്യവൽക്കരണം), ആഗോള വിപണിയുമായി ബന്ധിപ്പിക്കൽ (ആഗോളവൽക്കരണം).'
    },
    {
      category: 'economics',
      subject: 'Indian Economy',
      titleEn: 'Poverty Measurement: Tendulkar & Rangarajan Committees',
      titleSec: 'ദാരിദ്ര്യ രേഖ നിർണ്ണയം (തെണ്ടുൽക്കർ & രംഗരാജൻ)',
      lang: 'ml',
      hint: 'How did calorie criteria shift to multidimensional spending?',
      backEn: 'Tendulkar Committee (2009) shifted poverty line from calorie intake to per capita monthly consumption expenditure (including health & education); Rangarajan Committee (2014) refined these spending cut-offs.',
      backSec: 'വെറും കലോറി ഉപഭോഗത്തിന് പകരം വിദ്യാഭ്യാസം, ആരോഗ്യം, പോഷകാഹാരം എന്നിവയ്ക്കുള്ള പ്രതിമാസ ചെലവുകളെ അടിസ്ഥാനമാക്കി ദാരിദ്ര്യരേഖ നിശ്ചയിക്കാൻ ശുപാർശ ചെയ്തു.'
    },
    {
      category: 'economics',
      subject: 'Microeconomics',
      titleEn: 'Law of Diminishing Marginal Utility',
      titleSec: 'പരിധീയ പ്രയോജന തത്വം (Law of Diminishing Marginal Utility)',
      lang: 'ml',
      hint: 'Why does additional satisfaction decline as consumption increases?',
      backEn: 'Formulated by H.H. Gossen: As a consumer consumes more and more units of a specific commodity, the marginal utility derived from each successive unit decreases continuously.',
      backSec: 'ഒരു നിശ്ചിത സമയത്ത് ഒരു വസ്തു തുടർച്ചയായി ഉപയോഗിക്കുമ്പോൾ, ഓരോ അധിക യൂണിറ്റിൽ നിന്നും ലഭിക്കുന്ന സംതൃപ്തി (Marginal Utility) ക്രമേണ കുറഞ്ഞുവരുന്നു.'
    },
    {
      category: 'economics',
      subject: 'Microeconomics',
      titleEn: 'Indifference Curves & Consumer Equilibrium',
      titleSec: 'നിസ്സംഗതാ വക്രങ്ങളും ഉപഭോക്തൃ സന്തുലിതാവസ്ഥയും',
      lang: 'ml',
      hint: 'What are the three core properties of an indifference curve?',
      backEn: 'An indifference curve shows combinations of two goods yielding equal utility. Properties: Slopes downward to the right, convex to the origin (diminishing MRS), and two curves never intersect.',
      backSec: 'രണ്ട് ഉൽപ്പന്നങ്ങൾ തുല്യ സംതൃപ്തി നൽകുന്ന ബിന്ദുക്കളെ ബന്ധിപ്പിക്കുന്ന രേഖ. സവിശേഷതകൾ: താഴോട്ട് ചരിഞ്ഞിരിക്കുന്നു, ഒറിജിനിലേക്ക് കോൺവെക്സ് ആയിരിക്കും, രണ്ട് വക്രങ്ങൾ പരസ്പരം ഛേദിക്കില്ല.'
    },

    // --- ENGLISH LITERATURE (ENG1FA101) ---
    {
      category: 'english',
      subject: 'English (ENG1FA101)',
      titleEn: 'Dr. B.R. Ambedkar — Annihilation of Caste (1936)',
      titleSec: 'ഡോ. ബി.ആർ. അംബേദ്കർ — ജാതി ഉന്മൂലനം',
      lang: 'ml',
      hint: 'What is Ambedkar’s distinction between division of labour and division of labourers?',
      backEn: 'Ambedkar argued that caste is not merely a division of labour, but an involuntary, graded hierarchical division of labourers based on birth, which destroys social unity and economic mobility.',
      backSec: 'ജാതിവ്യവസ്ഥ വെറും തൊഴിൽ വിഭജനമല്ല, മറിച്ച് തൊഴിലാളികളെ ശ്രേണികളായി തിരിക്കുന്ന ക്രൂരമായ വ്യവസ്ഥയാണെന്നും ഇതിന്റെ മതപരമായ അടിത്തറ തകർക്കണമെന്നും അംബേദ്കർ സമർത്ഥിക്കുന്നു.'
    },
    {
      category: 'english',
      subject: 'English (ENG1FA101)',
      titleEn: 'Martin Luther King Jr. — "I Have a Dream" (1963)',
      titleSec: 'മാർട്ടിൻ ലൂഥർ കിംഗ് ജൂനിയർ — "ഐ ഹാവ് എ ഡ്രീം"',
      lang: 'ml',
      hint: 'What was the central historical message delivered at the Lincoln Memorial?',
      backEn: 'Delivered during the March on Washington for Jobs and Freedom: A call for racial justice, equality, and brotherhood, demanding that America honor its founding promissory note of equality for all citizens.',
      backSec: 'അമേരിക്കയിലെ വർണ്ണവിവേചനത്തിനെതിരെയുള്ള സ്വാതന്ത്ര്യ പ്രഖ്യാപനം. മനുഷ്യർ അവരുടെ ത്വക്കിന്റെ നിറത്തിലല്ല, മറിച്ച് സ്വഭാവഗുണത്തിന്റെ അടിസ്ഥാനത്തിൽ വിലയിരുത്തപ്പെടണമെന്ന് കിംഗ് പ്രഖ്യാപിച്ചു.'
    },
    {
      category: 'english',
      subject: 'English (ENG1FA101)',
      titleEn: 'Leonard Cohen — "Anthem" ("There is a crack in everything")',
      titleSec: 'ലിയനാർഡ് കോഹൻ — "ആന്തം" (കവിത)',
      lang: 'ml',
      hint: 'What is the philosophical meaning of the "crack where the light gets in"?',
      backEn: 'Cohen urges humanity to accept imperfection: "Ring the bells that still can ring / Forget your perfect offering / There is a crack in everything / That’s how the light gets in." Flaws allow hope and redemption.',
      backSec: 'പൂർണ്ണത എന്ന മിഥ്യയെ ഉപേക്ഷിച്ച് അപൂർണ്ണതകളെ അംഗീകരിക്കാൻ കോഹൻ ആഹ്വാനം ചെയ്യുന്നു. മനുഷ്യരിലെ കുറവുകളിലൂടെയും വിള്ളലുകളിലൂടെയുമാണ് പ്രത്യാശയുടെ വെളിച്ചം കടന്നുവരുന്നത്.'
    },
    {
      category: 'english',
      subject: 'English (ENG1FA101)',
      titleEn: 'Arthur Miller — Death of a Salesman (Willy Loman)',
      titleSec: 'ആർതർ മില്ലർ — ഡെത്ത് ഓഫ് എ സെയിൽസ്മാൻ',
      lang: 'ml',
      hint: 'How does Willy Loman personify the tragedy of the American Dream?',
      backEn: 'Willy Loman’s blind pursuit of material success and "being well-liked" leads to alienation, financial despair, and tragic suicide, revealing the hollow promises of ruthless consumer capitalism.',
      backSec: 'വിജയവും ജനപ്രീതിയും മാത്രമാണ് ജീവിതത്തിന്റെ പരമമായ ലക്ഷ്യം എന്ന തെറ്റായ ധാരണ വില്ലി ലോമാനെ ആത്മഹത്യയിലേക്കും കുടുംബത്തിന്റെ തകർച്ചയിലേക്കും നയിച്ച ദുരന്തം.'
    },
    {
      category: 'english',
      subject: 'English (ENG1FA101)',
      titleEn: 'Vaikom Muhammad Basheer — The World-Renowned Nose',
      titleSec: 'വൈക്കം മുഹമ്മദ് ബഷീർ — വിശ്വവിഖ്യാതമായ മൂക്ക്',
      lang: 'ml',
      hint: 'How does Basheer satirize sensationalist media and opportunistic politics?',
      backEn: 'An ordinary cook’s long nose becomes an international sensation, triggering media frenzy, intellectual posturing, and political rivalry, satirizing human gullibility and absurd fame.',
      backSec: 'ഒരു പാചകക്കാരന്റെ നീളമുള്ള മൂക്ക് ആഘോഷമാക്കുന്നതിലൂടെ മാധ്യമങ്ങളുടെ കാപട്യത്തെയും രാഷ്ട്രീയക്കാരുടെയും ഭരണകൂടത്തിന്റെയും വിഡ്ഢിത്തങ്ങളെയും ബഷീർ നിശിതമായി പരിഹസിക്കുന്നു.'
    },

    // --- MALAYALAM AEC ---
    {
      category: 'malayalam',
      subject: 'Malayalam (AEC)',
      titleEn: 'ആത്മകഥ vs. ജീവചരിത്രം (സാഹിത്യ രൂപങ്ങൾ)',
      titleSec: 'ഓർമ്മതൻ വിസ്മയം (കലാമണ്ഡലം ഹൈദരാലി)',
      lang: 'ml',
      hint: 'ആത്മകഥയും ജീവചരിത്രവും തമ്മിലുള്ള ഘടനാപരമായ വ്യത്യാസങ്ങൾ എന്തെല്ലാം?',
      backEn: 'Autobiography is an introspective self-narrative of personal truth (e.g., Kalamandalam Hyderali’s "Ormmathan Vismayam"). Biography is an objective third-person critical account of another’s life.',
      backSec: 'ഒരു വ്യക്തി സ്വന്തം ജീവിതം സ്വയം സത്യസന്ധമായി രേഖപ്പെടുത്തുന്നത് ആത്മകഥ. മറ്റൊരാളുടെ ജീവിതത്തെയും പ്രവർത്തനങ്ങളെയും സമഗ്രമായി അപഗ്രഥിച്ച് എഴുതുന്നത് ജീവചരിത്രം.'
    },
    {
      category: 'malayalam',
      subject: 'Malayalam (AEC)',
      titleEn: 'സഞ്ചാര സാഹിത്യം & എസ്.കെ. പൊറ്റെക്കാട്ട്',
      titleSec: 'മലയാള സഞ്ചാര സാഹിത്യത്തിന്റെ സവിശേഷതകൾ',
      lang: 'ml',
      hint: 'മലയാളത്തിൽ യാത്രാവിവരണ ശാഖയെ സമ്പന്നമാക്കിയ പ്രമുഖ സാഹിത്യകാരൻ ആര്?',
      backEn: 'S.K. Pottekkatt immortalized world travel in Malayalam literature through classics like "Kappirikalude Naattil" and "Innathe Europe", blending vivid imagery, cultural empathy, and historical depth.',
      backSec: 'എസ്.കെ. പൊറ്റെക്കാട്ടിന്റെ "കാപ്പിരികളുടെ നാട്ടിൽ", "ബാലിദ്വീപ്" തുടങ്ങിയ കൃതികൾ യാത്രാനുഭവങ്ങളെയും വിവിധ ജനതകളുടെ സംസ്കാരത്തെയും മലയാളത്തിലേക്ക് സന്നിവേശിപ്പിച്ചു.'
    },

    // --- ARABIC (ARA1FA102) ---
    {
      category: 'arabic',
      subject: 'Arabic (ARA1FA102)',
      titleEn: 'Demonstrative Pronouns (أسماء الإشارة - Haadha & Haadhihi)',
      titleSec: 'അസ്മാഉൽ ഇശാറ (ചൂണ്ടുപദങ്ങൾ — ഹദാ & ഹദിഹി)',
      lang: 'ar',
      hint: 'How are "هٰذَا" and "هٰذِهِ" used for masculine and feminine nouns?',
      backEn: '"هٰذَا" (Haadha) points to singular masculine near objects (هٰذا قَلَمٌ - This is a pen). "هٰذِهِ" (Haadhihi) points to singular feminine near objects (هٰذِهِ حَقِيبَةٌ - This is a bag).',
      backSec: 'അടുത്തുള്ള വസ്തുക്കളെ ചൂണ്ടിക്കാണിക്കാൻ: പുല്ലിംഗത്തിന് "ഹദാ" (هٰذَا) എന്നും സ്ത്രീലിംഗത്തിന് "ഹദിഹി" (هٰذِهِ) എന്നും ഉപയോഗിക്കുന്നു. ഉദാ: هٰذا كِتَابٌ (ഇതൊരു പുസ്തകമാണ്).'
    },
    {
      category: 'arabic',
      subject: 'Arabic (ARA1FA102)',
      titleEn: 'Interrogative Particles (أدوات الاستفهام - Man, Maa, Ayna)',
      titleSec: 'ചോദ്യ പദങ്ങൾ (മൻ, മാ, ഐന)',
      lang: 'ar',
      hint: 'What are the basic question words used in Arabic dialogue?',
      backEn: '"مَنْ" (Man = Who? For rational beings); "مَا" (Maa = What? For objects/concepts); "أَيْنَ" (Ayna = Where? For place). E.g., مَنْ هٰذا؟ (Who is this?), أَيْنَ بَيْتُكَ؟ (Where is your house?).',
      backSec: 'ചോദ്യങ്ങൾ ചോദിക്കാൻ: "മൻ" (مَنْ - ആര്?), "മാ" (مَا - എന്ത്?), "ഐന" (أَيْنَ - എവിടെ?). ഉദാ: مَنْ أَنْتَ؟ (നീ ആരാണ്?), أَيْنَ الْقَلَمُ؟ (പേന എവിടെയാണ്?).'
    },

    // --- HINDI SAHITYA ---
    {
      category: 'hindi',
      subject: 'Hindi (BA Hindi)',
      titleEn: 'Premchand — "Idgah" (ईदगाह कहानी)',
      titleSec: 'പ്രേംചന്ദ് — "ഈദ്ഗാഹ്" (ഹാമിദിന്റെ സ്നേഹം)',
      lang: 'hi',
      hint: 'What is the selfless sacrifice made by 4-year-old Hamid in Idgah?',
      backEn: 'Hamid spends his three paise at the fair buying a chimta (tongs) so his grandmother Amina will not burn her fingers making rotis, representing selfless empathy and moral maturity.',
      backSec: 'ഈദ്ഗാഹ്: നാലുവയസ്സുകാരനായ അനാഥബാലൻ ഹമീദ് കളിപ്പാട്ടങ്ങൾക്ക് പകരം മുത്തശ്ശിക്ക് റൊട്ടി ചുടുമ്പോൾ കൈ പൊള്ളാതിരിക്കാൻ ചവണ (chimta) വാങ്ങുന്ന ഉദാത്ത സ്നേഹത്തിന്റെ കഥ.'
    },
    {
      category: 'hindi',
      subject: 'Hindi (BA Hindi)',
      titleEn: 'Hindi Grammar: Rule of "Ne" (कारक: "ने" का प्रयोग)',
      titleSec: 'ഹിന്ദി വ്യാകരണം — "നേ" (Ne) പ്രയോഗ നിയമം',
      lang: 'hi',
      hint: 'With which verbs and in which tense is the postposition "ने" used?',
      backEn: '"ने" is used only with the subject (कर्ता) of transitive verbs (सकर्मक क्रिया) in past tense (भूतकाल). Example: "राम ने पुस्तक पढ़ी". It is never used in present or future tense.',
      backSec: 'ഹിന്ദിയിൽ സകർമ്മക ക്രിയകൾക്കൊപ്പം ഭൂതകാലത്തിൽ (Past Tense) മാത്രമേ കർത്താവിനോടൊപ്പം "നേ" (ne) ചേർക്കാറുള്ളൂ. ഉദാ: രാം നേ പുസ്തക് പഢീ (റാം പുസ്തകം വായിച്ചു).'
    },

    // --- MATHEMATICS ---
    {
      category: 'mathematics',
      subject: 'Mathematics',
      titleEn: 'Matrices: Determinant & Invertibility',
      titleSec: 'മാട്രിക്സ്: ഡിറ്റർമിനന്റ് & ഇൻവെർട്ടിബിലിറ്റി',
      lang: 'ml',
      hint: 'When is a square matrix invertible and what is a singular matrix?',
      backEn: 'A square matrix A is invertible (non-singular) if and only if its determinant det(A) ≠ 0. If det(A) = 0, the matrix is singular and has no inverse.',
      backSec: 'ഒരു സ്ക്വയർ മാട്രിക്സിന്റെ ഡിറ്റർമിനന്റ് പൂജ്യമല്ലെങ്കിൽ (det ≠ 0) മാത്രമേ അതിന് ഇൻവേഴ്സ് ഉണ്ടാവുകയുള്ളൂ. det = 0 ആണെങ്കിൽ അതിനെ സിംഗുലർ മാട്രിക്സ് എന്ന് വിളിക്കുന്നു.'
    },
    {
      category: 'mathematics',
      subject: 'Mathematics',
      titleEn: 'Arithmetic Progression (AP): nth Term & Sum',
      titleSec: 'സമാന്തര ശ്രേണി (Arithmetic Progression)',
      lang: 'ml',
      hint: 'What are the formulas for the nth term and sum of n terms in an AP?',
      backEn: 'For first term a and common difference d: nth term Tn = a + (n - 1)d; Sum of first n terms Sn = (n / 2)[2a + (n - 1)d].',
      backSec: 'ആദ്യപദം a-യും പൊതുവ്യത്യാസം d-യുമായ സമാന്തരശ്രേണിയിൽ: n-ആം പദം = a + (n - 1)d; ആദ്യ n പദങ്ങളുടെ തുക = (n/2)[2a + (n - 1)d].'
    }
  ];

  // =========================================================================
  // 2. ENGLISH LEARNING & GRAMMAR MASTER CURATED CARDS
  // =========================================================================
  const ENGLISH_BASE_CARDS = [
    // --- TENSES & FORMS ---
    {
      type: 'tenses',
      title: 'She _____ (live) in Calicut since 2018.',
      mal: 'മുൻപ് തുടങ്ങി ഇപ്പോഴും തുടരുന്ന കാര്യത്തിന് ഏത് ടെൻസ്?',
      hint: 'Option: has lived OR lived?',
      answer: 'has lived',
      rule: 'Use Present Perfect (has/have + V3) for actions that began in the past and continue into the present with "since" or "for". Past Simple ("lived") is only for finished past events.',
      ruleMl: 'കഴിഞ്ഞ കാലത്ത് ആരംഭിച്ച് ഇപ്പോഴും തുടരുന്ന പ്രവർത്തനങ്ങൾക്ക് Present Perfect Tense (has/have + past participle) ഉപയോഗിക്കണം.'
    },
    {
      type: 'tenses',
      title: 'When the phone rang, I _____ (read) a book.',
      mal: 'ഒരു പ്രവൃത്തി നടന്നുകൊണ്ടിരിക്കുമ്പോൾ മറ്റൊന്ന് സംഭവിച്ചാൽ?',
      hint: 'Option: read OR was reading?',
      answer: 'was reading',
      rule: 'The continuing background action takes Past Continuous (was/were + V-ing), while the sudden interrupting action takes Past Simple ("rang").',
      ruleMl: 'ഒരു കാര്യം നടന്നുകൊണ്ടിരുന്ന സമയത്ത് മറ്റൊന്ന് സംഭവിക്കുമ്പോൾ നടന്നുകൊണ്ടിരുന്നതിന് Past Continuous (was reading) ഉപയോഗിക്കുന്നു.'
    },
    {
      type: 'tenses',
      title: 'If you had studied well, you _____ (pass) the exam.',
      mal: 'ഭൂതകാലത്തിലെ അസാധ്യമായ നിബന്ധന (Third Conditional)?',
      hint: 'Option: would pass OR would have passed?',
      answer: 'would have passed',
      rule: 'In Third Conditional (unreal past), the "if" clause contains Past Perfect ("had studied"), so the main clause requires "would have + past participle".',
      ruleMl: 'കഴിഞ്ഞ കാലത്തെ നിബന്ധനകളിൽ "If + had + V3" വന്നാൽ പ്രധാന വാക്യത്തിൽ "would have + past participle" ഉപയോഗിക്കണം.'
    },
    {
      type: 'tenses',
      title: 'The train _____ (leave) before we reached the station.',
      mal: 'കഴിഞ്ഞ കാലത്ത് ഒന്നിന് പുറകെ ഒന്നായി രണ്ട് സംഭവങ്ങൾ നടന്നാൽ?',
      hint: 'Option: left OR had left?',
      answer: 'had left',
      rule: 'When two actions happened in the past, the earlier completed action takes Past Perfect (had + V3), and the subsequent action takes Simple Past (reached).',
      ruleMl: 'ഭൂതകാലത്തിൽ നടന്ന രണ്ട് കാര്യങ്ങളിൽ ആദ്യം പൂർത്തിയായതിന് Past Perfect (had left) ഉപയോഗിക്കണം.'
    },
    {
      type: 'tenses',
      title: 'Water _____ (boil) at 100 degrees Celsius.',
      mal: 'സാർവ്വലൗകിക ശാസ്ത്ര സത്യങ്ങൾക്ക് ഏത് ടെൻസ്?',
      hint: 'Option: boils OR is boiling?',
      answer: 'boils',
      rule: 'Universal scientific facts, general truths, and habits are always expressed in Simple Present Tense.',
      ruleMl: 'സാർവ്വലൗകിക സത്യങ്ങൾക്കും ശാസ്ത്ര വസ്തുതകൾക്കും Simple Present Tense (boils) മാത്രമേ ഉപയോഗിക്കാവൂ.'
    },

    // --- ACTIVE & PASSIVE VOICE ---
    {
      type: 'voice',
      title: 'Active: "The teacher explains the sociological theories."',
      mal: 'കർമ്മം (the theories) മുന്നിൽ വച്ച് passive ആക്കുക.',
      hint: 'How does Simple Present turn into passive voice?',
      answer: 'The sociological theories are explained by the teacher.',
      rule: 'Plural object ("The sociological theories") + "are" + Past Participle ("explained") + "by" + agent.',
      ruleMl: 'Simple Present-ൽ കർമ്മം ബഹുവചനമാകുമ്പോൾ "are + V3 (explained)" രൂപമാണ് passive voice-ൽ വരുന്നത്.'
    },
    {
      type: 'voice',
      title: 'Active: "The government has approved the new policy."',
      mal: '"has approved" പാസ്സീവ് ആക്കുമ്പോൾ എന്ത് മാറ്റം വരും?',
      hint: 'In Present Perfect passive, what auxiliary word is added?',
      answer: 'The new policy has been approved by the government.',
      rule: 'In Present Perfect passive voice, insert "been" between "has/have" and the past participle ("has been approved").',
      ruleMl: 'Present Perfect passive ആക്കുമ്പോൾ has/have എന്നതിനോടൊപ്പം "been + past participle" ചേർക്കണം.'
    },
    {
      type: 'voice',
      title: 'Active: "Alexander Fleming discovered penicillin in 1928."',
      mal: 'സിമ്പിൾ പാസ്റ്റ് പാസ്സീവ് ആക്കി മാറ്റുക.',
      hint: 'Penicillin (singular) + was/were + V3?',
      answer: 'Penicillin was discovered by Alexander Fleming in 1928.',
      rule: 'Simple Past passive uses "was/were + past participle" (was discovered).',
      ruleMl: 'Simple Past പാസ്സീവ് ആക്കുമ്പോൾ "was/were + V3" രൂപം വരുന്നു.'
    },
    {
      type: 'voice',
      title: 'Active: "You must submit the assignment tomorrow."',
      mal: 'Modal auxiliary (must) പാസ്സീവ് ആക്കുമ്പോൾ?',
      hint: 'must + be + past participle?',
      answer: 'The assignment must be submitted tomorrow.',
      rule: 'For modals (must, can, should, may), passive structure is "modal + be + past participle".',
      ruleMl: 'Modals വരുമ്പോൾ "must be + V3 (submitted)" എന്ന രൂപം സ്വീകരിക്കുന്നു.'
    },

    // --- DIRECT & INDIRECT SPEECH ---
    {
      type: 'speech',
      title: 'Direct: He said, "I am writing my assignment today."',
      mal: 'പരോക്ഷ പ്രസ്താവനയാക്കി മാറ്റുക.',
      hint: 'Check changes for: "am writing", "my", and "today".',
      answer: 'He said that he was writing his assignment that day.',
      rule: 'Tense shifts from Present Continuous to Past Continuous ("am writing" -> "was writing"), pronouns update ("I" -> "he"), and "today" becomes "that day".',
      ruleMl: 'റിപ്പോർട്ടിംഗ് വെർബ് പാസ്റ്റ് ആകുമ്പോൾ Present Continuous എന്നത് Past Continuous ആവുകയും "today" എന്നത് "that day" ആയി മാറുകയും ചെയ്യുന്നു.'
    },
    {
      type: 'speech',
      title: 'Direct: She asked Rahul, "Have you submitted the form?"',
      mal: 'Yes/No ചോദ്യങ്ങൾ indirect speech ആക്കുമ്പോൾ?',
      hint: 'Which conjunction joins the clauses ("if" / "whether")?',
      answer: 'She asked Rahul if he had submitted the form.',
      rule: 'For Yes/No questions, connect with "if" or "whether", change question word order to statement order, and shift "have submitted" to Past Perfect "had submitted".',
      ruleMl: 'Yes/No ചോദ്യങ്ങൾക്ക് "if" അല്ലെങ്കിൽ "whether" ഉപയോഗിക്കുക. "Have submitted" എന്നത് "had submitted" ആയി മാറും.'
    },
    {
      type: 'speech',
      title: 'Direct: The doctor said to the patient, "Take this medicine twice a day."',
      mal: 'ഉപദേശം അല്ലെങ്കിൽ നിർദ്ദേശം (Imperative) റിപ്പോർട്ട് ചെയ്യുമ്പോൾ?',
      hint: 'Replace "said to" with "advised" + infinitive "to take".',
      answer: 'The doctor advised the patient to take that medicine twice a day.',
      rule: 'Imperatives use reporting verbs like advised, ordered, requested followed by the infinitive ("to + verb"). "This" becomes "that".',
      ruleMl: 'നിർദ്ദേശങ്ങൾക്ക് advised/ordered ഉപയോഗിക്കുകയും തുടർന്ന് "to + verb" ചേർക്കുകയും ചെയ്യുക.'
    },

    // --- PREPOSITIONS & PHRASALS ---
    {
      type: 'prepositions',
      title: 'He is senior _____ me by two years.',
      mal: '"senior, junior, superior" എന്നിവയ്ക്കൊപ്പം ഏത് പ്രിപോസിഷൻ?',
      hint: 'Choose: than OR to?',
      answer: 'senior to me (Never "than")',
      rule: 'Latin comparative adjectives ending in "-ior" (senior, junior, superior, inferior, prior) always take "to", never "than".',
      ruleMl: 'senior, junior, superior, inferior തുടങ്ങിയ വാക്കുകൾക്ക് ശേഷം "than" അല്ല, "to" ആണ് പ്രിപോസിഷനായി ഉപയോഗിക്കേണ്ടത്.'
    },
    {
      type: 'prepositions',
      title: 'I have been preparing for the exam _____ three weeks.',
      mal: 'സമയത്തിന്റെ ദൈർഘ്യം (duration) പറയാൻ ഏതാണ് ഉപയോഗിക്കുക?',
      hint: 'Choose: since OR for?',
      answer: 'for three weeks',
      rule: 'Use "for" to indicate duration/period of time (for 3 weeks, for 2 hours). Use "since" for a specific starting point (since Monday, since 2021).',
      ruleMl: 'സമയത്തിന്റെ ദൈർഘ്യം (duration) സൂചിപ്പിക്കാൻ "for" ഉപയോഗിക്കുക; ആരംഭിച്ച നിശ്ചിത സമയം പറയാൻ "since" ഉപയോഗിക്കുക.'
    },
    {
      type: 'prepositions',
      title: 'The meeting was _____ due to heavy rain.',
      mal: 'പൂർണ്ണമായി റദ്ദാക്കി എന്ന് സൂചിപ്പിക്കുന്ന phrasal verb ഏത്?',
      hint: 'Choose: called off OR put off?',
      answer: 'called off (= cancelled)',
      rule: '"Call off" means to cancel entirely. "Put off" means to postpone or defer to a later date.',
      ruleMl: '"Call off" എന്നാൽ പൂർണ്ണമായി റദ്ദാക്കുക (cancel) എന്നാണ്; "Put off" എന്നാൽ മറ്റൊരു ദിവസത്തേക്ക് മാറ്റിവെക്കുക (postpone) എന്നാണ്.'
    },
    {
      type: 'prepositions',
      title: 'She is proficient _____ English and Malayalam.',
      mal: 'ഒരു വിഷയത്തിൽ അല്ലെങ്കിൽ ഭാഷയിൽ പ്രാവീണ്യം സൂചിപ്പിക്കാൻ?',
      hint: 'Choose: in OR at?',
      answer: 'proficient in (or skilled in)',
      rule: 'We use "proficient in" for languages and subjects; we use "good at" or "clever at" for activities.',
      ruleMl: 'ഭാഷകളിലെയും വിഷയങ്ങളിലെയും പ്രാവീണ്യത്തിന് "proficient in" ഉപയോഗിക്കുന്നു; എന്നാൽ കഴിവുകൾക്ക് "good at" ഉപയോഗിക്കുന്നു.'
    },

    // --- SUBJECT-VERB AGREEMENT ---
    {
      type: 'agreement',
      title: 'Neither the teacher nor the students _____ present.',
      mal: '"Neither... nor" വരുമ്പോൾ ക്രിയ ഏത് സബ്ജക്ടിനെ ആശ്രയിക്കുന്നു?',
      hint: 'Choose: was OR were?',
      answer: 'were present',
      rule: 'When subjects are connected by "either... or" or "neither... nor", the verb agrees with the subject closest to it ("students" is plural, hence "were").',
      ruleMl: '"Neither... nor" വരുമ്പോൾ വെർബിന് ഏറ്റവും അടുത്ത് നിൽക്കുന്ന സബ്ജക്ടിന് (students - ബഹുവചനം) അനുസരിച്ചാണ് ക്രിയ (were) വരുന്നത്.'
    },
    {
      type: 'agreement',
      title: 'Each of the participants _____ received a certificate.',
      mal: '"Each of..." വന്നാൽ ക്രിയ ഏകവചനമോ ബഹുവചനമോ?',
      hint: 'Choose: has OR have?',
      answer: 'has received',
      rule: '"Each", "Every", and "Each of..." take a singular verb ("has", "is", "was") regardless of the plural noun that follows.',
      ruleMl: '"Each of the..." വരുമ്പോൾ നാമം ബഹുവചനമാണെങ്കിലും ക്രിയ എപ്പോഴും ഏകവചനമായിരിക്കണം (has).'
    },
    {
      type: 'agreement',
      title: 'The Prime Minister, along with his ministers, _____ arriving today.',
      mal: '"along with, as well as" വന്നാൽ ക്രിയ ആദ്യ സബ്ജക്ടിനെ ആശ്രയിക്കുമോ?',
      hint: 'Choose: is OR are?',
      answer: 'is arriving',
      rule: 'Expressions like "as well as", "along with", and "together with" do not alter the number of the subject. The verb agrees with the first subject ("Prime Minister" - singular).',
      ruleMl: '"along with", "as well as" എന്നിവ വരുമ്പോൾ പ്രധാന കർത്താവ് (Prime Minister) ഏകവചനമായതിനാൽ ക്രിയയും ഏകവചനമായിരിക്കും (is).'
    },

    // --- COMMON ERRORS & FIXES ---
    {
      type: 'errors',
      title: 'Error Spotting: "One of my friend is an economist."',
      mal: 'ഈ വാക്യത്തിലെ തെറ്റ് എന്താണ്? എങ്ങനെ തിരുത്താം?',
      hint: 'Look closely at the noun after "One of my...".',
      answer: 'One of my friends is an economist.',
      rule: '"One of..." must always be followed by a plural noun ("friends"), because you select one out of many, but the verb remains singular ("is").',
      ruleMl: '"One of..." എന്നതിന് ശേഷം നാമം ബഹുവചനമായിരിക്കണം (friends), എന്നാൽ ക്രിയ ഏകവചനമായിരിക്കും (is).'
    },
    {
      type: 'errors',
      title: 'Error Spotting: "Despite of working hard, he failed."',
      mal: '"Despite" എന്ന വാക്കിനൊപ്പം "of" വരുമോ?',
      hint: 'Correct form: Despite OR In spite of?',
      answer: 'Despite working hard... OR In spite of working hard...',
      rule: '"Despite" takes no preposition (never "despite of"). Only "in spite" is followed by "of".',
      ruleMl: '"Despite" എന്ന വാക്കിനൊപ്പം "of" ഉപയോഗിക്കാൻ പാടില്ല. "In spite of" എന്ന് മാത്രമേ "of" വരാവൂ.'
    },
    {
      type: 'errors',
      title: 'Error Spotting: "We discussed about the sociology topic."',
      mal: '"Discussed" ന് ശേഷം "about" ആവശ്യമുണ്ടോ?',
      hint: 'Does the transitive verb "discuss" take a preposition?',
      answer: 'We discussed the sociology topic. (Remove "about")',
      rule: 'Verbs like "discuss", "order", "describe", and "reach" take a direct object without prepositions like "about" or "for".',
      ruleMl: '"Discuss", "order" തുടങ്ങിയ ക്രിയകൾക്ക് ശേഷം "about" അല്ലെങ്കിൽ "for" ചേർക്കേണ്ടതില്ല.'
    },
    {
      type: 'errors',
      title: 'Error Spotting: "He gave me many valuable advices."',
      mal: '"Advice" എന്ന വാക്കിന് ബഹുവചനം (advices) ഉണ്ടോ?',
      hint: 'Is advice countable or uncountable?',
      answer: 'He gave me much valuable advice (or "pieces of advice").',
      rule: '"Advice" is uncountable and cannot be pluralized as "advices". Use "pieces of advice" if counting.',
      ruleMl: '"Advice", "information", "furniture" എന്നിവയ്ക്ക് ബഹുവചന രൂപമില്ല (uncountable nouns).'
    }
  ];

  // =========================================================================
  // 3. LMS DATA INGESTION & SYNTHESIZER ENGINE
  // =========================================================================
  const LMS_SUBJECT_MAP = [
    { key: 'sociologyLearningData', category: 'sociology', subject: 'Sociology' },
    { key: 'historyLearningData', category: 'history', subject: 'History of Keralam' },
    { key: 'aiLearningData', category: 'philosophy', subject: 'Philosophy of AI' },
    { key: 'educationLearningData', category: 'philosophy', subject: 'Philosophy of Education' },
    { key: 'ethicsLearningData', category: 'philosophy', subject: 'Fundamentals of Ethics' },
    { key: 'economicsLearningData', category: 'economics', subject: 'Development Issues in Indian Economy' },
    { key: 'microeconomicsLearningData', category: 'economics', subject: 'Microeconomic Foundation' },
    { key: 'englishLearningData', category: 'english', subject: 'English (ENG1FA101)' },
    { key: 'mathLearningData', category: 'mathematics', subject: 'Mathematics' }
  ];

  // Crawl LMS structured datasets on window
  function crawlLmsKnowledge() {
    const crawled = [];
    LMS_SUBJECT_MAP.forEach(item => {
      const data = window[item.key];
      if (!data || typeof data !== 'object') return;

      Object.keys(data).forEach(modId => {
        const mod = data[modId];
        if (!mod) return;

        const modTitle = mod.title || item.subject;
        const modTitleMal = mod.titleMal || '';

        // Extract Summary Section Points
        if (mod.summary && Array.isArray(mod.summary.sections)) {
          mod.summary.sections.forEach(sec => {
            const secTitle = sec.title || modTitle;
            const secTitleMal = sec.titleMal || modTitleMal;
            const badge = sec.badge || 'LMS Core Concept';

            if (Array.isArray(sec.points)) {
              sec.points.forEach((pt, pIdx) => {
                if (!pt || !pt.en) return;
                crawled.push({
                  category: item.category,
                  subject: item.subject,
                  titleEn: secTitle,
                  titleSec: secTitleMal,
                  lang: 'ml',
                  hint: `LMS Study Note: Key principle regarding ${badge}`,
                  backEn: pt.en,
                  backSec: pt.mal || ''
                });
              });
            }
          });
        }

        // Extract Quiz Pool Question Cards
        if (Array.isArray(mod.quizPool)) {
          mod.quizPool.forEach((q, qIdx) => {
            if (!q || !q.question || !q.answer) return;
            const explanation = q.explanation ? `<br><br><em>Exam Explanation:</em> ${q.explanation}` : '';
            crawled.push({
              category: item.category,
              subject: item.subject,
              titleEn: q.question,
              titleSec: modTitleMal || modTitle,
              lang: 'ml',
              hint: `Active Recall Question: Choose from syllabus principles`,
              backEn: `<strong>Correct Answer: ${q.answer}</strong>${explanation}`,
              backSec: q.explanationMal || (q.explanation ? 'വിശദീകരണം: ' + q.explanation : '')
            });
          });
        }
      });
    });
    return crawled;
  }

  // =========================================================================
  // 4. INFINITE PROCEDURAL CARD GENERATOR (100,000+ COMBINATIONS PER PART)
  // =========================================================================
  
  // Dynamic synthesis templates for endless Subjects & Languages cards
  const SUBJECT_PROMPT_VARIANTS = [
    {
      formatFront: (term) => `University Active Recall: Define the significance of "${term}"`,
      formatHint: (subj) => `Recall from ${subj} syllabus core objectives`,
      prefixBack: 'Core Examination Principle: '
    },
    {
      formatFront: (term) => `Exam Analysis: What are the key theoretical implications of "${term}"?`,
      formatHint: (subj) => `High-yield degree exam question in ${subj}`,
      prefixBack: 'Analytical Breakdown: '
    },
    {
      formatFront: (term) => `Syllabus Mastery: How is "${term}" explained in university course modules?`,
      formatHint: (subj) => `Official Self-Learning Material (SLM) takeaway`,
      prefixBack: 'Prescribed Text Definition: '
    },
    {
      formatFront: (term) => `Recall Challenge: State the central tenets regarding "${term}"`,
      formatHint: (subj) => `Essential concept for short essay / objective sections`,
      prefixBack: 'Summary Notes: '
    }
  ];

  function synthesizeSubjectCard(baseCard, seedIndex) {
    const template = SUBJECT_PROMPT_VARIANTS[seedIndex % SUBJECT_PROMPT_VARIANTS.length];
    return {
      category: baseCard.category,
      subject: baseCard.subject,
      titleEn: template.formatFront(baseCard.titleEn),
      titleSec: baseCard.titleSec,
      lang: baseCard.lang || 'ml',
      hint: template.formatHint(baseCard.subject),
      backEn: `<strong>${template.prefixBack}</strong>${baseCard.backEn}`,
      backSec: baseCard.backSec
    };
  }

  // Dynamic sentence permutations for endless English Learning cards
  const GRAMMAR_SUBJECTS = [
    { s: 'The professor', p: 'The professors', vSing: 'has', vPlur: 'have', wasWereSing: 'was', wasWerePlur: 'were' },
    { s: 'The student', p: 'The students', vSing: 'has', vPlur: 'have', wasWereSing: 'was', wasWerePlur: 'were' },
    { s: 'The researcher', p: 'The researchers', vSing: 'has', vPlur: 'have', wasWereSing: 'was', wasWerePlur: 'were' },
    { s: 'The journalist', p: 'The journalists', vSing: 'has', vPlur: 'have', wasWereSing: 'was', wasWerePlur: 'were' },
    { s: 'The committee member', p: 'The committee members', vSing: 'has', vPlur: 'have', wasWereSing: 'was', wasWerePlur: 'were' }
  ];

  const GRAMMAR_OBJECTS = [
    'the sociological survey', 'the economic reform report', 'the historical manuscript',
    'the philosophical treatise', 'the environmental study', 'the research findings'
  ];

  function synthesizeGrammarCard(type, seedIndex) {
    const subj = GRAMMAR_SUBJECTS[seedIndex % GRAMMAR_SUBJECTS.length];
    const obj = GRAMMAR_OBJECTS[(seedIndex * 3) % GRAMMAR_OBJECTS.length];

    if (type === 'tenses') {
      return {
        type: 'tenses',
        title: `${subj.s} _____ (examine) ${obj} since last Monday.`,
        mal: 'മുൻപ് തുടങ്ങി ഇപ്പോഴും തുടരുന്ന പ്രവർത്തനത്തിന് ഏത് ടെൻസ്?',
        hint: `Choose: ${subj.vSing} examined OR examined?`,
        answer: `${subj.vSing} examined`,
        rule: `Use Present Perfect (${subj.vSing}/${subj.vPlur} + V3) for actions that began in the past and continue into the present with "since" or "for".`,
        ruleMl: 'കഴിഞ്ഞ കാലത്ത് ആരംഭിച്ച് ഇപ്പോഴും തുടരുന്ന പ്രവർത്തനങ്ങൾക്ക് Present Perfect Tense ഉപയോഗിക്കണം.'
      };
    } else if (type === 'voice') {
      return {
        type: 'voice',
        title: `Active: "${subj.s} evaluated ${obj} carefully."`,
        mal: 'കർമ്മം മുന്നിൽ വച്ച് പാസ്സീവ് വോയ്സ് ആക്കുക.',
        hint: `Start with "${obj}" + was/were + V3...`,
        answer: `${obj.charAt(0).toUpperCase() + obj.slice(1)} was evaluated carefully by ${subj.s.toLowerCase()}.`,
        rule: 'In Simple Past passive voice, singular object takes "was + past participle (evaluated) + by + agent".',
        ruleMl: 'Simple Past പാസ്സീവ് ആക്കുമ്പോൾ "was + V3" രൂപം ഉപയോഗിക്കുന്നു.'
      };
    } else if (type === 'speech') {
      return {
        type: 'speech',
        title: `Direct: ${subj.s} said, "I have completed ${obj} today."`,
        mal: 'പരോക്ഷ പ്രസ്താവനയാക്കി മാറ്റുക.',
        hint: 'Check changes for: have completed -> had completed, today -> that day.',
        answer: `${subj.s} said that they had completed ${obj} that day.`,
        rule: 'Tense shifts from Present Perfect to Past Perfect ("have/has completed" -> "had completed"), and "today" becomes "that day".',
        ruleMl: 'റിപ്പോർട്ടിംഗ് വെർബ് ഭൂതകാലമാകുമ്പോൾ Present Perfect എന്നത് Past Perfect ആവുകയും "today" എന്നത് "that day" ആയി മാറുകയും ചെയ്യുന്നു.'
      };
    } else if (type === 'agreement') {
      return {
        type: 'agreement',
        title: `Neither ${subj.s.toLowerCase()} nor ${subj.p.toLowerCase()} _____ satisfied with the results.`,
        mal: '"Neither... nor" വരുമ്പോൾ ക്രിയ ഏതിനെ ആശ്രയിക്കുന്നു?',
        hint: `Choose: ${subj.wasWereSing} OR ${subj.wasWerePlur}?`,
        answer: `${subj.wasWerePlur} satisfied`,
        rule: `When subjects are joined by "neither... nor", the verb agrees with the subject closest to it ("${subj.p}" is plural, hence "${subj.wasWerePlur}").`,
        ruleMl: '"Neither... nor" വരുമ്പോൾ വെർബിന് ഏറ്റവും അടുത്ത് നിൽക്കുന്ന സബ്ജക്ടിന് അനുസരിച്ചാണ് ക്രിയ വരുന്നത്.'
      };
    } else if (type === 'prepositions') {
      return {
        type: 'prepositions',
        title: `${subj.s} is keenly interested _____ ${obj}.`,
        mal: '"Interested" എന്ന വാക്കിനൊപ്പം ഏത് പ്രിപോസിഷൻ?',
        hint: 'Choose: in OR for?',
        answer: `interested in ${obj}`,
        rule: 'The adjective "interested" is always paired with the preposition "in", never "for" or "about".',
        ruleMl: '"Interested" എന്നതിന് ശേഷം എപ്പോഴും "in" ആണ് ഉപയോഗിക്കേണ്ടത്.'
      };
    } else {
      return {
        type: 'errors',
        title: `Error Spotting: "One of ${subj.s.toLowerCase()} have reviewed ${obj}."`,
        mal: 'ഈ വാക്യത്തിലെ തെറ്റ് കണ്ടെത്തി തിരുത്തുക.',
        hint: '"One of..." ന് ശേഷം നാമം ബഹുവചനവും ക്രിയ ഏകവചനവുമാണ്.',
        answer: `One of ${subj.p.toLowerCase()} has reviewed ${obj}.`,
        rule: '"One of..." takes a plural noun but requires a singular verb ("has"), since the subject is "One".',
        ruleMl: '"One of..." എന്നതിന് ശേഷം നാമം ബഹുവചനവും ക്രിയ ഏകവചനവുമായിരിക്കണം.'
      };
    }
  }

  // =========================================================================
  // 5. MASTER CONTROLLER & UI BINDING
  // =========================================================================
  function initActiveRecallHub() {
    // 1. Hide card numbers via injected styles if not already hidden
    let hideStyle = document.getElementById('hide-card-numbers-style');
    if (!hideStyle) {
      hideStyle = document.createElement('style');
      hideStyle.id = 'hide-card-numbers-style';
      hideStyle.textContent = `
        .flashcard-counter,
        #soc-card-counter,
        #eng-card-counter {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(hideStyle);
    }

    // 2. Crawl LMS datasets and combine with base cards
    const lmsCrawledCards = crawlLmsKnowledge();
    const allSubjectCards = [...SUBJECT_BASE_CARDS, ...lmsCrawledCards];
    const allEnglishCards = [...ENGLISH_BASE_CARDS];

    // Clean dropdown label counts to remove card numbers
    const socFilter = document.getElementById('subject-filter');
    if (socFilter) {
      Array.from(socFilter.options).forEach(opt => {
        opt.textContent = opt.textContent.replace(/\s*\(\d+\)\s*$/, '');
      });
    }

    const engFilter = document.getElementById('grammar-type-filter');
    if (engFilter) {
      Array.from(engFilter.options).forEach(opt => {
        opt.textContent = opt.textContent.replace(/\s*\(\d+\)\s*$/, '');
      });
    }

    // Hide any visible counter elements in the DOM
    const socCounter = document.getElementById('soc-card-counter');
    if (socCounter) socCounter.style.display = 'none';
    const engCounter = document.getElementById('eng-card-counter');
    if (engCounter) engCounter.style.display = 'none';

    // -----------------------------------------------------------------------
    // DECK 1: SUBJECTS & LANGUAGES CONTROLLER
    // -----------------------------------------------------------------------
    let currentSocCategory = socFilter ? socFilter.value : 'all';
    let filteredPool = allSubjectCards.filter(c => currentSocCategory === 'all' || c.category === currentSocCategory);
    
    // Virtual endless navigation cache
    let socVirtualCards = [...filteredPool];
    let socIndex = 0;
    let socSyntheticCount = 0;

    const socBox = document.getElementById('soc-flashcard-box');
    const socTag = document.getElementById('soc-card-subject');
    const socTitle = document.getElementById('soc-card-front-title');
    const socSec = document.getElementById('soc-card-front-mal');
    const socHint = document.getElementById('soc-card-front-hint');
    const socBackEn = document.getElementById('soc-card-back-en');
    const socBackSec = document.getElementById('soc-card-back-ml');
    const socPrev = document.getElementById('soc-prev-card');
    const socNext = document.getElementById('soc-next-card');
    const socFlip = document.getElementById('soc-flip-card-btn');

    function getSocCard(idx) {
      if (socVirtualCards[idx]) return socVirtualCards[idx];
      // Generate synthetic card from crawled base pool on demand
      if (filteredPool.length > 0) {
        const base = filteredPool[socSyntheticCount % filteredPool.length];
        socSyntheticCount++;
        const card = synthesizeSubjectCard(base, socSyntheticCount);
        socVirtualCards[idx] = card;
        return card;
      }
      return filteredPool[0] || SUBJECT_BASE_CARDS[0];
    }

    function renderSocCard(idx) {
      if (!socBox) return;
      socBox.classList.remove('flipped');
      const c = getSocCard(idx);
      if (!c) return;

      if (socTag) socTag.textContent = c.subject;
      if (socTitle) socTitle.textContent = c.titleEn;
      if (socSec) {
        socSec.textContent = c.titleSec || '';
        socSec.setAttribute('lang', c.lang || 'ml');
      }
      if (socHint) socHint.textContent = c.hint || '';
      if (socBackEn) socBackEn.innerHTML = c.backEn || '';
      if (socBackSec) {
        socBackSec.textContent = c.backSec || '';
        socBackSec.setAttribute('lang', c.lang || 'ml');
      }
    }

    function toggleSocFlip() {
      if (socBox) socBox.classList.toggle('flipped');
    }

    if (socBox) {
      socBox.onclick = toggleSocFlip;
      socBox.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSocFlip();
        }
      };
    }
    if (socFlip) socFlip.onclick = toggleSocFlip;

    if (socPrev) {
      socPrev.onclick = () => {
        if (socIndex > 0) {
          socIndex--;
          renderSocCard(socIndex);
        } else {
          // Wrap around seamlessly
          socIndex = Math.max(0, socVirtualCards.length - 1);
          renderSocCard(socIndex);
        }
      };
    }

    if (socNext) {
      socNext.onclick = () => {
        socIndex++;
        // Seamlessly synthesize more cards as user advances (up to 100,000+)
        if (socIndex >= socVirtualCards.length) {
          getSocCard(socIndex);
        }
        renderSocCard(socIndex);
      };
    }

    if (socFilter) {
      socFilter.onchange = (e) => {
        currentSocCategory = e.target.value;
        filteredPool = allSubjectCards.filter(c => currentSocCategory === 'all' || c.category === currentSocCategory);
        if (filteredPool.length === 0) filteredPool = allSubjectCards;
        socVirtualCards = [...filteredPool];
        socIndex = 0;
        socSyntheticCount = 0;
        renderSocCard(0);
      };
    }

    // Initial render
    renderSocCard(0);

    // -----------------------------------------------------------------------
    // DECK 2: ENGLISH LEARNING & GRAMMAR CONTROLLER
    // -----------------------------------------------------------------------
    let currentEngType = engFilter ? engFilter.value : 'all';
    let filteredEngPool = allEnglishCards.filter(c => currentEngType === 'all' || c.type === currentEngType);
    let engVirtualCards = [...filteredEngPool];
    let engIndex = 0;
    let engSyntheticCount = 0;

    const engBox = document.getElementById('eng-flashcard-box');
    const engTitle = document.getElementById('eng-card-front-title');
    const engMal = document.getElementById('eng-card-front-mal');
    const engHint = document.getElementById('eng-card-front-hint');
    const engBackEn = document.getElementById('eng-card-back-en');
    const engBackMl = document.getElementById('eng-card-back-ml');
    const engPrev = document.getElementById('eng-prev-card');
    const engNext = document.getElementById('eng-next-card');
    const engFlip = document.getElementById('eng-flip-card-btn');

    function getEngCard(idx) {
      if (engVirtualCards[idx]) return engVirtualCards[idx];
      // Generate synthetic grammar card on demand
      const types = ['tenses', 'voice', 'speech', 'prepositions', 'agreement', 'errors'];
      const targetType = currentEngType === 'all' ? types[engSyntheticCount % types.length] : currentEngType;
      engSyntheticCount++;
      const card = synthesizeGrammarCard(targetType, engSyntheticCount);
      engVirtualCards[idx] = card;
      return card;
    }

    function renderEngCard(idx) {
      if (!engBox) return;
      engBox.classList.remove('flipped');
      const c = getEngCard(idx);
      if (!c) return;

      if (engTitle) engTitle.textContent = c.title;
      if (engMal) engMal.textContent = c.mal || '';
      if (engHint) engHint.textContent = c.hint || '';
      if (engBackEn) engBackEn.innerHTML = '<strong>Answer: ' + c.answer + '</strong><br>' + c.rule;
      if (engBackMl) engBackMl.textContent = c.ruleMl || '';
    }

    function toggleEngFlip() {
      if (engBox) engBox.classList.toggle('flipped');
    }

    if (engBox) {
      engBox.onclick = toggleEngFlip;
      engBox.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleEngFlip();
        }
      };
    }
    if (engFlip) engFlip.onclick = toggleEngFlip;

    if (engPrev) {
      engPrev.onclick = () => {
        if (engIndex > 0) {
          engIndex--;
          renderEngCard(engIndex);
        } else {
          engIndex = Math.max(0, engVirtualCards.length - 1);
          renderEngCard(engIndex);
        }
      };
    }

    if (engNext) {
      engNext.onclick = () => {
        engIndex++;
        if (engIndex >= engVirtualCards.length) {
          getEngCard(engIndex);
        }
        renderEngCard(engIndex);
      };
    }

    if (engFilter) {
      engFilter.onchange = (e) => {
        currentEngType = e.target.value;
        filteredEngPool = allEnglishCards.filter(c => currentEngType === 'all' || c.type === currentEngType);
        if (filteredEngPool.length === 0) filteredEngPool = allEnglishCards;
        engVirtualCards = [...filteredEngPool];
        engIndex = 0;
        engSyntheticCount = 0;
        renderEngCard(0);
      };
    }

    // Initial render
    renderEngCard(0);
  }

  // Initialize on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initActiveRecallHub);
  } else {
    initActiveRecallHub();
  }
})();
