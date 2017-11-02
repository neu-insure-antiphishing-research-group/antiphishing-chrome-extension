/**
 * Created by: Michael Rodrigues
 * URL Whitelisting Database
 */

const interestUrlWhitelist = {
    banks: {
        bankOfAmerica: ['bankofamerica.com', 'bofa.com']
    },
    socialMedia: {
        facebook: ['facebook.com', 'messenger.com', 'fb.com']
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