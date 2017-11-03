/**
 * Created by: Michael Rodrigues
 * URL Whitelisting Database
 */

const interestUrlWhitelist = {
    banks: {
        bankOfAmerica: {urls: ['bankofamerica.com', 'bofa.com']}
    },
    socialMedia: {
        facebook: {urls: ['facebook.com', 'messenger.com', 'fb.com']}
    },
    services: {
        apple: {urls: ['apple.com', 'mac.com', 'iphone.com']}
    }
};

// Publicly export the database
this.databases = {
    interests: interestUrlWhitelist
};

// Also, publicly export a flat version of the database (without category keys, ie. 'banks').
this.flattenedInterestDatabase = function () {
    return _.reduce(databases.interests, function (memo, subDoc) {
        var keys = _.keys(subDoc);

        _.each(keys, function (key) {
            memo[key] = subDoc[key];
        });

        return memo;
    });
};