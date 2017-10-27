/**
 * Security Prototype Functionality
 */

var AUTHORIZED = false;
var PORT = null;

const switchAuthorizationStatus = function (resp) {
    this.AUTHORIZED = true;
};

// Authenticate the extension with Google
authenticateExtension(switchAuthorizationStatus);

/**
 * Listens for incoming port connections and opens the "backend" port connection
 */
chrome.runtime.onConnect.addListener(function(port) {
    console.log('port established');
    PORT = port;
});

/*******************************************************************************
 * Email Analysis Functions:
 */

/**
 * Function to start our email analysis
 *   Triggered from the listeners.js file by URL change (if a permitted URL)
 * @param threadId
 */
this.triggerEmailAnalysis = function (threadId) {
    retrieveEmailThread(threadId)
        .then(analyzeEmail)
        .then(displayHtmlStatus)
};

/**
 * Placeholder function for handling our algorithm/email analysis.
 * @param receivedEmailsInThread array of email objects
 * @returns {boolean}
 */
function analyzeEmail (receivedEmailsInThread) {
    // TODO: Add email analysis algorithm here
    console.log(receivedEmailsInThread);

    // return our algorithms result to pass to the displayHtmlStatus function
    return false;
}

/**
 * Function which passes a message via a Chrome "port" from the background to the
 *   content scripts since they cannot communicate directly in a Chrome extension.
 * @param isPhishingEmail
 */
function displayHtmlStatus(isPhishingEmail) {
    // A port should be opened as soon as the user loads the page. If one has been connected:
    if (PORT) {
        // Alert the listener in js/content/dom.js so that we can inform the user
        return PORT.postMessage(isPhishingEmail);
    }

    // This will most likely occur in local development only. Simply refreshing the page fixes the problem.
    return console.error('Cannot notify the user: No port was connected. This is because the extension was initialized after the inbox was loaded. Please reload the inbox to allow the port to connect.');
}