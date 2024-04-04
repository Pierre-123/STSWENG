// Define breeds for each species
const breeds = {
    dog: ['Shih Tzu', 'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie'],
    cat: ['Ragdoll', 'Shorthair', 'Maine Coon', 'Siamese'],
    bird: ['Parakeet', 'Parrot', 'Cockatoo'],
    hamster: ['Dwarf', 'Roborovski', 'Syrian']
  };
  
  // Function to update breed dropdown options
  function updateBreedDropdown() {
    const speciesDropdown = document.getElementById('speciesDropdown');
    const breedDropdown = document.getElementById('breedDropdown');
    const selectedSpecies = speciesDropdown.value;
  
    // Clear current options
    breedDropdown.innerHTML = '';
  
    // Add new options based on selected species
    breeds[selectedSpecies].forEach(breed => {
      const option = document.createElement('option');
      option.text = breed;
      option.value = breed.toLowerCase().replace(/\s+/g, '-'); // Convert breed name to lowercase and replace spaces with hyphens
      breedDropdown.add(option);
    });
  }
  
  // Event listener for species dropdown change
  document.getElementById('speciesDropdown').addEventListener('change', updateBreedDropdown);
  
  // Update breed dropdown on page load
  window.onload = function() {
    updateBreedDropdown();
  };
  