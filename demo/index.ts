import DualRangeInput from '../lib/index.ts';

const datalist = document.querySelector('#tickmarks') as HTMLDataListElement;

for (let i = 0; i <= 100; i++) {
  const option = document.createElement('option');
  option.value = i.toString();
  datalist.appendChild(option);
}

const $demos = document.querySelectorAll('.demo') as NodeListOf<HTMLDivElement>;

$demos.forEach(($demo) => {
  const $min = $demo.querySelector('input:first-child') as HTMLInputElement;
  const $max = $demo.querySelector('input:last-child') as HTMLInputElement;

  const addValues = () => {
    ($demo.querySelector('.values') as HTMLDivElement).innerHTML = `
    <span>${$min.min}</span>
    <span>${$min.value} - ${$max.value}</span>
    <span>${$max.max}</span>`;
  };

  $min.addEventListener('input', addValues);
  $max.addEventListener('input', addValues);

  new DualRangeInput($min, $max, $demo.dataset.thumbWidth || '');

  addValues();
});

const setClassFromHash = () => {
  const hash = location.hash.slice(1);
  document.body.className = hash;
};

window.addEventListener('hashchange', setClassFromHash);
setClassFromHash();

const toggleDebug = document.querySelector(
  '.toggle-debug'
) as HTMLButtonElement;

toggleDebug.addEventListener('click', () => {
  window.location.hash = window.location.hash ? '' : '#debug';
});

// React version is WIP

// import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';

// import DualRangeInputComponent, { DualRangeValues } from '../lib/index.tsx';

// const $app = document.querySelector('.react-app') as HTMLDivElement;
// $app.classList.add('demo');

// const root = createRoot($app);

// const App = () => {
//   const [values, setValues] = useState<DualRangeValues>([20, 30]);

//   return (
//     <div>
//       <DualRangeInputComponent
//         onChange={() => {}}
//         onInput={(values) => setValues(values)}
//         min={20}
//         max={30}
//         step={0.1}
//         values={values}
//       />
//       <pre className="values">
//         <span>0</span>
//         <span>
//           {values[0]} - {values[1]}
//         </span>
//         <span>30</span>
//       </pre>
//     </div>
//   );
// };

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
