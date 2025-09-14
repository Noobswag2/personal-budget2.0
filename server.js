const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
  const filePath = path.join(__dirname, 'budget.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read budget.json' });
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch {
      res.status(500).json({ error: 'Invalid JSON in budget.json' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
