let spaceButton = document.getElementById('sbutton')
let locationLatitude = document.getElementById('latitude')
let locationLongitude = document.getElementById('longitude')
let funButton = document.getElementById('1button')
let funFact = document.getElementById('numberOne')
let inputField = document.getElementById('input')
let inputSubmitButton = document.getElementById('submit')
let randomFact = document.getElementById('rando')
let hundredFacts = document.getElementById('buttonHundred')
let number = 2018

const codes = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

document.addEventListener('DOMContentLoaded', function() {
  peopleInSpace()
  konami()
  // everyFiveSeconds()
  // intervalFact()
  inputSubmitButton.addEventListener('click', numInput)
  spaceButton.addEventListener('click', getLocation)
  funButton.addEventListener('click', getNumber1)
  buttonHundred.addEventListener('click', allFacts)
})
// -----------ISS Information-------------

function getLocation() {
  fetch(`http://api.open-notify.org/iss-now.json`)
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData
    locationLongitude.innerText = data.iss_position.longitude
    locationLatitude.innerText = data.iss_position.latitude
  })
}

function createPeople(sp) {
  let peopleClass = document.getElementById('people')
  let person = document.createElement('li')
  peopleClass.appendChild(person)
  person.innerText = sp.name + "-----" + sp.craft
}

function peopleInSpace() {
  fetch(`http://api.open-notify.org/astros.json`)
  .then(response => response.json())
  .then(json => {
    let newArray = json.people
    newArray.forEach( sp => {
      createPeople(sp)
    })
  })
}

// _________________NERDY NUMBERS________________

function getNumber1() {
  fetch(`http://numbersapi.com/1/trivia?json`)
  .then(response => response.json())
  .then(json => {
    let numFact = json.text
    funFact.innerText = numFact
    addNumber1Fact(numFact)
  })
}

function addNumber1Fact(numFact) {
  let funFacts = document.getElementById('1facts')
  let fact = document.createElement('li')
  funFacts.appendChild(fact)
  fact.innerText = numFact
}

function numInput() {
  let value = inputField.value
  fetch(`http://numbersapi.com/${value}/trivia?json`)
  .then(response => response.json())
  .then(json => {
    let newNum = json.text
    randomFact.innerText = newNum
    inputField.value = ""
  })
}

function allFacts() {
  fetch(`http://numbersapi.com/1..100/trivia?json`)
  .then(response => response.json())
  .then(json => {
    for(let fact in json) {
      createHundredFacts(json[fact])
    }
  })
}

function createHundredFacts(fact) {
  let hundredFacts = document.getElementById('allfacts')
  let eachFact = document.createElement('li')
  hundredFacts.appendChild(eachFact)
  eachFact.innerText = fact.text
}

function everyFiveSeconds(){setInterval(intervalFact, 5000)}

function intervalFact() {
  fetch(`http://numbersapi.com/${number}/year?json`)
  .then(response => response.json())
  .then(json => {
    for(let fact in json) {
      let newFact = json[fact]
      alert(newFact)
    }
  })
  number--
  everyFiveSeconds()
}

// ----KONAMI CODE----

function konami() {
  let input = document.querySelector('body')
  let i = 0
  input.addEventListener('keydown', function(e) {
    if (e.key === codes[i]) {
      i++
      if (i === codes.length){
        alert('Congrats! You found the GOLDEN EGG. See Ann for free lunch!')
        i = 0
      }
    } else {
      i = 0
    }
  })
}
