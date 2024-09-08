let resultCountries = document.getElementById("resultCountries");
let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let countriesList = [];
spinner.classList.remove("d-none");

function createAndAppend(country) {
    let parentContainer = document.createElement("div");
    let imageContainer = document.createElement("div");
    let infoContainer = document.createElement("div");
    let headingEl = document.createElement("h1");
    let paraEl = document.createElement("p");
    let imgEl = document.createElement("img");

    parentContainer.classList.add("col-12", "d-flex", "flex-row", "country-card");
    imgEl.src = country.flag;
    imgEl.classList.add("country-flag", "mr-4");

    headingEl.textContent = country.name;
    headingEl.classList.add("country-name", "pt-1");

    paraEl.textContent = country.population;
    paraEl.classList.add("country-population");

    spinner.classList.add("d-none");
    imageContainer.appendChild(imgEl);
    parentContainer.appendChild(imageContainer);
    infoContainer.appendChild(headingEl);
    infoContainer.appendChild(paraEl);
    parentContainer.appendChild(infoContainer);
    resultCountries.appendChild(parentContainer);
}

function displaySearchResults() {
    resultCountries.textContent = "";
    let searchInputVal = searchInput.value.toLowerCase();

    for (let country of countriesList) {
        let countryName = country.name.toLowerCase();
        if (countryName.includes(searchInputVal)) {
            createAndAppend(country);
        }
    }
}

fetch("https://apis.ccbp.in/countries-data")
.then(response => response.json())
.then(json => {
    countriesList = json;
    console.log(countriesList);
    for (let country of json) {
        createAndAppend(country);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
    spinner.classList.add("d-none");
});

searchInput.addEventListener("input", displaySearchResults);
