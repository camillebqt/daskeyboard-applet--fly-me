const q = require('daskeyboard-applet');
const logger = q.logger; 

class FlyMe extends q.DesktopApp {

    constructor() {
        super();
        // every minutes
        this.pollingInterval = 60*1000; // ms
        logger.info("Get the cheapest flight price!");
    }

    async run() {
	}
}   


// skyscanner api url
const API_BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`;

function postMethod(){
	const settings = {
		API_URL : `${API_BASE_URL}/pricing/v1.0/US/USD/en-US/${this.config.ORIGIN_PLACE}-sky/${this.config.DESTINATION_PLACE}-sky/${DEPART_DATE}?inboundpartialdate=${RETURN_DATE}`,
		method: 'POST',
		headers: {
			'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			'x-rapidapi-key': `${apiKey}`,
			'content-type': "application/json",
			'location': `http://partners.api.skyscanner.net/apiservices/pricing/uk2/v1.0/${SESSION_KEY}`
		},
		data: {
			"inboundDate": this.config.RETURN_DATE,
			"originPlace": this.config.ORIGIN_PLACE,
			"destinationPlace": this.config.DESTINATION_PLACE,
			"outboundDate": this.config.DEPART_DATE
		}
	};
	return request(settings).then(SESSION_KEY => {
		return SESSION_KEY;
	});
}

function getMethod(){
	const settings = {
		url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${SESSION_KEY}?pageIndex=0&pageSize=10`,
		// SESSION_KEY est recue dans "location" dans le headers lors de la creation de la session // TODO: comment recuperer cette valeur??
		method: 'GET',
		headers: {
			'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			'x-rapidapi-key': `${apiKey}`
		}
	}
}

// Goal: collect the price ?? TO DO : COMMENT ????????????????????????????
function getPrice(){
	const settings = {
		url: `${API_BASE_URL}/apiservices/browsequotes/v1.0/US/USD/en-US/${this.config.ORIGIN_PLACE}-sky/${this.config.DESTINATION_PLACE}-sky/${DEPART_DATE}?inboundpartialdate=${RETURN_DATE}`,
		method: 'GET',
		headers: {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": `${apiKey}`
		}
	}
}


module.exports = {
    BirthdayReminder: BirthdayReminder
}

const applet = new BirthdayReminder();



