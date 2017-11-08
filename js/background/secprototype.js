/**
 * Security Prototype Functionality
 */

var AUTHORIZED = false;

const switchAuthorizationStatus = function (resp) {
    this.AUTHORIZED = true;
};

// Authenticate the extension with Google
authenticateExtension(switchAuthorizationStatus);

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
        .then(fetchUserInterests)
        .then(fetchSafeBrowsingInformation)
        .then(analyzeEmail)
        .then(notifyUser);
};

/**
 * Placeholder function for handling our algorithm/email analysis.
 * @param params object containing the user's interests and thread emails
 * @returns {boolean}
 */
function analyzeEmail (params) {
    // TODO: Add email analysis algorithm here
    console.log(params);

    // TODO: currently our prototype will detect phishing if and only if Google's Safe Browsing API returns a threat
    // return our algorithms result to pass to the displayHtmlStatus function
    return params.linkThreats.length;
}