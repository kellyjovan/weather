const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Sends bundle file
app.use('/build', express.static(path.join(__dirname, '../build')));

// Redirects all routes to React Application
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}....`);
});
