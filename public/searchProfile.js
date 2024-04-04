document.addEventListener('DOMContentLoaded', () => {
  
  const petData = [
    {
      breed: 'Labrador',
      species: 'Dog',
      image: 'assets/sample_dog.jpg',
      description: `I am a Labrador Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
      name: 'Kiwi',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Shih Tzu',
      species: 'Dog',
      image: 'assets/sample_dog.jpg',
      description: `I am a Labrador Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
      name: 'Chia',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Ragdoll',
      species: 'Cat',
      image: 'assets/sample_cat.jpg',
      description: `I am a Ragdoll kitty Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
      name: 'Koo',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Siamese',
      species: 'Cat',
      image: 'assets/sample_cat.jpg',
      description: `I am a Siamese Cat Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
      name: 'Zaku',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Parrot',
      species: 'Bird',
      image: 'assets/sample_bird.jpg',
      description: `I am a Parrot Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor.`,
      name: 'Johnathan',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Cockatoo',
      species: 'Bird',
      image: 'assets/sample_bird.jpg',
      description: `I am a Cockatoo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor`,
      name: 'Shaq',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Syrian',
      species: 'Hamster',
      image: 'assets/sample_hamster.jpg',
      description: `I am a huggable Syrian hamster!. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor`,
      name: 'Hamantha',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    {
      breed: 'Dwarf',
      species: 'Hamster',
      image: 'assets/sample_hamster.jpg',
      description: `I am a Dwarf Hamster . Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et turpis et enim fringilla auctor`,
      name: 'Tanny',
      size: 'Medium',
      shelter: 'ABC Shelter',
      age: '1 year',
    },
    // ... other pets data
  ];

  const speciesDropdown = document.getElementById('speciesDropdown');
  const breedDropdown = document.getElementById('breedDropdown');
  const ageDropdown = document.getElementById('ageDropdown');

  function populateBreeds(breeds) {
    breedDropdown.innerHTML = '';
    breeds.forEach((breed) => {
      breedDropdown.innerHTML += `<option value="${breed.toLowerCase()}">${breed}</option>`;
    });
  }

  const generatePetProfile = pet => `
  <div class="pet-profile ${pet.breed.toLowerCase()}">
    <img src="${pet.image}" alt="${pet.name}">
    <h2>${pet.name}</h2>
    <p>${pet.breed}</p>
    <p class="overflow-scroll">${pet.description}</p>
    <a href="petProfile.html?name=${pet.name}&species=${pet.species}&breed=${pet.breed}&sizeParam=${pet.size}&shelterParam=${pet.shelter}&image=${encodeURIComponent(pet.image)}&description=${encodeURIComponent(pet.description)}&age=${pet.age}" class="see-profile-link">See Profile</a>
  </div>
`;


const petProfiles = petData.map(generatePetProfile).join('');
  const petContainer = document.querySelector('.pet-container');
  petContainer.innerHTML = petProfiles;

  speciesDropdown.addEventListener('change', () => {
    const selectedSpecies = speciesDropdown.value;
    const speciesBreeds = {
      dog: ['Shih Tzu', 'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie'],
      cat: ['Ragdoll', 'Shorthair', 'Maine Coon', 'Siamese'],
      bird: ['Parakeet', 'Parrot', 'Cockatoo'],
      hamster: ['Dwarf', 'Roborovski', 'Syrian']
    };

    if (selectedSpecies === 'dog') {
      populateBreeds(['Any', 'Shih Tzu', 'Mini Poodle', 'Border Collie', 'Labrador', 'Yorkie']);
    } else if (selectedSpecies === 'cat') {
      populateBreeds(['Any', 'Ragdoll', 'Shorthair', 'Maine Coon', 'Siamese']);
    } else if (selectedSpecies === 'bird') {
      populateBreeds(['Any', 'Parakeet', 'Parrot', 'Cockatoo']);
    } else if (selectedSpecies === 'hamster') {
      populateBreeds(['Any', 'Dwarf', 'Roborovski', 'Syrian']);
    } else {
      populateBreeds(['Any']);
    }
  });

  for (let i = 0; i < 15; i++) {
    ageDropdown.innerHTML += `<option value="${i + 1}-year">${i + 1} year${i === 0 ? '' : 's'} old</option>`;
  }

  populateBreeds(['Any']);

  const searchButton = document.getElementById("search-button");
  const petContainers = document.querySelectorAll(".pet-container .pet-profile");

  function filterPets(pets, selectedSpecies, selectedBreed) {
      return pets.filter(pet => {
        if (selectedSpecies === "any" && selectedBreed === "any") {
          return true;
        } else if (selectedSpecies === "any") {
          return pet.breed.toLowerCase() === selectedBreed;
        } else if (selectedBreed === "any") {
          return pet.species.toLowerCase() === selectedSpecies;
        } else {
          return pet.species.toLowerCase() === selectedSpecies && pet.breed.toLowerCase() === selectedBreed;
        }
      });
    }
  
  

    searchButton.addEventListener("click", () => {
      const selectedSpecies = speciesDropdown.value;
      const selectedBreed = breedDropdown.value.toLowerCase();
    
      const filteredPets = filterPets(petData, selectedSpecies, selectedBreed);
    
      petContainers.forEach(container => {
        container.style.display = (
          filteredPets.some(pet => pet.name === container.querySelector("h2").innerText)
        )? "block" : "none";
      });
    });

  // Initial breed dropdown population
  speciesDropdown.dispatchEvent(new Event("change"));



});


  

