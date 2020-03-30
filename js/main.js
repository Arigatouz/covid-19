const countryInput = document.querySelector('.form-control'),
  showData = document.getElementById('show__statistics'),
  showDate = document.getElementById('Date'),
  failMessage = document.getElementById('message'),
  searchInput = document.getElementById('search');

var covidData = JSON.parse(localStorage.getItem('covidData'));
var covidSummary = JSON.parse(localStorage.getItem('covidSummary'));

window.onload = function() {
  if (!covidData) {
    fetch('https://corona.lmao.ninja/countries')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('covidData', JSON.stringify(data));
      });
  }
  if (!covidSummary) {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(data => {
        this.localStorage.setItem('covidSummary', JSON.stringify(data));
        const date = data['Date'];
        const newDate = date.slice(0, 10);
        showDate.textContent = `The Date of this Statistics (${newDate})`;
      });
  }
};

searchInput.addEventListener('click', e => {
  e.preventDefault();
  failMessage.innerHTML = '';
  const countryName = countryInput.value;

  const date = covidSummary['Date'];
  const newDate = date.slice(0, 10);
  showDate.textContent = `The Date of this Statistics (${newDate})`;

  let countryData = covidData.find(
    d =>
      d.country.toLowerCase() === countryName.toLowerCase() ||
      d.countryInfo.iso2 === countryName.toUpperCase()
  );
  if (countryData) {
    showData.innerHTML += `<tr>
                                <td><img style= width = '30px' ; height = '30px' src="${
                                  countryData.countryInfo.flag
                                }"/></td>
                                <td>${countryData.country}</td>
                                <td>${countryData.cases.toLocaleString(
                                  'en'
                                )}</td>
                                <td>${countryData.todayCases.toLocaleString(
                                  'en'
                                )}</td>
                                <td>${countryData.todayDeaths.toLocaleString(
                                  'en'
                                )}</td>
                                <td style="color: #F48FB1;">${countryData.deaths.toLocaleString(
                                  'en'
                                )}</td>
                                <td>${countryData.active.toLocaleString(
                                  'en'
                                )}</td>
                                <td>${countryData.recovered.toLocaleString(
                                  'en'
                                )}</td>
                            </tr>`;
  } else {
    failMessage.innerHTML = `Failed to find data for: ${countryName}`;
  }
  countryInput.value = '';
});
