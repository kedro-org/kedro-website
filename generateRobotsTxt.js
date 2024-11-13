// Import the file system module
const fileSystem = require('fs');

// Import the merged agents file
const agents = require('./agents.json');

// Generate the rules for allowed agents
let rules = [];

agents.allowed.forEach(userAgent => {
  rules.push(`User-agent: ${userAgent}\nAllow: /`);
});

// Generate the rules for disallowed agents
agents.disallowed.forEach(userAgent => {
  rules.push(`User-agent: ${userAgent}\nDisallow: /`);
});

// Write the combined rules to a robots.txt file
fileSystem.writeFile('./robots.txt', rules.join("\n\n"), err => {
  if (err) {
    console.error(err);
  } else {
    console.log("robots.txt file generated");
  }
});
