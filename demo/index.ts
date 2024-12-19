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

  new DualRangeInput($min, $max);

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
