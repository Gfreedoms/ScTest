SocialCounts Widget

SocialCounts is a widget that watches a certain facebook page and displays the number of likes for that particular page in a given mendix application.


The SocialCounts widget contains:
- Directory structure
- Readme.md
 Typescript source
- XSD for package.xml, to configure properties of the widget, visible inside the
 Mendix business modeler

Prerequisites

Visio Studio code for code testing and development
Mendix businness modeler so that you can run the application in the browser
npm so that you can get the project dependencies in your project folder
node modules to have if they are not installed during npm install

Example on how to install them

npm install
npm install --node-modules

How to get the development environment running

After installing visio studio code and the mendix busness modeler , open the project files with visio studio code and run the grunt command. This will run the default tasks as specified in the grunt file such as grunt build ,copy , compress. 
This will  help to generate a file with a .mpk extension in the dist folder. On clicking that file, your application will be launched in the business modeler where one can continue to view the widget in the browser


Additional notes about how to deploy this on a live system
Built With

    Mendix - is a low-code, high-productivity platform that enables enterprises to transform how their organizations innovate and compete with applications.
    Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.

We use SemVer for versioning.

Contributors

Muloki Samuel
Freedom Gemmar




