var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

// Create the ./avatars directory to save the images if it doesn't exist yet
var dir = './avatars';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Declare our repoOwner and repoName variables from command line arguments
var repoOwner = process.argv[2];
var repoName = process.argv[3];

// Using an avatar URL as an input, output to a local file path
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
     throw err;
    })
    .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
    })
    // Save the avatar images by piping the response stream to a directory
    .pipe(fs.createWriteStream(filePath));
}

// Get a list of the repo contributors and call downloadImageByURL on each
function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = process.env.GITHUB_USER;
  var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // User-Agent required in request headers, otherwise we get 403 status code
  var requestOptions = {
      headers: {
        'User-Agent': 'GitHub Avatar Downloader Exercise'
      }
  }
  // Use request to make an HTTP GET request to the generated URL
  request(requestURL, requestOptions, function(err, response, body) {
    if (err) {
      throw err;
    }
    // data will be an array where each element is a contributor's metadata
    const data = JSON.parse(body);
    data.forEach(function(user) {
      console.log("Avatar URL for " + user.login + ": " + user.avatar_url);
      downloadImageByURL(user.avatar_url, './avatars/' + user.login + '.png');
    });
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

// With all of our variables set, call getRepoContributors
if (repoOwner === undefined || repoName === undefined) {
  console.log("Need both repo owner and repo name as arguments.");
  console.log("Use form: node download-avatars.js <repoowner> <reponame>");
} else {
  getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
}