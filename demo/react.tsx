import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import DualRangeInputComponent from '../lib/react.tsx';

const $app = document.querySelector('.react-app') as HTMLDivElement;
$app.classList.add('demo');

const root = createRoot($app);

const App = () => {
  const [min, setMin] = useState<number>(10);
  const [max, setMax] = useState<number>(25);

  return (
    <div className="demo demo--react">
      <DualRangeInputComponent thumbWidth="1.25rem">
        <input
          type="range"
          min="0"
          max="50"
          value={min}
          onChange={(e) => setMin(parseFloat(e.target.value))}
        />
        <input
          type="range"
          min="0"
          max="50"
          value={max}
          onChange={(e) => setMax(parseFloat(e.target.value))}
        />
      </DualRangeInputComponent>

      <pre className="values">
        <span>{min}</span>
        <span>
          {min} - {max}
        </span>
        <span>{max}</span>
      </pre>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
