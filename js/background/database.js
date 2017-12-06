/**
 * Created by: Michael Rodrigues
 * URL Whitelisting Database
 */

const interestUrlWhitelist = {
    email: {
        zimbra: {
            name: 'CCIS Zimbra',
            urls: ['zimbra.ccs.neu.edu', 'zimbra.ccis.neu.edu', 'ccs.neu.edu', 'ccis.neu.edu', 'www.zimbra.com', 'sts.northeastern.edu', 'www.northeastern.edu', 'www.my.northeastern.edu', 'www.myneu.neu.edu', 'library.northeastern.edu', 'onesearch.library.northeastern.edu', 'nuonline.neu.edu']
        }
    },
    services: {
        itsLibrary: {
            name: 'ITS Library',
            urls: ['library.neu.edu', 'library.northeastern.edu', 'onesearch.neu.edu']
        }
    },
    banks: {
        bankOfAmerica: {
            name: 'Bank of America',
            urls: ['bankofamerica.com', 'bofa.com']
        }
    },
    socialMedia: {
        facebook: {
            name: 'Facebook',
            urls: ['facebook.com', 'messenger.com', 'fb.com']
        }
    },
    stores: {
        apple: {
            name: 'Apple',
            urls: ['apple.com', 'mac.com', 'iphone.com']
        }
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

/**
 * Helper function that combines the user's stored interests and the database info
 * @returns {Promise} value provided to .then will be an object with
 */
this.createDbUserInterestsCombo = function () {
    var interestsDatabase = flattenedInterestDatabase();

    // Allow us to return the interests into the Promise chain despite the
    //   storage functions requiring a callback
    return new Promise(function (resolve, reject) {
        ui.retrieveInterests(function (data) {
            data.userInterests = data.userInterests ? data.userInterests : {};

            // Merge the user's selected interests with the database values
            _.each(data.userInterests, function (value, key) {
                interestsDatabase[key].userHoldsAccount = value;
            });

            // Returns the merged interests data and the thread emails
            return resolve(interestsDatabase);
        });
    });
};

/**
 * Helper function for our secprototype.js file that adds user interests for our analysis.
 * @param emails
 * @returns {*}
 */
this.fetchUserInterests = function (emails) {
    return createDbUserInterestsCombo()
        .then(function (interests) {
            return {
                interests: interests,
                emails: emails
            };
        })
};