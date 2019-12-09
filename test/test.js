const q = require('daskeyboard-applet');
var assert = require('assert');
const t = require('../index');

const {
    FlyMe
} = require('../index');

const ORIGIN_PLACE = 'JFK';
const DESTINATION_PLACE = 'AUS';
const DEPART_DATE = '2020-01-01';
const RETURN_DATE = '2020-01-10';

describe('FlyMe', () => {
    describe('#constructor()', function () {
        it('should construct', function () {
            let app = new FlyMe();
            assert.ok(app);
        });
    });
    describe('getPrice', () => {
        it('checks number 1', async function () {
            const config = getConfig();
            let app = await buildApp(config);
            console.log('<<<<<<', ORIGIN_PLACE);
            console.log('<<<<<<', DESTINATION_PLACE);
            console.log('<<<<<<', DEPART_DATE);
            console.log('<<<<<<', RETURN_DATE);
            })
        });
});
    //       return t.getPrice().then((price) => {
    //         assert.ok(price, 'Error in price.');
    //         // assert.equal(currency, price.data.base + '-' + price.data.currency, 'Currency does not match: ' + currency);
    //       }).catch((error) => {
    //         assert.fail(error);
    //       })
    //     })
    //   });
    
function getConfig() {
    const defaultConfig = {
        applet: {
            user: {
                ORIGIN_PLACE: ORIGIN_PLACE,
                DESTINATION_PLACE: DESTINATION_PLACE,
                DEPART_DATE: DEPART_DATE,
                RETURN_DATE: RETURN_DATE
            }
        },
        geometry: {
            width: 1,
            height: 1,
        }
    };
    return defaultConfig;
}

// Build application
async function buildApp(config) {
    let app = new t.FlyMe();
    await app.processConfig(config);
    return app;

}



