import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Shield, Award, Medal, Trophy, Star, Gift } from 'lucide-react';

// Define gamification rules and achievements
const ACTIONS = {
  SUBMIT_INQUIRY: { points: 10, label: 'Submit an inquiry' },
  SUBMIT_CONTACT: { points: 15, label: 'Complete contact form' },
  VIEW_PRODUCT: { points: 2, label: 'View a product' },
  VIEW_SERVICE: { points: 2, label: 'View a service' },
  VISIT_PAGE: { points: 1, label: 'Visit a page' },
  SHARE_CONTENT: { points: 5, label: 'Share content' },
  REFER_FRIEND: { points: 20, label: 'Refer a friend' },
  RETURN_VISIT: { points: 5, label: 'Return to the site' },
};

const BADGES = [
  {
    id: 'new-visitor',
    name: 'New Visitor',
    description: 'Welcome to Building Doctor! You\'ve taken the first step to a better building.',
    icon: <Shield className="h-5 w-5 text-blue-500" />,
    requirement: { type: 'visit', count: 1 },
  },
  {
    id: 'inquirer',
    name: 'Inquirer',
    description: 'You\'ve submitted your first inquiry. We\'re excited to help!',
    icon: <Award className="h-5 w-5 text-green-500" />,
    requirement: { type: 'action', action: 'SUBMIT_INQUIRY', count: 1 },
  },
  {
    id: 'active-explorer',
    name: 'Active Explorer',
    description: 'You\'ve explored multiple services we offer!',
    icon: <Medal className="h-5 w-5 text-purple-500" />,
    requirement: { type: 'action', action: 'VIEW_SERVICE', count: 3 },
  },
  {
    id: 'engaged-client',
    name: 'Engaged Client',
    description: 'Your active participation helps us serve you better!',
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    requirement: { type: 'points', points: 50 },
  },
  {
    id: 'loyal-customer',
    name: 'Loyal Customer',
    description: 'Your continued support means the world to us!',
    icon: <Star className="h-5 w-5 text-orange-500" />,
    requirement: { type: 'visit', count: 5 },
  },
  {
    id: 'building-advocate',
    name: 'Building Advocate',
    description: 'You\'re helping spread the word about building care!',
    icon: <Gift className="h-5 w-5 text-red-500" />,
    requirement: { type: 'action', action: 'REFER_FRIEND', count: 1 },
  },
];

const REWARDS = [
  {
    id: 'discount-5',
    name: '5% Discount',
    description: 'Get 5% off your next service',
    points: 50,
    code: 'BUILD5',
  },
  {
    id: 'free-inspection',
    name: 'Free Inspection',
    description: 'Redeem a free building inspection',
    points: 100,
    code: 'INSPECT',
  },
  {
    id: 'priority-service',
    name: 'Priority Service',
    description: 'Get priority scheduling for your next service',
    points: 150,
    code: 'PRIORITY',
  },
  {
    id: 'discount-10',
    name: '10% Discount',
    description: 'Get 10% off your next service',
    points: 200,
    code: 'BUILD10',
  },
  {
    id: 'maintenance-package',
    name: 'Free Maintenance Package',
    description: 'Redeem a free basic maintenance package',
    points: 300,
    code: 'MAINTAIN',
  },
];

// Create context
const GamificationContext = createContext();

// Custom hook to use the gamification context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Provider component
export const GamificationProvider = ({ children }) => {
  // State
  const [points, setPoints] = useState(0);
  const [actions, setActions] = useState({});
  const [badges, setBadges] = useState([]);
  const [visits, setVisits] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [recentActivity, setRecentActivity] = useState(null);
  const [claimedRewards, setClaimedRewards] = useState([]);

  // Check for badges based on actions and points
  const checkForBadges = (currentActions) => {
    BADGES.forEach(badge => {
      // Skip if already awarded
      if (badges.includes(badge.id)) return;
      
      // Check requirement
      if (badge.requirement.type === 'action') {
        const actionCount = currentActions[badge.requirement.action] || 0;
        if (actionCount >= badge.requirement.count) {
          awardBadge(badge.id);
        }
      } else if (badge.requirement.type === 'points') {
        if (points >= badge.requirement.points) {
          awardBadge(badge.id);
        }
      } else if (badge.requirement.type === 'visit') {
        if (visits >= badge.requirement.count) {
          awardBadge(badge.id);
        }
      }
    });
  };

  // Award a specific badge
  const awardBadge = (badgeId) => {
    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge) return;
    
    // Check if badge already awarded
    if (badges.includes(badgeId)) return;
    
    // Award badge
    setBadges(prev => [...prev, badgeId]);
    
    // Show toast notification
    toast({
      title: `New Badge: ${badge.name}`,
      description: badge.description,
      icon: badge.icon,
      variant: 'success',
      duration: 5000
    });
  };

  // Track an action and award points
  const trackAction = (actionType) => {
    if (!ACTIONS[actionType]) return;
    
    // Update actions count
    const updatedActions = { ...actions };
    updatedActions[actionType] = (updatedActions[actionType] || 0) + 1;
    setActions(updatedActions);
    
    // Award points
    const pointsToAdd = ACTIONS[actionType].points;
    setPoints(prev => prev + pointsToAdd);
    
    // Set recent activity for animation
    setRecentActivity({
      type: actionType,
      points: pointsToAdd,
      label: ACTIONS[actionType].label,
      timestamp: Date.now()
    });
    
    // Show the points animation
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
    
    // Check for badge achievements
    checkForBadges(updatedActions);
  };

  // Claim a reward
  const claimReward = (rewardId) => {
    const reward = REWARDS.find(r => r.id === rewardId);
    if (!reward) return false;
    
    // Check if enough points
    if (points < reward.points) return false;
    
    // Check if already claimed
    if (claimedRewards.includes(rewardId)) return false;
    
    // Deduct points
    setPoints(prev => prev - reward.points);
    
    // Mark as claimed
    setClaimedRewards(prev => [...prev, rewardId]);
    
    // Show toast notification
    toast({
      title: `Reward Claimed: ${reward.name}`,
      description: `${reward.description}. Use code: ${reward.code}`,
      variant: 'success',
      duration: 5000
    });
    
    return true;
  };

  // Load state from localStorage
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('buildingDoctor_gamification');
      if (storedData) {
        const data = JSON.parse(storedData);
        setPoints(data.points || 0);
        setActions(data.actions || {});
        setBadges(data.badges || []);
        setVisits(data.visits || 0);
        setClaimedRewards(data.claimedRewards || []);
        
        // Count this as a return visit if last visit was more than 1 hour ago
        const lastVisit = data.lastVisit || 0;
        const now = Date.now();
        if (now - lastVisit > 3600000) { // 1 hour in milliseconds
          // Handle return visit
          const updatedActions = { ...data.actions };
          updatedActions['RETURN_VISIT'] = (updatedActions['RETURN_VISIT'] || 0) + 1;
          setActions(updatedActions);
          setPoints(prev => prev + ACTIONS['RETURN_VISIT'].points);
          setRecentActivity({
            type: 'RETURN_VISIT',
            points: ACTIONS['RETURN_VISIT'].points,
            label: ACTIONS['RETURN_VISIT'].label,
            timestamp: Date.now()
          });
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 3000);
        }
      } else {
        // First time visitor - set flag to handle after initial render
        setTimeout(() => {
          // Give points for first visit
          setPoints(prev => prev + ACTIONS['VISIT_PAGE'].points);
          const newActions = { 'VISIT_PAGE': 1 };
          setActions(newActions);
          setRecentActivity({
            type: 'VISIT_PAGE',
            points: ACTIONS['VISIT_PAGE'].points,
            label: ACTIONS['VISIT_PAGE'].label,
            timestamp: Date.now()
          });
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 3000);
          
          // Award first badge
          const newBadge = 'new-visitor';
          const badge = BADGES.find(b => b.id === newBadge);
          setBadges([newBadge]);
          toast({
            title: `New Badge: ${badge.name}`,
            description: badge.description,
            icon: badge.icon,
            variant: 'success',
            duration: 5000
          });
        }, 1000);
      }
      
      // Update visits counter
      setVisits(prev => prev + 1);
    } catch (error) {
      console.error('Error loading gamification data:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const data = {
        points,
        actions,
        badges,
        visits,
        lastVisit: Date.now(),
        claimedRewards
      };
      localStorage.setItem('buildingDoctor_gamification', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving gamification data:', error);
    }
  }, [points, actions, badges, visits, claimedRewards]);

  const value = {
    points,
    actions,
    badges,
    visits,
    availableBadges: BADGES,
    availableRewards: REWARDS,
    claimedRewards,
    recentActivity,
    isVisible,
    trackAction,
    awardBadge,
    claimReward
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};