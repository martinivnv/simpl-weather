let cel = true;
let fah = false;
const toggleCel = document.getElementById("celsius");
const toggleFah = document.getElementById("fahrenheit");
toggleCel.style.backgroundColor = "rgba(255, 255, 255, 0.3)";

toggleCel.addEventListener("click", (e) => {
	if (cel == false) {
		cel = true;
		fah = false;
		toggleCel.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
		toggleFah.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
		const temp = document.getElementById("temperature");
		const feels_like = document.getElementById("feels-like");
		if (temp.textContent != "") {
			let convTemp = fToC(temp.textContent);
			let convFeel = fToC(feels_like.textContent.slice(12));
			temp.textContent = `${convTemp} °C`;
			feels_like.textContent = `feels like: ${convFeel} °C`;
		}
	}
});
toggleFah.addEventListener("click", (e) => {
	if (fah == false) {
		cel = false;
		fah = true;
		toggleFah.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
		toggleCel.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
		const temp = document.getElementById("temperature");
		const feels_like = document.getElementById("feels-like");
		if (temp.textContent != "") {
			let convTemp = cToF(temp.textContent);
			let convFeel = cToF(feels_like.textContent.slice(12));
			temp.textContent = `${convTemp} °F`;
			feels_like.textContent = `feels like: ${convFeel} °F`;
		}
	}
});

const kToC = (temp) => {
	let tempFloat = parseFloat(temp);
	return (tempFloat - 273.15).toFixed(1).toString();
};

const kToF = (temp) => {
	let tempFloat = parseFloat(temp);
	return (((tempFloat - 273.15) * 9) / 5 + 32).toFixed(1).toString();
};

const cToF = (temp) => {
	let tempFloat = parseFloat(temp);
	return ((tempFloat * 9) / 5 + 32).toFixed(1).toString();
};

const fToC = (temp) => {
	let tempFloat = parseFloat(temp);
	return (((tempFloat - 32) * 5) / 9).toFixed(1).toString();
};

const api_key = "824051ab1e124bb5dcd2b573e9ba6440";

async function getWeatherData(input_city) {
	const response = await fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${input_city}&appid=${api_key}`,
		{ mode: "cors" }
	);
	const weatherData = await response.json();
	console.log(weatherData);
	displayData(parseData(weatherData));
}

const parseData = (data) => {
	if (data.message == "city not found") {
		alert("city_not_found");
		return null;
	} else {
		return {
			city: data.name,
			country: data.sys.country,
			temp: data.main.temp,
			feels_like: data.main.feels_like,
			desc: data.weather[0].description,
			icon_id: data.weather[0].icon,
		};
	}
};

const displayData = (dataObj) => {
	if (dataObj != null) {
		let convTemp = "";
		let convFeel = "";
		let unit = "";
		if (cel == true) {
			convTemp = kToC(dataObj.temp);
			convFeel = kToC(dataObj.feels_like);
			unit = "C";
		} else if (fah == true) {
			convTemp = kToF(dataObj.temp);
			convFeel = kToF(dataObj.feels_like);
			unit = "F";
		}
		const location = document.getElementById("location");
		const icon = document.getElementById("icon");
		const temp = document.getElementById("temperature");
		const feels_like = document.getElementById("feels-like");
		const description = document.getElementById("description");
		location.textContent = `${dataObj.city}, ${dataObj.country}`;
		icon.src = `http://openweathermap.org/img/wn/${dataObj.icon_id}@4x.png`;
		temp.textContent = `${convTemp} °${unit}`;
		feels_like.textContent = `feels like: ${convFeel} °${unit}`;
		description.textContent = `${dataObj.desc}`;
	}
};

let i = 0;
let txt = "simpl_weather";
let typeSpeed = 150;

const typeAnimation = () => {
	if (i < txt.length) {
		document.getElementById("app-title").textContent += txt.charAt(i);
		i++;
		setTimeout(typeAnimation, typeSpeed);
	}
};

document.addEventListener("DOMContentLoaded", typeAnimation());

const submitButton = document.getElementById("submit");
const inputBox = document.getElementById("inputBox");

submitButton.addEventListener("click", (e) => {
	handleSubmit();
});

inputBox.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		handleSubmit();
	}
});

const handleSubmit = () => {
	let location = inputBox.value;
	inputBox.value = "";
	if (location != "") {
		getWeatherData(location);
	}
};
