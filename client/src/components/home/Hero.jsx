import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Hammer, 
  Droplets, 
  Shield, 
  ArrowRight, 
  Check, 
  Star, 
  Zap,
  ArrowRight as ArrowRightIcon,
  Play,
  CheckCircle2
} from "lucide-react";
import thermalImage from "../../assets/thermal.png";
import sealantsImage from "../../assets/sealants.png";
import img1 from "../../assets/img1.png";
import tileAidsImage from "../../assets/Tile-Aids.png";

const ProblemIndicator = ({ currentProblem, buildingProblems }) => {
  return (
    <div className="absolute top-4 left-4 z-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProblem}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="bg-red-100 border border-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse"
        >
          Problem Detected: {buildingProblems[currentProblem].problem}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const buildingProblems = [
    {
      problem: "Leaking Roofs",
      solution: "Advanced Waterproofing",
      icon: (
        <Droplets className="h-6 w-6 text-white group-hover:text-black transition-colors" />
      ),
    },
    {
      problem: "Wall Cracks",
      solution: "Structural Reinforcement",
      icon: (
        <Hammer className="h-6 w-6 text-white group-hover:text-black transition-colors" />
      ),
    },
    {
      problem: "Seepage Issues",
      solution: "Chemical Treatment",
      icon: (
        <Shield className="h-6 w-6 text-white group-hover:text-black transition-colors" />
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % buildingProblems.length);
      setShowDiagnosis(false);
      setTimeout(() => setShowDiagnosis(true), 800);
    }, 4000);

    setTimeout(() => setShowDiagnosis(true), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="pt-20 overflow-hidden bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70 min-h-[90vh] flex items-center relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://buildingdoctor.org/assets/images/texture-pattern.png')] opacity-5 mix-blend-overlay"></div>
        <motion.div 
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            rotate: [0, 10, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, -10, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 pt-4 pb-16 md:pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side content */}
          <div className="lg:col-span-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/10"
            >
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-50">Madurai's Most Trusted Building Experts</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8"
            >
              Transform Your 
              <br className="hidden md:block" />
              Building With Expert 
              <span className="relative text-yellow-300 ml-2">
                Care
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 385 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C116.62 4.46 243.652 2.99999 382 9" stroke="#FCD34D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              We diagnose and treat all building ailments with precision. From
              waterproofing to structural repairs, our experts provide
              long-lasting solutions with 10+ years of experience.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-4 mb-10"
            >
              {[
                "Complete Building Diagnostics",
                "Advanced Waterproofing Solutions",
                "Guaranteed Leak-Free Results",
              ].map((feature, i) => (
                <div key={i} className="flex items-center group">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 text-yellow-400">
                    <CheckCircle2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-white/90 font-medium">{feature}</p>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/services">
                <span className="relative inline-flex group/btn">
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-full transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
                  <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium transition shadow-lg">
                    Book A Diagnosis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all cursor-pointer">
                  View Solutions
                  <Play className="ml-2 w-4 h-4 fill-current" />
                </span>
              </Link>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex items-center justify-between max-w-md"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[thermalImage, img1, sealantsImage].map((img, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src={img} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-xs text-white/70">Trusted by</p>
                  <p className="text-sm font-semibold text-white">2,000+ Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <div className="text-yellow-300 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-1 text-sm font-medium text-white">4.9/5</span>
              </div>
            </motion.div>
          </div>

          {/* Right side image collage */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              {/* Main image with fancy border */}
              <div className="relative z-20 overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10 bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-sm">
                <img
                  src={img1}
                  alt="Building Doctor Professional"
                  className="w-full object-cover h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Pulsing dots for problem indicators */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProblem}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                    style={{
                      top: currentProblem === 0 ? "25%" : currentProblem === 1 ? "40%" : "60%",
                      left: currentProblem === 0 ? "70%" : currentProblem === 1 ? "30%" : "55%",
                    }}
                  >
                    <div className="relative">
                      <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center animate-pulse"></div>
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
                      <div className="absolute -right-40 top-0 bg-black/70 text-white text-xs rounded-lg px-3 py-2 min-w-[150px]">
                        <div className="font-bold text-red-400">{buildingProblems[currentProblem].problem}</div>
                        <div className="text-green-400 text-xs mt-1">
                          <ArrowRight className="inline w-3 h-3 mr-1" />
                          {buildingProblems[currentProblem].solution}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Image overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <Zap className="text-yellow-400 w-5 h-5 mr-2" />
                        <p className="font-medium">Expert Diagnosis</p>
                      </div>
                      <h3 className="text-2xl font-bold">Building Doctor</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <p className="text-xs font-medium">Since 2010</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating smaller images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-10 -left-10 z-10 w-36 h-36 rounded-xl overflow-hidden border-4 border-white/10 shadow-lg"
              >
                <img src={thermalImage} alt="Thermal Solution" className="w-full h-full object-cover" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-10 -right-10 z-10 w-40 h-40 rounded-xl overflow-hidden border-4 border-white/10 shadow-lg"
              >
                <img src={sealantsImage} alt="Sealant Solution" className="w-full h-full object-cover" />
              </motion.div>
              
              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-5 right-20 z-30 bg-primary text-white px-5 py-3 rounded-full shadow-lg flex items-center"
              >
                <span className="text-xl font-bold mr-1">10+</span>
                <span className="text-sm font-medium">Years Experience</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
