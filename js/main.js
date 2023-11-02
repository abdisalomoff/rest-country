const cardList = document.querySelector(".card-list");
// const countriesTemplate = document.querySelector("#countries-template").content;

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
    cardCurrency.textContent = `Currency: ${Object.keys(country.currencies)[0]}`;

    console.log(country);    
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

// FETCH COUNTRY ********
const countries = fetch("https://restcountries.com/v3.1/all");
countries.then((response) => response.json())
    .then((data) => {
        data.forEach(country => {
            renderCountries(country)
        });
    }).catch((error) => (error));

// SEARCH COUNTRY ********

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".search-input");

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let elInputValue = elInput.value.toUpperCase().trim();

    const allCountryCard = document.querySelectorAll('.card');
    allCountryCard.forEach(countryCard => {
        const cardTitle = countryCard.querySelector('h5');
        const countryName = cardTitle.textContent.toUpperCase();
        if (countryName.includes(elInputValue)) {
            countryCard.style.display = 'block';
        } else {
            countryCard.style.display = 'none';
        }
    });

    elForm.reset();
});