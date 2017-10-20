/**
 * Written by Mike Rodrigues
 * Helper functions which process specific components of the email message data model
 */

// Empty email "part" in case only one of desired mime types is available
const EMPTY_BODY_DATA = {body: {data: ""}};

/**
 * Helper function that returns whether the email is unread or not
 * @param email
 * @returns {boolean}
 */
this.isEmailUnread = function (email) {
    return _.contains(email.labelIds, 'UNREAD');
};

/**
 * Helper function that searches for a message "part" with the given mime type.
 * @param parts Email "Part", which refers to the body "parts" of the message
 * @param mime "text/html" or "text/plain"
 * @returns {*} Email part which matches the provided mime type
 */
function findPartWithGivenMime (parts, mime) {
    // is list
    if (_.isArray(parts)) {
        // is a member of this array
        var searchResult = _.findWhere(parts, {mimeType: mime});
        if (!_.isUndefined(searchResult)) {
            return searchResult;
        }
        // is a part of one of these parts
        var parentPart = _.find(parts, function (part) {
            return findPartWithGivenMime(part, mime) !== EMPTY_BODY_DATA;
        });

        if (parent) {
            return findPartWithGivenMime(parentPart, mime);
        }
        // else empty case
        return EMPTY_BODY_DATA;
    }
    // is object
    else if (_.isObject(parts)) {
        // mimeType === mime
        if (mime === parts.mimeType) {
            return parts;
        }
        // else if parts.parts, recur
        else if (!_.isUndefined(parts.parts)) {
            return findPartWithGivenMime(parts.parts, mime);
        }
        // else body property or empty case
        return EMPTY_BODY_DATA;
    }
    return EMPTY_BODY_DATA;
}

this.parseHeaderProperty = function (prop, email) {
    var subject = _.findWhere(email.payload.headers, {name: prop});
    return (subject && subject.value) || ''; // Return header value, or blank string if no such property
};

/**
 * Decodes the Base 64 encoded message body components and returns them.
 *  If HTML and Text are available, then both will be returned {object}.
 *  Otherwise, the only available component will be returned {string}
 * @param email
 * @returns {object|string}
 */
this.decodeBodyContents = function (email) {
    try {
        if (email.payload.parts && email.payload.parts.length) {
            var htmlPart = findPartWithGivenMime(email.payload.parts, 'text/html'),
                textPart = findPartWithGivenMime(email.payload.parts, 'text/plain');

            return { // Only decode if there is actual data to decode
                html: htmlPart.body.data ? B64.decode(htmlPart.body.data) : htmlPart.body.data,
                text: textPart.body.data ? B64.decode(textPart.body.data) : textPart.body.data
            };
        }

        return {html: B64.decode(email.payload.body.data)};
    } catch (e) {
        console.log('Email that caused the error:', email);
        throw e;
    }
};