// Gets All global cases

let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

// let doughnutChart = document.getElementById("doughnutChart").getContext("2d");

(async () => {
	let data = await fetch("https://corona.lmao.ninja/all");

	let all = await data.json();

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;

	allCaseNo.innerText = allCases;
	recoveredCaseNo.innerText = allRecovered;
	deathCaseNo.innerText = allDeaths;

	// let donut = new Chart(doughnutChart, {
	// 	// The type of chart we want to create
	// 	type: "doughnut",

	// 	// The data for our dataset
	// 	data: {
	// 		labels: ["All Cases", "Recovered Cases", "Death Cases"],
	// 		datasets: [
	// 			{
	// 				label: "Covid-19 Cases",
	// 				borderColor: "rgba(0,0,0)",
	// 				backgroundColor: [
	// 					"rgba(136,136,136,1)",
	// 					"rgba(0,255,0,1)",
	// 					"rgba(255,0,0,1)"
	// 				],
	// 				data: [allCases, allRecovered, allDeaths]
	// 			}
	// 		]
	// 	},
	// 	options: {
	// 		legend: {
	// 			labels: {
	// 				fontSize: 25,
	// 				padding: 50
	// 			}
	// 		},
	// 		tooltips: {
	// 			bodyFontSize: 30
	// 		}
	// 	}
	// });
})();
