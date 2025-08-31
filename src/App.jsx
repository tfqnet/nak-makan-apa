
import React, { useState } from 'react';
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

  const questions = [
    { key: 'hungry', text: 'Hungry or not?' },
    { key: 'spicy', text: 'Spicy or not?' },
    { key: 'expensive', text: 'Expensive or not?' },
  ];

  const handleRestaurant = (type) => {
    setRestaurant(type);
    setStep(1);
  };

  const handleAnswer = (answer) => {
    const currentKey = questions[step - 1].key;
    setAnswers((prev) => ({ ...prev, [currentKey]: answer }));
    setStep(step + 1);
  };

  const getSuggestions = () => {
    if (!restaurant) return [];
    const list = foodCategories[restaurant].filter(
      (f) =>
        f.hungry === answers.hungry &&
        f.spicy === answers.spicy &&
        f.expensive === answers.expensive
    );
    // Shuffle and pick up to 3 random items
    const shuffled = list.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleRestart = () => {
    setStep(0);
    setRestaurant('');
    setAnswers({ hungry: '', spicy: '', expensive: '' });
  };

  return (
    <div className="app-container">
      <h1>Nak Makan Apa?</h1>
      {step === 0 && (
        <div className="question-card">
          <h2>Pilih jenis restoran:</h2>
          <div className="options">
            <button onClick={() => handleRestaurant('western')}>Western Food</button>
            <button onClick={() => handleRestaurant('mamak')}>Mamak</button>
            <button onClick={() => handleRestaurant('thai')}>Thai Food</button>
          </div>
        </div>
      )}
      {step > 0 && step <= questions.length && (
        <div className="question-card">
          <h2>{questions[step - 1].text}</h2>
          <div className="options">
            <button onClick={() => handleAnswer('YES')}>YES</button>
            <button onClick={() => handleAnswer('NO')}>NO</button>
          </div>
        </div>
      )}
      {step > questions.length && (
        <div className="result-card">
          <h2>Cadangan makanan untuk anda:</h2>
          {getSuggestions().length > 0 ? (
            <ul style={{textAlign: 'left', margin: '1em auto', maxWidth: '300px'}}>
              {getSuggestions().map((item, idx) => (
                <li key={idx} className="suggestion">{item.name}</li>
              ))}
            </ul>
          ) : (
            <p className="suggestion">Tiada cadangan makanan untuk pilihan ini.</p>
          )}
          <button onClick={handleRestart}>Cuba lagi</button>
        </div>
      )}
    </div>
  );
}

export default App;
