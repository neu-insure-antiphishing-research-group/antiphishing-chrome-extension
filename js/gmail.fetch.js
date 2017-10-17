/**
 * Written by Mike Rodrigues
 * Email Processing Functionality
 */

/**
 * Retrieves a page of email threads
 * @param pageToken (optional) Token which allows for subsequent email pages to be retrieved
 * @return {promise}
 */
this.listEmailMessages = function (pageToken) {
    return gapi.client.gmail.users.messages.list({
        userId: 'me',
        pageToken: pageToken
    });
};

/**
 * Retrieves the emails from the Gmail API list response
 * @param response
 * @returns {array[object]}
 */
this.pluckMessages = function (response) {
    return response.result.messages;
};

/**
 * Retrieves the detailed message info for each email that was listed
 * @param emailList
 * @returns {gapi.client.newBatch}
 */
this.retrieveEmailMessages = function (emailList) {
    var batchRequest = new gapi.client.newBatch();

    _.forEach(emailList, function (email) {
        batchRequest.add(gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: email.id
        }));
    });

    return batchRequest;
};

/**
 * Pre-processes the email messages:
 *      - adds the "unread" and "emailMessage" properties to each email message
 *      - sorts the emails according to the internalDate of each email
 * @param emails
 * @returns {array[messages]} sorted
 */
this.preProcessEmails = function (emails) {
    emails = emails.result;

    var pluckedEmails = [];

    _.each(emails, function (emailData) {
        // Add the unread and emailMessage properties
        emailData.unread = isEmailUnread(emailData);
        emailData.emailDate = new Date(parseInt(emailData.result.internalDate));
        emailData.result.payload.emailMessage = decodeBodyContents(emailData);
        pluckedEmails.push(emailData);
    });
    return _.sortBy(pluckedEmails, 'emailDate').reverse();
};