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
        .then(analyzeEmail)
        .then(notifyUser);
};

/**
 * Placeholder function for handling our algorithm/email analysis.
 * @param receivedEmailsInThread array of email objects
 * @returns {boolean}
 */
function analyzeEmail (receivedEmailsInThread) {
    // TODO: Add email analysis algorithm here
    var interestsDatabase = flattenedInterestDatabase();
    console.log(receivedEmailsInThread);

    // return our algorithms result to pass to the displayHtmlStatus function
    return false;
}