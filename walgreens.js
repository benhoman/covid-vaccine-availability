const fetch = require('node-fetch');
const getMeta = require('lets-get-meta');
const buildOptions = require('minimist-options');
const minimist = require('minimist');
const dateFormat = require('dateformat');

const options = buildOptions({
    latitude: {
        type: 'number',
        default: 41.0985461
    },
    longitude: {
        type: 'number',
        default: -74.3939339
    },
    radius: {
        type: 'number',
        default: 25
    }
});
const args = minimist(process.argv.slice(2), options);


let startDate = dateFormat(new Date(), "yyyy-mm-dd");
let mainUrl = "https://www.walgreens.com/findcare/vaccination/covid-19/location-screening";
let availabilityUrl = "https://www.walgreens.com/hcschedulersvc/svc/v1/immunizationLocations/availability";
let requestBody = {
    serviceId: "99",
    position: { latitude: args.latitude, longitude: args.longitude },
    appointmentAvailability: { startDateTime: startDate },
    radius: args.radius
};

fetch(mainUrl)
    .then(res => res.text())
    .then(body => fetch(availabilityUrl, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-xsrf-token": getMeta(body.toString())['_csrf']
        },
        "referrer": "https://www.walgreens.com/findcare/vaccination/covid-19/location-screening",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": JSON.stringify(requestBody),
        "method": "POST",
        "mode": "cors"
    })
        .then(res => res.json())
        .then(json => console.log(json.appointmentsAvailable))
    );
