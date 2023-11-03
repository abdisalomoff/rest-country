const cardList = document.querySelector(".card-list");
const loading = document.querySelector(".loading");

// RENDER COUNTRY ********
function renderCountries(country) {
  const countryCard = document.createElement('li');
  countryCard.classList.add("card");

  const countryFlag = document.createElement('img');
  countryFlag.className = "card-img-top"
  countryFlag.src = country.flags.png;
  countryFlag.alt = country.name.common;

  const cardBody = document.createElement('div');
  cardBody.className = "card-body";

  const cardTitle = document.createElement('h5');
  cardTitle.textContent = country.name.common;

  const cardPopulation = document.createElement('p');
  cardPopulation.textContent = `Population: ${country.population.toLocaleString()}`;

  const cardRegion = document.createElement('p');
  cardRegion.textContent = `Region: ${country.region}`;

  const cardCapital = document.createElement('p');
  cardCapital.textContent = `Capital: ${country.capital}`;

  const cardCurrency = document.createElement('p');

  if (country.currencies && Object.keys(country.currencies).length > 0) {
    cardCurrency.textContent = `Currency: ${Object.keys(country.currencies)[0]}`;
  } else {
    cardCurrency.textContent = "Currency: EEE";
  }

  // console.log(country);    
  // console.log(country.name.common);
  // console.log(country.population.toString().replace(","));
  // console.log(Object.keys(country.currencies)[0]);
  countryCard.appendChild(countryFlag);
  cardList.appendChild(countryCard);
  countryCard.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardPopulation);
  cardBody.appendChild(cardRegion);
  cardBody.appendChild(cardCapital);
  cardBody.appendChild(cardCurrency);
}

// SEARCH COUNTRY ********
const elForm = document.querySelector(".form");
const elInput = document.querySelector(".search-input");

elInput.addEventListener("input", () => {
  let elInputValue = elInput.value.trim();

  if (elInputValue) {
    fetch(`https://restcountries.com/v3.1/name/${elInputValue}`)
      .then((response) => response.json())
      .then((data) => {
        cardList.innerHTML = "";
        data.forEach((country) => {
          renderCountries(country);
          pagination.style.display = 'none';
        });
      })
      .catch((error) => (error));
  }
});


// Pagination******
const countriesPerPage = 20;
let currentPage = 1;
let countriesData = 0;

let pagination = document.querySelector(".pagination");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");

// UPDATE COUNTRY PAGE
function updatePage() {
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToShow = countriesData.slice(startIndex, endIndex);

  cardList.innerHTML = "";
  countriesToShow.forEach((country) => {
    renderCountries(country);
  });

  const totalPageCount = Math.ceil(countriesData.length / countriesPerPage);
  pagination.querySelector("#currentPage a").textContent = currentPage;
  if (currentPage === 1) {
    prevPage.classList.add("disabled");
  } else {
    prevPage.classList.remove("disabled");
  }
  if (currentPage === totalPageCount) {
    nextPage.classList.add("disabled");
  } else {
    nextPage.classList.remove("disabled");
  }
}


prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
});

nextPage.addEventListener("click", () => {
  const totalPageCount = Math.ceil(countriesData.length / countriesPerPage);
  if (currentPage < totalPageCount) {
    currentPage++;
    updatePage();
  }
});

// FETCH DATA****
pagination.style.display = 'none';
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    setTimeout(() => {
      countriesData = data;
      updatePage();
      loading.style.display = 'none';
      pagination.style.display = 'inline-block';
    }, 1000);

  })
  .catch((error) => (error));