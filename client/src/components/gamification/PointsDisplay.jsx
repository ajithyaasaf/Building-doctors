import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronUp, ChevronDown } from 'lucide-react';
import { useGamification } from './GamificationContext';
import { cn } from '@/lib/utils';

const PointsDisplay = () => {
  const { points, isVisible, recentActivity } = useGamification();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
      {/* Points Counter */}
      <motion.div
        className="bg-orange-600 text-white p-3 rounded-full shadow-lg cursor-pointer relative flex items-center"
        whileHover={{ scale: 1.05 }}
        onClick={() => setExpanded(!expanded)}
      >
        <Award className="h-5 w-5 mr-2" />
        <span className="font-bold">{points} pts</span>
        <span className="ml-1">
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </span>
      </motion.div>

      {/* Points Animation */}
      <AnimatePresence>
        {isVisible && recentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full right-0 mb-2 bg-white text-orange-600 px-3 py-1 rounded-full shadow-lg whitespace-nowrap font-medium"
          >
            +{recentActivity.points} pts: {recentActivity.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-xl w-64 overflow-hidden"
          >
            <div className="p-3 bg-orange-600 text-white">
              <h3 className="font-bold text-sm">Building Doctor Rewards</h3>
              <p className="text-xs opacity-90">Earn points and unlock rewards!</p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Your Points</span>
                  <span className="font-bold text-orange-600">{points}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000"
                    style={{ width: `${Math.min(points / 3, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {points < 50 
                    ? `${50 - points} more points needed for your next reward!` 
                    : 'You have enough points to claim rewards!'}
                </p>
              </div>
              
              <div className="text-xs text-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = '/rewards';
                  }}
                  className="w-full py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded transition-colors"
                >
                  View Badges & Rewards
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PointsDisplay;