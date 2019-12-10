const q = require('daskeyboard-applet');
var assert = require('assert');
const t = require('../index');

const {
    FlyMe
} = require('../index');

describe('FlyMe', () => {
    describe('#constructor()', function () {
        it('should construct', function () {
            let app = new FlyMe();
            assert.ok(app);
        });
    });
    describe('getPrice', function () {
        it('Can get the current price', function () {
            return t.getPrice(getConfig().applet.user).then((new_price) => {
                console.log('<<<<<get current price>>>>', new_price);
                assert.notEqual(new_price, null);
            }).catch((error) => {
                assert.fail(error);
            })
        })
    });
    describe('localStorage', function () {
        it('Can get price when none is stored', function () {
            assert.equal(t.getLastPrice(), null);
          })
        it('check the color of the key', async function () {
            const config = getConfig();
            let app = await buildApp(config);
            return app.run().then((signal) => {
                assert.ok(signal); 
                assert.equal(signal.points[0][0].color, '#000000');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });
    describe('#run()', () => {
        it('Can store the last price and get it from storage', function () {
            const price = '100';
            console.log('<<<<<set new price>>>>', price);
            assert.ok(t.setLastPrice(price));
            assert.equal(t.getLastPrice(), price);
        })
        it('check the color of the key', async function () {
            const config = getConfig();
            let app = await buildApp(config);
            return app.run().then((signal) => {
                assert.ok(signal); 
                assert.equal(signal.points[0][0].color, '#DF0101');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });
    describe('#run()', () => {
        it('Can store the last price and get it from storage', function () {
            const price = '500';
            console.log('<<<<<set new price>>>>', price);
            assert.ok(t.setLastPrice(price));
            assert.equal(t.getLastPrice(), price);
        })
        it('check the color of the key', async function () {
            const config = getConfig();
            let app = await buildApp(config);
            return app.run().then((signal) => {
                assert.ok(signal); 
                assert.equal(signal.points[0][0].color, '#088A08');
            }).catch((error) => {
                assert.fail(error)
            });
        });
    });
});
    
function getConfig() {
    const defaultConfig = {
        applet: {
            user: {
                ORIGIN_PLACE: 'JFK',
                DESTINATION_PLACE: 'AUS',
                DEPART_DATE: '2020-01-01',
                RETURN_DATE: '2020-01-10',
                apiKey: ''
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



