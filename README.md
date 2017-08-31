# GitHub Avatar Downloader

GitHub Avatar Downloader is an app that uses Node.js to consume the [GitHub REST API](https://developer.github.com/v3/) in order to download user avatars. It is coursework from [Lighthouse Labs](https://github.com/lighthouse-labs/).

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv) for accessing GitHub API keys
- [fs](https://nodejs.org/api/fs.html) to save the avatars
- [request](https://www.npmjs.com/package/request) for managing HTTP requests

## Installation & Setup

Clone this repository and `npm install` to install the dependencies.

Prior to running, set your GitHub username and [GitHub access token](https://github.com/settings/tokens) in a `.env` file in the project directory, using the included `.env.example` as an example:

```
GITHUB_USER=your_username_here
GITHUB_ACCESS_TOKEN=your_token_here
```

## Run

Run the program using the format...

```
node download_avatars.js USER PROJECT
```

... where `USER` is any valid user (like `ty2k`) and `PROJECT` is a project belonging to that user (like `github-avatar-downloader`).

For instance: `node download_avatars.js jquery jquery`

## Contact the Author

[Tyler Krys](https://tylerkrys.ca) made this to learn about web development.