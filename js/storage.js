/**
 * Written by Mike Rodrigues
 */

var storage = {
    /**
     * Retrieves the lastCheckTime property from storage
     * @param cb Callback function
     */
    retrieveLastCheckTime: function (cb) {
        chrome.storage.sync.get('lastCheckTime', cb);
    },

    /**
     * Sets the lastCheckTime property in storage
     * @param time representation of time
     * @param cb Callback function
     */
    setLastCheckTime: function (time, cb) {
        chrome.storage.sync.set({lastCheckTime: time}, cb);
    },

    /**
     * Debug function used to clear extension storage
     * @param cb optional callback function
     */
    clearStorage: function (cb) {
        chrome.storage.sync.clear()
    }
};

this.extensionStorage = storage;