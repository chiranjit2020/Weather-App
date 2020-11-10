const key = "347ca14f378fefb777730b23d77aa367";

const formEl = document.querySelector("form");
const details = document.querySelector(".details");

formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	details.innerHTML = '<h1 class="loading-text">Loading...</h1>';

	var location = e.target.location.value;

	weatherApp(location);

	// console.log(location = '')
});

async function weatherApp(location){
	const data = await fetchAPI(location);

	generateHTML(data);
}

async function fetchAPI(location){
	const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
	const res = await fetch(baseURL);
	const data = await res.json();

	console.log(data)
	return data;
}

function generateHTML(data){
	const now = (data.current.is_day == 'yes') ? "Day" : "Night";
	const html = `				
	<h1 class="temp">${data.current.temperature}&deg;c</h1>
	<h1 class="status">Status: ${data.current.weather_descriptions.map(item => item).join(' ')}</h1>
	<div class="more-info">
		<p>Now: ${now}</p>
		<p>Feels Like: ${data.current.feelslike}&deg;c</p>
		<p>Humidity: ${data.current.humidity}%</p>
		<p>Pressure: ${data.current.pressure}mbar</p>
		<p>Wind Speed: ${data.current.wind_speed}km/h</p>
		<p>Wind Dir: ${data.current.wind_dir}</p>
	</div>
	<div class="query">${(data.request.query).toUpperCase()}</div>`;

	details.innerHTML = html;
}

//<img src="${data.current.weather_icons}" alt="">
