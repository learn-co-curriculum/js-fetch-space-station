document.addEventListener('DOMContentLoaded', run);

function getSpaceStationLocation() {
  fetch('http://api.open-notify.org/iss-now.json')
    .then(r => r.json())
    .then(json => renderLocation(json))
}

function getAstronauts() {
  fetch('http://api.open-notify.org/astros.json')
    .then(r => r.json())
    .then(json => renderAstronauts(json))
}

function addButtonListener() {
  const button = document.getElementById('location-button');
  button.addEventListener('click', getSpaceStationLocation);
}

function renderAstronauts(json) {
  const mainDiv = document.getElementById('astronauts-container');
  mainDiv.innerHTML = '';

  const astronautTitle = mainDiv.appendChild(document.createElement('h3'))
  astronautTitle.innerText = 'Current Astronauts';

  const divElement = document.createElement('div');

  json.people.forEach(a => {
    const liElement = divElement.appendChild(document.createElement('li'));
    liElement.innerText = a.name;
  })

  mainDiv.appendChild(divElement);
}

function renderLocation(json) {
  const latitudeValue = json.iss_position.latitude
  const longitudeValue = json.iss_position.longitude

  const mainDiv = document.getElementById('lat-long-container');
  mainDiv.innerHTML = '';

  const locationTitle = mainDiv.appendChild(document.createElement('h3'))
  locationTitle.innerText = 'Current Coordinates';

  const divElement = document.createElement('div');
  const unorderedListElement = document.createElement('ul');
  const latitudeElement = document.createElement('li');
  const longitudeElement = document.createElement('li');

  mainDiv.appendChild(divElement);
  divElement.appendChild(latitudeElement);
  divElement.appendChild(longitudeElement);

  latitudeElement.innerText = `latitude = ${latitudeValue}`;
  longitudeElement.innerText = `longitude = ${longitudeValue}`;
}

function run() {
  getAstronauts();
  addButtonListener();
}
