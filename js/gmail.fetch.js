/**
 * Written by Mike Rodrigues
 * Email Processing Functionality
 */

/**
 * Retrieves a single email by id
 * @param emailId {String} email message id
 * @return {promise}
 */
this.retrieveSingleEmail = function (emailId) {
    return gapi.client.gmail.users.messages.get({
        userId: 'me',
        id: emailId
    })
        .then(preProcessEmails)
};

/**
 * Pre-processes email messages:
 *      - adds the unread, emailDate, and emailMessage properties to the email
 * @param email {object} email message
 * @returns {object} email
 */
function preProcessEmails (email) {
    // Add the unread, emailDate, and emailMessage properties
    email.unread = isEmailUnread(email);
    email.emailDate = new Date(parseInt(email.result.internalDate));
    email.result.payload.emailMessage = decodeBodyContents(email);

    return email;
}