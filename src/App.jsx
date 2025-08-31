import React, { useState, useRef, useEffect } from 'react';
import './App.css';


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
  ],
};


function App() {
  const [step, setStep] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [answers, setAnswers] = useState({ hungry: '', spicy: '', expensive: '' });
  const [showGuide, setShowGuide] = useState(() => {
    return !localStorage.getItem('swipeGuideSeen');
  });

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
    setAnswers((prev) => ({ ...prev, [currentKey]: answer }));
    setStep(step + 1);
  };

  const getSuggestion = () => {
    if (!restaurant) return null;
    const list = foodCategories[restaurant].filter(
      (f) =>
        f.hungry === answers.hungry &&
        f.spicy === answers.spicy &&
        f.expensive === answers.expensive
    );
    if (list.length === 0) return null;
    // Pick one random item
    const idx = Math.floor(Math.random() * list.length);
    return list[idx].name;
  };

  const handleRestart = () => {
    setStep(0);
    setRestaurant('');
    setAnswers({ hungry: '', spicy: '', expensive: '' });
  };

  // Get color scheme for each step
  const getStepColors = () => {
    if (step === 0) {
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#ffffff'
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

  const colors = getStepColors();

  return (
    <div style={{ 
      background: colors.background, 
      minHeight: '100vh', 
      padding: '20px',
      transition: 'background 0.5s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div 
        className="app-container"
        ref={questionCardRef}
        style={{
          ...(isMobile.current ? swipeStyle : {}),
          background: colors.cardBg,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {step === 0 && <h1 style={{ color: colors.titleColor }}>Nak Makan Apa?</h1>}
        {showGuide && (
          <div className="splash-guide" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2em',
            borderRadius: '16px',
            marginBottom: '1.5em',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <h2>Tip: Swipe untuk Pilihan</h2>
            <p>Di telefon, anda boleh swipe kanan untuk YES, swipe kiri untuk NO.<br/>Di desktop, klik butang seperti biasa.</p>
            <button onClick={() => { setShowGuide(false); localStorage.setItem('swipeGuideSeen', '1'); }}>OK, faham!</button>
          </div>
        )}
        {step === 0 && (
          <>
            <h2>Pilih jenis restoran:</h2>
            <div className="options" style={{flexDirection: 'column', gap: '1rem'}}>
              <button onClick={() => handleRestaurant('western')}>Western Food</button>
              <button onClick={() => handleRestaurant('mamak')}>Mamak</button>
              <button onClick={() => handleRestaurant('thai')}>Thai Food</button>
            </div>
          </>
        )}
        {step > 0 && step <= questions.length && (
          <>
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
            {getSuggestion() ? (
              <p className="suggestion">{getSuggestion()}</p>
            ) : (
              <p className="suggestion">Tiada cadangan makanan untuk pilihan ini.</p>
            )}
            <button onClick={handleRestart}>Cuba lagi</button>
          </>
        )}
      </div>
    </div>
  );
}
export default App;
