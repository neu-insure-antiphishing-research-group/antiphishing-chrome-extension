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
        .then(analyzeEmail)
        .then(notifyUser);
};

function fetchUserInterests(receivedEmailsInThread) {
    var interestsDatabase = flattenedInterestDatabase();

    // Allow us to return the interests into the Promise chain despite the
    //   storage functions requiring a callback
    return new Promise(function (resolve, reject) {
        ui.retrieveInterests(function (data) {
            data.userInterests ? data.userInterests : {};

            // Merge the user's selected interests with the database values
            _.each(data.userInterests, function (value, key) {
                interestsDatabase[key].userHoldsAccount = value;
            });

            // Returns the merged interests data and the thread emails
            return resolve({
                interests: interestsDatabase,
                receivedEmailsInThread: receivedEmailsInThread
            });
        });
    });
}

/**
 * Placeholder function for handling our algorithm/email analysis.
 * @param params object containing the user's interests and thread emails
 * @returns {boolean}
 */
function analyzeEmail (params) {
    // TODO: Add email analysis algorithm here
    console.log(params);

    // return our algorithms result to pass to the displayHtmlStatus function
    return false;
}