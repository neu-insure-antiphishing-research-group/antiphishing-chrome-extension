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

## 10/25/2017 - Mike
* Added a preliminary HTML popup page which prompts users for their interest information.
* Converted the page to use Bootstrap toggles for simple inputs (ideal for user experience).
* Wired the page to save to Chrome local storage (can be easily adapted if different storage option is chosen).
* Wired the page to retrieve and display interests on popup page load.
* Wired the page to allow users to reset their interests.
* Managed to link the background and content scripts to simplify the storage solution to use the same code/file.
 
## 10/26/2017 - Mike
* Converted the User Interests popup page to be dynamically generated.
	* This simplifies the form so that we only need to manage one list of interests.
	* The previous static design required static HTML creation and updates to the list in the JavaScript code as well.
	* Now, we only need to add items to the interests array in the JavaScript and the HTML will be generated.
	* Since there is one list, we won't have any issues with saving/loading/resetting values or typos causing bugs.
* Adding screenshot of dynamically generated UI.

## 10/27/2017 - Mike
* Identified a simple way to open the interests pop-up when the extension is installed.
* Implemented that approach, but the display is a little strange since the CSS was for the pop-up window.
* The CSS was broken in the full-page version based on the understanding that this was pop-up only.
	* Using @media selectors and CSS queries, I fixed the display CSS to allow for the same display on pop-up and full-page displays. 
* Parsing HTML body string to a DOM hierarchy via JQuery for an easier approach to finding 'a' tags in the HTML.
* Fixing an issue with the message sharing where the extension would hang if the background-content script port connection was not established.
	* Added a console message to explain what is happening and how to fix it.
	* Also reworked the message sharing component in the background script to allow execution to continue.
* Adding documentation to the js/ui/interests.js file functions.
* Converting the user notification to use the chrome.notifications API to fix a bug and improve reliability.
	* Notifications appear for about 5 seconds in the top right corner of Chrome and then automatically disappear automatically.
	* The message can be fine-tuned later on too depending on the results.
	
## 11/1/2017 - Mike
* Implementing the "database" storage approach that we discussed in class last Friday.
	* Also added a function which "flattens" the database so we can programmatically access the interests by key without needing to deal with the categories that are built into the DB structure.
* Adding a screenshot of the email console output for use in our midterm presentation slides.
* This will likely be expanded upon to link the UI form creation to this DB so that we will have a single list of interests to be updated.

## 11/2/2017 - Mike
* Implementing the parsing of A tag HREF attributes (URL Links) from the JQuery parsed HTML (DOM element array)
	* Finds the A tags, then pulls just the href attribute from the tag.
	* All links from emails will now be accessible via the 'links' attribute of the message object that our security prototype will review.

## 11/3/2017 - Mike
* Adding functionality to retrieve the user's interests in our secprototype.js file
* Merges the user's interests with the data from our file database
* Returns this merged information to our security prototype analysis function.
* Converts the UI to generate the interests inputs based on the interests listed in the database.
	* Converted to a single list for simpler updating.
	* Provides us with more information on the UI too, which allows for future feature additions.
	
## 11/8/2017 - Mike
* Integrating Google's Safe Browsing API to check the links that in each email.
	* Encountered an issue where the API was returning a 400 response when it should have been a 403 per Google's API documentation.
	* Quite simply, the API key was incorrect (was trying to use the OAuth ID instead of a new API Key).
* Modified Safe browsing API check to only occur once per email thread to save calls and time.
	* All links are aggregated and then checked by the API.
	* We then have access to all threats, threat type, and the associated link in our analysis function.
* Found a bug where the URL listener wasn't firing for emails with specific labels (eg. the Promotions label in Gmail).
	* Identified that the Regex was not matching, so I updated the Regex so it will trigger for these URL formats as well.
* Updating to version 2.0
* Adding cropped version of icon and mini version for Chrome Web Store.

## 11/14/2017 - Mike
* Adding functionality to split messages to get a list of number of times each word occurs in messages.
* Adding keyword database of phishing keywords
	* Added temporary values, which will be updated as soon as correct keywords are obtained from Harshit.
* Word frequency mapping is passed to our security prototype algorithm analysis function for final review.
* Fixing bug where 'tel:' links were breaking Google Safe Browsing check

## 11/15/2017 - Mike
* Fixing a bug where plaintext message splitting would fail and then analysis would not occur.
* Adding keyword mapping aggregation code for a single lookup table.
* Adding code to check for keyword matches against the keyword list.
	* Currently tallies the number of matches
	* Also currently tallying the total number of words in all emails (in case the algorithm uses a ratio)
* Development is now blocked until Roshan, Harshit, and/or Anurag send me the list of keywords and the algorithm pseudo code so that I can begin implementing those aspects.  Without the keywords or algorithm pseudo code, I cannot proceed with the development aspect as all other components have been implemented thusfar.

## 11/17/2017 - Mike
* Deriving domains of email links and adding to analysis object.
* Rewriting algorithm function to make decisions and flow clearer.
* Adding the URL whitelisting check based on pseudocode that was provided yesterday (11/16/17).
	* Modified a little based on what is technically feasible given the remaining time left in the semester.
	* Helper functions for keyword checks and domain whitelisting checks
* Keywords will be added in next commit.

## 12/1/2017 - Mike
* Fixed domain parsing bugs which caused the domain to be incorrectly parsed.
* Added an alternative approach to parse links from the messages for good measure.
* Adding a screenshot from the testing phase, which correctly identified a phishing attack.

## 12/6/2017 - Mike
* Fixing a few remaining issues prior to final testing.
* Adding ITS Library interest and whitelisted URLs for testing.