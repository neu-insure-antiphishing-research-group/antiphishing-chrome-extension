/**
 * Security Prototype Functionality
 */

this.AUTHORIZED = false;

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
        .then(analyzeEmail);
};

function analyzeEmail (receivedEmailsInThread) {
    // TODO: Add email analysis algorithm here
    console.log(receivedEmailsInThread);

    var isPhishing = false;

    if (isPhishing) {
        alertUser('Attention: Suspected phishing email! Be cautious!');
    }
}