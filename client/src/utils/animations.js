/**
 * Animation utilities for Framer Motion
 */

// Fade in animation variant
export const fadeIn = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeInOut"
    }
  }
});

// Fade in upward animation variant
export const fadeInUp = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in downward animation variant
export const fadeInDown = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in from left animation variant
export const fadeInLeft = (delay = 0, duration = 0.7) => ({
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in from right animation variant
export const fadeInRight = (delay = 0, duration = 0.7) => ({
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Zoom in animation variant
export const zoomIn = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Staggered children animation
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Bounce animation
export const bounce = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: 0 },
  visible: { 
    opacity: 1,
    y: [0, -15, 0],
    transition: {
      delay,
      duration,
      times: [0, 0.6, 1],
      ease: "easeOut"
    }
  }
});

// Rotate in animation
export const rotateIn = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0, rotate: -15 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Pulse animation for WhatsApp button
export const pulse = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: [1, 1.2, 1],
    opacity: [0.7, 0.5, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Page transition animation for App.jsx
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};