const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.listen(port, () => console.log(`listening on ${port}`));
