document.addEventListener('DOMContentLoaded', run);

let fetchYear = (new Date()).getFullYear();
let selectedNumber = 1;

function historyFactInterval() {
  setInterval(fetchHistoryFact, 5000);
}

function fetchHistoryFact() {
  fetch(`http://numbersapi.com/${fetchYear}/year`)
    .then(r => r.text())
    .then(text => renderHistoryFact(text))
  fetchYear--
}

function fetchNumberFact() {
  if (!!selectedNumber) {
    fetch(`http://numbersapi.com/${selectedNumber}`)
      .then(r => r.text())
      .then(text => {
        if (selectedNumber === 1) {
          renderOneFact(text);
        } else {
          renderNumberFact(text);
        }
      })
  }
}

function fetchAllNumberFact() {
  fetch(`http://numbersapi.com/${selectedNumber}`)
    .then(r => r.text())
    .then(text => {
      renderAllNumFact(text);
    })
}

function renderHistoryFact(text) {
  const historyFactDiv = document.getElementById('history-fact-container');
  const historyFact = document.createElement('p');

  historyFactDiv.innerHTML = '';
  historyFact.innerText = text;

  historyFactDiv.appendChild(historyFact);
}

function renderOneFact(text) {
  const oneFactDiv = document.getElementById('one-fact-container');
  const oneFact = document.createElement('p');

  oneFactDiv.innerHTML = '';
  oneFact.innerText = text;

  oneFactDiv.appendChild(oneFact);
}

function renderNumberFact(text) {
  const numFactDiv = document.getElementById('num-fact-container');
  const numFact = document.createElement('p');

  numFactDiv.innerHTML = '';
  numFact.innerText = text;

  numFactDiv.appendChild(numFact);
}

function renderAllNumFact(text) {
  const allNumFactDiv = document.getElementById('all-num-fact-container');
  const allNumFact = document.createElement('p');

  allNumFact.innerText = text;

  allNumFactDiv.appendChild(allNumFact);
}

function oneButtonHandler() {
  const oneButton = document.getElementById('one-fact-button');
  oneButton.addEventListener('click', () => {
    selectedNumber = 1;
    fetchNumberFact();
  });
}

function numSelectHandler() {
  const numInput = document.getElementById('num-input');
  numInput.addEventListener('keyup', () => {
    selectedNumber = numInput.value;
    fetchNumberFact();
  })
}

function allNumHandler() {
  const allNumButton = document.getElementById('all-num-button');
  allNumButton.addEventListener('click', () => {
    const nums = selectNumbers();
    const allNumFactDiv = document.getElementById('all-num-fact-container');

    allNumFactDiv.innerHTML = '';

    nums.forEach(n => {
      selectedNumber = n;
      fetchAllNumberFact();
    })
  })
}

function selectNumbers() {
  let allNumbers = [];
  let i = 0;

  while(i < 100) {
    allNumbers.push(Math.round(Math.random() * (99999) + 1))
    i++;
  }
  return allNumbers;
}

function run() {
  historyFactInterval();
  oneButtonHandler();
  numSelectHandler();
  allNumHandler();
}
