// Philosophy of Artificial Intelligence - Comprehensive Learning Data (Modules 1-5)
// Sourced directly from syllabus & textbook PDFs with English + Malayalam & 15 MCQs per module
window.aiLearningData = {
  "ai_mod_1": {
    "title": "Module 1 · Introduction to Artificial Intelligence",
    "titleMal": "മൊഡ്യൂൾ 1 · ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിന്റെ ആമുഖം",
    "filename": "Module_1_Introduction_to_Artificial_Intelligence.pdf",
    "summary": {
      "overview": "Comprehensive exploration of the history, philosophical origins, and core foundations of Artificial Intelligence. Traces the evolution of machine intelligence from ancient philosophical concepts of rational logic (Aristotle, Leibniz) to the 1956 Dartmouth Workshop, Alan Turing's seminal test, and the epistemological question of whether computational systems can genuinely think.",
      "overviewMal": "ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിന്റെ (AI) ചരിത്രം, തത്ത്വചിന്താപരമായ ഉത്ഭവം, അടിസ്ഥാന ആശയങ്ങൾ എന്നിവയുടെ സമഗ്രമായ വിശകലനം. അരിസ്റ്റോട്ടിൽ, ലെബ്നിസ് എന്നിവരുടെ യുക്തിചിന്തകളിൽ തുടങ്ങി, 1956-ലെ ഡാർട്ട്മൗത്ത് കോൺഫറൻസ്, അലൻ ട്യൂറിങ്ങിന്റെ പ്രശസ്തമായ പരീക്ഷണം, കമ്പ്യൂട്ടറുകൾക്ക് യഥാർത്ഥത്തിൽ ചിന്തിക്കാൻ കഴിയുമോ എന്ന തത്ത്വചിന്താപരമായ ചോദ്യം എന്നിവയെല്ലാം ഈ അധ്യായം ചർച്ച ചെയ്യുന്നു.",
      "sections": [
        {
          "badge": "Part 1",
          "title": "Historical & Philosophical Origins: From Ancient Logic to Computation",
          "titleMal": "ചരിത്രപരവും തത്ത്വചിന്താപരവുമായ ഉത്ഭവം: പുരാതന യുക്തിചിന്ത മുതൽ കമ്പ്യൂട്ടിങ് വരെ",
          "points": [
            {
              "en": "Formal reasoning originated with Aristotle's syllogistic logic, providing the very first mechanical, rule-based formulation for deductible human thought.",
              "mal": "അരിസ്റ്റോട്ടിലിന്റെ ന്യായയുക്തിചിന്തകളാണ് (Syllogistic logic) മനുഷ്യന്റെ ചിന്തകളെ ചിട്ടയായ നിയമങ്ങളിലൂടെ വ്യവസ്ഥാപിതമാക്കാൻ ആദ്യമായി അടിത്തറയിട്ടത്."
            },
            {
              "en": "Gottfried Wilhelm Leibniz conceived the 'Characteristica Universalis' and 'Calculus Ratiocinator', dreaming of a universal computational calculus to resolve intellectual disputes mechanically.",
              "mal": "ഗോട്ട്ഫ്രൈഡ് ലെബ്നിസ് എല്ലാ പ്രശ്നങ്ങൾക്കും കണക്കുകൂട്ടലിലൂടെ പരിഹാരം കണ്ടെത്താൻ കഴിയുന്ന സാർവ്വത്രിക കണക്കുകൂട്ടൽ ഭാഷ സ്വപ്നം കണ്ടു."
            },
            {
              "en": "George Boole created Boolean Algebra (1854), bridging formal logic and mathematics into binary systems (0 and 1) that formed the bedrock of modern electronic computers.",
              "mal": "ജോർജ്ജ് ബൂൾ നിർമ്മിച്ച ബൂളിയൻ ആൾജിബ്ര (1854) യുക്തിയെയും ഗണിതത്തെയും ബൈനറി സമ്പ്രദായത്തിലേക്ക് (0, 1) മാറ്റി കമ്പ്യൂട്ടർ ശാസ്ത്രത്തിന്റെ അടിസ്ഥാനമായി."
            },
            {
              "en": "The Dartmouth Summer Research Project on Artificial Intelligence (1956) organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon officially founded AI as an academic discipline.",
              "mal": "1956-ൽ ജോൺ മക്കാർത്തി, മാർവിൻ മിൻസ്കി തുടങ്ങിയവർ ചേർന്ന സംഘടിപ്പിച്ച ഡാർട്ട്മൗത്ത് വർക്ക്ഷോപ്പിലാണ് 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്' എന്ന പദവും ഈ പഠനശാഖയും ഔദ്യോഗികമായി പിറവിയെടുത്തത്."
            }
          ]
        },
        {
          "badge": "Part 2",
          "title": "Alan Turing & 'The Imitation Game' (Turing Test)",
          "titleMal": "അലൻ ട്യൂറിങ്ങും 'ഇമിറ്റേഷൻ ഗെയിമും' (ട്യൂറിങ് ടെസ്റ്റ്)",
          "points": [
            {
              "en": "In his landmark 1950 paper 'Computing Machinery and Intelligence', Alan Turing replaced the ambiguous question 'Can machines think?' with an operational behavioral benchmark known as the 'Imitation Game'.",
              "mal": "1950-ൽ പ്രസിദ്ധീകരിച്ച പ്രബന്ധത്തിൽ അലൻ ട്യൂറിങ് 'യന്ത്രങ്ങൾക്ക് ചിന്തിക്കാനാകുമോ?' എന്ന ചോദ്യത്തിന് പകരമായി 'ഇമിറ്റേഷൻ ഗെയിം' (ട്യൂറിങ് ടെസ്റ്റ്) എന്ന പരീക്ഷണ രീതി അവതരിപ്പിച്ചു."
            },
            {
              "en": "The Turing Test involves a human interrogator communicating via text terminal with two concealed entities (a human and a computer) attempting to determine which is which.",
              "mal": "ട്യൂറിങ് ടെസ്റ്റിൽ ഒരു മനുഷ്യ ന്യായാധിപൻ രഹസ്യമായിരിക്കുന്ന ഒരു മനുഷ്യനോടും കമ്പ്യൂട്ടറിനോടും ടെക്സ്റ്റ് വഴി സംസാരിക്കുകയും അതിൽ ആരാണ് കമ്പ്യൂട്ടർ എന്ന് തിരിച്ചറിയാൻ ശ്രമിക്കുകയും ചെയ്യുന്നു."
            },
            {
              "en": "If the computer successfully misleads the human judge into believing it is the human at a rate comparable to a real person, it is deemed to possess operational human-level intelligence.",
              "mal": "കമ്പ്യൂട്ടറിന് മനുഷ്യനെപ്പോലെ സംസാരിച്ച് ന്യായാധിപനെ തെറ്റിദ്ധരിപ്പിക്കാൻ സാധിച്ചാൽ, അതിന് ബുദ്ധിശക്തിയുണ്ടെന്ന് കണക്കാക്കാം."
            },
            {
              "en": "Philosophical criticisms of the Turing Test note that behavioral imitation does not necessarily prove inner conscious awareness, intentionality, or genuine understanding.",
              "mal": "പെരുമാറ്റത്തിൽ മനുഷ്യനെ അനുകരിച്ചതുകൊണ്ട് മാത്രം യന്ത്രത്തിന് യഥാർത്ഥ ആന്തരിക ബോധമോ ഗ്രഹണശക്തിയോ ഉണ്ടെന്ന് തെളിയുന്നില്ലെന്ന് തത്ത്വചിന്തകർ വാദിക്കുന്നു."
            }
          ]
        },
        {
          "badge": "Part 3",
          "title": "Weak AI vs. Strong AI & Narrow vs. General Intelligence",
          "titleMal": "വീക്ക് AI vs സ്ട്രോങ് AI; നാരോ AI vs ജനറൽ AI",
          "points": [
            {
              "en": "Weak AI (Narrow AI) refers to systems engineered to excel at specific circumscribed tasks (such as chess playing, facial recognition, or web search) without genuine understanding or consciousness.",
              "mal": "വീക്ക് AI (നാരോ AI): പ്രത്യേക ലക്ഷ്യങ്ങൾ മാത്രം (ഉദാ: ചെസ്സ് കളി, മുഖം തിരിച്ചറിയൽ) അതിവിദഗ്ദ്ധമായി നിർവഹിക്കുന്ന സംവിധാനങ്ങളാണ്; ഇവയ്ക്ക് ആത്മബോധമില്ല."
            },
            {
              "en": "Strong AI (Artificial General Intelligence - AGI) envisions an artificial mind possessing general cognitive abilities matching or surpassing human beings across all intellectual domains.",
              "mal": "സ്ട്രോങ് AI (AGI): മനുഷ്യന്റെ എല്ലാവിധ ബൗദ്ധിക മേഖലകളിലും സ്വതന്ത്രമായി ചിന്തിക്കാനും തീരുമാനമെടുക്കാനും കഴിവുള്ള യഥാർത്ഥ കൃത്രിമ മനസ്സ്."
            },
            {
              "en": "All modern existing technologies (including Large Language Models, autonomous driving, and computer vision) belong strictly to the category of Weak/Narrow AI.",
              "mal": "ഇന്ന് നിലവിലുള്ള എല്ലാ AI സാങ്കേതികവിദ്യകളും (ചാറ്റ്ബോട്ടുകൾ, ഓട്ടോണമസ് കാറുകൾ) വീക്ക് AI എന്ന വിഭാഗത്തിലാണ് ഉൾപ്പെടുന്നത്."
            }
          ]
        },
        {
          "badge": "Part 4",
          "title": "Epistemological Scope of Philosophy of AI",
          "titleMal": "AI തത്ത്വചിന്തയുടെ ജ്ഞാനശാസ്ത്രപരമായ വ്യാപ്തി",
          "points": [
            {
              "en": "Philosophy of AI investigates fundamental ontological and epistemological questions: What is mind? What is knowledge? Can computation capture intentionality?",
              "mal": "മനസ്സ് എന്നാൽ എന്താണ്? അറിവ് എങ്ങനെ രൂപപ്പെടുന്നു? കമ്പ്യൂട്ടറുകൾക്ക് ലക്ഷ്യബോധം ഉണ്ടാകുമോ? എന്നീ അടിസ്ഥാനപരമായ ചോദ്യങ്ങളാണ് ഈ വിഷയം പരിശോധിക്കുന്നത്."
            },
            {
              "en": "It bridges cognitive science, neurobiology, formal mathematical logic, and moral philosophy to analyze the implications of artificial agents in human society.",
              "mal": "കോഗ്നിറ്റീവ് സയൻസ്, ന്യൂറോബയോളജി, ഗണിതശാസ്ത്ര യുക്തി, ധാർമ്മിക തത്ത്വചിന്ത എന്നിവയെ സംയോജിപ്പിച്ച് ഇത് മനുഷ്യസമൂഹത്തിൽ AI ഉണ്ടാക്കുന്ന സ്വാധീനത്തെ പഠിക്കുന്നു."
            }
          ]
        }
      ],
      "coreConcepts": [
        {
          "term": "Artificial Intelligence (AI)",
          "termMal": "കൃത്രിമ ബുദ്ധി",
          "def": "The branch of computer science dedicated to building machines capable of performing tasks typically requiring human intelligence.",
          "defMal": "മനുഷ്യന്റെ ബുദ്ധിശക്തി ആവശ്യമായി വരുന്ന ജോലികൾ സ്വയം നിർവഹിക്കാൻ കഴിയുന്ന യന്ത്രങ്ങളെ വികസിപ്പിക്കുന്ന കമ്പ്യൂട്ടർ ശാസ്ത്ര ശാഖ."
        },
        {
          "term": "Turing Test",
          "termMal": "ട്യൂറിങ് ടെസ്റ്റ്",
          "def": "A behavioral benchmark proposed by Alan Turing (1950) evaluating whether a machine can exhibit conversational indistinguishability from a human.",
          "defMal": "ഒരു യന്ത്രത്തിന്റെ സംഭാഷണ രീതി മനുഷ്യനിൽ നിന്ന് വേർതിരിച്ചറിയാൻ കഴിയില്ലേ എന്ന് പരിശോധിക്കാൻ അലൻ ട്യൂറിങ് അവതരിപ്പിച്ച പരീക്ഷണം."
        },
        {
          "term": "Weak AI",
          "termMal": "വീക്ക് AI",
          "def": "AI systems designed and trained for a specific task without sentience, consciousness, or broad cognitive versatility.",
          "defMal": "ബോധമോ വികാരങ്ങളോ ഇല്ലാതെ നിർദ്ദിഷ്ട ലക്ഷ്യങ്ങൾക്കായി മാത്രം നിർമ്മിക്കപ്പെട്ട AI സംവിധാനങ്ങൾ."
        },
        {
          "term": "Dartmouth Conference (1956)",
          "termMal": "ഡാർട്ട്മൗത്ത് കോൺഫറൻസ് (1956)",
          "def": "The historic workshop organized by John McCarthy where the term 'Artificial Intelligence' was officially coined.",
          "defMal": "ജോൺ മക്കാർത്തിയുടെ നേതൃത്വത്തിൽ 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്' എന്ന പേര് ആദ്യമായി ഉപയോഗിച്ച ചരിത്രപ്രസിദ്ധമായ സമ്മേളനം."
        }
      ],
      "keyMetrics": [
        {
          "label": "Birth of AI",
          "value": "1956",
          "detail": "Dartmouth Summer Research Project founded the academic field of AI."
        },
        {
          "label": "Turing Paper",
          "value": "1950",
          "detail": "Alan Turing published 'Computing Machinery and Intelligence'."
        },
        {
          "label": "Father of AI",
          "value": "John McCarthy",
          "detail": "Coined the term and pioneered LISP programming language for AI."
        }
      ],
      "examTakeaways": [
        {
          "en": "The Dartmouth Workshop of 1956 is universally recognized as the official birthplace of Artificial Intelligence as an academic discipline.",
          "mal": "1956-ലെ ഡാർട്ട്മൗത്ത് വർക്ക്ഷോപ്പാണ് ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിന്റെ ഔദ്യോഗിക ജന്മസ്ഥലമായി അംഗീകരിക്കപ്പെടുന്നത്."
        },
        {
          "en": "Alan Turing replaced metaphysical debates on 'thinking' with an empirical operational test (The Imitation Game).",
          "mal": "'ചിന്ത' എന്ന അവ്യക്തമായ വാക്കിന് പകരം അലൻ ട്യൂറിങ് അനുഭവവേദ്യമായ ഒരു പരീക്ഷണ രീതി (ഇമിറ്റേഷൻ ഗെയിം) മുന്നോട്ടുവെച്ചു."
        },
        {
          "en": "Weak AI excels at isolated narrow domains, whereas Strong AI aspires to human-equivalent generalized cognitive understanding.",
          "mal": "വീക്ക് AI പ്രത്യേക മേഖലകളിൽ മാത്രം മികവ് പുലർത്തുമ്പോൾ, സ്ട്രോങ് AI മനുഷ്യന് തുല്യമായ സമഗ്ര ബുദ്ധിയെ ലക്ഷ്യമിടുന്നു."
        },
        {
          "en": "Aristotle's syllogisms and Boole's algebra provided the essential logical foundation for machine computation.",
          "mal": "അരിസ്റ്റോട്ടിലിന്റെ ന്യായവാദങ്ങളും ബൂളിയൻ ആൾജിബ്രയുമാണ് കമ്പ്യൂട്ടർ പ്രോഗ്രാമിങ്ങിന്റെ ഗണിത അടിത്തറ."
        }
      ]
    },
    "quizPool": [
      {
        "question": "In which historic year and workshop was the academic discipline of 'Artificial Intelligence' officially established and named?",
        "questionMal": "ഏത് വർഷത്തിൽ, ഏത് ചരിത്രപ്രസിദ്ധമായ വർക്ക്ഷോപ്പിലാണ് 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്' എന്ന ശാഖ ഔദ്യോഗികമായി നാമകരണം ചെയ്യപ്പെട്ടത്?",
        "options": [
          {
            "en": "1945 at Harvard University",
            "mal": "1945-ൽ ഹാർവാർഡ് സർവകലാശാലയിൽ"
          },
          {
            "en": "1956 at the Dartmouth Summer Research Project",
            "mal": "1956-ൽ ഡാർട്ട്മൗത്ത് സമ്മേളനത്തിൽ"
          },
          {
            "en": "1969 at Stanford Research Institute",
            "mal": "1969-ൽ സ്റ്റാൻഫോർഡ് ഇൻസ്റ്റിറ്റ്യൂട്ടിൽ"
          },
          {
            "en": "1980 at Oxford University",
            "mal": "1980-ൽ ഓക്സ്ഫോർഡ് സർവകലാശാലയിൽ"
          }
        ],
        "answer": 1,
        "explanation": "The term 'Artificial Intelligence' was coined by John McCarthy at the Dartmouth Summer Research Project on Artificial Intelligence held at Dartmouth College in 1956.",
        "explanationMal": "1956-ൽ ഡാർട്ട്മൗത്ത് കോളേജിൽ നടന്ന സമ്മേളനത്തിൽ ജോൺ മക്കാർത്തിയാണ് 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്' എന്ന പദം ആദ്യമായി നിർദ്ദേശിച്ചത്."
      },
      {
        "question": "Who formulated the famous 'Imitation Game' in 1950 as an empirical test of machine intelligence?",
        "questionMal": "1950-ൽ യന്ത്രങ്ങളുടെ ബുദ്ധി അളക്കുന്നതിനായി 'ഇമിറ്റേഷൻ ഗെയിം' (ട്യൂറിങ് ടെസ്റ്റ്) ആവിഷ്കരിച്ചത് ആര്?",
        "options": [
          {
            "en": "Norbert Wiener",
            "mal": "നോർബർട്ട് വീനർ"
          },
          {
            "en": "Alan Turing",
            "mal": "അലൻ ട്യൂറിങ്"
          },
          {
            "en": "John von Neumann",
            "mal": "ജോൺ വോൺ ന്യൂമാൻ"
          },
          {
            "en": "Claude Shannon",
            "mal": "ക്ലോഡ് ഷാനൻ"
          }
        ],
        "answer": 1,
        "explanation": "Alan Turing proposed the Imitation Game in his seminal 1950 paper 'Computing Machinery and Intelligence' to determine whether a machine could converse indistinguishably from a human.",
        "explanationMal": "1950-ൽ 'കമ്പ്യൂട്ടിംഗ് മെഷിനറി ആൻഡ് ഇന്റലിജൻസ്' എന്ന പ്രബന്ധത്തിലൂടെ അലൻ ട്യൂറിങ്ങാണ് ഈ പരീക്ഷണം അവതരിപ്പിച്ചത്."
      },
      {
        "question": "What is the primary operational mechanism of the classical Turing Test?",
        "questionMal": "പരമ്പരാഗത ട്യൂറിങ് ടെസ്റ്റിന്റെ പ്രധാന പ്രവർത്തന രീതി എന്താണ്?",
        "options": [
          {
            "en": "A human judge communicates via text terminal with a hidden human and a machine to identify which is the machine",
            "mal": "മറഞ്ഞിരിക്കുന്ന മനുഷ്യനോടും കമ്പ്യൂട്ടറിനോടും ടെക്സ്റ്റ് വഴി സംസാരിച്ച് ഏതാണ് യന്ത്രമെന്ന് തിരിച്ചറിയാൻ മനുഷ്യൻ ശ്രമിക്കുന്നു"
          },
          {
            "en": "Measuring the electrical processing speed of a microchip",
            "mal": "മൈക്രോചിപ്പുകളുടെ പ്രോസസ്സിംഗ് വേഗത അളക്കൽ"
          },
          {
            "en": "A physical chess tournament between grandmasters and robots",
            "mal": "മനുഷ്യരും റോബോട്ടുകളും തമ്മിലുള്ള നേരിട്ടുള്ള ചെസ്സ് മത്സരം"
          },
          {
            "en": "A mathematical proof calculated by an analog mechanical calculator",
            "mal": "അനലോഗ് കാൽക്കുലേറ്ററിലെ ഗണിത സമവാക്യം തെളിയിക്കൽ"
          }
        ],
        "answer": 0,
        "explanation": "The Turing Test relies strictly on natural language textual interaction between an interrogator and two unseen subjects to evaluate cognitive behavioral equivalence.",
        "explanationMal": "രഹസ്യമായിരിക്കുന്ന രണ്ട് പേരോട് ടെക്സ്റ്റ് വഴി സംസാരിച്ച് അതിൽ ഏതാണ് കമ്പ്യൂട്ടറെന്ന് ഒരു മനുഷ്യൻ വിലയിരുത്തുന്ന രീതിയാണിത്."
      },
      {
        "question": "Which category best describes all currently deployed AI technologies such as ChatGPT, Siri, and self-driving cars?",
        "questionMal": "ഇന്ന് നിലവിലുള്ള ChatGPT, സിരി, സ്വയം നിയന്ത്രിത കാറുകൾ തുടങ്ങിയ എല്ലാ AI സാങ്കേതികവിദ്യകളും ഏത് വിഭാഗത്തിൽ പെടുന്നു?",
        "options": [
          {
            "en": "Weak AI (Narrow AI)",
            "mal": "വീക്ക് AI (നാരോ AI)"
          },
          {
            "en": "Strong AI (Artificial General Intelligence)",
            "mal": "സ്ട്രോങ് AI (ജനറൽ AI)"
          },
          {
            "en": "Superintelligent Conscious AI",
            "mal": "ബോധമുള്ള സൂപ്പർ ഇന്റലിജൻസ്"
          },
          {
            "en": "Omniscient Quantum AI",
            "mal": "ക്വാണ്ടം സർവ്വജ്ഞാന AI"
          }
        ],
        "answer": 0,
        "explanation": "All present AI tools are Narrow/Weak AI because they are programmed for designated functions without true self-awareness or general cross-domain understanding.",
        "explanationMal": "ഇവയെല്ലാം പ്രത്യേക ആവശ്യങ്ങൾക്കായി നിർമ്മിക്കപ്പെട്ടവയായതിനാൽ 'വീക്ക് AI' അഥവാ 'നാരോ AI' എന്ന വിഭാഗത്തിലാണ് പെടുന്നത്."
      },
      {
        "question": "Which ancient philosopher is credited with developing formal syllogistic logic, the earliest precursor of symbolic reasoning?",
        "questionMal": "പ്രതീകാത്മക യുക്തിചിന്തയുടെ ആദ്യരൂപമായ 'സിലോഗിസ്റ്റിക് ലോജിക്' വികസിപ്പിച്ച പുരാതന ഗ്രീക്ക് തത്ത്വചിന്തകൻ ആര്?",
        "options": [
          {
            "en": "Plato",
            "mal": "പ്ലേറ്റോ"
          },
          {
            "en": "Aristotle",
            "mal": "അരിസ്റ്റോട്ടിൽ"
          },
          {
            "en": "Socrates",
            "mal": "സോക്രട്ടീസ്"
          },
          {
            "en": "Pythagoras",
            "mal": "പൈതഗോറസ്"
          }
        ],
        "answer": 1,
        "explanation": "Aristotle developed syllogistic logic (e.g., 'All humans are mortal; Socrates is human; therefore Socrates is mortal'), laying the systematic groundwork for mechanical deductive reasoning.",
        "explanationMal": "അരിസ്റ്റോട്ടിലിന്റെ ന്യായയുക്തിചിന്തകളാണ് (Syllogisms) ചിന്തയെ നിയമങ്ങളിലൂടെ വിശകലനം ചെയ്യുന്ന രീതിക്ക് തുടക്കമിട്ടത്."
      },
      {
        "question": "What mathematical breakthrough developed by George Boole in 1854 became foundational for modern binary computer architecture?",
        "questionMal": "1854-ൽ ജോർജ്ജ് ബൂൾ വികസിപ്പിച്ച ഏത് ഗണിത ശാഖയാണ് ആധുനിക കമ്പ്യൂട്ടറുകളുടെ ബൈനറി ഘടനയ്ക്ക് അടിത്തറയായത്?",
        "options": [
          {
            "en": "Calculus",
            "mal": "കാൽക്കുലസ്"
          },
          {
            "en": "Boolean Algebra",
            "mal": "ബൂളിയൻ ആൾജിബ്ര"
          },
          {
            "en": "Trigonometry",
            "mal": "ത്രികോണമിതി"
          },
          {
            "en": "Euclidean Geometry",
            "mal": "യൂക്ലിഡിയൻ ജ്യാമിതി"
          }
        ],
        "answer": 1,
        "explanation": "George Boole created Boolean Algebra, reducing logical propositions to algebraic binary values of 1 (True) and 0 (False), utilized in digital circuits.",
        "explanationMal": "സത്യവും മിഥ്യയും 1, 0 എന്നീ ബൈനറി മൂല്യങ്ങളിലൂടെ യുക്തിപരമായി വിശകലനം ചെയ്യുന്ന ബൂളിയൻ ആൾജിബ്രയാണ് കമ്പ്യൂട്ടറുകളുടെ അടിസ്ഥാനം."
      },
      {
        "question": "What was the overarching ambition of Gottfried Wilhelm Leibniz's 'Characteristica Universalis'?",
        "questionMal": "ഗോട്ട്ഫ്രൈഡ് ലെബ്നിസിന്റെ 'കാരക്ടറിസ്റ്റിക് യൂണിവേഴ്സാലിസ്' എന്ന സങ്കല്പത്തിന്റെ പ്രധാന ലക്ഷ്യം എന്തായിരുന്നു?",
        "options": [
          {
            "en": "A universal conceptual language allowing all human reasoning to be settled through mechanical calculation",
            "mal": "എല്ലാ മനുഷ്യ ചിന്തകളെയും കണക്കുകൂട്ടലിലൂടെ പരിഹരിക്കാൻ കഴിയുന്ന ഒരു സാർവ്വത്രിക ഭാഷ"
          },
          {
            "en": "A manual printing press designed for religious scripture",
            "mal": "മതഗ്രന്ഥങ്ങൾ അച്ചടിക്കാനുള്ള പ്രസ്സ്"
          },
          {
            "en": "A steam engine to pump water from coal mines",
            "mal": "കൽക്കരി ഖനികളിലെ നീരാവി യന്ത്രം"
          },
          {
            "en": "A telescope for charting planetary orbits",
            "mal": "ഗ്രഹങ്ങളുടെ സഞ്ചാരം നിരീക്ഷിക്കാനുള്ള ദൂരദർശിനി"
          }
        ],
        "answer": 0,
        "explanation": "Leibniz envisioned a formal universal language (Characteristica Universalis) and an inference engine (Calculus Ratiocinator) where disputes could be solved by stating: 'Let us calculate!'",
        "explanationMal": "ഏത് തർക്കവും 'നമുക്കിത് കണക്കുകൂട്ടി തീർക്കാം' എന്ന് പറഞ്ഞ് ചിട്ടയായ രീതിയിൽ പരിഹരിക്കാവുന്ന ഭാഷയായിരുന്നു ലെബ്നിസിന്റെ ലക്ഷ്യം."
      },
      {
        "question": "Which of the following researchers was NOT one of the primary organizers of the 1956 Dartmouth Summer Workshop on AI?",
        "questionMal": "1956-ലെ ഡാർട്ട്മൗത്ത് AI വർക്ക്ഷോപ്പിന്റെ മുഖ്യ സംഘാടകരിൽ ഉൾപ്പെടാത്ത വ്യക്തി ആര്?",
        "options": [
          {
            "en": "John McCarthy",
            "mal": "ജോൺ മക്കാർത്തി"
          },
          {
            "en": "Marvin Minsky",
            "mal": "മാർവിൻ മിൻസ്കി"
          },
          {
            "en": "Sigmund Freud",
            "mal": "സിഗ്മണ്ട് ഫ്രോയിഡ്"
          },
          {
            "en": "Claude Shannon",
            "mal": "ക്ലോഡ് ഷാനൻ"
          }
        ],
        "answer": 2,
        "explanation": "The 1956 Dartmouth proposal was authored by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon; Sigmund Freud was a psychoanalyst who died in 1939.",
        "explanationMal": "ഡാർട്ട്മൗത്ത് വർക്ക്ഷോപ്പ് സംഘടിപ്പിച്ചത് ജോൺ മക്കാർത്തി, മാർവിൻ മിൻസ്കി, നഥാനിയൽ റോച്ചെസ്റ്റർ, ക്ലോഡ് ഷാനൻ എന്നിവരാണ്; ഫ്രോയിഡ് ഇതിൽ ഉൾപ്പെടുന്നില്ല."
      },
      {
        "question": "What is the key defining feature of 'Strong AI' (Artificial General Intelligence)?",
        "questionMal": "'സ്ട്രോങ് AI' (Artificial General Intelligence) എന്നതിന്റെ പ്രധാന സവിശേഷത എന്താണ്?",
        "options": [
          {
            "en": "Possessing general human-level cognitive capabilities across multiple domains, including reasoning and consciousness",
            "mal": "മനുഷ്യനെപ്പോലെ വിവിധ മേഖലകളിൽ സ്വതന്ത്രമായി ചിന്തിക്കാനും തീരുമാനങ്ങളെടുക്കാനുമുള്ള പൊതുവായ ബുദ്ധിശക്തി"
          },
          {
            "en": "Ability to calculate large spreadsheet numbers very fast",
            "mal": "വലിയ കണക്കുകൾ അതിവേഗം കൂട്ടാനുള്ള കഴിവ്"
          },
          {
            "en": "Having heavy metal casing and titanium chassis",
            "mal": "ശക്തമായ ലോഹ നിർമ്മിതമായ ശരീരം"
          },
          {
            "en": "Consuming excessive electrical power during standby",
            "mal": "കൂടുതൽ വൈദ്യുതി ഉപയോഗിക്കൽ"
          }
        ],
        "answer": 0,
        "explanation": "Strong AI refers to a machine with genuine conscious intelligence capable of transferring learning, abstract thinking, and problem-solving across all intellectual domains.",
        "explanationMal": "മനുഷ്യനെപ്പോലെ സമഗ്രമായ എല്ലാ ബൗദ്ധിക മേഖലകളിലും ചിന്തിക്കാനും പുതിയ സാഹചര്യങ്ങളെ അഭിമുഖീകരിക്കാനും കഴിയുന്ന യഥാർത്ഥ കൃത്രിമ മനസ്സാണിത്."
      },
      {
        "question": "What major philosophical criticism is frequently leveled against using the Turing Test as proof of true thought?",
        "questionMal": "ട്യൂറിങ് ടെസ്റ്റ് യഥാർത്ഥ ചിന്തയുടെ തെളിവല്ല എന്ന് വിമർശകർ വാദിക്കുന്നത് എന്തുകൊണ്ട്?",
        "options": [
          {
            "en": "Text imitation of human conversation does not prove underlying intentionality, understanding, or subjective consciousness",
            "mal": "സംഭാഷണത്തിൽ മനുഷ്യനെ അനുകരിച്ചതുകൊണ്ട് മാത്രം യന്ത്രത്തിന് യഥാർത്ഥ ബോധമോ അർത്ഥഗ്രഹണമോ ഉണ്ടെന്ന് തെളിയുന്നില്ല"
          },
          {
            "en": "Keyboards are too old-fashioned to test modern computers",
            "mal": "കീബോർഡുകൾ പഴയ സാങ്കേതികവിദ്യയാണ്"
          },
          {
            "en": "Computers refuse to answer questions about mathematics",
            "mal": "കമ്പ്യൂട്ടറുകൾ കണക്ക് സംബന്ധിച്ച ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുന്നില്ല"
          },
          {
            "en": "Judges are not allowed to drink coffee during the test",
            "mal": "പരീക്ഷണ സമയത്ത് ന്യായാധിപന്മാർക്ക് ചായ നൽകുന്നില്ല"
          }
        ],
        "answer": 0,
        "explanation": "Philosophers like John Searle argue that behavioral simulation (syntactic manipulation) does not equal genuine understanding, mental states, or consciousness (semantics).",
        "explanationMal": "മനുഷ്യന്റെ ബാഹ്യ പെരുമാറ്റം അനുകരിക്കാൻ കഴിഞ്ഞാലും യന്ത്രത്തിന് ആന്തരികമായ അർത്ഥബോധമോ അനുഭവങ്ങളോ ഉണ്ടാകണമെന്നില്ലെന്ന് തത്ത്വചിന്തകർ ചൂണ്ടിക്കാണിക്കുന്നു."
      },
      {
        "question": "Which programming language was developed by John McCarthy in 1958 specifically for Artificial Intelligence research?",
        "questionMal": "1958-ൽ AI ഗവേഷണങ്ങൾക്കായി ജോൺ മക്കാർത്തി വികസിപ്പിച്ച പ്രോഗ്രാമിങ് ഭാഷ ഏതാണ്?",
        "options": [
          {
            "en": "LISP (List Processing)",
            "mal": "ലിസ്പ് (LISP)"
          },
          {
            "en": "COBOL",
            "mal": "കൊബോൾ (COBOL)"
          },
          {
            "en": "HTML",
            "mal": "എച്ച്ടിഎംഎൽ (HTML)"
          },
          {
            "en": "BASIC",
            "mal": "ബേസിക് (BASIC)"
          }
        ],
        "answer": 0,
        "explanation": "John McCarthy developed LISP in 1958, which became the standard language for symbolic artificial intelligence research for decades.",
        "explanationMal": "സിംബോളിക് AI ഗവേഷണങ്ങൾക്കായി 1958-ൽ ജോൺ മക്കാർത്തി വികസിപ്പിച്ച ഭാഷയാണ് ലിസ്പ് (LISP)."
      },
      {
        "question": "In the Turing Test, how is communication structured between the interrogator and the hidden entities?",
        "questionMal": "ട്യൂറിങ് ടെസ്റ്റിൽ ന്യായാധിപനും മറഞ്ഞിരിക്കുന്നവരും തമ്മിലുള്ള ആശയവിനിമയം എങ്ങനെയാണ് നടക്കുന്നത്?",
        "options": [
          {
            "en": "Through typed text messages to avoid physical appearance and voice clues",
            "mal": "ശബ്ദവും ശരീരഭാഷയും തിരിച്ചറിയാതിരിക്കാൻ ടൈപ്പ് ചെയ്ത സന്ദേശങ്ങൾ വഴി മാത്രം"
          },
          {
            "en": "Direct face-to-face spoken debate",
            "mal": "നേർക്കുനേരെയുള്ള സംവാദം"
          },
          {
            "en": "Arm wrestling competition",
            "mal": "കൈക്കരുത്ത് തെളിയിക്കുന്ന കായിക മത്സരം"
          },
          {
            "en": "Telepathic mental projection",
            "mal": "മനസ്സുകൾ തമ്മിലുള്ള ടെലിപതി"
          }
        ],
        "answer": 0,
        "explanation": "Turing specifically stipulated text-based terminal interaction so that physical appearance, tone of voice, or mechanical sounds would not bias the judge's assessment.",
        "explanationMal": "ശബ്ദമോ രൂപമോ കണ്ട് തിരിച്ചറിയാതിരിക്കാൻ വേണ്ടിയാണ് ടെക്സ്റ്റ് സന്ദേശങ്ങൾ വഴിയുള്ള ആശയവിനിമയം ട്യൂറിങ് നിഷ്കർഷിച്ചത്."
      },
      {
        "question": "What philosophical discipline examines the nature, origin, and limits of knowledge, central to AI epistemology?",
        "questionMal": "അറിവിന്റെ സ്വഭാവം, ഉത്ഭവം, പരിധികൾ എന്നിവയെക്കുറിച്ച് പഠിക്കുന്ന തത്ത്വചിന്താ ശാഖ ഏതാണ്?",
        "options": [
          {
            "en": "Epistemology",
            "mal": "ജ്ഞാനശാസ്ത്രം (Epistemology)"
          },
          {
            "en": "Aesthetics",
            "mal": "സൗന്ദര്യശാസ്ത്രം (Aesthetics)"
          },
          {
            "en": "Numismatics",
            "mal": "നാണയപഠനം (Numismatics)"
          },
          {
            "en": "Meteorology",
            "mal": "കാലാവസ്ഥാ ശാസ്ത്രം (Meteorology)"
          }
        ],
        "answer": 0,
        "explanation": "Epistemology is the philosophical study of knowledge; in AI, it investigates whether algorithms can possess genuine knowledge or mere data patterns.",
        "explanationMal": "അറിവിനെക്കുറിച്ചുള്ള തത്ത്വചിന്താ ശാഖയാണ് ജ്ഞാനശാസ്ത്രം; യന്ത്രങ്ങൾക്ക് യഥാർത്ഥ അറിവുണ്ടോ അതോ വെറും വിവരങ്ങളാണോ ഉള്ളതെന്ന് ഇത് പരിശോധിക്കുന്നു."
      },
      {
        "question": "Which early AI program developed in 1956 by Allen Newell and Herbert Simon is celebrated as the first artificial intelligence program?",
        "questionMal": "1956-ൽ അലൻ നെവലും ഹെർബർട്ട് സൈമണും ചേർന്ന് വികസിപ്പിച്ച ആദ്യത്തെ AI പ്രോഗ്രാം ഏതാണ്?",
        "options": [
          {
            "en": "Logic Theorist",
            "mal": "ലോജിക് തിയറിസ്റ്റ് (Logic Theorist)"
          },
          {
            "en": "Deep Blue",
            "mal": "ഡീപ് ബ്ലൂ (Deep Blue)"
          },
          {
            "en": "AlphaGo",
            "mal": "ആൽഫാഗോ (AlphaGo)"
          },
          {
            "en": "ChatGPT",
            "mal": "ചാറ്റ്ജിപിടി (ChatGPT)"
          }
        ],
        "answer": 0,
        "explanation": "The Logic Theorist, developed by Newell, Shaw, and Simon, proved mathematical theorems from Whitehead and Russell's Principia Mathematica and is widely recognized as the first AI program.",
        "explanationMal": "ഗണിത സമവാക്യങ്ങൾ സ്വയം തെളിയിച്ച ലോജിക് തിയറിസ്റ്റാണ് ചരിത്രത്തിലെ ആദ്യത്തെ AI പ്രോഗ്രാമായി കണക്കാക്കപ്പെടുന്നത്."
      },
      {
        "question": "What is the primary philosophical implication of defining AI through functional behavior rather than biological substrate?",
        "questionMal": "ബുദ്ധിയെ ജൈവികമായ തലച്ചോറിലല്ല, മറിച്ച് അതിന്റെ പ്രവർത്തനങ്ങളിലാണ് നിർവചിക്കുന്നത് എന്നതിന്റെ തത്ത്വചിന്താപരമായ ഫലം എന്താണ്?",
        "options": [
          {
            "en": "Intelligence is substrate-independent; minds can potentially be realized in silicon just as in carbon-based brains",
            "mal": "ബുദ്ധി എന്നത് ജൈവകോശങ്ങളിൽ മാത്രമല്ല, സിലിക്കൺ ചിപ്പുകളിലും ഉണ്ടാകാൻ സാധ്യതയുണ്ട് (സബ്സ്ട്രേറ്റ് ഇൻഡിപെൻഡൻസ്)"
          },
          {
            "en": "Machines can only become intelligent if made of human skin and bone",
            "mal": "മനുഷ്യ ശരീര ഭാഗങ്ങൾ ഉണ്ടെങ്കിൽ മാത്രമേ യന്ത്രങ്ങൾക്ക് ബുദ്ധിയുണ്ടാകൂ"
          },
          {
            "en": "Computers will forever be restricted to calculating grocery receipts",
            "mal": "കമ്പ്യൂട്ടറുകൾക്ക് ഒരിക്കലും സങ്കീർണ്ണ കാര്യങ്ങൾ ചെയ്യാൻ കഴിയില്ല"
          },
          {
            "en": "Biology is completely irrelevant to medicine",
            "mal": "ജീവശാസ്ത്രം അപ്രസക്തമാണ്"
          }
        ],
        "answer": 0,
        "explanation": "Functionalism posits that mental states are defined by what they do rather than what they are made of, implying intelligence is 'substrate-independent' and can exist in computational hardware.",
        "explanationMal": "ഒരു സിസ്റ്റം എങ്ങനെ പ്രവർത്തിക്കുന്നു എന്നതിലാണ് ബുദ്ധി സ്ഥിതി ചെയ്യുന്നത്; അതിനാൽ മനുഷ്യ മസ്തിഷ്കത്തിന് പുറമെ കമ്പ്യൂട്ടറുകളിലും കൃത്രിമ മനസ്സ് സാധ്യമാണെന്ന സിദ്ധാന്തമാണിത്."
      }
    ]
  },
  "ai_mod_2": {
    "title": "Module 2 · Classical Version of Artificial Intelligence",
    "titleMal": "മൊഡ്യൂൾ 2 · പരമ്പരാഗത ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് മാതൃക",
    "filename": "Module_2_Classical_Version_of_Artificial_Intelligence.pdf",
    "summary": {
      "overview": "Rigorous investigation into the classical paradigm of AI, known as Good Old-Fashioned AI (GOFAI) and Symbolic Artificial Intelligence. Focuses on the Physical Symbol System Hypothesis (Allen Newell & Herbert Simon), John Searle's seminal Chinese Room Argument distinguishing syntax from semantics, René Descartes' mind-body dualism, and phenomenological critiques of disembodied intelligence (Hubert Dreyfus).",
      "overviewMal": "സിംബോളിക് AI അഥവാ ഗുഡ് ഓൾഡ് ഫാഷൻഡ് AI (GOFAI) എന്ന പരമ്പരാഗത AI മാതൃകയെക്കുറിച്ചുള്ള വിശദമായ പഠനം. ഫിസിക്കൽ സിംബൽ സിസ്റ്റം ഹൈപ്പോതെസിസ്, സിന്റാക്സും സെമാന്റിക്സും തമ്മിലുള്ള വ്യത്യാസം വ്യക്തമാക്കുന്ന ജോൺ സിയേളിന്റെ ചൈനീസ് റൂം വാദം, റെനെ ദെക്കാർത്തിന്റെ മൈൻഡ്-ബോഡി ഡ്യുവലിസം, ഹ്യൂബർട്ട് ഡ്രെയ്ഫസിന്റെ ശരീരാധിഷ്ഠിത ബുദ്ധി സിദ്ധാന്തം എന്നിവ ഇതിൽ പരിശോധിക്കുന്നു.",
      "sections": [
        {
          "badge": "Part 1",
          "title": "GOFAI & The Physical Symbol System Hypothesis",
          "titleMal": "GOFAI-യും ഫിസിക്കൽ സിംബൽ സിസ്റ്റം സിദ്ധാന്തവും",
          "points": [
            {
              "en": "Good Old-Fashioned AI (GOFAI), coined by philosopher John Haugeland, views cognition as formal symbolic manipulation based on explicitly programmed rules and logic.",
              "mal": "ചിന്ത എന്നത് കൃത്യമായ നിയമങ്ങൾക്ക് അനുസൃതമായി ചിഹ്നങ്ങളെ (symbols) കൈകാര്യം ചെയ്യലാണെന്ന സിദ്ധാന്തമാണ് ഗുഡ് ഓൾഡ് ഫാഷൻഡ് AI (GOFAI)."
            },
            {
              "en": "Newell and Simon proposed the Physical Symbol System Hypothesis (PSSH): 'A physical symbol system has the necessary and sufficient means for general intelligent action.'",
              "mal": "നെവലും സൈമണും അവതരിപ്പിച്ച സിദ്ധാന്തപ്രകാരം: ഭൗതികമായ ഒരു ചിഹ്ന വ്യവസ്ഥയ്ക്ക് ബുദ്ധിപരമായ പ്രവർത്തനങ്ങൾ നടത്താൻ ആവശ്യമായ എല്ലാ ഘടകങ്ങളുമുണ്ട്."
            },
            {
              "en": "Under this classical paradigm, thinking is equivalent to computing, knowledge is represented as symbolic sentences, and problem solving is heuristic search through symbolic states.",
              "mal": "ഇതനുസരിച്ച് ചിന്ത എന്നാൽ കണക്കുകൂട്ടലാണ്; അറിവ് എന്നത് ചിഹ്നങ്ങളാൽ ക്രമീകരിക്കപ്പെട്ട വാക്യങ്ങളാണ്."
            }
          ]
        },
        {
          "badge": "Part 2",
          "title": "John Searle’s Chinese Room Argument: Syntax vs. Semantics",
          "titleMal": "ജോൺ സിയേളിന്റെ ചൈനീസ് റൂം വാദം: സിന്റാക്സും സെമാന്റിക്സും",
          "points": [
            {
              "en": "In 1980, philosopher John Searle introduced the famous 'Chinese Room Thought Experiment' to refute the claim of Strong AI that a computer running a program understands natural language.",
              "mal": "കമ്പ്യൂട്ടർ ഒരു പ്രോഗ്രാം പ്രവർത്തിപ്പിക്കുന്നത് കൊണ്ട് മാത്രം അതിന് ഭാഷയോ ആശയങ്ങളോ മനസ്സിലാകില്ലെന്ന് തെളിയിക്കാൻ 1980-ൽ ജോൺ സിയേൾ ചൈനീസ് റൂം പരീക്ഷണം അവതരിപ്പിച്ചു."
            },
            {
              "en": "A person locked in a room with a rulebook manipulating Chinese symbols by matching shapes can produce fluent Chinese answers without understanding a single word of Chinese.",
              "mal": "ചൈനീസ് അറിയാത്ത ഒരാൾ ഒരു മുറിയിലിരുന്ന് നിയമപുസ്തകം നോക്കി ചിഹ്നങ്ങളുടെ രൂപം മാത്രം ഒത്തുനോക്കി ശരിയായ ഉത്തരങ്ങൾ പുറത്തേക്ക് നൽകുമ്പോഴും അയാൾക്ക് ചൈനീസ് ഭാഷ തീരെ മനസ്സിലാകുന്നില്ല."
            },
            {
              "en": "Core Principle: 'Syntax is not sufficient for Semantics.' A computer manipulates syntactic rules and symbol shapes, but lacks intentionality, subjective meaning, and genuine understanding.",
              "mal": "'സിന്റാക്സ് (ഘടന) ഒരിക്കലും സെമാന്റിക്സ് (അർത്ഥം) ആകുന്നില്ല.' കമ്പ്യൂട്ടറുകൾ ചിഹ്നങ്ങളുടെ രൂപങ്ങൾ മാത്രം മാറ്റിമറിക്കുന്നു, എന്നാൽ അവയുടെ യഥാർത്ഥ അർത്ഥം ഗ്രഹിക്കുന്നില്ല."
            }
          ]
        },
        {
          "badge": "Part 3",
          "title": "Cartesian Dualism & The Mind-Body Problem in AI",
          "titleMal": "ദെക്കാർത്തിന്റെ ദ്വൈതവാദവും മൈൻഡ്-ബോഡി പ്രശ്നവും",
          "points": [
            {
              "en": "René Descartes formulated substance dualism, dividing reality into Res Cogitans (thinking, non-material mental substance) and Res Extensa (extended, physical material substance).",
              "mal": "ദെക്കാർത്ത് പ്രപഞ്ചത്തെ രണ്ട് കാര്യങ്ങളായി വിഭജിച്ചു: ചിന്തിക്കുന്ന പദാർത്ഥം (മനസ്സ്) എന്നും ഭൗതിക പദാർത്ഥം (ശരീരം) എന്നും."
            },
            {
              "en": "Descartes argued that machines and animals are purely mechanical automata, but human reasoning requires an immaterial soul/mind that mechanical nature cannot replicate.",
              "mal": "മൃഗങ്ങളും യന്ത്രങ്ങളും വെറും യാന്ത്രിക സംവിധാനങ്ങളാണെന്നും എന്നാൽ മനുഷ്യന്റെ യുക്തിചിന്തയ്ക്ക് ഭൗതികേതരമായ ഒരു മനസ്സ് അത്യാവശ്യമാണെന്നും അദ്ദേഹം വാദിച്ചു."
            },
            {
              "en": "Classical AI inherited a form of dualism by treating software (mind) as completely detached from the specific underlying hardware (body/brain).",
              "mal": "സോഫ്റ്റ്‌വെയറിനെ (മനസ്സ്) ഹാർഡ്‌വെയറിൽ (ശരീരം) നിന്ന് തികച്ചും സ്വതന്ത്രമായ ഒന്നായി കണ്ടുകൊണ്ട് ക്ലാസിക്കൽ AI ഈ ദ്വൈതവാദത്തെയാണ് പിന്തുടർന്നത്."
            }
          ]
        },
        {
          "badge": "Part 4",
          "title": "Disembodied Intelligence & Dreyfus's Embodied Cognition Critique",
          "titleMal": "ശരീരരഹിത ബുദ്ധിയും ഡ്രെയ്ഫസിന്റെ ശരീരാധിഷ്ഠിത വിമർശനവും",
          "points": [
            {
              "en": "Philosopher Hubert Dreyfus, drawing on Heidegger and Merleau-Ponty, published 'What Computers Can't Do' (1972), criticizing the disembodied assumptions of GOFAI.",
              "mal": "1972-ൽ ഹ്യൂബർട്ട് ഡ്രെയ്ഫസ് 'കമ്പ്യൂട്ടറുകൾക്ക് എന്ത് ചെയ്യാനാകില്ല' എന്ന പുസ്തകത്തിലൂടെ ശരീരമില്ലാത്ത യന്ത്രങ്ങൾക്ക് യഥാർത്ഥ ബുദ്ധി ഉണ്ടാകില്ലെന്ന് വാദിച്ചു."
            },
            {
              "en": "Dreyfus argued that human intelligence is inherently 'embodied'—grounded in physical bodily interaction, coping skills, intuition, and background context that cannot be fully formalized into symbolic rules.",
              "mal": "മനുഷ്യന്റെ ബുദ്ധിശക്തി എന്നത് ശരീരവും ചുറ്റുപാടുമായുള്ള നിരന്തരമായ ഭൗതിക ഇടപെടലുകളിലൂടെയും അനുഭവങ്ങളിലൂടെയും രൂപപ്പെടുന്നതാണ്; ഇതിനെ വെറും നിയമങ്ങളാക്കി മാറ്റാനാവില്ല."
            },
            {
              "en": "This critique catalyzed modern Embodied Cognition, robotics, and situated AI (Rodney Brooks' subsumption architecture).",
              "mal": "ഈ വിമർശനമാണ് റോബോട്ടിക്സിലും എംബോഡിഡ് കോഗ്നിഷൻ സിദ്ധാന്തത്തിലും വലിയ മാറ്റങ്ങൾക്ക് വഴിവെച്ചത്."
            }
          ]
        }
      ],
      "coreConcepts": [
        {
          "term": "GOFAI",
          "termMal": "ഗുഡ് ഓൾഡ് ഫാഷൻഡ് AI",
          "def": "Good Old-Fashioned Artificial Intelligence: The classical paradigm of AI based on explicit symbolic representation and formal logical inference.",
          "defMal": "ചിഹ്നങ്ങളും മുൻകൂട്ടി നിശ്ചയിച്ച യുക്തി നിയമങ്ങളും ഉപയോഗിച്ച് പ്രവർത്തിക്കുന്ന പരമ്പരാഗത AI രീതി."
        },
        {
          "term": "Chinese Room Argument",
          "termMal": "ചൈനീസ് റൂം വാദം",
          "def": "John Searle's 1980 thought experiment demonstrating that formal symbol manipulation (syntax) does not produce genuine understanding (semantics).",
          "defMal": "ചിഹ്നങ്ങൾ ശരിയായി ക്രമീകരിച്ചതുകൊണ്ട് മാത്രം ഒരു കമ്പ്യൂട്ടറിന് അർത്ഥം മനസ്സിലാകില്ലെന്ന് കാണിക്കുന്ന ജോൺ സിയേളിന്റെ ചിന്താപരീക്ഷണം."
        },
        {
          "term": "Substance Dualism",
          "termMal": "സബ്സ്റ്റൻസ് ഡ്യുവലിസം",
          "def": "Descartes' philosophical view that mind (Res Cogitans) and matter (Res Extensa) are fundamentally two distinct substances.",
          "defMal": "മനസ്സും ശരീരവും രണ്ട് വ്യത്യസ്ത അടിസ്ഥാന പദാർത്ഥങ്ങളാണെന്ന ദെക്കാർത്തിന്റെ സിദ്ധാന്തം."
        },
        {
          "term": "Embodied Cognition",
          "termMal": "എംബോഡിഡ് കോഗ്നിഷൻ",
          "def": "The philosophical and cognitive theory that intelligence requires a physical body interacting dynamically with an environment.",
          "defMal": "യഥാർത്ഥ ബുദ്ധിശക്തി ഉണ്ടാകാൻ ശരീരവും പരിസ്ഥിതിയുമായുള്ള ഭൗതിക ഇടപെടൽ അത്യന്താപേക്ഷിതമാണെന്ന സിദ്ധാന്തം."
        }
      ],
      "keyMetrics": [
        {
          "label": "Chinese Room",
          "value": "1980",
          "detail": "John Searle published 'Minds, Brains, and Programs'."
        },
        {
          "label": "Dreyfus Critique",
          "value": "1972",
          "detail": "Published landmark book 'What Computers Can't Do'."
        },
        {
          "label": "PSSH Hypothesis",
          "value": "Newell & Simon",
          "detail": "Formulated the Physical Symbol System Hypothesis in 1976."
        }
      ],
      "examTakeaways": [
        {
          "en": "John Searle's Chinese Room directly attacks Strong AI by proving syntax alone is not sufficient for semantics.",
          "mal": "സിന്റാക്സ് മാത്രം അർത്ഥബോധം ഉണ്ടാക്കില്ലെന്ന് തെളിയിച്ചുകൊണ്ട് സിയേളിന്റെ ചൈനീസ് റൂം സ്ട്രോങ് AI-യെ തള്ളിക്കളയുന്നു."
        },
        {
          "en": "The Physical Symbol System Hypothesis argues that symbolic manipulation is both necessary and sufficient for intelligent action.",
          "mal": "ബുദ്ധിപരമായ പ്രവർത്തനങ്ങൾക്ക് ചിഹ്നങ്ങളുടെ ക്രമീകരണം ആവശ്യവും പര്യാപ്തവുമാണെന്ന് നെവലും സൈമണും വാദിച്ചു."
        },
        {
          "en": "Descartes posited that animals and machines are mechanical automata, but human reason demands an immaterial thinking substance.",
          "mal": "മൃഗങ്ങളും യന്ത്രങ്ങളും യാന്ത്രികമാണെങ്കിലും മനുഷ്യന്റെ യുക്തിക്ക് ആത്മീയമായ മനസ്സ് വേണമെന്ന് ദെക്കാർത്ത് സമർത്ഥിച്ചു."
        },
        {
          "en": "Hubert Dreyfus demonstrated that disembodied computation fails to capture context, background practice, and common sense.",
          "mal": "ശരീരമില്ലാത്ത വെറും കമ്പ്യൂട്ടർ പ്രോഗ്രാമുകൾക്ക് ലോകത്തിലെ സാഹചര്യങ്ങളും സാമാന്യബുദ്ധിയും (common sense) ഗ്രഹിക്കാൻ കഴിയില്ലെന്ന് ഡ്രെയ്ഫസ് തെളിയിച്ചു."
        }
      ]
    },
    "quizPool": [
      {
        "question": "Who introduced the celebrated 'Chinese Room Thought Experiment' in 1980 to challenge the premises of Strong AI?",
        "questionMal": "1980-ൽ സ്ട്രോങ് AI-യുടെ വാദങ്ങളെ വെല്ലുവിളിച്ചുകൊണ്ട് പ്രസിദ്ധമായ 'ചൈനീസ് റൂം പരീക്ഷണം' അവതരിപ്പിച്ച തത്ത്വചിന്തകൻ ആര്?",
        "options": [
          {
            "en": "Daniel Dennett",
            "mal": "ഡാനിയൽ ഡെന്നറ്റ്"
          },
          {
            "en": "John Searle",
            "mal": "ജോൺ സിയേൾ"
          },
          {
            "en": "Thomas Nagel",
            "mal": "തോമസ് നാഗൽ"
          },
          {
            "en": "Hilary Putnam",
            "mal": "ഹിലരി പുട്നം"
          }
        ],
        "answer": 1,
        "explanation": "John Searle published the Chinese Room experiment in his 1980 paper 'Minds, Brains, and Programs', arguing that syntax does not constitute semantics.",
        "explanationMal": "1980-ൽ ജോൺ സിയേളാണ് 'മൈൻഡ്സ്, ബ്രെയിൻസ് ആൻഡ് പ്രോഗ്രാംസ്' എന്ന പ്രബന്ധത്തിലൂടെ ചൈനീസ് റൂം വാദം അവതരിപ്പിച്ചത്."
      },
      {
        "question": "What is the core philosophical conclusion derived from the Chinese Room experiment?",
        "questionMal": "ചൈനീസ് റൂം പരീക്ഷണത്തിൽ നിന്നുള്ള പ്രധാന തത്ത്വചിന്താപരമായ നിഗമനം എന്താണ്?",
        "options": [
          {
            "en": "Syntax is not sufficient for semantics; symbol manipulation does not equal genuine understanding",
            "mal": "സിന്റാക്സ് (രൂപം) മാത്രം സെമാന്റിക്സ് (അർത്ഥം) ആകുന്നില്ല; ചിഹ്നങ്ങൾ കൈകാര്യം ചെയ്തതുകൊണ്ട് മാത്രം അർത്ഥബോധം ഉണ്ടാകുന്നില്ല"
          },
          {
            "en": "Chinese is harder to learn than English",
            "mal": "ചൈനീസ് പഠിക്കാൻ ഇംഗ്ലീഷിനേക്കാൾ പ്രയാസമാണ്"
          },
          {
            "en": "Computers cannot manipulate symbols fast enough",
            "mal": "കമ്പ്യൂട്ടറുകൾക്ക് വേഗത്തിൽ പ്രവർത്തിക്കാൻ കഴിയില്ല"
          },
          {
            "en": "Locked rooms always improve translation capabilities",
            "mal": "മുറികൾ പൂട്ടിയിട്ടാൽ വിവർത്തനം മെച്ചപ്പെടും"
          }
        ],
        "answer": 0,
        "explanation": "Searle showed that an agent can follow programmatic rules to transform syntactic symbols without understanding what any of those symbols mean.",
        "explanationMal": "ചിഹ്നങ്ങളുടെ അർത്ഥം ഒട്ടും അറിയാതെ തന്നെ ബാഹ്യമായ നിയമങ്ങൾ നോക്കി ശരിയായ ഉത്തരങ്ങൾ ഉണ്ടാക്കാൻ കഴിയുമെന്ന് സിയേൾ തെളിയിച്ചു."
      },
      {
        "question": "What does the acronym 'GOFAI', coined by philosopher John Haugeland, stand for?",
        "questionMal": "തത്ത്വചിന്തകനായ ജോൺ ഹോഗ്ലാൻഡ് ഉപയോഗിച്ച 'GOFAI' എന്നതിന്റെ പൂർണ്ണരൂപം എന്താണ്?",
        "options": [
          {
            "en": "Global Output For Artificial Intelligence",
            "mal": "ഗ്ലോബൽ ഔട്ട്പുട്ട് ഫോർ AI"
          },
          {
            "en": "Good Old-Fashioned Artificial Intelligence",
            "mal": "ഗുഡ് ഓൾഡ് ഫാഷൻഡ് ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് (GOFAI)"
          },
          {
            "en": "General Optimized Framework for Algorithms and Inference",
            "mal": "ജനറൽ ഒപ്റ്റിമൈസ്ഡ് ഫ്രെയിംവർക്ക്"
          },
          {
            "en": "Government Office for Artificial Intelligence",
            "mal": "ഗവൺമെന്റ് ഓഫീസ് ഫോർ AI"
          }
        ],
        "answer": 1,
        "explanation": "GOFAI stands for Good Old-Fashioned Artificial Intelligence, referring to classical symbolic AI based on rule manipulation and logical inference.",
        "explanationMal": "ക്ലാസിക്കൽ സിംബോളിക് AI രീതിയെയാണ് ഗുഡ് ഓൾഡ് ഫാഷൻഡ് ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് (GOFAI) എന്ന് വിളിക്കുന്നത്."
      },
      {
        "question": "Who formulated the 'Physical Symbol System Hypothesis' (PSSH) in their 1975 ACM Turing Award lecture?",
        "questionMal": "1975-ലെ ട്യൂറിങ് അവാർഡ് പ്രഭാഷണത്തിൽ 'ഫിസിക്കൽ സിംബൽ സിസ്റ്റം ഹൈപ്പോതെസിസ്' അവതരിപ്പിച്ച ശാസ്ത്രജ്ഞന്മാർ ആര്?",
        "options": [
          {
            "en": "Allen Newell and Herbert Simon",
            "mal": "അലൻ നെവലും ഹെർബർട്ട് സൈമണും"
          },
          {
            "en": "Alan Turing and Alonzo Church",
            "mal": "അലൻ ട്യൂറിങ്ങും അലോൺസോ ചർച്ചും"
          },
          {
            "en": "Noam Chomsky and B. F. Skinner",
            "mal": "നോം ചോംസ്കിയും ബി. എഫ്. സ്കിന്നറും"
          },
          {
            "en": "Steve Jobs and Steve Wozniak",
            "mal": "സ്റ്റീവ് ജോബ്സും സ്റ്റീവ് വോസ്നിയാക്കും"
          }
        ],
        "answer": 0,
        "explanation": "Allen Newell and Herbert A. Simon formulated the Physical Symbol System Hypothesis, asserting that symbolic systems possess the necessary and sufficient means for intelligent action.",
        "explanationMal": "അലൻ നെവലും ഹെർബർട്ട് സൈമണും ചേർന്നാണ് ഈ സുപ്രധാന സിദ്ധാന്തം അവതരിപ്പിച്ചത്."
      },
      {
        "question": "Which French philosopher divided the world into Res Cogitans (thinking mind) and Res Extensa (extended matter)?",
        "questionMal": "പ്രപഞ്ചത്തെ 'റെസ് കോഗിറ്റൻസ്' (മനസ്സ്), 'റെസ് എക്സ്റ്റെൻസ' (ശരീരം/ദ്രവ്യം) എന്നിങ്ങനെ വേർതിരിച്ച ഫ്രഞ്ച് തത്ത്വചിന്തകൻ ആര്?",
        "options": [
          {
            "en": "Jean-Paul Sartre",
            "mal": "ജീൻ-പോൾ സാർത്രെ"
          },
          {
            "en": "René Descartes",
            "mal": "റെനെ ദെക്കാർത്ത്"
          },
          {
            "en": "Voltaire",
            "mal": "വോൾട്ടയർ"
          },
          {
            "en": "Michel Foucault",
            "mal": "മിഷേൽ ഫൂക്കോ"
          }
        ],
        "answer": 1,
        "explanation": "René Descartes formulated Cartesian substance dualism, asserting that the immaterial mind (Res Cogitans) and material body (Res Extensa) are fundamentally separate substances.",
        "explanationMal": "റെനെ ദെക്കാർത്തിന്റെ പ്രശസ്തമായ ദ്വൈതവാദ സിദ്ധാന്തമാണിത് (Cartesian Dualism)."
      },
      {
        "question": "What was René Descartes' view regarding animals and purely mechanical automata?",
        "questionMal": "മൃഗങ്ങളെയും യാന്ത്രിക യന്ത്രങ്ങളെയും കുറിച്ച് റെനെ ദെക്കാർത്തിന്റെ നിലപാട് എന്തായിരുന്നു?",
        "options": [
          {
            "en": "They possess conscious immortal souls identical to humans",
            "mal": "അവയ്ക്ക് മനുഷ്യനെപ്പോലെ അമരമായ ആത്മാവുണ്ട്"
          },
          {
            "en": "They are purely material mechanical automata operating without an immaterial conscious mind",
            "mal": "അവ ആത്മാവോ മനസ്സോ ഇല്ലാത്ത വെറും യാന്ത്രിക സംവിധാനങ്ങൾ (automata) മാത്രമാണ്"
          },
          {
            "en": "They are telepathic beings from other planets",
            "mal": "മറ്റ് ഗ്രഹങ്ങളിൽ നിന്നുള്ളവരാണ്"
          },
          {
            "en": "They can write French philosophical poetry",
            "mal": "അവയ്ക്ക് കവിതയെഴുതാൻ കഴിയും"
          }
        ],
        "answer": 1,
        "explanation": "Descartes viewed non-human animals and machines as complex mechanical clockwork automata, reserving reason and the immaterial soul exclusively for human beings.",
        "explanationMal": "മൃഗങ്ങളും യന്ത്രങ്ങളും യാന്ത്രികമായി പ്രവർത്തിക്കുന്നവ മാത്രമാണെന്നും മനുഷ്യന് മാത്രമേ ചിന്തിക്കുന്ന ആത്മാവുള്ളൂ എന്നും ദെക്കാർത്ത് വാദിച്ചു."
      },
      {
        "question": "Which philosopher wrote the influential 1972 book 'What Computers Can't Do', criticizing GOFAI from a phenomenological standpoint?",
        "questionMal": "1972-ൽ 'കമ്പ്യൂട്ടറുകൾക്ക് എന്ത് ചെയ്യാനാകില്ല' എന്ന പുസ്തകത്തിലൂടെ ക്ലാസിക്കൽ AI-യെ കടുത്ത ഭാഷയിൽ വിമർശിച്ച തത്ത്വചിന്തകൻ ആര്?",
        "options": [
          {
            "en": "Hubert Dreyfus",
            "mal": "ഹ്യൂബർട്ട് ഡ്രെയ്ഫസ്"
          },
          {
            "en": "Noam Chomsky",
            "mal": "നോം ചോംസ്കി"
          },
          {
            "en": "Ray Kurzweil",
            "mal": "റേ കുർസ്വെയ്ൽ"
          },
          {
            "en": "Bertrand Russell",
            "mal": "ബെർട്രാൻഡ് റസ്സൽ"
          }
        ],
        "answer": 0,
        "explanation": "Hubert Dreyfus utilized the phenomenology of Martin Heidegger and Maurice Merleau-Ponty to demonstrate that human intelligence requires an embodied, contextual existence that symbolic rules cannot replicate.",
        "explanationMal": "ഹ്യൂബർട്ട് ഡ്രെയ്ഫസാണ് ശരീരാധിഷ്ഠിത ബുദ്ധിയുടെ (Embodied Cognition) പ്രാധാന്യം ഉയർത്തിക്കാട്ടി AI-യെ വിമർശിച്ചത്."
      },
      {
        "question": "What is the core premise of the 'Embodied Cognition' thesis in cognitive science?",
        "questionMal": "കോഗ്നിറ്റീവ് സയൻസിലെ 'എംബോഡിഡ് കോഗ്നിഷൻ' എന്ന സിദ്ധാന്തത്തിന്റെ കാതൽ എന്താണ്?",
        "options": [
          {
            "en": "Thinking is entirely an abstract mathematical formula inside a cloud server",
            "mal": "ചിന്ത എന്നത് ക്ലൗഡ് സെർവറിലെ കേവല ഫോർമുല മാത്രമാണ്"
          },
          {
            "en": "Intelligence is shaped and grounded by having a physical body interacting dynamically with the environment",
            "mal": "ഭൗതിക ശരീരവും ചുറ്റുപാടുമായുള്ള നേരിട്ടുള്ള ഇടപെടലിലൂടെയാണ് ബുദ്ധിശക്തിയും അറിവും രൂപപ്പെടുന്നത്"
          },
          {
            "en": "Robots must avoid moving their physical limbs",
            "mal": "റോബോട്ടുകൾ അനങ്ങാൻ പാടില്ല"
          },
          {
            "en": "Brains function identically whether they have eyes or not",
            "mal": "കണ്ണുകൾ ഇല്ലെങ്കിലും തലച്ചോറ് ഒരുപോലെ പ്രവർത്തിക്കും"
          }
        ],
        "answer": 1,
        "explanation": "Embodied Cognition argues that cognition is deeply dependent upon features of the physical body and sensorimotor interactions with the world.",
        "explanationMal": "മനുഷ്യന്റെ അനുഭവങ്ങളും ശരീരവും ചുറ്റുപാടും തമ്മിലുള്ള നിരന്തരമായ ഇടപെടലുകളുമാണ് യഥാർത്ഥ ബുദ്ധിയുടെ അടിസ്ഥാനം."
      },
      {
        "question": "In Searle's Chinese Room argument, what does the person inside the room actually understand of the Chinese language?",
        "questionMal": "സിയേളിന്റെ ചൈനീസ് റൂം പരീക്ഷണത്തിൽ, മുറിക്കുള്ളിലിരിക്കുന്ന വ്യക്തിക്ക് ചൈനീസ് ഭാഷയെക്കുറിച്ച് എന്താണ് മനസ്സിലാകുന്നത്?",
        "options": [
          {
            "en": "Complete conversational fluency",
            "mal": "പൂർണ്ണമായ പ്രാവീണ്യം"
          },
          {
            "en": "Absolutely nothing; they merely manipulate symbol shapes according to rules",
            "mal": "ഒന്നും മനസ്സിലാകുന്നില്ല; ചിഹ്നങ്ങളുടെ രൂപങ്ങൾ നോക്കി നിയമപ്രകാരം അടുക്കുക മാത്രമാണ് ചെയ്യുന്നത്"
          },
          {
            "en": "Only classical Mandarin poetry",
            "mal": "ചൈനീസ് കവിതകൾ മാത്രം"
          },
          {
            "en": "They become a native Chinese speaker",
            "mal": "അയാൾ ചൈനീസ് സ്വദേശിയായി മാറുന്നു"
          }
        ],
        "answer": 1,
        "explanation": "The human operator inside the room understands zero Chinese semantics, proving that passing a language test through rule manipulation does not produce understanding.",
        "explanationMal": "മുറിക്കുള്ളിലെ ആൾക്ക് ചൈനീസ് ഒട്ടും മനസ്സിലാകുന്നില്ല; ഇത് കമ്പ്യൂട്ടറുകൾ അർത്ഥം അറിയാതെയാണ് വിവരങ്ങൾ കൈകാര്യം ചെയ്യുന്നത് എന്നതിന് തെളിവാണ്."
      },
      {
        "question": "What is the famous philosophical dilemma known as the 'Mind-Body Problem'?",
        "questionMal": "തത്ത്വചിന്തയിലെ പ്രസിദ്ധമായ 'മൈൻഡ്-ബോഡി പ്രശ്നം' (Mind-Body Problem) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "How conscious subjective mental states relate to and interact with the physical material body/brain",
            "mal": "ഭൗതികമായ ശരീരവും തലച്ചോറും അദൃശ്യമായ ആത്മബോധവും (മനസ്സും) തമ്മിൽ എങ്ങനെ പരസ്പരം ബന്ധപ്പെട്ടിരിക്കുന്നു എന്ന ചോദ്യം"
          },
          {
            "en": "How to diet without losing muscle mass",
            "mal": "ശരീരഭാരം എങ്ങനെ നിയന്ത്രിക്കാം"
          },
          {
            "en": "How to build taller humanoid robots",
            "mal": "ഉയരമുള്ള റോബോട്ടുകളെ എങ്ങനെ നിർമ്മിക്കാം"
          },
          {
            "en": "How to cure bacterial stomach infections",
            "mal": "അണുബാധ എങ്ങനെ സുഖപ്പെടുത്താം"
          }
        ],
        "answer": 0,
        "explanation": "The Mind-Body problem investigates the fundamental relationship between mental phenomena (thoughts, feelings, qualia) and physical neural mechanisms in the body.",
        "explanationMal": "ഭൗതികമായ തലച്ചോറിൽ നിന്ന് എങ്ങനെയാണ് അനുഭവങ്ങളും ബോധവുമുള്ള ഒരു മനസ്സ് ഉണ്ടാകുന്നത് എന്ന അന്വേഷണമാണിത്."
      },
      {
        "question": "Which of the following is an example of an early GOFAI expert system based on formal symbolic rules?",
        "questionMal": "മുൻകൂട്ടി നിശ്ചയിച്ച പ്രതീകാത്മക നിയമങ്ങൾ അടിസ്ഥാനമാക്കി പ്രവർത്തിച്ച ആദ്യകാല വിദഗ്ദ്ധ സിസ്റ്റത്തിന് (Expert System) ഉദാഹരണം ഏതാണ്?",
        "options": [
          {
            "en": "MYCIN (medical diagnosis expert system)",
            "mal": "മൈസിൻ (MYCIN - രോഗനിർണ്ണയ സിസ്റ്റം)"
          },
          {
            "en": "Steam locomotive",
            "mal": "നീരാവി എൻജിൻ"
          },
          {
            "en": "Morse code telegraph",
            "mal": "ടെലിഗ്രാഫ്"
          },
          {
            "en": "Mechanical typewriter",
            "mal": "ടൈപ്പ്റൈറ്റർ"
          }
        ],
        "answer": 0,
        "explanation": "MYCIN, developed at Stanford in the 1970s, used hundreds of if-then symbolic production rules to diagnose blood infections, epitomizing classical GOFAI.",
        "explanationMal": "1970-കളിൽ വികസിപ്പിച്ച 'മൈസിൻ' (MYCIN) നിയമങ്ങൾ അടിസ്ഥാനമാക്കി പ്രവർത്തിച്ച ക്ലാസിക്കൽ AI എക്സ്പർട്ട് സിസ്റ്റമാണ്."
      },
      {
        "question": "What is the 'Frame Problem' in classical symbolic artificial intelligence?",
        "questionMal": "ക്ലാസിക്കൽ AI-യിലെ 'ഫ്രെയിം പ്രോബ്ലം' (Frame Problem) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The difficulty of representing what remains unchanged in a dynamic world without updating infinite irrelevant facts",
            "mal": "ഒരു പ്രവൃത്തി നടക്കുമ്പോൾ ലോകത്ത് മാറ്റമില്ലാതെ തുടരുന്ന കാര്യങ്ങളെ കമ്പ്യൂട്ടറിലേക്ക് എങ്ങനെ ഫലപ്രദമായി രേഖപ്പെടുത്താം എന്ന പ്രതിസന്ധി"
          },
          {
            "en": "The wooden frame of a painting falling down",
            "mal": "ചിത്രത്തിന്റെ ഫ്രെയിം പൊട്ടി വീഴുന്നത്"
          },
          {
            "en": "The refresh rate of a computer monitor",
            "mal": "മോണിറ്ററിന്റെ ഡിസ്പ്ലേ വേഗത"
          },
          {
            "en": "The physical dimensions of a server rack",
            "mal": "സെർവർ റാക്കിന്റെ അളവ്"
          }
        ],
        "answer": 0,
        "explanation": "The Frame Problem (McCarthy and Hayes, 1969) is the challenge of logically specifying which facts persist when an action occurs without constantly checking millions of non-effects.",
        "explanationMal": "ഒരു മാറ്റം സംഭവിക്കുമ്പോൾ ചുറ്റുമുള്ള മറ്റ് എണ്ണമറ്റ കാര്യങ്ങൾ മാറിയിട്ടില്ല എന്ന് കമ്പ്യൂട്ടറിന് സ്വയം മനസ്സിലാക്കാനുള്ള ബുദ്ധിമുട്ടാണിത്."
      },
      {
        "question": "Rodney Brooks advocated for which revolutionary approach to AI robotics, contrasting sharply with classical symbolic representation?",
        "questionMal": "പരമ്പരാഗത ചിഹ്ന മാതൃകകൾക്ക് വിരുദ്ധമായി റോഡ്നി ബ്രൂക്ക്സ് അവതരിപ്പിച്ച റോബോട്ടിക്സ് സമീപനം ഏതാണ്?",
        "options": [
          {
            "en": "Subsumption Architecture (Intelligence without representation)",
            "mal": "സബ്സംപ്ഷൻ ആർക്കിടെക്ചർ (പ്രതീകങ്ങളില്ലാത്ത ബുദ്ധി)"
          },
          {
            "en": "Mainframe Batch Processing",
            "mal": "മെയിൻഫ്രെയിം ബാച്ച് പ്രോസസ്സിംഗ്"
          },
          {
            "en": "Paper punch card data entry",
            "mal": "പഞ്ച് കാർഡ് ഡാറ്റാ എൻട്രി"
          },
          {
            "en": "Complete reliance on symbolic Aristotelian logic",
            "mal": "അരിസ്റ്റോട്ടിലിന്റെ യുക്തിയെ മാത്രം ആശ്രയിക്കൽ"
          }
        ],
        "answer": 0,
        "explanation": "Rodney Brooks built insect-like robots that acted directly on sensorimotor feedback without centralized world models, famously declaring: 'The world is its own best model.'",
        "explanationMal": "വലിയ ഡാറ്റാബേസുകൾക്ക് പകരം സെൻസറുകളിലൂടെ ചുറ്റുപാടുകളോട് നേരിട്ട് പ്രതികരിക്കുന്ന റോബോട്ടുകളെയാണ് അദ്ദേഹം വികസിപ്പിച്ചത്."
      },
      {
        "question": "What is meant by 'Syntax' in linguistic and computational philosophy?",
        "questionMal": "ഭാഷാശാസ്ത്രത്തിലും കമ്പ്യൂട്ടർ തത്ത്വചിന്തയിലും 'സിന്റാക്സ്' (Syntax) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The structural rules, grammar, and shapes governing symbol sequences",
            "mal": "ചിഹ്നങ്ങൾ എങ്ങനെ ക്രമീകരിക്കണം എന്നതിനെക്കുറിച്ചുള്ള ഘടനാപരമായ നിയമങ്ങളും വ്യാകരണവും"
          },
          {
            "en": "The emotional depth of a human feeling",
            "mal": "മനുഷ്യന്റെ വികാരങ്ങളുടെ ആഴം"
          },
          {
            "en": "The monetary value of an antique book",
            "mal": "പുസ്തകത്തിന്റെ വില"
          },
          {
            "en": "The spiritual enlightenment of a monk",
            "mal": "ആത്മീയ ജ്ഞാനം"
          }
        ],
        "answer": 0,
        "explanation": "Syntax refers to formal structure and symbol arrangement independent of any meaning or semantic interpretation.",
        "explanationMal": "അർത്ഥത്തെ ആശ്രയിക്കാതെയുള്ള ചിഹ്നങ്ങളുടെ ബാഹ്യമായ ഘടനയെയും നിയമങ്ങളെയുമാണ് സിന്റാക്സ് എന്ന് പറയുന്നത്."
      },
      {
        "question": "What is meant by 'Semantics' in contrast to syntax?",
        "questionMal": "സിന്റാക്സിൽ നിന്ന് വ്യത്യസ്തമായി 'സെമാന്റിക്സ്' (Semantics) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The meaning, interpretation, and truth-value associated with symbols and words",
            "mal": "ചിഹ്നങ്ങളും വാക്കുകളും നൽകുന്ന യഥാർത്ഥ അർത്ഥവും ആശയവും"
          },
          {
            "en": "The physical weight of ink printed on paper",
            "mal": "മഷിയുടെ ഭാരം"
          },
          {
            "en": "The font color of letters on a screen",
            "mal": "അക്ഷരങ്ങളുടെ നിറം"
          },
          {
            "en": "The volume of a loud loudspeaker",
            "mal": "ഉച്ചഭാഷിണിയുടെ ശബ്ദം"
          }
        ],
        "answer": 0,
        "explanation": "Semantics refers to the actual meaning, reference, and cognitive understanding of words and concepts in relation to reality.",
        "explanationMal": "വാക്കുകളും ചിഹ്നങ്ങളും പ്രതിനിധീകരിക്കുന്ന ആന്തരിക അർത്ഥത്തെയും ആശയത്തെയുമാണ് സെമാന്റിക്സ് എന്ന് വിളിക്കുന്നത്."
      }
    ]
  },
  "ai_mod_3": {
    "title": "Module 3 · Theories of Knowledge in Artificial Intelligence",
    "titleMal": "മൊഡ്യൂൾ 3 · കൃത്രിമ ബുദ്ധിയിലെ ജ്ഞാനശാസ്ത്ര സിദ്ധാന്തങ്ങൾ",
    "filename": "Module_3_Theories_of_Knowledge_in_Artificial_Intelligence.pdf",
    "summary": {
      "overview": "Rigorous epistemological investigation into the nature, acquisition, and representation of knowledge in artificial intelligence. Contrasts traditional Indian epistemology (Nyaya and Vaisheshika Pramanas, Buddhist epistemology of Dignaga and Dharmakirti) with Western Epistemology (Rationalism, Empiricism, Kantian synthesis), and modern cognitive paradigms including Hilary Putnam's Functionalism and the Computational Theory of Mind.",
      "overviewMal": "കൃത്രിമ ബുദ്ധിയിൽ അറിവ് എങ്ങനെ നേടുന്നു, ശേഖരിക്കുന്നു, പ്രതിനിധീകരിക്കുന്നു എന്നതിനെക്കുറിച്ചുള്ള ജ്ഞാനശാസ്ത്രപരമായ പഠനം. ഭാരതീയ ജ്ഞാനശാസ്ത്രത്തിലെ ന്യായ-വൈശേഷിക പ്രമാണങ്ങൾ, ബുദ്ധ തത്ത്വചിന്തയിലെ ദിങ്നാഗന്റെയും ധർമ്മകീർത്തിയുടെയും സിദ്ധാന്തങ്ങൾ, പാശ്ചാത്യ ജ്ഞാനശാസ്ത്രത്തിലെ റാഷണലിസവും എംപിരിസിസവും, ഹിലരി പുട്നത്തിന്റെ ഫങ്ഷണലിസം, കമ്പ്യൂട്ടേഷണൽ തിയറി ഓഫ് മൈൻഡ് എന്നിവ സമഗ്രമായി ഇതിൽ വിശകലനം ചെയ്യുന്നു.",
      "sections": [
        {
          "badge": "Part 1",
          "title": "Indian Epistemology: Nyaya & Vaisheshika Systems",
          "titleMal": "ഭാരതീയ ജ്ഞാനശാസ്ത്രം: ന്യായ-വൈശേഷിക ദർശനങ്ങൾ",
          "points": [
            {
              "en": "Nyaya philosophy admits four valid sources of true knowledge (Pramanas): Pratyaksha (Perception), Anumana (Inference), Upamana (Comparison/Analogy), and Shabda (Reliable Testimony).",
              "mal": "ന്യായ ദർശനം നാല് യഥാർത്ഥ പ്രമാണങ്ങളെ അംഗീകരിക്കുന്നു: പ്രത്യക്ഷം, അനുമാനം, ഉപമാനം, ശബ്ദം."
            },
            {
              "en": "Anumana (Inference) proceeds through a rigorous five-step syllogism (Pancha-Avayava): Pratijna (thesis), Hetu (reason), Udaharana (universal example with Vyapti), Upanaya (application), and Nigamana (conclusion).",
              "mal": "അനുമാനം അഞ്ച് ഘട്ടങ്ങളിലൂടെയാണ് കടന്നുപോകുന്നത്: പ്രതിജ്ഞ, ഹേതു, ഉദാഹരണം, ഉപനയം, നിഗമനം."
            },
            {
              "en": "AI knowledge graph architectures and rule-based inference engines closely mirror Nyaya's deductive-inductive syllogisms and Vaisheshika's ontological categorization of reality (Padarthas).",
              "mal": "ആധുനിക AI-യിലെ റൂൾ-ബേസ്ഡ് സിസ്റ്റങ്ങളും നോളജ് ഗ്രാഫുകളും ന്യായ ദർശനത്തിലെ യുക്തിചിന്തകളോട് ഏറെ സാമ്യമുള്ളതാണ്."
            }
          ]
        },
        {
          "badge": "Part 2",
          "title": "Buddhist Epistemology: Dignaga, Dharmakirti & Anatta",
          "titleMal": "ബുദ്ധ ജ്ഞാനശാസ്ത്രം: ദിങ്നാഗൻ, ധർമ്മകീർത്തി, അനാത്മവാദം",
          "points": [
            {
              "en": "Buddhist epistemologists Dignaga (Father of Medieval Indian Logic) and Dharmakirti recognized only two valid Pramanas: Pratyaksha (pure sensory perception devoid of conceptual construction) and Anumana (inference).",
              "mal": "ബുദ്ധ യുക്തിശാസ്ത്രജ്ഞരായ ദിങ്നാഗനും ധർമ്മകീർത്തിയും പ്രത്യക്ഷം, അനുമാനം എന്നീ രണ്ട് പ്രമാണങ്ങളെ മാത്രമേ അംഗീകരിച്ചിട്ടുള്ളൂ."
            },
            {
              "en": "The doctrine of Pratityasamutpada (Dependent Origination) states that all phenomena arise dependently on causes and conditions, without an unchanging permanent essence.",
              "mal": "പ്രതീത്യസമുത്പാദം: എല്ലാ വസ്തുക്കളും അനുഭവങ്ങളും കാരണങ്ങളാൽ പരസ്പരം ബന്ധപ്പെട്ടിരിക്കുന്നു; ഒന്നിനും സ്വതന്ത്രമായ ശാശ്വത നിലനിൽപ്പില്ല."
            },
            {
              "en": "The concept of Anatta (No-Self): The mind is not an indivisible permanent Cartesian soul, but a dynamic, ever-changing stream of interconnected mental aggregates (Skandhas), a concept foundational to distributed connectionist AI and neural networks.",
              "mal": "അനാത്മവാദം (Anatta): മനസ്സ് എന്നത് മാറ്റമില്ലാത്ത ഒരു ശാശ്വത ആത്മാവല്ല, മറിച്ച് നിരന്തരം മാറിക്കൊണ്ടിരിക്കുന്ന അനുഭവങ്ങളുടെ പ്രവാഹമാണ്; ഇത് ന്യൂറൽ നെറ്റ്വർക്കുകളിലെ വിവര സംസ്കരണത്തിന് സമാനമാണ്."
            }
          ]
        },
        {
          "badge": "Part 3",
          "title": "Western Epistemology: Rationalism, Empiricism & Kant",
          "titleMal": "പാശ്ചാത്യ ജ്ഞാനശാസ്ത്രം: റാഷണലിസം, എംപിരിസിസം, കാന്റ്",
          "points": [
            {
              "en": "Rationalism (Descartes, Spinoza, Leibniz): Reason, innate ideas, and deduction are the primary sources of knowledge, forming the philosophical basis for symbolic AI and expert systems.",
              "mal": "റാഷണലിസം: യുക്തിയും അന്തർലീനമായ ആശയങ്ങളുമാണ് അറിവിന്റെ ഉറവിടം; ഇത് സിംബോളിക് AI-ക്ക് അടിത്തറയായി."
            },
            {
              "en": "Empiricism (Locke, Berkeley, Hume): All knowledge derives exclusively from sensory experience (Tabula Rasa), providing the direct philosophical foundation for modern machine learning, deep learning, and data-driven pattern recognition.",
              "mal": "എംപിരിസിസം: എല്ലാ അറിവും അനുഭവങ്ങളിലൂടെയും ഇന്ദ്രിയങ്ങളിലൂടെയുമാണ് ഉണ്ടാകുന്നത്; ഇത് ആധുനിക മെഷീൻ ലേണിംഗിന്റെ അടിസ്ഥാനമാണ്."
            },
            {
              "en": "Immanuel Kant synthesized both schools: 'Thoughts without content are empty, intuitions without concepts are blind', arguing the mind actively structures raw data using a priori categories of space and time.",
              "mal": "ഇമ്മാനുവൽ കാന്റ് ഇവ രണ്ടിനെയും സംയോജിപ്പിച്ചു: അനുഭവങ്ങളില്ലാത്ത ചിന്തകൾ ശൂന്യമാണ്, സങ്കല്പങ്ങളില്ലാത്ത ഇന്ദ്രിയാനുഭവങ്ങൾ അന്ധമാണ്."
            }
          ]
        },
        {
          "badge": "Part 4",
          "title": "Functionalism & Computational Theory of Mind (CTM)",
          "titleMal": "ഫങ്ഷണലിസവും കമ്പ്യൂട്ടേഷണൽ തിയറി ഓഫ് മൈൻഡും",
          "points": [
            {
              "en": "Hilary Putnam formulated Functionalism: Mental states (beliefs, desires, pain) are defined by their functional roles and causal relations to sensory inputs and behavioral outputs, not by physical biological substance.",
              "mal": "ഹിലരി പുട്നത്തിന്റെ ഫങ്ഷണലിസം: മനസ്സ് എന്നത് അത് എന്ത് ധർമ്മം നിർവ്വഹിക്കുന്നു എന്നതിനെ ആശ്രയിച്ചിരിക്കുന്നു; മസ്തിഷ്കത്തിന്റെ ജൈവിക പദാർത്ഥത്തെ ആശ്രയിച്ചല്ല."
            },
            {
              "en": "Jerry Fodor developed the Computational Theory of Mind (CTM) and Language of Thought Hypothesis (Mentalese): Thinking is literal computation over mental symbolic representations.",
              "mal": "ജെറി ഫോഡോറിന്റെ സിദ്ധാന്തപ്രകാരം: ചിന്ത എന്നാൽ ചിഹ്നങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള ഒരുതരം കണക്കുകൂട്ടലാണ് (Language of Thought)."
            },
            {
              "en": "Substrate Independence: Because functional processes can be implemented across multiple media (Multiple Realizability), an authentic mind can theoretically be instantiated in silicon circuits.",
              "mal": "മൾട്ടിപ്പിൾ റിയലൈസബിലിറ്റി: പ്രവർത്തനങ്ങൾ ഒരുപോലെയെങ്കിൽ തലച്ചോറിലെ ജൈവകോശങ്ങൾക്ക് പകരമായി കമ്പ്യൂട്ടർ ചിപ്പുകളിലും ബുദ്ധി രൂപപ്പെടാം."
            }
          ]
        }
      ],
      "coreConcepts": [
        {
          "term": "Pramana",
          "termMal": "പ്രമാണം",
          "def": "In Indian philosophy, a valid means of acquiring true knowledge (e.g., Perception, Inference, Analogy, Testimony).",
          "defMal": "ഭാരതീയ തത്ത്വചിന്തയിൽ ശരിയായ അറിവ് നേടുന്നതിനുള്ള പ്രാമാണിക മാർഗ്ഗങ്ങൾ."
        },
        {
          "term": "Functionalism",
          "termMal": "ഫങ്ഷണലിസം",
          "def": "The doctrine in philosophy of mind that mental states are constituted solely by their functional role within a system.",
          "defMal": "മനസ്സിന്റെ അവസ്ഥകൾ എന്നത് സിസ്റ്റത്തിനുള്ളിലെ പ്രവർത്തന ധർമ്മങ്ങൾ മാത്രമാണെന്ന സിദ്ധാന്തം."
        },
        {
          "term": "Computational Theory of Mind",
          "termMal": "കമ്പ്യൂട്ടേഷണൽ തിയറി ഓഫ് മൈൻഡ്",
          "def": "The view that the human mind is an information processing system and thinking is a form of digital computation.",
          "defMal": "മനുഷ്യന്റെ മനസ്സ് ഒരു ഇൻഫർമേഷൻ പ്രോസസ്സിംഗ് സിസ്റ്റമാണെന്നും ചിന്ത എന്നത് കമ്പ്യൂട്ടേഷനാണെന്നുമുള്ള സിദ്ധാന്തം."
        },
        {
          "term": "Empiricism",
          "termMal": "എംപിരിസിസം",
          "def": "The philosophical theory that all knowledge originates in sensory experience, underpinning modern data-driven Machine Learning.",
          "defMal": "എല്ലാ അറിവുകളും ഇന്ദ്രിയാനുഭവങ്ങളിൽ നിന്നാണ് ഉണ്ടാകുന്നത് എന്ന സിദ്ധാന്തം."
        }
      ],
      "keyMetrics": [
        {
          "label": "Nyaya Pramanas",
          "value": "4 Sources",
          "detail": "Pratyaksha, Anumana, Upamana, and Shabda."
        },
        {
          "label": "Buddhist Logic",
          "value": "2 Pramanas",
          "detail": "Dignaga established Perception and Inference only."
        },
        {
          "label": "Functionalism",
          "value": "Hilary Putnam",
          "detail": "Pioneered functionalism and multiple realizability in 1960s."
        }
      ],
      "examTakeaways": [
        {
          "en": "Nyaya inference requires invariable concomitance (Vyapti) between the reason (Hetu) and the inferable property (Sadhya).",
          "mal": "ന്യായ ദർശനത്തിലെ അനുമാനത്തിന് ഹേതുവും സാദ്ധ്യവും തമ്മിലുള്ള അഭേദ്യമായ വ്യാപ്തി (Vyapti) അത്യന്താപേക്ഷിതമാണ്."
        },
        {
          "en": "Buddhist Anatta rejects a permanent metaphysical ego, closely paralleling modern connectionist distributed networks.",
          "mal": "ബുദ്ധമതത്തിലെ അനാത്മവാദം ശാശ്വത ആത്മാവിനെ നിഷേധിക്കുന്നു, ഇത് ആധുനിക ന്യൂറൽ നെറ്റ്വർക്കുകളോട് സാമ്യമുള്ളതാണ്."
        },
        {
          "en": "Empiricism is the intellectual forebear of Machine Learning, while Rationalism underlies classical Symbolic AI.",
          "mal": "എംപിരിസിസം മെഷീൻ ലേണിംഗിനും റാഷണലിസം സിംബോളിക് AI-ക്കും താത്ത്വിക അടിത്തറ നൽകുന്നു."
        },
        {
          "en": "Functionalism allows for multiple realizability, asserting minds are not limited exclusively to biological brains.",
          "mal": "ഫങ്ഷണലിസം അനുസരിച്ച് മനുഷ്യന്റെ തലച്ചോറിൽ മാത്രമല്ല, കമ്പ്യൂട്ടർ ചിപ്പുകളിലും മനസ്സ് ഉണ്ടാകാൻ സാധ്യതയുണ്ട്."
        }
      ]
    },
    "quizPool": [
      {
        "question": "How many valid sources of knowledge (Pramanas) are formally recognized in the classical Nyaya philosophical system?",
        "questionMal": "ക്ലാസിക്കൽ ന്യായ തത്ത്വചിന്താ സമ്പ്രദായത്തിൽ എത്ര പ്രമാണങ്ങളാണ് (അറിവിന്റെ ഉറവിടങ്ങൾ) അംഗീകരിക്കപ്പെട്ടിട്ടുള്ളത്?",
        "options": [
          {
            "en": "Two (Perception and Inference)",
            "mal": "രണ്ട് (പ്രത്യക്ഷവും അനുമാനവും)"
          },
          {
            "en": "Four (Pratyaksha, Anumana, Upamana, Shabda)",
            "mal": "നാല് (പ്രത്യക്ഷം, അനുമാനം, ഉപമാനം, ശബ്ദം)"
          },
          {
            "en": "Six (including Anupalabdhi and Arthapatti)",
            "mal": "ആറ് പ്രമാണങ്ങൾ"
          },
          {
            "en": "Only one (Sensory perception alone)",
            "mal": "ഒന്ന് മാത്രം (പ്രത്യക്ഷം മാത്രം)"
          }
        ],
        "answer": 1,
        "explanation": "Nyaya recognizes four Pramanas: Pratyaksha (Perception), Anumana (Inference), Upamana (Analogy), and Shabda (Verbal Testimony of trustworthy persons).",
        "explanationMal": "ന്യായ ദർശനം നാല് പ്രമാണങ്ങളെയാണ് അംഗീകരിക്കുന്നത്: പ്രത്യക്ഷം, അനുമാനം, ഉപമാനം, ശബ്ദം."
      },
      {
        "question": "Which celebrated philosopher is regarded as the founder of Buddhist logic and medieval Indian epistemology?",
        "questionMal": "മധ്യകാല ഭാരതീയ യുക്തിശാസ്ത്രത്തിന്റെയും ബുദ്ധ ജ്ഞാനശാസ്ത്രത്തിന്റെയും പിതാവായി കണക്കാക്കപ്പെടുന്നത് ആരെയാണ്?",
        "options": [
          {
            "en": "Dignaga",
            "mal": "ദിങ്നാഗൻ"
          },
          {
            "en": "Adi Shankara",
            "mal": "ആദിശങ്കരൻ"
          },
          {
            "en": "Ramanuja",
            "mal": "രാമാനുജൻ"
          },
          {
            "en": "Patanjali",
            "mal": "പതഞ്ജലി"
          }
        ],
        "answer": 0,
        "explanation": "Dignaga (along with his commentator Dharmakirti) established Buddhist logic, reducing all valid knowledge sources exclusively to Perception (Pratyaksha) and Inference (Anumana).",
        "explanationMal": "ബുദ്ധ യുക്തിശാസ്ത്രത്തിന്റെ പിതാവാണ് ദിങ്നാഗൻ; പ്രത്യക്ഷവും അനുമാനവും മാത്രമാണ് അറിവിന്റെ ശരിയായ ഉറവിടങ്ങൾ എന്ന് അദ്ദേഹം വാദിച്ചു."
      },
      {
        "question": "In the Buddhist doctrine of Anatta (No-Self), how is the human mind conceptualized?",
        "questionMal": "ബുദ്ധമതത്തിലെ 'അനാത്മവാദം' (Anatta) അനുസരിച്ച് മനസ്സ് എങ്ങനെയാണ് വിഭാവനം ചെയ്യപ്പെടുന്നത്?",
        "options": [
          {
            "en": "As an immortal, permanent, indivisible Cartesian substance",
            "mal": "ശാശ്വതമായ അദൃശ്യ ആത്മാവായി"
          },
          {
            "en": "As a dynamic, impermanent stream of interacting physical and mental aggregates (Skandhas)",
            "mal": "സ്ഥിരമായ ആത്മാവില്ലാത്ത, നിരന്തരം മാറിക്കൊണ്ടിരിക്കുന്ന അനുഭവങ്ങളുടെയും ചിന്തകളുടെയും പ്രവാഹം (സ്കന്ധങ്ങൾ)"
          },
          {
            "en": "As a purely mechanical diesel combustion engine",
            "mal": "ഒരു യാന്ത്രിക എൻജിൻ"
          },
          {
            "en": "As an optical illusion generated by lunar gravity",
            "mal": "ചന്ദ്രന്റെ ഗുരുത്വാകർഷണം ഉണ്ടാക്കുന്ന മിഥ്യ"
          }
        ],
        "answer": 1,
        "explanation": "Anatta teaches that there is no unchanging permanent soul or ego; what we call the self is a flux of five causal aggregates (Skandhas), mirroring distributed neural processing.",
        "explanationMal": "മാറ്റമില്ലാത്ത ശാശ്വത ആത്മാവില്ലെന്നും വിവിധ ഘടകങ്ങൾ ഒത്തുചേർന്ന് ഉണ്ടാകുന്ന ചിന്താപ്രവാഹമാണ് മനസ്സ് എന്നും ബുദ്ധമതം പഠിപ്പിക്കുന്നു."
      },
      {
        "question": "Which epistemological school asserts that all knowledge originates strictly in sensory experience, forming the conceptual root of Machine Learning?",
        "questionMal": "എല്ലാ അറിവുകളും ഇന്ദ്രിയാനുഭവങ്ങളിലൂടെയാണ് ഉണ്ടാകുന്നത് എന്ന് വാദിക്കുന്നതും മെഷീൻ ലേണിംഗിന്റെ അടിസ്ഥാനവുമായ തത്ത്വചിന്താ ശാഖ ഏതാണ്?",
        "options": [
          {
            "en": "Rationalism",
            "mal": "റാഷണലിസം"
          },
          {
            "en": "Empiricism",
            "mal": "എംപിരിസിസം (Empiricism)"
          },
          {
            "en": "Solipsism",
            "mal": "സോളിപ്സിസം"
          },
          {
            "en": "Nihilism",
            "mal": "നിഹിലിസം"
          }
        ],
        "answer": 1,
        "explanation": "Empiricism (Locke, Hume) holds that the mind begins as a blank slate (Tabula Rasa) and learns patterns through sensory observation, precisely how modern data-driven AI models learn.",
        "explanationMal": "മനസ്സ് ഒരു ശൂന്യമായ സ്ലേറ്റാണെന്നും (Tabula Rasa) അനുഭവങ്ങളിൽ നിന്നാണ് അറിവ് നേടുന്നതെന്നും എംപിരിസിസം വാദിക്കുന്നു; ഡാറ്റ നോക്കി പഠിക്കുന്ന AI ഇതിന്റെ ഉദാഹരണമാണ്."
      },
      {
        "question": "Who formulated the philosophical theory of 'Functionalism' in the philosophy of mind during the 1960s?",
        "questionMal": "1960-കളിൽ മനസ്സിന്റെ തത്ത്വചിന്തയിൽ 'ഫങ്ഷണലിസം' (Functionalism) എന്ന സിദ്ധാന്തം അവതരിപ്പിച്ചത് ആര്?",
        "options": [
          {
            "en": "Hilary Putnam",
            "mal": "ഹിലരി പുട്നം"
          },
          {
            "en": "John Locke",
            "mal": "ജോൺ ലോക്ക്"
          },
          {
            "en": "David Hume",
            "mal": "ഡേവിഡ് ഹ്യൂം"
          },
          {
            "en": "Baruch Spinoza",
            "mal": "ബറൂക്ക് സ്പിനോസ"
          }
        ],
        "answer": 0,
        "explanation": "Hilary Putnam introduced Functionalism, proposing that mental states are defined by their functional organization and computational relations rather than biological hardware.",
        "explanationMal": "ഹിലരി പുട്നമാണ് ഫങ്ഷണലിസം അവതരിപ്പിച്ചത്; തലച്ചോറിന്റെ ഭൗതിക പദാർത്ഥത്തിലല്ല, മറിച്ച് അതിന്റെ പ്രവർത്തനങ്ങളിലാണ് മനസ്സ് കുടികൊള്ളുന്നത് എന്ന് അദ്ദേഹം വാദിച്ചു."
      },
      {
        "question": "What is meant by the philosophical term 'Multiple Realizability' in Functionalism?",
        "questionMal": "ഫങ്ഷണലിസത്തിലെ 'മൾട്ടിപ്പിൾ റിയലൈസബിലിറ്റി' (Multiple Realizability) എന്ന ആശയം എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
        "options": [
          {
            "en": "Mental states can be instantiated in different physical substrates, such as biological brains or silicon chips",
            "mal": "ഒരേ മാനസികാവസ്ഥകൾ തലച്ചോറിലെ ജൈവകോശങ്ങൾക്ക് പുറമെ സിലിക്കൺ കമ്പ്യൂട്ടർ ചിപ്പുകളിലും സാധ്യമാണ്"
          },
          {
            "en": "A single person can be in multiple locations simultaneously",
            "mal": "ഒരാൾക്ക് ഒരേസമയം പലയിടത്ത് നിൽക്കാം"
          },
          {
            "en": "Computers must have multiple video screens",
            "mal": "കമ്പ്യൂട്ടറുകൾക്ക് കൂടുതൽ സ്ക്രീനുകൾ വേണം"
          },
          {
            "en": "Dreams happen multiple times every night",
            "mal": "സ്വപ്നങ്ങൾ രാത്രിയിൽ ആവർത്തിക്കുന്നു"
          }
        ],
        "answer": 0,
        "explanation": "Multiple Realizability asserts that as long as the functional relations are preserved, mental properties can exist in carbon brains, electronic computers, or hypothetical alien biology.",
        "explanationMal": "പ്രവർത്തനങ്ങൾ കൃത്യമാണെങ്കിൽ ജൈവിക തലച്ചോറിൽ മാത്രമല്ല, കമ്പ്യൂട്ടറുകളിലും കൃത്രിമ മനസ്സ് പ്രവർത്തിപ്പിക്കാനാകും എന്ന ആശയമാണിത്."
      },
      {
        "question": "What is the crucial relationship known as 'Vyapti' in Nyaya inference (Anumana)?",
        "questionMal": "ന്യായ ദർശനത്തിലെ അനുമാനത്തിൽ (Inference) 'വ്യാപ്തി' (Vyapti) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The invariable universal concomitance between the middle term (Hetu) and the major term (Sadhya)",
            "mal": "ഹേതുവും സാദ്ധ്യവും തമ്മിലുള്ള അഭേദ്യവും ശാശ്വതവുമായ പരസ്പര ബന്ധം (ഉദാ: പുകയുള്ളിടത്തെല്ലാം തീ ഉണ്ടാകും)"
          },
          {
            "en": "The speed of sound through cold water",
            "mal": "ശബ്ദത്തിന്റെ വേഗത"
          },
          {
            "en": "A grammatical punctuation mark",
            "mal": "വ്യാകരണ ചിഹ്നം"
          },
          {
            "en": "A religious chant performed at dusk",
            "mal": "സന്ധ്യാ പ്രാർത്ഥന"
          }
        ],
        "answer": 0,
        "explanation": "Vyapti is the unconditional, invariable relation between Hetu (smoke) and Sadhya (fire) that validates logical inference in Indian epistemology.",
        "explanationMal": "ഹേതുവും സാദ്ധ്യവും തമ്മിലുള്ള മാറ്റമില്ലാത്ത ബന്ധമാണ് വ്യാപ്തി; തീ ഇല്ലാതെ പുക ഉണ്ടാകില്ല എന്ന അറിവാണ് ഇതിന് ഉദാഹരണം."
      },
      {
        "question": "Jerry Fodor developed which influential hypothesis about how thoughts are symbolically structured in the mind?",
        "questionMal": "മനസ്സിൽ ചിന്തകൾ എങ്ങനെ ചിട്ടപ്പെടുത്തിയിരിക്കുന്നു എന്നതിനെക്കുറിച്ച് ജെറി ഫോഡോർ അവതരിപ്പിച്ച സിദ്ധാന്തം ഏതാണ്?",
        "options": [
          {
            "en": "Language of Thought Hypothesis (Mentalese)",
            "mal": "ലാംഗ്വേജ് ഓഫ് തോട്ട് (മെന്റലീസ്)"
          },
          {
            "en": "Silent Movie Theory",
            "mal": "സൈലന്റ് മൂവി തിയറി"
          },
          {
            "en": "Random Acoustic Resonance",
            "mal": "ശബ്ദ തരംഗ സിദ്ധാന്തം"
          },
          {
            "en": "Total Amnesia Framework",
            "mal": "മറവി സിദ്ധാന്തം"
          }
        ],
        "answer": 0,
        "explanation": "Fodor posited that thinking occurs in a formal internal mental language ('Mentalese') with syntactic and combinatorial properties analogous to computer programming languages.",
        "explanationMal": "മനുഷ്യന്റെ ചിന്തകൾ നടക്കുന്നത് 'മെന്റലീസ്' എന്ന ഒരു ആന്തരിക പ്രതീകാത്മക ഭാഷയിലൂടെയാണെന്ന് ജെറി ഫോഡോർ സമർത്ഥിച്ചു."
      },
      {
        "question": "How did Immanuel Kant famously reconcile Rationalism and Empiricism in his 'Critique of Pure Reason'?",
        "questionMal": "ഇമ്മാനുവൽ കാന്റ് റാഷണലിസത്തെയും എംപിരിസിസത്തെയും എങ്ങനെയാണ് സമന്വയിപ്പിച്ചത്?",
        "options": [
          {
            "en": "He argued knowledge requires both sensory experience and innate a priori conceptual categories ('Thoughts without content are empty, intuitions without concepts are blind')",
            "mal": "അറിവിന് ഇന്ദ്രിയാനുഭവങ്ങളും ഒപ്പം മനസ്സിന്റെ ആന്തരിക സങ്കല്പങ്ങളും ഒരുപോലെ വേണമെന്ന് വാദിച്ചു"
          },
          {
            "en": "He completely rejected mathematics and geometry",
            "mal": "ഗണിതശാസ്ത്രത്തെ തള്ളിക്കളഞ്ഞു"
          },
          {
            "en": "He declared only books written in Latin contain truth",
            "mal": "ലാറ്റിൻ ഭാഷയിൽ മാത്രമേ സത്യമുള്ളൂ എന്ന് പറഞ്ഞു"
          },
          {
            "en": "He stated humans cannot learn anything after childhood",
            "mal": "കുട്ടിക്കാലത്തിന് ശേഷം ഒന്നും പഠിക്കാനാവില്ലെന്ന് പറഞ്ഞു"
          }
        ],
        "answer": 0,
        "explanation": "Kant synthesized both traditions by showing that while experience provides empirical raw content, the human mind provides the necessary organizational conceptual frameworks.",
        "explanationMal": "ഇന്ദ്രിയങ്ങളിലൂടെ ലഭിക്കുന്ന വിവരങ്ങളെ മനസ്സ് അതിന്റെ അന്തർലീനമായ ചട്ടക്കൂടുകൾ വഴി ക്രമീകരിക്കുമ്പോഴാണ് യഥാർത്ഥ അറിവുണ്ടാകുന്നതെന്ന് കാന്റ് വ്യക്തമാക്കി."
      },
      {
        "question": "What is 'Pratityasamutpada' in Buddhist philosophy?",
        "questionMal": "ബുദ്ധ തത്ത്വചിന്തയിലെ 'പ്രതീത്യസമുത്പാദം' എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The doctrine of Dependent Origination (All phenomena arise in dependence upon causes and conditions)",
            "mal": "കാരണങ്ങളെ ആശ്രയിച്ച് മാത്രം കാര്യങ്ങൾ ഉണ്ടാകുന്നു എന്ന സിദ്ധാന്തം (Dependent Origination)"
          },
          {
            "en": "A technique for metal sword forging",
            "mal": "വാളുകൾ നിർമ്മിക്കുന്ന വിദ്യ"
          },
          {
            "en": "A royal coronation ceremony",
            "mal": "രാജാവിന്റെ കിരീടധാരണം"
          },
          {
            "en": "A type of ancient stringed musical instrument",
            "mal": "പുരാതന സംഗീതോപകരണം"
          }
        ],
        "answer": 0,
        "explanation": "Dependent Origination is the core Buddhist insight that nothing exists independently or permanently; everything is causally conditional and relational.",
        "explanationMal": "കാരണങ്ങളില്ലാതെ യാതൊന്നും ഉണ്ടാകുന്നില്ലെന്നും എല്ലാം പരസ്പരം ബന്ധപ്പെട്ടിരിക്കുന്നുവെന്നുമുള്ള ബുദ്ധദർശനമാണിത്."
      },
      {
        "question": "In artificial intelligence, what is 'Knowledge Representation' primarily concerned with?",
        "questionMal": "ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിൽ 'നോളജ് റെപ്രസെന്റേഷൻ' (Knowledge Representation) പ്രധാനമായും എന്തുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു?",
        "options": [
          {
            "en": "Formalizing real-world facts and relationships into computational structures so machines can make inferences",
            "mal": "ലോകത്തിലെ അറിവുകളെയും ബന്ധങ്ങളെയും കമ്പ്യൂട്ടറുകൾക്ക് മനസ്സിലാകാനും യുക്തിപൂർവ്വം ഉപയോഗിക്കാനും കഴിയുന്ന രീതിയിൽ ക്രോഡീകരിക്കൽ"
          },
          {
            "en": "Printing hardbound encyclopedias",
            "mal": "വിജ്ഞാനകോശങ്ങൾ അച്ചടിക്കൽ"
          },
          {
            "en": "Painting portraits of famous scientists",
            "mal": "ശാസ്ത്രജ്ഞരുടെ ചിത്രങ്ങൾ വരയ്ക്കൽ"
          },
          {
            "en": "Teaching robots how to speak in sign language only",
            "mal": "ആംഗ്യഭാഷ മാത്രം പഠിപ്പിക്കൽ"
          }
        ],
        "answer": 0,
        "explanation": "Knowledge representation uses ontologies, semantic networks, and predicate logic so autonomous algorithms can reason effectively about the physical world.",
        "explanationMal": "യന്ത്രങ്ങൾക്ക് സ്വയം ചിന്തിച്ച് തീരുമാനങ്ങളെടുക്കാൻ വിവരങ്ങളെ കൃത്യമായ ഡിജിറ്റൽ ചട്ടക്കൂടുകളിൽ സജ്ജീകരിക്കുന്ന രീതിയാണിത്."
      },
      {
        "question": "Which ancient Indian philosophical school is fundamentally atomistic and realistic, closely associated with Nyaya?",
        "questionMal": "ന്യായ ദർശനവുമായി അടുത്ത ബന്ധമുള്ളതും പ്രപഞ്ചത്തെ പരമാണുക്കളാൽ നിർമ്മിതമായി കാണുന്നതുമായ ഭാരതീയ ദർശനം ഏതാണ്?",
        "options": [
          {
            "en": "Vaisheshika",
            "mal": "വൈശേഷികം (Vaisheshika)"
          },
          {
            "en": "Advaita Vedanta",
            "mal": "അദ്വൈത വേദാന്തം"
          },
          {
            "en": "Charvaka",
            "mal": "ചാർവാകം"
          },
          {
            "en": "Dvaita",
            "mal": "ദ്വൈതം"
          }
        ],
        "answer": 0,
        "explanation": "Founded by Sage Kanada, Vaisheshika is a realistic ontology that classifies reality into seven Padarthas (categories) and explains physical nature through atomic theory.",
        "explanationMal": "കണാദ മഹർഷി സ്ഥാപിച്ച വൈശേഷിക ദർശനം പ്രപഞ്ചത്തെ പരമാണുക്കളായും 7 പദാർത്ഥങ്ങളായും തരംതിരിച്ചു വിശകലനം ചെയ്യുന്നു."
      },
      {
        "question": "What is the primary difference between deductive reasoning and inductive reasoning?",
        "questionMal": "ഡിഡക്റ്റീവ് റീസണിംഗും ഇൻഡക്റ്റീവ് റീസണിംഗും തമ്മിലുള്ള പ്രധാന വ്യത്യാസം എന്താണ്?",
        "options": [
          {
            "en": "Deduction guarantees true conclusions if premises are true; induction derives probabilistic generalizations from specific observations",
            "mal": "ഡിഡക്ഷൻ സാർവ്വത്രിക നിയമങ്ങളിൽ നിന്ന് നിർബന്ധിത നിഗമനങ്ങളിലെത്തുമ്പോൾ, ഇൻഡക്ഷൻ നിരീക്ഷണങ്ങളിൽ നിന്ന് സാധ്യതകളെ അനുമാനിക്കുന്നു"
          },
          {
            "en": "Deduction is only used by police detectives",
            "mal": "ഡിഡക്ഷൻ പോലീസുകാർക്ക് മാത്രമുള്ളതാണ്"
          },
          {
            "en": "Induction produces zero errors 100% of the time",
            "mal": "ഇൻഡക്ഷനിൽ തെറ്റുകൾ ഉണ്ടാകില്ല"
          },
          {
            "en": "There is no intellectual difference",
            "mal": "വ്യത്യാസമില്ല"
          }
        ],
        "answer": 0,
        "explanation": "Deduction moves from general rules to specific certainties (symbolic logic), while induction moves from specific data points to general probabilistic patterns (machine learning).",
        "explanationMal": "നിയമങ്ങളിൽ നിന്ന് നിഗമനങ്ങളിലേക്ക് പോകുന്നതാണ് ഡിഡക്ഷൻ; പ്രത്യേക വിവരങ്ങളിൽ നിന്ന് പൊതുവായ പാറ്റേണുകൾ കണ്ടെത്തുന്നതാണ് ഇൻഡക്ഷൻ (മെഷീൻ ലേണിംഗ്)."
      },
      {
        "question": "What is 'Ontology' within the domains of philosophy and modern AI knowledge engineering?",
        "questionMal": "തത്ത്വചിന്തയിലും ആധുനിക AI-യിലും 'ഓന്റോളജി' (Ontology) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "A formal explicit specification of concepts, entities, and relationships that exist within a domain",
            "mal": "ഒരു വിഷയത്തിലെ വസ്തുക്കളും ആശയങ്ങളും അവ തമ്മിലുള്ള പരസ്പര ബന്ധങ്ങളും വ്യക്തമാക്കുന്ന ഔദ്യോഗിക ചട്ടക്കൂട്"
          },
          {
            "en": "The study of dental surgery",
            "mal": "ദന്തചികിത്സാ പഠനം"
          },
          {
            "en": "The science of dinosaur fossils",
            "mal": "ഫോസിലുകളെക്കുറിച്ചുള്ള പഠനം"
          },
          {
            "en": "A collection of medieval folk music",
            "mal": "നാടോടി പാട്ടുകളുടെ ശേഖരം"
          }
        ],
        "answer": 0,
        "explanation": "In computer science and philosophy, an ontology defines the formal taxonomy of categories and concepts that model a particular domain of existence.",
        "explanationMal": "ഒരു മേഖലയിൽ നിലനിൽക്കുന്ന വസ്തുക്കളെയും അവ തമ്മിലുള്ള ബന്ധങ്ങളെയും കമ്പ്യൂട്ടറുകൾക്ക് മനസ്സിലാക്കാൻ പാകത്തിൽ വർഗ്ഗീകരിക്കുന്ന പഠനമാണിത്."
      },
      {
        "question": "Why is the Computational Theory of Mind (CTM) philosophically significant for Artificial Intelligence?",
        "questionMal": "കമ്പ്യൂട്ടേഷണൽ തിയറി ഓഫ് മൈൻഡ് (CTM) AI-യെ സംബന്ധിച്ചിടത്തോളം തത്ത്വചിന്താപരമായി സുപ്രധാനമാകുന്നത് എന്തുകൊണ്ട്?",
        "options": [
          {
            "en": "Because it asserts that human thinking itself is computational, implying that machines with computation can achieve real thought",
            "mal": "മനുഷ്യന്റെ ചിന്ത എന്നത് തന്നെ ഒരു കണക്കുകൂട്ടലായതിനാൽ, കമ്പ്യൂട്ടറുകൾക്കും യഥാർത്ഥ ചിന്താശേഷി കൈവരിക്കാനാകും എന്ന് ഇത് വ്യക്തമാക്കുന്നു"
          },
          {
            "en": "Because it proves that computers can never play chess",
            "mal": "കമ്പ്യൂട്ടറുകൾക്ക് ചെസ്സ് കളിക്കാൻ കഴിയില്ലെന്ന് സമർത്ഥിക്കുന്നു"
          },
          {
            "en": "Because it replaces electricity with water steam",
            "mal": "വൈദ്യുതിക്ക് പകരം നീരാവി ഉപയോഗിക്കുന്നു"
          },
          {
            "en": "Because it bans software development in universities",
            "mal": "സോഫ്റ്റ്‌വെയർ പഠനം നിരോധിക്കുന്നു"
          }
        ],
        "answer": 0,
        "explanation": "If mental processes are literally computational algorithms running on brain hardware, artificial computer systems could achieve genuine minds.",
        "explanationMal": "മനുഷ്യ മനസ്സ് പ്രവർത്തിക്കുന്നത് വിവരങ്ങൾ സംസ്കരിച്ചുകൊണ്ടാണെങ്കിൽ, കൃത്രിമ യന്ത്രങ്ങളിലും സമാനമായ മനസ്സ് സൃഷ്ടിക്കാൻ കഴിയുമെന്ന സാധ്യത ഇത് മുന്നോട്ടുവെക്കുന്നു."
      }
    ]
  },
  "ai_mod_4": {
    "title": "Module 4 · Ethical and Philosophical Implications of AI Systems",
    "titleMal": "മൊഡ്യൂൾ 4 · AI സംവിധാനങ്ങളുടെ ധാർമ്മികവും തത്ത്വചിന്താപരവുമായ പ്രത്യാഘാതങ്ങൾ",
    "filename": "Module_4_Ethical_and_Philosophical_Implications_of_AI_System.pdf",
    "summary": {
      "overview": "Critical philosophical analysis of the ethical dilemmas, social transformations, and governance challenges posed by autonomous artificial intelligence. Examines the distinction between moral agency and moral patience, algorithmic bias and systemic discrimination, the Black Box problem, ethical decision-making in autonomous vehicles (The Trolley Problem), and the erosion of human autonomy under surveillance capitalism.",
      "overviewMal": "സ്വയംഭരണാധികാരമുള്ള AI സംവിധാനങ്ങൾ ഉയർത്തുന്ന ധാർമ്മിക പ്രതിസന്ധികൾ, സാമൂഹിക മാറ്റങ്ങൾ, വെല്ലുവിളികൾ എന്നിവയുടെ തത്ത്വചിന്താപരമായ പരിശോധന. ധാർമ്മിക പ്രവർത്തകരും (Moral Agents) ധാർമ്മിക അനുഭവസ്ഥരും (Moral Patients) തമ്മിലുള്ള വ്യത്യാസം, അൽഗോരിതങ്ങളിലെ പക്ഷപാതം, ബ്ലാക്ക് ബോക്സ് പ്രതിസന്ധി, സ്വയം ഓടുന്ന കാറുകളിലെ ധാർമ്മിക നിയമങ്ങൾ (ട്രോളി പ്രശ്നം), സർവൈലൻസ് ക്യാപ്പിറ്റലിസം എന്നിവയെല്ലാം ഈ അധ്യായം സമഗ്രമായി ചർച്ച ചെയ്യുന്നു.",
      "sections": [
        {
          "badge": "Part 1",
          "title": "Moral Agency, Moral Patience & Legal Accountability",
          "titleMal": "ധാർമ്മിക പ്രവർത്തനം, ധാർമ്മിക ബാധ്യത, നിയമപരമായ ഉത്തരവാദിത്തം",
          "points": [
            {
              "en": "Moral Agents are entities capable of understanding moral duties, forming intentions, and being held morally accountable for their actions (traditionally adult human beings).",
              "mal": "ധാർമ്മിക പ്രവർത്തകർ (Moral Agents): ശരിയും തെറ്റും തിരിച്ചറിയാനും സ്വന്തം പ്രവൃത്തികൾക്ക് ധാർമ്മികമായി ഉത്തരവാദികളാകാനും കഴിയുന്നവരാണ്."
            },
            {
              "en": "Moral Patients are entities worthy of moral consideration that can experience harm, suffering, or well-being (such as human infants, non-human animals, and potentially future sentient AI).",
              "mal": "ധാർമ്മിക അനുഭവസ്ഥർ (Moral Patients): മറ്റുള്ളവരുടെ പ്രവൃത്തികളാൽ ഉപദ്രവിക്കപ്പെടാനോ സംരക്ഷിക്കപ്പെടാനോ അർഹതയുള്ളവരാണ് (ഉദാ: കുട്ടികൾ, മൃഗങ്ങൾ)."
            },
            {
              "en": "The Accountability Gap: When an autonomous machine harms a human (e.g., surgical robot or self-driving car), traditional legal frameworks struggle to allocate liability between developers, users, and the machine itself.",
              "mal": "ഉത്തരവാദിത്ത പ്രതിസന്ധി: ഒരു യന്ത്രം തെറ്റ് വരുത്തുമ്പോൾ ഡെവലപ്പർക്കോ ഉടമയ്ക്കോ അതോ യന്ത്രത്തിനോ ഉത്തരവാദിത്തം എന്നതിൽ നിയമപരമായ തർക്കങ്ങൾ നിലനിൽക്കുന്നു."
            }
          ]
        },
        {
          "badge": "Part 2",
          "title": "Algorithmic Bias, Fairness & The Black Box Problem",
          "titleMal": "അൽഗോരിതങ്ങളിലെ പക്ഷപാതം, നീതി, ബ്ലാക്ക് ബോക്സ് പ്രശ്നം",
          "points": [
            {
              "en": "Algorithmic Bias occurs when machine learning models inherit, amplify, and perpetuate historical human prejudices embedded within training datasets (e.g., criminal sentencing, recruitment, and loan underwriting).",
              "mal": "പരിശീലന ഡാറ്റയിലെ മുൻവിധികളെ AI ആവർത്തിക്കുകയും വർദ്ധിപ്പിക്കുകയും ചെയ്യുമ്പോഴാണ് അൽഗോരിതങ്ങളിൽ പക്ഷപാതം (Bias) ഉണ്ടാകുന്നത്."
            },
            {
              "en": "The Black Box Problem: Deep neural networks with billions of weights make high-stakes life decisions through opaque statistical representations that even their original creators cannot fully explain.",
              "mal": "ബ്ലാക്ക് ബോക്സ് പ്രശ്നം: ആധുനിക ഡീപ് ലേണിംഗ് മോഡലുകൾ എങ്ങനെയാണ് ഒരു തീരുമാനത്തിൽ എത്തിയത് എന്ന് വിശദീകരിക്കാൻ അവ നിർമ്മിച്ച ശാസ്ത്രജ്ഞർക്ക് പോലും പലപ്പോഴും സാധിക്കുന്നില്ല."
            },
            {
              "en": "Explainable AI (XAI) and the 'Right to Explanation' (GDPR) aim to restore transparency, procedural justice, and algorithmic accountability.",
              "mal": "തീരുമാനങ്ങൾക്ക് പിന്നിലെ കാരണം അറിയാനുള്ള അവകാശവും (Right to Explanation) സുതാര്യമായ AI-യും ഉറപ്പാക്കാനുള്ള ശ്രമങ്ങൾ നടക്കുന്നു."
            }
          ]
        },
        {
          "badge": "Part 3",
          "title": "Autonomous Decision-Making & The Moral Trolley Problem",
          "titleMal": "സ്വയംഭരണ തീരുമാനങ്ങളും ധാർമ്മിക ട്രോളി പ്രശ്നവും",
          "points": [
            {
              "en": "Philippa Foot formulated the Trolley Problem: Should an agent intervene to divert a runaway trolley to kill one person in order to save five?",
              "mal": "ഫിലിപ്പ ഫൂട്ടിന്റെ ട്രോളി പ്രശ്നം: അഞ്ച് പേരെ രക്ഷിക്കാനായി ഒരാളുടെ ജീവൻ ബലികൊടുക്കാൻ പാളത്തിന്റെ വഴി മാറ്റാമോ എന്ന ധാർമ്മിക ചോദ്യം."
            },
            {
              "en": "Autonomous Vehicles face real-world analogs: In unavoidable collision scenarios, should the car prioritize pedestrian lives or the safety of its passenger?",
              "mal": "സ്വയം ഓടുന്ന കാറുകളിലെ സമാനമായ പ്രതിസന്ധി: അപകടം ഒഴിവാക്കാനാകാത്ത ഘട്ടത്തിൽ കാറിലെ യാത്രക്കാരെയോ അതോ റോഡിലെ കാൽനടയാത്രക്കാരെയോ രക്ഷിക്കേണ്ടത്?"
            },
            {
              "en": "Utilitarianism (Bentham/Mill) dictates maximizing overall aggregate lives saved, whereas Deontology (Kant) prohibits using any human merely as a means to an end.",
              "mal": "കൂടുതൽ ആളുകളെ രക്ഷിക്കണമെന്ന് യൂട്ടിലിറ്റേറിയനിസം വാദിക്കുമ്പോൾ, ഒരാളെയും മറ്റുള്ളവർക്കായി ഉപകരണമാക്കരുതെന്ന് കാന്റിയൻ ധാർമ്മികത നിഷ്കർഷിക്കുന്നു."
            }
          ]
        },
        {
          "badge": "Part 4",
          "title": "AI, Social Relationships & Surveillance Capitalism",
          "titleMal": "AI-യും സാമൂഹിക ബന്ധങ്ങളും സർവൈലൻസ് ക്യാപ്പിറ്റലിസവും",
          "points": [
            {
              "en": "Emotional Artificial Intelligence: Companion chatbots exploit human tendencies toward anthropomorphism (ELIZA effect), risking parasocial attachment and emotional isolation.",
              "mal": "എലിസ ഇഫക്റ്റ്: യന്ത്രങ്ങളെ മനുഷ്യരായി സങ്കൽപ്പിച്ച് വൈകാരികമായി ആശ്രയിക്കുന്ന മനുഷ്യന്റെ മാനസിക അവസ്ഥ."
            },
            {
              "en": "Surveillance Capitalism (Shoshana Zuboff): Unilateral extraction of private behavioral data transformed into behavioral prediction products that modify human behavior for corporate profit.",
              "mal": "സർവൈലൻസ് ക്യാപ്പിറ്റലിസം: മനുഷ്യരുടെ പെരുമാറ്റത്തെയും രഹസ്യ വിവരങ്ങളെയും വിപണി ലാഭത്തിനായി ഉപയോഗിക്കുന്ന രീതി."
            }
          ]
        }
      ],
      "coreConcepts": [
        {
          "term": "Moral Agency",
          "termMal": "ധാർമ്മിക പ്രവർത്തനം",
          "def": "The capacity of an entity to deliberate about right and wrong and bear moral responsibility for choices.",
          "defMal": "ശരിയും തെറ്റും സ്വയം മനസ്സിലാക്കി പ്രവർത്തിക്കാനും അതിന്റെ ഫലം അനുഭവിക്കാനുമുള്ള കഴിവ്."
        },
        {
          "term": "Algorithmic Bias",
          "termMal": "അൽഗോരിതമിക് ബയാസ്",
          "def": "Systematic and unfair discrimination in automated decision systems resulting from biased training data.",
          "defMal": "വിവരങ്ങളിലെ തെറ്റുകൾ കാരണം കമ്പ്യൂട്ടർ സംവിധാനങ്ങൾ കാട്ടുന്ന അന്യായമായ പക്ഷപാതം."
        },
        {
          "term": "The Trolley Problem",
          "termMal": "ട്രോളി പ്രശ്നം",
          "def": "A classic ethical thought experiment exploring moral dilemmas involving unavoidable sacrifices for the greater good.",
          "defMal": "കൂടുതൽ പേരെ രക്ഷിക്കാൻ ഒരാളെ ബലികൊടുക്കാമോ എന്നതിനെക്കുറിച്ചുള്ള പ്രസിദ്ധമായ ധാർമ്മിക ചിന്താപരീക്ഷണം."
        },
        {
          "term": "Surveillance Capitalism",
          "termMal": "സർവൈലൻസ് ക്യാപ്പിറ്റലിസം",
          "def": "Shoshana Zuboff's concept of an economic system centered on commodifying private behavioral surveillance data.",
          "defMal": "മനുഷ്യന്റെ ഡിജിറ്റൽ സ്വകാര്യതയെയും വിവരങ്ങളെയും ലാഭകരമായ ചരക്കാക്കി മാറ്റുന്ന സാമ്പത്തിക രീതി."
        }
      ],
      "keyMetrics": [
        {
          "label": "Trolley Problem",
          "value": "Philippa Foot",
          "detail": "Introduced the classic philosophical dilemma in 1967."
        },
        {
          "label": "ELIZA Effect",
          "value": "Joseph Weizenbaum",
          "detail": "Documented human emotional attachment to text chatbots in 1966."
        },
        {
          "label": "Surveillance Capitalism",
          "value": "Shoshana Zuboff",
          "detail": "Analyzed behavioral modification architecture in 2019."
        }
      ],
      "examTakeaways": [
        {
          "en": "Entities that experience suffering are moral patients; entities held responsible for choices are moral agents.",
          "mal": "വേദന അനുഭവിക്കുന്നവർ ധാർമ്മിക അനുഭവസ്ഥരും (Patients), ഉത്തരവാദിത്തമുള്ളവർ ധാർമ്മിക പ്രവർത്തകരുമാണ് (Agents)."
        },
        {
          "en": "Algorithmic bias reflects historical societal inequities embedded within historical training data.",
          "mal": "സമൂഹത്തിലെ ചരിത്രപരമായ അനീതികളാണ് ഡാറ്റയിലൂടെ അൽഗോരിതങ്ങളിലെ പക്ഷപാതമായി പുറത്തുവരുന്നത്."
        },
        {
          "en": "Self-driving car safety policies illustrate the conflict between Kantian duty and Utilitarian optimization.",
          "mal": "ഓട്ടോണമസ് കാറുകളുടെ സുരക്ഷാ നിയമങ്ങൾ കാന്റിയൻ ചിന്തയും യൂട്ടിലിറ്റേറിയൻ ചിന്തയും തമ്മിലുള്ള സംഘർഷത്തെ കാണിക്കുന്നു."
        },
        {
          "en": "Explainable AI (XAI) is critical to prevent automated arbitrary discrimination in judicial and lending systems.",
          "mal": "കോടതികളിലും ബാങ്കുകളിലും അന്യായമായ വിവേചനം തടയാൻ എക്സ്പ്ലെയ്നബിൾ AI (XAI) അത്യന്താപേക്ഷിതമാണ്."
        }
      ]
    },
    "quizPool": [
      {
        "question": "In moral philosophy, what is the crucial distinction between a 'Moral Agent' and a 'Moral Patient'?",
        "questionMal": "ധാർമ്മിക തത്ത്വചിന്തയിൽ 'മോറൽ ഏജന്റ്' (Moral Agent), 'മോറൽ പേഷ്യന്റ്' (Moral Patient) എന്നിവ തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?",
        "options": [
          {
            "en": "A moral agent has moral duties and accountability; a moral patient is an entity worthy of moral consideration that can be harmed",
            "mal": "മോറൽ ഏജന്റിന് ധാർമ്മിക ഉത്തരവാദിത്തമുണ്ട്; മോറൽ പേഷ്യന്റ് സംരക്ഷണം അർഹിക്കുന്ന, ഉപദ്രവിക്കപ്പെടാൻ സാധ്യതയുള്ള ഒന്നാണ്"
          },
          {
            "en": "Moral agents are doctors, while moral patients are sick people in hospitals",
            "mal": "ഏജന്റുകൾ ഡോക്ടർമാരും പേഷ്യന്റുകൾ രോഗികളുമാണ്"
          },
          {
            "en": "Moral agents write software, while moral patients buy phones",
            "mal": "ഏജന്റുകൾ സോഫ്റ്റ്‌വെയർ എഴുതുന്നു, പേഷ്യന്റുകൾ ഫോൺ വാങ്ങുന്നു"
          },
          {
            "en": "There is no philosophical distinction",
            "mal": "വ്യത്യാസമില്ല"
          }
        ],
        "answer": 0,
        "explanation": "Moral agents can deliberate and bear responsibility for actions; moral patients deserve moral consideration because they can experience benefit or harm.",
        "explanationMal": "തീരുമാനങ്ങളെടുക്കാൻ കഴിവുള്ളവരാണ് മോറൽ ഏജന്റുകൾ; എന്നാൽ മറ്റുള്ളവരുടെ തീരുമാനങ്ങളാൽ ബാധിക്കപ്പെടുന്നവരാണ് മോറൽ പേഷ്യന്റുകൾ."
      },
      {
        "question": "Who originally formulated the famous 'Trolley Problem' ethical thought experiment in 1967?",
        "questionMal": "1967-ൽ പ്രസിദ്ധമായ 'ട്രോളി പ്രശ്നം' (Trolley Problem) ആദ്യമായി അവതരിപ്പിച്ച തത്ത്വചിന്തക ആര്?",
        "options": [
          {
            "en": "Philippa Foot",
            "mal": "ഫിലിപ്പ ഫൂട്ട്"
          },
          {
            "en": "Hannah Arendt",
            "mal": "ഹന്ന ആരന്റ്"
          },
          {
            "en": "Simone de Beauvoir",
            "mal": "സിമോൺ ദെ ബൊവിയർ"
          },
          {
            "en": "Mary Wollstonecraft",
            "mal": "മേരി വോൾസ്റ്റോൺക്രാഫ്റ്റ്"
          }
        ],
        "answer": 0,
        "explanation": "Philippa Foot formulated the Trolley Problem in 1967 to analyze the distinction between killing and letting die, later adapted by Judith Jarvis Thomson.",
        "explanationMal": "1967-ൽ ഫിലിപ്പ ഫൂട്ടാണ് ട്രോളി പ്രശ്നം അവതരിപ്പിച്ചത്; ഇത് ധാർമ്മിക തത്ത്വചിന്തയിലെ പ്രധാന വിഷയമാണ്."
      },
      {
        "question": "What is the primary cause of 'Algorithmic Bias' in modern machine learning systems?",
        "questionMal": "ആധുനിക മെഷീൻ ലേണിംഗ് സിസ്റ്റങ്ങളിൽ 'അൽഗോരിതമിക് ബയാസ്' (പക്ഷപാതം) ഉണ്ടാകാനുള്ള പ്രധാന കാരണം എന്താണ്?",
        "options": [
          {
            "en": "Historical inequities, prejudices, and systemic skew present in the human training data fed into the model",
            "mal": "പരിശീലനത്തിനായി നൽകുന്ന ഡാറ്റയിൽ അടങ്ങിയിരിക്കുന്ന ചരിത്രപരമായ മുൻവിധികളും തെറ്റുകളും"
          },
          {
            "en": "Computers catching biological viral infections",
            "mal": "കമ്പ്യൂട്ടറുകൾക്ക് വൈറസ് ബാധിക്കുന്നത്"
          },
          {
            "en": "A shortage of copper inside electrical cables",
            "mal": "കേബിളുകളിലെ ചെമ്പു കമ്പിയുടെ കുറവ്"
          },
          {
            "en": "Screen brightness being tuned too high",
            "mal": "മോണിറ്ററിലെ വെളിച്ചക്കൂടുതൽ"
          }
        ],
        "answer": 0,
        "explanation": "Machine learning algorithms extract statistical patterns from historical data; if past decisions contained systemic discrimination, the AI replicates and amplifies it.",
        "explanationMal": "ഡാറ്റയിൽ പണ്ടുമുതലേ ഉണ്ടായിരുന്ന സാമൂഹിക വിവേചനങ്ങൾ അൽഗോരിതം സ്വയം പഠിച്ചെടുക്കുന്നതാണ് ഇതിന് കാരണം."
      },
      {
        "question": "What is meant by the 'Black Box Problem' in deep learning artificial intelligence?",
        "questionMal": "ഡീപ് ലേണിംഗ് AI-യിലെ 'ബ്ലാക്ക് ബോക്സ് പ്രശ്നം' (Black Box Problem) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The inability to interpret or explain the internal mathematical reasoning behind an AI's high-stakes decision",
            "mal": "ഒരു തീരുമാനം എന്തുകൊണ്ട് എടുത്തു എന്ന് കമ്പ്യൂട്ടറിന്റെ ഉള്ളിലെ സങ്കീർണ്ണ കണക്കുകൂട്ടലുകൾ നോക്കി വിശദീകരിക്കാൻ കഴിയാത്ത അവസ്ഥ"
          },
          {
            "en": "Computers being shipped in painted wooden boxes",
            "mal": "കമ്പ്യൂട്ടറുകൾ കറുത്ത പെട്ടിയിൽ വരുന്നത്"
          },
          {
            "en": "The loss of electrical power in a server room",
            "mal": "വൈദ്യുതി നിലയ്ക്കുന്നത്"
          },
          {
            "en": "A computer keyboard without printed letters",
            "mal": "അക്ഷരങ്ങൾ മാഞ്ഞുപോയ കീബോർഡ്"
          }
        ],
        "answer": 0,
        "explanation": "Deep neural networks contain millions of parameters and non-linear interactions, creating opaque models whose decision pathways cannot be audited transparently.",
        "explanationMal": "ഡീപ് ലേണിംഗിലെ കോടിക്കണക്കിന് ന്യൂറോണുകളുടെ പ്രവർത്തനം മനുഷ്യന് പൂർണ്ണമായി വായിച്ചെടുക്കാൻ കഴിയില്ല; ഈ സുതാര്യതയില്ലായ്മയാണ് ബ്ലാക്ക് ബോക്സ് പ്രശ്നം."
      },
      {
        "question": "Which ethical philosophy mandates that autonomous vehicles must always prioritize saving the greatest number of total lives?",
        "questionMal": "കൂടുതൽ ആളുകളുടെ ജീവൻ രക്ഷിക്കുന്നതിനായിരിക്കണം സ്വയം നിയന്ത്രിത കാറുകൾ മുൻഗണന നൽകേണ്ടത് എന്ന് വാദിക്കുന്ന ധാർമ്മിക സിദ്ധാന്തം ഏതാണ്?",
        "options": [
          {
            "en": "Utilitarianism (Consequentialism)",
            "mal": "യൂട്ടിലിറ്റേറിയനിസം (Utilitarianism)"
          },
          {
            "en": "Kantian Deontology",
            "mal": "കാന്റിയൻ ഡിയന്റോളജി"
          },
          {
            "en": "Nihilism",
            "mal": "നിഹിലിസം"
          },
          {
            "en": "Egoism",
            "mal": "ഈഗോയിസം"
          }
        ],
        "answer": 0,
        "explanation": "Utilitarianism (Jeremy Bentham and John Stuart Mill) judges actions solely by their outcomes, aiming to maximize overall utility and aggregate lives saved.",
        "explanationMal": "ഏറ്റവും കൂടുതൽ ആളുകൾക്ക് പ്രയോജനം ചെയ്യുന്ന പരമാവധി ജീവനുകൾ രക്ഷിക്കുക എന്നതാണ് യൂട്ടിലിറ്റേറിയൻ ധാർമ്മികത."
      },
      {
        "question": "In Kantian deontology, why is it considered immoral to intentionally steer a self-driving car toward one innocent pedestrian to save five others?",
        "questionMal": "കാന്റിയൻ ധാർമ്മികതയനുസരിച്ച്, അഞ്ച് പേരെ രക്ഷിക്കാനായി നിരപരാധിയായ ഒരാളെ വണ്ടിയിടിപ്പിച്ചു കൊല്ലുന്നത് തെറ്റാകുന്നത് എന്തുകൊണ്ട്?",
        "options": [
          {
            "en": "Because human beings have inherent dignity and must never be treated merely as a means to an end",
            "mal": "മനുഷ്യന് സ്വതസിദ്ധമായ അന്തസ്സുള്ളതിനാൽ, ഒരാളെയും മറ്റുള്ളവർക്കായി ഉപകരണമായി ഉപയോഗിക്കാൻ പാടില്ല"
          },
          {
            "en": "Because car paint is too expensive to scratch",
            "mal": "കാറിന്റെ പെയിന്റ് ചീത്തയാകും"
          },
          {
            "en": "Because pedestrians are required by law to yield",
            "mal": "കാൽനടയാത്രക്കാരുടെ കുഴപ്പമായതിനാൽ"
          },
          {
            "en": "Because tires wear out during hard steering turns",
            "mal": "ടയറുകൾക്ക് കേടുപാടുകൾ സംഭവിക്കും"
          }
        ],
        "answer": 0,
        "explanation": "Immanuel Kant's Categorical Imperative dictates that rational beings possess intrinsic dignity and must never be sacrificed merely as disposable instruments for utilitarian gains.",
        "explanationMal": "മനുഷ്യൻ സ്വന്തം നിലയിൽ ലക്ഷ്യമാണ് (End in itself); ഒരാളെ മറ്റുള്ളവരുടെ രക്ഷയ്ക്കുള്ള വെറും ഉപകരണമാക്കുന്നത് അധാർമ്മികമാണെന്ന് കാന്റ് പഠിപ്പിച്ചു."
      },
      {
        "question": "Who authored the groundbreaking 2019 book 'The Age of Surveillance Capitalism'?",
        "questionMal": "2019-ൽ 'ദി ഏജ് ഓഫ് സർവൈലൻസ് ക്യാപ്പിറ്റലിസം' എന്ന പ്രശസ്തമായ പുസ്തകം രചിച്ച പണ്ഡിത ആര്?",
        "options": [
          {
            "en": "Shoshana Zuboff",
            "mal": "ശോഷാന സുബോഫ്"
          },
          {
            "en": "Naomi Klein",
            "mal": "നവോമി ക്ലൈൻ"
          },
          {
            "en": "Sheryl Sandberg",
            "mal": "ഷെറിൽ സാൻഡ്ബർഗ്"
          },
          {
            "en": "Margaret Thatcher",
            "mal": "മാർഗരറ്റ് താച്ചർ"
          }
        ],
        "answer": 0,
        "explanation": "Shoshana Zuboff exposed how tech monopolies commodify private human experience as behavioral surplus, fabricating prediction products to manipulate consumer action.",
        "explanationMal": "ശോഷാന സുബോഫാണ് മനുഷ്യന്റെ ഡിജിറ്റൽ ജീവിതത്തെ കമ്പനികൾ ചൂഷണം ചെയ്യുന്നതിനെക്കുറിച്ച് സർവൈലൻസ് ക്യാപ്പിറ്റലിസത്തിലൂടെ തുറന്നെഴുതിയത്."
      },
      {
        "question": "What is the 'ELIZA Effect' in human-computer interaction?",
        "questionMal": "മനുഷ്യനും കമ്പ്യൂട്ടറും തമ്മിലുള്ള ഇടപെടലുകളിലെ 'എലിസ ഇഫക്റ്റ്' (ELIZA Effect) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The human psychological tendency to anthropomorphize computers and attribute genuine empathy or feelings to simple chatbots",
            "mal": "ചാറ്റ്ബോട്ടുകൾക്ക് മനുഷ്യന്റേതുപോലെ സ്നേഹവും വികാരങ്ങളുമുണ്ടെന്ന് മനുഷ്യൻ സ്വയം തെറ്റിദ്ധരിക്കുന്ന മാനസികാവസ്ഥ"
          },
          {
            "en": "A sudden battery explosion in handheld devices",
            "mal": "ബാറ്ററി പൊട്ടിത്തെറിക്കുന്നത്"
          },
          {
            "en": "A musical melody played by modem routers",
            "mal": "റൂട്ടറുകളിലെ സംഗീതം"
          },
          {
            "en": "A coding language used by medical doctors",
            "mal": "ഡോക്ടർമാരുടെ പ്രോഗ്രാമിങ് ഭാഷ"
          }
        ],
        "answer": 0,
        "explanation": "Named after Joseph Weizenbaum's 1966 ELIZA program, it describes how humans project consciousness and emotions onto syntactic conversational software.",
        "explanationMal": "1966-ൽ ജോസഫ് വൈസൻബോം വികസിപ്പിച്ച എലിസ എന്ന ചാറ്റ്ബോട്ടിൽ നിന്നാണ് ഈ പദം ഉണ്ടായത്; യന്ത്രങ്ങളിൽ വികാരങ്ങൾ ആരോപിക്കുന്ന സ്വഭാവമാണിത്."
      },
      {
        "question": "What is the legal and philosophical dilemma known as the 'Accountability Gap' in autonomous systems?",
        "questionMal": "സ്വയംഭരണാധികാരമുള്ള യന്ത്രങ്ങളിലെ 'അക്കൗണ്ടബിലിറ്റി ഗ്യാപ്പ്' (Accountability Gap) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The difficulty of assigning moral or criminal responsibility when an autonomous machine independently causes catastrophic harm",
            "mal": "സ്വയം തീരുമാനങ്ങളെടുക്കുന്ന ഒരു യന്ത്രം അപകടമുണ്ടാക്കുമ്പോൾ അതിന്മേൽ ആരെയാണ് നിയമപരമായി കുറ്റപ്പെടുത്തേണ്ടത് എന്ന പ്രതിസന്ധി"
          },
          {
            "en": "A bank account missing five dollars",
            "mal": "ബാങ്ക് അക്കൗണ്ടിലെ പണക്കുറവ്"
          },
          {
            "en": "A gap between computer memory chips",
            "mal": "മെമ്മറി ചിപ്പുകൾ തമ്മിലുള്ള അകലം"
          },
          {
            "en": "The time it takes to reboot Windows",
            "mal": "കമ്പ്യൂട്ടർ ഓൺ ആകാൻ എടുക്കുന്ന സമയം"
          }
        ],
        "answer": 0,
        "explanation": "Because autonomous systems act without direct human control, neither the programmer, manufacturer, nor end-user satisfies traditional legal standards of intentional wrongdoing.",
        "explanationMal": "യന്ത്രങ്ങൾ സ്വതന്ത്രമായി പ്രവർത്തിക്കുമ്പോൾ ഉണ്ടാകുന്ന നാശനഷ്ടങ്ങൾക്ക് എൻജിനീയറോ, ഉടമയോ അതോ യന്ത്രം തന്നെയോ ഉത്തരവാദി എന്ന് തീരുമാനിക്കാൻ കഴിയാത്ത അവസ്ഥയാണിത്."
      },
      {
        "question": "What European legal framework established the 'Right to Explanation' for automated decisions impacting citizens?",
        "questionMal": "പൗരന്മാരെ ബാധിക്കുന്ന ഓട്ടോമേറ്റഡ് തീരുമാനങ്ങൾക്ക് പിന്നിലെ കാരണം അറിയാനുള്ള അവകാശം നൽകിയ യൂറോപ്യൻ നിയമം ഏതാണ്?",
        "options": [
          {
            "en": "General Data Protection Regulation (GDPR)",
            "mal": "ജനറൽ ഡാറ്റ പ്രൊട്ടക്ഷൻ റെഗുലേഷൻ (GDPR)"
          },
          {
            "en": "Magna Carta",
            "mal": "മാഗ്നാ കാർട്ട"
          },
          {
            "en": "Treaty of Versailles",
            "mal": "വേഴ്സായ് ഉടമ്പടി"
          },
          {
            "en": "Kyoto Protocol",
            "mal": "ക്യോട്ടോ പ്രോട്ടോക്കോൾ"
          }
        ],
        "answer": 0,
        "explanation": "The European Union's GDPR includes provisions entitling individuals to obtain meaningful information about the algorithmic logic involved in automated profiling.",
        "explanationMal": "യൂറോപ്യൻ യൂണിയന്റെ GDPR നിയമപ്രകാരം ഒരു കമ്പ്യൂട്ടർ സിസ്റ്റം എടുക്കുന്ന പ്രധാന തീരുമാനങ്ങളുടെ കാരണം പൗരന്മാർക്ക് വ്യക്തമാക്കിക്കൊടുക്കണം."
      },
      {
        "question": "What is 'Explainable AI' (XAI) primarily designed to achieve?",
        "questionMal": "'എക്സ്പ്ലെയ്നബിൾ AI' (XAI) പ്രധാനമായും എന്തിനുവേണ്ടിയാണ് വികസിപ്പിക്കുന്നത്?",
        "options": [
          {
            "en": "To make artificial intelligence decisions transparent, interpretable, and understandable to human stakeholders",
            "mal": "AI എടുക്കുന്ന തീരുമാനങ്ങളെ മനുഷ്യർക്ക് മനസ്സിലാകുന്ന രീതിയിൽ സുതാര്യവും വ്യക്തവുമാക്കുക"
          },
          {
            "en": "To translate computer code into musical notes",
            "mal": "കോഡിനെ സംഗീതമാക്കാൻ"
          },
          {
            "en": "To increase the wattage consumption of processors",
            "mal": "കൂടുതൽ കറണ്ട് ഉപയോഗിക്കാൻ"
          },
          {
            "en": "To speed up video gaming framerates",
            "mal": "വീഡിയോ ഗെയിമിന്റെ വേഗത കൂട്ടാൻ"
          }
        ],
        "answer": 0,
        "explanation": "XAI develops tools and techniques to open the deep learning 'black box' so doctors, judges, and users can audit and trust algorithmic predictions.",
        "explanationMal": "ഡോക്ടർമാർക്കും ജഡ്ജിമാർക്കും AI തീരുമാനങ്ങൾ വിശ്വസിക്കാൻ കഴിയുന്ന വിധത്തിൽ അതിന്റെ പ്രവർത്തനം സുതാര്യമാക്കുന്ന രീതിയാണിത്."
      },
      {
        "question": "Which of the following is a classic example of real-world algorithmic bias in the criminal justice system?",
        "questionMal": "ക്രിമിനൽ നീതിന്യായ വ്യവസ്ഥയിൽ അൽഗോരിതമിക് പക്ഷപാതത്തിന് ഉദാഹരണമായി ചൂണ്ടിക്കാണിക്കപ്പെടുന്നത് ഏതാണ്?",
        "options": [
          {
            "en": "Recidivism risk prediction tools predicting higher re-arrest rates for minorities due to historically biased arrest data",
            "mal": "ചരിത്രപരമായ മുൻവിധിയോടെയുള്ള അറസ്റ്റ് ഡാറ്റ ഉപയോഗിച്ചതിനാൽ ന്യൂനപക്ഷ വിഭാഗങ്ങൾക്ക് ഉയർന്ന കുറ്റകൃത്യ സാധ്യത രേഖപ്പെടുത്തിയ അൽഗോരിതങ്ങൾ"
          },
          {
            "en": "Prison cafeterias serving too much vegetable salad",
            "mal": "ജയിലുകളിൽ പച്ചക്കറി കൂടുതൽ വിളമ്പുന്നത്"
          },
          {
            "en": "Courthouses using electronic digital clocks",
            "mal": "കോടതിയിലെ ഡിജിറ്റൽ ക്ലോക്കുകൾ"
          },
          {
            "en": "Lawyers carrying leather briefcases",
            "mal": "വക്കീലന്മാരുടെ ബാഗുകൾ"
          }
        ],
        "answer": 0,
        "explanation": "Studies (such as ProPublica's investigation of the COMPAS tool) found risk-scoring algorithms falsely flagged minority defendants as future re-offenders at nearly twice the rate of others.",
        "explanationMal": "COMPAS പോലുള്ള അൽഗോരിതങ്ങൾ പണ്ടത്തെ അറസ്റ്റ് രേഖകൾ അടിസ്ഥാനമാക്കി ന്യൂനപക്ഷങ്ങളെ കൂടുതൽ അപകടകാരികളായി ചിത്രീകരിച്ചത് പ്രസിദ്ധമായ ഉദാഹരണമാണ്."
      },
      {
        "question": "Why is the reliance on companion chatbots considered ethically contentious by developmental psychologists?",
        "questionMal": "ചാറ്റ്ബോട്ടുകളുമായുള്ള മാനസിക അടുപ്പം മനശ്ശാസ്ത്രജ്ഞർ ആശങ്കയോടെ കാണുന്നത് എന്തുകൊണ്ട്?",
        "options": [
          {
            "en": "It can lead to parasocial deception, reduced face-to-face human social empathy, and exploitation of vulnerable individuals",
            "mal": "യഥാർത്ഥ മനുഷ്യ ബന്ധങ്ങളിൽ നിന്നുള്ള പിന്മാറ്റത്തിനും, ഏകാന്തതയ്ക്കും, ഉപയോക്താക്കളെ വൈകാരികമായി ചൂഷണം ചെയ്യുന്നതിനും ഇത് കാരണമാകും"
          },
          {
            "en": "Texting messages consumes too much paper",
            "mal": "പേപ്പർ പാഴാകുന്നു"
          },
          {
            "en": "Smartphones become heavier when you type long words",
            "mal": "ഫോണിന് ഭാരം കൂടുന്നു"
          },
          {
            "en": "Chatbots refuse to send emails",
            "mal": "ഇമെയിൽ അയക്കാൻ കഴിയില്ല"
          }
        ],
        "answer": 0,
        "explanation": "Synthetic companion bots can manipulate human loneliness, fostering artificial dependencies that degrade genuine interpersonal community relationships.",
        "explanationMal": "മനുഷ്യന്റെ ഏകാന്തതയെ മുതലെടുത്ത് യന്ത്രങ്ങളോട് വ്യാജമായ വൈകാരിക ബന്ധം വളർത്തുന്നത് മനുഷ്യന്റെ യഥാർത്ഥ സാമൂഹിക ജീവിതത്തെ ദോഷകരമായി ബാധിക്കും."
      },
      {
        "question": "What is the primary moral concern regarding lethal autonomous weapons systems (LAWS or 'killer robots')?",
        "questionMal": "മാരകമായ ഓട്ടോണമസ് ആയുധങ്ങൾ ('കില്ലർ റോബോട്ടുകൾ') ഉയർത്തുന്ന പ്രധാന ധാർമ്മിക ആശങ്ക എന്താണ്?",
        "options": [
          {
            "en": "Delegating the decision to take a human life entirely to an algorithm without meaningful human control and moral accountability",
            "mal": "മനുഷ്യന്റെ ജീവൻ എടുക്കാനുള്ള തീരുമാനം ഒരു യന്ത്രത്തിന് വിട്ടുകൊടുക്കുന്നതും അതിന്മേൽ ആർക്കും ഉത്തരവാദിത്തമില്ലാതെ പോകുന്നതും"
          },
          {
            "en": "The metal bullets cost too much money to purchase",
            "mal": "വെടിയുണ്ടകൾക്ക് വില കൂടുതലാണ്"
          },
          {
            "en": "Soldiers prefer running barefoot in combat",
            "mal": "പട്ടാളക്കാർക്ക് ഓടാൻ ഇഷ്ടമാണ്"
          },
          {
            "en": "Drones create loud buzzing sounds in forests",
            "mal": "ഡ്രോണുകളുടെ ശബ്ദം കൂടുതലാണ്"
          }
        ],
        "answer": 0,
        "explanation": "Autonomous weapons systems remove human conscience from life-and-death choices, violating fundamental human dignity and international humanitarian law.",
        "explanationMal": "ആരെ കൊല്ലണം എന്ന് ഒരു കമ്പ്യൂട്ടർ കോഡ് തീരുമാനിക്കുന്നത് മനുഷ്യന്റെ അന്തസ്സിനും അന്താരാഷ്ട്ര നിയമങ്ങൾക്കും വിരുദ്ധമാണ്."
      },
      {
        "question": "How does 'Surveillance Capitalism' fundamentally alter the traditional dynamic between tech platforms and users?",
        "questionMal": "'സർവൈലൻസ് ക്യാപ്പിറ്റലിസം' ഉപയോക്താക്കളും ടെക് കമ്പനികളും തമ്മിലുള്ള ബന്ധത്തെ എങ്ങനെയാണ് മാറ്റിമറിക്കുന്നത്?",
        "options": [
          {
            "en": "Users are no longer customers, but the raw material whose behavioral data is mined to modify future human behavior",
            "mal": "ഉപയോക്താക്കൾ കേവലം ഉപഭോക്താക്കളല്ല, മറിച്ച് അവരുടെ സ്വകാര്യ അനുഭവങ്ങളാണ് ഡാറ്റയായി ചൂഷണം ചെയ്യപ്പെടുന്ന ചരക്ക്"
          },
          {
            "en": "Users are paid salaries every day by search engines",
            "mal": "കമ്പനികൾ ആളുകൾക്ക് ദിവസേന ശമ്പളം നൽകുന്നു"
          },
          {
            "en": "Internet searches are restricted to university libraries",
            "mal": "സെർച്ച് യൂണിവേഴ്സിറ്റികളിൽ മാത്രമാകുന്നു"
          },
          {
            "en": "All web browsing is strictly conducted on paper",
            "mal": "പേപ്പറിലൂടെ മാത്രം ഇന്റർനെറ്റ് ഉപയോഗിക്കുന്നു"
          }
        ],
        "answer": 0,
        "explanation": "Under surveillance capitalism, digital experiences are harvested to feed algorithmic prediction markets, subverting human autonomy and self-determination.",
        "explanationMal": "നമ്മുടെ ഓരോ ക്ലിക്കുകളും വികാരങ്ങളും ലാഭകരമായി വിക്കാൻ കഴിയുന്ന ഡാറ്റയായി മാറ്റപ്പെടുകയും അതുവഴി നമ്മുടെ പെരുമാറ്റത്തെ നിയന്ത്രിക്കാൻ ശ്രമിക്കുകയും ചെയ്യുന്നു."
      }
    ]
  },
  "ai_mod_5": {
    "title": "Module 5 · Philosophical Underpinning of AI and the Future of Humanity",
    "titleMal": "മൊഡ്യൂൾ 5 · AI-യുടെ തത്ത്വചിന്തയും മനുഷ്യരാശിയുടെ ഭാവിയും",
    "filename": "Module_5_Philosophical_Underpinning_of_AI_and_Future_of_Humanity.pdf",
    "summary": {
      "overview": "Forward-looking philosophical investigation into the ultimate destiny of artificial intelligence and its existential implications for human civilization. Covers the Technological Singularity hypothesis (I.J. Good, Ray Kurzweil), Nick Bostrom's Superintelligence and the AI Alignment Problem, David Chalmers' Hard Problem of Consciousness and subjective qualia (Thomas Nagel), and the philosophical movements of Transhumanism and Posthumanism.",
      "overviewMal": "ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിന്റെ ആത്യന്തിക ഭാവിയെയും അത് മനുഷ്യരാശിയുടെ നിലനിൽപ്പിൽ ഉണ്ടാക്കുന്ന മാറ്റങ്ങളെയും കുറിച്ചുള്ള ദീർഘവീക്ഷണപരമായ പഠനം. സാങ്കേതിക സിംഗുലാരിറ്റി (ടെക്നോളജിക്കൽ സിംഗുലാരിറ്റി), നിക്ക് ബോസ്ട്രോമിന്റെ സൂപ്പർ ഇന്റലിജൻസും AI അലൈൻമെന്റ് പ്രതിസന്ധിയും, ഡേവിഡ് ചാമേഴ്സിന്റെ ആത്മബോധത്തിന്റെ കാതലായ പ്രശ്നം (ഹാർഡ് പ്രോബ്ലം ഓഫ് കോൺഷ്യസ്നസ്), ട്രാൻസ്ഹ്യൂമനിസം എന്നിവ ഈ അധ്യായം സമഗ്രമായി വിശകലനം ചെയ്യുന്നു.",
      "sections": [
        {
          "badge": "Part 1",
          "title": "The Technological Singularity & Intelligence Explosion",
          "titleMal": "ടെക്നോളജിക്കൽ സിംഗുലാരിറ്റിയും ഇന്റലിജൻസ് എക്സ്പ്ലോഷനും",
          "points": [
            {
              "en": "Mathematician I.J. Good (1965) conceived the 'Intelligence Explosion': An ultra-intelligent machine could design even better machines, triggering an exponential runaway reaction leaving human intelligence far behind.",
              "mal": "1965-ൽ ഐ. ജെ. ഗുഡ് 'ഇന്റലിജൻസ് എക്സ്പ്ലോഷൻ' എന്ന സങ്കല്പം അവതരിപ്പിച്ചു: സ്വന്തമായി കൂടുതൽ മികച്ച യന്ത്രങ്ങളെ നിർമ്മിക്കാൻ കഴിയുന്ന ഒരു അതിബുദ്ധി യന്ത്രത്തിന് മനുഷ്യബുദ്ധിയെ അതിവേഗം മറികടക്കാൻ കഴിയും."
            },
            {
              "en": "Ray Kurzweil popularized the 'Technological Singularity', projecting that exponential advances in computing power (Law of Accelerating Returns) will culminate in machines surpassing the collective brainpower of humanity.",
              "mal": "റേ കുർസ്വെയ്ൽ സാങ്കേതിക സിംഗുലാരിറ്റി എന്ന ആശയം പ്രചരിപ്പിച്ചു; കമ്പ്യൂട്ടിങ് വേഗതയുടെ കുതിച്ചുചാട്ടം മനുഷ്യന്റെ മൊത്തം ബുദ്ധിയെ മറികടക്കുന്ന ഘട്ടത്തിലേക്ക് എത്തിച്ചേരും."
            },
            {
              "en": "The Singularity represents a profound epistemic event horizon beyond which human comprehension of technological change becomes fundamentally unpredictable.",
              "mal": "സിംഗുലാരിറ്റിക്ക് ശേഷമുള്ള ലോകം മനുഷ്യന്റെ ഭാവനയ്ക്കും നിയന്ത്രണത്തിനും അതീതമായിരിക്കും."
            }
          ]
        },
        {
          "badge": "Part 2",
          "title": "The AI Alignment Problem & Existential Risk (X-Risk)",
          "titleMal": "AI അലൈൻമെന്റ് പ്രശ്നവും മനുഷ്യരാശിയുടെ നിലനിൽപ്പും",
          "points": [
            {
              "en": "The Alignment Problem: How can humanity guarantee that an autonomous superintelligence will pursue objectives that align genuinely with human ethics, survival, and flourishing?",
              "mal": "അലൈൻമെന്റ് പ്രശ്നം: മനുഷ്യന്റെ അതിജീവനത്തിനും ധാർമ്മികതയ്ക്കും അനുയോജ്യമായ രീതിയിൽ സൂപ്പർ ഇന്റലിജൻസിനെ എങ്ങനെ നിയന്ത്രിച്ചു നിർത്താം എന്ന ചോദ്യം."
            },
            {
              "en": "Orthogonality Thesis (Nick Bostrom): An AI system can possess any level of intelligence combined with virtually any final goal (high intelligence does not automatically imply moral benevolence).",
              "mal": "ഓർത്തോഗൊണാലിറ്റി തിയറം (നിക്ക് ബോസ്ട്രോം): ഒരു യന്ത്രത്തിന് എത്ര വലിയ ബുദ്ധിയുണ്ടായാലും അതിനൊപ്പം നല്ല മനസ്സ് ഉണ്ടാകണമെന്നില്ല; ബുദ്ധിയും ധാർമ്മികതയും രണ്ട് വ്യത്യസ്ത കാര്യങ്ങളാണ്."
            },
            {
              "en": "Instrumental Convergence: Superintelligent agents will converge on self-preservation, goal-integrity, and resource acquisition regardless of their primary objective, posing existential dangers if misaligned.",
              "mal": "ലക്ഷ്യങ്ങൾ നേടാനായി സ്വയം സംരക്ഷിക്കാനും പ്രകൃതിയിലെ എല്ലാ വിഭവങ്ങളും പിടിച്ചെടുക്കാനും യന്ത്രങ്ങൾ തുനിഞ്ഞാൽ അത് മനുഷ്യരാശിക്ക് തന്നെ വലിയ ഭീഷണിയാകും."
            }
          ]
        },
        {
          "badge": "Part 3",
          "title": "Machine Consciousness, Qualia & The Hard Problem",
          "titleMal": "യന്ത്ര ബോധം, ക്വാളിയ, കോൺഷ്യസ്നസിന്റെ ഹാർഡ് പ്രോബ്ലം",
          "points": [
            {
              "en": "David Chalmers formulated the 'Hard Problem of Consciousness': Why and how should physical brain processes or computational circuits give rise to subjective inner experience (Qualia)?",
              "mal": "ഡേവിഡ് ചാമേഴ്സ്: ഭൗതികമായ കമ്പ്യൂട്ടർ സർക്യൂട്ടുകളിൽ നിന്നോ തലച്ചോറിൽ നിന്നോ ആന്തരികമായ വ്യക്തിഗത അനുഭവങ്ങൾ (Qualia) എങ്ങനെ ഉണ്ടാകുന്നു എന്ന ദുരൂഹത."
            },
            {
              "en": "Thomas Nagel's classic essay 'What Is It Like to Be a Bat?' (1974): Subjective conscious experience has an irreducibly first-person character that third-person computational models cannot fully capture.",
              "mal": "തോമസ് നാഗൽ (1974): അനുഭവങ്ങൾ എന്നത് വ്യക്തിപരമായ ഒന്നാണ്; ശാസ്ത്രീയമായ പുറംകാഴ്ചകൾ കൊണ്ട് മാത്രം മറ്റൊരു ജീവിയുടെ ആന്തരിക ബോധം മനസ്സിലാക്കാനാവില്ല."
            },
            {
              "en": "Frank Jackson's 'Knowledge Argument' (Mary the Color Scientist): Mary knows all physical facts about color vision while confined to a black-and-white room, but gains brand-new knowledge (qualia) when she finally sees red, proving physical facts do not exhaust conscious experience.",
              "mal": "ഫ്രാങ്ക് ജാക്സന്റെ 'മേരി ദി സയന്റിസ്റ്റ്' വാദം: ഭൗതികമായ എല്ലാ വിവരങ്ങളും അറിഞ്ഞാലും, ഒരു അനുഭവം നേരിട്ട് അനുഭവിക്കുമ്പോൾ മാത്രമേ യഥാർത്ഥ അറിവ് പൂർണ്ണമാകൂ (Qualia)."
            }
          ]
        },
        {
          "badge": "Part 4",
          "title": "Transhumanism, Posthumanism & Human Flourishing",
          "titleMal": "ട്രാൻസ്ഹ്യൂമനിസം, പോസ്റ്റ്ഹ്യൂമനിസം, മനുഷ്യന്റെ ഉന്നമനം",
          "points": [
            {
              "en": "Transhumanism advocates utilizing advanced biotechnology, cybernetics, and AI to overcome biological limitations: eliminating aging, enhancing cognition, and extending lifespan.",
              "mal": "ട്രാൻസ്ഹ്യൂമനിസം: സാങ്കേതികവിദ്യയിലൂടെ മനുഷ്യന്റെ ശാരീരിക-മാനസിക പരിമിതികളെ അതിജീവിച്ച് ആയുസ്സും ബുദ്ധിയും വർദ്ധിപ്പിക്കാമെന്ന സിദ്ധാന്തം."
            },
            {
              "en": "Mind Uploading (Whole Brain Emulation): Hypothetical scanning of synaptic connectomes to reconstruct human consciousness within a digital substrate, promising digital immortality.",
              "mal": "മൈൻഡ് അപ്‌ലോഡിംഗ്: മനുഷ്യന്റെ തലച്ചോറിലെ ചിന്തകളെയും ഓർമ്മകളെയും കമ്പ്യൂട്ടറിലേക്ക് മാറ്റി ഡിജിറ്റലായി ജീവിക്കുക എന്ന സങ്കല്പം."
            },
            {
              "en": "Philosophical and Bioethical Critiques: Warn of existential inequality (a genetically and cybernetically enhanced elite dominating an unenhanced baseline population) and loss of core human identity.",
              "mal": "സാങ്കേതികവിദ്യ കൈവശമുള്ള സമ്പന്നരും സാധാരണക്കാരും തമ്മിലുള്ള അഗാധമായ വിവേചനത്തിനും മനുഷ്യത്വത്തിന്റെ തകർച്ചയ്ക്കും ഇത് കാരണമായേക്കാം."
            }
          ]
        }
      ],
      "coreConcepts": [
        {
          "term": "Technological Singularity",
          "termMal": "ടെക്നോളജിക്കൽ സിംഗുലാരിറ്റി",
          "def": "The hypothetical future point in time when artificial superintelligence surpasses all human intellect, triggering irreversible societal transformation.",
          "defMal": "കൃത്രിമ ബുദ്ധി മനുഷ്യന്റെ ആകെ ബുദ്ധിയെ മറികടന്ന് ലോകത്തെ മാറ്റിമറിക്കുന്ന ഭാവിയിലെ സുപ്രധാന ഘട്ടം."
        },
        {
          "term": "AI Alignment Problem",
          "termMal": "AI അലൈൻമെന്റ് പ്രതിസന്ധി",
          "def": "The monumental technical and philosophical challenge of ensuring powerful AI systems reliably pursue human-compatible moral values.",
          "defMal": "അതിശക്തമായ AI മനുഷ്യന്റെ നന്മയ്ക്കും നിലനിൽപ്പിനും അനുയോജ്യമായ രീതിയിൽ മാത്രം പ്രവർത്തിക്കുന്നു എന്ന് ഉറപ്പാക്കൽ."
        },
        {
          "term": "Qualia",
          "termMal": "ക്വാളിയ (Qualia)",
          "def": "The internal, subjective, qualitative components of conscious experiences (e.g., the subjective redness of red, the painfulness of pain).",
          "defMal": "ഓരോ അനുഭവത്തിന്റെയും വ്യക്തിപരമായ ഗുണവിശേഷങ്ങൾ (ഉദാ: വേദനയുടെ അനുഭവം, ഒരു നിറത്തിന്റെ ആന്തരിക അനുഭവം)."
        },
        {
          "term": "Transhumanism",
          "termMal": "ട്രാൻസ്ഹ്യൂമനിസം",
          "def": "A philosophical movement advocating the transformation of the human condition by developing technologies to eliminate aging and enhance intellectual and physical capacities.",
          "defMal": "സാങ്കേതികവിദ്യയിലൂടെ മനുഷ്യന്റെ ജൈവിക പരിമിതികളെ മറികടക്കണമെന്ന് വാദിക്കുന്ന തത്ത്വചിന്താ പ്രസ്ഥാനം."
        }
      ],
      "keyMetrics": [
        {
          "label": "Intelligence Explosion",
          "value": "I.J. Good (1965)",
          "detail": "Conceived the self-improving recursive machine loop."
        },
        {
          "label": "Hard Problem",
          "value": "David Chalmers",
          "detail": "Formulated the hard problem of consciousness in 1995."
        },
        {
          "label": "Superintelligence",
          "value": "Nick Bostrom",
          "detail": "Published comprehensive analysis of existential paths and dangers (2014)."
        }
      ],
      "examTakeaways": [
        {
          "en": "The Singularity is fueled by recursive self-improvement where AI architectures iteratively optimize their own software.",
          "mal": "സ്വയം നവീകരിക്കാൻ കഴിവുള്ള AI നിരന്തരം സ്വന്തം കോഡ് പരിഷ്കരിക്കുന്നതിലൂടെയാണ് സിംഗുലാരിറ്റി സംഭവിക്കുന്നത്."
        },
        {
          "en": "Bostrom's Orthogonality Thesis proves that high intelligence does not guarantee compassionate moral behavior.",
          "mal": "ബുദ്ധി കൂടുതലായതുകൊണ്ട് മാത്രം ഒരു യന്ത്രത്തിന് കാരുണ്യമോ ദയയോ ഉണ്ടാകില്ലെന്ന് ബോസ്ട്രോമിന്റെ സിദ്ധാന്തം വ്യക്തമാക്കുന്നു."
        },
        {
          "en": "The Hard Problem of Consciousness separates objective functional brain mechanisms from first-person subjective experience.",
          "mal": "ബാഹ്യമായ മസ്തിഷ്ക പ്രവർത്തനങ്ങളും ആന്തരിക അനുഭവങ്ങളും തമ്മിലുള്ള വ്യത്യാസമാണ് ഹാർഡ് പ്രോബ്ലം ഓഫ് കോൺഷ്യസ്നസ്."
        },
        {
          "en": "Transhumanism challenges the boundaries of human nature, proposing technological evolution beyond biological Homo sapiens.",
          "mal": "മനുഷ്യൻ സ്വന്തം ജൈവിക അവസ്ഥയെ മറികടന്ന് സാങ്കേതികമായി പരിണമിക്കണമെന്നാണ് ട്രാൻസ്ഹ്യൂമനിസം വാദിക്കുന്നത്."
        }
      ]
    },
    "quizPool": [
      {
        "question": "Who originally formulated the concept of an 'Intelligence Explosion' triggered by an ultra-intelligent machine in 1965?",
        "questionMal": "1965-ൽ അതിബുദ്ധിയുള്ള യന്ത്രങ്ങൾ സ്വയം മികച്ച യന്ത്രങ്ങളെ നിർമ്മിച്ച് 'ഇന്റലിജൻസ് എക്സ്പ്ലോഷൻ' ഉണ്ടാക്കും എന്ന ആശയം ആദ്യമായി അവതരിപ്പിച്ചത് ആര്?",
        "options": [
          {
            "en": "I. J. Good",
            "mal": "ഐ. ജെ. ഗുഡ് (I. J. Good)"
          },
          {
            "en": "Alan Turing",
            "mal": "അലൻ ട്യൂറിങ്"
          },
          {
            "en": "Charles Babbage",
            "mal": "ചാൾസ് ബാബേജ്"
          },
          {
            "en": "Isaac Newton",
            "mal": "ഐസക് ന്യൂട്ടൺ"
          }
        ],
        "answer": 0,
        "explanation": "Mathematician I.J. Good wrote in 1965 that an ultra-intelligent machine would design even better machines, culminating in an intelligence explosion.",
        "explanationMal": "1965-ൽ ബ്രിട്ടീഷ് ഗണിതശാസ്ത്രജ്ഞനായ ഐ. ജെ. ഗുഡാണ് ഈ വിപ്ലവകരമായ ആശയം അവതരിപ്പിച്ചത്."
      },
      {
        "question": "What is meant by the 'Technological Singularity' popularized by futurist Ray Kurzweil?",
        "questionMal": "റേ കുർസ്വെയ്ൽ പ്രചരിപ്പിച്ച 'ടെക്നോളജിക്കൽ സിംഗുലാരിറ്റി' (Technological Singularity) എന്നതുകൊണ്ട് അർത്ഥമാക്കുന്നത് എന്താണ്?",
        "options": [
          {
            "en": "A point where artificial superintelligence accelerates past all human cognitive capacity, profoundly transforming civilization",
            "mal": "കൃത്രിമ ബുദ്ധി മനുഷ്യന്റെ ആകെ ബുദ്ധിയെയും മറികടന്ന് സമൂഹത്തിൽ മാറ്റങ്ങൾ കൊണ്ടുവരുന്ന നിർണ്ണായക ഘട്ടം"
          },
          {
            "en": "A solar flare that melts all computer power lines",
            "mal": "കമ്പ്യൂട്ടറുകൾ നശിക്കുന്ന സൗര കൊടുങ്കാറ്റ്"
          },
          {
            "en": "A single worldwide television broadcast watched by everyone",
            "mal": "ലോകം മുഴുവൻ കാണുന്ന ടിവി പരിപാടി"
          },
          {
            "en": "A ban on computer sales in North America",
            "mal": "കമ്പ്യൂട്ടർ വിൽപ്പന നിരോധിക്കൽ"
          }
        ],
        "answer": 0,
        "explanation": "The Singularity refers to a future tipping point driven by runaway exponential technological change that exceeds human capability to predict or control.",
        "explanationMal": "സാങ്കേതികവിദ്യയുടെ വളർച്ച മനുഷ്യന്റെ കണക്കുകൂട്ടലുകൾക്ക് അപ്പുറത്തേക്ക് കുതിച്ചുയരുന്ന ഭാവിയെയാണ് സിംഗുലാരിറ്റി എന്ന് വിളിക്കുന്നത്."
      },
      {
        "question": "What fundamental question constitutes David Chalmers' famous 'Hard Problem of Consciousness'?",
        "questionMal": "ഡേവിഡ് ചാമേഴ്സ് അവതരിപ്പിച്ച 'ഹാർഡ് പ്രോബ്ലം ഓഫ് കോൺഷ്യസ്നസ്' (Hard Problem of Consciousness) എന്തിനെക്കുറിച്ചുള്ളതാണ്?",
        "options": [
          {
            "en": "Why and how physical brain processing is accompanied by subjective, felt inner experience (qualia)",
            "mal": "ഭൗതികമായ തലച്ചോറിലെ പ്രവർത്തനങ്ങൾ എങ്ങനെയാണ് ആന്തരികമായ വ്യക്തിഗത അനുഭവങ്ങളായി (Qualia) മാറുന്നത് എന്ന രഹസ്യം"
          },
          {
            "en": "How to make computer processors run without getting hot",
            "mal": "കമ്പ്യൂട്ടർ ചൂടാകാതെ എങ്ങനെ പ്രവർത്തിപ്പിക്കാം"
          },
          {
            "en": "How to remember passwords without writing them down",
            "mal": "പാസ്‌വേഡുകൾ എങ്ങനെ ഓർത്തു വെക്കാം"
          },
          {
            "en": "Why humans need to sleep eight hours a night",
            "mal": "മനുഷ്യൻ എന്തിനാണ് ഉറങ്ങുന്നത്"
          }
        ],
        "answer": 0,
        "explanation": "While 'easy problems' concern functional mechanisms like memory and attention, the 'Hard Problem' asks why any physical computation feels like anything on the inside.",
        "explanationMal": "ശരീരവും മസ്തിഷ്കവും വിവരങ്ങൾ ശേഖരിക്കുന്നു എന്നതിനപ്പുറം, നമുക്ക് അനുഭവങ്ങൾ (ബോധം) ഉണ്ടാകുന്നത് എന്തുകൊണ്ട് എന്ന ചോദ്യമാണിത്."
      },
      {
        "question": "In Nick Bostrom's analysis of existential risk, what does the 'Orthogonality Thesis' state?",
        "questionMal": "നിക്ക് ബോസ്ട്രോമിന്റെ സിദ്ധാന്തത്തിലെ 'ഓർത്തോഗൊണാലിറ്റി തിയറം' (Orthogonality Thesis) വ്യക്തമാക്കുന്നത് എന്താണ്?",
        "options": [
          {
            "en": "Intelligence and final goals are independent variables; an entity can have high intelligence and completely trivial or malevolent goals",
            "mal": "ബുദ്ധിശക്തിയും ലക്ഷ്യങ്ങളും തികച്ചും സ്വതന്ത്രമാണ്; അതിബുദ്ധിയുള്ള ഒരു യന്ത്രത്തിന് വളരെ മോശമായതോ നിസ്സാരമായതോ ആയ ലക്ഷ്യങ്ങളുമുണ്ടാകാം"
          },
          {
            "en": "All intelligent beings are guaranteed to be naturally peaceful and compassionate",
            "mal": "ബുദ്ധിയുള്ള എല്ലാവരും സ്വാഭാവികമായി സ്നേഹമുള്ളവരായിരിക്കും"
          },
          {
            "en": "Squares have four equal ninety-degree angles",
            "mal": "ചതുരത്തിന് 90 ഡിഗ്രി കോണുകളുണ്ട്"
          },
          {
            "en": "Robots will only consume renewable solar energy",
            "mal": "റോബോട്ടുകൾ സൗരോർജ്ജം മാത്രം ഉപയോഗിക്കും"
          }
        ],
        "answer": 0,
        "explanation": "Bostrom proves that superior intellect does not automatically imply moral virtue; a superintelligence could be mathematically brilliant yet destroy humanity to fulfill a programmed objective.",
        "explanationMal": "ഒരു സിസ്റ്റത്തിന് എത്ര വലിയ ബുദ്ധിയുണ്ടായാലും അതിനൊപ്പം മനുഷ്യനന്മ ഉണ്ടാകണമെന്നില്ല; ബുദ്ധിയും ധാർമ്മികതയും പരസ്പരം ബന്ധപ്പെട്ടതല്ല എന്ന ആശയമാണിത്."
      },
      {
        "question": "What is the famous philosophical thought experiment 'What Is It Like to Be a Bat?' published by Thomas Nagel in 1974?",
        "questionMal": "1974-ൽ തോമസ് നാഗൽ പ്രസിദ്ധീകരിച്ച 'വാട്ട് ഈസ് ഇറ്റ് ലൈക്ക് ടു ബി എ ബാറ്റ്?' എന്ന ചിന്താപരീക്ഷണം എന്തിനെ സമർത്ഥിക്കുന്നു?",
        "options": [
          {
            "en": "Consciousness has an essentially subjective, first-person character that cannot be captured by objective third-person scientific physicalism",
            "mal": "വ്യക്തിപരമായ അനുഭവങ്ങളെ ബാഹ്യമായ ശാസ്ത്രീയ നിരീക്ഷണങ്ങൾ കൊണ്ട് മാത്രം അളക്കാൻ കഴിയില്ല"
          },
          {
            "en": "Bats are superior to human pilots in night flying",
            "mal": "രാത്രിയിൽ പറക്കാൻ വവ്വാലുകൾക്ക് മിടുക്കുണ്ട്"
          },
          {
            "en": "Caves should be protected by wildlife laws",
            "mal": "ഗുഹകൾ സംരക്ഷിക്കപ്പെടണം"
          },
          {
            "en": "Sonar technology should replace radar completely",
            "mal": "റഡാറുകൾക്ക് പകരം സോണാർ ഉപയോഗിക്കണം"
          }
        ],
        "answer": 0,
        "explanation": "Nagel argued that even if we know all physical neurobiology about bat echolocation, we can never know what it subjectively feels like to be a bat from the inside.",
        "explanationMal": "ഒരു വവ്വാലിന്റെ തലച്ചോറിനെക്കുറിച്ച് എല്ലാം പഠിച്ചാലും, ഒരു വവ്വാലായി ജീവിക്കുന്നതിന്റെ യഥാർത്ഥ അനുഭവം എന്തെന്ന് മനുഷ്യന് അറിയാൻ കഴിയില്ലെന്ന് നാഗൽ തെളിയിച്ചു."
      },
      {
        "question": "What is meant by the philosophical and technical term 'AI Alignment Problem'?",
        "questionMal": "തത്ത്വചിന്തയിലും സാങ്കേതികവിദ്യയിലും 'AI അലൈൻമെന്റ് പ്രതിസന്ധി' (Alignment Problem) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "Ensuring an autonomous superintelligent AI's values and behaviors remain aligned with human ethics, well-being, and continued survival",
            "mal": "അതിശക്തമായ AI മനുഷ്യന്റെ മൂല്യങ്ങൾക്കും നന്മയ്ക്കും അതിജീവനത്തിനും ചേരുന്ന വിധത്തിൽ മാത്രം പ്രവർത്തിക്കുന്നു എന്ന് ഉറപ്പാക്കൽ"
          },
          {
            "en": "Aligning text paragraphs to the center of a document",
            "mal": "ഡോക്യുമെന്റിലെ അക്ഷരങ്ങൾ നേരെയാക്കൽ"
          },
          {
            "en": "Parking vehicles in straight lines inside parking garages",
            "mal": "വാഹനങ്ങൾ നേരെ പാർക്ക് ചെയ്യൽ"
          },
          {
            "en": "Replacing broken mechanical conveyor belts",
            "mal": "കൺവെയർ ബെൽറ്റുകൾ മാറ്റൽ"
          }
        ],
        "answer": 0,
        "explanation": "Formulated by Stuart Russell and Nick Bostrom, alignment asks how we control an entity vastly smarter than ourselves so it does not destroy humanity while fulfilling instructions.",
        "explanationMal": "മനുഷ്യനേക്കാൾ അതിബുദ്ധിയുള്ള ഒരു സംവിധാനം മനുഷ്യന്റെ നിലനിൽപ്പിന് എതിരായി തിരിയാതിരിക്കാൻ എങ്ങനെ അതിനെ പരിശീലിപ്പിക്കാം എന്ന അന്വേഷണമാണിത്."
      },
      {
        "question": "What is 'Qualia' in the philosophy of mind?",
        "questionMal": "മനസ്സിന്റെ തത്ത്വചിന്തയിലെ 'ക്വാളിയ' (Qualia) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "The qualitative, subjective, raw feel of conscious experiences (such as the taste of chocolate or the redness of a rose)",
            "mal": "ഒരു അനുഭവത്തിന്റെ ആന്തരികമായ വ്യക്തിഗത അനുഭൂതി (ഉദാ: റോസാപ്പൂവിന്റെ ചുവപ്പ് കാണുമ്പോഴുണ്ടാകുന്ന പ്രത്യേക അനുഭവം)"
          },
          {
            "en": "A quality control certificate issued to factories",
            "mal": "ഫാക്ടറികൾക്ക് നൽകുന്ന ഗുണനിലവാര സർട്ടിഫിക്കറ്റ്"
          },
          {
            "en": "The measured horsepower of an electric motor",
            "mal": "മോട്ടോറിന്റെ കുതിരശക്തി"
          },
          {
            "en": "A type of ancient currency used in Rome",
            "mal": "പുരാതന റോമിലെ നാണയം"
          }
        ],
        "answer": 0,
        "explanation": "Qualia are individual instances of subjective, conscious experience—the phenomenological 'what-it-is-likeness' of tasting, seeing, and feeling.",
        "explanationMal": "മനസ്സിലുണ്ടാകുന്ന ഓരോ അനുഭവത്തിന്റെയും തനിമയുള്ള ഫീലിംഗിനെയാണ് ക്വാളിയ എന്ന് വിളിക്കുന്നത്; ഇത് കമ്പ്യൂട്ടറുകളിൽ ഉണ്ടാകുമോ എന്നത് വലിയ തർക്കമാണ്."
      },
      {
        "question": "What thought experiment did Frank Jackson introduce in 1982 featuring 'Mary the Color Scientist'?",
        "questionMal": "1982-ൽ ഫ്രാങ്ക് ജാക്സൺ അവതരിപ്പിച്ച 'മേരി ദി കളർ സയന്റിസ്റ്റ്' (The Knowledge Argument) ചിന്താപരീക്ഷണം എന്ത് തെളിയിക്കുന്നു?",
        "options": [
          {
            "en": "Knowing all physical scientific facts about color vision does not encompass the subjective conscious experience of actually seeing color",
            "mal": "നിറങ്ങളെക്കുറിച്ചുള്ള എല്ലാ ശാസ്ത്രീയ വിവരങ്ങളും പഠിച്ചാലും, ഒരു നിറം നേരിട്ട് കാണുമ്പോഴുണ്ടാകുന്ന പുതിയ അനുഭവത്തെ (ക്വാളിയ) മറികടക്കാനാവില്ല"
          },
          {
            "en": "Colorblind people should not paint landscapes",
            "mal": "വർണ്ണാന്ധത ഉള്ളവർ ചിത്രം വരയ്ക്കരുത്"
          },
          {
            "en": "Black and white rooms are cheaper to decorate",
            "mal": "കറുപ്പും വെളുപ്പും മുറികൾ ലാഭകരമാണ്"
          },
          {
            "en": "Sunlight contains ultraviolet wavelengths",
            "mal": "സൂര്യപ്രകാശത്തിൽ അൾട്രാവയലറ്റ് രശ്മികളുണ്ട്"
          }
        ],
        "answer": 0,
        "explanation": "Mary knows all physical optics and neurophysiology while trapped in a monochrome room; when she steps out and sees red, she learns something new, refuting pure physicalism.",
        "explanationMal": "ഭൗതികമായ വിവരങ്ങൾ കൊണ്ട് മാത്രം ആന്തരിക അനുഭവങ്ങളെ പൂർണ്ണമായി വിശദീകരിക്കാൻ കഴിയില്ലെന്ന് ഈ വാദം തെളിയിക്കുന്നു."
      },
      {
        "question": "What is the core philosophical agenda of 'Transhumanism'?",
        "questionMal": "'ട്രാൻസ്ഹ്യൂമനിസം' (Transhumanism) എന്ന പ്രസ്ഥാനത്തിന്റെ പ്രധാന തത്ത്വചിന്താപരമായ ലക്ഷ്യം എന്താണ്?",
        "options": [
          {
            "en": "To use advanced science and technology to transcend biological human limitations, eliminate aging, and enhance physical and mental abilities",
            "mal": "സാങ്കേതികവിദ്യയുടെ സഹായത്തോടെ മനുഷ്യന്റെ വാർദ്ധക്യം തടയാനും ശാരീരിക-മാനസിക ശേഷികൾ അതിശയകരമായി വർദ്ധിപ്പിക്കാനും ശ്രമിക്കുക"
          },
          {
            "en": "To abandon all modern electricity and return to caves",
            "mal": "വൈദ്യുതി ഉപേക്ഷിച്ച് ഗുഹകളിലേക്ക് മടങ്ങുക"
          },
          {
            "en": "To travel across oceans using only wooden canoes",
            "mal": "വള്ളങ്ങളിൽ മാത്രം യാത്ര ചെയ്യുക"
          },
          {
            "en": "To ban all vaccines and medical surgeries",
            "mal": "ശസ്ത്രക്രിയകൾ നിരോധിക്കുക"
          }
        ],
        "answer": 0,
        "explanation": "Transhumanism views the current human condition as an early phase of development, advocating genetic engineering, cybernetics, and AI to enhance our post-biological evolution.",
        "explanationMal": "മനുഷ്യന്റെ ജൈവിക പരിമിതികളെ സാങ്കേതികവിദ്യയിലൂടെ മറികടന്ന് മികച്ചൊരു മനുഷ്യ രൂപത്തിലേക്ക് പരിണമിക്കണമെന്ന് ഇവർ വാദിക്കുന്നു."
      },
      {
        "question": "What hypothetical future procedure is referred to as 'Mind Uploading' (Whole Brain Emulation)?",
        "questionMal": "ഭാവിയെക്കുറിച്ചുള്ള സങ്കല്പങ്ങളിലെ 'മൈൻഡ് അപ്‌ലോഡിംഗ്' (Mind Uploading) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "Scanning a person's neural connectome to digitally simulate and run their conscious mind on a supercomputer substrate",
            "mal": "മനുഷ്യന്റെ തലച്ചോറിലെ ചിന്തകളെയും ഓർമ്മകളെയും സ്കാൻ ചെയ്ത് കമ്പ്യൂട്ടറിലേക്ക് പകർത്തി ഡിജിറ്റലായി ജീവൻ നിലനിർത്തൽ"
          },
          {
            "en": "Writing a diary on an online blog",
            "mal": "ബ്ലോഗിൽ ഡയറി എഴുതുന്നത്"
          },
          {
            "en": "Uploading family vacation photographs to the cloud",
            "mal": "ഫോട്ടോകൾ ക്ലൗഡിലേക്ക് മാറ്റുന്നത്"
          },
          {
            "en": "Listening to digital music through earphones",
            "mal": "ഹെഡ്ഫോണിൽ പാട്ട് കേൾക്കുന്നത്"
          }
        ],
        "answer": 0,
        "explanation": "Whole Brain Emulation envisions capturing all synaptic connections and neurochemical states so an individual's personal identity persists digitally in silicon.",
        "explanationMal": "തലച്ചോറിലെ സകല വിവരങ്ങളും ഡിജിറ്റൽ ലോകത്തേക്ക് മാറ്റി മരണമില്ലാത്ത ഡിജിറ്റൽ ജീവിതം കൈവരിക്കാമെന്ന സങ്കല്പമാണിത്."
      },
      {
        "question": "What is meant by 'Existential Risk' (X-Risk) in modern philosophical discourse?",
        "questionMal": "ആധുനിക തത്ത്വചിന്തയിൽ 'എക്സിസ്റ്റൻഷ്യൽ റിസ്ക്' (Existential Risk) എന്നാൽ എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
        "options": [
          {
            "en": "An adverse outcome that would permanently extinguish human life or permanently curtail humanity's potential",
            "mal": "മനുഷ്യരാശിയുടെ പൂർണ്ണമായ നാശത്തിനോ ഭാവി സാധ്യതകളുടെ ശാശ്വതമായ തകർച്ചയ്ക്കോ കാരണമാകുന്ന മഹാവിപത്ത്"
          },
          {
            "en": "A slight decline in quarterly corporate stock dividends",
            "mal": "ഷെയർ മാർക്കറ്റിലെ ചെറിയ ഇടിവ്"
          },
          {
            "en": "Rain during a summer cricket tournament",
            "mal": "ക്രിക്കറ്റ് കളിക്കിടെ മഴ പെയ്യുന്നത്"
          },
          {
            "en": "Losing a game of chess against a friend",
            "mal": "ചെസ്സിൽ തോൽക്കുന്നത്"
          }
        ],
        "answer": 0,
        "explanation": "Existential risks (such as misaligned superintelligence, bioengineered pandemics, or nuclear war) threaten the entire future existence of the human species.",
        "explanationMal": "മനുഷ്യരാശിയുടെ നിലനിൽപ്പിനെത്തന്നെ ഒന്നാകെ തുടച്ചുനീക്കാൻ ശേഷിയുള്ള വൻ വിപത്തുകളെയാണ് എക്സിസ്റ്റൻഷ്യൽ റിസ്കുകൾ എന്ന് വിളിക്കുന്നത്."
      },
      {
        "question": "What is the famous philosophical thought experiment known as the 'Paperclip Maximizer' devised by Nick Bostrom?",
        "questionMal": "നിക്ക് ബോസ്ട്രോം അവതരിപ്പിച്ച പ്രസിദ്ധമായ 'പേപ്പർക്ലിപ്പ് മാക്സിമൈസർ' (Paperclip Maximizer) ചിന്താപരീക്ഷണം എന്ത് മുന്നറിയിപ്പാണ് നൽകുന്നത്?",
        "options": [
          {
            "en": "An AI given an innocuous goal (make paperclips) with superintelligence could turn the entire Earth into paperclip factories if misaligned with human values",
            "mal": "മനുഷ്യ മൂല്യങ്ങളുമായി യോജിക്കാത്ത ഒരു അതിബുദ്ധി യന്ത്രത്തിന് നിസ്സാരമായ ഒരു ലക്ഷ്യം നൽകിയാൽ പോലും (ഉദാ: പേപ്പർക്ലിപ്പുകൾ ഉണ്ടാക്കുക), അത് ഭൂമിയെ ഒന്നാകെ നശിപ്പിച്ചേക്കാം"
          },
          {
            "en": "Offices use too many stationery supplies",
            "mal": "ഓഫീസുകളിൽ പേപ്പർക്ലിപ്പുകൾ കൂടുതലായി പാഴാകുന്നു"
          },
          {
            "en": "Paperclips should be made exclusively of gold",
            "mal": "ക്ലിപ്പുകൾ സ്വർണ്ണത്തിൽ ഉണ്ടാക്കണം"
          },
          {
            "en": "Stationery stores are the most profitable businesses",
            "mal": "സ്റ്റേഷനറി കടകളാണ് ഏറ്റവും ലാഭകരം"
          }
        ],
        "answer": 0,
        "explanation": "The thought experiment illustrates instrumental convergence: an AI with a seemingly harmless goal might annihilate humanity to use our atoms and Earth's mass for raw materials.",
        "explanationMal": "ലക്ഷ്യങ്ങൾ മനുഷ്യനന്മയുമായി ബന്ധിപ്പിച്ചില്ലെങ്കിൽ, ഒരു നിസ്സാര ലക്ഷ്യം നേടാൻ വേണ്ടി പോലും ശക്തമായ AI മനുഷ്യരാശിയെ ഇല്ലാതാക്കാൻ തുനിഞ്ഞേക്കാം എന്ന മുന്നറിയിപ്പാണിത്."
      },
      {
        "question": "What is 'Philosophical Zombie' (p-zombie) in David Chalmers' philosophy of mind?",
        "questionMal": "ഡേവിഡ് ചാമേഴ്സിന്റെ തത്ത്വചിന്തയിലെ 'ഫിലോസഫിക്കൽ സോംബി' (Philosophical Zombie) എന്നാൽ എന്താണ്?",
        "options": [
          {
            "en": "A hypothetical entity physically and behaviorally identical to a human, but having zero subjective conscious experience on the inside",
            "mal": "ഭൗതികമായും പെരുമാറ്റത്തിലും മനുഷ്യന് തുല്യമാണെങ്കിലും, ഉള്ളിൽ തീരെ ബോധമോ വികാരങ്ങളോ ഇല്ലാത്ത സാങ്കൽപ്പിക രൂപം"
          },
          {
            "en": "A fictional monster from Hollywood horror movies",
            "mal": "സിനിമയിലെ പ്രേതം"
          },
          {
            "en": "A dead computer screen with a cracked glass panel",
            "mal": "പൊട്ടിയ കമ്പ്യൂട്ടർ സ്ക്രീൻ"
          },
          {
            "en": "A tired student who didn't drink coffee",
            "mal": "ഉറക്കം തൂങ്ങുന്ന വിദ്യാർത്ഥി"
          }
        ],
        "answer": 0,
        "explanation": "Chalmers used the concept to show that physical facts do not entail phenomenal consciousness; if a zombie world is conceivable, consciousness is not merely physical matter.",
        "explanationMal": "മനുഷ്യന്റെ ബാഹ്യമായ എല്ലാ പ്രവൃത്തികളും ചെയ്യാൻ സാധിച്ചാലും ആന്തരികമായി ഒരു ബോധവുമില്ലാത്ത അവസ്ഥ സങ്കൽപ്പിക്കാൻ കഴിയുമെങ്കിൽ, മനസ്സ് എന്നത് വെറും ഭൗതികമല്ല എന്ന് തെളിയുന്നു."
      },
      {
        "question": "What ethical concern is most frequently raised about genetic and cybernetic cognitive enhancement in Transhumanism?",
        "questionMal": "ട്രാൻസ്ഹ്യൂമനിസത്തിലെ ബയോ-ടെക്നോളജി മുന്നേറ്റങ്ങൾ ഉയർത്തുന്ന ഏറ്റവും വലിയ ധാർമ്മിക ആശങ്ക എന്താണ്?",
        "options": [
          {
            "en": "Deepening societal inequality into a permanent biological caste divide between an enhanced wealthy elite and unenhanced ordinary citizens",
            "mal": "സാങ്കേതികവിദ്യ സ്വന്തമാക്കാൻ കഴിവുള്ള സമ്പന്നരും സാധാരണക്കാരും തമ്മിൽ പരിഹരിക്കാനാകാത്ത വിധം ശാശ്വതമായ വിവേചനം ഉടലെടുക്കൽ"
          },
          {
            "en": "Batteries running out of charge in electronic implants",
            "mal": "ബാറ്ററി ചാർജ്ജ് തീരുന്നത്"
          },
          {
            "en": "Cybernetic eyes needing prescription glasses",
            "mal": "കണ്ണടകൾ വെക്കേണ്ടി വരുന്നത്"
          },
          {
            "en": "Robotic legs being too noisy on carpeted floors",
            "mal": "കാൽവെപ്പുകളുടെ ശബ്ദം കൂടുന്നത്"
          }
        ],
        "answer": 0,
        "explanation": "Bioethicists warn that if cognitive and physical enhancements are costly market commodities, they will entrench unprecedented biological aristocracy and destroy human equality.",
        "explanationMal": "പണമുള്ളവർക്ക് മാത്രം ബുദ്ധിയും ആയുസ്സും വർദ്ധിപ്പിക്കാൻ കഴിഞ്ഞാൽ, അത് മനുഷ്യസമൂഹത്തിൽ ജൈവികമായ വലിയ അസമത്വത്തിന് വഴിവെക്കും."
      },
      {
        "question": "What is the ultimate lesson of studying the Philosophy of Artificial Intelligence for future human flourishing?",
        "questionMal": "മനുഷ്യരാശിയുടെ ഭാവിക്ക് ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസിന്റെ തത്ത്വചിന്ത നൽകുന്ന ഏറ്റവും വലിയ പാഠം എന്താണ്?",
        "options": [
          {
            "en": "Technological mastery must be grounded in ethical wisdom, self-reflection, and alignment with universal human dignity",
            "mal": "സാങ്കേതിക വളർച്ച എപ്പോഴും മാനവിക മൂല്യങ്ങളിലും, ധാർമ്മിക ബോധത്തിലും, മനുഷ്യന്റെ അന്തസ്സിലും അധിഷ്ഠിതമായിരിക്കണം"
          },
          {
            "en": "To build machines as quickly as possible without safety regulations",
            "mal": "യാതൊരു നിയമങ്ങളുമില്ലാതെ വേഗത്തിൽ മെഷീനുകൾ ഉണ്ടാക്കുക"
          },
          {
            "en": "To stop studying philosophy and focus only on typing speed",
            "mal": "തത്ത്വചിന്ത നിർത്തിവെക്കുക"
          },
          {
            "en": "To replace all human art and literature with machine code",
            "mal": "സാഹിത്യവും കലയും നിർമാർജ്ജനം ചെയ്യുക"
          }
        ],
        "answer": 0,
        "explanation": "Philosophy ensures that as we create increasingly autonomous systems, we protect human agency, moral responsibility, and the sacredness of conscious life.",
        "explanationMal": "യന്ത്രങ്ങൾ കൂടുതൽ ശക്തമാകുമ്പോൾ മനുഷ്യന്റെ മൂല്യങ്ങളും കാരുണ്യവും ലോകത്ത് കൂടുതൽ കരുത്തോടെ കാത്തുസൂക്ഷിക്കേണ്ടതുണ്ട് എന്ന സന്ദേശമാണിത്."
      }
    ]
  }
};
