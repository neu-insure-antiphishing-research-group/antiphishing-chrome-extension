/**
 * Written by: Mike Rodrigues
 * Links DOM elements to event listeners so that we can perform onclick actions
 *   within the HTML page.  By default, Chrome Extensions do not allow inline
 *   JavaScript call attributes (ie. onclick) for security reasons.
 */

const interests = [
    { id: 'apple', name: 'Apple' },
    { id: 'facebook', name: 'Facebook' }
];

document.addEventListener('DOMContentLoaded', function() {
    ui.retrieveInterests(buildInterestsForm);

    // Connect an onclick listener for the close icon
    document.getElementById('close-icon').addEventListener('click', closeWindow);

    // Connect an onclick listener for the reset and save buttons
    document.getElementById('reset-button').addEventListener('click', clearInterests);
    document.getElementById('save-button').addEventListener('click', processInterests);
});

function clearInterests () {
    _.each(interests, function (interest) {
       $('#' + interest.id).bootstrapToggle('off');
    });

    ui.resetInterests(function () {
        ui.retrieveInterests(buildInterestsForm);
    });
}

function buildInterestLabel (interest) {
    var label = document.createElement('label'),
        labelText = document.createTextNode(interest.name);

    label.className = 'col-xs-8';
    label.appendChild(labelText);

    return label;
}

function buildInterestInput (interest) {
    var input = document.createElement('input');

    input.id = interest.id;
    input.title = interest.name;
    input.className = 'col-xs-2';
    input.type = 'checkbox';

    return input;
}

function buildSocialMediaDiv (interest) {
    var div = document.createElement('div'),
        label = buildInterestLabel(interest),
        input = buildInterestInput(interest);

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function buildInterestsForm (savedData) {
    var form = document.getElementById('form'),
        socialMediaDiv = document.getElementById('social-media');

    socialMediaDiv.innerHTML = '';

    _.each(interests, function (interest) {
        var div = buildSocialMediaDiv(interest);

        socialMediaDiv.append(div);

        var input = $('#' + interest.id);

        input.bootstrapToggle({
            on: 'Yes',
            off: 'No'
        });

        var checked = savedData && savedData.userInterests && savedData.userInterests[interest.id] || false;
        input.bootstrapToggle(checked ? 'on' : 'off');
    });
}

function processInterests () {
    var form = document.getElementById('form'),
        saveData = {};

    _.each(interests, function (interest) {
        saveData[interest.id] = form[interest.id].checked;
    });

    ui.saveInterests(saveData);
}

function closeWindow () {
    return window.close();
}