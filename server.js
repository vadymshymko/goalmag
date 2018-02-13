const path = require('path');
const express = require('express');

const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => res.sendFile(HTML_FILE));

app.listen(process.env.PORT || 8080);
