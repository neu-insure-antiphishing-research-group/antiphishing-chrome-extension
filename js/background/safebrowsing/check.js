/**
 * Written by Mike Rodrigues
 * Functionality to check with Google's Safe Browsing API
 */


const SAFE_BROWSING_QUERY_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + SAFE_BROWSING_API_KEY;

/**
 * Function to check with Google's Safe Browsing API to see if any URLs are malicious
 * @param urls list of url strings
 * @returns {promise}
 */
this.safeBrowsingCheck = function (urls) {
    return new Promise(function (resolve, reject) {
        var r = new XMLHttpRequest();

        r.onreadystatechange = function () {
            if ((r.readyState !== 4) || (r.status !== 200)) {
                return false;
            }

            return resolve(r.responseText);
        };

        var postBody = JSON.stringify({
            "client": {
                "clientId": 'insuresecurityprototype',
                "clientVersion": '1.0'
            },
            "threatInfo": {
                "threatTypes": ['MALWARE', 'SOCIAL_ENGINEERING'],
                "platformTypes": ['ANY_PLATFORM'],
                "threatEntryTypes": ['URL'],
                "threatEntries": _.map(urls, function (url) {
                    return {url: url};
                })
            }
        });

        r.open('POST', SAFE_BROWSING_QUERY_URL);
        r.send(postBody);
    })
        .then(responseParser);
};

/**
 * Helper function that parses the response and returns a list of identified threats
 * @param response XmlHTTPResponse object
 * @returns {*}
 */
function responseParser(response) {
    if (response && response.matches) {
        return response.matches;
    }
    return [];
}