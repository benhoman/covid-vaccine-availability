const fetch = require('node-fetch');
const request = require('request');
const getMeta = require('lets-get-meta');
const mainUrl = "https://www.walgreens.com/findcare/vaccination/covid-19/location-screening";
const availabilityUrl = "https://www.walgreens.com/hcschedulersvc/svc/v1/immunizationLocations/availability";


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
        "body": "{\"serviceId\":\"99\",\"position\":{\"latitude\":41.0985461,\"longitude\":-74.3939339},\"appointmentAvailability\":{\"startDateTime\":\"2021-02-28\"},\"radius\":25}",
        "method": "POST",
        "mode": "cors"
    })
        .then(res => res.json())
        .then(json => console.log(json.appointmentsAvailable))
    );
