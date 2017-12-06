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
 * Algorithm for our behavioral analysis of emails
 * @param params object containing the user's interests and thread emails
 * @returns {boolean} true --> is a phishing email, false --> not a phishing email
 */
function analyzeEmail (params) {
    console.log(params);

    // If there are no links, then there is no phishing attack
    if (params.emailLinks.length === 0) {
        return false;
    }
    // If there are threats registered at any of the links
    else if (params.linkThreats.length > 0) {
        return true;
    }

    var numKeywordMatches = checkForKeywordMatches(params.keywordMap);
    var allLinkDomainsWhitelisted = areLinkDomainsWhitelisted(params.interests, params.linkDomains);

    if (numKeywordMatches > 0 && !allLinkDomainsWhitelisted) {
        return true;
    }

    // otherwise, no triggers were activated
    return false;
}

/**
 * Checks for keyword matches and returns the number of matches
 * @param keywordMap map of words to their frequencies
 * @returns {number} number of occurrences of phishing keywords
 */
function checkForKeywordMatches(keywordMap) {
    var numKeywordMatches = 0;
    _.each(PHISHING_KEYWORDS, function (phishingKeyword) {
        if (keywordMap[phishingKeyword]) {
            numKeywordMatches++;
        }
    });
    return numKeywordMatches;
}

/**
 * Checks to see if all links in the email are whitelisted per user's interests
 * @param interests {object} user interests database object
 * @param domains {list[string]} URL domains appearing in email links
 * @returns {boolean} true --> all domains whitelisted, false --> other domains appear (phishing attack?)
 */
function areLinkDomainsWhitelisted(interests, domains) {
    var userAcctDomainWhitelist = [];
    _.each(interests, function (value, interestKey) {
        if (value.userHoldsAccount) {
            userAcctDomainWhitelist = userAcctDomainWhitelist.concat(value.urls);
        }
    });

    return _.reduce(domains, function (acc, domain) {
        return acc && _.contains(userAcctDomainWhitelist, domain);
    }, true);
}