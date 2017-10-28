/**
 * Written by Mike Rodrigues
 * Helper functions which create notifications via the Chrome Notifications API
 */

const HIGH_PRIORITY = 2,
    DEFAULT_PRIORITY = 0;

this.notifyUser = function (isPhishing) {
    chrome.notifications.create({
        type:     'basic',
        iconUrl:  'icon.png',
        title:    'INSuRE Anti-Phishing Analysis',
        message:  isPhishing ? 'A phishing attack was detected!' : 'No phishing was detected.', // TODO: formalize this.
        priority: isPhishing ? HIGH_PRIORITY : DEFAULT_PRIORITY
    });
};