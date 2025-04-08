import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, ArrowLeft, Check, Lock } from 'lucide-react';
import { useGamification } from '@/components/gamification/GamificationContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'wouter';
import { pageTransition, fadeInUp, staggerContainer } from '@/utils/animations';

const RewardsPage = () => {
  const { 
    points, 
    badges, 
    availableBadges, 
    availableRewards, 
    claimedRewards,
    claimReward 
  } = useGamification();
  
  const [activeTab, setActiveTab] = useState('badges');
  const [claimingReward, setClaimingReward] = useState(null);

  // Get earned badges with their details
  const earnedBadges = badges.map(badgeId => 
    availableBadges.find(badge => badge.id === badgeId)
  ).filter(Boolean);
  
  // Get locked badges
  const lockedBadges = availableBadges.filter(badge => 
    !badges.includes(badge.id)
  );
  
  // Handle reward claim
  const handleClaimReward = (rewardId) => {
    setClaimingReward(rewardId);
    setTimeout(() => {
      const success = claimReward(rewardId);
      if (!success) {
        // Handle failure (not enough points or already claimed)
        console.log("Failed to claim reward");
      }
      setClaimingReward(null);
    }, 1000);
  };

  return (
    <motion.div 
      variants={pageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/">
            <a className="flex items-center text-gray-500 hover:text-orange-600 mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Home</span>
            </a>
          </Link>
        </div>
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Building Doctor Rewards</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Earn points by interacting with our site, completing forms, and referring friends. Unlock badges and rewards!
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Award className="h-6 w-6 text-orange-500 mr-2" />
                Your Points
              </h2>
              <p className="text-gray-600">Keep interacting to earn more!</p>
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg">
              <span className="text-2xl font-bold">{points}</span>
              <span className="ml-1">points</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-1000"
                style={{ width: `${Math.min(points / 3, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="badges" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="badges" className="text-base py-3">
              <Award className="h-5 w-5 mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-base py-3">
              <Gift className="h-5 w-5 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {/* Earned Badges */}
              {earnedBadges.map((badge, index) => (
                <motion.div key={badge.id} variants={fadeInUp} custom={index * 0.1}>
                  <Card className="p-4 h-full border-2 border-green-200 bg-green-50">
                    <div className="flex items-start">
                      <div className="bg-white p-3 rounded-full mr-3">
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center">
                          {badge.name}
                          <Check className="h-4 w-4 text-green-500 ml-1" />
                        </h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              {/* Locked Badges */}
              {lockedBadges.map((badge, index) => (
                <motion.div 
                  key={badge.id} 
                  variants={fadeInUp} 
                  custom={(earnedBadges.length + index) * 0.1}
                >
                  <Card className="p-4 h-full border border-gray-200 bg-gray-50 opacity-70">
                    <div className="flex items-start">
                      <div className="bg-white p-3 rounded-full mr-3 text-gray-400">
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-500 flex items-center">
                          {badge.name}
                          <Lock className="h-4 w-4 text-gray-400 ml-1" />
                        </h3>
                        <p className="text-sm text-gray-500">{badge.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="rewards">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {availableRewards.map((reward, index) => {
                const isClaimed = claimedRewards.includes(reward.id);
                const canAfford = points >= reward.points;
                
                return (
                  <motion.div key={reward.id} variants={fadeInUp} custom={index * 0.1}>
                    <Card className={`p-5 h-full border ${isClaimed ? 'border-green-200 bg-green-50' : (canAfford ? 'border-orange-200 bg-orange-50' : 'border-gray-200')}`}>
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-800">{reward.name}</h3>
                            <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-orange-600 border border-orange-200">
                              {reward.points} pts
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                        
                        <div className="mt-auto">
                          {isClaimed ? (
                            <div className="bg-green-100 text-green-800 p-2 rounded flex items-center justify-center">
                              <Check className="h-4 w-4 mr-1" />
                              <span>Claimed: {reward.code}</span>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleClaimReward(reward.id)}
                              disabled={!canAfford || claimingReward === reward.id}
                              className="w-full"
                              variant={canAfford ? "default" : "outline"}
                            >
                              {claimingReward === reward.id ? (
                                <span>Processing...</span>
                              ) : canAfford ? (
                                <span>Claim Reward</span>
                              ) : (
                                <span>Need {reward.points - points} more points</span>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
          <h3 className="font-bold text-gray-700 mb-2">How to Earn Points</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Submit an inquiry: 10 points</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Complete contact form: 15 points</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>View a product or service: 2 points</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Return to the site: 5 points</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Share content: 5 points</span>
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
              <span>Refer a friend: 20 points</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardsPage;