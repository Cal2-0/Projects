const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001; // Different port to avoid conflict

// Simple logging
app.use((req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.url}`);
  next();
});

// Direct route
app.get('/', (req, res) => {
  console.log('HIT ROOT ROUTE');
  const filePath = path.join(__dirname, 'workspace.html');
  console.log('File path:', filePath);
  console.log('File exists:', fs.existsSync(filePath));

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found: ' + filePath);
  }
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log('__dirname:', __dirname);
});
