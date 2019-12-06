const q = require('daskeyboard-applet');
const logger = q.logger; 

// skyscanner api url

const API_BASE_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices`;

function postMethod(){
	const settings = {
		API_URL : `${API_BASE_URL}/pricing/v1.0/US/USD/en-US/${this.config.ORIGIN_PLACE}-sky/${this.config.DESTINATION_PLACE}-sky/${DEPART_DATE}?inboundpartialdate=${RETURN_DATE}`,
		method: 'POST',
		headers: {
			'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			'x-rapidapi-key': "4cc1c2c4bcmsh83c89946482a731p1f65fajsnea2f98850273",
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
		url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/4f8b1b0b-799a-414f-bf3f-48802cf83ce3?pageIndex=0&pageSize=10',
		url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${SESSION_KEY}?pageIndex=0&pageSize=10`,
		// SESSION_KEY est recue dans "location" dans le headers lors de la creation de la session // TODO: comment recuperer cette valeur??
		method: 'GET',
		headers: {
			'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			'x-rapidapi-key': "4cc1c2c4bcmsh83c89946482a731p1f65fajsnea2f98850273"
		}
	}
}

function getPrice(){
	const settings = {
		url: `${API_BASE_URL}/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-01-01?inboundpartialdate=2020-10-01`,
		method: 'GET',
		headers: {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "4cc1c2c4bcmsh83c89946482a731p1f65fajsnea2f98850273"
		}
	}
}




