import Parse from "parse/dist/parse.min.js";

// Initialize Parse
// Parse.initialize("myAppId", "myJavascriptKey"); // Replace with your keys
// Parse.serverURL = "http://localhost:1337/parse"; // Replace with your Parse Server URL

Parse.initialize("myAppId", "myMasterKey");
Parse.serverURL = "http://localhost:1337/parse";
export default Parse;