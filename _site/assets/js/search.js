const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const Fuse = require('fuse.js');

// Function to read Markdown files recursively from a directory
function readMarkdownFiles(directory) {
  const markdownFiles = [];

  // Function to recursively read directories
  function readDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        // If the file is a directory, recursively read it
        readDirectory(filePath);
      } else if (file.endsWith('.md')) {
        // If the file is a Markdown file, read its content
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadata = parseMarkdown(content);
        markdownFiles.push({
          path: filePath,
          content: metadata.content,
          title: metadata.title
        });
      }
    });
  }

  // Start reading from the root directory
  readDirectory(directory);

  return markdownFiles;
}

// Function to parse Markdown content
function parseMarkdown(content) {
  const md = markdownIt();
  const tokens = md.parse(content, {});
  let title = '';
  let text = '';
  for (const token of tokens) {
    if (token.type === 'heading_open') {
      title = md.renderInline(token.children);
    } else if (token.type === 'inline' && token.content) {
      text += md.renderInline(token.children);
    }
  }
  return { title, content: text };
}

// Read Markdown files from the specified content directory
const contentDirectory = '../../_content'; // Change this to your actual content directory
const markdownFiles = readMarkdownFiles(contentDirectory);

// Configure Fuse.js
const options = {
  keys: ['title', 'content']
};
const fuse = new Fuse(markdownFiles, options);

// Function to handle form submission and generate search results
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const searchTerm = this.querySelector('input[name="query"]').value;
  const results = fuse.search(searchTerm);
  displaySearchResults(results);
});

// Function to display search results
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = ''; // Clear previous results
  
  if (results.length === 0) {
    searchResultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  const resultList = document.createElement('ul');
  results.forEach(result => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = result.item.url; // Assuming each item has a 'path' property
    link.textContent = result.item.title; // Assuming each item has a 'title' property
    listItem.appendChild(link);
    resultList.appendChild(listItem);
  });
  searchResultsContainer.appendChild(resultList);
}
