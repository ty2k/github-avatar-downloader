// Require request
var request = require('request');

// Say hi to our user
console.log('Welcome to the GitHub Avatar Downloader!');

// Create getRepoContributors function with arguments repoOwner (user), repoName (project), and the callback function
function getRepoContributors(repoOwner, repoName, cb) {
  // process.env.GITHUB_USER is any reference to your username; an environmental variable in this case
  var GITHUB_USER = process.env.GITHUB_USER;
  // process.env.GITHUB_ACCESS_TOKEN is any reference to your access token
  var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  // Create our request URL using above variables
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // Create a requestOptions object that is able to pass headers, including User-Agent (we got a 403 status code if we leave this out)
  var requestOptions = {
      headers: {
        'User-Agent': 'GitHub Avatar Downloader Exercise'
      }
  }

  // Use request to make an HTTP GET to the generated URL
  request(requestURL, requestOptions, function(err, response, body) {
    if (err) {
      throw err;
    }
    console.log('Response body:', response.body);
  });
}

// Call getRepoContributors function with arguments jquery (user), jquery (project), and a function to log an error and results
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});