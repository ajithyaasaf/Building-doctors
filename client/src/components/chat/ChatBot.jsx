import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, COMPANY_NAME } from '@/lib/constants';

// Comprehensive responses for the chatbot with Tamil/Madurai regional context
const RESPONSES = {
  // Basic interactions with Tamil greetings
  greeting: `Vanakkam! Welcome to ${COMPANY_NAME}. How can I help you today?`,
  greeting_followup: "I can help with information about our services, schedule a diagnosis for your building issues, or answer questions about our company. Neenga enna theva? (What do you need?)",
  default: "I'm not sure I understand. Can you try rephrasing or select one of the options below? Konjam clear-a solla mudiyuma? (Can you explain more clearly?)",
  thanks: "You're welcome! Mikka nandri! Is there anything else I can help you with?",
  goodbye: "Thank you for chatting with us. Meeṇḍum santippōm (See you again)! Feel free to contact us anytime for your building repair needs.",
  
  // Company information with Madurai context
  about: "OM Vinayaga Associates is the official Building Doctor franchise in Madurai, with over 10 years of experience in building repairs and waterproofing. Located near Meenakshi Amman Temple, we've helped more than 2,000 clients across Madurai and Tamil Nadu restore and protect their properties.",
  location: "Our main office is located in K.K. Nagar, Madurai. We serve all surrounding areas including Tirunelveli, Tuticorin, Dindigul, Theni, Karur, and Sivakasi. We provide on-site services throughout the Southern Tamil Nadu region.",
  experience: "Our team has over 10 years of specialized experience in building repair and diagnostics. We understand the unique challenges of Southern Tamil Nadu's climate and have successfully completed more than 2,000 projects from small homes to large commercial complexes like Vishal de Mal and Tata Centre.",
  expertise: "Our technical experts are certified professionals with extensive training in advanced building repair techniques. We specialize in solutions specifically designed for hot and humid climates like Madurai. Our engineers understand local building practices and materials used in Tamil Nadu construction.",
  
  // Contact and appointment with local context
  contact: "You can reach us by phone at +91 9876543210 or email at info@buildingdoctor.in. Our office at K.K. Nagar is open Monday to Saturday, 9 AM to 6 PM. Enga thodarpu kollalam! (Contact us!)",
  appointment: "Great! To schedule a diagnosis, we'll need some information. What's a good phone number to reach you? Ungala thodarbu kolla enna number kudukkalaam? (What's your contact number?)",
  appointment_followup: "Perfect! What's the best time for our technician to visit? We're available Monday to Saturday, 9 AM to 6 PM. Morning or evening, eppo vasathi? (When is convenient?)",
  appointment_confirmed: "Thank you! Nandri! We've scheduled your diagnosis. Our team will call you shortly to confirm the details. Is there anything specific about your building issues we should know?",
  emergency: "For emergency services like severe leaks or structural concerns, please call our emergency line at +91 9876543211. We offer 24-hour emergency response for critical situations, especially during heavy monsoon rains.",
  visit_timing: "Our site visits typically take 30-60 minutes depending on the size of the property and complexity of issues. Our technician will thoroughly inspect the problem areas and explain the findings in Tamil or English, as you prefer.",
  
  // Services information with regional focus
  services: "We offer a variety of building repair and waterproofing services tailored for homes and buildings in Tamil Nadu. Enga sevai? (Our services?) Which specific service are you interested in?",
  services_list: "Our main services include:\n• Terrace/Mottai Maadi Waterproofing\n• Bathroom/Kuliyalarai Waterproofing\n• Crack Repair & Structural Strengthening\n• Seepage & Dampness Control (Eerappatham Theervugal)\n• Chemical Treatments & Injections\n• Expansion Joint Solutions\n• Building Health Assessments\n• Rehabilitation & Retrofitting",
  
  // Pricing information with local context
  pricing: "Our pricing varies based on the specific requirements of your building. We offer free site inspections to provide accurate quotations. Local to Madurai? We can visit within 24 hours. Would you like to schedule an inspection?",
  price_range: "For residential properties in and around Madurai, our services typically range from ₹5,000 for minor repairs to ₹50,000+ for comprehensive solutions. We offer special rates for apartments and small homes. Commercial projects are quoted based on scope and area.",
  payment: "We accept payments via bank transfer, UPI, GPay, PhonePe, credit/debit cards, and cash. For larger projects, we offer flexible payment schedules tied to project milestones. We also have EMI options with select banks.",
  discounts: "We currently offer a 10% discount on your first service, and additional 5% discount for senior citizens. During festival seasons like Pongal and Diwali, we run special promotions. Ask about our referral program!",
  
  // Process information with local adaptations
  process: "Our 6-step process includes: 1) Initial consultation in Tamil or English, 2) Detailed site inspection, 3) Root cause diagnosis, 4) Customized solution proposal considering local climate, 5) Professional execution, and 6) Quality verification and follow-up.",
  inspection: "Our comprehensive building inspection includes checking for leaks, cracks, seepage, structural issues, and deterioration. We're especially experienced with issues common in Madurai's climate like heat-related expansion and monsoon leakages. We provide a detailed report with recommended solutions and priority order.",
  repair_time: "Project timelines vary based on the scope. Minor repairs can be completed in 1-2 days, while comprehensive treatments may take 1-2 weeks. During festival seasons and heavy monsoons, schedules may need adjustments, but we always provide estimated completion dates before starting.",
  preparation: "Before our team arrives, we recommend clearing access to problem areas and removing any valuable or fragile items from the work zone. Our team will use protective coverings for furniture and floors. We work respectfully in your home, following local customs.",
  post_repair: "After completing repairs, we provide a maintenance guide specific to your property with tips for Madurai's climate conditions. We also schedule a free follow-up inspection after 3 months to ensure all solutions are performing optimally, especially after the first rain.",
  
  // Materials and quality with regional relevance
  materials: "We use only premium quality, internationally certified materials adapted for Tamil Nadu's hot and humid climate. Our waterproofing solutions are specially formulated to withstand Madurai's intense summer heat and heavy monsoon rains, ensuring long-lasting results. Our products are eco-friendly and safe for residential use.",
  warranty: "All our services come with written guarantees. Depending on the service, warranties range from 1 to 10 years. Our waterproofing solutions typically carry a 5-7 year warranty against leakages, even through the heaviest Northeast monsoon seasons.",
  quality_control: "We implement a strict 3-tier quality control process with pre-application testing, during-application supervision, and post-application verification to ensure top-notch results. Our staff is trained to address the unique building challenges of Southern Tamil Nadu.",
  brands: "We work with industry-leading brands like Dr. Fixit, Fosroc, BASF, Sika, and MYK Laticrete to ensure the highest quality repairs with performance guarantees. We also source specialized materials designed for South Indian climatic conditions.",
  
  // Specific service details with regional context
  waterproofing: "Our comprehensive waterproofing services include terrace (mottai maadi) waterproofing, bathroom waterproofing, basement waterproofing, and external wall treatments. We use advanced membrane, cementitious, and injection technologies tailored to withstand Madurai's intense heat and seasonal rains.",
  roof_waterproofing: "Our terrace waterproofing uses multi-layer treatments including primer coats, membrane/liquid applications, and protective top coats designed to reflect heat and prevent leaks. Our solutions work effectively on traditional Madras terraces as well as modern constructions.",
  bathroom_waterproofing: "Our bathroom waterproofing involves treating the entire wet area including floors, walls, and joints with specialized systems that prevent water migration. We address issues common in Tamil Nadu homes like poor plumbing installations and outdated construction techniques.",
  basement_waterproofing: "For basements, we utilize a combination of exterior barrier systems and interior treatments to protect against ground water infiltration, especially important in areas near the Vaigai River and during monsoon seasons when water tables rise.",
  external_waterproofing: "Our external wall treatments provide protection against driving rain and high humidity, preventing water absorption while maintaining breathability. This is crucial for buildings in Madurai that face both intense heat and heavy seasonal rains.",
  
  cracks: "We provide comprehensive crack repair solutions addressing issues common in Tamil Nadu buildings. Our services include advanced epoxy injections, carbon fiber reinforcement, and specialized fillers based on crack type and movement patterns.",
  hairline_cracks: "For hairline and shrinkage cracks, common in buildings during Madurai's dry summers, we use flexible acrylic fillers that accommodate minor movements while providing waterproof sealing.",
  structural_cracks: "Structural cracks, which can be concerning in older Madurai buildings or those near construction sites, require specialized treatment with epoxy or polyurethane injections to restore structural integrity and prevent further damage.",
  
  seepage: "Our seepage control treatments identify and address the root cause of water penetration, a common problem during Northeast monsoon seasons. We prevent dampness and mold growth in walls and ceilings using injection systems, surface treatments, and capillary blocking agents.",
  dampness: "Dampness issues, very common during and after monsoon seasons in Tamil Nadu, often indicate either rising damp or penetrating damp. We offer specific treatments for each condition, considering the local construction materials used in your building.",
  rising_damp: "For rising damp, a frequent problem in older Madurai buildings with inadequate damp-proof courses, we implement horizontal chemical barriers (DPC) through pressure injection or gravity-fed systems to block moisture movement.",
  efflorescence: "White salt deposits (known locally as 'uppu padinthuduchu') indicate ongoing moisture migration. Our treatments remove existing deposits and prevent recurrence by addressing the underlying moisture source, a common issue in Tamil Nadu's mineral-rich soil areas.",
  
  expansion_joints: "We specialize in expansion joint treatments critical for buildings in Madurai's extreme temperature variations. We use advanced elastic sealants and engineered fillers that maintain structural integrity while allowing for building movement across seasons.",
  joint_repair: "Our joint repair systems address both expansion and construction joints with appropriate backing materials and high-performance sealants selected for specific movement requirements and local climate conditions.",
  
  structural: "Our structural strengthening solutions include carbon fiber reinforcement, section enlargement, and specialized grouting to restore or enhance load-bearing capacity of buildings affected by settlement, poor construction quality, or aging materials common in the region.",
  retrofitting: "Our building retrofitting services improve the structural performance of existing buildings to meet current standards and extend building life, especially important for older structures in Tamil Nadu's heritage areas.",
  
  // Problem-specific responses for regional issues
  leaking_roof: "Terrace leaks are a common problem during Tamil Nadu's monsoon seasons. They can stem from multiple causes including damaged waterproofing, improper slopes, blocked drains, or expansion cracks from summer heat. Our diagnosis identifies the exact cause before recommending targeted solutions.",
  water_stains: "Water stains on ceilings or walls (thanni kara) typically indicate active leaks or past moisture problems. Very common after heavy rains in Madurai, these stains can damage paint and plaster. We can identify the source and extent of damage, then provide comprehensive repair solutions.",
  peeling_paint: "Peeling paint (varnish uriyal) is a frequent complaint in Madurai's humid climate. It often signals underlying moisture issues rather than paint quality problems. Rather than just repainting, we identify and address the root cause for a lasting solution.",
  mold_mildew: "Mold and mildew (kaalan valarppu) are common problems during monsoon seasons in Tamil Nadu. Our approach includes removing existing growth, treating surfaces, and—most importantly—eliminating the moisture source through appropriate waterproofing.",
  concrete_spalling: "Concrete spalling is increasingly common in Madurai's older buildings and those exposed to pollution. Our treatment involves removing damaged concrete, treating or replacing corroded reinforcement, and applying protective coatings designed for local climate conditions.",
  foundation_issues: "Foundation problems in Tamil Nadu often relate to soil conditions and water table fluctuations. Signs include cracks in foundation walls, uneven floors, or doors that won't close properly. We provide comprehensive assessment and appropriate stabilization solutions.",
  
  // Maintenance advice for Tamil Nadu climate
  maintenance_tips: "Regular maintenance is essential in Tamil Nadu's climate extremes. Keep terrace drains clear before monsoon, repair minor cracks after summer expansion, ensure proper ventilation during humid periods, and schedule annual inspections before each rainy season.",
  monsoon_prep: "Before monsoon season, especially the Northeast monsoon that affects Madurai heavily, we recommend checking terrace drainage, sealing any visible cracks, ensuring window and door seals are intact, and testing previous waterproofing work.",
  seasonal_care: "Madurai's seasons demand different building care approaches. Summer heat (May-June) causes expansion and roof damage, while monsoon (Oct-Dec) tests all waterproofing. Our seasonal maintenance programs address each period's unique demands.",
  
  // Common local building terms
  local_terms: "We understand local building terms like 'mottai maadi' (terrace), 'thanni kara' (water marks), 'eerappu' (dampness), 'suvar verippu' (wall cracks), and 'ottu veedu' (thatched house). Feel free to describe your problem in Tamil or English.",
  
  // Regional construction challenges
  regional_issues: "Buildings in Madurai face unique challenges including extreme heat causing expansion, heavy seasonal rains, high water tables in areas near Vaigai River, and traditional construction methods that may lack modern waterproofing. Our solutions address these specific regional factors."
};

// Main quick reply options
const QUICK_REPLIES = [
  { id: 'services', text: 'Services / Sevai' },
  { id: 'appointment', text: 'Schedule a Visit' },
  { id: 'contact', text: 'Contact Us' },
  { id: 'pricing', text: 'Pricing Details' },
  { id: 'about', text: 'About Us' },
  { id: 'local_terms', text: 'Tamil Building Terms' },
];

// Appointment scheduling quick replies
const APPOINTMENT_QUICK_REPLIES = [
  { id: 'morning', text: 'Morning (9AM-12PM)' },
  { id: 'afternoon', text: 'Afternoon (12PM-3PM)' },
  { id: 'evening', text: 'Evening (3PM-6PM)' },
];

// Company information quick replies
const GENERAL_QUICK_REPLIES = [
  { id: 'experience', text: 'Our Experience' },
  { id: 'expertise', text: 'Technical Expertise' },
  { id: 'process', text: 'How It Works' },
  { id: 'warranty', text: 'Warranty Information' },
  { id: 'location', text: 'Service Areas' },
];

// Problem-specific quick replies
const PROBLEM_QUICK_REPLIES = [
  { id: 'leaking_roof', text: 'Roof Leakage' },
  { id: 'bathroom_waterproofing', text: 'Bathroom Leaks' },
  { id: 'dampness', text: 'Wall Dampness' },
  { id: 'cracks', text: 'Wall Cracks' },
  { id: 'structural', text: 'Structural Issues' },
];

// Maintenance quick replies
const MAINTENANCE_QUICK_REPLIES = [
  { id: 'maintenance_tips', text: 'General Maintenance' },
  { id: 'monsoon_prep', text: 'Monsoon Preparation' },
  { id: 'seasonal_care', text: 'Seasonal Care' },
  { id: 'quality_control', text: 'Quality Standards' },
];

// Price and payment quick replies
const PRICE_QUICK_REPLIES = [
  { id: 'price_range', text: 'Price Ranges' },
  { id: 'payment', text: 'Payment Methods' },
  { id: 'discounts', text: 'Current Offers' },
];

// Service quick replies
const SERVICE_QUICK_REPLIES = SERVICES.map(service => ({
  id: service.slug,
  text: service.title
}));

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[80%] ${
          isUser
            ? 'bg-orange-600 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

const QuickReplies = ({ options, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-800 transition-colors"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showServiceOptions, setShowServiceOptions] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState(QUICK_REPLIES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { text: RESPONSES.greeting, isUser: false }
        ]);
        setIsTyping(false);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = inputValue;
    setMessages([...messages, { text: userMessage, isUser: true }]);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Process user input and generate response
    setTimeout(() => {
      let botResponse = '';
      let showOptions = null; // null = retain current, true = service options, false = default options
      let newQuickReplies = null; // Set new quick replies if needed
      
      // More comprehensive keyword matching
      const input = userMessage.toLowerCase();
      const lastBotMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      const conversationContext = lastBotMessage && !lastBotMessage.isUser ? lastBotMessage.text : null;
      
      // Context-aware response system
      // If the previous bot message was asking for phone number (appointment flow)
      if (conversationContext && conversationContext.includes(RESPONSES.appointment)) {
        // User provided phone number (simple validation: contains numbers)
        if (/\d/.test(input)) {
          botResponse = RESPONSES.appointment_followup;
          newQuickReplies = APPOINTMENT_QUICK_REPLIES;
        } else {
          botResponse = "Could you please provide a valid phone number so we can contact you about your appointment?";
        }
      }
      // Handle time slot context (for appointment scheduling)
      else if (conversationContext && conversationContext.includes(RESPONSES.appointment_followup)) {
        botResponse = RESPONSES.appointment_confirmed;
        newQuickReplies = QUICK_REPLIES;
      }
      // Main conversation patterns
      else {
        // Greeting patterns - with Tamil translations
        if (input.match(/^(hello|hi|hey|howdy|greetings|good (morning|afternoon|evening)|namaste|vanakkam|vannakam|vanakam|namaskar)/i)) {
          botResponse = messages.length <= 1 ? 
            `${RESPONSES.greeting} ${RESPONSES.greeting_followup}` : 
            RESPONSES.greeting;
        } 
        
        // Service related queries - with Tamil terms
        else if (input.match(/(service|offer|provide|do you do|what (can|do) you|solutions|treatments|repairs|fix|sevai|sevaikal|repair panuveengala|work|kariyam)/i)) {
          botResponse = RESPONSES.services_list;
          showOptions = true;
        }
        
        // About the company - expertise and experience
        else if (input.match(/(about|company|who are you|tell me about|history|experience|expertise|qualification|trained|certified|ungalai pathi|niruvanam|yaaru neenga)/i)) {
          if (input.match(/(experience|history|years|projects|completed|anubavam)/i)) {
            botResponse = RESPONSES.experience;
          } else if (input.match(/(expertise|qualification|trained|certified|professional|technical|puthimai|arivaal)/i)) {
            botResponse = RESPONSES.expertise;
          } else {
            botResponse = RESPONSES.about;
          }
          newQuickReplies = GENERAL_QUICK_REPLIES;
        }
        
        // Local building terms request
        else if (input.match(/(tamil|local|regional|native|language|term|word|phrase|expression|translate|madurai|tamilnadu)/i)) {
          botResponse = RESPONSES.local_terms;
          showOptions = false;
        }
        
        // Regional construction issues
        else if (input.match(/(regional|local|madurai|tamil(l)? ?nadu|specific|issue|problem|challenge|weather|climate)/i)) {
          botResponse = RESPONSES.regional_issues;
          showOptions = false;
        }
        
        // Contact information
        else if (input.match(/(contact|phone|call|email|reach|office|visit us|talk to|speak with|representative|thodarbu|azhaippu|cell|mobile)/i)) {
          botResponse = RESPONSES.contact;
        }
        
        // Appointment scheduling
        else if (input.match(/(appointment|schedule|book|visit|consult|diagnosis|inspection|check|come|site visit|evaluate|assess|examine|varukai|neeram|samayam|check panna|paarkka)/i)) {
          if (input.match(/(emergency|urgent|immediately|asap|critical|severe|serious|avacaram|udane|ippove)/i)) {
            botResponse = RESPONSES.emergency;
          } else if (input.match(/(timing|duration|how long|take time|hours|samayam|neeram)/i)) {
            botResponse = RESPONSES.visit_timing;
          } else {
            botResponse = RESPONSES.appointment;
          }
          newQuickReplies = APPOINTMENT_QUICK_REPLIES;
        }
        
        // Pricing queries
        else if (input.match(/(price|cost|fee|charge|how much|expensive|affordable|quote|estimate|budget|payment|discount|offer|vilai|panam|rate|kasu|payment|sevai kattanam)/i)) {
          if (input.match(/(range|typical|average|estimate|ballpark|sarasari)/i)) {
            botResponse = RESPONSES.price_range;
          } else if (input.match(/(payment|pay|method|cash|card|upi|transfer|installment|panam|kattanam|gPay|phonePay|cash)/i)) {
            botResponse = RESPONSES.payment;
          } else if (input.match(/(discount|offer|promotion|deal|special|save|reduction|salugai|thallubadi)/i)) {
            botResponse = RESPONSES.discounts;
          } else {
            botResponse = RESPONSES.pricing;
          }
          newQuickReplies = PRICE_QUICK_REPLIES;
        }
        
        // Location/service area
        else if (input.match(/(where|location|area|city|region|madurai|cover|service area|distance|travel|nearby|enge|engirukku|idam|paguthy)/i)) {
          botResponse = RESPONSES.location;
        }
        
        // Process/how it works
        else if (input.match(/(process|how does it work|steps|procedure|what happens|method|approach|system|protocol|eppadi|seyal murai|vazhi murai)/i)) {
          botResponse = RESPONSES.process;
        }
        
        // Warranty/guarantee
        else if (input.match(/(warranty|guarantee|promise|assurance|how long|last|duration|uruthi|nambikaiyalippu|guarant(ee|y))/i)) {
          botResponse = RESPONSES.warranty;
        }
        
        // Quality control
        else if (input.match(/(quality|control|standard|maintain|ensure|check|tharamana|uyar tharam|nalla|tharathil)/i)) {
          botResponse = RESPONSES.quality_control;
        }
        
        // Materials/brands used
        else if (input.match(/(material|chemical|product|quality|substance|brand|company|manufacturer|porutkal|samagri|vasthukkal|brand)/i)) {
          if (input.match(/(brand|company|manufacturer|supplier|name|nilai|niruvan|peyar)/i)) {
            botResponse = RESPONSES.brands;
          } else {
            botResponse = RESPONSES.materials;
          }
        }
        
        // SPECIFIC BUILDING PROBLEMS WITH TAMIL TERMS
        // Waterproofing specific issues
        else if (input.match(/(waterproof|leak|water|rain|terrace|roof|bathroom|toilet|shower|basement|cellar|thanni|mazhai|kottai|kuliyalarai|mottai maadi|thani kasivuthu|olukku|watarproof)/i)) {
          if (input.match(/(roof|terrace|top|ceiling|upstairs|mottai maadi|madi|melvalavu|terr?a(ce|s)|terace)/i)) {
            botResponse = RESPONSES.roof_waterproofing;
          } else if (input.match(/(bathroom|toilet|shower|wet area|wash|tub|kuliyalarai|kuliyal arai|bath ?room|toilat|toilate|shower|tub)/i)) {
            botResponse = RESPONSES.bathroom_waterproofing;
          } else if (input.match(/(basement|cellar|underground|below|lower|keezh|adimaddi|tharai|basment)/i)) {
            botResponse = RESPONSES.basement_waterproofing;
          } else if (input.match(/(exterior|external|outside|outer|facade|wall outside|veli|veli suvar|outer)/i)) {
            botResponse = RESPONSES.external_waterproofing;
          } else {
            botResponse = RESPONSES.waterproofing;
          }
        }
        
        // Crack repair specific
        else if (input.match(/(crack|break|fissure|split|fracture|structural|wall damage|verippu|vetippu|suvar vetippu|verippu|cracku|wall crack|suvar crack)/i)) {
          if (input.match(/(hairline|fine|thin|small|minor|surface|nur|nunniya|siriya)/i)) {
            botResponse = RESPONSES.hairline_cracks;
          } else if (input.match(/(structural|major|serious|large|wide|deep|foundation|load bearing|periya|athikam|adithalam|aasthi|structural|pillar|thoon)/i)) {
            botResponse = RESPONSES.structural_cracks;
          } else {
            botResponse = RESPONSES.cracks;
          }
        }
        
        // Seepage and dampness issues
        else if (input.match(/(seep|moist|damp|wet wall|water stain|humidity|condensation|soggy|dripping|eerappu|iyppu|eeram|thanni kara|eera suvar|eera|thaip?pu|drip)/i)) {
          if (input.match(/(rising|ground|floor|coming up|bottom|keezh|adithalam|tharai|floor)/i)) {
            botResponse = RESPONSES.rising_damp;
          } else if (input.match(/(white|salt|powder|crystal|deposit|efflorescence|uppu|vellai|padinthiruku|uppu vetippu|uppu thool)/i)) {
            botResponse = RESPONSES.efflorescence;
          } else {
            botResponse = RESPONSES.seepage;
          }
        }
        
        // Expansion joints
        else if (input.match(/(expansion|joint|building movement|elasticity|sealant|gap|space between|flexible|virivakka|idaveli|ilavalavu|gap|idaiveli|sealan)/i)) {
          if (input.match(/(repair|fix|replace|renew|restore|maintain|serrthil|repair|maramathu)/i)) {
            botResponse = RESPONSES.joint_repair;
          } else {
            botResponse = RESPONSES.expansion_joints;
          }
        }
        
        // Structural issues
        else if (input.match(/(structural|foundation|load bearing|column|beam|slab|support|pillar|strength|adithalam|thoon|beam|thuukki|thoongal|pillar|strength|foundation|adharam)/i)) {
          if (input.match(/(foundation|base|ground|settle|sink|uneven|adithalam|nela|ner|illai|sari illai|sinking|settle)/i)) {
            botResponse = RESPONSES.foundation_issues;
          } else if (input.match(/(retrofit|strengthen|reinforce|upgrade|improve|enhance|gyam|balappaduththal|balum|palapaduthuthu)/i)) {
            botResponse = RESPONSES.retrofitting;
          } else {
            botResponse = RESPONSES.structural;
          }
        }
        
        // SPECIFIC BUILDING SYMPTOMS WITH COMMON SPELLINGS
        // Visible damage symptoms
        else if (input.match(/(stain|discolor|mark|spot|patch|kara|karai|azhuku|mark|vattu)/i) && input.match(/(water|damp|wet|moisture|thanni|eeram|thodai)/i)) {
          botResponse = RESPONSES.water_stains;
        }
        else if (input.match(/(peel|flak|blister|bubble|uriyar|urithal|varnish|paint|bubble|blistar)/i) && input.match(/(paint|wall|plaster|surface|suvar|paint|vanish|varnish)/i)) {
          botResponse = RESPONSES.peeling_paint;
        }
        else if (input.match(/(mold|mildew|fungi|black spot|green|growth|smell|odor|musty|kaalan|poosi|kaalan valarppu|karu|pachcha|naatram|smell|karuppu)/i)) {
          botResponse = RESPONSES.mold_mildew;
        }
        else if (input.match(/(spall|chunk|piece|break off|falling|concrete damage|rebar|exposed steel|kankrit|uadaippu|irumbu|steel|rebar|siman|cement)/i)) {
          botResponse = RESPONSES.concrete_spalling;
        }
        else if (input.match(/(roof|ceiling|terrace|top|mottai maadi|melvalavu|kottai)/i) && input.match(/(leak|drip|water coming|puddle|wet|thanni|kasivuthu|olukku|drop|sonthu)/i)) {
          botResponse = RESPONSES.leaking_roof;
        }
        
        // MAINTENANCE AND PREVENTION
        else if (input.match(/(maintain|prevent|avoid|protect|care|extend life|routine|regular|paramarip?pu|paatukaap?pu|kathukol|kathuppu)/i)) {
          if (input.match(/(monsoon|rain|season|prepare|ready|mazhai kaalam|mazhai|panuvam)/i)) {
            botResponse = RESPONSES.monsoon_prep;
          } else if (input.match(/(season|summer|winter|weather|climate|condition|panuvam|kaalam|veyil|veyyil|kulir)/i)) {
            botResponse = RESPONSES.seasonal_care;
          } else {
            botResponse = RESPONSES.maintenance_tips;
            newQuickReplies = MAINTENANCE_QUICK_REPLIES;
          }
        }
        
        // Post-repair questions
        else if (input.match(/(after|complete|finish|done|follow up|maintenance|piragu|mudindha|madhicku|velai mudindha piragu)/i) && 
                input.match(/(repair|service|waterproofing|work|job|project|velai|sevai|pannu|jop|waterproof)/i)) {
          botResponse = RESPONSES.post_repair;
        }
        
        // Pre-repair questions
        else if (input.match(/(before|prepare|ready|prior|ahead|preparation|munnadiyae|tayyar|munnaal|ready)/i) && 
                input.match(/(repair|service|waterproofing|work|job|project|visit|velai|sevai|pannu|veetuku vara)/i)) {
          botResponse = RESPONSES.preparation;
        }
        
        // Time frames
        else if (input.match(/(how long|time|duration|days|weeks|complete|finish|evvalavu neeram|samayam|naal|time|dhina(ngal)?)/i) && 
                input.match(/(repair|service|waterproofing|work|job|project|take|velai|sevai|edukum|aagum)/i)) {
          botResponse = RESPONSES.repair_time;
        }
        
        // Gratitude expressions
        else if (input.match(/(thank|thanks|appreciate|grateful|nandri|mikka nandri|romba thanks|romba nandri)/i)) {
          botResponse = RESPONSES.thanks;
        }
        
        // Goodbye expressions
        else if (input.match(/(bye|goodbye|see you|talk later|end|quit|stop|close|poittu varen|vittu vidunkal|porom|bye)/i)) {
          botResponse = RESPONSES.goodbye;
        }
        
        // Default response for unrecognized queries
        else {
          botResponse = RESPONSES.default;
          showOptions = false;
        }
      }
      
      // Update service options state if specified
      if (showOptions !== null) {
        setShowServiceOptions(showOptions);
      }
      
      // Update quick replies if specified
      if (newQuickReplies !== null) {
        setCurrentQuickReplies(newQuickReplies);
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReplySelect = (option) => {
    // Add user selection as a message
    setMessages([...messages, { text: option.text, isUser: true }]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = '';
      let quickReplies = QUICK_REPLIES; // Default set of quick replies
      let showServices = false;
      
      // Handle different quick reply options
      switch (option.id) {
        // Main quick reply options
        case 'services':
          botResponse = RESPONSES.services_list;
          showServices = true;
          break;
        case 'appointment':
          botResponse = RESPONSES.appointment;
          quickReplies = APPOINTMENT_QUICK_REPLIES;
          break;
        case 'contact':
          botResponse = RESPONSES.contact;
          break;
        case 'pricing':
          botResponse = RESPONSES.pricing;
          quickReplies = PRICE_QUICK_REPLIES;
          break;
        case 'about':
          botResponse = RESPONSES.about;
          quickReplies = GENERAL_QUICK_REPLIES;
          break;
        case 'local_terms':
          botResponse = RESPONSES.local_terms;
          break;
          
        // Appointment time slots
        case 'morning':
        case 'afternoon':
        case 'evening':
          botResponse = RESPONSES.appointment_confirmed;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
          
        // Company information quick replies
        case 'experience':
          botResponse = RESPONSES.experience;
          quickReplies = GENERAL_QUICK_REPLIES;
          break;
        case 'expertise':
          botResponse = RESPONSES.expertise;
          quickReplies = GENERAL_QUICK_REPLIES;
          break;
        case 'process':
          botResponse = RESPONSES.process;
          break;
        case 'warranty':
          botResponse = RESPONSES.warranty;
          break;
        case 'location':
          botResponse = RESPONSES.location;
          break;
          
        // Price and payment quick replies
        case 'price_range':
          botResponse = RESPONSES.price_range;
          quickReplies = PRICE_QUICK_REPLIES;
          break;
        case 'payment':
          botResponse = RESPONSES.payment;
          quickReplies = PRICE_QUICK_REPLIES;
          break;
        case 'discounts':
          botResponse = RESPONSES.discounts;
          quickReplies = PRICE_QUICK_REPLIES;
          break;
          
        // Problem-specific quick replies
        case 'leaking_roof':
          botResponse = RESPONSES.leaking_roof;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
        case 'bathroom_waterproofing':
          botResponse = RESPONSES.bathroom_waterproofing;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
        case 'dampness':
          botResponse = RESPONSES.dampness;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
        case 'cracks':
          botResponse = RESPONSES.cracks;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
        case 'structural':
          botResponse = RESPONSES.structural;
          quickReplies = PROBLEM_QUICK_REPLIES;
          break;
          
        // Maintenance quick replies
        case 'maintenance_tips':
          botResponse = RESPONSES.maintenance_tips;
          quickReplies = MAINTENANCE_QUICK_REPLIES;
          break;
        case 'monsoon_prep':
          botResponse = RESPONSES.monsoon_prep;
          quickReplies = MAINTENANCE_QUICK_REPLIES;
          break;
        case 'seasonal_care':
          botResponse = RESPONSES.seasonal_care;
          quickReplies = MAINTENANCE_QUICK_REPLIES;
          break;
        case 'quality_control':
          botResponse = RESPONSES.quality_control;
          quickReplies = MAINTENANCE_QUICK_REPLIES;
          break;
          
        default:
          // Handle service-specific responses
          const service = SERVICES.find(s => s.slug === option.id);
          if (service) {
            // Construct a more detailed response using service details
            let features = service.features || [];
            let serviceDescription = service.description || '';
            
            botResponse = `Our ${service.title} service addresses ${serviceDescription.substring(0, 100)}... `;
            
            if (features.length > 0) {
              botResponse += `This includes: ${features.slice(0, 3).join(', ')}`;
              if (features.length > 3) botResponse += `, and more`;
            }
            
            botResponse += `. Would you like to schedule a diagnosis for this issue?`;
            
            // Show appointment options after service details
            quickReplies = [
              ...APPOINTMENT_QUICK_REPLIES.slice(0, 2), 
              { id: 'maintenance_tips', text: 'Maintenance Tips' }
            ];
          } else {
            botResponse = RESPONSES.default;
          }
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
      
      // Update state for showing service options
      setShowServiceOptions(showServices);
      
      // Update current quick replies
      setCurrentQuickReplies(quickReplies);
      
      // No longer typing
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-20 right-6 xs:bottom-6 xs:right-20 sm:right-20 md:right-20 lg:right-20 bg-orange-600 text-white p-4 w-14 h-14 rounded-full shadow-lg hover:bg-orange-700 transition-all z-50 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[80px] right-6 xs:bottom-28 xs:right-20 sm:bottom-28 sm:right-20 md:right-20 lg:right-20 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-orange-600 text-white px-4 py-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Building Doctor Assistant</h3>
                <p className="text-xs text-orange-100">We typically reply within minutes</p>
              </div>
              <button onClick={toggleChat} className="text-white">
                <X size={20} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message.text}
                  isUser={message.isUser}
                />
              ))}
              
              {/* Show quick replies after bot messages */}
              {messages.length > 0 && !messages[messages.length - 1].isUser && !isTyping && 
                (showServiceOptions ? 
                  <QuickReplies options={SERVICE_QUICK_REPLIES} onSelect={handleQuickReplySelect} /> : 
                  <QuickReplies options={currentQuickReplies} onSelect={handleQuickReplySelect} />
                )
              }
              
              {/* Bot typing indicator */}
              {isTyping && (
                <div className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg rounded-tl-none w-16 mb-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                This is an automated assistant. For complex issues, please contact us directly.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;