const q = require('daskeyboard-applet');
const request = require('request-promise');
const logger = q.logger; 
const localStorage = require('localStorage');

class FlyMe extends q.DesktopApp {
	
    constructor() {
        super();
        // every minute
        this.pollingInterval = 60*1000; // ms
		logger.info("Get the cheapest flight price!");
    }
    async run() {
		return new Promise((resolve, reject) => {
			getPrice(this.config).then(new_price => {
				console.log("The current price is", new_price, "$");
				const old_price = getLastPrice();
				console.log("The old price is", old_price, "$");
				let COLOR;
				let MESSAGE;
				if (old_price == null) {
					COLOR = '#000000'; // black
					MESSAGE = `The best price for this flight is ${new_price}`;			
				} 
				else if (new_price <= old_price) {
					COLOR = '#088A08'; // green
					MESSAGE = `The best price for this flight is ${new_price}`;
					} 
				else if (new_price > old_price) {
					COLOR = '#DF0101'; // red
					MESSAGE = `The best price for this flight is ${old_price}`;
					}
				const a = new q.Signal({
					points: [
						[new q.Point(COLOR)]
					],
					name: 'FlyMe',
					message: MESSAGE
				});
				setLastPrice(new_price);
				resolve(a);
			});
		});
	}
}

function getPrice(config){
	const API_BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`;
	const settings = {
		url: `${API_BASE_URL}/browsequotes/v1.0/US/USD/en-US/${config.ORIGIN_PLACE}-sky/${config.DESTINATION_PLACE}-sky/${config.DEPART_DATE}?inboundpartialdate=${config.RETURN_DATE}`,
		method: 'GET',
		headers: {
			'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
			'x-rapidapi-key': config.apiKey
		}
	}
	console.log(settings.url)
	return new Promise((resolve, reject) => {
		request(settings).then(answer => {
			const json = JSON.parse(answer);
			console.log('>>>', json.Quotes[0].MinPrice);
			if(json.Quotes.length == 0) {
				return reject();
			}
			resolve(json.Quotes[0].MinPrice);
		});
	});
}
// Store price obtained from last update
function setLastPrice(price) {
	localStorage.setItem("lastPrice", price);
	return true;
}
// Retrieve stored price data from last update
function getLastPrice() {
	if (localStorage.getItem("lastPrice") != null) {
		return localStorage.getItem("lastPrice");
	} else {
		// If no price is stored
		return null;
	}
}
module.exports = {
	FlyMe: FlyMe,
	getPrice: getPrice,
	setLastPrice: setLastPrice,
	getLastPrice: getLastPrice
}

const applet = new FlyMe();



