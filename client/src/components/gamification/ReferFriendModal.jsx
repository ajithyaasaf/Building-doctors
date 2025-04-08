import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, CheckCircle, Mail, MessageSquare } from 'lucide-react';
import { useGamification } from './GamificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ReferFriendModal = ({ isOpen, onClose }) => {
  const { trackAction } = useGamification();
  const [copied, setCopied] = useState(false);
  const [referralSent, setReferralSent] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const referralLink = `${window.location.origin}?ref=${Math.random().toString(36).substring(2, 8)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send an email
    setReferralSent(true);
    trackAction('REFER_FRIEND');
    setTimeout(() => {
      setReferralSent(false);
      setEmail('');
      setName('');
      setMessage('');
      onClose();
    }, 2000);
  };

  const handleShare = async (platform) => {
    // Track the action
    trackAction('SHARE_CONTENT');
    
    // Create share data
    const shareData = {
      title: 'Building Doctor - Professional Building Repair Services',
      text: 'Check out Building Doctor for all your building repair and maintenance needs!',
      url: referralLink,
    };

    // Share based on platform
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
    } else if (platform === 'native') {
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        }
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-white font-bold text-lg flex items-center">
                <Share2 className="mr-2 h-5 w-5" />
                Refer a Friend
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              {referralSent ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Referral Sent!</h3>
                  <p className="text-gray-600">
                    Thanks for spreading the word about Building Doctor.
                    <br />
                    You've earned 20 points!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Share your referral link</h3>
                    <div className="flex items-center">
                      <Input
                        value={referralLink}
                        readOnly
                        className="bg-gray-50 border mr-2"
                      />
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-gray-700 mb-3">Share via</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg flex flex-col items-center text-xs"
                      >
                        <MessageSquare className="h-5 w-5 mb-1" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg flex flex-col items-center text-xs"
                      >
                        <span className="font-bold text-lg leading-none mb-1">f</span>
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg flex flex-col items-center text-xs"
                      >
                        <span className="font-bold text-lg leading-none mb-1">𝕏</span>
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('native')}
                        className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg flex flex-col items-center text-xs"
                      >
                        <Share2 className="h-5 w-5 mb-1" />
                        More
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Invite via email</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="friend-name" className="text-sm">Friend's Name</Label>
                        <Input
                          id="friend-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="friend-email" className="text-sm">Friend's Email</Label>
                        <Input
                          id="friend-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="friend@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-sm">Personal Message (Optional)</Label>
                        <Input
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Check this out!"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invitation
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReferFriendModal;