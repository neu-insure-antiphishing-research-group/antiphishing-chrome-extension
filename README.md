# INSuRE - Northeastern University IA 8660 Phishing
Google Chrome Extension Security Prototype

# Development
* Open the `manifest.json` and `js/background/constants.js` files in your favorite editor.
* Next, find the Google Chrome Web Store ID Key (`<REPLACE_WITH_KEY_FROM_GOOGLE_CHROME_STORE>`) in the WhatsApp chat, or follow this guide to find the key:
	* https://developer.chrome.com/apps/app_identity#copy_key
	* This key only appears in `manifest.json`.
* Then replace the Gmail API Key placeholder (`<REPLACE_WITH_GOOGLE_GMAIL_API_KEY_ID>`) 
	* This key was shared in the WhatsApp chat as well, but you can also create a new API key for yourself here: https://console.developers.google.com/apis/credentials. The steps to create the API key are as follows:
		* Create Credentials
		* OAuth client ID
		* Select Chrome App
		* Enter a name for the API key
		* Enter the application ID (`dnhelbabcagmogieibbhhmlmgfcmajon`)
	* This key should be inserted into the `manifest.json` and `js/background/constants.js` files.
* Finally, replace the Google Safe Browsing API Key placeholder (`<REPLACE_WITH_GOOGLE_SAFE_BROWSING_KEY`)
	* To create an API key, complete the following steps:
		* Open https://console.developers.google.com/apis/credentials
		* Create Credentials
		* API Key
		* Copy the API Key that is generated
		* Paste it in to replace the placeholder.
	* This key should be inserted into the `js/background/constants.js` file.

## Key Sensitivity
Since API Keys are inherently sensitive (as they can be used by others), they should not be checked into any public repositories.
If keys are "compromised" by being checked into a public repository, they should be revoked via the Google API Console and new keys should be generated.

## Loading into Chrome
* Go to chrome://extensions
* Click [x] Developer Mode
* Click "Load Unpacked Extension"
* Navigate to the directory where this repo is on your HDD
* Click "open"
* The extension is now loaded.

## Refreshing the Extension in Chrome after changes
This should be performed whenever updates are made locally to the Chrome Extension and you want to test them in Google Chrome.
* Go to chrome://extensions
* Find the extension in the listing
* Click on the "Reload" link 

## Troubleshooting
**Q:** The Chrome extension entered an authentication loop and keeps prompting me to login. What's happening/going wrong?

**A:** Unfortunately, this means that your Gmail API key probably has the wrong Chrome Extension ID. Please verify that the `ID` displayed for the extension on the `chrome://extensions` page is the same as what is provided for hte `Application ID` field for the API key in the Google Console (https://console.developers.google.com/apis/credentials).  If the issue persists, you may have the wrong Google Chrome Store key value in the `manifest.json` file. More specifically, the value used to replace `<REPLACE_WITH_KEY_FROM_GOOGLE_CHROME_STORE>` may not be correct.  