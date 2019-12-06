const q = require('daskeyboard-applet');
const request = require('request-promise');
const logger = q.logger; 

class FlyMe extends q.DesktopApp {
	
    constructor() {
        super();
        // every minutes
        this.pollingInterval = 60*1000; // ms
		logger.info("Get the cheapest flight price!");
		this.config = {
			ORIGIN_PLACE: 'SFO',
			DESTINATION_PLACE: 'AUS',
			DEPART_DATE: '2020-01-01',
			RETURN_DATE: '2020-01-10'
		};
		this.getPrice();
    }

    async run() {

	}  

	getPrice(){
		const API_BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`;
		const apiKey = 'SECRET';
		const settings = {
			url: `${API_BASE_URL}/browsequotes/v1.0/US/USD/en-US/${this.config.ORIGIN_PLACE}-sky/${this.config.DESTINATION_PLACE}-sky/${this.config.DEPART_DATE}?inboundpartialdate=${this.config.RETURN_DATE}`,
			method: 'GET',
			headers: {
				"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
				"x-rapidapi-key": `${apiKey}`
			}
		}
		console.log(settings.url)
		return request(settings).then(answer => {
			const json = JSON.parse(answer);
			console.log('>>>', json.Quotes[0].MinPrice);
			return answer;

		});
	}
}
module.exports = {
    FlyMe: FlyMe
}

const applet = new FlyMe();



