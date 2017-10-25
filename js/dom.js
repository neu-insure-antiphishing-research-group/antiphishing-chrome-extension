/**
 * Written by: Mike Rodrigues
 * User Interface Notification Listener and Display Functions
 */

const EXTENSION_ID = 'dnhelbabcagmogieibbhhmlmgfcmajon';
// Create a Chrome runtime port to receive messages from the background scripts
var port = chrome.runtime.connect(EXTENSION_ID, {name: 'INSuRE Content Port'});

/**
 * Configure a listener for messages from the background scripts.  This is used
 *   to learn when and what we need to display to users to inform them of our
 *   security prototype's findings.
 */
port.onMessage.addListener(function (data, sender) {
    alert('isPhishing: ' + JSON.stringify(data));
});