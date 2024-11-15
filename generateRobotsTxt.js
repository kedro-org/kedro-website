const fileSystem = require('fs');
const path = require('path');

// Path to the existing robots.txt file
const robotsFilePath = path.join(__dirname, 'public', 'robots.txt');

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

// Combine the rules into a single string
const customRules = rules.join("\n\n");

// Read the existing robots.txt file
fileSystem.readFile(robotsFilePath, 'utf8', (err, existingContent) => {
  if (err) {
    console.error('Error reading robots.txt:', err);
    return;
  }

  // Merge the existing content with your custom rules
  const mergedContent = `${customRules.trim()}\n\n${existingContent.trim()}\n`;

  // Write the merged content back to robots.txt
  fileSystem.writeFile(robotsFilePath, mergedContent, 'utf8', err => {
    if (err) {
      console.error('Error writing to robots.txt:', err);
    } else {
      console.log('robots.txt file updated with merged content');
    }
  });
});
