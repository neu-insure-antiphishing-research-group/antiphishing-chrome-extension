/**
 * Written by Mike Rodrigues
 * Security Prototype Functionality
 */

/**
 * Helper function which launches the extension's code after OAuth authentication
 */
function processMail () {
    extensionStorage.retrieveLastCheckTime(fetchEmails);
}

/**
 * Wrapper function which calls gmail.fetch functions and then executes our logic
 * @returns {promise}
 */
function fetchEmails() {
    return listEmailMessages()
        .then(pluckMessages)
        .then(retrieveEmailMessages)
        .then(preProcessEmails)
        // TODO: remove console.log
        .then(console.log);
}

// Perform OAuth authentication with Google and then begin to process emails
authenticateExtension(processMail);