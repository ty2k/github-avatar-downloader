// Require request
var request = require('request');

// Say hi to our user
console.log('Welcome to the GitHub Avatar Downloader!');

// Create getRepoContributors function with arguments repoOwner (user), repoName (project), and the callback function
function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

// Call getRepoContributors function with arguments jquery (user), jquery (project), and a function to log an error and results
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});