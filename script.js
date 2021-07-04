const API_URL = "https://api.covid19api.com/summary";

const globalDataEl = document.getElementById('global-data');
const countryDataEl = document.getElementById('country-data');
const button = document.getElementById('refresh');
const countyCode = document.getElementById('county-code');
const countryContainer = document.getElementById('country-container');

const getCovidData = async () => {
    const response = await fetch(API_URL);
    const covidData = await response.json();
    const countryStats = covidData.Countries.filter(item => item.CountryCode === countyCode.value)
    
    globalDataEl.innerHTML = '';
    countryDataEl.innerHTML = '';

    const worldData = document.createElement('tr');
    worldData.innerHTML = `<td>${covidData.Global.TotalConfirmed}</td>
                       <td>${covidData.Global.TotalDeaths}</td>
                       <td>${covidData.Global.TotalRecovered}</td>`
    globalDataEl.appendChild(worldData);

    if (countryStats?.length > 0) {
        countryContainer.classList.remove('hidden')
        const countryGlobal = document.createElement('tr');
        countryGlobal.innerHTML = `<td>${countryStats[0].TotalConfirmed}</td>
        <td>${countryStats[0].TotalDeaths}</td>
        <td>${countryStats[0].TotalRecovered}</td>`
        globalDataEl.appendChild(countryGlobal)

        const countryData = document.createElement('tr');
        countryData.innerHTML = `<td>${countryStats[0].NewConfirmed}</td>
        <td>${countryStats[0].NewDeaths}</td>
        <td>${countryStats[0].NewRecovered}</td>`
        countryDataEl.appendChild(countryData)
    } else {
        countryContainer.classList.add('hidden')
    }
}


button.addEventListener('click', () => getCovidData())
getCovidData();

