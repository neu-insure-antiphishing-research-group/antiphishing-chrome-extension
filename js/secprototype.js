/**
 * Created by Mike Rodrigues
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
 * @param emailId
 */
this.triggerEmailAnalysis = function (emailId) {
    this.retrieveSingleEmail(emailId)
        .then(analyzeEmail);
};

function analyzeEmail (email) {
    // TODO: Add email analysis algorithm here
    console.log(email);

    var isPhishing = false;

    if (isPhishing) {
        alertUser('Attention: Suspected phishing email! Be cautious!');
    }
}