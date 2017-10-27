/**
 * Written by Mike Rodrigues
 * Links DOM elements to event listeners so that we can perform onclick actions
 *   within the HTML page.  By default, Chrome Extensions do not allow inline
 *   JavaScript call attributes (ie. onclick) for security reasons.
 */

/**
 * A list of all interests which will be displayed in the HTML pop-up.
 */
const interests = [
    { id: 'apple', name: 'Apple' },
    { id: 'facebook', name: 'Facebook' }
];

/**
 * A listener which fires when our interests page loads.
 * This is needed, since Google Chrome Extensions cannot use 'onclick' attributes
 * Instead, we need to add event listeners to the buttons
 */
document.addEventListener('DOMContentLoaded', function() {
    ui.retrieveInterests(buildInterestsForm);

    // Connect an onclick listener for the close icon
    document.getElementById('close-icon').addEventListener('click', closeWindow);

    // Connect an onclick listener for the reset and save buttons
    document.getElementById('reset-button').addEventListener('click', clearInterests);
    document.getElementById('save-button').addEventListener('click', processInterests);
});

/**
 * Resets the form and clears all saved values
 */
function clearInterests () {
    _.each(interests, function (interest) {
       $('#' + interest.id).bootstrapToggle('off');
    });

    ui.resetInterests(function () {
        ui.retrieveInterests(buildInterestsForm);
    });
}

/**
 * Creates the label for each interest
 * @param interest
 * @returns {Element}
 */
function buildInterestLabel (interest) {
    var label = document.createElement('label'),
        labelText = document.createTextNode(interest.name);

    label.className = 'col-xs-8';
    label.appendChild(labelText);

    return label;
}

/**
 * Creates the input for each interest
 * @param interest
 * @returns {Element}
 */
function buildInterestInput (interest) {
    var input = document.createElement('input');

    input.id = interest.id;
    input.title = interest.name;
    input.className = 'col-xs-2';
    input.type = 'checkbox';

    return input;
}

/**
 * Function which builds the div element for each interest
 *   This uses helper functions to create the associated label and inputs.
 * @param interest
 * @returns {Element}
 */
function buildInterestDiv (interest) {
    var div = document.createElement('div'),
        label = buildInterestLabel(interest),
        input = buildInterestInput(interest);

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

/**
 * Function which builds the interests form based on the interests array defined
 *   at the top of this file.  This also pre-populates the toggles with the saved
 *   input values, which are retrieved via the functions in js/background/storage.js
 * @param savedData
 */
function buildInterestsForm (savedData) {
    var interestsDiv = document.getElementById('interests');

    // clear the form
    interestsDiv.innerHTML = '';

    // for each interest, build the div, and set the default value
    _.each(interests, function (interest) {
        // construct the div element for each
        var div = buildInterestDiv(interest);

        // append the created div into the form
        interestsDiv.append(div);

        // retrieve the injected input
        var input = $('#' + interest.id);

        // instantiate the input that was added as a Bootstrap Toggle switch
        input.bootstrapToggle({
            on: 'Yes',
            off: 'No'
        });

        // set the value of the toggle based on the saved value
        var checked = savedData && savedData.userInterests && savedData.userInterests[interest.id] || false;
        input.bootstrapToggle(checked ? 'on' : 'off');
    });
}

/**
 * A processing function, which retrieves each interest's value and sends it to
 *   the ui.saveInterests function in js/background/storage.js
 */
function processInterests () {
    var form = document.getElementById('form'),
        dataToSave = {};

    _.each(interests, function (interest) {
        dataToSave[interest.id] = form[interest.id].checked;
    });

    ui.saveInterests(dataToSave);
}

/**
 * Simple function to allow users to close the pop-up window by clicking the 'X'
 */
function closeWindow () {
    return window.close();
}