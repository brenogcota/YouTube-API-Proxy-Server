const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get('/videos', (req, res) => {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLM_i0obccy3smFz8mGuk6g5hw0dRuyr90&maxResults=50';
    fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
         .then(res => res.json())
         .then(json => {
            res.json(json);
         });
})

function notFound(req, res, next) {
    const error = new Error('Not found');
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({
        message: error.message
    })
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listen on port: ", port);
})