
import React, { useState } from 'react';
import './App.css';

const foodSuggestions = [
  {
    hungry: 'YES', spicy: 'YES', expensive: 'YES', food: 'Nasi Lemak Lobster'
  },
  {
    hungry: 'YES', spicy: 'YES', expensive: 'NO', food: 'Nasi Lemak Ayam Berempah'
  },
  {
    hungry: 'YES', spicy: 'NO', expensive: 'YES', food: 'Ikan Bakar Pari Premium'
  },
  {
    hungry: 'YES', spicy: 'NO', expensive: 'NO', food: 'Nasi Goreng Kampung'
  },
  {
    hungry: 'NO', spicy: 'YES', expensive: 'YES', food: 'Laksa Johor Special'
  },
  {
    hungry: 'NO', spicy: 'YES', expensive: 'NO', food: 'Mee Kari'
  },
  {
    hungry: 'NO', spicy: 'NO', expensive: 'YES', food: 'Roti Canai Cheese'
  },
  {
    hungry: 'NO', spicy: 'NO', expensive: 'NO', food: 'Kuih Seri Muka'
  },
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ hungry: '', spicy: '', expensive: '' });

  const questions = [
    { key: 'hungry', text: 'Hungry or not?' },
    { key: 'spicy', text: 'Spicy or not?' },
    { key: 'expensive', text: 'Expensive or not?' },
  ];

  const handleAnswer = (answer) => {
    const currentKey = questions[step].key;
    setAnswers((prev) => ({ ...prev, [currentKey]: answer }));
    setStep(step + 1);
  };

  const getSuggestion = () => {
    const found = foodSuggestions.find(
      (f) =>
        f.hungry === answers.hungry &&
        f.spicy === answers.spicy &&
        f.expensive === answers.expensive
    );
    return found ? found.food : 'Try Teh Tarik!';
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({ hungry: '', spicy: '', expensive: '' });
  };

  // PWA install prompt logic
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  // Listen for PWA install event
  React.useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    });
  }, []);

  const handlePWAInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      setShowInstall(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Nak Makan Apa?</h1>
      {step < questions.length ? (
        <div className="question-card">
          <h2>{questions[step].text}</h2>
          <div className="options">
            <button onClick={() => handleAnswer('YES')}>YES</button>
            <button onClick={() => handleAnswer('NO')}>NO</button>
          </div>
        </div>
      ) : (
        <div className="result-card">
          <h2>Cadangan makanan untuk anda:</h2>
          <p className="suggestion">{getSuggestion()}</p>
          <button onClick={handleRestart}>Cuba lagi</button>
        </div>
      )}
    </div>
  );
}

export default App;
