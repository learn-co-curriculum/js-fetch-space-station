document.addEventListener('DOMContentLoaded', init);
const locationButton = document.querySelector('#locationButton');
const locationDiv = document.querySelector('#locationDiv');
const peopleDiv = document.querySelector('#peopleDiv');
const triviaDiv = document.querySelector('#triviaDiv');
const triviaButton = document.querySelector('#triviaButton')
const triviaInput = document.querySelector('#triviaInput')
const intervalDiv = document.querySelector('#intervalDiv')
const allNumbersDiv = document.querySelector('#allNumbersDiv')
const allNumbersButton = document.querySelector('#allNumbersButton')
const ul = document.createElement('ul');
let year = (new Date()).getFullYear();


function init(){
window.addEventListener('load', fetchPeople);
window.addEventListener('load', interval);
locationButton.addEventListener('click', fetchLocation);
triviaButton.addEventListener('click', fetchTrivia)
allNumbersButton.addEventListener('click', fetchAllNumbers)
}

const fetchLocation = ()=> {
  fetch('http://api.open-notify.org/iss-now.json')
  .then(res => res.json())
  .then(json => {
  locationDiv.innerHTML = `<h3>Latitude: ${json.iss_position['latitude']}</h3>  <h3>Longitude: ${json.iss_position['longitude']}</h3>`;
  });
}

const fetchPeople = () => {
  fetch('http://api.open-notify.org/astros.json')
  .then(res => res.json())
  .then(json =>{
    let people = json.people
    if (people.length >=1) {
      peopleDiv.innerHTML = "<h2>People in space:</h2>"
    }
    people.forEach(person => {
      let li = document.createElement('li');
      li.innerText = person.name;
      peopleDiv.appendChild(ul)
      ul.appendChild(li);
      })
  })
}

const fetchTrivia = () =>{

  fetch(`http://numbersapi.com/${triviaInput.value}/trivia?json`)
  .then(res => res.json())
  .then(json => {
    triviaDiv.innerHTML = `${json.text}`;
  });
}

const interval = ()=>{ setInterval(fetchInterval, 5000) }

const fetchInterval = () =>{
  fetch(`http://numbersapi.com/${year--}/year?json`)
  .then(res => res.json())
  .then(json => {
    triviaDiv.innerHTML = `${json.text}`;
  });
}

const fetchAllNumbers = ()=> {
  for (var i = 0; i < 100; i++) {
    fetch(`http://numbersapi.com/random/trivia?json`)
    .then(res => res.json())
    .then(json => {
      allNumbersDiv.innerHTML += `<p>${json.text} </p>`;
    });
  }
}
