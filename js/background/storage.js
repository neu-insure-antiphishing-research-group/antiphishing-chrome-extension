/**
 * Written by Mike Rodrigues
 */

const KEYS = {
    background: {},
    ui: {
        userInterests: 'userInterests'
    }
};

const createRetrieveKeyFunction = function (key) { // createRetrieveKeyFunction('userInterests')
        return function (cb) {
            chrome.storage.sync.get(key, cb);
        }
    },
    createSetKeyFunction = function (key) { // createRetrieveKeyFunction('userInterests')
        return function (val, cb) {
            var doc = {};
            doc[key] = val;
            chrome.storage.sync.set(doc, cb ? cb : _.noop);
        }
    },
    createRemoveKeyFunction = function (key) {
        return function (cb) {
            chrome.storage.sync.remove(key, cb);
        }
    };

var storage = {
    /**
     * Debug function used to clear extension storage
     * @param cb optional callback function
     */
    clearStorage: function (cb) {
        chrome.storage.sync.clear(cb)
    }
};

this.extensionStorage = storage;

var ui = {
    saveInterests: createSetKeyFunction(KEYS.ui.userInterests),

    retrieveInterests: createRetrieveKeyFunction(KEYS.ui.userInterests),

    resetInterests: createRemoveKeyFunction(KEYS.ui.userInterests)
};

/**
 * Content Script function to save user interests
 */
this.ui = ui;