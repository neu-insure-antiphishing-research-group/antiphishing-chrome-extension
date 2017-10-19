/**
 * Written by Mike Rodrigues
 */

const createRetrieveKeyFunction = function (key) { // createRetrieveKeyFunction('userInterests')
        return function (cb) {
            chrome.storage.sync.get(key, cb);
        }
    },
    createSetKeyFunction = function (key) { // createRetrieveKeyFunction('userInterests')
        return function (val, cb) {
            var doc = {};
            doc[key] = val;
            chrome.storage.sync.set(doc, cb);
        }
    };

var storage = {
    /**
     * Debug function used to clear extension storage
     * @param cb optional callback function
     */
    clearStorage: function (cb) {
        chrome.storage.sync.clear()
    }
};

this.extensionStorage = storage;