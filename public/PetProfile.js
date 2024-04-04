document.addEventListener('DOMContentLoaded', () => {
  // Parse query parameters from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Get pet data from query parameters
  const petNameLeft = urlParams.get('name');
  const petSpeciesLeft = urlParams.get('species');
  const petBreedLeft = urlParams.get('breed');
  const petSize = urlParams.get('sizeParam');
  const petShelter = urlParams.get('shelterParam');
  const petImageLeft = decodeURIComponent(urlParams.get('image'));
  const petDescriptionLeft = decodeURIComponent(urlParams.get('description'));
  const petAge = urlParams.get('age');


  // Populate HTML elements with pet data
  document.getElementById('petNameLeft').textContent = petNameLeft;
  document.getElementById('petSpeciesLeft').textContent = petSpeciesLeft;
  document.getElementById('petBreedLeft').textContent = petBreedLeft;
  document.getElementById('petDescriptionLeft').textContent = petDescriptionLeft;
  document.getElementById('petImageLeft').src = petImageLeft;
  document.getElementById('petSize').textContent = petSize;
  document.getElementById('petShelter').textContent = petShelter;
  // Set the pet's name for the right section
  document.getElementById('petNameRight').textContent = petNameLeft;

  // Set other pet details for the right section
  document.getElementById('petSpeciesRight').textContent = petSpeciesLeft;
  document.getElementById('petBreedRight').textContent = petBreedLeft;
  document.getElementById('petAge').textContent = petAge;
});