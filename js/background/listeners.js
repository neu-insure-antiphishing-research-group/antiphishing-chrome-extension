/**
 * Written by Mike Rodrigues
 * Event Listeners
 */

const GMAIL_EMAIL_URL_REGEX = /(http|https):\/\/mail.google.com\/mail\/.*\/#inbox\/[1234567890abcdef]{16}/,
    GMAIL_EMAIL_ID_REGEX = /[1234567890abcdef]{16}$/;

/**
 * Parses and returns the email id from a Gmail Email URL
 * @param url {String} URL
 * @returns {String} Email Message Id
 */
const parseThreadId = function (url) {
    var matches = url.match(GMAIL_EMAIL_ID_REGEX);
    return matches ? matches[0] : matches;
};

/**
 * URL Update Handler
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    // If there's a changeInfo status which is 'complete' and we were allowed to
    //   access the URL (extension was permitted)
    if (changeInfo.status &&
        changeInfo.status === 'complete' &&
        tab.url &&
        tab.url.match(GMAIL_EMAIL_URL_REGEX)) {

        // Trigger the email analysis:
        triggerEmailAnalysis(parseThreadId(tab.url));
    }

    /*
       Else, it was a URL change that the extension does not have permission for
         and therefore we do not need to do anything
     */
});

/**
 * Open the interests pop-up on extension install.
 */
chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "main.html"}, _.noop);
});