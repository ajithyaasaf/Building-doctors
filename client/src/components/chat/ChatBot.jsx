import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, COMPANY_NAME } from '@/lib/constants';

// Sample responses for the chatbot
const RESPONSES = {
  greeting: `Hello! Welcome to ${COMPANY_NAME}. How can I help you today?`,
  greeting_followup: "I can help with information about our services, schedule a diagnosis for your building issues, or answer questions about our company.",
  default: "I'm not sure I understand. Can you try rephrasing or select one of the options below?",
  services: "We offer a variety of building repair and waterproofing services. Which specific service are you interested in?",
  services_list: "Our main services include:\n• Waterproofing\n• Crack Repair\n• Seepage Control\n• Structural Repairs\n• Chemical Treatments\n• Expansion Joint Treatment",
  pricing: "Our pricing varies based on the specific requirements of your building. We offer free site inspections to provide accurate quotations. Would you like to schedule an inspection?",
  contact: "You can reach us by phone at +91 9876543210 or email at info@buildingdoctor.in. Our office is open Monday to Saturday, 9 AM to 6 PM.",
  appointment: "Great! To schedule a diagnosis, we'll need some information. What's a good phone number to reach you?",
  appointment_followup: "Perfect! What's the best time for our technician to visit? We're available Monday to Saturday, 9 AM to 6 PM.",
  appointment_confirmed: "Thank you! We've scheduled your diagnosis. Our team will call you shortly to confirm the details. Is there anything specific about your building issues we should know?",
  thanks: "You're welcome! Is there anything else I can help you with?",
  goodbye: "Thank you for chatting with us. Feel free to contact us anytime for your building repair needs!",
  about: "OM Vinayaga Associates is the official Building Doctor franchise in Madurai, with over 10 years of experience in building repairs and waterproofing. We've helped more than 2,000 clients restore and protect their properties.",
  location: "We are located in Madurai and serve all surrounding areas. We provide on-site services throughout the region.",
  waterproofing: "Our waterproofing services include roof waterproofing, bathroom waterproofing, and basement waterproofing. We use high-quality materials with up to 10 years warranty.",
  cracks: "We provide comprehensive crack filling and structural repair solutions with advanced epoxy injections and carbon fiber reinforcement.",
  seepage: "Our seepage control treatments identify and address the root cause of water penetration, preventing dampness and mold growth in walls and ceilings.",
  expansion_joints: "We specialize in expansion joint treatments using advanced elastic sealants that maintain structural integrity while allowing for building movement.",
  inspection: "Our building inspection includes checking for leaks, cracks, seepage, and structural issues. We provide a detailed report with recommended solutions.",
  materials: "We use only premium quality, internationally certified materials for all our repair and waterproofing solutions, ensuring long-lasting results.",
  warranty: "All our services come with written guarantees. Depending on the service, warranties range from 1 to 10 years.",
  process: "Our process includes: 1) Initial consultation, 2) Site inspection, 3) Detailed diagnosis, 4) Customized solution proposal, 5) Professional execution, and 6) Follow-up to ensure quality."
};

// Quick reply options
const QUICK_REPLIES = [
  { id: 'services', text: 'Services Offered' },
  { id: 'appointment', text: 'Schedule a Diagnosis' },
  { id: 'contact', text: 'Contact Information' },
  { id: 'pricing', text: 'Pricing Information' },
  { id: 'about', text: 'About Us' },
];

// Additional quick reply sets
const APPOINTMENT_QUICK_REPLIES = [
  { id: 'morning', text: 'Morning (9AM-12PM)' },
  { id: 'afternoon', text: 'Afternoon (12PM-3PM)' },
  { id: 'evening', text: 'Evening (3PM-6PM)' },
];

const GENERAL_QUICK_REPLIES = [
  { id: 'process', text: 'How It Works' },
  { id: 'warranty', text: 'Warranty Information' },
  { id: 'location', text: 'Service Areas' },
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
      
      // More comprehensive keyword matching
      const input = userMessage.toLowerCase();
      
      // Greeting patterns
      if (input.match(/^(hello|hi|hey|howdy|greetings|good (morning|afternoon|evening)|namaste)/i)) {
        botResponse = messages.length <= 1 ? 
          `${RESPONSES.greeting} ${RESPONSES.greeting_followup}` : 
          RESPONSES.greeting;
      } 
      // Service related queries
      else if (input.match(/(service|offer|provide|do you do|what (can|do) you|solutions)/i)) {
        botResponse = RESPONSES.services_list;
        showOptions = true;
      }
      // About the company
      else if (input.match(/(about|company|who are you|tell me about|history|experience)/i)) {
        botResponse = RESPONSES.about;
        showOptions = false;
      }
      // Contact information
      else if (input.match(/(contact|phone|call|email|reach|office|location|address)/i)) {
        botResponse = RESPONSES.contact;
        showOptions = false;
      }
      // Appointment scheduling
      else if (input.match(/(appointment|schedule|book|visit|consult|diagnosis|inspection|check|come)/i)) {
        botResponse = RESPONSES.appointment;
        showOptions = false;
      }
      // Pricing queries
      else if (input.match(/(price|cost|fee|charge|how much|expensive|affordable|quote|estimate)/i)) {
        botResponse = RESPONSES.pricing;
        showOptions = false;
      }
      // Location/service area
      else if (input.match(/(where|location|area|city|region|madurai|cover|service area)/i)) {
        botResponse = RESPONSES.location;
        showOptions = false;
      }
      // Process/how it works
      else if (input.match(/(process|how does it work|steps|procedure|what happens|method)/i)) {
        botResponse = RESPONSES.process;
        showOptions = false;
      }
      // Warranty/guarantee
      else if (input.match(/(warranty|guarantee|promise|assurance|how long)/i)) {
        botResponse = RESPONSES.warranty;
        showOptions = false;
      }
      // Materials used
      else if (input.match(/(material|chemical|product|quality|substance|brand)/i)) {
        botResponse = RESPONSES.materials;
        showOptions = false;
      }
      // Waterproofing specific
      else if (input.match(/(waterproof|leak|seepage|damp|moisture|water|rain|terrace|roof)/i)) {
        botResponse = RESPONSES.waterproofing;
        showOptions = false;
      }
      // Crack repair specific
      else if (input.match(/(crack|break|fissure|split|fracture|structural|wall)/i)) {
        botResponse = RESPONSES.cracks;
        showOptions = false;
      }
      // Seepage specific
      else if (input.match(/(seep|moist|damp|wet wall|water stain|humidity)/i)) {
        botResponse = RESPONSES.seepage;
        showOptions = false;
      }
      // Expansion joints
      else if (input.match(/(expansion|joint|building movement|elasticity|sealant)/i)) {
        botResponse = RESPONSES.expansion_joints;
        showOptions = false;
      }
      // Gratitude expressions
      else if (input.match(/(thank|thanks|appreciate|grateful)/i)) {
        botResponse = RESPONSES.thanks;
        showOptions = false;
      }
      // Goodbye expressions
      else if (input.match(/(bye|goodbye|see you|talk later|end)/i)) {
        botResponse = RESPONSES.goodbye;
        showOptions = false;
      }
      // Default response
      else {
        botResponse = RESPONSES.default;
        showOptions = false;
      }
      
      // Update service options state if specified
      if (showOptions !== null) {
        setShowServiceOptions(showOptions);
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
          break;
        case 'about':
          botResponse = RESPONSES.about;
          quickReplies = GENERAL_QUICK_REPLIES;
          break;
          
        // Appointment time slots
        case 'morning':
        case 'afternoon':
        case 'evening':
          botResponse = RESPONSES.appointment_confirmed;
          break;
          
        // General options
        case 'process':
          botResponse = RESPONSES.process;
          break;
        case 'warranty':
          botResponse = RESPONSES.warranty;
          break;
        case 'location':
          botResponse = RESPONSES.location;
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
            
            // Show appointment options
            quickReplies = APPOINTMENT_QUICK_REPLIES;
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
        className="fixed bottom-6 right-6 sm:right-24 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all z-50"
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
            className="fixed bottom-20 right-6 sm:right-24 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
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