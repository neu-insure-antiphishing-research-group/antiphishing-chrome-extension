/**
 * Written by: Mike Rodrigues
 * Links DOM elements to event listeners so that we can perform onclick actions
 *   within the HTML page.  By default, Chrome Extensions do not allow inline
 *   JavaScript call attributes (ie. onclick) for security reasons.
 */

const interestIds = ['apple'];

document.addEventListener('DOMContentLoaded', function() {
    ui.retrieveInterests(loadInterests);

    // Connect an onclick listener for the close icon
    document.getElementById('close-icon').addEventListener('click', closeWindow);

    // Connect an onclick listener for the reset and save buttons
    document.getElementById('reset-button').addEventListener('click', clearInterests);
    document.getElementById('save-button').addEventListener('click', processInterests);
});

function clearInterests () {
    _.each(interestIds, function (interestId) {
       $('#' + interestId).bootstrapToggle('off');
    });

    ui.resetInterests(function () {
        ui.retrieveInterests(loadInterests);
    });
}

function loadInterests (data) {
    var form = document.getElementById('form');
    console.log(data);
    if (data && data.userInterests) {
        _.each(_.keys(data.userInterests), function (interestKey) {
            var checked = data.userInterests[interestKey];
            $('#' + interestKey).bootstrapToggle(checked ? 'on' : 'off');
        });
    }
}

function processInterests () {
    var form = document.getElementById('form'),
        interests = {};

    _.each(interestIds, function (interestId) {
        interests[interestId] = form[interestId].checked;
    });

    ui.saveInterests(interests);
}

function closeWindow () {
    return window.close();
}