const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const path = require('path');

require('./config/config')(app);

app.use("/public", express.static(path.join(__dirname, '/public')));

app.listen(port, () => console.log(`Listening on port ${port}`));