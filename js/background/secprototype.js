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
        .then(createKeywordMap)
        .then(analyzeEmail)
        .then(notifyUser);
};

/**
 * Placeholder function for handling our algorithm/email analysis.
 * @param params object containing the user's interests and thread emails
 * @returns {boolean}
 */
function analyzeEmail (params) {
    console.log(params);

    // TODO: currently our prototype will detect phishing if and only if Google's Safe Browsing API returns a threat

    var numKeywordMatches = 0;
    _.each(PHISHING_KEYWORDS, function (phishingKeyword) {
        if (params.keywordMap[phishingKeyword]) {
            numKeywordMatches++;
        }
    });

    console.log('Number of keyword matches: ' + numKeywordMatches);

    // return our algorithm's result in order to notify the user
    //  false --> no phishing detected
    //  true  --> phishing detected
    return params.linkThreats.length;
}