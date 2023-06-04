let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  let hiddenbtn = document.querySelector("#hiddenbtn");
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      // console.log(lat + " " + lng);
      //   console.log(data[0].capital[0]);
      //   console.log(data[0].flags.svg);
      //   console.log(data[0].name.common);
      //   console.log(data[0].continents[0]);
      //   console.log(Object.keys(data[0].currencies)[0]);
      //   console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
      //   console.log(
      //     Object.values(data[0].languages).toString().split(",").join(", ")
      //   );
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Car Driving Side:</h4>
                <span>${data[0].car.side}</span>
            </div>
        </div>
          
        
        <div class="wrapper">
            <div class="data-wrapper">
                <h4><a target='_new' href='https://www.britannica.com/facts/${
                  data[0].name.common
                }'>
                Click here to view ${data[0].name.common} Facts & Stats</a></h4>
            </div>
        </div>       
        <div class="lat hidden">${data[0].latlng[0]}</div>
        <div class="lng hidden">${data[0].latlng[1]}</div>
      `;
      hiddenbtn.classList.remove("hidden");
    })

    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});

let sbtn = document.querySelector(".primarybtn");
let shwMap = document.querySelector("#showOnMap");

sbtn.addEventListener("click", function () {
  if (sbtn.textContent == "Show on Map") {
    let lat = document.querySelector(".lat").textContent;
    let lng = document.querySelector(".lng").textContent;
    // Passing the data from API to display map

    shwMap.classList.remove("hidden");
    // Where you want to render the map.
    var element = document.getElementById("osm-map");

    // Height has to be set. You can do this in CSS too.
    element.style = "height:300px;";

    // Create Leaflet map on map element.
    var map = L.map(element);

    // Add OSM tile layer to the Leaflet map.
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Target's GPS coordinates.
    var target = L.latLng(`${lat}`, `${lng}`);

    // Set map's center to target with zoom 14.
    map.setView(target, 6);

    // Place a marker on the same location.
    L.marker(target).addTo(map);

    // sbtn.classList.add("hidden");
    sbtn.textContent = "Home";
  } else {
    location.reload();
  }
});
