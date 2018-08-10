let i
const locationH2El = document.getElementById('location-text')
const locationButton = document.querySelector("#location")
const peopleDiv = document.getElementById('people')
const numberOneButton = document.getElementById('number-one')
const factsDiv = document.getElementById('rand-fact-1')
const numberForm = document.getElementById('number-form')
const randNumFactsDiv = document.getElementById('rand-facts')
const allNumbersButton = document.getElementById('all-numbers')

document.addEventListener("DOMContentLoaded", function () {
  fetch('http://api.open-notify.org/astros.json')
    .then(response => response.json())
    .then(json => {
      json.people.forEach(person => {
        let a = document.createElement('p')
        a.innerText = `${person.name} - on space craft ${person.craft}`
        peopleDiv.appendChild(a)
      })
    });
  locationButton.addEventListener('click', showlocation)
  numberOneButton.addEventListener('click', numberOneFacts)
  numberForm.addEventListener('submit', numberFacts)
  allNumbersButton.addEventListener('click', oneHundredFacts)
  setYearCounter()
})

function showlocation() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(res => res.json())
    .then(json => {
      i = json
      locationH2El.innerText = `Latitude: ${i.iss_position.latitude}, Longitude: ${i.iss_position.longitude}`
    });
}

function numberOneFacts() {
  fetch('http://numbersapi.com/1/trivia?json')
    .then(res => res.json())
    .then(json => {
      factsDiv.innerHTML += "<p>" + `${json.text}` + "</p>"
    });
}

function numberFacts(event) {
  event.preventDefault()
  let number = document.getElementById('number-input')
  fetch(`http://numbersapi.com/${number.value}/trivia?json`)
    .then(res => res.json())
    .then(json => {
      randNumFactsDiv.innerHTML += "<p>" + `${json.text}` + "</p>"
    });
  number.value = ""
}

function setYearCounter() {
  let year = 2018
  setInterval(function() {
    fetch(`http://numbersapi.com/${year}/year?json`)
      .then(res => res.json())
      .then(json => {
        document.querySelector('#year-fact').innerText = json.text
      });
    year--
  }, 5000)
}

function oneHundredFacts() {
  let x
  for (x = 0; x < 100; x++) {
    fetch(`http://numbersapi.com/random/trivia?json`)
      .then(res => res.json())
      .then(json => {
        document.querySelector('#hundred-facts').innerHTML += "<li>" + `${json.text}` + "</li>"
      });
  }
}
