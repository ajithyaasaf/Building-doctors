import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, COMPANY_NAME } from '@/lib/constants';

// Sample responses for the chatbot
const RESPONSES = {
  greeting: `Hello! Welcome to ${COMPANY_NAME}. How can I help you today?`,
  default: "I'm not sure I understand. Can you try rephrasing or select one of the options below?",
  services: "We offer a variety of building repair and waterproofing services. Which specific service are you interested in?",
  contact: "You can reach us by phone at +91 9876543210 or email at info@buildingdoctor.in. Would you like us to call you back?",
  appointment: "Great! To schedule a diagnosis, we'll need some information. What's a good phone number to reach you?",
  thanks: "You're welcome! Is there anything else I can help you with?",
  goodbye: "Thank you for chatting with us. Feel free to contact us anytime for your building repair needs!",
  waterproofing: "Our waterproofing services include roof waterproofing, bathroom waterproofing, and basement waterproofing. We use high-quality materials with up to 10 years warranty.",
  cracks: "We provide comprehensive crack filling and structural repair solutions with advanced epoxy injections and carbon fiber reinforcement.",
  inspection: "Our building inspection includes checking for leaks, cracks, seepage, and structural issues. We provide a detailed report with recommended solutions.",
};

// Quick reply options
const QUICK_REPLIES = [
  { id: 'services', text: 'Services Offered' },
  { id: 'appointment', text: 'Schedule a Diagnosis' },
  { id: 'contact', text: 'Contact Information' },
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
      
      // Simple keyword matching
      const input = userMessage.toLowerCase();
      
      if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        botResponse = RESPONSES.greeting;
      } else if (input.includes('service') || input.includes('offer')) {
        botResponse = RESPONSES.services;
        setShowServiceOptions(true);
      } else if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
        botResponse = RESPONSES.contact;
      } else if (input.includes('appointment') || input.includes('schedule') || input.includes('book')) {
        botResponse = RESPONSES.appointment;
      } else if (input.includes('thank')) {
        botResponse = RESPONSES.thanks;
      } else if (input.includes('bye') || input.includes('goodbye')) {
        botResponse = RESPONSES.goodbye;
      } else if (input.includes('waterproof')) {
        botResponse = RESPONSES.waterproofing;
      } else if (input.includes('crack')) {
        botResponse = RESPONSES.cracks;
      } else if (input.includes('inspect')) {
        botResponse = RESPONSES.inspection;
      } else {
        botResponse = RESPONSES.default;
        setShowServiceOptions(false);
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
      
      // Handle different quick reply options
      switch (option.id) {
        case 'services':
          botResponse = RESPONSES.services;
          setShowServiceOptions(true);
          break;
        case 'appointment':
          botResponse = RESPONSES.appointment;
          setShowServiceOptions(false);
          break;
        case 'contact':
          botResponse = RESPONSES.contact;
          setShowServiceOptions(false);
          break;
        default:
          // Handle service-specific responses
          const service = SERVICES.find(s => s.slug === option.id);
          if (service) {
            botResponse = `Our ${service.title} service includes ${service.features.join(', ')}. Would you like to schedule a diagnosis?`;
            setShowServiceOptions(false);
          } else {
            botResponse = RESPONSES.default;
          }
      }
      
      // Add bot response
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
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
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-all z-50"
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
            className="fixed bottom-20 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-xl overflow-hidden z-50 flex flex-col"
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
                  <QuickReplies options={QUICK_REPLIES} onSelect={handleQuickReplySelect} />
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