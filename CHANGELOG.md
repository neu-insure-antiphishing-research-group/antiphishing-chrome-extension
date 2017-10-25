# Changes/Note Log

## 10/6/2017 - Mike
* Paid $5 Google Developer Fee to publish extension to Google Chrome store
* Zipped initial prototype and uploaded to Google Chrome Store Dashboard
* Waited for Google to approve my initial prototype upload so that I can grab the ID
* With this, I can insert the correct Chrome extension ID
	* This will allow Chrome to grant our extension the correct permissions and authenticate properly via OAuth 2.
* Added additional resources to README
* **Gmail API successfully authenticating and loading!** 

## 10/9/2017 - Mike
* Worked on rewriting Gmail functionality
	* Goal was to abstract the authorization and authentication functionality from the processing code.
	* Started to add functionality to read email body component of messages.

## 10/10/2017 - Mike
* Added storage permissions and functionality for getting and setting lastCheckTime.
* Now retrieves email messages instead of threads (since we don't care about emails the user sends)
* Identifies whether email is unread or not (sets unread property on email doc).
* Also retrieves HTML and Text versions of email (if available), otherwise just retrieves the available representation and decodes it from Base 64.
	* The email message bodies are then stored on the email document as well under the payload property.
	
## 10/11/2017 - Mike
* Abstracted the logic to allow us to add our logic in a separate file.
* Named the anonymous functions and added documentation for all functions developed thusfar.

## 10/13/2017 - Mike
* Rewrote the email part parser to better accommodate all possible message parts
* Fixed an issue where email body parts with desired `mimeType` would not be found if nested under a different `mimeType`.
* Fixed the email date sorting issue so the newest emails are displayed first

## 10/16/2017 - Mike
* Added initial HTML page which displays when the extension icon is clicked on.
	* This page will be used for storing user preferences.
* Added an icon to display for the extension. 

## 10/18/2017 - Mike
* Added a listener for URL changes for Gmail where a user is viewing an email.
* Converted the existing architecture to fetch a single email on listener trigger.
* Created abstract functions to help us handle storage operations for user preferences.
* Added placeholder function that allows us to add our email analysis.
* Added placeholder function to alert the user of suspected phishing emails.

## 10/20/2017 - Mike
* Converted the code to retrieve the email thread since it was only retrieving the original email message.
* Removes sent emails from the thread since we are only scanning incoming email messages.
* Tweaked the email body parser response if only HTML is available.
* Limits the data that's returned per email to what is necessary to filter out properties that are unnecessary.
	* Added from, to, and subject properties - pulled from the headers
* Changed the extension name and description from Mike's PoC to "INSuRE - NEU Anti-Phishing Extension"

## 10/24/2017 - Mike
* Finally figured out message passing from the background scripts (security prototype logic) to the content script (js/dom.js) in order for us to notify the user of our findings via HTML pop-up notification.
	* Tried several different approaches over the past 3 days, but finally found Chrome Runtime Ports to communicate messages between the background and content scripts.
* Added development setup information and common issue troubleshooting info to the README. 