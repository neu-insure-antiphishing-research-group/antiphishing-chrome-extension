# Changes/Note Log

## 10/6/2017
* Paid $5 Google Developer Fee to publish extension to Google Chrome store
* Zipped initial prototype and uploaded to Google Chrome Store Dashboard
* Waited for Google to approve my initial prototype upload so that I can grab the ID
* With this, I can insert the correct Chrome extension ID
	* This will allow Chrome to grant our extension the correct permissions and authenticate properly via OAuth 2.
* Added additional resources to README
* **Gmail API successfully authenticating and loading!** 

## 10/9/2017
* Worked on rewriting Gmail functionality
	* Goal was to abstract the authorization and authentication functionality from the processing code.
	* Started to add functionality to read email body component of messages.

## 10/10/2017
* Added storage permissions and functionality for getting and setting lastCheckTime.
* Now retrieves email messages instead of threads (since we don't care about emails the user sends)
* Identifies whether email is unread or not (sets unread property on email doc).
* Also retrieves HTML and Text versions of email (if available), otherwise just retrieves the available representation and decodes it from Base 64.
	* The email message bodies are then stored on the email document as well under the payload property.
	
## 10/11/2017
* Abstracted the logic to allow us to add our logic in a separate file.
* Named the anonymous functions and added documentation for all functions developed thusfar.

## 10/13/2017
* Rewrote the email part parser to better accommodate all possible message parts
* Fixed an issue where email body parts with desired `mimeType` would not be found if nested under a different `mimeType`.
* Fixed the email date sorting issue so the newest emails are displayed first

## 10/16/2017
* Added initial HTML page which displays when the extension icon is clicked on.
	* This page will be used for storing user preferences.
* Added an icon to display for the extension. 