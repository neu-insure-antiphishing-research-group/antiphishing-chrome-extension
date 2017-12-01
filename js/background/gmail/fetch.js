/**
 * Written by Mike Rodrigues
 * Email Processing Functionality
 */

const URL_LINK_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g;

/**
 * Retrieves a single email by id
 * @param threadId {String} message thread id
 * @return {promise}
 */
this.retrieveEmailThread = function (threadId) {
    return gapi.client.gmail.users.threads.get({
        userId: 'me',
        id: threadId
    })
        .then(pluckEmailsFromThread)
        .then(filterOutSentEmails)
        .then(processEmails);
};

/**
 * Simply returns the messages from the thread object that is returned
 * @param thread
 * @returns {*|Object}
 */
function pluckEmailsFromThread (thread) {
    return thread && thread.result && thread.result.messages;
}

/**
 * Returns a list of emails that were not sent by the user.
 *   - This checks the labelIds, which will contain the 'SENT' element if the
 *     user sent the email message.
 * @param emails
 */
function filterOutSentEmails (emails) {
    return _.reject(emails, function (email) {
        return _.contains(email.labelIds, 'SENT');
    });
}

/**
 * Processes a single email:
 *   - adds the unread, emailDate, and emailMessage properties to the email
 * @param email
 * @returns {*}
 */
function processSingleEmail (email) {
    // Return an object with just the following properties from the emails
    var msg = {
        emailId: email.id,
        from: parseHeaderProperty('From', email),
        to: parseHeaderProperty('To', email),
        unread: isEmailUnread(email),
        internalDate: new Date(parseInt(email.internalDate)),
        subject: parseHeaderProperty('Subject', email),
        emailMessage: decodeBodyContents(email)
    };
    msg.wordMap = createWordMapFromMessage(msg.emailMessage);

    // If an HTML body part exists for the message, convert it to a DOM representation via Jquery
    if (msg.emailMessage.html) {
        var htmlMessageString = JSON.parse(JSON.stringify(msg.emailMessage.html));
        msg.emailMessage.html = $.parseHTML(msg.emailMessage.html);
        var allATags = $('a', msg.emailMessage.html),
            regexLinks = htmlMessageString.match(URL_LINK_REGEX);

        msg.links = _.uniq(_.map(allATags, parseHrefFromATag).concat(regexLinks));
    }

    return msg;
}

/**
 * Processes a list of email messages by calling processSingleMessage on each
 * @param emails {array[object]} email message
 * @returns {object} email
 */
function processEmails (emails) {
    return _.map(emails, processSingleEmail);
}

/**
 * Creates a single mapping of all words that occur in all emails to their frequencies
 * @param params
 */
this.createKeywordMap = function (params) {
    var emails = params.emails;

    var keywords = _.pluck(emails, 'wordMap');
    var totalNumWords = 0;

    // Walk through all frequency mappings and tally the occurrences per word
    params.keywordMap = _.reduce(keywords, function (keywordMapping, keywordMap) {
        _.each(keywordMap, function (value, key) {
            var currentVal = keywordMapping[key];
            totalNumWords += value;
            keywordMapping[key] = currentVal ? currentVal + value : value;
        });

        return keywordMapping;
    }, {});
    params.totalNumWords = totalNumWords;

    return params;
};