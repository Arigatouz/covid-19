const countryInput = document.querySelector('.form-control'),
  showData = document.getElementById('show__statistics'),
  showDate = document.getElementById('Date'),
  failMessage = document.getElementById('message'),
  searchInput = document.getElementById('search'),
  refreshResultBtn = document.getElementById('refreshResultBtn');

var covidData = JSON.parse(localStorage.getItem('covidData'));
var covidSummary = JSON.parse(localStorage.getItem('covidSummary'));

window.onload = getData(false, function(name) {
  console.log(`got ${name}`);
});

function getData(force, cb) {
  if (covidSummary) {
    showDate.textContent = `The Date of this Statistics (${new Date(
      covidSummary['Date']
    ).toLocaleDateString()})`;
  }
  if (!covidData || force) {
    fetch('https://corona.lmao.ninja/countries')
      .then(response => response.json())
      .then(data => {
        covidData = data;
        localStorage.setItem('covidData', JSON.stringify(data));
        cb('covid data');
      });
  }
  if (!covidSummary || force) {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(data => {
        covidSummary = data;
        localStorage.setItem('covidSummary', JSON.stringify(data));
        const date = data['Date'];
        const newDate = date.slice(0, 10);
        showDate.textContent = `The Date of this Statistics (${newDate})`;
        cb('covid summary');
      });
  }
}

refreshResultBtn.addEventListener('click', e => {
  getData(true, function(name) {
    showDate.textContent = `Updated Date of this Statistics (${new Date(
      covidSummary['Date']
    ).toLocaleDateString()})`;
    console.log('Got data for', name);
  });
});

searchInput.addEventListener('click', e => {
  e.preventDefault();
  if (!covidData) {
    failMessage.innerHTML = 'No data. Please try again.';
  }
  failMessage.innerHTML = '';
  const countryName = countryInput.value;

  let countryData = covidData.find(
    d =>
      d.country.toLowerCase() === countryName.toLowerCase() ||
      d.countryInfo.iso2 === countryName.toUpperCase()
  );
  if (countryData) {
    showData.innerHTML = `<tr>
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
                            </tr>${showData.innerHTML}`;
  } else {
    failMessage.innerHTML = `Failed to find data for: ${countryName}`;
  }
  countryInput.value = '';
});
