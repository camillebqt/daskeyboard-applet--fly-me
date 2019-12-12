const q = require('daskeyboard-applet');
const request = require('request-promise');
const logger = q.logger; 
const localStorage = require('localStorage');

// Check the price of a selected flight every minute in order to buy it at the best price
// Compare the current price to the old price stored one minute ago

class FlyMe extends q.DesktopApp {
	
    constructor() {
        super();
        // every minute
        this.pollingInterval = 60*1000; // ms
		logger.info("Get the cheapest flight price!");
	}
	async getPrice() {
		// Get the current price of the selected flight 
		logger.info(`Getting price`);
		const API_BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`;
		const SETTINGS = {
			url: `${API_BASE_URL}/browsequotes/v1.0/US/USD/en-US/${this.config.ORIGIN_PLACE}-sky/${this.config.DESTINATION_PLACE}-sky/${this.config.DEPART_DATE}?inboundpartialdate=${this.config.RETURN_DATE}`,
			method: 'GET',
			headers: {
				'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
				'x-rapidapi-key': this.authorization.apiKey
			}
		}
		return request(SETTINGS).then(answer => {
			const json = JSON.parse(answer);
			if(json.Quotes.length == 0) {
				return null;
			}
			return json.Quotes[0].MinPrice;
		});
	}
    async run() {
		// Compare the current price to the old price
		return this.getPrice().then(NEW_PRICE => {
			const OLD_PRICE = getLastPrice();
			console.log('new', NEW_PRICE);
			console.log('old', OLD_PRICE);
			let COLOR;
			let MESSAGE;
			// If there is no price stored in localStorage
			if (OLD_PRICE == null) {
				COLOR = '#000000'; // black
				MESSAGE = `The best price for this flight is ${NEW_PRICE}$.`;			
			} 
			else if (NEW_PRICE <= OLD_PRICE) {
				COLOR = '#088A08'; // green
				MESSAGE = `The best price for this flight is ${NEW_PRICE}$.`;
				} 
			else if (NEW_PRICE > OLD_PRICE) {
				COLOR = '#DF0101'; // red
				MESSAGE = `Unfortunately, the best price for this flight was ${OLD_PRICE}$. Now the price is ${NEW_PRICE}$`;
				}
			const a = new q.Signal({
				points: [
					[new q.Point(COLOR)]
				],
				name: 'FlyMe',
				message: MESSAGE
			});
			setLastPrice(NEW_PRICE);
			return a;
		})
	}
}
// Store price obtained from last update
function setLastPrice(PRICE) {
	localStorage.setItem("lastPrice", PRICE);
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
	setLastPrice: setLastPrice,
	getLastPrice: getLastPrice
}

const applet = new FlyMe();



