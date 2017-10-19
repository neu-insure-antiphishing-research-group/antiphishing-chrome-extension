/**
 * Written by Mike Rodrigues
 * Adapted from https://gist.github.com/omarstreak/7908035c91927abfef59
 */

/**
 * Constants for the API ID, API Permissions requested, and the Google API JS Script URL
 */
const API_CLIENT_ID = '<REPLACE_WITH_GOOGLE_GMAIL_API_KEY_ID>',
    API_CLIENT_PERMISSION = 'https://www.googleapis.com/auth/gmail.modify',
    GAPI_SCRIPT_URL = 'https://apis.google.com/js/client.js';

/**
 * Performs OAuth 2 authentication with Google to authenticate the extension
 *   and authorizes the extension to use the Google APIs.
 * @param postAuthorizationFunction {function} Callback
 */
this.authenticateExtension = function (postAuthorizationFunction) {
    chrome.identity.getAuthToken({
        interactive: true
    }, function(){
        window.gapi_onload = function () {
            gapi.auth.authorize({
                    client_id: API_CLIENT_ID,
                    immediate: false,
                    scope: API_CLIENT_PERMISSION
                }, function(){
                    gapi.client.load('gmail', 'v1', postAuthorizationFunction);
                }
            );
        };
        downloadAndExecuteGoogleApiScript(GAPI_SCRIPT_URL);
    });
};

/**
 * Downloads the Google API JS script and evaluates the result to include the library
 *  Must be dynamically added after OAuth authentication.
 * @param url
 */
function downloadAndExecuteGoogleApiScript (url) {
    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
        if((r.readyState !== 4) || (r.status !== 200)) {
            return false;
        }

        eval(r.responseText);
    };

    r.open('GET', url);
    r.send();
}