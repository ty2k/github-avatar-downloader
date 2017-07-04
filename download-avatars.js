// Require request and fs
var request = require('request');
var fs = require('fs');
Stream = require('stream').Transform;

// Say hi to our user
console.log('Welcome to the GitHub Avatar Downloader!');

// Declare our repoOwner and repoName variables using process.argv command line arguments
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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
    // Exit without crashing if there is an error
    if (err) {
      throw err;
    }
    // Parse the JSON data we get as a request response and hold it as an array variable
    const data = JSON.parse(body);
    // Each element in the array is a user's metadata. For each user,
    data.forEach(function(user) {
      // Log the avatar of their URL
      console.log("Avatar URL for " + user.login + ": " + user.avatar_url);
      // Use the downloadImageByURL function on the avatar URL, using a string with avatars directory, user.login string, and .png as a file extension
      downloadImageByURL(user.avatar_url, './avatars/' + user.login + '.png');
    });
  });
}

// Using an avatar URL as an input, output to a local file path
function downloadImageByURL(url, filePath) {
  // Send a GET request
  request.get(url)
       // If there is an error, throw it and exit without crashing
       .on('error', function (err) {
         throw err;
       })
       // Report the status code of the response
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       // Pipe the response stream to our file path (avatars/ directory needs to exist first or this won't work)
       .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// Call getRepoContributors function with arguments repoOwner and repoName (from the command line), and a function to log an error and results
getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});