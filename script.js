const api_key = "824051ab1e124bb5dcd2b573e9ba6440";

const getWeatherData = (city_id) => {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${api_key}`,
		{ mode: "cors" }
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			console.log(response);
		});
};

const blinkCursor = () => {
	let cursor = true;
	let speed = 500;
	setInterval(() => {
		if (cursor) {
			document.getElementById("cursor").style.opacity = 0;
			cursor = false;
		} else {
			document.getElementById("cursor").style.opacity = 1;
			cursor = true;
		}
	}, speed);
};

document.addEventListener("DOMContentLoaded", blinkCursor());

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (e) => {
	let location = inputBox.value;
	inputBox.value = "";
	console.log(location);
	getWeatherData(location);
});
