import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// App version - controlled by developer
const APP_VERSION = '2.1.0';


const foodCategories = {
  western: [
    { name: 'Chicken Chop', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Fish and Chips', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Spaghetti Carbonara', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Grilled Lamb', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Caesar Salad', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Steak', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Mushroom Soup', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Chicken Burger', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Lasagna', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'BBQ Ribs', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Beef Burger', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Chicken Wings', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Pork Chop', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Shepherd\'s Pie', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Beef Stew', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Chicken Cordon Bleu', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'French Fries', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Onion Rings', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Garlic Bread', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Clam Chowder', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Lobster Thermidor', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Grilled Salmon', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Chicken Parmesan', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Beef Wellington', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Fish Fillet', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Chicken Sandwich', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Club Sandwich', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Beef Stroganoff', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Chicken Alfredo', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Pepperoni Pizza', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    // Adding more options for ALL YES combination
    { name: 'Spicy Lobster', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Cajun Steak', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Buffalo Wings Platter', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Spicy Wagyu Burger', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Hot Honey Ribs', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    // Adding more options for other combinations
    { name: 'Buffalo Chicken Wings', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Spicy Chicken Burger', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Jalapeño Burger', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Spicy Fish Tacos', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Hot Wings', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    // Adding more light snacks
    { name: 'Cheese Fries', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Mozzarella Sticks', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Chicken Nuggets', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Garden Salad', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Bread Rolls', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    // More expensive light options
    { name: 'Truffle Fries', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Oysters', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Caviar Appetizer', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Foie Gras', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    // More spicy light options
    { name: 'Jalapeño Poppers', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Spicy Wings', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Hot Sauce Fries', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Chili Cheese Nachos', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
  ],
  mamak: [
    { name: 'Roti Canai', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Nasi Kandar', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Maggi Goreng', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Mee Goreng Mamak', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Teh Tarik', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Nasi Lemak', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Ayam Goreng Mamak', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Tosai', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Roti Telur', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Milo Ais', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Roti Bom', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Roti Pisang', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Chapati', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Putu Mayam', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Mee Rebus', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Laksa', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Mee Bandung', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Nasi Briyani', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Kambing Soup', hungry: 'YES', spicy: 'NO', expensive: 'YES' },
    { name: 'Ayam Tandoori', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Roti Jala', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Kuey Teow Goreng', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Murtabak', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Roti Tissue', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Nasi Tomato', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Dalcha', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Rendang Daging', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Kari Ayam', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Kopi O', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Limau Ais', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    // Adding more options for ALL YES combination
    { name: 'Nasi Kandar Special', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Kambing Briyani', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Fish Head Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Mutton Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Beef Rendang Premium', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    // More spicy but cheap options
    { name: 'Mee Curry', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Bee Hoon Goreng Pedas', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Nasi Goreng Cili Padi', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Mee Kolok Pedas', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Rojak Mamak', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    // More light snacks
    { name: 'Vadai', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Idli', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Appam', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Roti Kirai', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Kuih Muih', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    // More expensive light options
    { name: 'Cheese Naan', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Garlic Naan', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Butter Naan', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Kulfi Ice Cream', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    // More spicy light options
    { name: 'Sambal Sotong', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Keropok Lekor Pedas', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Cucur Udang', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Acar Jelatah', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    // Expensive spicy light options
    { name: 'Sambal Prawns', hungry: 'NO', spicy: 'YES', expensive: 'YES' },
    { name: 'Chili Crab Bites', hungry: 'NO', spicy: 'YES', expensive: 'YES' },
  ],
  thai: [
    { name: 'Tom Yum', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Pad Thai', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Green Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Som Tum (Papaya Salad)', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Fried Rice', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Mango Sticky Rice', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Basil Chicken', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Red Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Thai Fish Cake', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Pineapple Fried Rice', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Tom Kha Gai', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Massaman Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Pad See Ew', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Pad Kra Pao', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Spring Rolls', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Larb', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Satay', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Pad Woon Sen', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Beef Salad', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Coconut Soup', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Fish Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Pad Kaprao', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Omelette', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    { name: 'Mango Salad', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Pancake', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Coconut Ice Cream', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Tea', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Pad Prik King', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Steamed Fish', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Khao Pad', hungry: 'YES', spicy: 'NO', expensive: 'NO' },
    // Adding more options for ALL YES combination
    { name: 'Premium Tom Yum Goong', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Lobster Green Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Spicy Beef Rendang Thai Style', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'King Prawn Red Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Thai Chili Crab', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    { name: 'Spicy Duck Curry', hungry: 'YES', spicy: 'YES', expensive: 'YES' },
    // More spicy but cheap options
    { name: 'Thai Spicy Noodles', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Pad Thai Extra Spicy', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Chili Chicken', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Spicy Thai Seafood Soup', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Jungle Curry', hungry: 'YES', spicy: 'YES', expensive: 'NO' },
    // More light snacks
    { name: 'Thai Crackers', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Coconut Pudding', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Fruit Salad', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Rice Crackers', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    { name: 'Thai Jelly', hungry: 'NO', spicy: 'NO', expensive: 'NO' },
    // More expensive light options
    { name: 'Thai Royal Dessert', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Gold Leaf Mango', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Premium Thai Tea', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    { name: 'Durian Ice Cream', hungry: 'NO', spicy: 'NO', expensive: 'YES' },
    // More spicy light options
    { name: 'Spicy Thai Jerky', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Chili Mango', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Thai Chili Nuts', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    { name: 'Som Tam Fruit', hungry: 'NO', spicy: 'YES', expensive: 'NO' },
    // Expensive spicy light options
    { name: 'Spicy Lobster Salad', hungry: 'NO', spicy: 'YES', expensive: 'YES' },
    { name: 'Chili Prawns Appetizer', hungry: 'NO', spicy: 'YES', expensive: 'YES' },
    { name: 'Thai Caviar Spicy', hungry: 'NO', spicy: 'YES', expensive: 'YES' },
  ],
};


function App() {
  const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'about'
  const [step, setStep] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [answers, setAnswers] = useState({ hungry: '', spicy: '', expensive: '' });
  const [hasJiggled, setHasJiggled] = useState(false);
  const [showJigglePopup, setShowJigglePopup] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [currentSuggestion, setCurrentSuggestion] = useState(''); // Store the suggestion

  // Animation state for swipe
  const [swipeStyle, setSwipeStyle] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Device detection
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
  }, []);

  const questions = [
    { key: 'hungry', text: 'Hungry or not?' },
    { key: 'spicy', text: 'Spicy or not?' },
    { key: 'expensive', text: 'Expensive or not?' },
  ];

  const handleRestaurant = (type) => {
    setRestaurant(type);
    setStep(1);
  };

  // Swipe gesture logic
  const questionCardRef = useRef(null);
  
  // Jiggle animation function
  const performJiggle = () => {
    if (!questionCardRef.current) return;
    
    setShowJigglePopup(true);
    setSwipeStyle({
      transform: 'translateX(15px) rotate(2deg)',
      transition: 'transform 0.3s ease'
    });
    setTimeout(() => {
      setSwipeStyle({
        transform: 'translateX(-15px) rotate(-2deg)',
        transition: 'transform 0.3s ease'
      });
      setTimeout(() => {
        setSwipeStyle({
          transform: 'translateX(0px) rotate(0deg)',
          transition: 'transform 0.3s ease'
        });
        setTimeout(() => setSwipeStyle({}), 300);
      }, 300);
    }, 300);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowJigglePopup(false);
    }, 2000);
  };

  // Jiggle animation on first question
  useEffect(() => {
    if (step === 1 && !hasJiggled && questionCardRef.current) {
      setTimeout(() => {
        performJiggle();
        setHasJiggled(true);
      }, 500);
    }
  }, [step, hasJiggled]);

  // Auto-jiggle every 5 seconds if no response
  useEffect(() => {
    if (step > 0 && step <= questions.length) {
      const interval = setInterval(() => {
        if (Date.now() - lastInteraction > 5000) {
          performJiggle();
          setLastInteraction(Date.now());
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [step, lastInteraction]);

  useEffect(() => {
    if (!isMobile.current || !questionCardRef.current || step === 0 || step > questions.length) return;
    let startX = null;
    let currentX = null;
    let handled = false;
    const card = questionCardRef.current;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      handled = false;
      setSwipeStyle({});
      setLastInteraction(Date.now()); // Update interaction time
    };
    const handleTouchMove = (e) => {
      if (startX === null) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      setSwipeStyle({
        transform: `translateX(${diff}px) rotate(${diff/10}deg)`,
        transition: 'none',
      });
    };
    const handleTouchEnd = (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (!handled && Math.abs(diff) > 50) {
        handled = true;
        setIsAnimating(true);
        setSwipeStyle({
          transform: `translateX(${diff > 0 ? 500 : -500}px) rotate(${diff/5}deg)`,
          transition: 'transform 0.3s',
        });
        setTimeout(() => {
          setSwipeStyle({});
          setIsAnimating(false);
          handleAnswer(diff > 0 ? 'YES' : 'NO');
          setLastInteraction(Date.now()); // Update interaction time
        }, 300);
      } else {
        setSwipeStyle({
          transform: 'translateX(0px) rotate(0deg)',
          transition: 'transform 0.2s',
        });
        setTimeout(() => setSwipeStyle({}), 200);
      }
      startX = null;
      currentX = null;
    };
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [step]);

  const handleAnswer = (answer) => {
    const currentKey = questions[step - 1].key;
    const newAnswers = { ...answers, [currentKey]: answer };
    setAnswers(newAnswers);
    
    // If this is the last question, generate the suggestion
    if (step === questions.length) {
      const suggestion = generateSuggestion(newAnswers);
      setCurrentSuggestion(suggestion);
    }
    
    setStep(step + 1);
    setLastInteraction(Date.now()); // Update interaction time
  };

  const generateSuggestion = (currentAnswers) => {
    if (!restaurant) return 'Sila pilih jenis restoran terlebih dahulu.';
    
    const list = foodCategories[restaurant].filter(
      (f) =>
        f.hungry === currentAnswers.hungry &&
        f.spicy === currentAnswers.spicy &&
        f.expensive === currentAnswers.expensive
    );
    
    if (list.length === 0) return 'Tiada cadangan makanan untuk pilihan ini.';
    
    // Pick one random item
    const idx = Math.floor(Math.random() * list.length);
    return list[idx].name;
  };

  const handleRestart = () => {
    setStep(0);
    setRestaurant('');
    setAnswers({ hungry: '', spicy: '', expensive: '' });
    setCurrentSuggestion(''); // Clear the suggestion
  };

  // Feedback functionality
  const sendFeedback = async (feedbackText) => {
    // EmailJS configuration - You can set these up later at emailjs.com
    // For now, we'll use a simple web service
    
    try {
      // Simple feedback submission using FormSubmit (no setup required)
      const formData = new FormData();
      formData.append('feedback', feedbackText);
      formData.append('app_version', APP_VERSION);
      formData.append('timestamp', new Date().toLocaleString());
      formData.append('_subject', `Feedback from Nak Makan Apa v${APP_VERSION}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const response = await fetch('https://formsubmit.co/tfqnet@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Failed to send feedback:', error);
      
      // Fallback: Show a modal with the feedback for user to copy
      const fallbackMessage = `Hi! Here's the feedback that couldn't be sent automatically:

Feedback: ${feedbackText}
App Version: ${APP_VERSION}
Time: ${new Date().toLocaleString()}

Please email this to: tfqnet@gmail.com`;
      
      if (confirm('Unable to send feedback automatically. Would you like to copy the feedback text to send manually?')) {
        navigator.clipboard.writeText(fallbackMessage).then(() => {
          alert('Feedback copied to clipboard! Please paste it in an email to tfqnet@gmail.com');
        }).catch(() => {
          alert(fallbackMessage);
        });
      }
      return false;
    }
  };

  // Get color scheme for each step
  const getStepColors = () => {
    if (step === 0) {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#4c1d95' // Dark purple instead of white
      };
    } else if (step === 1) {
      return {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#ffffff'
      };
    } else if (step === 2) {
      return {
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#ffffff'
      };
    } else if (step === 3) {
      return {
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#ffffff'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#ffffff'
      };
    }
  };

  // About Page Component
  const AboutPage = () => {
    const [feedback, setFeedback] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleFeedbackSubmit = async (e) => {
      e.preventDefault();
      if (!feedback.trim()) return;
      
      setSending(true);
      const success = await sendFeedback(feedback);
      setSending(false);
      
      if (success) {
        setSent(true);
        setFeedback('');
        setTimeout(() => setSent(false), 3000);
      } else {
        alert('Failed to send feedback. Please try again.');
      }
    };

    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px',
        transition: 'background 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#333',
          margin: '20px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <button 
            onClick={() => setCurrentPage('main')}
            style={{
              background: '#667eea',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'white',
              cursor: 'pointer',
              marginBottom: '20px',
              fontSize: '14px'
            }}
          >
            ← Back to App
          </button>

          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#4c1d95' }}>About Nak Makan Apa?</h1>
          
          <div style={{ marginBottom: '30px', lineHeight: '1.6' }}>
            <p><strong>Version:</strong> {APP_VERSION}</p>
            <p><strong>Developer:</strong> Taufiq Tomadan</p>
            
            <h3>What is this app?</h3>
            <p>
              "Nak Makan Apa?" helps you decide what to eat based on your current mood and preferences. 
              Simply answer three questions about how hungry you are, if you want something spicy, 
              and your budget preference. The app will suggest the perfect Malaysian food for you!
            </p>

            <h3>Features:</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li>90+ Malaysian food options across Western, Mamak, and Thai categories</li>
              <li>Smart recommendation system based on your preferences</li>
              <li>Mobile-friendly swipe gestures (swipe right for yes, left for no)</li>
              <li>Progressive Web App (PWA) - install it on your phone!</li>
              <li>Offline support</li>
            </ul>

            <h3>How to use:</h3>
            <ol style={{ paddingLeft: '20px' }}>
              <li>Choose your preferred restaurant type</li>
              <li>Answer three simple questions about your preferences</li>
              <li>Get your personalized food recommendation!</li>
            </ol>
          </div>

          <div style={{
            background: 'rgba(103, 126, 234, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid rgba(103, 126, 234, 0.2)'
          }}>
            <h3 style={{ color: '#4c1d95', marginTop: 0 }}>Send Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or report issues..."
                style={{
                  width: '100%',
                  height: '100px',
                  borderRadius: '10px',
                  border: 'none',
                  padding: '15px',
                  resize: 'vertical',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={sending || !feedback.trim()}
                  style={{
                    background: sending ? '#ccc' : '#4facfe',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 25px',
                    marginTop: '10px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {sending ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
              {sent && (
                <p style={{ color: '#4ade80', marginTop: '10px', textAlign: 'center' }}>
                  ✅ Feedback sent successfully! Thank you!
                </p>
              )}
            </form>
          </div>

          <div style={{ textAlign: 'center', opacity: 0.8, fontSize: '14px' }}>
            <p>Made with ❤️ for Malaysian food lovers</p>
          </div>
        </div>
      </div>
    );
  };

  const colors = getStepColors();

  return (
    <>
      {currentPage === 'about' ? (
        <AboutPage />
      ) : (
    <div style={{ 
      background: colors.background, 
      minHeight: '100vh', 
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      padding: '20px',
      transition: 'background 0.5s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto'
    }}>
      <div 
        className="app-container"
        ref={questionCardRef}
        style={{
          ...(isMobile.current ? swipeStyle : {}),
          background: colors.cardBg,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
        }}
      >
        {step === 0 && <h1 style={{ color: colors.titleColor }}>Nak Makan Apa?</h1>}
        {step === 0 && (
          <>
            <h2>Pilih jenis restoran:</h2>
            <div className="options" style={{flexDirection: 'column', gap: '1rem'}}>
              <button onClick={() => handleRestaurant('western')}>Western Food</button>
              <button onClick={() => handleRestaurant('mamak')}>Mamak</button>
              <button onClick={() => handleRestaurant('thai')}>Thai Food</button>
            </div>
            <button 
              onClick={() => setCurrentPage('about')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                padding: '8px 16px',
                color: colors.titleColor,
                cursor: 'pointer',
                marginTop: '20px',
                fontSize: '14px'
              }}
            >
              ℹ️ About & Feedback
            </button>
          </>
        )}
        {step > 0 && step <= questions.length && (
          <>
            {/* Jiggle instruction popup */}
            {showJigglePopup && isMobile.current && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center',
                zIndex: 1000,
                animation: 'fadeInOut 2s ease',
                pointerEvents: 'none'
              }}>
                👈 No<br/>
                👉 Yes
              </div>
            )}
            <h2>{questions[step - 1].text}</h2>
            {!isMobile.current && (
              <div className="options">
                <button onClick={() => handleAnswer('YES')}>YES</button>
                <button onClick={() => handleAnswer('NO')}>NO</button>
              </div>
            )}
          </>
        )}
        {step > questions.length && (
          <>
            <h2>Cadangan makanan untuk anda:</h2>
            <p className="suggestion">{currentSuggestion}</p>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
              <button onClick={handleRestart}>Cuba lagi</button>
            </div>
          </>
        )}
      </div>
    </div>
      )}
    </>
  );
}
export default App;
