# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line in the following manner,

```
node download_avatars.js jquery jquery
```

Any valid repo-owner + repo combination can be used, such as this:

```
node download_avatars.js nodejs node
```

## Functional Requirements

*As an* open source project leader,
*I want* a folder with the avatars of all of my github project's contributors
*so that* I can use them in a website.

- *Given*
  - I have node installed
  - I am in the shell
  - I have your file in my current folder

- *When*
  - I execute your file using node, providing a github user and repository as command-line arguments For example: `$ node download_avatars.js nodejs node`

- *Then*
  - I should find a folder called `avatars` in my current directory
  - The `avatars` folder should contain images corresponding to the avatars of the contributors of the repo
  - The name of each image file should be the contributor's name and the file extension (ex. `johnny.png`)

## Implementation Requirements
- uses 'request' library to make the HTTP requests
- uses git for version control