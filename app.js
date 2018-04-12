const express = require('express'),
      app = express(),
      http = require('http'),
      morgan = require('morgan'),
      cors = require('cors'),
      bodyParser = require('body-parser')

const port = process.env.Port || 3090,
      server = http.createServer(app);

const mongoose = require('mongoose');
const router = require('./router');


//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }))
app.use(cors());
router(app);

//db setup
mongoose.connect('mongodb://localhost/authentication', () => {
    console.log("Connected to db: authentication")
});

//server setup
server.listen(port, () => {
    console.log(`Server listening on: ${port}`);
})